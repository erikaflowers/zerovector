import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import useBodyTheme from '../hooks/useBodyTheme';
import '../styles/site.css';
import en from '../content/en';

const { investiture: inv } = en;

function InvestitureChangelogPage() {
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useSEO({
    title: 'Changelog | Investiture',
    description: 'Version history for the Investiture project scaffold and skill chain.',
    path: '/investiture/changelog',
  });

  useBodyTheme({ background: '#0a1628', color: '#e8e0d0' });

  return (
    <div className="inv-page">
      {/* Stormlight — floating spren particles */}
      <div className="inv-stormlight" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="inv-spren" style={{ '--spren': i }} />
        ))}
      </div>

      {/* Nav */}
      <nav className="inv-nav">
        <div className="inv-nav-inner">
          <Link to="/investiture" className="inv-nav-back">{inv.nav.brand}</Link>
          <span className="inv-nav-brand">{inv.nav.changelog}</span>
          <a href={inv.cta.primaryUrl} target="_blank" rel="noopener noreferrer" className="inv-nav-link">{inv.nav.github}</a>
        </div>
      </nav>

      <section className="inv-section inv-changelog-section">
        <div className="inv-container">
          <h1 className="inv-section-headline">{inv.changelog.title}</h1>
          <p className="inv-section-body" style={{ marginBottom: 56 }}>{inv.changelog.subtitle}</p>

          <div className="inv-changelog-entries">
            {inv.changelog.versions.map((ver, i) => (
              <div key={i} className="inv-changelog-entry">
                <div className="inv-changelog-entry-meta">
                  <span className="inv-roadmap-version">{ver.version}</span>
                  <span className="inv-changelog-entry-date">{ver.date}</span>
                </div>
                <h3 className="inv-card-title">{ver.title}</h3>
                <ul className="inv-changelog-list">
                  {ver.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default InvestitureChangelogPage;
