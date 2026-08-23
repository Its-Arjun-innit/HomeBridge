import { Link } from 'react-router-dom';
import site from '../site.config.js';
import { telHref, isPlaceholder, publishable } from '../format.js';

export default function Footer() {
  const { street, city, region, postal } = site.address;
  const hasAddress = street || city;
  const areas = publishable(site.serviceArea);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/media/logo-full.png" alt={site.name} width="240" height="215" />
            </Link>
            <p style={{ marginTop: '1rem', maxWidth: '22rem' }}>
              Compassionate, personalized care that helps people stay safe, comfortable, and
              independent in the place they love most — home.
            </p>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={telHref(site.phone)}>{site.phone}</a>
              </li>
              <li>
                <a href={telHref(site.phoneAlt)}>{site.phoneAlt}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.hours}</li>
              {hasAddress && (
                <li>
                  <address style={{ fontStyle: 'normal' }}>
                    {street}
                    {street && <br />}
                    {[city, region, postal].filter(Boolean).join(', ')}
                  </address>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/faq">Questions</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/contact">Request Care</Link>
              </li>
            </ul>
          </div>

          {areas.length > 0 && (
            <div>
              <h3>Areas We Serve</h3>
              <ul>
                {areas.map((area) => (
                  <li key={area}>{isPlaceholder(area) ? <em>{area}</em> : area}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} HomeBridge Home Care Services. All rights reserved.
          </span>
          <nav className="footer__legal" aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
