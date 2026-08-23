import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import LegalDoc from '../components/LegalDoc.jsx';
import { terms } from '../legal.js';

export default function Terms() {
  return (
    <>
      <Hero title="Terms & Conditions" image="/media/hero.webp">
        <p>The terms that apply when you use this website.</p>
      </Hero>
      <Section>
        <LegalDoc sections={terms} />
      </Section>
    </>
  );
}
