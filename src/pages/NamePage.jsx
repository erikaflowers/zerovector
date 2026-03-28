import { Link } from 'react-router-dom';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import DecryptText from '../components/DecryptText';
import Animate from '../components/Animate';
import PageClosing from '../components/PageClosing';
import { ArrowIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { name } = en;

function ZeroVectorDiagram() {
  return (
    <svg
      className="zv-name-diagram-svg"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Grid lines */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Axes */}
      <line x1="200" y1="380" x2="200" y2="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Ghost vectors (faded, showing potential directions) */}
      {[30, 75, 120, 160, 210, 250, 300, 340].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const len = 60 + (i % 3) * 20;
        return (
          <line
            key={angle}
            x1="200" y1="200"
            x2={200 + Math.cos(rad) * len}
            y2={200 - Math.sin(rad) * len}
            stroke="rgba(0,255,136,0.08)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        );
      })}

      {/* Origin dot */}
      <circle cx="200" cy="200" r="6" fill="#00ff88" />
      <circle cx="200" cy="200" r="12" fill="none" stroke="rgba(0,255,136,0.2)" strokeWidth="1" />
      <circle cx="200" cy="200" r="20" fill="none" stroke="rgba(0,255,136,0.08)" strokeWidth="1" />

      {/* Notation */}
      <text x="200" y="390" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="14" fontFamily="'JetBrains Mono', monospace">
        |v| = 0
      </text>
    </svg>
  );
}

function NamePage() {
  useSEO({
    title: 'Zero Vector — The Name',
    description: 'It started as a joke about vector art tools. It ended up describing a new discipline. The meaning behind the name Zero Vector.',
    path: '/name',
    ogImage: 'https://zerovector.design/og/name.png',
  });

  return (
    <div className="zv-name-page">
      <VectorField />
      <Nav />

      {/* Hero */}
      <section className="zv-section zv-name-hero">
        <div className="zv-container">
          <div className="zv-name-hero-eyebrow">{name.eyebrow}</div>
          <h1 className="zv-name-hero-title">
            <DecryptText text={name.title} speed={80} />
          </h1>
          <p className="zv-name-hero-subtitle">{name.subtitle}</p>
        </div>
      </section>

      {/* Stages + Diagram */}
      <section className="zv-section zv-name-content-section">
        <div className="zv-container">
          <div className="zv-name-split">
            {/* Left: stages */}
            <div className="zv-name-stages">
              {name.stages.map((stage, i) => (
                <Animate key={stage.id} delay={Math.min(i, 2)}>
                  <div className="zv-name-stage-item">
                    <div className="zv-name-stage-label">{stage.label}</div>
                    <p className="zv-name-stage-text">{stage.text}</p>
                  </div>
                </Animate>
              ))}
            </div>

            {/* Right: static diagram */}
            <div className="zv-name-diagram">
              <Animate>
                <ZeroVectorDiagram />
              </Animate>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="zv-section zv-name-conclusion-section">
        <div className="zv-container">
          {name.conclusion.map((line, i) => (
            <Animate key={i} delay={i}>
              <p className="zv-body-text zv-name-conclusion-line">{line}</p>
            </Animate>
          ))}
        </div>
      </section>

      <PageClosing
        headline="Read the Principles"
        body="Now that you know the name, see what it stands for."
        primaryCta={{ label: "The Philosophy", to: "/philosophy" }}
        secondaryCta={{ label: "The Manifesto", to: "/" }}
      />

    </div>
  );
}

export default NamePage;
