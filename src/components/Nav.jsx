import { useState, useRef, useEffect, useCallback } from 'react';
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
      { to: '/for-hire', label: 'For Hire' },
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

function NavDropdown({ group, pathname, isOpen, onToggle }) {
  const ref = useRef(null);

  const isActive = group.items.some(item => pathname === item.to);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onToggle(null);
    }
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onToggle]);

  return (
    <div
      className={`zv-nav-group ${isOpen ? 'zv-nav-group--open' : ''}`}
      ref={ref}
      onMouseEnter={() => onToggle(group.label)}
      onMouseLeave={() => onToggle(null)}
    >
      <button
        className={`zv-nav-group-trigger ${isActive ? 'zv-nav-group-trigger--active' : ''}`}
        onClick={() => onToggle(isOpen ? null : group.label)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {group.label}.
        <span className="zv-nav-group-chevron" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="zv-nav-group-panel">
          {group.items.map(item => (
            item.href ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="zv-nav-group-item"
                onClick={() => onToggle(null)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`zv-nav-group-item ${pathname === item.to ? 'zv-nav-group-item--active' : ''}`}
                onClick={() => onToggle(null)}
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
  const [openGroup, setOpenGroup] = useState(null);

  const handleToggle = useCallback((label) => setOpenGroup(label), []);

  // Body scroll lock — prevents background content from scrolling
  // while the mobile menu is open. Uses position: fixed + saved
  // scrollY to work around iOS Safari ignoring overflow: hidden.
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add('nav-open');
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('nav-open');
      document.body.style.top = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
    setOpenGroup(null);
  }, [pathname]);

  return (
    <nav className="zv-nav">
      <div className="zv-nav-inner">
        {/* Left — Home + dropdown groups + standalone links */}
        <div className="zv-nav-links">
          <Link
            to="/"
            className={`zv-nav-link ${pathname === '/' ? 'zv-nav-link-active' : ''}`}
          >
            Home.
          </Link>
          {navGroups.map(group => (
            <NavDropdown
              key={group.label}
              group={group}
              pathname={pathname}
              isOpen={openGroup === group.label}
              onToggle={handleToggle}
            />
          ))}
          <a
            href="https://open.zerovector.design"
            className="zv-nav-link"
          >
            Open Vector.
          </a>
          <a
            href="https://ko-fi.com/erikaflowers"
            target="_blank"
            rel="noopener noreferrer"
            className="zv-nav-link zv-nav-support"
          >
            <span className="zv-nav-support-heart">&hearts;</span> Support.
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

      {/* Mobile menu — flat link list, no accordion */}
      {menuOpen && (
        <div className="zv-nav-mobile">
          <Link to="/" className={`zv-nav-mobile-link ${pathname === '/' ? 'zv-nav-link-active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
          {navGroups.flatMap(g => g.items).map(item =>
            item.href ? (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="zv-nav-mobile-link" onClick={() => setMenuOpen(false)}>{item.label}</a>
            ) : (
              <Link key={item.to} to={item.to} className={`zv-nav-mobile-link ${pathname === item.to ? 'zv-nav-link-active' : ''}`} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            )
          )}
          <Link to="/start" className={`zv-nav-mobile-link ${pathname === '/start' ? 'zv-nav-link-active' : ''}`} onClick={() => setMenuOpen(false)}>Start</Link>
          {!loading && !isLoggedIn && (
            <button className="zv-nav-mobile-signin" onClick={() => { signIn(); setMenuOpen(false); }}>Sign In</button>
          )}
          {!loading && isLoggedIn && (
            <button className="zv-nav-mobile-signout" onClick={() => { signOut(); setMenuOpen(false); }}>Sign Out ({user.name.split(' ')[0]})</button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
