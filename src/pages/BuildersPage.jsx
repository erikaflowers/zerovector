import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import PageClosing from '../components/PageClosing';
import { ExternalLinkIcon, ArrowIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { builders } = en;

function BuildersPage() {
  useSEO({
    title: 'For Builders',
    description: 'Fall in love with the problem, not the solution. A guide for designers, developers, and creators building with AI using Zero-Vector principles.',
    path: '/builders',
    ogImage: 'https://zerovector.design/og/builders.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={builders.eyebrow} title={builders.title} subtitle={builders.subtitle} />

      {/* Intro + Catchphrase + Start CTA */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">The Builder's Mindset</h2>
          </Animate>
          <Animate>
            <blockquote className="zv-callout zv-builders-catchphrase">{builders.catchphrase}</blockquote>
          </Animate>
          {builders.intro.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 3)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
          <Animate delay={3}>
            <Link to="/start" className="zv-cta zv-builders-start-cta">Start Building <ArrowIcon size={14} /></Link>
          </Animate>
        </div>
      </section>

      {/* Getting Started — Expanded Steps */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{builders.getting_started.title}</h2>
          </Animate>
          <div className="zv-builders-steps">
            {builders.getting_started.steps.map((step, i) => (
              <Animate key={i}>
                <div className="zv-builders-step">
                  <div className="zv-builders-step-content">
                    <h3 className="zv-builders-step-title">{step.title}</h3>
                    <p className="zv-builders-step-desc">{step.description}</p>
                    {step.detail && (
                      <p className="zv-builders-step-detail">{step.detail}</p>
                    )}
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Reading List */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{builders.reading_list.title}</h2>
            <p className="zv-section-subtitle">{builders.reading_list.subtitle}</p>
          </Animate>
          <div className="zv-resource-list zv-resource-list--spaced">
            {builders.reading_list.books.map((book, i) => (
              <Animate key={i}>
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="zv-resource-card">
                  <div className="zv-resource-card-type">Book</div>
                  <div className="zv-resource-card-title">{book.title} <ExternalLinkIcon size={14} /></div>
                  <div className="zv-resource-card-desc">{book.author} — {book.description}</div>
                </a>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{builders.coaching.title}</h2>
            <p className="zv-body-text zv-builders-coaching-desc">{builders.coaching.description}</p>
            <a href={builders.coaching.link} className="zv-cta zv-cta-outline">{builders.coaching.cta}</a>
          </Animate>
        </div>
      </section>

      {/* Resources */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{builders.resources.title}</h2>
          </Animate>
          <div className="zv-resource-list">
            {builders.resources.items.map((item, i) => (
              <Animate key={i}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="zv-resource-card">
                  <div className="zv-resource-card-type">{item.type}</div>
                  <div className="zv-resource-card-title">{item.title} <ExternalLinkIcon size={14} /></div>
                </a>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{builders.community.title}</h2>
            <p className="zv-section-subtitle">{builders.community.subtitle}</p>
          </Animate>
          <div className="zv-builders-community zv-builders-community--spaced">
            {builders.community.channels.map((channel, i) => (
              <Animate key={i}>
                <div className="zv-builders-community-card">
                  <h3 className="zv-builders-community-card-title">{channel.title}</h3>
                  <p className="zv-builders-community-card-desc">{channel.description}</p>
                  {channel.url.startsWith('/') ? (
                    <Link to={channel.url} className="zv-builders-community-card-cta">
                      {channel.cta} <ArrowIcon size={14} />
                    </Link>
                  ) : (
                    <a href={channel.url} target="_blank" rel="noopener noreferrer" className="zv-builders-community-card-cta">
                      {channel.cta} <ExternalLinkIcon size={14} />
                    </a>
                  )}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <PageClosing
        headline="Keep Going"
        body="Read the principles behind the practice, or let us build it with you."
        primaryCta={{ label: "Read the Philosophy", to: "/philosophy" }}
        secondaryCta={{ label: "Hire Arroyo Labs", href: "https://arroyo.zerovector.design" }}
      />

    </div>
  );
}

export default BuildersPage;
