import { Link } from 'react-router-dom';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import PageClosing from '../components/PageClosing';
import { ArrowIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { philosophy, home } = en;

function PhilosophyPage() {
  useSEO({
    title: 'Philosophy',
    description: 'The Zero-Vector philosophy: seven principles for building with AI where intent flows directly into the artifact. No intermediary. No translation layer.',
    path: '/philosophy',
    ogImage: 'https://zerovector.design/og/philosophy.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <VectorField />
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={philosophy.eyebrow} title={philosophy.title} subtitle={philosophy.subtitle} />

      {/* What ZV Is + What ZV Is Not — Two Column */}
      <section className="zv-section">
        <div className="zv-container">
          <div className="zv-philosophy-split">
            <div className="zv-philosophy-what-is">
              <Animate>
                <h2 className="zv-section-title">What Zero-Vector Is</h2>
              </Animate>
              {philosophy.what_it_is.map((p, i) => (
                <Animate key={i} delay={Math.min(i + 1, 3)}>
                  <p className="zv-body-text">{p}</p>
                </Animate>
              ))}
            </div>
            <div className="zv-philosophy-what-is-not">
              <Animate>
                <h3 className="zv-philosophy-sidebar-title">What It Is Not</h3>
              </Animate>
              {philosophy.what_it_is_not.map((item, i) => (
                <Animate key={i} delay={Math.min(i + 1, 4)}>
                  <div className="zv-philosophy-not-item">
                    <div className="zv-philosophy-not-claim">{item.claim}</div>
                    <div className="zv-philosophy-not-explanation">{item.explanation}</div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principle Zero + The Seven Principles */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <div className="zv-principle-zero">
              <div className="zv-principle-zero-numeral">{philosophy.principle_zero.numeral}</div>
              <h2 className="zv-principle-zero-title">{philosophy.principle_zero.title}</h2>
            </div>
          </Animate>
          <Animate delay={1}>
            <h2 className="zv-section-title zv-principles-heading">The Seven Principles</h2>
          </Animate>
          <div className="zv-philosophy-principles">
            {philosophy.principles.map((p, i) => (
              <Animate key={i}>
                <div className="zv-philosophy-principle">
                  <div className="zv-philosophy-principle-numeral">{p.numeral}</div>
                  <div className="zv-philosophy-principle-content">
                    <h3 className="zv-philosophy-principle-title">{p.title}</h3>
                    <p className="zv-philosophy-principle-body">{p.body}</p>
                    <p className="zv-philosophy-principle-why">{p.why}</p>
                    {p.detail && (
                      <div className="zv-philosophy-principle-detail">
                        {p.detail.text.map((paragraph, j) => (
                          <p key={j} className="zv-philosophy-principle-detail-text">{paragraph}</p>
                        ))}
                        {p.detail.links?.length > 0 && (
                          <div className="zv-philosophy-principle-links">
                            {p.detail.links.map((link, j) => (
                              <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className="zv-philosophy-principle-link">
                                {link.label} <ArrowIcon size={12} />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* The Arc + Lineage — combined */}
      <section className="zv-section zv-section--timeline">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{home.timeline.title}</h2>
            <p className="zv-section-subtitle">{home.timeline.subtitle}</p>
          </Animate>
          <div className="zv-arc-lineage-split">
            <div className="zv-arc-lineage-left">
              {philosophy.arc.paragraphs.map((p, i) => (
                <Animate key={i} delay={Math.min(i + 1, 2)}>
                  <p className="zv-body-text">{p}</p>
                </Animate>
              ))}
            </div>
            <div className="zv-arc-lineage-right">
              <div className="zv-timeline">
                {home.timeline.entries.map((entry, i) => (
                  <Animate key={i}>
                    <div className="zv-timeline-entry">
                      <div className="zv-timeline-year">{entry.year}</div>
                      <div className="zv-timeline-milestone">{entry.milestone}</div>
                      <div className="zv-timeline-desc">{entry.description}</div>
                    </div>
                  </Animate>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageClosing
        headline="See It In Practice"
        body="The philosophy becomes real when you start building with it."
        primaryCta={{ label: "Start Building", to: "/for-builders" }}
        secondaryCta={{ label: "The Approach", to: "/approach" }}
      />

    </div>
  );
}

export default PhilosophyPage;
