import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import site from '../site.config.js';
import { telHref, isPlaceholder } from '../format.js';
import Icon, { PHONE, MAIL } from '../components/Icon.jsx';

export default function Contact() {
  const { street, city, region, postal } = site.address;
  const hasAddress = street || city;

  return (
    <>
      <Hero title="Let’s Start the Conversation" slot="contact-hero" image="/media/hero.webp">
        <p>
          Whether you need a few hours of support each week or ongoing daily care, we’re here to
          talk it through — with no pressure and no obligation.
        </p>
      </Hero>

      <Section>
        <div className="split">
          <div className="prose" data-reveal>
            <h2>Reach us directly</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.4rem' }}>
              <li style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <span
                  className="card__icon"
                  style={{ marginBottom: 0, width: '2.6rem', height: '2.6rem', flex: 'none' }}
                >
                  <Icon paths={PHONE} size={20} />
                </span>
                <span>
                  <strong style={{ display: 'block' }}>Phone</strong>
                  <a href={telHref(site.phone)}>{site.phone}</a>
                  <br />
                  <span style={{ color: 'var(--ink-soft)', fontSize: '1rem' }}>{site.hours}</span>
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <span
                  className="card__icon"
                  style={{ marginBottom: 0, width: '2.6rem', height: '2.6rem', flex: 'none' }}
                >
                  <Icon paths={MAIL} size={20} />
                </span>
                <span>
                  <strong style={{ display: 'block' }}>Email</strong>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </span>
              </li>
            </ul>

            {hasAddress && (
              <>
                <h3 style={{ marginTop: '2.5rem' }}>Office</h3>
                <address style={{ fontStyle: 'normal', color: 'var(--ink-soft)' }}>
                  {street}
                  {street && <br />}
                  {[city, region, postal].filter(Boolean).join(', ')}
                </address>
              </>
            )}

            <div style={{ marginTop: '2rem' }}>
              <ImageSlot id="contact-office" />
            </div>

            <h3 style={{ marginTop: '2.5rem' }}>Areas we serve</h3>
            <ul style={{ color: 'var(--ink-soft)', paddingLeft: '1.2rem' }}>
              {site.serviceArea.map((area) => (
                <li key={area}>{isPlaceholder(area) ? <em>{area}</em> : area}</li>
              ))}
            </ul>
            <div style={{ marginTop: '1.25rem' }}>
              <ImageSlot id="contact-map" />
            </div>
          </div>

          <div data-reveal style={{ '--i': 1 }}>
            <InquiryForm
              title="Request a consultation"
              note="Fill this in and we’ll be in touch to talk about what would help most."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
