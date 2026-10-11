/* Featured/related essay card — label + linked image card.
 * Used by PageHero (per-route related essay) and the homepage
 * intro section (featured essay). Parents own the wrapper div. */
function EssayCard({ essay, label = 'Featured Essay', icon = null }) {
  return (
    <>
      <span className="zv-page-hero-essay-label">
        {icon} {label}
      </span>
      <a
        href={essay.url}
        target="_blank"
        rel="noopener noreferrer"
        className="zv-page-hero-essay"
      >
        <img
          src={essay.image}
          alt={essay.title}
          className="zv-page-hero-essay-img"
          loading="lazy"
        />
        <div className="zv-page-hero-essay-meta">
          <div className="zv-page-hero-essay-date">{essay.date}</div>
          <div className="zv-page-hero-essay-title">{essay.title}</div>
          <div className="zv-page-hero-essay-subtitle">{essay.subtitle}</div>
        </div>
      </a>
    </>
  );
}

export default EssayCard;
