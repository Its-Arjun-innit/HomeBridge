import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CallToAction from '../components/CallToAction.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import Reveal from '../components/Reveal.jsx';
import { values, services, promise, intro } from '../content.js';

// Layout follows uxpilot-export-08-19-26.fig. The words are HomeBridge's own
// copy from content.js — only the arrangement comes from the design.

// The design shows four numbered service rows, and supplies a photo for each.
const ROWS = [
  { slug: 'personal-care', slot: 'svc-personal-care' },
  { slug: 'meals', slot: 'svc-meals' },
  { slug: 'companionship', slot: 'svc-companionship' },
  { slug: 'housekeeping', slot: 'svc-housekeeping' },
];

const TRUST = ['Personalized care plans', 'Flexible schedules', 'Caregivers matched to you'];

export default function Home() {
  const rows = ROWS.map((r) => ({ ...r, ...services.find((s) => s.slug === r.slug) }));

  return (
    <>
      <Hero
        title="Bridging Care, Comfort, and Independence at Home"
        video="/media/opening.mp4"
        image="/media/opening-poster.webp"
        aside={
          <InquiryForm note="Four quick questions, then we’ll follow up to talk it through." />
        }
      >
        <p>{intro.lede}</p>
        {/* Editorial rule from the design: EST. 2024 —— HOMEBRIDGE CARE SERVICES */}
        <div className="markrule">
          <span>Est. 2024</span>
          <span className="markrule__line" />
          <span>HomeBridge Care Services</span>
        </div>
      </Hero>

      {/* ── Our promise ── */}
      <Section tight>
        <div className="promise">
          <div data-reveal>
            <p className="eyebrow">Our promise</p>
            <p className="promise__statement">{intro.lede}</p>
            <div className="promise__body">
              <p>{promise}</p>
            </div>
          </div>
          <ul className="promise__list" data-reveal style={{ '--i': 1 }}>
            {TRUST.map((t) => (
              <li key={t}>
                <span className="dot" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Why families choose us: staggered image panels ── */}
      <Section eyebrow="Why families choose us" title="Because trust matters">
        <div className="stagger">
          {values.map((v, i) => (
            <Reveal key={v.title} i={i % 2}>
              <article className="panel">
                <ImageSlot id={v.slot} />
                <div className="panel__caption">
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── How we help: numbered rows ── */}
      <Section eyebrow="How we help" title="Everyday support, shaped around one person">
        <div className="rows">
          {rows.map((s, i) => (
            <Reveal key={s.slug} i={i}>
              <Link className="row" to="/services">
                <span>
                  <span className="row__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="row__title">{s.title}</h3>
                  <p className="row__body">{s.body}</p>
                </span>
                <span className="row__media">
                  <ImageSlot id={s.slot} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: '2.5rem' }} data-reveal>
          <Link className="btn btn--ghost" to="/services">
            See all {services.length} services
          </Link>
        </div>
      </Section>

      {/* ── A family story ── */}
      <Section tight>
        <div className="story">
          <div className="story__portrait" data-reveal>
            <ImageSlot id="home-story" />
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <p className="eyebrow">In our own words</p>
            <blockquote className="story__quote">{intro.pullQuote}</blockquote>
            <div className="story__attrib">
              <p style={{ color: 'var(--ink-soft)', maxWidth: '38rem' }}>{intro.pullQuoteTail}</p>
            </div>
          </div>
        </div>
      </Section>

      <Testimonials />

      <CallToAction />
    </>
  );
}
