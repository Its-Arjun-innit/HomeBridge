import { useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import site from '../site.config.js';
import Icon, { BRIDGE, PHONE } from './Icon.jsx';
import { telHref } from '../format.js';

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

function Nav({ onNavigate }) {
  return (
    <nav className="nav" aria-label="Main">
      {LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} onClick={onNavigate}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}

// Below this, a small scroll shouldn't move the bar — otherwise it flickers.
const REVEAL_AT = 120;

export default function Header() {
  const menu = useRef(null);
  const bar = useRef(null);
  const { pathname } = useLocation();

  // Close the mobile disclosure whenever the route changes.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  /**
   * Hide on scroll down, reveal on scroll up. The class is only acted on by CSS
   * below 62rem, so desktop is unaffected.
   */
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    // Focus inside the bar pins it open. Removing the class once isn't enough:
    // smooth scrolling and touch momentum keep firing scroll events afterwards,
    // which would hide the bar again with the visitor's focus still on it.
    let focusInside = false;
    // Mobile only. Gated here as well as in CSS so the class is never applied
    // on desktop, where it would mean nothing today but everything if that rule
    // ever moved out of its media query.
    const mobile = window.matchMedia('(max-width: 62rem)');

    const apply = () => {
      frame = 0;
      const el = bar.current;
      if (!el) return;
      const y = window.scrollY;

      // Never hide while the menu is open — the panel hangs off the bar.
      const menuOpen = menu.current?.open;
      const hide = mobile.matches && !menuOpen && !focusInside && y > REVEAL_AT && y > last;

      el.classList.toggle('header--hidden', hide);
      last = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    // A keyboard user tabbing into a hidden header would land on something
    // they cannot see.
    const el = bar.current;
    const onFocusIn = () => {
      focusInside = true;
      el?.classList.remove('header--hidden');
    };
    const onFocusOut = (e) => {
      if (!el?.contains(e.relatedTarget)) focusInside = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    el?.addEventListener('focusin', onFocusIn);
    el?.addEventListener('focusout', onFocusOut);
    return () => {
      window.removeEventListener('scroll', onScroll);
      el?.removeEventListener('focusin', onFocusIn);
      el?.removeEventListener('focusout', onFocusOut);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="header" ref={bar}>
      <div className="wrap header__bar">
        <Link to="/" className="brand">
          <Icon paths={BRIDGE} size={34} />
          <span>
            <span className="brand__name">HomeBridge</span>
            <span className="brand__sub">Care Services</span>
          </span>
        </Link>

        <Nav />

        <a
          className="btn btn--primary header__phone"
          href={telHref(site.phone)}
          aria-label={`Call HomeBridge Care Services at ${site.phone}`}
        >
          <Icon paths={PHONE} size={19} />
          <span className="header__phone-num">{site.phone}</span>
        </a>

        <details className="menu-toggle" ref={menu}>
          <summary aria-label="Menu">Menu</summary>
          <div className="menu-panel">
            <Nav onNavigate={() => menu.current && (menu.current.open = false)} />
            <a className="btn btn--primary" href={telHref(site.phone)}>
              <Icon paths={PHONE} size={19} />
              {site.phone}
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
