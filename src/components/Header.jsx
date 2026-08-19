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

export default function Header() {
  const menu = useRef(null);
  const { pathname } = useLocation();

  // Close the mobile disclosure whenever the route changes.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  return (
    <header className="header">
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
