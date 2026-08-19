import { Link } from 'react-router-dom';
import site from '../site.config.js';
import { telHref } from '../format.js';
import Icon, { PHONE } from './Icon.jsx';
import ImageSlot from './ImageSlot.jsx';

export default function CallToAction({
  title = 'Let’s talk about what would help most.',
  body = 'Every situation is different. Tell us what daily life looks like right now, and we’ll help you work out the support that fits.',
  backdrop = 'home-cta-bg',
}) {
  return (
    <section className="section section--teal section--tight has-bg-figure">
      {backdrop && (
        <div className="bg-figure" aria-hidden="true">
          <ImageSlot id={backdrop} className="figure--compact" />
        </div>
      )}
      <div className="wrap section__head section__head--center" style={{ marginBottom: 0 }} data-reveal>
        <h2>{title}</h2>
        <p className="lede">{body}</p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <a className="btn btn--accent" href={telHref(site.phone)}>
            <Icon paths={PHONE} size={19} />
            {site.phone}
          </a>
          <Link className="btn btn--ghost" to="/contact">
            Request a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
