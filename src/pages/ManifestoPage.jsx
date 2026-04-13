import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import SectionHeader from '../components/SectionHeader';
import { ArrowIcon } from '../components/icons';
import NotifyForm from '../components/NotifyForm';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { home } = en;

const PATH_COLORS = ['pink', 'green', 'orange'];

function ManifestoPage() {

  useSEO({
    title: 'Zero-Vector Design',
    description: 'A design philosophy for the age of AI. No intermediary. No translation layer. No friction. From intent to artifact, directly.',
    path: '/',
    ogImage: 'https://zerovector.design/og/manifesto.png',
  });

  return (
    <div className="zv-manifesto">
      <Nav />

      {/* Drifting Coordinates */}
      <div className="zv-coordinates">{home.hero.coordinates}</div>

      {/* Hero v2 — visual refresh WIP, lives above the old hero during makeover */}
      <section className="zv-hero-v2">
        <div className="zv-hero-v2-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="zv-hero-v2-video"
          >
            <source src="/video/zb-bg-hero.mov" type="video/mp4" />
          </video>
          <div className="zv-hero-v2-video-overlay" />
        </div>
        <div className="zv-hero-v2-inner">
          <h1 className="zv-hero-v2-title">Zero Vector</h1>
          <div className="zv-hero-v2-right">
            <p className="zv-hero-v2-tagline">
              No intermediary. No translation layer. No friction. From intent to artifact, directly.
            </p>
            <nav className="zv-hero-v2-links" aria-label="Featured">
              <a href="https://open.zerovector.design" target="_blank" rel="noopener noreferrer">
                Open Vector.
              </a>
              <a href="https://arroyo.zerovector.design" target="_blank" rel="noopener noreferrer">
                Arroyo Labs.
              </a>
              <Link to="/investiture">
                Investiture.
              </Link>
              <a href="https://herelabrador.ai" target="_blank" rel="noopener noreferrer">
                Labrador.
              </a>
              <a href="https://eflowers.substack.com/p/zero-stage-to-orbit" target="_blank" rel="noopener noreferrer">
                Zero Stage to Orbit.
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Combined Hero — Above the Fold */}
      <section className="zv-section zv-hero-combined">
        <div className="zv-container">
          <div className="zv-hero-columns">
            {/* LEFT: Explainer + buttons */}
            <div className="zv-hero-col-left">
              <div className="zv-hero-declaration-label">
                <span>The Starting Point</span>
              </div>
              <h2 className="zv-explainer-headline">{home.explainer.headline}</h2>
              <p className="zv-explainer-body">{home.explainer.body}</p>
              <div className="zv-explainer-paths">
                {home.explainer.paths.map((path, i) => (
                  <Link key={i} to={path.link} className={`zv-explainer-path zv-explainer-path--${PATH_COLORS[i]}`}>
                    {path.label} <ArrowIcon size={14} />
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: Featured Essay Card */}
            <div className="zv-hero-col-right">
              <span className="zv-page-hero-essay-label" style={{color: '#fff'}}>
                Featured Essay
              </span>
              <a
                href="https://eflowers.substack.com/p/zero-stage-to-orbit"
                target="_blank"
                rel="noopener noreferrer"
                className="zv-page-hero-essay"
              >
                <img
                  src="https://substack-post-media.s3.amazonaws.com/public/images/04e8e131-9dcf-44ec-953a-b96e5ad85e1c_1600x678.jpeg"
                  alt="Zero Stage to Orbit"
                  className="zv-page-hero-essay-img"
                  loading="lazy"
                />
                <div className="zv-page-hero-essay-meta">
                  <div className="zv-page-hero-essay-date">February 21, 2026</div>
                  <div className="zv-page-hero-essay-title">Zero Stage to Orbit</div>
                  <div className="zv-page-hero-essay-subtitle">The design-to-development pipeline is not broken; it is a multi-stage rocket, and we never questioned the gravity.</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 003 — Pipeline */}
      <section className="zv-section zv-section--pipeline">
        <div className="zv-container">
          <Animate>
            <SectionHeader title={home.pipeline.title} />
            <p className="zv-section-subtitle zv-pipeline-header">{home.pipeline.header}</p>
          </Animate>
          <Animate delay={1}>
            <p className="zv-body-text">{home.pipeline.intro[1]}</p>
          </Animate>
          <div className="zv-pipeline">
            {home.pipeline.phases.map((phase, i) => (
              <div key={i} className="zv-pipeline-card">
                <div className="zv-pipeline-card-title">{phase.name}</div>
                <div className="zv-pipeline-card-text">{phase.new}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 004 — The Seven Principles */}
      <section className="zv-section zv-section--principles">
        <div className="zv-container">
          <Animate>
            <SectionHeader title={home.principles.title} />
          </Animate>
          <Animate delay={1}>
            <p className="zv-body-text zv-principles-intro">{home.principles.intro}</p>
          </Animate>
          <Animate>
            <div className="zv-principle-zero-home">
              <div className="zv-principle-zero-home-numeral">PRINCIPLE ZERO</div>
              <div className="zv-principle-zero-home-text">{home.principles.principle_zero}</div>
            </div>
          </Animate>
          <div className="zv-principles-list">
            {home.principles.items.map((p, i) => (
              <Animate key={i}>
                <div className="zv-principle-summary">
                  <div className="zv-principle-summary-numeral">{p.numeral}</div>
                  <div className="zv-principle-summary-content">
                    <h3 className="zv-principle-summary-title">{p.title}</h3>
                    <p className="zv-principle-summary-body">{p.body}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
          <Animate>
            <Link to="/philosophy" className="zv-principles-cta">
              Explore the principles <ArrowIcon size={16} />
            </Link>
          </Animate>
        </div>
      </section>

      {/* 005 — What This Is Not. What This Is. */}
      <section className="zv-section zv-section--contrasts">
        <div className="zv-container">
          <Animate>
            <SectionHeader title={home.contrasts.title} />
          </Animate>
          <div className="zv-contrasts">
            {home.contrasts.pairs.map((pair, i) => (
              <Animate key={i}>
                <div className="zv-contrast-pair">
                  <div className="zv-contrast-side zv-contrast-not">
                    <div className="zv-contrast-label">What This Is Not</div>
                    <h3 className="zv-contrast-title">{pair.isNot.title}</h3>
                    <p className="zv-contrast-body">{pair.isNot.body}</p>
                  </div>
                  <div className="zv-contrast-side zv-contrast-is">
                    <div className="zv-contrast-label">What This Is</div>
                    <h3 className="zv-contrast-title">{pair.is.title}</h3>
                    <p className="zv-contrast-body">{pair.is.body}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* 007 — Set Coordinates */}
      <section className="zv-section zv-section--closing zv-closing">
        <div className="zv-container">
          <Animate>
            <SectionHeader title={home.closing.headline} />
          </Animate>
          <Animate delay={1}>
            <p className="zv-body-text zv-closing-permission">{home.closing.permission}</p>
          </Animate>
          <Animate delay={2}>
            <p className="zv-body-text">{home.closing.body}</p>
          </Animate>
          <Animate delay={3}>
            <div className="zv-paths zv-closing-paths">
              <Link to={home.closing.paths.builders.link} className="zv-path-card">
                <div className="zv-path-eyebrow">{home.closing.paths.builders.eyebrow}</div>
                <div className="zv-path-title">{home.closing.paths.builders.title}</div>
                <p className="zv-path-desc">{home.closing.paths.builders.description}</p>
                <span className="zv-path-cta">{home.closing.paths.builders.cta} <ArrowIcon size={16} /></span>
              </Link>
              <Link to={home.closing.paths.leaders.link} className="zv-path-card">
                <div className="zv-path-eyebrow">{home.closing.paths.leaders.eyebrow}</div>
                <div className="zv-path-title">{home.closing.paths.leaders.title}</div>
                <p className="zv-path-desc">{home.closing.paths.leaders.description}</p>
                <span className="zv-path-cta">{home.closing.paths.leaders.cta} <ArrowIcon size={16} /></span>
              </Link>
            </div>
          </Animate>
          <hr className="zv-closing-divider" />
          <div className="zv-closing-cards-grid">
            <Animate>
              <a href={home.closing.openVector.link} className="zv-open-vector-card">
                <span className="zv-open-vector-card-badge">{home.closing.openVector.badge}</span>
                <span className="zv-open-vector-card-title">{home.closing.openVector.title}</span>
                <span className="zv-open-vector-card-desc">{home.closing.openVector.description}</span>
                <span className="zv-open-vector-card-cta">{home.closing.openVector.cta} <ArrowIcon size={16} /></span>
              </a>
            </Animate>
            <Animate>
              <a href={home.closing.arroyo.link} target="_blank" rel="noopener noreferrer" className="zv-arroyo-card">
                <span className="zv-arroyo-card-badge">{home.closing.arroyo.badge}</span>
                <span className="zv-arroyo-card-title">{home.closing.arroyo.title}</span>
                <span className="zv-arroyo-card-desc">{home.closing.arroyo.description}</span>
                <span className="zv-arroyo-card-cta">{home.closing.arroyo.cta} <ArrowIcon size={16} /></span>
              </a>
            </Animate>
          </div>
          <Animate delay={1}>
            <div className="zv-closing-notify">
              <p className="zv-closing-notify-text">Get notified when new Zero Vector content drops.</p>
              <NotifyForm variant="orange" tag="zerovector" />
            </div>
          </Animate>
          <nav className="zv-page-closing-nav" aria-label="Site navigation">
            <a href="https://open.zerovector.design">Open Vector</a>
            <Link to="/investiture">Investiture</Link>
            <Link to="/start">Get Started</Link>
            <a href="https://arroyo.zerovector.design" target="_blank" rel="noopener noreferrer">Arroyo Labs</a>
            <a href="https://herelabrador.ai" target="_blank" rel="noopener noreferrer">Labrador</a>
            <a href="https://eflowers.substack.com" target="_blank" rel="noopener noreferrer">Substack</a>
            <a href="https://www.linkedin.com/in/helloeflowers/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://helloerikaflowers.com" target="_blank" rel="noopener noreferrer">helloerikaflowers.com</a>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default ManifestoPage;
