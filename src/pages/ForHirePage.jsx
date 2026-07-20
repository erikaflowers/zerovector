import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import PageClosing from '../components/PageClosing';
import Animate from '../components/Animate';
import { ExternalLinkIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';

function ForHirePage() {
  useSEO({
    title: 'For Hire — Arroyo Labs',
    description: 'A product studio that builds minimum viable businesses using the Zero Vector methodology. Two stacks, one engagement, zero handoffs.',
    path: '/for-hire',
  });

  return (
    <div className="zv-page zv-info-page">
      <Nav />

      <PageHero
        eyebrow="For Hire"
        title="For Hire"
        subtitle="Your product needs more than code."
      />

      {/* Black first section */}
      <section className="zv-section zv-invert">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">Arroyo Labs</h2>
          </Animate>
          <Animate>
            <p className="zv-body-text">
              A product studio that builds minimum viable businesses using the Zero Vector methodology.
              Two stacks, one engagement, zero handoffs. Strategy, design, and engineering delivered
              by one person with AI agents as crew.
            </p>
          </Animate>
          <Animate>
            <p className="zv-body-text">
              This is not an agency. There is no account manager. No sprint planning theater.
              You get the person who holds the vision across the entire arc — research, strategy,
              design, build, ship — the same way Zero Vector was built.
            </p>
          </Animate>
        </div>
      </section>

      {/* Big OG image link */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <a
              href="https://arroyo.zerovector.design"
              target="_blank"
              rel="noopener noreferrer"
              className="zv-hire-card"
            >
              <img
                src="/images/arroyo-og.png"
                alt="Arroyo Labs — Your Product Needs More Than Code"
                className="zv-hire-card-img"
              />
              <div className="zv-hire-card-meta">
                <div className="zv-hire-card-title">
                  Arroyo Labs <ExternalLinkIcon size={18} />
                </div>
                <div className="zv-hire-card-desc">
                  Strategy, design, and engineering in a single engagement.
                </div>
              </div>
            </a>
          </Animate>
        </div>
      </section>

      {/* What you get */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">What You Get</h2>
          </Animate>
          <div className="zv-hire-grid">
            <Animate>
              <div className="zv-hire-item">
                <h3 className="zv-hire-item-title">Discovery</h3>
                <p className="zv-hire-item-desc">
                  Problem framing, market research, JTBD analysis, and a VECTOR.md doctrine
                  that becomes the north star for everything built after it.
                </p>
              </div>
            </Animate>
            <Animate>
              <div className="zv-hire-item">
                <h3 className="zv-hire-item-title">Design + Build</h3>
                <p className="zv-hire-item-desc">
                  No handoff between design and engineering. The artifact is the design.
                  Working code from day one, iterated with real users.
                </p>
              </div>
            </Animate>
            <Animate>
              <div className="zv-hire-item">
                <h3 className="zv-hire-item-title">Ship + Learn</h3>
                <p className="zv-hire-item-desc">
                  Deployed, tested with real humans, and iterated based on what they actually do.
                  Not what a usability test says they might do.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <PageClosing
        headline="Ready?"
        body="Let's talk about what you're building."
        primaryCta={{ label: "Visit Arroyo Labs", href: "https://arroyo.zerovector.design" }}
        secondaryCta={{ label: "Read the Philosophy", to: "/philosophy" }}
      />
    </div>
  );
}

export default ForHirePage;
