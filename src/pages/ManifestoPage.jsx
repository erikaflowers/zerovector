import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import SectionHeader from '../components/SectionHeader';
import DecryptText from '../components/DecryptText';
import { ArrowIcon } from '../components/icons';
import BootSequence from '../components/BootSequence';
import NotifyForm from '../components/NotifyForm';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

function ChevronIcon({ size = 20, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const { home, recommendedReading } = en;

function ManifestoPage() {
  const [booted, setBooted] = useState(() => {
    try { return !!sessionStorage.getItem('zv-booted'); } catch { return false; }
  });
  const [declarationVisible, setDeclarationVisible] = useState(() => {
    try { return !!sessionStorage.getItem('zv-booted'); } catch { return false; }
  });
  const [heroPhase, setHeroPhase] = useState(0); // 0=start, 1=eyebrow done, 2=title done

  // When boot completes, delay declaration to match fade timing
  useEffect(() => {
    if (booted && !declarationVisible) {
      const timer = setTimeout(() => setDeclarationVisible(true), 750);
      return () => clearTimeout(timer);
    }
  }, [booted, declarationVisible]);
  const [pipelineExpanded, setPipelineExpanded] = useState(false);

  useSEO({
    title: 'Zero-Vector Design',
    description: 'A design philosophy for the age of AI. No intermediary. No translation layer. No friction. From intent to artifact, directly.',
    path: '/',
    ogImage: 'https://zerovector.design/og/manifesto.png',
  });

  return (
    <div className="zv-manifesto">
      <VectorField />
      <Nav />

      {/* Drifting Coordinates */}
      <div className="zv-coordinates">{home.hero.coordinates}</div>

      {/* Combined Hero — Above the Fold */}
      <section className="zv-section zv-hero-combined">
        <div className="zv-container">
          {/* Title Block */}
          <div className="zv-hero-title-block">
            <div className="zv-section-number">
              <DecryptText
                text={home.hero.pre}
                ready
                delay={200}
                blinks={2}
                blinkSpeed={130}
                speed={115}
                onComplete={() => setHeroPhase(1)}
              />
            </div>
            <h1 className="zv-hero-title">
              <DecryptText
                text={home.hero.title}
                ready={heroPhase >= 1}
                delay={100}
                blinks={3}
                blinkSpeed={160}
                speed={200}
                onComplete={() => setHeroPhase(2)}
              />
            </h1>
            <p className={`zv-hero-subtitle ${heroPhase >= 2 ? 'zv-hero-decrypt-reveal' : 'zv-hero-decrypt-hidden'}`}>
              {home.hero.subtitle}
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="zv-hero-columns">
            {/* LEFT: Explainer */}
            <div className="zv-hero-col-left">
              <div className="zv-hero-declaration-label">
                <span>001</span>
                <span>The Starting Point</span>
              </div>
              <h2 className="zv-explainer-headline">{home.explainer.headline}</h2>
              <p className="zv-explainer-body">{home.explainer.body}</p>
              <div className="zv-explainer-paths">
                {home.explainer.paths.map((path, i) => (
                  <Link key={i} to={path.link} className="zv-explainer-path">
                    {path.label} <ArrowIcon size={14} />
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: Boot Terminal → Declaration */}
            <div className="zv-hero-col-right">
              {!booted && (
                <BootSequence onComplete={() => setBooted(true)} />
              )}
              {declarationVisible && (
                <div className="zv-hero-declaration">
                  <div className="zv-hero-declaration-label">
                    <span>{home.declaration.number}</span>
                    <span>{home.declaration.title}</span>
                  </div>
                  <p className="zv-hero-declaration-text">{home.declaration.paragraphs[0]}</p>
                  <p className="zv-hero-declaration-text">{home.declaration.paragraphs[1]}</p>
                  <blockquote className="zv-hero-declaration-callout">
                    {home.declaration.callout2}
                  </blockquote>
                  <a
                    href="https://eflowers.substack.com/p/zero-stage-to-orbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zv-declaration-article"
                  >
                    Launch from orbit, not the gravity well &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 003 — Pipeline */}
      <section className="zv-section zv-section--pipeline">
        <div className="zv-container">
          <Animate>
            <SectionHeader number={home.pipeline.number} title={home.pipeline.title} />
            <p className="zv-pipeline-header">{home.pipeline.header}</p>
          </Animate>
          <Animate delay={1}>
            <p className="zv-body-text">{home.pipeline.intro[1]}</p>
          </Animate>
          <div className="zv-pipeline">
            {home.pipeline.phases.slice(0, 3).map((phase, i) => (
              <Animate key={i}>
                <div className="zv-pipeline-phase">
                  <div className="zv-pipeline-label">{phase.name}</div>
                  <div className="zv-pipeline-card zv-pipeline-card-old">
                    <div className="zv-pipeline-tag zv-pipeline-tag-old">Before</div>
                    <div className="zv-pipeline-old">{phase.old}</div>
                  </div>
                  <div className="zv-pipeline-card zv-pipeline-card-new">
                    <div className="zv-pipeline-tag zv-pipeline-tag-new">Zero-Vector</div>
                    <div className="zv-pipeline-new">{phase.new}</div>
                  </div>
                </div>
              </Animate>
            ))}
            {pipelineExpanded && home.pipeline.phases.slice(3).map((phase, i) => (
              <Animate key={i + 3}>
                <div className="zv-pipeline-phase">
                  <div className="zv-pipeline-label">{phase.name}</div>
                  <div className="zv-pipeline-card zv-pipeline-card-old">
                    <div className="zv-pipeline-tag zv-pipeline-tag-old">Before</div>
                    <div className="zv-pipeline-old">{phase.old}</div>
                  </div>
                  <div className="zv-pipeline-card zv-pipeline-card-new">
                    <div className="zv-pipeline-tag zv-pipeline-tag-new">Zero-Vector</div>
                    <div className="zv-pipeline-new">{phase.new}</div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
          <div className="zv-pipeline-expand-wrap">
            <button className="zv-pipeline-expand" onClick={() => setPipelineExpanded(!pipelineExpanded)}>
              {pipelineExpanded ? 'Show fewer' : `See all ${home.pipeline.phases.length} phases`}
              <ChevronIcon size={16} className={`zv-pipeline-expand-chevron ${pipelineExpanded ? 'zv-pipeline-expand-chevron--open' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 004 — The Seven Principles */}
      <section className="zv-section zv-section--principles">
        <div className="zv-container">
          <Animate>
            <SectionHeader number={home.principles.number} title={home.principles.title} />
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
            <SectionHeader number={home.contrasts.number} title={home.contrasts.title} />
          </Animate>
          <div className="zv-contrasts">
            {home.contrasts.pairs.map((pair, i) => (
              <Animate key={i}>
                <div className="zv-contrast-pair">
                  <div className="zv-contrast-side zv-contrast-not">
                    <div className="zv-contrast-label">Is not</div>
                    <h3 className="zv-contrast-title">{pair.isNot.title}</h3>
                    <p className="zv-contrast-body">{pair.isNot.body}</p>
                  </div>
                  <div className="zv-contrast-side zv-contrast-is">
                    <div className="zv-contrast-label">Is</div>
                    <h3 className="zv-contrast-title">{pair.is.title}</h3>
                    <p className="zv-contrast-body">{pair.is.body}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* 006 — Why "Zero Vector" — Name Teaser */}
      <section className="zv-section zv-name-teaser-section">
        <div className="zv-container">
          <Animate>
            <SectionHeader number="006" title='Why "Zero Vector"?' />
          </Animate>
          <Animate delay={1}>
            <p className="zv-body-text zv-name-teaser-text">{en.name.teaser}</p>
          </Animate>
          <Animate delay={1}>
            <Link to="/name" className="zv-name-teaser-cta">
              See the full story <ArrowIcon size={16} />
            </Link>
          </Animate>
        </div>
      </section>

      {/* 007 — Set Coordinates */}
      <section className="zv-section zv-section--closing zv-closing">
        <div className="zv-container">
          <Animate>
            <SectionHeader number={home.closing.number} title={home.closing.headline} />
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
          <Animate>
            <a href={home.closing.openVector.link} className="zv-open-vector-card">
              <span className="zv-open-vector-card-badge">{home.closing.openVector.badge}</span>
              <span className="zv-open-vector-card-title">{home.closing.openVector.title}</span>
              <span className="zv-open-vector-card-desc">{home.closing.openVector.description}</span>
              <span className="zv-open-vector-card-cta">{home.closing.openVector.cta} <ArrowIcon size={16} /></span>
            </a>
          </Animate>
          <Animate>
            <a href="https://arroyo.zerovector.design" target="_blank" rel="noopener noreferrer" className="zv-arroyo-card">
              <span className="zv-arroyo-card-badge">Commercial</span>
              <span className="zv-arroyo-card-title">Arroyo Labs</span>
              <span className="zv-arroyo-card-desc">Want Zero Vector applied to your product? Arroyo Labs delivers strategy, design, and engineering in a single engagement.</span>
              <span className="zv-arroyo-card-cta">Learn more <ArrowIcon size={16} /></span>
            </a>
          </Animate>
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
