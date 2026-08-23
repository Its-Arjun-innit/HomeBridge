import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import LegalDoc from '../components/LegalDoc.jsx';
import { privacy } from '../legal.js';

export default function Privacy() {
  return (
    <>
      <Hero title="Privacy Policy" image="/media/hero.webp">
        <p>How we handle the information you share with us, and the choices you have.</p>
      </Hero>
      <Section>
        <LegalDoc sections={privacy} />
      </Section>
    </>
  );
}
