-- ============================================================
-- Migration: Open Vector curriculum catalog (ov_lessons)
--
-- Open Vector's lesson content lives in its repo as JS files;
-- learner progress lives in public.progress (user_id, lesson_key)
-- where lesson_key = '<level_slug>/<lesson_slug>'. This table puts
-- the catalog in the database so any ZV surface (My ZV first) can
-- join progress to titles, levels, ordering, and totals.
--
-- Written ONLY by openvector's scripts/sync-catalog.mjs (service
-- role), run after each production build. Lessons removed from the
-- curriculum are kept with active = false so old progress still
-- resolves to a title.
--
-- Access: public read; no client writes.
-- ============================================================

create table if not exists public.ov_lessons (
  lesson_key text primary key,
  level_slug text not null,
  level_number text not null,
  level_title text not null,
  level_order integer not null,
  lesson_slug text not null,
  lesson_title text not null,
  lesson_order integer not null,
  duration text,
  status text not null default 'available',
  url text not null,
  active boolean not null default true,
  synced_at timestamptz not null default now()
);

create index if not exists idx_ov_lessons_order on public.ov_lessons(level_order, lesson_order);

alter table public.ov_lessons enable row level security;

drop policy if exists "ov_lessons_public_read" on public.ov_lessons;
create policy "ov_lessons_public_read" on public.ov_lessons
  for select to anon, authenticated
  using (true);
