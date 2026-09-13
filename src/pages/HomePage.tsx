import { useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import LazySection from "../components/LazySection";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { getRouteMeta } from "../lib/routeMeta";

// Everything below the Hero is off-screen on load. Each is code-split AND only
// mounted (so its chunk is only fetched) once it's about to enter the viewport,
// via LazySection -- React.lazy alone would still download every chunk immediately.
const PainPoints = lazy(() => import("../components/PainPoints"));
const Services = lazy(() => import("../components/Services"));
const BrandInterlude = lazy(() => import("../components/BrandInterlude"));
const Process = lazy(() => import("../components/Process"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const Portfolio = lazy(() => import("../components/Portfolio"));
const SuccessStories = lazy(() => import("../components/SuccessStories"));
const Pricing = lazy(() => import("../components/Pricing"));
const About = lazy(() => import("../components/About"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Contact = lazy(() => import("../components/Contact"));

export default function HomePage() {
  const location = useLocation();

  // Must track the actual path, not a hardcoded "/": useDocumentHead's effect
  // runs on the client during hydration too, so on "/en" a hardcoded "/" here
  // would silently overwrite the SSR-correct /en canonical/title back to the
  // Italian ones the moment React hydrates. getRouteMeta() already falls back
  // to "/" for any other pathname, so this is a strict improvement, not a
  // behavior change, for every route other than "/en".
  useDocumentHead(getRouteMeta(location.pathname));

  // When arriving at "/" with a hash (e.g. a nav link clicked from a blog page),
  // scroll to that section once its content has mounted.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location]);

  return (
    <main>
      {/* 1. Hero banner with premium indicators */}
      <Hero />

      {/* Diagnostic Interactivity: "La tua attività è ancora senza sito web?" */}
      <LazySection component={PainPoints} minHeight={500} />

      {/* 2. Services Grid */}
      <LazySection component={Services} minHeight={900} />

      {/* Animated brand interlude filling the gap between two dark sections */}
      <LazySection component={BrandInterlude} minHeight={400} />

      {/* New: Step-by-Step Premium Process Section */}
      <LazySection component={Process} minHeight={700} />

      {/* New: "Perché scegliere PixelForge?" section with "Before vs After" comparison slider */}
      <LazySection component={WhyChooseUs} minHeight={800} />

      {/* 3. Portfolio Showcase with Interactive Live Simulation */}
      <LazySection component={Portfolio} minHeight={1000} />

      {/* 3.5 Success Stories / Storie di Successo */}
      <LazySection component={SuccessStories} minHeight={700} />

      {/* 4. Pricing Tables + Custom Quote Configurator */}
      <LazySection component={Pricing} minHeight={900} />

      {/* 5. About (Chi Siamo) & Client Testimonials */}
      <LazySection component={About} minHeight={700} />

      {/* 5.5 Premium Testimonials Section */}
      <LazySection component={Testimonials} minHeight={600} />

      {/* 6. Contact Form & WhatsApp Integrations */}
      <LazySection component={Contact} minHeight={800} />
    </main>
  );
}
