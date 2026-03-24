import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import '../styles/site.css';

function ZerohackBackgroundPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useSEO({
    title: 'Zero Hack — Background',
    description: 'The story behind Zero Hack, the first Zero Vector Design hackathon.',
    path: '/zerohack/background',
  });

  useEffect(() => {
    document.body.style.background = '#1A0808';
    document.body.style.color = '#FFF5EB';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
      document.body.style.minHeight = '';
    };
  }, []);

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

      {/* Article */}
      <article className="zh-bg-article">
        <div className="zh-bg-container">
          <h1 className="zh-bg-title">Background</h1>
          <p className="zh-bg-body">
            Content coming soon. This page will tell the story behind Zero Hack — why we built it, what we believe about hackathons, and what makes this one different.
          </p>
        </div>
      </article>

      {/* Footer */}
      <footer className="zh-footer">
        <div className="zh-footer-inner">
          <div className="zh-footer-brand">
            <a href="https://zerovector.design" className="zh-footer-link">Zero Vector Design LLC</a>
          </div>
          <div className="zh-footer-tagline">Start with a person. End with a product.</div>
        </div>
      </footer>
    </div>
  );
}

export default ZerohackBackgroundPage;
