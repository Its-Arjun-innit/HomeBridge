import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import FAQ from './pages/FAQ.jsx';
import Contact from './pages/Contact.jsx';

// Titles live here rather than in each page — one table, no per-page boilerplate.
const TITLES = {
  '/': 'HomeBridge Care Services — Compassionate In-Home Care',
  '/services': 'Our Services — HomeBridge Care Services',
  '/about': 'About Us — HomeBridge Care Services',
  '/faq': 'Questions Families Ask — HomeBridge Care Services',
  '/careers': 'Careers — HomeBridge Care Services',
  '/contact': 'Contact Us — HomeBridge Care Services',
};

function Layout({ children }) {
  const { pathname } = useLocation();

  // Marks that JS is alive. The reveal styles hang off this class, so a failed
  // or blocked bundle leaves every element visible rather than at opacity 0.
  useEffect(() => {
    document.documentElement.classList.add('js-ready');
  }, []);

  useEffect(() => {
    document.title = TITLES[pathname] || 'HomeBridge Care Services';
    window.scrollTo(0, 0);
  }, [pathname]);

  // One observer for the whole page, re-collected on each route change.
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]:not(.is-visible)');
    if (!targets.length) return;

    // No IntersectionObserver (or reduced motion): show everything immediately.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Anything already scrolled past (deep link, restored scroll position) will
    // never intersect on the way down — reveal it up front rather than leaving
    // it invisible until the visitor happens to scroll back up.
    targets.forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) el.classList.add('is-visible');
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    targets.forEach((el) => {
      if (!el.classList.contains('is-visible')) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <section className="section">
      <div className="wrap section__head section__head--center">
        <h1>We couldn’t find that page.</h1>
        <p className="lede">
          The page may have moved. Let’s get you back to somewhere useful.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <Link className="btn btn--primary" to="/">
            Return home
          </Link>
          <Link className="btn btn--ghost" to="/contact">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
