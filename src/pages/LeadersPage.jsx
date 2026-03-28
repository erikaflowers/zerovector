import { Link } from 'react-router-dom';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import PageClosing from '../components/PageClosing';
import { ArrowIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { leaders } = en;

function LeadersPage() {
  useSEO({
    title: 'For Leaders — Transform Your Organization',
    description: 'How Zero-Vector Design helps executives and design leaders transform their organizations. The CZVO role, engagement models, pipeline collapse, and where to begin.',
    path: '/for-leaders',
    ogImage: 'https://zerovector.design/og/leaders.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <VectorField />
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={leaders.eyebrow} title={leaders.title} subtitle={leaders.subtitle} />

      {/* Intro */}
      <section className="zv-section">
        <div className="zv-container">
          {leaders.intro.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 4)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* What Changes */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{leaders.whatChanges.title}</h2>
          </Animate>
          <div className="zv-leaders-changes">
            {leaders.whatChanges.items.map((item, i) => (
              <Animate key={i}>
                <div className="zv-leaders-change-card">
                  <div className="zv-leaders-change-label">{item.label}</div>
                  <div className="zv-leaders-change-comparison">
                    <div className="zv-leaders-change-before">
                      <div className="zv-leaders-change-tag">Before</div>
                      <p>{item.before}</p>
                    </div>
                    <div className="zv-leaders-change-after">
                      <div className="zv-leaders-change-tag">Zero-Vector</div>
                      <p>{item.after}</p>
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CZVO */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{leaders.czvo.title}</h2>
          </Animate>
          {leaders.czvo.description.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 4)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* What This Means For You */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{leaders.forYou.title}</h2>
          </Animate>
          <div className="zv-leaders-foryou">
            {leaders.forYou.items.map((item, i) => (
              <Animate key={i}>
                <div className="zv-leaders-foryou-card">
                  <h3 className="zv-leaders-foryou-title">{item.title}</h3>
                  <p className="zv-leaders-foryou-desc">{item.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{leaders.models.title}</h2>
            <p className="zv-body-text">{leaders.models.intro}</p>
          </Animate>
          <div className="zv-models">
            {leaders.models.options.map((model, i) => (
              <Animate key={i}>
                <div className="zv-model-card">
                  <div className="zv-model-name">{model.name}</div>
                  <div className="zv-model-desc">{model.description}</div>
                  <div className="zv-model-outcome">{model.outcome}</div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Who You Are Working With */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{leaders.practitioner.title}</h2>
          </Animate>
          {leaders.practitioner.bio.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 3)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      <PageClosing
        headline={leaders.contact.title}
        body={leaders.contact.description}
        primaryCta={{ label: leaders.contact.cta, href: leaders.contact.link }}
        secondaryCta={{ label: "Enterprise Transformation", to: "/for-enterprise" }}
      />

      <Footer />
    </div>
  );
}

export default LeadersPage;
