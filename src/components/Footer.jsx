import SiteLink from './SiteLink';
import { siteLinks, legalLinks } from '../content/links';

function Footer() {
  return (
    <footer className="zv-footer">
      <div className="zv-container">
        <div className="zv-footer-inner">
          <div className="zv-footer-brand">ZERO-VECTOR DESIGN</div>
          <div className="zv-footer-links">
            {[...siteLinks, ...legalLinks].map((item) => (
              <SiteLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
