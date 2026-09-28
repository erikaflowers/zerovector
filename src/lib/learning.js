// Learning data layer — Open Vector progress, read from the shared DB.
//
// public.progress (user_id, lesson_key, completed_at) is written by
// open.zerovector.design. public.ov_lessons is the catalog, synced from
// the openvector repo on each production build. Joining them here lets
// My ZV show titles, per-level totals, and the next lesson.
// Schema: supabase/migrations/20260927000000_ov_lessons_catalog.sql

import { supabase } from './supabase';

const APPROACH = 'approach';

export async function getLearningSummary(userId) {
  if (!supabase || !userId) return { data: null, error: null };

  const [catalogRes, progressRes] = await Promise.all([
    supabase
      .from('ov_lessons')
      .select('lesson_key, level_slug, level_number, level_title, level_order, lesson_title, lesson_order, duration, url')
      .eq('active', true)
      .order('level_order')
      .order('lesson_order'),
    supabase
      .from('progress')
      .select('lesson_key, completed_at')
      .eq('user_id', userId),
  ]);

  const error = catalogRes.error || progressRes.error;
  if (error) return { data: null, error };

  return { data: summarize(catalogRes.data || [], progressRes.data || []), error: null };
}

export function summarize(catalog, progress) {
  const done = new Set(progress.map((p) => p.lesson_key));
  const lastActivity = progress.reduce(
    (latest, p) => (p.completed_at && (!latest || p.completed_at > latest) ? p.completed_at : latest),
    null
  );

  const groups = new Map();
  for (const lesson of catalog) {
    if (!groups.has(lesson.level_slug)) {
      groups.set(lesson.level_slug, {
        slug: lesson.level_slug,
        number: lesson.level_number,
        title: lesson.level_title,
        lessons: [],
      });
    }
    groups.get(lesson.level_slug).lessons.push({ ...lesson, done: done.has(lesson.lesson_key) });
  }

  const tally = (group) => ({
    ...group,
    done: group.lessons.filter((l) => l.done).length,
    total: group.lessons.length,
  });

  const levels = [...groups.values()].filter((g) => g.slug !== APPROACH).map(tally);
  const approach = groups.has(APPROACH) ? tally(groups.get(APPROACH)) : null;
  const curriculum = levels.flatMap((l) => l.lessons);
  const doneCount = curriculum.filter((l) => l.done).length;

  return {
    started: progress.length > 0,
    done: doneCount,
    total: curriculum.length,
    percent: curriculum.length ? Math.round((doneCount / curriculum.length) * 100) : 0,
    next: curriculum.find((l) => !l.done) || null,
    levels,
    approach,
    lastActivity,
  };
}
