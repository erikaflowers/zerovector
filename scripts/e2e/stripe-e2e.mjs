// Stripe checkout end-to-end test (sandbox). API + Stripe's hosted page.
//
// Covers: auth guard rails, pending charge, expired session cleanup,
// declined card, successful card → webhook → charge completed +
// registration paid, test-customer column, repeat-purchase 409, RLS
// write protection, refund → refunded.
//
// Self-contained: creates the $1 `checkout-test` offering and a temp
// user, and deletes both at the end (user deletion cascades rows).
// Prints results only, never secrets. Refuses to run with a live key.
//
// Prereqs (see vector/playbooks/launch-an-offering.md → Testing payments):
//   netlify dev --port 3006 --target-port 5175 --command "npx vite --port 5175 --strictPort"
//   stripe listen --api-key $STRIPE_SECRET_KEY --forward-to localhost:3006/.netlify/functions/stripe-webhook
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY,
//      STRIPE_SECRET_KEY (sk_test_), PW (path to a playwright package)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
const { chromium } = require(process.env.PW);

const BASE = 'http://localhost:3006';
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY } = process.env;
if (!STRIPE_SECRET_KEY.startsWith('sk_test_')) throw new Error('refusing: not a test key');

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const FIXTURE = { slug: 'checkout-test', title: 'Checkout Test ($1, sandbox)', kind: 'workshop', status: 'presale', price_cents: 100 };
async function fixtureUp(admin) {
  const { error } = await admin.from('offerings').upsert(FIXTURE, { onConflict: 'slug' });
  if (error) throw error;
}
async function fixtureDown(admin) {
  const { error } = await admin.from('offerings').delete().eq('slug', FIXTURE.slug);
  console.log(error ? `fixture cleanup FAILED: ${error.message}` : 'cleanup: checkout-test offering removed');
}
const stripe = new Stripe(STRIPE_SECRET_KEY);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0;
const check = (name, ok, detail = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
async function until(fn, ms = 30000) { const end = Date.now() + ms; while (Date.now() < end) { const v = await fn(); if (v) return v; await sleep(1000); } return null; }

const email = `zv-checkout-test+${Date.now()}@example.com`;
const password = `T-${Math.random().toString(36).slice(2)}-${Date.now()}`;
let userId;

async function checkout(token, registrationId) {
  const res = await fetch(`${BASE}/.netlify/functions/create-checkout`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ registrationId }),
  });
  return { status: res.status, body: await res.json() };
}

async function payOnHostedPage(browser, url, card) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1100 } });
  try { return await fillHosted(page, url, card); }
  catch (e) { await page.screenshot({ path: process.env.SHOT, fullPage: true }); throw new Error(`hosted page: ${e.message.split('\n')[0]}`); }
}
async function fillHosted(page, url, card) {
  await page.goto(url, { waitUntil: 'networkidle' });
  // Payment methods render as an accordion; open Card first.
  // Stripe's accordion overlay fails Playwright's actionability checks;
  // click the Card row by position, like a real pointer would.
  const box = await page.getByText('Card', { exact: true }).first().boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForSelector('#cardNumber', { state: 'visible', timeout: 30000 });
  await page.fill('#cardNumber', card);
  await page.fill('#cardExpiry', '12 / 34');
  await page.fill('#cardCvc', '123');
  if (await page.$('#billingName')) await page.fill('#billingName', 'ZV Checkout Test');
  const zip = await page.$('#billingPostalCode'); if (zip && await zip.isVisible()) await zip.fill('94107');
  // "Save my information" (Link) would require a phone number; untick it.
  const link = await page.$('#enableStripePass');
  if (link && await link.isChecked()) await page.getByText('Save my information', { exact: false }).first().click();
  await page.click('button[type="submit"], .SubmitButton');
  return page;
}

