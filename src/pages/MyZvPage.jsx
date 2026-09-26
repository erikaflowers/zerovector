import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Animate from '../components/Animate';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../lib/supabase';
import { getMyRegistrations, getMyCharges, withdraw, formatPrice } from '../lib/registration';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { accounts } = en;
const copy = accounts.myZv;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function MyZvPage() {
  useSEO({ title: copy.seo.title, description: copy.seo.description, path: '/my' });

  const { user, isLoggedIn, loading: authLoading, signIn, signOut } = useUser();
  const [registrations, setRegistrations] = useState([]);
  const [charges, setCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }
    let cancelled = false;
    (async () => {
      const [regs, chs] = await Promise.all([getMyRegistrations(user.id), getMyCharges(user.id)]);
      if (cancelled) return;
      if (regs.error || chs.error) setError(accounts.preRegister.error);
      setRegistrations(regs.data || []);
      setCharges(chs.data || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [authLoading, user]);

  const handleWithdraw = async (id) => {
    if (!window.confirm(accounts.preRegister.withdrawConfirm)) return;
    const { error: err } = await withdraw(id);
    if (err) setError(accounts.preRegister.error);
    else setRegistrations((rows) => rows.filter((r) => r.id !== id));
  };

  const prefLabel = (value) => accounts.preferences.find((p) => p.value === value)?.label;

  return (
    <div className="zv-page zv-info-page zv-my">
      <Nav />

      <section className="zv-my-header">
        <div className="zv-container">
          <div className="zv-chip zv-chip--green">{copy.eyebrow}</div>
          <h1 className="zv-my-title">{copy.title}</h1>
          {isLoggedIn && (
            <div className="zv-my-identity">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="zv-my-avatar" referrerPolicy="no-referrer" />
              ) : (
                <span className="zv-my-avatar zv-my-avatar--initial">{user.name.charAt(0)}</span>
              )}
              <div>
                <div className="zv-my-name">{user.name}</div>
                <div className="zv-my-email">{user.email}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {!supabase ? (
        <section className="zv-section">
          <div className="zv-container"><p className="zv-body-text">{copy.unavailable}</p></div>
        </section>
      ) : authLoading ? null : !isLoggedIn ? (
        <section className="zv-section">
          <div className="zv-container">
            <Animate className="zv-my-signin">
              <h2 className="zv-section-title">{copy.signedOut.headline}</h2>
              <p className="zv-body-text">{copy.signedOut.body}</p>
              <button type="button" className="zv-prereg-btn" onClick={signIn}>{copy.signedOut.cta}</button>
            </Animate>
          </div>
        </section>
      ) : (
        <>
          <section className="zv-section">
            <div className="zv-container">
              <h2 className="zv-section-title">{copy.registrations.title}</h2>
              {error && <p className="zv-prereg-message" role="alert">{error}</p>}
              {loading ? null : registrations.length === 0 ? (
                <div className="zv-my-empty">
                  <p>{copy.registrations.empty}</p>
                  <Link to={copy.registrations.emptyCta.to} className="zv-cta">{copy.registrations.emptyCta.label}</Link>
                </div>
              ) : (
                <div className="zv-ledger">
                  {registrations.map((r) => (
                    <div key={r.id} className="zv-ledger-row">
                      <div className="zv-ledger-item">
                        <div className="zv-ledger-name">
                          {r.offering?.slug ? <Link to={`/${r.offering.slug}`}>{r.offering.title}</Link> : r.offering?.title}
                        </div>
                        <div className="zv-ledger-note">
                          {formatDate(r.created_at)}
                          {prefLabel(r.preference) && ` · ${prefLabel(r.preference)}`}
                          {r.status === 'interested' && (
                            <>
                              {' · '}
                              <button type="button" className="zv-prereg-linkbtn" onClick={() => handleWithdraw(r.id)}>
                                {accounts.preRegister.withdrawCta}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className={`zv-chip zv-chip--status-${r.status}`}>{accounts.statusLabels[r.status]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="zv-section">
            <div className="zv-container">
              <h2 className="zv-section-title">{copy.charges.title}</h2>
              {loading ? null : charges.length === 0 ? (
                <div className="zv-my-empty"><p>{copy.charges.empty}</p></div>
              ) : (
                <div className="zv-ledger">
                  {charges.map((c) => (
                    <div key={c.id} className="zv-ledger-row">
                      <div className="zv-ledger-item">
                        <div className="zv-ledger-name">{c.offering?.title}</div>
                        <div className="zv-ledger-note">
                          {formatDate(c.created_at)} {'·'} {accounts.chargeStatusLabels[c.status]}
                        </div>
                      </div>
                      <div className="zv-ledger-amount">{formatPrice(c.amount_cents, c.currency)}</div>
                    </div>
                  ))}
                </div>
              )}
              <button type="button" className="zv-cta zv-my-signout" onClick={signOut}>{copy.signOut}</button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default MyZvPage;
