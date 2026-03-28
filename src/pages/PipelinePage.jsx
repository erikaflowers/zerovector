import { Link } from 'react-router-dom';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import NotifyForm from '../components/NotifyForm';
import { ArrowIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { approach } = en;

function PipelinePage() {
  useSEO({
    title: 'The Approach',
    description: 'The Zero-Vector approach to building products: eight phases from problem framing to shipping, with tool-agnostic methodology and AI-native practices.',
    path: '/approach',
    ogImage: 'https://zerovector.design/og/approach.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <VectorField />
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={approach.eyebrow} title={approach.title} subtitle={approach.subtitle} />

      {/* Intro */}
      <section className="zv-section">
        <div className="zv-container">
          {approach.intro.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 2)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* Phase Deep Dives — Two Column */}
      {approach.phases.map((phase) => (
        <section key={phase.id} className="zv-section zv-approach-phase">
          <div className="zv-container">
            <Animate>
              <div className="zv-approach-phase-header">
                <span className="zv-approach-phase-number">{phase.number}</span>
                <h2 className="zv-section-title">{phase.name}</h2>
              </div>
            </Animate>
            <div className="zv-approach-phase-columns">
              <div className="zv-approach-phase-agnostic">
                <Animate>
                  <div className="zv-approach-column-label">What This Is</div>
                </Animate>
                {phase.agnostic.map((p, i) => (
                  <Animate key={i} delay={Math.min(i + 1, 2)}>
                    <p className="zv-body-text">{p}</p>
                  </Animate>
                ))}
              </div>
              <div className="zv-approach-phase-zv">
                <Animate>
                  <div className="zv-approach-column-label">The Zero-Vector Way</div>
                </Animate>
                {phase.zeroVector.map((p, i) => (
                  <Animate key={i} delay={Math.min(i + 1, 2)}>
                    <p className="zv-body-text">{p}</p>
                  </Animate>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Closing */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <div className="zv-page-next-steps">
              <div className="zv-philosophy-closing">
                <div className="zv-philosophy-closing-primary">
                  <h2 className="zv-section-title">Put It Into Practice</h2>
                  <p className="zv-body-text">The approach gives you the framework. Now see the principles behind it, or jump straight into building.</p>
                  <div className="zv-philosophy-closing-actions">
                    <Link to="/philosophy" className="zv-cta">Read the Philosophy <ArrowIcon size={14} /></Link>
                    <Link to="/for-builders" className="zv-cta zv-cta-outline">Start Building <ArrowIcon size={14} /></Link>
                  </div>
                </div>
                <div className="zv-philosophy-closing-secondary">
                  <div className="zv-philosophy-closing-block">
                    <p className="zv-philosophy-closing-block-text">Get notified when new Zero Vector content drops.</p>
                    <NotifyForm variant="light" tag="zerovector" />
                  </div>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PipelinePage;
