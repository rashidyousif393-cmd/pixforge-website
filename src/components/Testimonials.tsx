import React, { useState, useEffect, useRef } from "react";
import {
  Star, Quote, ChevronLeft, ChevronRight, Play, Pause, Grid, Layers,
  CheckCircle2, ShieldCheck, Heart, Sparkles
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { gsap } from "../lib/gsap";
import ScrollReveal from "./ScrollReveal";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  rating: number;
  image: string;
  review: string;
  metric: string;
  metricLabel: string;
}

export default function Testimonials() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  // Large/interactive blocks use useScrollReveal's ref/class directly (rather than
  // wrapping in <ScrollReveal>) to avoid touching their onMouseEnter/onMouseLeave
  // handlers or risking a mismatched closing tag.
  const sliderBoxReveal = useScrollReveal<HTMLDivElement>();
  const trustPanelReveal = useScrollReveal<HTMLDivElement>();

  const premiumTestimonials: TestimonialData[] = language === "it" ? [
    {
      id: "beauty",
      name: "Elena Bianchi",
      role: "Titolare",
      company: "Aura Kosmetik",
      industry: "Bellezza & Wellness",
      location: "Lugano, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Prima di PixelForge non avevamo un vero sito web, ma ricevevamo solo chiamate sporadiche. Ora, con le prenotazioni online personalizzate e l'ottimizzazione SEO locale, il nostro fatturato è aumentato del 40% in soli tre mesi! I clienti si complimentano spesso per l'eleganza del sito e per la facilità con cui prenotano dallo smartphone.",
      metric: "+40%",
      metricLabel: "Aumento fatturato"
    },
    {
      id: "dental",
      name: "Dr. med. dent. Marco Galli",
      role: "Direttore Sanitario",
      company: "Studio Dentistico San Gottardo",
      industry: "Odontoiatria",
      location: "Locarno, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "In qualità di studio dentistico, diamo la massima importanza alla serietà e alla protezione dei dati. PixelForge ha sviluppato per noi una piattaforma eccellente, pienamente conforme alla LPD svizzera, che trasmette immediata fiducia. I nuovi pazienti prenotano le loro prime visite direttamente online dal sito, alleggerendo notevolmente il lavoro della nostra reception.",
      metric: "30%",
      metricLabel: "Meno chiamate in reception"
    },
    {
      id: "restaurant",
      name: "Giovanni Rossi",
      role: "Titolare & Executive Chef",
      company: "Grotto della Valle",
      industry: "Gastronomia",
      location: "Bellinzona, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Il nostro vecchio menu era solo un pesante file PDF e il sito era ormai obsoleto. PixelForge ha realizzato per noi un sito web velocissimo con un fantastico menu digitale interattivo e un sistema di prenotazione dei tavoli. Da allora siamo praticamente sempre al completo nei fine settimana! La collaborazione è stata semplice ed estremamente efficiente.",
      metric: "100%",
      metricLabel: "Saturazione nel weekend"
    },
    {
      id: "hotel",
      name: "Beat Keller",
      role: "Direttore Generale",
      company: "Chalet Splendide Resort",
      industry: "Boutique Hotellerie",
      location: "St. Moritz, Grigioni",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Volevamo ridurre la nostra dipendenza dai grandi portali di prenotazione. PixelForge ha creato per noi un vero capolavoro visivo. L'estetica cattura immediatamente il visitatore. Grazie al collegamento diretto con il nostro motore di prenotazione, le prenotazioni dirette sul nostro sito sono aumentate immediatamente. Un investimento che vale ogni centesimo.",
      metric: "+35%",
      metricLabel: "Più prenotazioni dirette"
    },
    {
      id: "construction",
      name: "Thomas Meier",
      role: "CEO & Proprietario",
      company: "Edilizia Alpina SA",
      industry: "Costruzioni & Artigianato",
      location: "Mendrisio, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Nelle gare d'appalto pubbliche, la fiducia e un'immagine impeccabile sono determinanti. Il nostro nuovo e solido sito web presenta le nostre opere di riferimento in modo nitido e ordinato. Il portfolio filtrabile è imbattibile. Il numero di richieste di preventivo qualificate tramite il nuovo modulo ha superato ogni nostra aspettativa.",
      metric: "+50%",
      metricLabel: "Più richieste di preventivo"
    },
    {
      id: "medical",
      name: "Dr. med. Sandra Rocco",
      role: "Direttrice Medica",
      company: "Centro Medico San Rocco",
      industry: "Centro Medico",
      location: "Chiasso, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Accessibilità, percorsi chiari per i pazienti e assoluta sicurezza dei dati erano al centro della nostra nuova presenza web. PixelForge ha gestito tutti questi complessi requisiti con la tipica affidabilità svizzera. Il collegamento con la pianificazione dei percorsi dei trasporti pubblici facilita enormemente l'arrivo dei pazienti anziani. Una partnership esemplare.",
      metric: "100%",
      metricLabel: "Usabilità senza barriere"
    }
  ] : [
    {
      id: "beauty",
      name: "Elena Bianchi",
      role: "Owner",
      company: "Aura Kosmetik",
      industry: "Beauty & Wellness",
      location: "Lugano, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Before PixelForge we didn't have a real website and only received sporadic calls. Now, with customized online booking and top-tier SEO, our revenue increased by 40% in just three months! Clients frequently compliment the elegant layout and how effortlessly they can book appointments from their smartphones.",
      metric: "+40%",
      metricLabel: "Revenue growth"
    },
    {
      id: "dental",
      name: "Dr. med. dent. Marco Galli",
      role: "Medical Director",
      company: "San Gottardo Dental Clinic",
      industry: "Dental Medicine",
      location: "Locarno, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "As a dental clinic, we attach the highest value to professionalism and data privacy. PixelForge developed an excellent, fully Swiss DPA-compliant platform that radiates instant trust. New patients now book their initial appointments directly online via the website, which significantly relieved our reception staff.",
      metric: "30%",
      metricLabel: "Fewer reception calls"
    },
    {
      id: "restaurant",
      name: "Giovanni Rossi",
      role: "Owner & Head Chef",
      company: "Grotto della Valle",
      industry: "Gastronomy",
      location: "Bellinzona, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Our old menu was just a heavy PDF and the website was outdated. PixelForge built us a lightning-fast website with a fantastic interactive digital menu and table reservation system. Since then, we are practically fully booked every single weekend! The collaboration was simple and highly efficient.",
      metric: "100%",
      metricLabel: "Weekend capacity filled"
    },
    {
      id: "hotel",
      name: "Beat Keller",
      role: "General Manager",
      company: "Chalet Splendide Resort",
      industry: "Boutique Hotellerie",
      location: "St. Moritz, Grisons",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "We wanted to reduce our dependence on large booking portals. PixelForge created a visual masterpiece for us. The aesthetics captivate the visitor immediately. Through seamless connection to our booking engine, direct bookings on our own page increased instantly. An absolutely rewarding investment.",
      metric: "+35%",
      metricLabel: "More direct bookings"
    },
    {
      id: "construction",
      name: "Thomas Meier",
      role: "CEO & Owner",
      company: "Edilizia Alpina SA",
      industry: "Construction & Trade",
      location: "Mendrisio, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "In public tenders, trust and a flawless impression are decisive. Our new, highly solid website presents our reference projects with perfect sharpness and clarity. The filterable portfolio is second to none. The number of qualified quote requests through our new form has exceeded all our expectations.",
      metric: "+50%",
      metricLabel: "More quote requests"
    },
    {
      id: "medical",
      name: "Dr. med. Sandra Rocco",
      role: "Medical Director",
      company: "San Rocco Medical Center",
      industry: "Medical Center",
      location: "Chiasso, Ticino",
      rating: 5,
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?fm=webp&auto=format&fit=crop&w=150&q=70",
      review: "Accessibility, clear patient pathways, and absolute data security were at the heart of our new web presence. PixelForge mastered all these complex requirements with Swiss reliability. The integration with public transport route planning makes it incredibly easy for older patients to reach us. An exemplary partnership.",
      metric: "100%",
      metricLabel: "Accessible Usability"
    }
  ];

  // Auto-play interval logic
  useEffect(() => {
    if (viewMode === "slider" && isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 5500);
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, isPlaying, viewMode]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? premiumTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === premiumTestimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = premiumTestimonials[currentIndex] || premiumTestimonials[0];

  // Crossfade the spotlight card content whenever the active testimonial changes
  // (next/prev/dot-click/autoplay). Purely visual — the index/state logic above
  // that drives which testimonial is shown is untouched.
  useEffect(() => {
    if (viewMode !== "slider" || !slideContentRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    gsap.fromTo(
      slideContentRef.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }
    );
  }, [currentIndex, viewMode]);

  // Header, spotlight card, bento grid cards and trust panel entrances now run
  // through <ScrollReveal> (IntersectionObserver + CSS) -- see the JSX below.
  // The grid cards keep their alternating left/right offset via fade-left/fade-right.

  return (
    <section id="testimonials" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] rounded-full radial-glow-gold opacity-10 pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] rounded-full radial-glow-blue opacity-10 pointer-events-none blur-3xl" />
      
      {/* Horizontal divider line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <ScrollReveal effect="fade-right" className="text-left space-y-5 max-w-2xl">
            <div className="kicker">
              {language === "it" ? "FIDUCIA & SUCCESSO" : "TRUST & SUCCESS"}
            </div>
            <h2 className="section-title">
              {language === "it" ? (
                <>
                  Storie di successo dei <br />
                  <span className="text-gradient-gold">nostri clienti</span>
                </>
              ) : (
                <>
                  Voices that speak to our <br />
                  <span className="text-gradient-gold">Swiss Quality</span>
                </>
              )}
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              {language === "it"
                ? "Scopri direttamente come le PMI svizzere hanno rivoluzionato la propria presenza digitale con PixelForge attirando flussi costanti di nuovi clienti."
                : "Discover first-hand how Swiss local businesses have revolutionized their digital presence with PixelForge and unlocked new customer streams."}
            </p>
          </ScrollReveal>

          {/* Toggle view mode & Play/Pause controls */}
          <ScrollReveal effect="fade-left" className="flex flex-wrap items-center gap-3 shrink-0">
            {viewMode === "slider" && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer flex items-center justify-center"
                title={isPlaying ? (language === "it" ? "Pausa scorrimento" : "Pause Auto-Slide") : (language === "it" ? "Riprendi scorrimento" : "Resume Auto-Slide")}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-gold-500" /> : <Play className="w-4 h-4" />}
              </button>
            )}

            <div className="p-1 rounded-xl bg-zinc-950 border border-zinc-900 flex">
              <button
                onClick={() => setViewMode("slider")}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "slider"
                    ? "bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === "it" ? "Spotlight" : "Spotlight"}</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{language === "it" ? "Griglia" : "Bento Grid"}</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Dynamic Display Mode */}

        {/* SLIDER VIEW MODE */}
        {viewMode === "slider" && (
          <div className="relative max-w-5xl mx-auto">
            {/* Outer Slider Box with Pause on Hover capability */}
            <div
              ref={sliderBoxReveal.ref}
              className={`scroll-reveal scroll-reveal--fade-up${sliderBoxReveal.visible ? " is-visible" : ""} relative min-h-[380px] sm:min-h-[420px] lg:min-h-[340px] rounded-3xl p-px bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col justify-center overflow-hidden shadow-2xl`}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Background soft styling lines & Huge luxury Quotes */}
              <div className="absolute inset-0 bg-[#0a0a0d] z-0" />
              <Quote className="absolute right-8 top-6 w-32 h-32 text-zinc-900/35 pointer-events-none transform rotate-180 z-0" />

              {/* Carousel Card inside layout */}
              <div ref={slideContentRef} className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center text-left">
                  
                  {/* Left portrait side with glowing boarder */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-b from-gold-500 to-amber-400 shadow-xl group">
                    <img 
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover rounded-[14px] filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp&auto=format&fit=crop&w=150&q=70";
                      }}
                    />
                    <div className="absolute inset-0 rounded-[14px] bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                    
                    {/* Tiny Swiss Badge */}
                    <span className="absolute bottom-1.5 right-1.5 text-[8px] font-mono font-bold bg-zinc-950/90 text-gold-400 border border-gold-500/20 px-1 py-0.5 rounded">
                      CH 🇨🇭
                    </span>
                  </div>

                  {/* Right Description & Metrics side */}
                  <div className="flex-1 space-y-5">
                    {/* Header: Company, rating, location */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="px-2.5 py-1 bg-gold-500/10 border border-gold-500/20 rounded-lg text-[10px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                          {language === "it" ? "Settore" : "Sector"}: {currentTestimonial.industry}
                        </span>
                        <div className="text-zinc-400 text-[10px] font-mono mt-1">
                          {currentTestimonial.location}
                        </div>
                      </div>

                      {/* Stars Rating */}
                      <div className="flex gap-1 text-gold-500">
                        {Array.from({ length: currentTestimonial.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4.5 h-4.5 fill-gold-500 stroke-[1.5]" />
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="font-sans text-sm sm:text-base text-zinc-200 leading-relaxed font-light italic">
                      "{currentTestimonial.review}"
                    </p>

                    {/* Author Signature & Industry metric side-by-side */}
                    <div className="pt-5 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-display font-black text-white">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {currentTestimonial.role} • <span className="text-gold-500 font-semibold">{currentTestimonial.company}</span>
                        </p>
                      </div>

                      {/* Trust Outcome metric banner */}
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-900">
                        <div className="font-mono text-lg font-black text-gold-500">
                          {currentTestimonial.metric}
                        </div>
                        <div className="h-4 w-px bg-zinc-800" />
                        <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider font-mono">
                          {currentTestimonial.metricLabel}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Slider Controls Navigation Buttons & dots indicators */}
              <div className="flex items-center justify-between mt-8">
                {/* Left arrow */}
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-gold-500/30 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-lg group active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Progress dot indicators */}
                <div className="flex gap-2">
                  {premiumTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? "w-8 bg-gradient-to-r from-gold-500 to-amber-500"
                          : "w-2.5 bg-zinc-800 hover:bg-zinc-600"
                      }`}
                      aria-label={`Go to Testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Right arrow */}
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-gold-500/30 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-lg group active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
        )}

        {/* BENTO GRID VIEW MODE */}

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumTestimonials.map((t, tIdx) => (
              <ScrollReveal
                key={t.id}
                effect={tIdx % 2 === 0 ? "fade-right" : "fade-left"}
                delay={(tIdx % 3) * 90}
                className="p-px rounded-3xl bg-zinc-900 border border-white/5 bg-gradient-to-b from-zinc-800/80 to-zinc-950 flex flex-col justify-between overflow-hidden shadow-xl group hover:border-gold-500/20 hover:-translate-y-1.5 transition-all duration-300"
              >
                  <div className="bg-[#0b0b0e] h-full p-6 sm:p-8 flex flex-col justify-between rounded-[22px]">
                    <div className="space-y-4">
                      {/* Rating & Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5 text-gold-500">
                          {Array.from({ length: t.rating }).map((_, rIdx) => (
                            <Star key={rIdx} className="w-3.5 h-3.5 fill-gold-500 stroke-[1.5]" />
                          ))}
                        </div>
                        
                        <span className="text-[9px] font-mono font-bold text-zinc-400 tracking-wider">
                          {t.location}
                        </span>
                      </div>

                      {/* Industry badge */}
                      <div className="text-left">
                        <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                          {t.industry}
                        </span>
                      </div>

                      {/* Review Paragraph */}
                      <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light italic leading-relaxed text-left pt-1">
                        "{t.review}"
                      </p>
                    </div>

                    {/* Author bottom bar & Metric */}
                    <div className="pt-6 mt-6 border-t border-zinc-900/60 text-left space-y-4">
                      {/* Metric Banner inside grid card */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-900">
                        <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">{language === "it" ? "Risultato" : "Outcome"}:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-gold-500">{t.metric}</span>
                          <span className="text-[8px] font-mono text-zinc-400 font-light uppercase">{t.metricLabel}</span>
                        </div>
                      </div>

                      {/* Author credentials */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-800 shrink-0">
                          <img 
                            src={t.image}
                            alt={t.name}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp&auto=format&fit=crop&w=150&q=70";
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-none">
                            {t.name}
                          </h4>
                          <p className="text-[10px] text-zinc-400 font-light mt-1">
                            {t.role} • <span className="text-gold-500 font-medium">{t.company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Global Schweizer Trust & Compliance Indicators */}
        <div
          ref={trustPanelReveal.ref}
          className={`scroll-reveal scroll-reveal--fade-up${trustPanelReveal.visible ? " is-visible" : ""} mt-20 p-6 sm:p-8 rounded-3xl border border-zinc-900/80 bg-zinc-950/50 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6 text-left relative overflow-hidden`}
        >
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gold-500 to-amber-500" />

          {/* Indicator 1 */}
          <div className="flex gap-4 items-start pl-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/15 text-gold-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                {language === "it" ? "100% Clienti Verificati" : "100% Verified Clients"}
              </h4>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed mt-1">
                {language === "it" 
                  ? "Tutte le recensioni provengono da veri imprenditori svizzeri con cui collaboriamo strettamente."
                  : "All success stories come from real Swiss business owners we closely cooperate with."}
              </p>
            </div>
          </div>

          {/* Indicator 2 */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/15 text-gold-500 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                {language === "it" ? "Valutazione Google 5.0" : "Google 5.0 Star Rating"}
              </h4>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed mt-1">
                {language === "it" 
                  ? "La nostra qualità svizzera senza compromessi si riflette in un tasso di soddisfazione impeccabile di 5.0 stelle."
                  : "Our uncompromising Swiss quality is reflected in a flawless customer satisfaction rating of 5.0 stars."}
              </p>
            </div>
          </div>

          {/* Indicator 3 */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/15 text-gold-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                {language === "it" ? "ROI Comprovato" : "Proven ROI (Return on Invest)"}
              </h4>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed mt-1">
                {language === "it" 
                  ? "Siti web che non sono solo belli da vedere, ma che grazie alla psicologia di vendita generano contatti reali."
                  : "Websites that do not just look beautiful, but demonstrably generate customer inquiries through sales psychology."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
