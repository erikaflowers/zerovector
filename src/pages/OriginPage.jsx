import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import PageClosing from '../components/PageClosing';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { origin } = en;

function OriginPage() {
  useSEO({
    title: 'The Origin',
    description: 'The story behind Zero-Vector Design. 31 years of UX and service design, AI experiments, and one question: what if one person could build the whole thing?',
    path: '/origin',
    ogImage: 'https://zerovector.design/og/origin.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={origin.eyebrow} title={origin.title} subtitle={origin.subtitle} />

      {/* Intro — Black First Section */}
      <section className="zv-section zv-origin-intro-section">
        <div className="zv-container">
          <div className="zv-origin-intro-row">
            <div className="zv-origin-intro-text">
              <Animate>
                <h2 className="zv-section-title">Hello, I'm Erika.</h2>
              </Animate>
              {origin.intro.map((p, i) => (
                <Animate key={i} delay={Math.min(i + 1, 2)}>
                  <p className="zv-body-text">{p}</p>
                </Animate>
              ))}
              <Animate delay={2}>
                <p className="zv-body-text">
                  <a href="https://helloerikaflowers.com" target="_blank" rel="noopener noreferrer">helloerikaflowers.com</a>
                </p>
              </Animate>
            </div>
            <Animate delay={1}>
              <div className="zv-origin-headshot-wrap">
                <img src="/images/erika-headshot.jpg" alt="Erika Flowers" className="zv-origin-headshot" />
              </div>
            </Animate>
          </div>
          <Animate delay={2}>
            <div className="zv-origin-credentials">
              <div className="zv-origin-credential">NASA</div>
              <div className="zv-origin-credential">Silicon Valley Veteran</div>
              <div className="zv-origin-credential">Writer, Inventor, and Punk</div>
            </div>
          </Animate>
        </div>
      </section>

      {/* The AI Journey */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{origin.ai_journey.title}</h2>
          </Animate>
          {origin.ai_journey.paragraphs.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 3)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* The Redefinition */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{origin.redefinition.title}</h2>
          </Animate>
          {origin.redefinition.paragraphs.map((p, i) => (
            <Animate key={i} delay={Math.min(i + 1, 3)}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* The Author */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{origin.author.title}</h2>
          </Animate>
          <Animate delay={1}>
            <p className="zv-body-text">{origin.author.body}</p>
          </Animate>
        </div>
      </section>

      <PageClosing
        headline="What Comes Next"
        body={origin.cta.text}
        primaryCta={{ label: origin.cta.label, href: origin.cta.url }}
        secondaryCta={{ label: "Start Building", to: "/for-builders" }}
      />

    </div>
  );
}

export default OriginPage;
