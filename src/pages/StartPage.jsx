import { Link } from 'react-router-dom';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import PageClosing from '../components/PageClosing';
import Animate from '../components/Animate';
import { ExternalLinkIcon, ArrowIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { start } = en;

function StartPage() {
  useSEO({
    title: 'Get Started',
    description: 'Start building with Zero-Vector Design. Get Investiture, explore the Open Vector curriculum, and join the movement.',
    path: '/start',
    ogImage: 'https://zerovector.design/og/start.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <VectorField />
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={start.eyebrow} title={start.title} subtitle={start.subtitle} />

      {/* Intro */}
      <section className="zv-section">
        <div className="zv-container">
          {start.intro.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 2)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* Two Big CTAs — Investiture + Open Vector */}
      <section className="zv-section zv-start-actions-section">
        <div className="zv-container">
          <div className="zv-start-actions">
            <Animate>
              <Link to={start.actions.investiture.url} className="zv-start-action-card">
                <div className="zv-start-action-eyebrow">{start.actions.investiture.eyebrow}</div>
                <h3 className="zv-start-action-title">{start.actions.investiture.title}</h3>
                <p className="zv-start-action-desc">{start.actions.investiture.description}</p>
                <span className="zv-start-action-cta">{start.actions.investiture.cta} <ArrowIcon size={16} /></span>
              </Link>
            </Animate>
            <Animate delay={1}>
              <a href={start.actions.openVector.url} className="zv-start-action-card">
                <div className="zv-start-action-eyebrow">{start.actions.openVector.eyebrow}</div>
                <h3 className="zv-start-action-title">{start.actions.openVector.title}</h3>
                <p className="zv-start-action-desc">{start.actions.openVector.description}</p>
                <span className="zv-start-action-cta">{start.actions.openVector.cta} <ArrowIcon size={16} /></span>
              </a>
            </Animate>
          </div>
        </div>
      </section>

      {/* Announcement */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <div className="zv-start-announcement">
              <div className="zv-start-announcement-label">Featured</div>
              <h3 className="zv-start-announcement-title">{start.announcement.title}</h3>
              <p className="zv-start-announcement-desc">{start.announcement.description}</p>
              <a href={start.announcement.url} target="_blank" rel="noopener noreferrer" className="zv-start-announcement-cta">
                {start.announcement.cta} <ExternalLinkIcon size={14} />
              </a>
            </div>
          </Animate>
        </div>
      </section>

      <PageClosing
        headline="Connect"
        body="Follow the work, subscribe to the writing, or let us apply Zero Vector to your product."
        primaryCta={{ label: "Follow on LinkedIn", href: "https://www.linkedin.com/in/helloeflowers/" }}
        secondaryCta={{ label: "Arroyo Labs", href: "https://arroyo.zerovector.design" }}
      />
    </div>
  );
}

export default StartPage;
