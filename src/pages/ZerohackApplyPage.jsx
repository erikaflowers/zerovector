import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../lib/supabase';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import '../styles/site.css';

function ZerohackApplyPage() {
  const { pathname } = useLocation();
  const { user, isLoggedIn, loading: authLoading, signIn } = useUser();

  const [form, setForm] = useState({
    person: '',
    problem: '',
    vision: '',
    experience_agentic: '',
    current_work: '',
    design_thinking_level: '',
    hope_to_gain: '',
    prework_committed: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

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

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = form.person.trim() && form.problem.trim() && form.vision.trim()
    && form.experience_agentic.trim() && form.current_work.trim()
    && form.design_thinking_level.trim() && form.hope_to_gain.trim()
    && form.prework_committed && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || !supabase || !user) return;
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from('zerohack_applications')
      .insert({
        user_id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || null,
        person: form.person.trim(),
        problem: form.problem.trim(),
        vision: form.vision.trim(),
        experience_agentic: form.experience_agentic.trim(),
        current_work: form.current_work.trim(),
        design_thinking_level: form.design_thinking_level.trim(),
        hope_to_gain: form.hope_to_gain.trim(),
        prework_committed: form.prework_committed,
      });

    setSubmitting(false);
    if (insertError) {
      setError('Something went wrong. Please try again.');
      console.error('Application insert error:', insertError);
    } else {
      setSubmitted(true);
    }
  };

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
            <Link to="/zerohack/background" className="zh-nav-link">Background</Link>
          </div>
          <Link to="/zerohack/apply" className="zh-nav-cta">
            Apply Now &rarr;
          </Link>
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

          {/* Submitted */}
          {!authLoading && isLoggedIn && submitted && (
            <Animate>
              <div className="zh-apply-gate">
                <h1 className="zh-bg-title">You're in the pool.</h1>
                <p className="zh-bg-body">
                  Your application has been submitted. We'll be in touch at {user?.email} as we finalize the cohort. In the meantime — start thinking about your person.
                </p>
                <Link to="/zerohack" className="zh-btn zh-btn--primary zh-btn--lg">
                  Back to Zero Hack &rarr;
                </Link>
              </div>
            </Animate>
          )}

          {/* Signed in — show form */}
          {!authLoading && isLoggedIn && !submitted && (
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
                <form className="zh-apply-form" onSubmit={handleSubmit}>

                  {/* --- The Design Exercise --- */}
                  <div className="zh-apply-section-label">The Design Exercise</div>

                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-person">
                      Describe the person you want to build for.
                    </label>
                    <textarea
                      id="zh-person"
                      className="zh-apply-textarea"
                      rows={4}
                      placeholder="Who are they? What's their day like? What do they struggle with?"
                      value={form.person}
                      onChange={update('person')}
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
                      value={form.problem}
                      onChange={update('problem')}
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
                      value={form.vision}
                      onChange={update('vision')}
                    />
                  </div>

                  {/* --- About You --- */}
                  <div className="zh-apply-section-label">About You</div>

                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-work">
                      What do you currently do for work?
                    </label>
                    <textarea
                      id="zh-work"
                      className="zh-apply-textarea"
                      rows={2}
                      placeholder="Role, industry, what your days look like."
                      value={form.current_work}
                      onChange={update('current_work')}
                    />
                  </div>

                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-agentic">
                      What is your experience level with Claude Code and other agentic tools?
                    </label>
                    <textarea
                      id="zh-agentic"
                      className="zh-apply-textarea"
                      rows={2}
                      placeholder="Never used them? Daily driver? Somewhere in between?"
                      value={form.experience_agentic}
                      onChange={update('experience_agentic')}
                    />
                  </div>

                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-design">
                      How would you describe your human-centered design / design thinking experience?
                    </label>
                    <textarea
                      id="zh-design"
                      className="zh-apply-textarea"
                      rows={2}
                      placeholder="Formal training? Self-taught? Brand new to it? All answers are welcome."
                      value={form.design_thinking_level}
                      onChange={update('design_thinking_level')}
                    />
                  </div>

                  <div className="zh-apply-field">
                    <label className="zh-apply-label" htmlFor="zh-hope">
                      What do you hope to walk away with most?
                    </label>
                    <textarea
                      id="zh-hope"
                      className="zh-apply-textarea"
                      rows={2}
                      placeholder="A product? A methodology? Connections? All of the above?"
                      value={form.hope_to_gain}
                      onChange={update('hope_to_gain')}
                    />
                  </div>

                  {/* --- Commitment Checkbox --- */}
                  <div className="zh-apply-commitment">
                    <label className="zh-apply-commitment-label" htmlFor="zh-prework">
                      <input
                        type="checkbox"
                        id="zh-prework"
                        className="zh-apply-checkbox"
                        checked={form.prework_committed}
                        onChange={update('prework_committed')}
                      />
                      <span className="zh-apply-checkmark" />
                      <span className="zh-apply-commitment-text">
                        <strong>I commit to the pre-work.</strong> Before the event, I will identify a real target user and arrange 3–5 "phone a friend" people who are ready to spend 20 minutes on Day 2 testing my product demo. <span className="zh-apply-commitment-req">This is a requirement to be eligible for Mac mini prizes.</span>
                      </span>
                    </label>
                  </div>

                  {error && <p className="zh-apply-error">{error}</p>}

                  <button
                    type="submit"
                    className="zh-btn zh-btn--primary zh-btn--lg zh-apply-submit"
                    disabled={!canSubmit}
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'} {!submitting && '→'}
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
