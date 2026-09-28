-- ============================================================
-- Migration: ZV Registration (offerings, registrations, charges)
--
-- Run in the Supabase SQL Editor. Safe to re-run.
--
-- SHARED DATABASE: zerovector.design and open.zerovector.design
-- use the same Supabase project. `profiles` and its helpers are
-- copied from openvector's feature/workflow-lms migration
-- (001_workflows.sql) and are created additively here: nothing
-- is dropped, so this never disturbs OV objects that already exist.
--
-- New tables are named to avoid OV's `purchases` table.
--
-- Access model:
--   offerings      public read (non-draft), admin write
--   registrations  own read; own insert only as 'interested';
--                  own delete only while 'interested'.
--                  All other status changes: service role only.
--   charges        own read; no client writes (service role only)
--   offering_interest  admin-only demand summary view
-- ============================================================


-- ------------------------------------------------------------
-- 1. profiles (shared with Open Vector)
-- ------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  stripe_customer_id text unique,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists is_admin boolean not null default false;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

create or replace function public.protect_admin_flag()
returns trigger
language plpgsql
as $$
begin
  if session_user = 'postgres' or current_setting('role', true) != 'authenticated' then
    return new;
  end if;
  if new.is_admin != old.is_admin then
    new.is_admin := old.is_admin;
  end if;
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Policies and triggers: create only if missing (never drop OV's)
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_select_own') then
    create policy "profiles_select_own" on public.profiles
      for select to authenticated using ((select auth.uid()) = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_update_own') then
    create policy "profiles_update_own" on public.profiles
      for update to authenticated using ((select auth.uid()) = id);
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'profiles_protect_admin') then
    create trigger profiles_protect_admin before update on public.profiles
      for each row execute function public.protect_admin_flag();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'profiles_updated_at') then
    create trigger profiles_updated_at before update on public.profiles
      for each row execute function public.update_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_created') then
    create trigger on_auth_user_created after insert on auth.users
      for each row execute function public.handle_new_user();
  end if;
end $$;

-- Backfill: anyone who signed in before the trigger existed
insert into public.profiles (id, email, name, avatar_url)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data ->> 'full_name', split_part(u.email, '@', 1)),
  u.raw_user_meta_data ->> 'avatar_url'
from auth.users u
where u.email is not null
on conflict (id) do nothing;


-- ------------------------------------------------------------
-- 2. offerings — the catalog of things you can register for
-- ------------------------------------------------------------

create table if not exists public.offerings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  kind text not null check (kind in ('cohort', 'one_on_one', 'workshop', 'course')),
  status text not null default 'draft'
    check (status in ('draft', 'interest', 'presale', 'open', 'closed')),
  price_cents integer not null default 0 check (price_cents >= 0),
  currency text not null default 'usd',
  capacity integer check (capacity is null or capacity > 0),
  starts_at timestamptz,
  stripe_price_id text,
  created_at timestamptz not null default now()
);

alter table public.offerings enable row level security;

drop policy if exists "offerings_public_read" on public.offerings;
create policy "offerings_public_read" on public.offerings
  for select to anon, authenticated
  using (status <> 'draft' or (select public.is_admin()));

drop policy if exists "offerings_admin_write" on public.offerings;
create policy "offerings_admin_write" on public.offerings
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));


-- ------------------------------------------------------------
-- 3. registrations — one per user per offering
-- ------------------------------------------------------------

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  offering_id uuid not null references public.offerings(id) on delete restrict,
  status text not null default 'interested'
    check (status in ('interested', 'reserved', 'paid', 'cancelled', 'refunded')),
  preference text check (preference in ('cohort', 'one_on_one', 'either')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, offering_id)
);

create index if not exists idx_registrations_offering on public.registrations(offering_id);

alter table public.registrations enable row level security;

drop policy if exists "registrations_select_own" on public.registrations;
create policy "registrations_select_own" on public.registrations
  for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "registrations_insert_interest" on public.registrations;
create policy "registrations_insert_interest" on public.registrations
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and status = 'interested'
    and exists (
      select 1 from public.offerings o
      where o.id = offering_id
        and o.status in ('interest', 'presale', 'open')
    )
  );

drop policy if exists "registrations_withdraw_own" on public.registrations;
create policy "registrations_withdraw_own" on public.registrations
  for delete to authenticated
  using (user_id = (select auth.uid()) and status = 'interested');

-- No update policy: status moves (reserved/paid/refunded) are service-role only.

drop trigger if exists registrations_updated_at on public.registrations;
create trigger registrations_updated_at before update on public.registrations
  for each row execute function public.update_updated_at();


-- ------------------------------------------------------------
-- 4. charges — the account ledger (repeat customers accrue rows)
-- ------------------------------------------------------------

create table if not exists public.charges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  registration_id uuid references public.registrations(id) on delete set null,
  offering_id uuid not null references public.offerings(id) on delete restrict,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'usd',
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'refunded')),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_charges_user on public.charges(user_id);

alter table public.charges enable row level security;

drop policy if exists "charges_select_own" on public.charges;
create policy "charges_select_own" on public.charges
  for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));

-- No insert/update/delete policies: service role only (Stripe webhook, Phase 2).


-- ------------------------------------------------------------
-- 5. offering_interest — admin demand dashboard
--    security_invoker: the view runs with the caller's RLS, and
--    registrations RLS lets only admins see everyone's rows.
-- ------------------------------------------------------------

create or replace view public.offering_interest
with (security_invoker = true) as
select
  o.slug,
  o.title,
  o.status as offering_status,
  count(r.id) as total,
  count(r.id) filter (where r.preference = 'cohort') as prefer_cohort,
  count(r.id) filter (where r.preference = 'one_on_one') as prefer_one_on_one,
  count(r.id) filter (where r.preference = 'either') as prefer_either,
  count(r.id) filter (where r.status = 'paid') as paid
from public.offerings o
left join public.registrations r on r.offering_id = o.id
group by o.id, o.slug, o.title, o.status;

revoke all on public.offering_interest from anon;


-- ------------------------------------------------------------
-- 6. Seed: Zero Camp (pre-register only)
-- ------------------------------------------------------------

insert into public.offerings (slug, title, kind, status, price_cents)
values ('zero-camp', 'Zero Camp: From Zero to Hero', 'cohort', 'interest', 99900)
on conflict (slug) do nothing;
