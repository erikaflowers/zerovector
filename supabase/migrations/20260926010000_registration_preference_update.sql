-- ============================================================
-- Migration: let users change their own registration preference
--
-- Run in the Supabase SQL Editor (or `supabase db push` once the
-- repo is linked). Safe to re-run.
--
-- Two layers, both required:
--   1. Column privilege: authenticated may UPDATE only `preference`.
--      Any other column in the SET list (status, user_id, ...) is
--      rejected by Postgres before RLS runs.
--   2. RLS: only your own row, and only while still 'interested'.
--      Once reserved/paid, the preference is locked.
-- ============================================================

revoke update on public.registrations from authenticated, anon;
grant update (preference) on public.registrations to authenticated;

drop policy if exists "registrations_update_preference_own" on public.registrations;
create policy "registrations_update_preference_own" on public.registrations
  for update to authenticated
  using (user_id = (select auth.uid()) and status = 'interested')
  with check (user_id = (select auth.uid()) and status = 'interested');
