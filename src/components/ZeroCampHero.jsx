/* ZeroCampHero — the /zero-camp launch hero.
 *
 * Full-bleed black field with two drifting layers of square stars
 * (flat, no glow — Orbital Brutalism), a Stendig-scale title, the
 * "flight manifest" card, and a trajectory rail that runs off the
 * right edge: Zero Camp → Launching from Orbit → the galaxy.
 * Star positions are seeded so every render draws the same sky. */

function makeStars(count, seed, sizes) {
  let state = seed;
  const rand = () => (state = (state * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: count }, () => {
    const x = rand() * 1200;
    const y = rand() * 800;
    const size = sizes[Math.floor(rand() * sizes.length)];
    const roll = rand();
    const tone = roll < 0.05 ? 'green' : roll < 0.09 ? 'pink' : 'white';
    return { x, y, size, tone };
  });
}

const FAR_STARS = makeStars(140, 7, [1.5, 2, 2]);
const NEAR_STARS = makeStars(28, 42, [3, 4]);

function StarSheet({ stars }) {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
      {stars.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.size} height={s.size} className={`zv-camp-star zv-camp-star--${s.tone}`} />
      ))}
    </svg>
  );
}

function StarLayer({ stars, speed }) {
  return (
    <div className={`zv-camp-stars zv-camp-stars--${speed}`}>
      <StarSheet stars={stars} />
      <StarSheet stars={stars} />
    </div>
  );
}

function ZeroCampHero({ hero }) {
  return (
    <section className="zv-camp-hero">
      <div className="zv-camp-sky" aria-hidden="true">
        <StarLayer stars={FAR_STARS} speed="far" />
        <StarLayer stars={NEAR_STARS} speed="near" />
      </div>

      <div className="zv-container zv-camp-hero-inner">
        <div className="zv-camp-hero-copy">
          <div className="zv-camp-chip zv-camp-chip--green zv-camp-hero-kicker">{hero.kicker}</div>
          <h1 className="zv-camp-hero-title">
            <span className="zv-camp-hero-title-top">{hero.titleTop}</span>{' '}
            <span className="zv-camp-hero-title-bottom">{hero.titleBottom}</span>
          </h1>
          <p className="zv-camp-hero-lede">{hero.lede}</p>
          <div className="zv-camp-hero-actions">
            <a href={hero.cta.href} className="zv-camp-hero-cta">{hero.cta.label}</a>
            <span className="zv-camp-hero-note">{hero.ctaNote}</span>
          </div>
        </div>

        <aside className="zv-camp-manifest" aria-label={hero.manifest.title}>
          <div className="zv-camp-manifest-title">{hero.manifest.title}</div>
          <dl className="zv-camp-manifest-rows">
            {hero.manifest.rows.map((row) => (
              <div key={row.key} className="zv-camp-manifest-row">
                <dt>{row.key}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <ol className="zv-camp-trajectory">
          {hero.trajectory.map((stop, i) => (
            <li key={stop.title} className={`zv-camp-waypoint ${i === 0 ? 'zv-camp-waypoint--here' : ''}`}>
              <span className="zv-camp-waypoint-mark">{stop.mark}</span>
              <span className="zv-camp-waypoint-title">{stop.title}</span>
              <span className="zv-camp-waypoint-note">{stop.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ZeroCampHero;
