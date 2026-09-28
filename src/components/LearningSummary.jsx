import { useEffect, useState } from 'react';
import { getLearningSummary } from '../lib/learning';
import en from '../content/en';

const copy = en.accounts.myZv.learning;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function Meter({ done, total, label }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div
      className="zv-meter"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
    >
      <div className="zv-meter-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/**
 * LearningSummary — a signed-in user's Open Vector progress.
 * Joins public.progress to the ov_lessons catalog (lib/learning.js).
 * Renders nothing until loaded; renders nothing on error so the rest
 * of My ZV is never blocked by the learning section.
 */
function LearningSummary({ userId }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getLearningSummary(userId).then(({ data }) => {
      if (!cancelled) setSummary(data);
    });
    return () => { cancelled = true; };
  }, [userId]);

  if (!summary) return null;

  return (
    <section className="zv-section">
      <div className="zv-container">
        <h2 className="zv-section-title">{copy.title}</h2>
        <p className="zv-section-subtitle">{copy.subtitle}</p>

        {!summary.started ? (
          <div className="zv-my-empty">
            <p>{copy.empty}</p>
            <a href={copy.emptyCta.href} className="zv-cta">{copy.emptyCta.label}</a>
          </div>
        ) : (
          <>
            <div className="zv-learn-top">
              <div className="zv-learn-stat">
                <div className="zv-learn-count">
                  {summary.done}<span className="zv-learn-count-total"> / {summary.total}</span>
                </div>
                <div className="zv-learn-count-label">{copy.lessonsLabel} &middot; {summary.percent}%</div>
                <Meter done={summary.done} total={summary.total} label={`${copy.title}: ${summary.done} of ${summary.total} ${copy.lessonsLabel}`} />
                {summary.lastActivity && (
                  <div className="zv-learn-last">{copy.lastActivity}: {formatDate(summary.lastActivity)}</div>
                )}
              </div>

              {summary.next ? (
                <a href={summary.next.url} className="zv-learn-next">
                  <span className="zv-chip zv-chip--green">{copy.continueLabel}</span>
                  <span className="zv-learn-next-level">
                    {copy.levelLabel} {summary.next.level_number} &middot; {summary.next.level_title}
                  </span>
                  <span className="zv-learn-next-title">{summary.next.lesson_title}</span>
                  <span className="zv-learn-next-cta">
                    {copy.continueCta}{summary.next.duration ? ` · ${summary.next.duration}` : ''} &rarr;
                  </span>
                </a>
              ) : (
                <div className="zv-learn-next zv-learn-next--done">
                  <span className="zv-learn-next-title">{copy.completeLabel}</span>
                </div>
              )}
            </div>

            <div className="zv-ledger">
              {summary.levels.map((level) => (
                <div key={level.slug} className="zv-ledger-row zv-learn-row">
                  <div className="zv-ledger-item">
                    <div className="zv-ledger-name">
                      <span className="zv-learn-level-num">{level.number}</span> {level.title}
                    </div>
                    <Meter done={level.done} total={level.total} label={`${level.title}: ${level.done} of ${level.total}`} />
                  </div>
                  <div className="zv-ledger-amount">{level.done}/{level.total}</div>
                </div>
              ))}
              {summary.approach && (
                <div className="zv-ledger-row zv-learn-row">
                  <div className="zv-ledger-item">
                    <div className="zv-ledger-name">{copy.approachLabel}</div>
                    <Meter done={summary.approach.done} total={summary.approach.total} label={`${copy.approachLabel}: ${summary.approach.done} of ${summary.approach.total}`} />
                  </div>
                  <div className="zv-ledger-amount">{summary.approach.done}/{summary.approach.total}</div>
                </div>
              )}
            </div>

            <a href={copy.openCta.href} className="zv-cta zv-learn-open">{copy.openCta.label}</a>
          </>
        )}
      </div>
    </section>
  );
}

export default LearningSummary;
