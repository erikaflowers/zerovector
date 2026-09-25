import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import PageClosing from '../components/PageClosing';
import NotifyForm from '../components/NotifyForm';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { zeroCamp } = en;

function ZeroCampPage() {
  useSEO({
    title: zeroCamp.seo.title,
    description: zeroCamp.seo.description,
    path: '/zero-camp',
  });

  const { promise, beforeAfter, loadout, format, cost, fit, next, instructor, faq, closing } = zeroCamp;

  return (
    <div className="zv-page zv-info-page zv-camp">
      <Nav />

      <PageHero eyebrow={zeroCamp.hero.eyebrow} title={zeroCamp.hero.title} subtitle={zeroCamp.hero.subtitle} />

      {/* Promise + price — the black first section */}
      <section className="zv-section">
        <div className="zv-container zv-camp-promise">
          <div className="zv-camp-promise-copy">
            <Animate>
              <h2 className="zv-section-title">{promise.title}</h2>
            </Animate>
            {promise.body.map((p, i) => (
              <Animate key={i}>
                <p className="zv-body-text">{p}</p>
              </Animate>
            ))}
          </div>
          <Animate className="zv-camp-price-card">
            <div className="zv-camp-chip zv-camp-chip--pink">{promise.priceLabel}</div>
            <div className="zv-camp-price">{promise.price}</div>
            <p className="zv-camp-price-note">{promise.priceNote}</p>
            <p className="zv-camp-price-waitlist">{promise.waitlistLabel}</p>
            <NotifyForm variant="light" tag={closing.tag} />
          </Animate>
        </div>
      </section>

      {/* Before / after */}
      <section className="zv-section">
        <div className="zv-container">
          <div className="zv-camp-split">
            {[beforeAfter.before, beforeAfter.after].map((side, i) => (
              <Animate key={side.label} className={`zv-camp-split-card ${i === 1 ? 'zv-camp-split-card--after' : ''}`}>
                <div className={`zv-camp-chip ${i === 0 ? 'zv-camp-chip--pink' : 'zv-camp-chip--green'}`}>{side.label}</div>
                <h3 className="zv-camp-split-title">{side.title}</h3>
                <ul className="zv-camp-list">
                  {side.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* The loadout */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{loadout.title}</h2>
            <p className="zv-section-subtitle">{loadout.subtitle}</p>
          </Animate>
          <div className="zv-camp-loadout">
            {loadout.columns.map((col) => (
              <Animate key={col.label} className="zv-camp-loadout-col">
                <div className="zv-camp-loadout-label">{col.label}</div>
                {col.items.map((item) => (
                  <div key={item.name} className="zv-camp-loadout-item">
                    <div className="zv-camp-loadout-name">{item.name}</div>
                    <div className="zv-camp-loadout-desc">{item.desc}</div>
                  </div>
                ))}
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* How it runs */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{format.title}</h2>
            <p className="zv-section-subtitle">{format.subtitle}</p>
          </Animate>
          <div className="zv-camp-sessions">
            {format.sessions.map((s) => (
              <Animate key={s.num} className="zv-camp-session">
                <div className="zv-camp-session-num">{s.num}</div>
                <h3 className="zv-camp-session-title">{s.title}</h3>
                <div className="zv-camp-session-time">{s.time}</div>
                <p className="zv-camp-session-desc">{s.desc}</p>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* What it costs */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{cost.title}</h2>
            <p className="zv-section-subtitle">{cost.subtitle}</p>
          </Animate>
          <Animate className="zv-camp-bill">
            {cost.lines.map((line) => (
              <div key={line.item} className="zv-camp-bill-row">
                <div className="zv-camp-bill-item">
                  <div className="zv-camp-bill-name">{line.item}</div>
                  <div className="zv-camp-bill-note">{line.note}</div>
                </div>
                <div className="zv-camp-bill-amount">{line.amount}</div>
              </div>
            ))}
          </Animate>
        </div>
      </section>

      {/* Fit */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{fit.title}</h2>
          </Animate>
          <div className="zv-camp-split">
            {[fit.for, fit.notFor].map((side, i) => (
              <Animate key={side.label} className="zv-camp-fit">
                <div className={`zv-camp-chip ${i === 0 ? 'zv-camp-chip--green' : 'zv-camp-chip--pink'}`}>{side.label}</div>
                <ul className="zv-camp-list">
                  {side.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Next: Launching from Orbit teaser */}
      <section className="zv-section zv-camp-next">
        <div className="zv-container">
          <Animate>
            <div className="zv-eyebrow zv-camp-next-label">{next.label}</div>
            <h2 className="zv-camp-next-title">{next.title}</h2>
            <p className="zv-camp-next-body">{next.body}</p>
          </Animate>
        </div>
      </section>

      {/* Instructor */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{instructor.title}</h2>
            <p className="zv-camp-instructor-name">{instructor.name}</p>
          </Animate>
          {instructor.body.map((p, i) => (
            <Animate key={i}>
              <p className="zv-body-text">{p}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{faq.title}</h2>
          </Animate>
          <div className="zv-camp-faq">
            {faq.items.map((item) => (
              <details key={item.q} className="zv-camp-faq-item">
                <summary className="zv-camp-faq-q">{item.q}</summary>
                <p className="zv-camp-faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PageClosing
        headline={closing.headline}
        body={closing.body}
        newsletterTag={closing.tag}
        notifyLabel={closing.notifyLabel}
      />
    </div>
  );
}

export default ZeroCampPage;