try {
  await fixtureUp(admin);
  const { data: offering } = await admin.from('offerings').select('id, status, price_cents').eq('slug', 'checkout-test').single();
  check('fixture offering is presale, $1', offering?.status === 'presale' && offering.price_cents === 100);

  const { data: created, error: cErr } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: 'ZV Checkout Test' } });
  if (cErr) throw cErr;
  userId = created.user.id;
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { data: signIn, error: sErr } = await userClient.auth.signInWithPassword({ email, password });
  if (sErr) throw sErr;
  const token = signIn.session.access_token;
  check('temp user created + signed in', !!token);

  // Register through RLS, as the browser does
  const { data: reg, error: rErr } = await userClient.from('registrations').insert({ offering_id: offering.id, preference: 'either' }).select('id, status').single();
  check('registration insert via RLS', !rErr && reg?.status === 'interested', rErr?.message);

  // Guard rails
  const anon = await fetch(`${BASE}/.netlify/functions/create-checkout`, { method: 'POST', body: JSON.stringify({ registrationId: reg.id }) });
  check('no token → 401', anon.status === 401);
  const bogus = await checkout(token, '00000000-0000-0000-0000-000000000000');
  check('someone else’s / missing registration → 404', bogus.status === 404);

  // 1. Expired session cleans up its pending charge
  const s1 = await checkout(token, reg.id);
  check('checkout #1 returns Stripe URL', s1.status === 200 && s1.body.url?.startsWith('https://checkout.stripe.com/'), `${s1.status}`);
  const sid1 = new URL(s1.body.url).pathname.split('/').find((p) => p.startsWith('cs_test_'));
  const { data: pend1 } = await admin.from('charges').select('status, livemode, amount_cents').eq('stripe_checkout_session_id', sid1).maybeSingle();
  check('pending charge written (test mode, $1)', pend1?.status === 'pending' && pend1.livemode === false && pend1.amount_cents === 100);
  await stripe.checkout.sessions.expire(sid1);
  const gone = await until(async () => { const { data } = await admin.from('charges').select('id').eq('stripe_checkout_session_id', sid1); return data && data.length === 0; });
  check('expired session → pending charge deleted (webhook)', !!gone);

  const browser = await chromium.launch();
  try {
    // 2. Declined card: stays unpaid
    const s2 = await checkout(token, reg.id);
    const sid2 = new URL(s2.body.url).pathname.split('/').find((p) => p.startsWith('cs_test_'));
    const declinePage = await payOnHostedPage(browser, s2.body.url, '4000000000000002');
    const declined = await declinePage.waitForSelector('text=/declined/i', { timeout: 30000 }).then(() => true).catch(() => false);
    check('decline card shows decline on Stripe page', declined);
    await declinePage.close();
    const { data: regAfterDecline } = await admin.from('registrations').select('status').eq('id', reg.id).single();
    check('declined → registration still interested', regAfterDecline.status === 'interested');
    await stripe.checkout.sessions.expire(sid2);

    // 3. Successful payment through the real hosted page
    const s3 = await checkout(token, reg.id);
    const sid3 = new URL(s3.body.url).pathname.split('/').find((p) => p.startsWith('cs_test_'));
    const payPage = await payOnHostedPage(browser, s3.body.url, '4242424242424242');
    const redirected = await payPage.waitForURL(/\/my\?checkout=success/, { timeout: 45000 }).then(() => true).catch(() => false);
    check('success redirect → /my?checkout=success', redirected, payPage.url().slice(0, 60));
    await payPage.close();
    const done = await until(async () => { const { data } = await admin.from('charges').select('status, livemode, amount_cents, stripe_payment_intent_id').eq('stripe_checkout_session_id', sid3).maybeSingle(); return data?.status === 'completed' ? data : null; });
    check('webhook → charge completed, livemode=false, $1', !!done && done.livemode === false && done.amount_cents === 100);
    const { data: regPaid } = await admin.from('registrations').select('status').eq('id', reg.id).single();
    check('webhook → registration paid', regPaid.status === 'paid');
    const { data: prof } = await admin.from('profiles').select('stripe_customer_id, stripe_test_customer_id').eq('id', userId).single();
    check('test customer saved in stripe_test_customer_id only', !!prof.stripe_test_customer_id && !prof.stripe_customer_id);

    // 4. Can't pay twice
    const again = await checkout(token, reg.id);
    check('repeat purchase → 409', again.status === 409, again.body.error);

    // 5. User can't write charges or promote status from the browser
    const { error: wErr } = await userClient.from('charges').insert({ user_id: userId, offering_id: offering.id, amount_cents: 0, status: 'completed' });
    check('browser cannot insert charges (RLS)', !!wErr);
    const { data: upd } = await userClient.from('registrations').update({ status: 'paid' }).eq('id', reg.id).select('id');
    check('browser cannot change registration status', !upd || upd.length === 0);

    // 6. Refund
    await stripe.refunds.create({ payment_intent: done.stripe_payment_intent_id });
    const refunded = await until(async () => { const { data } = await admin.from('charges').select('status').eq('stripe_checkout_session_id', sid3).single(); return data.status === 'refunded'; });
    check('refund → charge refunded (webhook)', !!refunded);
    const { data: regRef } = await admin.from('registrations').select('status').eq('id', reg.id).single();
    check('refund → registration refunded', regRef.status === 'refunded');
  } finally {
    await browser.close();
  }
} catch (err) {
  fail++;
  console.log('ERROR ', err.message);
} finally {
  if (userId) {
    const { error } = await admin.auth.admin.deleteUser(userId);
    console.log(error ? `cleanup FAILED: ${error.message}` : 'cleanup: temp user deleted (profile, registration, charges cascade)');
  }
  await fixtureDown(admin);
  console.log(`\n${pass} passed, ${fail} failed`);
}
