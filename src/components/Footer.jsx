import { Link } from 'react-router-dom';
import site from '../site.config.js';
import Icon, { BRIDGE } from './Icon.jsx';
import { telHref, isPlaceholder } from '../format.js';

export default function Footer() {
  const { street, city, region, postal } = site.address;
  const hasAddress = street || city;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="brand" style={{ color: '#fff' }}>
              <Icon paths={BRIDGE} size={34} />
              <span>
                <span className="brand__name">HomeBridge</span>
                <span className="brand__sub">Care Services</span>
              </span>
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

          <div>
            <h3>Areas We Serve</h3>
            <ul>
              {site.serviceArea.map((area) => (
                <li key={area}>{isPlaceholder(area) ? <em>{area}</em> : area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} HomeBridge Care Services. All rights reserved.
          </span>
          <span>Caring for people, not just for their needs.</span>
        </div>
      </div>
    </footer>
  );
}
