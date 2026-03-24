import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import '../styles/site.css';

function ZerohackApplyPage() {
  const { pathname } = useLocation();
  const { user, isLoggedIn, loading: authLoading, signIn } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useSEO({
    title: 'Apply — Zero Hack',
    description: 'Apply to Zero Hack, the first Zero Vector Design hackathon. April 26–27, 2026.',
    path: '/zerohack/apply',
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
            <span className="zh-nav-brand">Apply</span>
          </div>
        </div>
      </nav>

      <div className="zh-apply-page">
        <div className="zh-bg-container">

          {/* Loading state */}
          {authLoading && (
            <div className="zh-apply-loading">
              <p className="zh-bg-body">Loading...</p>
            </div>
          )}

          {/* Auth gate — not signed in */}
          {!authLoading && !isLoggedIn && (
            <Animate>
              <div className="zh-apply-gate">
                <h1 className="zh-bg-title">Apply to Zero Hack</h1>
                <p className="zh-bg-body">
                  Sign in with Google to start your application. The application itself is a design exercise — you'll describe a real person, a real problem, and your vision for solving it.
                </p>
                <button type="button" className="zh-btn zh-btn--primary zh-btn--lg" onClick={signIn}>
                  Sign in with Google &rarr;
                </button>
              </div>
            </Animate>
          )}

          {/* Signed in — show form */}
          {!authLoading && isLoggedIn && (
            <>
              <Animate>
                <h1 className="zh-bg-title">Your Application</h1>
                <div className="zh-apply-identity">
                  {user?.user_metadata?.avatar_url && (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt=""
                      className="zh-apply-avatar"
                    />
                  )}
                  <div className="zh-apply-identity-info">
                    <div className="zh-apply-identity-name">
                      {user?.user_metadata?.full_name || 'Signed in'}
                    </div>
                    <div className="zh-apply-identity-email">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </Animate>

              <Animate delay={1}>
                <form className="zh-apply-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-person">
                      Describe the person you want to build for.
                    </label>
                    <textarea
                      id="zh-person"
                      className="zh-apply-textarea"
                      rows={4}
                      placeholder="Who are they? What's their day like? What do they struggle with?"
                    />
                  </div>

                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-problem">
                      What problem will you solve for them?
                    </label>
                    <textarea
                      id="zh-problem"
                      className="zh-apply-textarea"
                      rows={4}
                      placeholder="Be specific. What's broken in their current workflow?"
                    />
                  </div>

                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-vision">
                      What's your 2026 vision for solving it?
                    </label>
                    <textarea
                      id="zh-vision"
                      className="zh-apply-textarea"
                      rows={4}
                      placeholder="What would you build? How would it work? Why now?"
                    />
                  </div>

                  <button type="submit" className="zh-btn zh-btn--primary zh-btn--lg zh-apply-submit" disabled>
                    Applications open soon
                  </button>
                </form>
              </Animate>
            </>
          )}
        </div>
      </div>

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

export default ZerohackApplyPage;
