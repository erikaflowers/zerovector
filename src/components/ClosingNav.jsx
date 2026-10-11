import SiteLink from './SiteLink';
import { siteLinks } from '../content/links';

/* The site-navigation link row at the bottom of closing sections.
 * One markup, one data source — used by PageClosing and the
 * homepage closing section. */
function ClosingNav() {
  return (
    <nav className="zv-page-closing-nav" aria-label="Site navigation">
      {siteLinks.map((item) => (
        <SiteLink key={item.label} item={item} />
      ))}
    </nav>
  );
}

export default ClosingNav;
