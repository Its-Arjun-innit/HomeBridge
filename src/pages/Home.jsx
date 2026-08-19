import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CallToAction from '../components/CallToAction.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon, { CHECK } from '../components/Icon.jsx';
import { values, services, promise, intro } from '../content.js';

// The six services previewed on the home page, paired with their image slots.
const PREVIEW = [
  'personal-care',
  'bathing',
  'grooming',
  'meals',
  'housekeeping',
  'companionship',
];

export default function Home() {
  return (
    <>
      <Hero
        title="Bridging Care, Comfort, and Independence at Home"
        video="/media/opening.mp4"
        image="/media/opening-poster.webp"
        trust={['Personalized care plans', 'Flexible schedules', 'Caregivers matched to you']}
        aside={
          <InquiryForm note="Four quick questions, then we’ll follow up to talk it through." />
        }
      >
        <p>{intro.lede}</p>
      </Hero>

      <Section tone="sand50" tight>
        <div className="split">
          <div data-reveal>
            <ImageSlot id="home-promise" />
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <p className="eyebrow">Our promise</p>
            <p className="pullquote">{promise}</p>
            <div className="prose" style={{ marginTop: '1.75rem' }}>
              {intro.body.slice(0, 2).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link className="btn btn--ghost" to="/about" style={{ marginTop: '0.5rem' }}>
              More about us
            </Link>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Why families choose us"
        title="Because trust matters"
        lede="We provide care with compassion, respect, professionalism, and a genuine commitment to helping our clients live safely, comfortably, and independently at home."
      >
        <div className="grid grid--4">
          {values.map((v, i) => (
            <Reveal key={v.title} i={i} fill>
              <article className="card">
                <span className="card__icon">
                  <Icon paths={v.icon} size={26} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="band" data-reveal>
          <ImageSlot id="home-band" />
        </div>
      </Section>

      <Section
        tone="sand50"
        eyebrow="How we help"
        title="Everyday support, shaped around one person"
        lede="From a few hours a week to ongoing daily care, our caregivers help with the tasks that make life safer, easier, and more enjoyable."
      >
        <div className="grid grid--3">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} i={i} fill>
              <article className="card card--media">
                <ImageSlot id={`home-service-${PREVIEW[i]}`} className="card__media" />
                <div className="service-card">
                  <span className="service-card__bullet">
                    <Icon paths={CHECK} size={22} />
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: '2.25rem' }} data-reveal>
          <Link className="btn btn--primary" to="/services">
            See all {services.length} services
          </Link>
        </div>
      </Section>

      <Section tight>
        <div className="split">
          <div data-reveal>
            <ImageSlot id="home-story" />
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <p className="pullquote">{intro.pullQuote}</p>
            <p style={{ marginTop: '1.5rem' }}>{intro.pullQuoteTail}</p>
          </div>
        </div>
      </Section>

      <Testimonials />

      <CallToAction />
    </>
  );
}
