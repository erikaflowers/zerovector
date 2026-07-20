import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import '../styles/inv/index.css';
import en from '../content/en';

const { investiture: inv } = en;

function InvestitureSkillsPage() {
  useSEO({
    title: 'Skills | Investiture',
    description: 'Full reference for all eight Investiture skills — doctrine chain and audit chain.',
    path: '/investiture/skills',
  });

  return (
    <div className="inv-page">
      <Nav />

      {/* Header */}
      <section className="inv-section">
        <div className="inv-container">
          <Animate>
            <h1 className="inv-section-headline">{inv.skillsPage.title}</h1>
            <p className="inv-section-body" style={{ marginBottom: 56 }}>{inv.skillsPage.subtitle}</p>
          </Animate>
        </div>
      </section>

      {/* Skill Groups */}
      {inv.skillsPage.groups.map((group, gi) => (
        <section key={gi} className="inv-section" style={{ paddingTop: 0 }}>
          <div className="inv-container">
            <Animate>
              <div className="inv-skills-group-header">
                <h2 className="inv-skills-group-title">{group.name}</h2>
                <p className="inv-skills-group-desc">{group.desc}</p>
              </div>
            </Animate>
            <div className="inv-skills-entries">
              {group.skills.map((skill, si) => (
                <Animate key={si} delay={si}>
                  <div className="inv-skills-entry">
                    <div className="inv-skills-entry-header">
                      <span className="inv-skills-entry-cmd">{skill.cmd}</span>
                      <span className="inv-skills-entry-name">{skill.name}</span>
                    </div>
                    <p className="inv-skills-entry-desc">{skill.desc}</p>
                    <div className="inv-skills-entry-meta">
                      <div className="inv-skills-entry-meta-row">
                        <span className="inv-skills-entry-meta-label">Args</span>
                        <code className="inv-skills-entry-meta-value">{skill.args}</code>
                      </div>
                      <div className="inv-skills-entry-meta-row">
                        <span className="inv-skills-entry-meta-label">Reads</span>
                        <span className="inv-skills-entry-meta-value">{skill.reads}</span>
                      </div>
                      <div className="inv-skills-entry-meta-row">
                        <span className="inv-skills-entry-meta-label">Writes</span>
                        <span className="inv-skills-entry-meta-value">{skill.writes}</span>
                      </div>
                      <div className="inv-skills-entry-meta-row">
                        <span className="inv-skills-entry-meta-label">When</span>
                        <span className="inv-skills-entry-meta-value">{skill.when}</span>
                      </div>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="inv-section inv-cta-section">
        <div className="inv-container">
          <Animate>
            <div className="inv-cta-buttons">
              <a href={inv.cta.primaryUrl} target="_blank" rel="noopener noreferrer" className="inv-btn inv-btn--primary">{inv.cta.primaryCta}</a>
              <Link to="/investiture" className="inv-btn inv-btn--outline">Back to Investiture</Link>
            </div>
          </Animate>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default InvestitureSkillsPage;
