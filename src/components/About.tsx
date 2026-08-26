import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Check, Award, Zap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useGsapAnimation } from "../hooks/useGsapAnimation";
import { gsap } from "../lib/gsap";
import ScrollReveal from "./ScrollReveal";

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, duration = 1500, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, value, duration]);

  return (
    <div ref={elementRef} className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
      {prefix}
      {count}
      {suffix}
    </div>
  );
};

export default function About() {
  const { language } = useLanguage();

  const swissValues = language === "it" ? [
    {
      icon: Award,
      title: "Precisione Svizzera",
      desc: "Ogni pixel è posizionato con cura millimetrica. Codice pulito, design di altissimo livello e rispetto assoluto dei tempi di consegna sono per noi la norma."
    },
    {
      icon: Zap,
      title: "Caricamento Fulmineo",
      desc: "Sviluppiamo siti web velocissimi che si caricano in meno di mezzo secondo. I tuoi clienti otterranno informazioni istantaneamente."
    },
    {
      icon: ShieldCheck,
      title: "Trasparenza Totale",
      desc: "Nessun abbonamento mensile nascosto o offerta civetta. Paghi solo per ciò di cui hai veramente bisogno e mantieni la proprietà esclusiva."
    }
  ] : [
    {
      icon: Award,
      title: "Swiss Precision",
      desc: "Every pixel is placed with millimeter-level care. Clean code, first-class design, and absolute adherence to delivery times are second nature to us."
    },
    {
      icon: Zap,
      title: "Lightning-Fast Load Speed",
      desc: "We develop ultra-fast websites that load in less than half a second. Your customers receive information without any delay."
    },
    {
      icon: ShieldCheck,
      title: "Total Transparency",
      desc: "No hidden monthly subscription fees or bait-and-switch offers. You only pay for what you truly need and retain full, unlimited ownership."
    }
  ];

  {/* These describe standards PixelForge builds to and controls directly (speed
      target, custom-built approach, service scope) rather than claimed aggregate
      client outcomes, which we have no consistent, verifiable way to measure. */}
  const stats = language === "it" ? [
    { value: 100, prefix: "", suffix: "%", label: "Siti realizzati su misura, mai template" },
    { value: 4, prefix: "< 0.", suffix: "s", label: "Ø Tempo di caricamento a cui puntiamo" },
    { value: 100, prefix: "", suffix: "/100", label: "Punteggio Google PageSpeed su cui lavoriamo" },
    { value: 6, prefix: "", suffix: "", label: "Servizi digitali integrati in un unico partner" }
  ] : [
    { value: 100, prefix: "", suffix: "%", label: "Custom-built sites, never templates" },
    { value: 4, prefix: "< 0.", suffix: "s", label: "Ø Load time we build towards" },
    { value: 100, prefix: "", suffix: "/100", label: "Google PageSpeed score we target" },
    { value: 6, prefix: "", suffix: "", label: "Digital services integrated under one partner" }
  ];

  const sectionRef = useGsapAnimation<HTMLElement>((scope, { reducedMotion }) => {
    if (reducedMotion || !scope.current) return;

    // Only the stats container gets a scroll-triggered entrance; the counter
    // itself keeps driving its own IntersectionObserver + rAF logic untouched,
    // so this fires independently and can't race with it.
    const statsContainer = scope.current.querySelector('[data-anim="stats-container"]');
    if (statsContainer) {
      gsap.from(statsContainer, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: statsContainer, start: "top 85%", toggleActions: "play none none none" },
      });
    }
  }, []);

  return (
    <section id="chi-siamo" ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden w-full">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-5 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Core Identity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-32">
          
          {/* Text Info Side */}
          <div className="space-y-6 text-left flex flex-col justify-center">
            <div className="kicker self-start">
              {language === "it" ? "CHI SIAMO • PIXELFORGE" : "ABOUT US • PIXELFORGE"}
            </div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 1.2rem + 2.6vw, 3.25rem)" }}>
              {language === "it" ? (
                <>
                  Artigiani del web, <br className="hidden sm:inline" />
                  <span className="text-gradient-gold">focalizzati sulla crescita locale</span>
                </>
              ) : (
                <>
                  Web craftsmen, <br className="hidden sm:inline" />
                  <span className="text-gradient-gold">focused on local growth</span>
                </>
              )}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              {language === "it"
                ? "Siamo un'agenzia web svizzera con sede in Ticino e Grigioni. Il nostro obiettivo è semplice: aiutare le attività locali, i fornitori di servizi e i negozi specializzati privi di un sito web moderno a ottenere una presenza digitale di prima classe che generi costantemente contatti qualificati."
                : "We are a Swiss web agency based in Ticino and Grisons. Our goal is simple: to help local businesses, service providers, and specialty shops without a modern website achieve a premium digital presence that continuously generates inquiries."}
            </p>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              {language === "it"
                ? "Uniamo l'estetica raffinata delle principali agenzie digitali internazionali con l'affidabilità e l'efficienza tipiche svizzere. Non ti lasciamo solo: offriamo un supporto personale e rapido direttamente sul territorio."
                : "We combine the aesthetics of leading international digital agencies with Swiss reliability and efficiency. We do not leave you alone: we provide quick, personal support directly in Switzerland."}
            </p>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              {language === "it"
                ? "Il nostro approccio parte sempre da una consulenza gratuita per capire davvero il tuo settore, i tuoi clienti e i tuoi obiettivi, prima ancora di parlare di design. Da lì costruiamo ogni sito partendo da zero — struttura dei contenuti, velocità e ottimizzazione per la ricerca locale sono parte del processo fin dal primo giorno, non aggiunte dell'ultimo momento. Dopo il lancio restiamo disponibili per le modifiche e i chiarimenti che servono davvero, senza vincolarti a contratti di manutenzione poco chiari."
                : "Our approach always starts with a free consultation to genuinely understand your industry, your customers, and your goals, before we even talk about design. From there we build every site from scratch — content structure, speed, and local search optimization are part of the process from day one, not an afterthought. After launch we stay available for the changes and clarifications that actually matter, without locking you into vague maintenance contracts."}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950 rounded-xl border border-zinc-900/80">
                <Check className="w-3.5 h-3.5 text-gold-500" />
                <span className="text-[10px] font-bold text-zinc-200">
                  {language === "it" ? "Sede in Ticino & Grigioni 🇨🇭" : "Based in Ticino & Grisons 🇨🇭"}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950 rounded-xl border border-zinc-900/80">
                <Check className="w-3.5 h-3.5 text-gold-500" />
                <span className="text-[10px] font-bold text-zinc-200">
                  {language === "it" ? "Design personalizzato – No template" : "Bespoke Design – No templates"}
                </span>
              </div>
            </div>
          </div>

          {/* Pillars Side */}
          <div className="space-y-4 flex flex-col justify-center">
            {swissValues.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-zinc-800 transition-all flex items-start gap-4 text-left group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 group-hover:scale-110 duration-300 transition-transform">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-gold-400 transition-colors">{val.title}</h3>
                    <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-relaxed font-light">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Creative Media Side (Laptops & Business Owners Collage) */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col justify-between min-h-[380px] group w-full">
            {/* Background glowing gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full radial-glow-gold opacity-15 pointer-events-none blur-2xl" />
            
            {/* Interactive Image Frame */}
            <ScrollReveal effect="zoom" className="relative w-full h-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=webp&auto=format&fit=crop&w=600&q=70"
                alt="PixelForge Agency Team Switzerland"
                referrerPolicy="no-referrer"
                loading="lazy"
                width={600}
                height={450}
                className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-95 transition-transform duration-[750ms] scale-100 group-hover:scale-[1.03]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes("photo-1522071820081")) {
                    target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?fm=webp&auto=format&fit=crop&w=600&q=70";
                  } else {
                    target.src = "https://picsum.photos/seed/team_backup/1200/800";
                  }
                }}
              />
              {/* Soft dark elegant overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Small floating secondary overlay for Business Owner context */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-zinc-950/90 border border-white/10 px-2.5 py-1.5 rounded-xl backdrop-blur-md shadow-lg z-10">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-gold-500/30">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fm=webp&auto=format&fit=crop&w=100&q=70"
                    alt="Customer Portrait"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes("photo-1573496359142")) {
                        target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp&auto=format&fit=crop&w=100&q=70";
                      } else {
                        target.src = "https://picsum.photos/seed/portrait_backup/150/150";
                      }
                    }}
                  />
                </div>
                <div className="text-[8px] text-left leading-none">
                  <div className="font-extrabold text-white">Elena B.</div>
                  <div className="text-gold-500 mt-0.5">Aura Spa Lugano</div>
                </div>
              </div>

              {/* Bottom Editorial Caption banner */}
              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-zinc-950/80 border border-white/5 rounded-xl p-4 text-left">
                <span className="font-mono text-[8px] font-bold text-gold-500 uppercase tracking-widest block mb-1">
                  {language === "it" ? "IL NOSTRO UFFICIO" : "OUR OFFICE"}
                </span>
                <h4 className="font-display text-sm font-bold text-white">PixelForge Webagentur</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5 font-light leading-relaxed">
                  {language === "it"
                    ? "Il nostro team di design e sviluppo progetta e ottimizza le tue soluzioni web su misura."
                    : "Our design and development team designs and optimizes your bespoke web solutions."}
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Real Animated Counters Section */}
        <div data-anim="stats-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 p-8 sm:p-12 rounded-3xl border border-zinc-900 bg-zinc-950/40 text-center relative overflow-hidden w-full">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
