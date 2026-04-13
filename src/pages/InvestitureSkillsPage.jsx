import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import useBodyTheme from '../hooks/useBodyTheme';
import useFonts from '../hooks/useFonts';
import '../styles/inv/index.css';
import en from '../content/en';

const INV_FONT = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap';

const { investiture: inv } = en;

function InvestitureSkillsPage() {
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useSEO({
    title: 'Skills | Investiture',
    description: 'Full reference for all eight Investiture skills — doctrine chain and audit chain.',
    path: '/investiture/skills',
  });

  useBodyTheme({ background: '#0a1628', color: '#e8e0d0' });
  useFonts([INV_FONT]);

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
          <div className="inv-nav-left">
            <Link to="/investiture" className="inv-nav-back">{inv.nav.brand}</Link>
            <span className="inv-nav-sep" aria-hidden="true">|</span>
            <span className="inv-nav-brand">Skills</span>
          </div>
          <div className="inv-nav-center">
            <a href={inv.cta.primaryUrl} target="_blank" rel="noopener noreferrer" className="inv-nav-btn">{inv.cta.primaryCta}</a>
            <Link to="/investiture/changelog" className="inv-nav-btn inv-nav-btn--outline">{inv.nav.changelog}</Link>
          </div>
        </div>
      </nav>

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
    </div>
  );
}

export default InvestitureSkillsPage;
