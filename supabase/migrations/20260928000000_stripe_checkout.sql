-- ============================================================
-- Migration: Stripe checkout support
--
-- 1. charges.livemode: Stripe test (sandbox) and live payments share
--    this one database. Every charge records which mode created it,
--    so test data never reads as revenue and can be purged with
--    `delete from charges where not livemode`.
-- 2. profiles.stripe_test_customer_id: sandbox and live Stripe
--    customers are different objects. Keeping them in separate
--    columns means testing never breaks someone's live checkout.
--    (profiles is shared with Open Vector; this is additive.)
--
-- All writes to charges remain service-role only (Netlify functions).
-- ============================================================

alter table public.charges
  add column if not exists livemode boolean not null default false;

alter table public.profiles
  add column if not exists stripe_test_customer_id text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_stripe_test_customer_id_key') then
    alter table public.profiles
      add constraint profiles_stripe_test_customer_id_key unique (stripe_test_customer_id);
  end if;
end $$;

create index if not exists idx_charges_registration on public.charges(registration_id);
