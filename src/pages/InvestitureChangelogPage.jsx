import Nav from '../components/Nav';
import Footer from '../components/Footer';
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
    <div className="inv-page">
      <Nav />

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

      <Footer />
    </div>
  );
}

export default InvestitureChangelogPage;
