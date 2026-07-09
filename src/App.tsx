import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PainPoints from "./components/PainPoints";
import Services from "./components/Services";
import Process from "./components/Process";
import WhyChooseUs from "./components/WhyChooseUs";
import Portfolio from "./components/Portfolio";
import SuccessStories from "./components/SuccessStories";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import FloatingGoogleReview from "./components/FloatingGoogleReview";
import { LanguageProvider } from "./context/LanguageContext";
import { MotionConfig } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
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
    };
  }, []);

  useEffect(() => {
    const sections = ["home", "servizi", "processo", "perche-sceglierci", "portfolio", "storie-successo", "listino", "testimonials", "chi-siamo", "contatti"];
    
    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
        <div className="bg-dark-bg min-h-screen text-zinc-100 antialiased selection:bg-gold-500 selection:text-dark-bg relative overflow-hidden">
          {/* Premium Mouse-Follow Glow Effect */}
          {isVisible && (
            <div
              className="pointer-events-none fixed z-50 w-[450px] h-[450px] rounded-full opacity-35 blur-[120px] transition-transform duration-150 ease-out"
              style={{
                background: "radial-gradient(circle, rgba(223, 181, 28, 0.15) 0%, rgba(0, 122, 255, 0.12) 50%, transparent 100%)",
                left: `${mousePos.x - 225}px`,
                top: `${mousePos.y - 225}px`,
              }}
            />
          )}

          {/* Sticky Premium Navbar */}
          <Header activeSection={activeSection} />

          {/* Main Content Sections */}
          <main>
            {/* 1. Hero banner with premium indicators */}
            <Hero />

            {/* Diagnostic Interactivity: "La tua attività è ancora senza sito web?" */}
            <PainPoints />

            {/* 2. Services Grid */}
            <Services />

            {/* New: Step-by-Step Premium Process Section */}
            <Process />

            {/* New: "Perché scegliere PixelForge?" section with "Before vs After" comparison slider */}
            <WhyChooseUs />

            {/* 3. Portfolio Showcase with Interactive Live Simulation */}
            <Portfolio />

            {/* 3.5 Success Stories / Storie di Successo */}
            <SuccessStories />

            {/* 4. Pricing Tables + Custom Quote Configurator */}
            <Pricing />

            {/* 5. About (Chi Siamo) & Client Testimonials */}
            <About />

            {/* 5.5 Premium Testimonials Section */}
            <Testimonials />

            {/* 6. Contact Form & WhatsApp Integrations */}
            <Contact />
          </main>

          {/* Modern Footer with Live Clock */}
          <Footer />

          {/* Persistent Floating WhatsApp widget always visible */}
          <FloatingWhatsApp />

          {/* Premium Floating Google Review button */}
          <FloatingGoogleReview />
        </div>
      </MotionConfig>
    </LanguageProvider>
  );
}
