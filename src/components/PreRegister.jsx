import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../lib/supabase';
import PreferenceOptions from './PreferenceOptions';
import { getOffering, getMyRegistration, preRegister, updatePreference, withdraw, startCheckout } from '../lib/registration';
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
 * Registered → a "what's next" view: personal headline, numbered
 * next steps, the preference echoed back (changeable while
 * 'interested'), an optional prep link, My ZV + withdraw. When the
 * offering is payable, Reserve & pay → Stripe Checkout (lib/registration).
 *
 * @param {string} slug - offerings.slug
 * @param {object} nextSteps - overrides for accounts.registered
 *   ({ headline, stepsTitle, steps: [{ title, body }], prep: { text, link } })
 */
function PreRegister({ slug, nextSteps }) {
  const { user, isLoggedIn, loading: authLoading, signIn } = useUser();
  const [offering, setOffering] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [preference, setPreference] = useState(null);
  const [phase, setPhase] = useState('loading'); // loading | ready | saving | unavailable
  const [message, setMessage] = useState('');
  const intentHandled = useRef(false);
  const rootRef = useRef(null);
  const [editingPref, setEditingPref] = useState(false);
  const next = { ...accounts.registered, ...nextSteps };

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

  // Back from Stripe via cancel_url (?checkout=cancelled): say so, once.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') !== 'cancelled') return;
    setMessage(copy.cancelledMessage);
    params.delete('checkout');
    const qs = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
    requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }, []);

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

  const handleChangePreference = async (value) => {
    if (value === registration.preference) { setEditingPref(false); return; }
    setPhase('saving');
    setMessage('');
    const { data, error } = await updatePreference(registration.id, value);
    if (error) setMessage(copy.error);
    else { setRegistration(data); setEditingPref(false); }
    setPhase('ready');
  };

  const handleCheckout = async () => {
    setPhase('saving');
    setMessage('');
    const { url, error } = await startCheckout(registration.id);
    if (url) { window.location.assign(url); return; }
    setMessage(error || copy.error);
    setPhase('ready');
  };

  if (phase === 'loading' || authLoading) {
    return <div className="zv-prereg zv-prereg--loading" aria-busy="true" />;
  }

  if (phase === 'unavailable') {
    return <div className="zv-prereg"><p className="zv-prereg-note">{copy.unavailable}</p></div>;
  }

  if (registration) {
    const fill = (text) => text
      .replace('{firstName}', user?.name?.split(' ')[0] || '')
      .replace('{email}', user?.email || 'your inbox');
    const prefLabel = accounts.preferences.find((p) => p.value === registration.preference)?.label;
    const canPay = PAYABLE.includes(offering.status) && registration.status === 'interested';
    const canEdit = registration.status === 'interested';
    const isPaid = registration.status === 'paid';
    const view = isPaid ? { ...next, ...accounts.registered.paid, ...next.paid } : next;
    return (
      <div className="zv-prereg zv-prereg--done" ref={rootRef}>
        <div className={`zv-chip ${isPaid ? 'zv-chip--status-paid' : 'zv-chip--green'}`}>
          {isPaid ? copy.paidChip : copy.registeredChip}
        </div>
        <h3 className="zv-prereg-headline">{fill(view.headline)}</h3>

        {canPay && (
          <button type="button" className="zv-prereg-btn" onClick={handleCheckout} disabled={phase === 'saving'}>
            {phase === 'saving' ? copy.redirecting : copy.payCta}
          </button>
        )}

        <div className="zv-prereg-steps-title">{view.stepsTitle}</div>
        <ol className="zv-prereg-steps">
          {view.steps.map((step, i) => (
            <li key={step.title} className="zv-prereg-step">
              <span className="zv-prereg-step-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="zv-prereg-step-title">{fill(step.title)}</div>
                <p className="zv-prereg-step-body">{fill(step.body)}</p>
              </div>
            </li>
          ))}
        </ol>

        {editingPref ? (
          <div className="zv-prereg-pref-edit">
            <PreferenceOptions
              id={`prereg-edit-${slug}`}
              value={registration.preference}
              onSelect={handleChangePreference}
              disabled={phase === 'saving'}
            />
            <button type="button" className="zv-prereg-linkbtn" onClick={() => setEditingPref(false)}>{copy.keepCta}</button>
          </div>
        ) : prefLabel && (
          <p className="zv-prereg-detail">
            {copy.preferenceEcho} <strong>{prefLabel}</strong>
            {canEdit && (
              <>
                {' \u00B7 '}
                <button type="button" className="zv-prereg-linkbtn" onClick={() => setEditingPref(true)}>{copy.changeCta}</button>
              </>
            )}
          </p>
        )}

        {view.prep && (
          <p className="zv-prereg-prep">
            {view.prep.text}{' '}
            <Link to={view.prep.link.to}>{view.prep.link.label} &rarr;</Link>
          </p>
        )}

        {message && <p className="zv-prereg-message" role="status">{message}</p>}

        <div className="zv-prereg-links">
          <Link to="/my">{copy.myZvLink}</Link>
          {canEdit && (
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
      <PreferenceOptions id={`prereg-pref-${slug}`} value={preference} onSelect={setPreference} />
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
