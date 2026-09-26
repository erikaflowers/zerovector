import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../lib/supabase';
import { getOffering, getMyRegistration, preRegister, withdraw, startCheckout } from '../lib/registration';
import en from '../content/en';

const { accounts } = en;
const copy = accounts.preRegister;
const PAYABLE = ['presale', 'open'];

// Pre-register intent survives the Google OAuth round trip in
// sessionStorage (same tab), so a logged-out visitor picks a
// preference, signs in, and lands back already registered.
const INTENT_KEY = 'zv-prereg-intent';
const INTENT_TTL_MS = 30 * 60 * 1000;

function saveIntent(slug, preference) {
  try { sessionStorage.setItem(INTENT_KEY, JSON.stringify({ slug, preference, at: Date.now() })); } catch {}
}

function takeIntent(slug) {
  try {
    const raw = sessionStorage.getItem(INTENT_KEY);
    if (!raw) return null;
    const intent = JSON.parse(raw);
    if (intent.slug !== slug) return null;
    sessionStorage.removeItem(INTENT_KEY);
    return Date.now() - intent.at < INTENT_TTL_MS ? intent : null;
  } catch {
    return null;
  }
}

/**
 * PreRegister — Google-login registration for any offering.
 * Pick a preference, then pre-register. Logged out, the same click
 * signs in with Google and finishes the registration on return.
 * Registered → confirmation, withdraw, and (when the offering is
 * payable) the checkout button, currently the Stripe stub.
 *
 * @param {string} slug - offerings.slug
 */
function PreRegister({ slug }) {
  const { user, isLoggedIn, loading: authLoading, signIn } = useUser();
  const [offering, setOffering] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [preference, setPreference] = useState(null);
  const [phase, setPhase] = useState('loading'); // loading | ready | saving | unavailable
  const [message, setMessage] = useState('');
  const intentHandled = useRef(false);
  const rootRef = useRef(null);

  const load = useCallback(async () => {
    if (!supabase) { setPhase('unavailable'); return; }
    const { data: off, error } = await getOffering(slug);
    if (error || !off || off.status === 'closed') { setPhase('unavailable'); return; }
    setOffering(off);
    if (user) {
      const { data: reg } = await getMyRegistration(off.id, user.id);
      // Returning from Google with a saved intent: finish the registration
      const intent = intentHandled.current ? null : takeIntent(slug);
      intentHandled.current = true;
      let current = reg || null;
      if (!current && intent) {
        const { data: created, error: err } = await preRegister(off.id, intent.preference);
        if (!err) current = created;
        else if (err.code === '23505') current = (await getMyRegistration(off.id, user.id)).data || null;
        else { setMessage(copy.error); setPreference(intent.preference); }
      }
      setRegistration(current);
      if (intent) requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    } else {
      setRegistration(null);
    }
    setPhase('ready');
  }, [slug, user]);

  useEffect(() => {
    if (!authLoading) load();
  }, [authLoading, load]);

  const handleSubmit = async () => {
    if (!preference) return;
    if (!isLoggedIn) {
      // No #anchor on the return URL: implicit-flow OAuth returns the
      // session in the hash. We scroll to the card after finishing instead.
      saveIntent(slug, preference);
      signIn();
      return;
    }
    setPhase('saving');
    setMessage('');
    const { data, error } = await preRegister(offering.id, preference);
    if (error) {
      // 23505 = already registered (double click, second tab) — just reload
      if (error.code === '23505') { await load(); return; }
      setMessage(copy.error);
      setPhase('ready');
      return;
    }
    setRegistration(data);
    setPhase('ready');
  };

  const handleWithdraw = async () => {
    if (!window.confirm(copy.withdrawConfirm)) return;
    setPhase('saving');
    const { error } = await withdraw(registration.id);
    if (error) setMessage(copy.error);
    else { setRegistration(null); setPreference(null); setMessage(''); }
    setPhase('ready');
  };

  const handleCheckout = async () => {
    const result = await startCheckout(registration.id);
    if (result.mode === 'live' && result.url) window.location.assign(result.url);
    else setMessage(copy.stubMessage);
  };

  if (phase === 'loading' || authLoading) {
    return <div className="zv-prereg zv-prereg--loading" aria-busy="true" />;
  }

  if (phase === 'unavailable') {
    return <div className="zv-prereg"><p className="zv-prereg-note">{copy.unavailable}</p></div>;
  }

  if (registration) {
    const prefLabel = accounts.preferences.find((p) => p.value === registration.preference)?.label;
    const canPay = PAYABLE.includes(offering.status) && registration.status === 'interested';
    return (
      <div className="zv-prereg" ref={rootRef}>
        <div className="zv-chip zv-chip--green">{copy.registeredChip}</div>
        {prefLabel && (
          <p className="zv-prereg-detail">{copy.registeredPreference}: <strong>{prefLabel}</strong></p>
        )}
        {canPay && (
          <button type="button" className="zv-prereg-btn" onClick={handleCheckout}>{copy.payCta}</button>
        )}
        {message && <p className="zv-prereg-message" role="status">{message}</p>}
        <div className="zv-prereg-links">
          <Link to="/my">{copy.myZvLink}</Link>
          {registration.status === 'interested' && (
            <button type="button" className="zv-prereg-linkbtn" onClick={handleWithdraw} disabled={phase === 'saving'}>
              {copy.withdrawCta}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="zv-prereg" ref={rootRef}>
      <p className="zv-prereg-prompt" id={`prereg-pref-${slug}`}>{copy.preferencePrompt}</p>
      <div className="zv-prereg-options" role="group" aria-labelledby={`prereg-pref-${slug}`}>
        {accounts.preferences.map((p) => (
          <button
            key={p.value}
            type="button"
            className={`zv-prereg-option ${preference === p.value ? 'zv-prereg-option--on' : ''}`}
            aria-pressed={preference === p.value}
            onClick={() => setPreference(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="zv-prereg-btn"
        onClick={handleSubmit}
        disabled={!preference || phase === 'saving'}
      >
        {phase === 'saving' ? copy.submitting : isLoggedIn ? copy.submitCta : copy.signInCta}
      </button>
      {!isLoggedIn && <p className="zv-prereg-note">{copy.signInNote}</p>}
      {message && <p className="zv-prereg-message" role="alert">{message}</p>}
    </div>
  );
}

export default PreRegister;
