import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import IntroOverlay from "./components/IntroOverlay";
import StudioExperience from "./components/StudioExperience";

// Below-the-fold / non-critical chrome: deferred so they don't block first paint.
const Footer = lazy(() => import("./components/Footer"));
const FloatingWhatsApp = lazy(() => import("./components/FloatingWhatsApp"));
const FloatingGoogleReview = lazy(() => import("./components/FloatingGoogleReview"));
// The AI chat widget pulls in the heavy @n8n/chat runtime (its own Vue-based bundle).
// It's not needed for first paint, so it's code-split into its own chunk and only
// downloaded after the initial page has rendered, keeping it off the critical path.
const AIChatWidget = lazy(() => import("./components/AIChatWidget"));
import HomePage from "./pages/HomePage";
import BlogListPage from "./pages/BlogListPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import TerminiCondizioniPage from "./pages/TerminiCondizioniPage";
import NotFoundPage from "./pages/NotFoundPage";
import CookieConsentBanner from "./components/CookieConsentBanner";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";

// GSAP/ScrollTrigger is dynamically imported (repeat calls resolve instantly once
// loaded once) instead of statically imported, so it's never part of the critical
// initial bundle just to support these background refresh calls.
const refreshScrollTrigger = () => {
  import("./lib/gsap").then(({ ScrollTrigger }) => ScrollTrigger.refresh());
};

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </AppProviders>
  );
}

// Shared context providers, extracted so entry-server.tsx can wrap AppInner in a
// StaticRouter (server-safe, no browser `history` API) instead of BrowserRouter
// while reusing the exact same provider/component tree as the real client app.
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CookieConsentProvider>{children}</CookieConsentProvider>
    </LanguageProvider>
  );
}

export function AppInner() {
  const { language } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const outerGlowRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Keep ScrollTrigger positions in sync with content that reflows independently
  // of the window resize event: language switches (different text length) and
  // async image loads (lazy-loaded cards/portfolio/testimonial images).
  useEffect(() => {
    const id = requestAnimationFrame(() => refreshScrollTrigger());
    return () => cancelAnimationFrame(id);
  }, [language]);

  useEffect(() => {
    const handleWindowLoad = () => refreshScrollTrigger();
    window.addEventListener("load", handleWindowLoad);

    // Debounced: dozens of lazy-loaded images can fire in quick succession,
    // and refreshing on every single one is wasteful (and, mid-scroll, can
    // briefly desync already-revealed sections from their trigger positions).
    let refreshTimer: number | undefined;
    const handleImageLoad = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName !== "IMG") return;
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => refreshScrollTrigger(), 250);
    };
    document.addEventListener("load", handleImageLoad, true);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      document.removeEventListener("load", handleImageLoad, true);
      window.clearTimeout(refreshTimer);
    };
  }, []);

  // Prevent scrolling behind the fullscreen intro while it's active.
  useEffect(() => {
    document.body.style.overflow = isHome && !introDone ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone, isHome]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    // Position updates bypass React state -- writing mousePos to state on every
    // mousemove event forced a full re-render (and both glow divs) per pixel of
    // movement. Instead, the raw position is stashed in a ref and applied
    // directly to each div's `transform` in a single rAF-batched write, which
    // also finally makes the divs' existing `transition-transform` classes do
    // something (previously a no-op, since `left`/`top` were what animated).
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };

      if (animationFrameRef.current !== null) return;

      animationFrameRef.current = window.requestAnimationFrame(() => {
        const { x, y } = mousePositionRef.current;
        if (outerGlowRef.current) {
          outerGlowRef.current.style.transform = `translate3d(${x - 225}px, ${y - 225}px, 0)`;
        }
        if (innerGlowRef.current) {
          innerGlowRef.current.style.transform = `translate3d(${x - 70}px, ${y - 70}px, 0)`;
        }
        animationFrameRef.current = null;
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial check
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const sections = ["home", "servizi", "processo", "perche-sceglierci", "portfolio", "storie-successo", "listino", "testimonials", "chi-siamo", "contatti"];

    // Reads (offsetTop/offsetHeight) are batched into a single rAF-scheduled pass
    // instead of running synchronously on every scroll event, which was forcing
    // a layout reflow on each scroll tick.
    let ticking = false;
    const measure = () => {
      ticking = false;
      const scrollPosition = window.scrollY + 160; // offset for fixed header and comfortable trigger

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    measure();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed global animated background -- rendered once at the true app root, as a
          sibling before the content wrapper, so no ancestor's own background, overflow
          or stacking context can sit on top of / clip it on any route. */}
      <StudioExperience />

      {isHome && !introDone && <IntroOverlay onComplete={() => setIntroDone(true)} />}
      <div className="min-h-screen text-zinc-100 antialiased selection:bg-gold-500 selection:text-dark-bg relative z-[1] overflow-hidden">
          {/* Premium Mouse-Follow Glow Effect: soft outer bloom + tighter inner core */}
          {isVisible && (
            <>
              <div
                ref={outerGlowRef}
                className="pointer-events-none fixed z-50 w-[450px] h-[450px] rounded-full opacity-35 blur-[120px] transition-transform duration-150 ease-out"
                style={{
                  background: "radial-gradient(circle, rgba(223, 181, 28, 0.15) 0%, rgba(0, 122, 255, 0.12) 50%, transparent 100%)",
                  left: 0,
                  top: 0,
                  transform: "translate3d(-450px, -450px, 0)",
                }}
              />
              <div
                ref={innerGlowRef}
                className="pointer-events-none fixed z-50 w-[140px] h-[140px] rounded-full opacity-40 blur-[45px] transition-transform duration-100 ease-out"
                style={{
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(223, 181, 28, 0.18) 55%, transparent 100%)",
                  left: 0,
                  top: 0,
                  transform: "translate3d(-140px, -140px, 0)",
                }}
              />
            </>
          )}

          {/* Sticky Premium Navbar */}
          <Header activeSection={activeSection} onOpenAIChat={() => setIsAIChatOpen(true)} />

          {/* Routed page content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/termini-e-condizioni" element={<TerminiCondizioniPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Real, functioning cookie consent banner -- present on every route */}
          <CookieConsentBanner />

          {/* Non-critical chrome -- all lazy-loaded, no fallback UI needed since these
              never affect initial layout/content (footer, floating widgets, AI chat) */}
          <Suspense fallback={null}>
            {/* Modern Footer with Live Clock */}
            <Footer />

            {/* Persistent Floating WhatsApp widget always visible */}
            <FloatingWhatsApp />

            {/* Premium Floating Google Review button */}
            <FloatingGoogleReview />

            {/* Professional Floating AI Chat Widget */}
            <AIChatWidget isOpen={isAIChatOpen} setIsOpen={setIsAIChatOpen} />
          </Suspense>
      </div>
    </>
  );
}
