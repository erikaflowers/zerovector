import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const navGroups = [
  {
    label: 'Mindset',
    items: [
      { to: '/philosophy', label: 'Philosophy' },
      { to: '/approach', label: 'Approach' },
      { to: '/origin', label: 'The Origin' },
    ],
  },
  {
    label: 'Application',
    items: [
      { to: '/for-builders', label: 'For Builders' },
      { to: '/for-leaders', label: 'For Leaders' },
      { to: '/for-enterprise', label: 'For Enterprise' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { to: '/media', label: 'Media' },
      { to: '/investiture', label: 'Investiture' },
      { href: 'https://herelabrador.ai', label: 'Labrador' },
      { href: 'https://terminus.zerovector.design', label: 'Terminus' },
      { href: 'https://arroyo.zerovector.design', label: 'Arroyo Labs' },
    ],
  },
];

function NavDropdown({ group, pathname, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeout = useRef(null);

  const isActive = group.items.some(item => pathname === item.to);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Clear hover-leave timeout on unmount so it doesn't fire on a dead component
  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  function handleMouseEnter() {
    clearTimeout(timeout.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    timeout.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      className={`zv-nav-group ${open ? 'zv-nav-group--open' : ''}`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`zv-nav-group-trigger ${isActive ? 'zv-nav-group-trigger--active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {group.label}.
        <span className="zv-nav-group-chevron" aria-hidden="true" />
      </button>
      {open && (
        <div className="zv-nav-group-panel">
          {group.items.map(item => (
            item.href ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="zv-nav-group-item"
                onClick={() => { setOpen(false); if (onNavigate) onNavigate(); }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`zv-nav-group-item ${pathname === item.to ? 'zv-nav-group-item--active' : ''}`}
                onClick={() => { setOpen(false); if (onNavigate) onNavigate(); }}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
}

function Nav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoggedIn, loading, signIn, signOut } = useUser();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setMobileExpanded(null); }, [pathname]);

  return (
    <nav className="zv-nav">
      <div className="zv-nav-inner">
        {/* Left — dropdown groups + standalone links */}
        <div className="zv-nav-links">
          {navGroups.map(group => (
            <NavDropdown key={group.label} group={group} pathname={pathname} />
          ))}
          <a
            href="https://open.zerovector.design"
            className="zv-nav-link"
          >
            Open Vector
          </a>
          <a
            href="https://ko-fi.com/erikaflowers"
            target="_blank"
            rel="noopener noreferrer"
            className="zv-nav-link zv-nav-support"
          >
            <span className="zv-nav-support-heart">&hearts;</span> Support
          </a>
        </div>

        {/* Right — Start + Sign In + mobile hamburger */}
        <div className="zv-nav-actions">
          <Link
            to="/start"
            className={`zv-nav-start ${pathname === '/start' ? 'zv-nav-start-active' : ''}`}
          >
            Start
          </Link>
          {!loading && (
            isLoggedIn ? (
              <div className="zv-nav-user">
                <button
                  className="zv-nav-avatar-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-label="User menu"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="zv-nav-avatar-img" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="zv-nav-avatar-initial">{user.name.charAt(0)}</span>
                  )}
                </button>
                {userDropdownOpen && (
                  <>
                    <div className="zv-nav-dropdown-backdrop" onClick={() => setUserDropdownOpen(false)} />
                    <div className="zv-nav-dropdown">
                      <div className="zv-nav-dropdown-name">{user.name}</div>
                      <div className="zv-nav-dropdown-email">{user.email}</div>
                      <button className="zv-nav-dropdown-signout" onClick={() => { signOut(); setUserDropdownOpen(false); }}>
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button className="zv-nav-signin" onClick={signIn}>Sign In</button>
            )
          )}
          <button
            className={`zv-nav-hamburger ${menuOpen ? 'zv-nav-hamburger-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="zv-nav-mobile">
          {navGroups.map(group => (
            <div key={group.label} className="zv-nav-mobile-group">
              <button
                className={`zv-nav-mobile-group-trigger ${mobileExpanded === group.label ? 'zv-nav-mobile-group-trigger--open' : ''}`}
                onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                aria-expanded={mobileExpanded === group.label}
              >
                <span>{group.label}</span>
                <span className="zv-nav-mobile-group-chevron">{mobileExpanded === group.label ? '\u2212' : '+'}</span>
              </button>
              {mobileExpanded === group.label && (
                <div className="zv-nav-mobile-group-items">
                  {group.items.map(item => (
                    item.href ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="zv-nav-mobile-link zv-nav-mobile-sublink"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`zv-nav-mobile-link zv-nav-mobile-sublink ${pathname === item.to ? 'zv-nav-link-active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="https://open.zerovector.design"
            className="zv-nav-mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            Open Vector
          </a>
          <a
            href="https://ko-fi.com/erikaflowers"
            target="_blank"
            rel="noopener noreferrer"
            className="zv-nav-mobile-link zv-nav-support-mobile"
            onClick={() => setMenuOpen(false)}
          >
            <span className="zv-nav-support-heart">&hearts;</span> Support
          </a>
          <Link
            to="/start"
            className={`zv-nav-mobile-link zv-nav-start-mobile ${pathname === '/start' ? 'zv-nav-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Start
          </Link>
          {!loading && !isLoggedIn && (
            <button
              className="zv-nav-mobile-link zv-nav-mobile-signin"
              onClick={() => { signIn(); setMenuOpen(false); }}
            >
              Sign In with Google
            </button>
          )}
          {!loading && isLoggedIn && (
            <button
              className="zv-nav-mobile-link zv-nav-mobile-signout"
              onClick={() => { signOut(); setMenuOpen(false); }}
            >
              Sign Out ({user.name.split(' ')[0]})
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
