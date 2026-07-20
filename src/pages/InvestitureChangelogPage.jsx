import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useSEO from '../hooks/useSEO';
import '../styles/inv/index.css';
import en from '../content/en';

const { investiture: inv } = en;

function InvestitureChangelogPage() {
  useSEO({
    title: 'Changelog | Investiture',
    description: 'Version history for the Investiture project scaffold and skill chain.',
    path: '/investiture/changelog',
  });

  return (
    <div className="zv-page zv-info-page inv-page">
      <Nav />

      {/* Hero — standard subpage pattern */}
      <PageHero
        eyebrow="Investiture"
        title={inv.changelog.title}
        subtitle={inv.changelog.subtitle}
      />

      <section className="inv-section inv-changelog-section">
        <div className="inv-container">
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

      <Footer />
    </div>
  );
}

export default InvestitureChangelogPage;
