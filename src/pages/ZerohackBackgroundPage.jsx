import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import useBodyTheme from '../hooks/useBodyTheme';
import '../styles/site.css';
import en from '../content/en';

const { zerohack: zh, zerohackBackground: bg } = en;

function renderParagraph(block, i) {
  const className = block.emphasis ? 'zh-bg-emphasis' : 'zh-bg-body';
  if (block.segments) {
    return (
      <p key={i} className={className}>
        {block.segments.map((seg, j) =>
          seg.em ? <em key={j}>{seg.text}</em> : <span key={j}>{seg.text}</span>
        )}
      </p>
    );
  }
  return <p key={i} className={className}>{block.text}</p>;
}

function ZerohackBackgroundPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useSEO({
    title: 'The Janky Demo That Won — Zero Hack Background',
    description: 'We had the worst demo at a 2019 VR hackathon. We also had the only real problem. The story behind Zero Hack.',
    path: '/zerohack/background',
  });

  useBodyTheme({ background: '#1A0808', color: '#FFF5EB' });

  return (
    <div className="zh-page">
      {/* Nav */}
      <nav className="zh-nav zh-nav--solid">
        <div className="zh-nav-inner">
          <div className="zh-nav-left">
            <Link to="/" className="zh-nav-back">&larr; Zero Vector</Link>
            <span className="zh-nav-sep" />
            <Link to="/zerohack" className="zh-nav-brand-link">Zero Hack</Link>
            <span className="zh-nav-sep" />
            <span className="zh-nav-brand">Background</span>
          </div>
        </div>
      </nav>

      <main>
        <article className="zh-bg-article">
          <div className="zh-bg-container">
            <h1 className="zh-bg-title">{bg.title}</h1>
            <p className="zh-bg-subtitle">{bg.subtitle}</p>
            {bg.body.map((block, i) => {
              if (block.type === 'p') return renderParagraph(block, i);
              if (block.type === 'h3') return <h3 key={i} className="zh-bg-h3">{block.text}</h3>;
              if (block.type === 'rule') return <hr key={i} className="zh-bg-rule" />;
              return null;
            })}
          </div>
        </article>
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

export default ZerohackBackgroundPage;
