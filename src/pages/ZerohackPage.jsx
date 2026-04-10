import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Animate from '../components/Animate';
import { useInView } from '../hooks/useInView';
import useSEO from '../hooks/useSEO';
import useBodyTheme from '../hooks/useBodyTheme';
import useFonts from '../hooks/useFonts';
import '../styles/site.css';
import en from '../content/en';

const ZH_FONT = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400&family=Outfit:wght@300;400;500;600;700&display=swap';

const { zerohack: zh } = en;

/* Animated counter — ticks from 0 to target when visible */
function CountUp({ target, suffix = '', prefix = '', duration = 1200 }) {
  const [ref, isVisible] = useInView();
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;
    const num = parseInt(target, 10);
    if (isNaN(num)) return;
    const steps = 30;
    const stepDuration = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(num * eased));
      if (step >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

function ZerohackPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useSEO({
    title: 'Zero Hack — Build for a Person, Not a Demo',
    description: 'Build for a person, not a demo. The first Zero Vector hackathon — two days, four sessions, real products for real users. May 9–10, 2026. Virtual.',
    path: '/zerohack',
    ogImage: 'https://zerovector.design/og/zerohack.png',
  });

  useEffect(() => {
    console.log(
      '%c🌅 ZERO HACK %c May 9–10, 2026',
      'background: linear-gradient(135deg, #E04A10, #5A1A5C); color: #FFF5EB; font-size: 18px; font-weight: 900; padding: 8px 16px; border-radius: 4px;',
      'color: #F0C850; font-size: 14px; font-weight: 400; padding: 8px 4px;'
    );
    console.log(
      '%cBuild for a person. Not a demo.%c\nzerovector.design/zerohack',
      'color: #FF2D8A; font-style: italic; font-size: 12px;',
      'color: #00E5C8; font-size: 11px;'
    );
  }, []);

  useBodyTheme({ background: '#1A0808', color: '#FFF5EB' });
  useFonts([ZH_FONT]);

  const progressRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroContentRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }

      // Nav solidify
      setScrolled(scrollTop > 80);

      if (prefersReduced) return;

      // Hero parallax — bg drifts slower, content fades out
      const heroH = window.innerHeight;
      const heroProgress = Math.min(scrollTop / heroH, 1);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${scrollTop * 0.3}px) scale(${1 + heroProgress * 0.05})`;
      }
      if (heroContentRef.current) {
        heroContentRef.current.style.opacity = 1 - heroProgress * 0.8;
        heroContentRef.current.style.transform = `translateY(${scrollTop * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="zh-page">
      {/* Scroll Progress */}
      <div ref={progressRef} className="zh-scroll-progress" style={{ width: '0%' }} />

      {/* Floating embers */}
      <div className="zh-embers" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="zh-ember" style={{ '--ember': i }} />
        ))}
      </div>

      {/* Nav */}
      <nav className={`zh-nav${scrolled ? ' zh-nav--solid' : ''}`}>
        <div className="zh-nav-inner">
          <div className="zh-nav-left">
            <Link to={zh.nav.backUrl} className="zh-nav-back">
              &larr; {zh.nav.back}
            </Link>
            <span className="zh-nav-sep" />
            <Link to="/zerohack" className="zh-nav-brand-link">{zh.nav.brand}</Link>
            <span className="zh-nav-sep" />
            <Link to="/zerohack/background" className="zh-nav-link">Background</Link>
          </div>
        </div>
      </nav>

      <main>
      {/* Hero */}
      <section className="zh-hero">
        <div ref={heroBgRef} className="zh-hero-bg" aria-hidden="true" />
        <div className="zh-hero-gradient" aria-hidden="true" />
        <div className="zh-hero-grain" aria-hidden="true" />
        <div className="zh-hero-stripes" aria-hidden="true">
          <div className="zh-stripe zh-stripe--pink" />
          <div className="zh-stripe zh-stripe--teal" />
          <div className="zh-stripe zh-stripe--pink-thin" />
        </div>
        <div ref={heroContentRef} className="zh-container zh-hero-content">
          <div className="zh-hero-meta">
            <span className="zh-hero-date">{zh.hero.date}</span>
            <span className="zh-hero-dot">&middot;</span>
            <span className="zh-hero-format-inline">{zh.hero.format}</span>
          </div>
          <h1 className="zh-hero-headline">
            <span className="zh-hero-headline-line" data-text={zh.hero.headlineTop}>{zh.hero.headlineTop}</span>
            <span className="zh-hero-headline-line" data-text={zh.hero.headlineBottom}>{zh.hero.headlineBottom}</span>
          </h1>
          <p className="zh-hero-subline">{zh.hero.subline}</p>
        </div>
      </section>

      {/* What Is Zero Hack */}
      <section className="zh-section zh-section--dark zh-section--tight">
        <div className="zh-container">
          <div className="zh-what-grid">
            <Animate>
              <div className="zh-what-left">
                <div className="zh-label">{zh.whatIs.label}</div>
                <h2 className="zh-section-headline">{zh.whatIs.headline}</h2>
              </div>
            </Animate>
            <Animate delay={1}>
              <div className="zh-what-body">
                {zh.whatIs.body.map((p, i) => (
                  <p key={i} className="zh-body-text">{p}</p>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* The Structure */}
      <section className="zh-section zh-section--gradient">
        <div className="zh-section-bg-city" aria-hidden="true" />
        <div className="zh-section-mesh" aria-hidden="true" />
        <div className="zh-section-grain" aria-hidden="true" />
        <div className="zh-container">
          <Animate>
            <div className="zh-label">{zh.structure.label}</div>
            <h2 className="zh-section-headline">{zh.structure.headline}</h2>
          </Animate>
          <div className="zh-timeline">
            {zh.structure.sessions.map((s, i) => (
              <Animate key={i} delay={Math.min(i + 1, 3)}>
                <div className="zh-session">
                  <div className="zh-session-marker">
                    <span className="zh-session-num">{s.num}</span>
                  </div>
                  <div className="zh-session-content">
                    <div className="zh-session-meta">
                      <span className="zh-session-day">{s.day}</span>
                      <span className="zh-session-time">{s.time}</span>
                    </div>
                    <h3 className="zh-session-title">{s.title}</h3>
                    <p className="zh-session-desc">{s.desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* How You Win */}
      <section className="zh-section zh-section--dark">
        <div className="zh-container">
          <Animate>
            <div className="zh-label">{zh.judging.label}</div>
            <h2 className="zh-section-headline">{zh.judging.headline}</h2>
          </Animate>
          <div className="zh-rubric-grid">
            {zh.judging.categories.map((cat, i) => (
              <Animate key={i} delay={Math.min(i + 1, 3)}>
                <div className="zh-rubric-card">
                  <div className="zh-rubric-weight"><CountUp target="25" suffix="%" duration={1000} /></div>
                  <div className="zh-rubric-name">{cat.name}</div>
                  <div className="zh-rubric-question">{cat.question}</div>
                  <p className="zh-rubric-desc">{cat.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
          <Animate>
            <p className="zh-rubric-note">{zh.judging.note}</p>
          </Animate>
        </div>
      </section>

      {/* Hosts */}
      <section className="zh-section zh-hosts">
        <div className="zh-hosts-bg" aria-hidden="true" />
        <div className="zh-hosts-overlay" aria-hidden="true" />
        <div className="zh-hosts-grain" aria-hidden="true" />
        <div className="zh-container zh-hosts-inner">
          <Animate>
            <div className="zh-label">{zh.hosts.label}</div>
            <h2 className="zh-section-headline zh-hosts-headline">{zh.hosts.headline}</h2>
          </Animate>
          <div className="zh-hosts-grid">
            {zh.hosts.people.map((person, i) => (
              <Animate key={i} delay={Math.min(i + 1, 3)}>
                <div className={`zh-host-card ${i === 0 ? 'zh-host-card--featured' : ''}`}>
                  <div className="zh-host-photo">
                    {person.photo
                      ? <img src={person.photo} alt={person.name} />
                      : <span className="zh-host-photo-placeholder">{person.name === 'TBD' ? '?' : person.name.charAt(0)}</span>
                    }
                  </div>
                  <div className="zh-host-flash" aria-hidden="true" />
                  <div className="zh-host-info">
                    <div className="zh-host-name">{person.name}</div>
                    <div className="zh-host-role">{person.role}</div>
                    <p className="zh-host-bio">{person.bio}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="zh-section zh-section--warm">
        <div className="zh-container">
          <Animate>
            <div className="zh-label">{zh.prizes.label}</div>
            <h2 className="zh-section-headline">{zh.prizes.headline}</h2>
            <p className="zh-prizes-subline">{zh.prizes.subline}</p>
          </Animate>
          <Animate>
            <div className="zh-prize-card zh-prize-card--first zh-prize-card--hero">
              <div className="zh-prize-place">{zh.prizes.tiers[0].place}</div>
              <div className="zh-prize-name">{zh.prizes.tiers[0].prize}</div>
              <div className="zh-prize-includes">+ {zh.prizes.tiers[0].includes}</div>
            </div>
          </Animate>
          <div className="zh-prizes-grid">
            {zh.prizes.tiers.slice(1).map((tier, i) => (
              <Animate key={i} delay={Math.min(i + 1, 2)}>
                <div className="zh-prize-card">
                  <div className="zh-prize-place">{tier.place}</div>
                  <div className="zh-prize-name">{tier.prize}</div>
                  <div className="zh-prize-includes">+ {tier.includes}</div>
                </div>
              </Animate>
            ))}
          </div>
          <Animate>
            <div className="zh-why-mini">
              <h3 className="zh-why-mini-headline">{zh.prizes.whyMacMini.headline}</h3>
              <p className="zh-why-mini-body">{zh.prizes.whyMacMini.body}</p>
            </div>
          </Animate>
          <Animate>
            <div className="zh-prizes-all">
              <div className="zh-prizes-all-label">{zh.prizes.allParticipants.label}</div>
              <ul className="zh-prizes-all-list">
                {zh.prizes.allParticipants.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </Animate>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="zh-footer">
        <div className="zh-footer-inner">
          <div className="zh-footer-brand">
            <a href={zh.footer.url} className="zh-footer-link">{zh.footer.brand}</a>
          </div>
          <div className="zh-footer-tagline">{zh.footer.tagline}</div>
        </div>
      </footer>
    </div>
  );
}

export default ZerohackPage;
