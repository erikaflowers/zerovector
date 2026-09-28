// POST /.netlify/functions/create-checkout  { registrationId }
//
// Creates a Stripe Checkout Session for one of the caller's own
// registrations and records a pending row in public.charges. The price
// comes from offerings.price_cents (inline price_data), so a new
// product is just an offerings row — nothing to set up in Stripe.
//
// Adapted from openvector (feature/workflow-lms) create-checkout.js.
// Env: STRIPE_SECRET_KEY (sk_/rk_, test or live), SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY.

import Stripe from 'stripe';
import { verifyUser, supabaseAdmin, errorResponse, jsonResponse } from './lib/auth.js';

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_KEY ? new Stripe(STRIPE_KEY) : null;

// Sandbox and live Stripe customers are different objects, so they
// live in different profile columns (see 20260928000000 migration).
const IS_TEST_KEY = /^(sk|rk)_test_/.test(STRIPE_KEY || '');
const CUSTOMER_COLUMN = IS_TEST_KEY ? 'stripe_test_customer_id' : 'stripe_customer_id';

const PAYABLE_OFFERING = ['presale', 'open'];
const PAYABLE_REGISTRATION = ['interested', 'reserved'];

function siteUrl(req) {
  if (process.env.CONTEXT === 'production' && process.env.URL) return process.env.URL;
  return new URL(req.url).origin; // deploy previews, branch deploys, netlify dev
}

export default async (req) => {
  if (req.method !== 'POST') return errorResponse('Method not allowed', 405);
  if (!stripe || !supabaseAdmin) return errorResponse('Payments are not configured', 503);

  let user;
  try {
    user = await verifyUser(req);
  } catch {
    return errorResponse('Please sign in first.', 401);
  }

  try {
    const { registrationId } = await req.json();
    if (!registrationId) return errorResponse('registrationId is required');

    const { data: reg } = await supabaseAdmin
      .from('registrations')
      .select('id, user_id, status, offering:offerings(id, slug, title, status, price_cents, currency, capacity)')
      .eq('id', registrationId)
      .maybeSingle();

    // Not found and not yours look the same from outside.
    if (!reg || reg.user_id !== user.id) return errorResponse('Registration not found', 404);

    const offering = reg.offering;
    if (reg.status === 'paid') return errorResponse('You’ve already paid for this one.', 409);
    if (!PAYABLE_REGISTRATION.includes(reg.status)) return errorResponse('This registration can’t be paid for.', 409);
    if (!PAYABLE_OFFERING.includes(offering.status)) return errorResponse('Payments for this aren’t open yet.', 409);
    if (!offering.price_cents) return errorResponse('This offering has no price set.', 400);

    if (offering.capacity) {
      const { count } = await supabaseAdmin
        .from('registrations')
        .select('id', { count: 'exact', head: true })
        .eq('offering_id', offering.id)
        .eq('status', 'paid');
      if ((count ?? 0) >= offering.capacity) return errorResponse('Sorry, this one is sold out.', 409);
    }

    // One Stripe customer per profile (per mode); repeat buyers reuse it.
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select(CUSTOMER_COLUMN)
      .eq('id', user.id)
      .single();

    let customerId = profile?.[CUSTOMER_COLUMN];
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.full_name || undefined,
        metadata: { supabase_user_id: user.id, site: 'zv' },
      });
      customerId = customer.id;
      await supabaseAdmin.from('profiles').update({ [CUSTOMER_COLUMN]: customerId }).eq('id', user.id);
    }

    const metadata = {
      site: 'zv', // the Stripe account is shared with Open Vector; the webhook ignores anything else
      user_id: user.id,
      registration_id: reg.id,
      offering_id: offering.id,
      offering_slug: offering.slug,
    };

    const base = siteUrl(req);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customerId,
      client_reference_id: user.id,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: offering.currency || 'usd',
          unit_amount: offering.price_cents,
          product_data: { name: offering.title },
        },
      }],
      metadata,
      payment_intent_data: { metadata },
      success_url: `${base}/my?checkout=success`,
      cancel_url: `${base}/${offering.slug}?checkout=cancelled`,
    });

    const { error: chargeError } = await supabaseAdmin.from('charges').insert({
      user_id: user.id,
      registration_id: reg.id,
      offering_id: offering.id,
      amount_cents: offering.price_cents,
      currency: offering.currency || 'usd',
      status: 'pending',
      stripe_checkout_session_id: session.id,
      livemode: session.livemode,
    });
    // Non-fatal: the webhook upserts the charge by session id either way.
    if (chargeError) console.error('Pending charge insert failed:', chargeError.message);

    return jsonResponse({ url: session.url });
  } catch (err) {
    console.error('create-checkout error:', err.message);
    return errorResponse('Something went wrong starting checkout.', 500);
  }
};
