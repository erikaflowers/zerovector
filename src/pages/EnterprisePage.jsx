import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import PageClosing from '../components/PageClosing';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { enterprise } = en;

function EnterprisePage() {
  useSEO({
    title: 'For Enterprise — Transform How You Build',
    description: 'Zero-Vector Design at the scale of teams, departments, and organizations. Pipeline collapse, agent-first team architecture, governance, and transformation metrics.',
    path: '/for-enterprise',
    ogImage: 'https://zerovector.design/og/enterprise.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <Nav />

      <PageHero eyebrow={enterprise.eyebrow} title={enterprise.title} subtitle={enterprise.subtitle} />

      {/* Intro */}
      <section className="zv-section zv-invert">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">The Enterprise Reality</h2>
          </Animate>
          {enterprise.intro.map((p, i) => (
            <Animate key={i} delay={i}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* The Enterprise Challenge */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{enterprise.challenge.title}</h2>
          </Animate>
          <div className="zv-enterprise-challenge">
            {enterprise.challenge.items.map((item, i) => (
              <Animate key={i}>
                <div className="zv-enterprise-challenge-card">
                  <h3 className="zv-enterprise-challenge-title">{item.title}</h3>
                  <p className="zv-enterprise-challenge-desc">{item.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* What Zero-Vector Delivers */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{enterprise.capabilities.title}</h2>
          </Animate>
          <div className="zv-enterprise-preview">
            {enterprise.capabilities.items.map((item, i) => (
              <Animate key={i}>
                <div className="zv-enterprise-preview-card">
                  <div className="zv-enterprise-preview-content">
                    <h3 className="zv-enterprise-preview-title">{item.title}</h3>
                    <p className="zv-enterprise-preview-desc">{item.description}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{enterprise.engagement.title}</h2>
            <p className="zv-body-text">{enterprise.engagement.intro}</p>
          </Animate>
          <div className="zv-enterprise-engagement">
            {enterprise.engagement.models.map((model, i) => (
              <Animate key={i}>
                <div className="zv-enterprise-engagement-card">
                  <div className="zv-enterprise-engagement-header">
                    <h3 className="zv-enterprise-engagement-name">{model.name}</h3>
                    <span className="zv-enterprise-engagement-duration">{model.duration}</span>
                  </div>
                  <p className="zv-enterprise-engagement-desc">{model.description}</p>
                  <p className="zv-enterprise-engagement-outcome">{model.outcome}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty Section */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{enterprise.honesty.title}</h2>
          </Animate>
          {enterprise.honesty.items.map((p, i) => (
            <Animate key={i} delay={i}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      <PageClosing
        headline={enterprise.contact.title}
        body={enterprise.contact.description}
        primaryCta={{ label: "Work with Arroyo Labs", href: "https://arroyo.zerovector.design" }}
        secondaryCta={{ label: "For Leaders", to: "/for-leaders" }}
        newsletterTag="enterprise"
      />

    </div>
  );
}

export default EnterprisePage;
