import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import PageClosing from '../components/PageClosing';
import Animate from '../components/Animate';
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
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={approach.eyebrow} title={approach.title} subtitle={approach.subtitle} />

      {/* Intro — Black First Section */}
      <section className="zv-section zv-invert">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">The Full Pipeline</h2>
          </Animate>
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

      <PageClosing
        headline="Put It Into Practice"
        body="The approach gives you the framework. Now see the principles behind it, or jump straight into building."
        primaryCta={{ label: "Read the Philosophy", to: "/philosophy" }}
        secondaryCta={{ label: "Start Building", to: "/for-builders" }}
      />

    </div>
  );
}

export default PipelinePage;
