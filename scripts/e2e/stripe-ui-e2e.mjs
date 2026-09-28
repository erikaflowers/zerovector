// Stripe checkout UI loop (sandbox), through our own pages.
//
// Signed-in temp user → /checkout-test (dev-only page) → pick preference →
// Pre-register → Reserve & pay → Stripe hosted page (4242) → /my banner
// "Payment confirmed" + TEST charge → paid view with no pay button.
// Google OAuth can't be automated, so the browser is handed a Supabase
// session for a temp user instead. Screenshots go to $SHOTS.
//
// Same prereqs/env as stripe-e2e.mjs, plus SHOTS (a directory).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { createClient } = require('@supabase/supabase-js');
const { chromium } = require(process.env.PW);

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, SHOTS } = process.env;
const BASE = 'http://localhost:3006';
const ref = new URL(SUPABASE_URL).hostname.split('.')[0];
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
const email = `zv-ui-test+${Date.now()}@example.com`;
const password = `T-${Math.random().toString(36).slice(2)}-${Date.now()}`;
let userId;
const step = (m) => console.log('•', m);

try {
  await fixtureUp(admin);
  const { data: created, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: 'Casey Tester' } });
  if (error) throw error;
  userId = created.user.id;
  const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { data: { session } } = await anon.auth.signInWithPassword({ email, password });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  // Hand the browser a signed-in Supabase session (what Google OAuth would leave behind)
  await ctx.addInitScript(([key, value]) => { localStorage.setItem(key, value); }, [`sb-${ref}-auth-token`, JSON.stringify(session)]);
  const page = await ctx.newPage();

  await page.goto(`${BASE}/checkout-test`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Either' }).click();
  await page.getByRole('button', { name: 'Pre-register', exact: true }).click();
  await page.getByText('You’re in, Casey.').waitFor({ timeout: 15000 });
  step('pre-registered; what’s-next view shows');
  await page.screenshot({ path: `${SHOTS}/1-registered.png`, fullPage: true });

  await page.getByRole('button', { name: 'Reserve & pay' }).click();
  await page.waitForURL(/checkout\.stripe\.com/, { timeout: 20000 });
  step('Reserve & pay → Stripe hosted checkout');
  await page.waitForLoadState('networkidle');
  const box = await page.getByText('Card', { exact: true }).first().boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForSelector('#cardNumber', { state: 'visible', timeout: 20000 });
  await page.fill('#cardNumber', '4242424242424242');
  await page.fill('#cardExpiry', '12 / 34');
  await page.fill('#cardCvc', '123');
  if (await page.$('#billingName')) await page.fill('#billingName', 'Casey Tester');
  const zip = await page.$('#billingPostalCode'); if (zip && await zip.isVisible()) await zip.fill('94107');
  const link = await page.$('#enableStripePass');
  if (link && await link.isChecked()) await page.getByText('Save my information', { exact: false }).first().click();
  await page.screenshot({ path: `${SHOTS}/2-stripe.png`, fullPage: true });
  await page.click('button[type="submit"], .SubmitButton');

  await page.waitForURL(/\/my/, { timeout: 45000 });
  step('back on /my');
  await page.getByText('Payment confirmed. You’re in.').waitFor({ timeout: 40000 });
  step('banner: Payment confirmed');
  await page.getByText('TEST', { exact: true }).first().waitFor({ timeout: 5000 });
  step('ledger shows the charge with TEST chip');
  await page.screenshot({ path: `${SHOTS}/3-my-zv.png`, fullPage: true });

  await page.goto(`${BASE}/checkout-test`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${SHOTS}/4-after-paid.png`, fullPage: true });
  const payStill = await page.getByRole('button', { name: 'Reserve & pay' }).count();
  step(`after paying, Reserve & pay button hidden: ${payStill === 0}`);

  await browser.close();
  console.log('UI LOOP PASSED');
} catch (err) {
  console.log('UI LOOP FAILED:', err.message.split('\n')[0]);
} finally {
  if (userId) {
    const { error } = await admin.auth.admin.deleteUser(userId);
    console.log(error ? `cleanup FAILED: ${error.message}` : 'cleanup: temp user deleted');
  }
  await fixtureDown(admin);
}
