// POST /.netlify/functions/stripe-webhook  (called by Stripe)
//
// Verifies Stripe's signature, then keeps public.charges and
// public.registrations in step with payments:
//   checkout.session.completed             → charge completed, registration paid
//                                            (if already paid; card, Cash App)
//   checkout.session.async_payment_succeeded → same, for delayed methods
//                                            (bank debits, some Klarna flows)
//   checkout.session.expired               → pending charge deleted (never paid)
//   checkout.session.async_payment_failed  → pending charge deleted
//   charge.refunded (full)                 → charge + registration refunded
//
// The Stripe account is shared with Open Vector: checkout sessions
// without metadata.site === 'zv' are acknowledged and ignored.
//
// Adapted from openvector (feature/workflow-lms) stripe-webhook.js, with
// its race-condition fallback fixed: completion is an upsert keyed on
// stripe_checkout_session_id, so a missing pending row can't drop a sale.
//
// Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY.

import Stripe from 'stripe';
import { supabaseAdmin, errorResponse, jsonResponse } from './lib/auth.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

async function onCheckoutCompleted(session) {
  const m = session.metadata || {};
  // Delayed methods complete with payment_status 'unpaid' and settle via
  // checkout.session.async_payment_succeeded; the pending row waits.
  if (session.payment_status !== 'paid') return;

  const { error: chargeError } = await supabaseAdmin.from('charges').upsert({
    user_id: m.user_id,
    registration_id: m.registration_id,
    offering_id: m.offering_id,
    amount_cents: session.amount_total,
    currency: session.currency,
    status: 'completed',
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent,
    livemode: session.livemode,
  }, { onConflict: 'stripe_checkout_session_id' });
  if (chargeError) throw chargeError;

  const { error: regError } = await supabaseAdmin
    .from('registrations')
    .update({ status: 'paid' })
    .eq('id', m.registration_id);
  if (regError) throw regError;
}

async function onCheckoutExpired(session) {
  const { error } = await supabaseAdmin
    .from('charges')
    .delete()
    .eq('stripe_checkout_session_id', session.id)
    .eq('status', 'pending');
  if (error) throw error;
}

async function onChargeRefunded(charge) {
  if (!charge.refunded) return; // partial refund: leave the ledger as paid

  const { data: rows, error } = await supabaseAdmin
    .from('charges')
    .update({ status: 'refunded' })
    .eq('stripe_payment_intent_id', charge.payment_intent)
    .select('registration_id');
  if (error) throw error;

  const regIds = (rows || []).map((r) => r.registration_id).filter(Boolean);
  if (regIds.length) {
    const { error: regError } = await supabaseAdmin
      .from('registrations')
      .update({ status: 'refunded' })
      .in('id', regIds);
    if (regError) throw regError;
  }
}

export default async (req) => {
  if (req.method !== 'POST') return errorResponse('Method not allowed', 405);
  if (!stripe || !WEBHOOK_SECRET || !supabaseAdmin) return errorResponse('Webhook not configured', 500);

  let event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, req.headers.get('stripe-signature'), WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return errorResponse('Invalid signature', 400);
  }

  // Checkout sessions carry our metadata; ignore Open Vector's. Refunds
  // are matched by payment intent against our own ledger, so another
  // site's refund simply matches no rows.
  const object = event.data.object;
  if (event.type.startsWith('checkout.session.') && object.metadata?.site !== 'zv') {
    return jsonResponse({ received: true, ignored: 'not zv' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await onCheckoutCompleted(object);
        break;
      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed':
        await onCheckoutExpired(object);
        break;
      case 'charge.refunded':
        await onChargeRefunded(object);
        break;
      default:
        break;
    }
    return jsonResponse({ received: true });
  } catch (err) {
    // 500 makes Stripe retry with backoff.
    console.error(`Webhook ${event.type} failed:`, err.message);
    return errorResponse('Processing failed', 500);
  }
};
