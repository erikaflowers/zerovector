// Registration data layer — offerings, registrations, charges.
// Thin wrappers over the shared Supabase client. "My" queries filter
// on userId explicitly: RLS lets admins read every row, so relying on
// RLS alone would show an admin everyone's registrations. Every call is
// null-safe: with no client configured, reads return empty and
// writes return an error the UI can show.
// Schema + access rules: supabase/migrations/20260926000000_zv_registration.sql

import { supabase } from './supabase';

const NOT_CONFIGURED = { data: null, error: new Error('Accounts are not available right now.') };

export async function getOffering(slug) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase
    .from('offerings')
    .select('id, slug, title, kind, status, price_cents, currency, starts_at')
    .eq('slug', slug)
    .maybeSingle();
}

export async function getMyRegistration(offeringId, userId) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase
    .from('registrations')
    .select('id, status, preference, created_at')
    .eq('offering_id', offeringId)
    .eq('user_id', userId)
    .maybeSingle();
}

export async function preRegister(offeringId, preference) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase
    .from('registrations')
    .insert({ offering_id: offeringId, preference })
    .select('id, status, preference, created_at')
    .single();
}

// Column grant allows only `preference`; RLS allows only your own
// row while still 'interested'. See 20260926010000 migration.
export async function updatePreference(registrationId, preference) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase
    .from('registrations')
    .update({ preference })
    .eq('id', registrationId)
    .select('id, status, preference, created_at')
    .single();
}

export async function withdraw(registrationId) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase.from('registrations').delete().eq('id', registrationId);
}

export async function getMyRegistrations(userId) {
  if (!supabase) return { data: [], error: null };
  return supabase
    .from('registrations')
    .select('id, status, preference, created_at, offering:offerings(slug, title, kind, status, price_cents, currency)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function getMyCharges(userId) {
  if (!supabase) return { data: [], error: null };
  return supabase
    .from('charges')
    .select('id, amount_cents, currency, status, livemode, created_at, offering:offerings(title)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

// Starts Stripe Checkout for one of the caller's registrations via the
// create-checkout Netlify function. Returns { url } to redirect to, or
// { error } with a message safe to show. Needs `netlify dev` locally;
// plain Vite has no functions.
export async function startCheckout(registrationId) {
  if (!supabase) return { url: null, error: NOT_CONFIGURED.error.message };
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { url: null, error: 'Please sign in first.' };
  try {
    const res = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ registrationId }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body.url) return { url: null, error: body.error || null };
    return { url: body.url, error: null };
  } catch {
    return { url: null, error: null };
  }
}

export function formatPrice(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
