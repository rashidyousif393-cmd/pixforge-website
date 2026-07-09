import React, { useState, useEffect } from "react";
import { 
  Sparkles, Check, ArrowRight, ArrowUpRight, ShieldAlert,
  Layout, TrendingUp, MapPin, Smartphone, Zap, Cpu,
  Star, MessageSquare, Calendar, Send, Bot, Search,
  CheckCircle2, ShieldCheck, RefreshCw as SpinnerIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  benefits: string[];
  simulationId: "websites" | "seo" | "google_business" | "mobile_opt" | "speed" | "ai_automation";
  accentColor: string;
  glowClass: string;
}

export default function Services() {
  const { language, t } = useLanguage();
  const [activeService, setActiveService] = useState<string>("websites");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // --- Interactive States for Simulations ---
  // 1. Websites Simulation States
  const [webTheme, setWebTheme] = useState<"gold" | "blue" | "emerald">("gold");
  
  // 2. SEO Simulation States
  const [seoKeyword, setSeoKeyword] = useState<"paint" | "dentist" | "grotto">("paint");
  
  // 3. Google Business Simulation States
  const [reviewsCount, setReviewsCount] = useState<number>(124);
  const [simulatedReviews, setSimulatedReviews] = useState<Array<{ name: string; text: string; date: string }>>([]);

  // Initialize reviews based on language
  useEffect(() => {
    if (language === "it") {
      setSimulatedReviews([
        { name: "Urs Meier", text: "Servizio eccellente! Tempi di risposta rapidissimi e gestione molto professionale. Assolutamente consigliato! 🇨🇭", date: "2 giorni fa" },
        { name: "Beatrix Keller", text: "Il nuovo sito è meraviglioso. Finalmente un processo di prenotazione semplice e veloce.", date: "1 settimana fa" }
      ]);
    } else {
      setSimulatedReviews([
        { name: "Urs Meier", text: "Excellent service! Extremely fast response times and very professional execution. Highly recommended! 🇨🇭", date: "2 days ago" },
        { name: "Beatrix Keller", text: "The new website looks gorgeous. Finally a booking process that is simple and works.", date: "1 week ago" }
      ]);
    }
  }, [language]);

  // 4. Mobile Optimization States
  const [mobileMode, setMobileMode] = useState<"outdated" | "pixelforge">("pixelforge");

  // 5. Speed Simulation States
  const [speedScore, setSpeedScore] = useState<number>(38);
  const [speedStatus, setSpeedStatus] = useState<"idle" | "scanning" | "completed">("idle");

  // 6. AI Automation States
  const [aiChatState, setAiChatState] = useState<"initial" | "selected" | "confirmed">("initial");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Triggering the automated PageSpeed analysis on simulation select
  useEffect(() => {
    if (activeService === "speed") {
      setSpeedScore(38);
      setSpeedStatus("idle");
    }
  }, [activeService]);

  const runSpeedTest = () => {
    setSpeedStatus("scanning");
    setSpeedScore(38);
    
    let currentScore = 38;
    const interval = setInterval(() => {
      currentScore += Math.floor(Math.random() * 8) + 3;
      if (currentScore >= 100) {
        setSpeedScore(100);
        setSpeedStatus("completed");
        clearInterval(interval);
      } else {
        setSpeedScore(currentScore);
      }
    }, 80);
  };

  const [isAddingReview, setIsAddingReview] = useState<boolean>(false);

  const addSimulatedReview = () => {
    if (isAddingReview) return;
    setIsAddingReview(true);

    const names = ["Thomas Sutter", "Monika Frey", "Hans-Peter Egger", "Verena Gerber", "Markus Tanner"];
    const reviews = language === "it" ? [
      "Caricamento incredibilmente veloce! I clienti ci chiamano molto più spesso di prima. Vale ogni centesimo! 👍",
      "Partner molto professionale per le PMI. L'integrazione con Maps ci porta clienti locali ogni giorno.",
      "Grazie mille per l'ottimo supporto e l'eccellente consulenza. Qualità di prima classe.",
      "Le automazioni ci risparmiano ore di lavoro ogni settimana. Altamente raccomandato! 🇨🇭"
    ] : [
      "Loads incredibly fast! Clients call us much more frequently than before. Worth every penny! 👍",
      "Very professional partner for local businesses. The Maps integration brings us daily walk-ins.",
      "Thank you so much for the great support and excellent advice. First-class quality.",
      "The automations save us hours of work every week. Highly recommended! 🇨🇭"
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomReview = reviews[Math.floor(Math.random() * reviews.length)];

    setTimeout(() => {
      setReviewsCount(prev => prev + 1);
      setSimulatedReviews(prev => [
        { name: randomName, text: randomReview, date: language === "it" ? "In questo momento" : "Just now" },
        ...prev
      ]);
      setIsAddingReview(false);
    }, 1000);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setAiChatState("selected");
    setIsAiTyping(true);

    setTimeout(() => {
      setIsAiTyping(false);
      setAiChatState("confirmed");
    }, 1200);
  };

  const resetAiChat = () => {
    setAiChatState("initial");
    setSelectedTime("");
    setIsAiTyping(false);
  };

  const handleScrollToContact = () => {
    const element = document.querySelector("#contatti");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const services: ServiceItem[] = language === "it" ? [
    {
      id: "websites",
      title: "Siti Web Premium",
      subtitle: "Pezzi unici digitali su misura",
      description: "Estetica straordinaria in stile lussuoso ed elegante, ispirata ai design system di Apple. Creiamo progetti unici con un'esperienza utente eccellente per presentare perfettamente il tuo marchio.",
      icon: Layout,
      benefits: ["Design high-end personalizzato", "UX intuitiva ottimizzata per la conversione", "Piena conformità alla LPD svizzera", "Hosting premium svizzero velocissimo"],
      simulationId: "websites",
      accentColor: "from-amber-500/20 to-gold-500/20",
      glowClass: "radial-glow-gold"
    },
    {
      id: "seo",
      title: "Precisione SEO Google",
      subtitle: "Visibilità in prima pagina",
      description: "Ottimizziamo l'intera presenza online affinché i clienti svizzeri ti trovino in cima a Google. Traffico organico duraturo senza costose campagne pubblicitarie.",
      icon: TrendingUp,
      benefits: ["Dominanza locale delle parole chiave", "Analisi precisa dei concorrenti", "Ottimizzazione tecnica e on-page", "Indicizzazione garantita su Google"],
      simulationId: "seo",
      accentColor: "from-blue-500/20 to-indigo-500/20",
      glowClass: "radial-glow-blue"
    },
    {
      id: "google_business",
      title: "Google Maps & Business",
      subtitle: "Calamita per clienti locali",
      description: "Ottimizzazione e gestione del tuo profilo Google Business per posizionarti al top su Google Maps. Ideale per negozi fisici e fornitori di servizi locali.",
      icon: MapPin,
      benefits: ["Verifica e protezione del profilo", "Strategia per recensioni a 5 stelle", "Indicazioni stradali interattive", "Contatto diretto via chiamata e WhatsApp"],
      simulationId: "google_business",
      accentColor: "from-purple-500/20 to-pink-500/20",
      glowClass: "radial-glow-purple"
    },
    {
      id: "mobile_opt",
      title: "Ottimizzazione Mobile",
      subtitle: "Esperienza smartphone perfetta",
      description: "Oltre l'85% delle ricerche locali in Svizzera avviene da dispositivi mobili. I nostri siti offrono un'esperienza touch fluida e precisa su ogni schermo.",
      icon: Smartphone,
      benefits: ["Navigazione intuitiva ad una mano", "Caricamento fulmineo su reti 4G e 5G", "Eleganti barre d'azione fisse", "Moduli mobile intuitivi"],
      simulationId: "mobile_opt",
      accentColor: "from-emerald-500/20 to-teal-500/20",
      glowClass: "radial-glow-green"
    },
    {
      id: "speed",
      title: "Ottimizzazione della Velocità",
      subtitle: "Tempi di caricamento sotto i 0.4s",
      description: "Un site web lento fa perdere la metà dei clienti. Sviluppiamo con codice ultra-leggero e compressioni all'avanguardia per la massima velocità.",
      icon: Zap,
      benefits: ["Google PageSpeed Score di 100/100", "Caricamento fulmineo in tempo reale", "Migliore posizionamento su Google", "Eco-design con impatto CO2 ridotto"],
      simulationId: "speed",
      accentColor: "from-rose-500/20 to-amber-500/20",
      glowClass: "radial-glow-gold"
    },
    {
      id: "ai_automation",
      title: "AI & Automazione",
      subtitle: "Collaboratori digitali 24/7",
      description: "Integra calendari di prenotazione intelligenti, calcolatori di preventivi e assistenti AI. Riduci i compiti di routine e cattura clienti 24 ore su 24.",
      icon: Cpu,
      benefits: ["Calendari online sincronizzati", "Assistenti chat AI intelligenti", "Notifiche automatiche via SMS ed Email", "Integrazione CRM fluida"],
      simulationId: "ai_automation",
      accentColor: "from-cyan-500/20 to-blue-500/20",
      glowClass: "radial-glow-blue"
    }
  ] : [
    {
      id: "websites",
      title: "Premium Websites",
      subtitle: "Tailor-made digital masterpieces",
      description: "Outstanding aesthetics in elegant luxury style, inspired by Apple design systems. We develop unique websites with excellent user guidance to showcase your brand perfectly.",
      icon: Layout,
      benefits: ["Customized high-end design", "Intuitive, conversion-optimized UX", "Full Swiss DPA compliance", "Super-fast premium Swiss hosting"],
      simulationId: "websites",
      accentColor: "from-amber-500/20 to-gold-500/20",
      glowClass: "radial-glow-gold"
    },
    {
      id: "seo",
      title: "Google SEO Precision",
      subtitle: "Page 1 Visibility",
      description: "We optimize your entire web presence so that high-intent Swiss customers find you first on Google. Long-lasting, organic traffic without expensive ad costs.",
      icon: TrendingUp,
      benefits: ["Local keyword dominance", "Precise competitor analysis", "On-page & technical optimization", "Guaranteed Google indexing"],
      simulationId: "seo",
      accentColor: "from-blue-500/20 to-indigo-500/20",
      glowClass: "radial-glow-blue"
    },
    {
      id: "google_business",
      title: "Google Maps & Business",
      subtitle: "Local customer magnet",
      description: "Optimization and management of your Google Business profile so you rank first on Google Maps. Ideal for physical stores and local service providers.",
      icon: MapPin,
      benefits: ["Profile verification & protection", "5-star review acquisition strategy", "Interactive directions maps", "Direct contact via call & WhatsApp"],
      simulationId: "google_business",
      accentColor: "from-purple-500/20 to-pink-500/20",
      glowClass: "radial-glow-purple"
    },
    {
      id: "mobile_opt",
      title: "Mobile Optimization",
      subtitle: "Flawless smartphone experience",
      description: "Over 85% of local searches in Switzerland occur on mobile. Our websites offer an unmatched fluid and pixel-perfect touch experience on any screen.",
      icon: Smartphone,
      benefits: ["One-handed thumb navigation", "Blazing-fast load times on 4G & 5G", "Elegant sticky call-to-actions", "Intuitive mobile forms"],
      simulationId: "mobile_opt",
      accentColor: "from-emerald-500/20 to-teal-500/20",
      glowClass: "radial-glow-green"
    },
    {
      id: "speed",
      title: "Speed Optimization",
      subtitle: "Load times under 0.4s",
      description: "A slow website loses half of its visitors. We code with ultra-lightweight clean code and state-of-the-art compression for ultimate speed.",
      icon: Zap,
      benefits: ["Pulsing 100/100 PageSpeed Score", "Real-time lightning-fast load speeds", "Enhanced organic Google rankings", "Eco-design with minimized CO2 footprint"],
      simulationId: "speed",
      accentColor: "from-rose-500/20 to-amber-500/20",
      glowClass: "radial-glow-gold"
    },
    {
      id: "ai_automation",
      title: "AI & Automation",
      subtitle: "Digital employees 24/7",
      description: "Integrate smart booking calendars, interactive quote calculators, and AI assistants. Reduce routine tasks and secure leads around the clock.",
      icon: Cpu,
      benefits: ["Synchronized online calendars", "Smart AI chat assistants", "Automated SMS & email notification feeds", "Seamless CRM integration"],
      simulationId: "ai_automation",
      accentColor: "from-cyan-500/20 to-blue-500/20",
      glowClass: "radial-glow-blue"
    }
  ];

  return (
    <section id="servizi" className="py-20 sm:py-24 lg:py-32 bg-dark-bg relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-10 pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-10 pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-gold-500 font-mono text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {language === "it" ? "I SERVIZI DELLA NOSTRA AGENZIA" : "OUR AGENCY SERVICES"}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === "it" ? (
              <>
                Soluzioni digitali che <br className="hidden sm:inline" />
                <span className="text-gradient-gold">portano risultati reali</span>
              </>
            ) : (
              <>
                Digital solutions that <br className="hidden sm:inline" />
                <span className="text-gradient-gold">deliver actual results</span>
              </>
            )}
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            {language === "it" 
              ? "Non creiamo semplici siti web predefiniti. Sviluppiamo canali digitali premium ottimizzati per convertire i visitatori svizzeri in clienti fedeli per la tua attività."
              : "We do not build simple template websites. We develop premium digital channels optimized to convert Swiss visitors into loyal, paying customers for your business."}
          </p>
        </div>

        {/* Dynamic Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 6 Premium Service Cards Grid (Col-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isActive = activeService === service.id;
              const isHovered = hoveredId === service.id;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveService(service.id)}
                  className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 cursor-pointer text-left select-none ${
                    isActive 
                      ? "border-gold-500/40 bg-zinc-900/60 shadow-lg shadow-gold-500/5" 
                      : "border-white/5 bg-zinc-900/15 hover:border-zinc-800 hover:bg-zinc-900/30"
                  }`}
                >
                  {/* Subtle Background Accent Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-0 transition-opacity duration-300 pointer-events-none ${isActive ? "opacity-100" : ""}`} />
                  
                  {/* Glowing line element on top border */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 to-electric-blue" />
                  )}

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Card Header: Icon & Top Right Arrow */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                          isActive 
                            ? "bg-gold-500 text-dark-bg border-gold-400/30 scale-105" 
                            : isHovered 
                              ? "bg-gold-500/10 text-gold-400 border-gold-500/20" 
                              : "bg-zinc-950/60 text-zinc-400 border-zinc-800"
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className={`w-4 h-4 transition-all duration-300 ${
                          isActive 
                            ? "text-gold-500 translate-x-0.5 -translate-y-0.5 opacity-100" 
                            : isHovered 
                              ? "text-zinc-300 translate-x-0.5 -translate-y-0.5 opacity-100" 
                              : "text-zinc-600 opacity-40"
                        }`} />
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className={`font-display text-base sm:text-lg font-bold transition-colors duration-200 ${isActive ? "text-gold-400" : "text-white"}`}>
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-mono font-medium uppercase tracking-wider mb-2 mt-0.5">
                        {service.subtitle}
                      </p>
                      
                      {/* Short Description */}
                      <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
                        {service.description}
                      </p>
                    </div>

                    {/* Active Checkmark List Indicator (Miniature) */}
                    <div className="mt-4 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                        {isActive 
                          ? (language === "it" ? "VEDI DEMO LIVE" : "VIEW LIVE DEMO")
                          : (language === "it" ? "CARICA DEMO" : "LOAD DEMO")}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-gold-500 scale-125 animate-pulse" : "bg-zinc-700"}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sticky Premium Live Simulation Showcase (Col-5) */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-28">
            <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl p-5 sm:p-7 shadow-2xl shadow-zinc-950/80 overflow-hidden min-h-[480px] sm:min-h-[530px] flex flex-col justify-between">
              
              {/* Dynamic Glow background inside the showcase */}
              {services.map((s) => (
                <div 
                  key={s.id} 
                  className={`absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none blur-3xl transition-opacity duration-500 ${
                    activeService === s.id ? "opacity-15" : "opacity-0"
                  } ${s.glowClass}`} 
                />
              ))}

              {/* Showcase Frame Header */}
              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-zinc-900 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-zinc-500 ml-2">SIMULATOR: {activeService.toUpperCase()}</span>
                </div>
                <span className="text-[9px] font-mono text-gold-500 font-bold bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  {language === "it" ? "Anteprima Live" : "Live Preview"}
                </span>
              </div>

              {/* Dynamic Active Simulation Content Panels */}
              <div className="relative z-10 flex-1 flex flex-col justify-center min-h-[300px]">
                <AnimatePresence mode="wait">
                  
                  {/* 1. WEBSITES SIMULATION */}
                  {activeService === "websites" && (
                    <motion.div
                      key="sim-websites"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 w-full text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Layout className="w-4 h-4 text-gold-500" /> High-End Design Studio
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {language === "it" 
                            ? "Cambia lo schema di colori lussuosi nel prototipo con un solo clic." 
                            : "Swap the luxurious color palette in the prototype with a single click."}
                        </p>
                      </div>

                      {/* Mini Website Frame */}
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 relative overflow-hidden transition-all duration-500 shadow-inner">
                        {/* Background Image of a luxury Swiss alpine resort */}
                        <img 
                          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=webp&auto=format&fit=crop&w=400&q=60" 
                          alt="Luxury Swiss alpine resort" 
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none transition-all duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=webp&auto=format&fit=crop&w=400&q=60";
                          }}
                        />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" />
                        
                        {/* Simulated Mini Site Header */}
                        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 mb-3">
                          <span className={`text-[10px] font-bold tracking-wider transition-colors duration-500 ${
                            webTheme === "gold" ? "text-gold-400" : webTheme === "blue" ? "text-blue-400" : "text-emerald-400"
                          }`}>AURA RESORT</span>
                          <div className="flex gap-1.5 text-[8px] text-zinc-500 font-light font-sans">
                            <span>{language === "it" ? "Suite" : "Suites"}</span><span>•</span>
                            <span>Wellness</span><span>•</span>
                            <span>Grotto</span>
                          </div>
                        </div>

                        {/* Simulated Mini Site Hero */}
                        <div className="space-y-3 py-1">
                          <h5 className="font-display text-sm font-extrabold text-white leading-tight">
                            {language === "it" ? "Sperimenta l'eccellenza" : "Experience alpine"}<br />
                            <span className={`transition-colors duration-500 ${
                              webTheme === "gold" ? "text-gradient-gold" : webTheme === "blue" ? "text-gradient-blue" : "text-emerald-400 font-bold"
                            }`}>
                              {language === "it" ? "e la pace alpina" : "excellence & peace"}
                            </span>
                          </h5>
                          <p className="text-[10px] text-zinc-400 font-light leading-relaxed max-w-[240px]">
                            {language === "it" 
                              ? "Un rifugio di lusso a cinque stelle nel cuore delle Alpi svizzere. Natura pura."
                              : "A five-star luxury retreat in the heart of the Swiss Alps. Pure nature."}
                          </p>

                          {/* CTA Button */}
                          <div className="pt-2">
                            <span className={`inline-block text-[9px] font-bold px-3 py-1.5 rounded-lg text-dark-bg shadow transition-all duration-500 ${
                              webTheme === "gold" ? "bg-gold-500 shadow-gold-500/20" : webTheme === "blue" ? "bg-blue-500 shadow-blue-500/20" : "bg-emerald-500 shadow-emerald-500/20"
                            }`}>
                              {language === "it" ? "Prenota ora" : "Reserve now"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Controls */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                          {language === "it" ? "SCEGLI IL TEMA DI COLORE" : "SELECT COLOR THEME"}
                        </span>
                        <div className="flex gap-2">
                          {[
                            { id: "gold", label: "Classic Gold ✨", activeClass: "bg-gold-500/10 text-gold-400 border-gold-500/30" },
                            { id: "blue", label: "Swiss Alpine Blue ❄️", activeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
                            { id: "emerald", label: "Forest Mint 🌲", activeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setWebTheme(t.id as any)}
                              className={`flex-1 py-2 px-2.5 rounded-lg text-[10px] font-bold border transition-all duration-300 cursor-pointer text-center ${
                                webTheme === t.id 
                                  ? t.activeClass 
                                  : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 2. SEO SIMULATION */}
                  {activeService === "seo" && (
                    <motion.div
                      key="sim-seo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5 w-full text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-400" /> {language === "it" ? "Simulatore di Posizionamento Google" : "Google Ranking Simulator"}
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {language === "it" 
                            ? "Guarda come la tua pagina sale in cima per qualsiasi settore."
                            : "See how your page rises to the top for any industry choice."}
                        </p>
                      </div>

                      {/* Simulated Google Search Box */}
                      <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-4 relative overflow-hidden">
                        {/* Background Image representing SEO keyword ranking */}
                        <img 
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60" 
                          alt="SEO analytics graphs" 
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none transition-all duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fm=webp&auto=format&fit=crop&w=400&q=60";
                          }}
                        />
                        {/* Search Bar */}
                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[10px] text-zinc-300">
                          <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          <span className="font-medium text-zinc-300">
                            {seoKeyword === "paint" 
                              ? (language === "it" ? "Impresa pittura Lugano conveniente" : "Cheap painter Zurich") 
                              : seoKeyword === "dentist" 
                                ? (language === "it" ? "Miglior dentista Bellinzona" : "Best dentist Basel") 
                                : (language === "it" ? "Grotto tipico Locarno menu" : "Good Ticino Grotto Locarno menu")}
                          </span>
                        </div>

                        {/* Search Results */}
                        <div className="space-y-3 pt-1">
                          {/* Rank #1 - PixelForge Site */}
                          <div className="p-3 rounded-lg border border-gold-500/20 bg-gold-500/5 relative overflow-hidden">
                            <span className="absolute top-1 right-2 text-[8px] font-mono font-bold text-gold-500 bg-gold-500/10 border border-gold-500/20 px-1 py-0.5 rounded">
                              {language === "it" ? "POSIZIONE #1 🏆" : "RANK #1 🏆"}
                            </span>
                            <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-mono">
                              https://www.la-tua-nuova-azienda.ch <span className="text-zinc-600">•</span> {language === "it" ? "Sponsorizzato / Organico" : "Sponsored / Organic"}
                            </span>
                            <h5 className="text-xs font-bold text-blue-400 hover:underline mt-0.5">
                              {seoKeyword === "paint" 
                                ? (language === "it" ? "Pittura Rossi Lugano | Qualità svizzera e miglior prezzo" : "Rossi Painting Zurich | Swiss Quality & Best Prices") 
                                : seoKeyword === "dentist" 
                                  ? (language === "it" ? "Studio Dentistico San Gottardo Bellinzona | Il tuo sorriso" : "San Gottardo Dental Clinic Basel | Your Smile In Focus") 
                                  : (language === "it" ? "Grotto della Valle Locarno | Specialità ticinesi autentiche" : "Grotto della Valle Locarno | Authentic Ticino Specialties")}
                            </h5>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 stroke-none" />)}
                              </div>
                              <span className="text-[8px] text-zinc-400">(4.9/5 • 98 {language === "it" ? "voti" : "votes"}) • {language === "it" ? "Artigianato Svizzero" : "Swiss Quality"}</span>
                            </div>
                            <p className="text-[9px] text-zinc-400 mt-1 font-light leading-normal font-sans">
                              {seoKeyword === "paint" 
                                ? (language === "it" ? "Lavori di pittura professionali a Lugano. Tinteggiatura e ristrutturazioni con garanzia di prezzo fisso. Richiedi un preventivo!" : "Professional painting work in Zurich. Painting & renovations with fixed price guarantee. Get your free estimate now!") 
                                : seoKeyword === "dentist" 
                                  ? (language === "it" ? "Trattamenti dentali moderni e indolori nel centro di Bellinzona. Servizio d'urgenza e prenotazione online semplice." : "Modern, painless dental treatments in the center of Basel. Emergency service & easy online booking for new patients.") 
                                  : (language === "it" ? "Tradizionale grotto ticinese con splendida terrazza. Gustate polenta dal paiolo di rame, merlot e formaggio d'alpeggio." : "Traditional Ticino grotto with a beautiful terrace. Enjoy polenta from the copper pot, merlot, and alpine cheese.")}
                            </p>
                          </div>

                          {/* Rank #2 - Outdated competitor */}
                          <div className="p-2.5 opacity-45">
                            <span className="text-[9px] text-zinc-500 font-mono">https://www.concorrente-antiquato.ch</span>
                            <h5 className="text-xs font-bold text-zinc-400 mt-0.5">{language === "it" ? "Pittura Bianchi - Home" : "Schmidt Painter - Home"}</h5>
                            <p className="text-[9px] text-zinc-500 mt-0.5 font-light leading-normal font-sans">
                              {language === "it" ? "Dipingiamo pareti. Contattaci via telefono fisso durante gli orari d'ufficio." : "We paint walls. Contact us via landline during office hours."}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Selection */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                          {language === "it" ? "CAMBIA SETTORE" : "CHANGE SECTOR"}
                        </span>
                        <div className="flex gap-2">
                          {[
                            { id: "paint", label: language === "it" ? "Impresa pittura 🎨" : "Painter 🎨" },
                            { id: "dentist", label: language === "it" ? "Dentista 🦷" : "Dentist 🦷" },
                            { id: "grotto", label: language === "it" ? "Grotto Ticinese 🍷" : "Ticino Grotto 🍷" }
                          ].map((k) => (
                            <button
                              key={k.id}
                              onClick={() => setSeoKeyword(k.id as any)}
                              className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all duration-300 cursor-pointer text-center ${
                                seoKeyword === k.id 
                                  ? "bg-blue-500/15 text-blue-400 border-blue-500/30 shadow-sm" 
                                  : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white"
                              }`}
                            >
                              {k.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 3. GOOGLE BUSINESS & MAPS SIMULATION */}
                  {activeService === "google_business" && (
                    <motion.div
                      key="sim-maps"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 w-full text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-400" /> Google Maps & Reviews
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {language === "it" 
                            ? "Aumenta la valutazione in stelle e genera recensioni dal vivo." 
                            : "Increase the star rating and generate new reviews live."}
                        </p>
                      </div>

                      {/* Simulated Local Pack Card */}
                      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 space-y-4 relative overflow-hidden">
                        {/* Background Image representing local business branding and visual identity */}
                        <img 
                          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?fm=webp&auto=format&fit=crop&w=400&q=60" 
                          alt="Branding and local business identity" 
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none transition-all duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=webp&auto=format&fit=crop&w=400&q=60";
                          }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />
                        
                        <div className="relative z-10 flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">GOOGLE MAPS</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <h5 className="text-sm font-extrabold text-white mt-1">
                              {language === "it" ? "Il tuo Profilo Aziendale Premium 🇨🇭" : "Your Premium Business Profile 🇨🇭"}
                            </h5>
                            
                            {/* Stars rating container */}
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-xs font-mono font-extrabold text-amber-400">5.0</span>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />)}
                              </div>
                              <span className="text-[9px] text-zinc-400">({reviewsCount} {language === "it" ? "Recensioni" : "Reviews"})</span>
                            </div>
                          </div>

                          <span className="text-[8px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded uppercase">
                            {language === "it" ? "Attivo" : "Active"}
                          </span>
                        </div>

                        {/* Recent Reviews (Scroll Box) */}
                        <div className="relative z-10 space-y-2.5 max-h-[110px] overflow-y-auto pr-1 border-t border-zinc-800/60 pt-3">
                          <AnimatePresence>
                            {simulatedReviews.map((rev, index) => (
                              <motion.div
                                key={rev.name + index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] space-y-1 p-2 rounded bg-zinc-950/60 border border-zinc-900"
                              >
                                <div className="flex justify-between items-center text-zinc-400 font-bold">
                                  <span>{rev.name}</span>
                                  <span className="text-[8px] font-light text-zinc-500">{rev.date}</span>
                                </div>
                                <div className="flex gap-0.5 text-amber-400">
                                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 fill-amber-400 stroke-none" />)}
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed italic font-sans">"{rev.text}"</p>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Action Button to generate review */}
                      <button
                        onClick={addSimulatedReview}
                        disabled={isAddingReview}
                        className="w-full py-2.5 px-4 bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-dark-bg font-extrabold text-xs rounded-xl shadow-lg shadow-purple-500/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isAddingReview ? (
                          <>
                            <SpinnerIcon className="w-4 h-4 animate-spin" />
                            {language === "it" ? "Generazione recensione a 5 stelle..." : "Generating 5-star review..."}
                          </>
                        ) : (
                          <>
                            <Star className="w-4 h-4 fill-dark-bg" />
                            {language === "it" ? "Simula nuova recensione a 5 stelle" : "Simulate new 5-star review"}
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}

                  {/* 4. MOBILE OPTIMIZATION SIMULATION */}
                  {activeService === "mobile_opt" && (
                    <motion.div
                      key="sim-mobile"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 w-full text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-emerald-400" /> Mobile-UX Comparison
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {language === "it" 
                            ? "Confronta il vecchio layout con la moderna interfaccia PixelForge." 
                            : "Compare old desktop layouts to our modern mobile thumb-friendly design."}
                        </p>
                      </div>

                      {/* Interactive Selector Toggle */}
                      <div className="flex p-1 rounded-xl bg-zinc-900 border border-zinc-800/80">
                        <button
                          onClick={() => setMobileMode("outdated")}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            mobileMode === "outdated" 
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" 
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {language === "it" ? "Layout obsoleto ❌" : "Outdated Layout ❌"}
                        </button>
                        <button
                          onClick={() => setMobileMode("pixelforge")}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            mobileMode === "pixelforge" 
                              ? "bg-gold-500 text-dark-bg font-extrabold" 
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          PixelForge Mobile ✨
                        </button>
                      </div>

                      {/* Mockup Screen representation based on toggle */}
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 h-44 flex flex-col justify-between relative overflow-hidden shadow-inner">
                        {/* Background Image of a smartphone */}
                        <img 
                          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?fm=webp&auto=format&fit=crop&w=400&q=60" 
                          alt="Mobile Optimization layout" 
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none transition-all duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fm=webp&auto=format&fit=crop&w=400&q=60";
                          }}
                        />
                        <AnimatePresence mode="wait">
                          {mobileMode === "outdated" ? (
                            <motion.div
                              key="out-screen"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="h-full flex flex-col justify-between"
                            >
                              <div className="text-zinc-700 space-y-2 text-center pt-2 scale-90">
                                <div className="h-3 bg-zinc-900 rounded w-1/2 mx-auto" />
                                <p className="text-[6px] text-zinc-500 max-w-[180px] mx-auto font-light font-sans">
                                  {language === "it" 
                                    ? "I clienti devono ingrandire continuamente, scorrere lateralmente e abbandonano frustrati."
                                    : "Customers must zoom constantly, slide the screen side-to-side, and leave frustrated."}
                                </p>
                                <div className="h-5 bg-zinc-900/60 rounded-lg w-2/3 mx-auto flex items-center justify-center text-[7px] text-zinc-600">
                                  {language === "it" ? "Modulo di contatto illeggibile" : "Unreadable contact form"}
                                </div>
                              </div>
                              <div className="text-center py-1 bg-rose-950/20 rounded border border-rose-900/20">
                                <span className="text-[9px] font-mono text-rose-400 font-bold">
                                  {language === "it" ? "Ladezeit: 5.8s | Rimbalzo: 89%" : "Load speed: 5.8s | Bounce rate: 89%"}
                                </span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="pf-screen"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="h-full flex flex-col justify-between"
                            >
                              <div className="space-y-2 text-left font-light">
                                <div className="flex justify-between items-center">
                                  <div className="h-2 bg-gold-500/30 rounded w-1/4" />
                                  <span className="text-[7px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-1 py-0.5 rounded">ONLINE</span>
                                </div>
                                <h5 className="text-[11px] font-extrabold text-white">
                                  {language === "it" ? "Trattamenti Viso su Misura" : "Tailor-made Facial Treatments"}
                                </h5>
                                <p className="text-[9px] text-zinc-400 leading-snug max-w-[200px] font-sans">
                                  {language === "it" 
                                    ? "Tocca sotto per prenotare il tuo appuntamento direttamente dal cellulare in 30 secondi."
                                    : "Tap below to reserve your appointment directly from your mobile in 30 seconds."}
                                </p>
                              </div>

                              {/* Sticky Mobile Bar representation */}
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900">
                                <span className="text-[9px] text-center bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-1.5 rounded-lg border border-zinc-800 select-none">
                                  {language === "it" ? "Chiama 📞" : "Call 📞"}
                                </span>
                                <span className="text-[9px] text-center bg-gold-500 text-dark-bg font-extrabold py-1.5 rounded-lg select-none">
                                  {language === "it" ? "Prenota ⚡" : "Book ⚡"}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* 5. SPEED SIMULATION */}
                  {activeService === "speed" && (
                    <motion.div
                      key="sim-speed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5 w-full text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" /> Google PageSpeed Live-Test
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {language === "it" 
                            ? "Misura e sperimenta l'ottimizzazione della velocità del motore PixelForge." 
                            : "Measure and experience the loading speed of the PixelForge Core engine."}
                        </p>
                      </div>

                      {/* Gauge Indicator */}
                      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Background Image representing ultra-fast code development */}
                        <img 
                          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?fm=webp&auto=format&fit=crop&w=400&q=60" 
                          alt="Web development code speed" 
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none transition-all duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60";
                          }}
                        />
                        
                        {/* Laser scan animation when scanning */}
                        {speedStatus === "scanning" && (
                          <motion.div 
                            className="absolute left-0 right-0 h-[2px] bg-gold-500/50 shadow-lg shadow-gold-500/80 z-20 pointer-events-none"
                            initial={{ top: "0%" }}
                            animate={{ top: "100%" }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                          />
                        )}

                        <div className="relative w-28 h-28 flex items-center justify-center">
                          {/* Circle Track */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="56"
                              cy="56"
                              r="48"
                              className="stroke-zinc-950"
                              strokeWidth="8"
                              fill="transparent"
                            />
                            {/* Animated circle based on score state */}
                            <motion.circle
                              cx="56"
                              cy="56"
                              r="48"
                              className={`${
                                speedScore < 50 
                                  ? "stroke-rose-500" 
                                  : speedScore < 90 
                                    ? "stroke-amber-500" 
                                    : "stroke-emerald-400"
                              }`}
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={301.6}
                              animate={{ strokeDashoffset: 301.6 - (301.6 * speedScore) / 100 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute text-center">
                            <span className={`text-3xl font-mono font-extrabold leading-none ${
                              speedScore < 50 
                                ? "text-rose-500" 
                                : speedScore < 90 
                                  ? "text-amber-500" 
                                  : "text-emerald-400"
                            }`}>
                              {speedScore}
                            </span>
                            <div className="text-[7px] text-zinc-500 uppercase tracking-widest font-bold mt-1">PageSpeed</div>
                          </div>
                        </div>

                        {/* Speed Stats Underneath */}
                        <div className="grid grid-cols-2 gap-4 w-full border-t border-zinc-800/60 pt-4 mt-4 text-[10px]">
                          <div className="text-left font-light font-sans">
                            <span className="text-zinc-500 block uppercase font-mono text-[8px]">FIRST CONTENTFUL PAINT</span>
                            <span className={`font-mono font-extrabold text-xs transition-colors duration-300 ${speedStatus === "completed" ? "text-emerald-400" : "text-zinc-300"}`}>
                              {speedStatus === "completed" 
                                ? `0.38 ${language === "it" ? "Secondi" : "Seconds"}` 
                                : `3.12 ${language === "it" ? "Secondi" : "Seconds"}`}
                            </span>
                          </div>
                          <div className="text-left font-light font-sans">
                            <span className="text-zinc-500 block uppercase font-mono text-[8px]">LARGEST CONTENTFUL PAINT</span>
                            <span className={`font-mono font-extrabold text-xs transition-colors duration-300 ${speedStatus === "completed" ? "text-emerald-400" : "text-zinc-300"}`}>
                              {speedStatus === "completed" 
                                ? `0.42 ${language === "it" ? "Secondi" : "Seconds"}` 
                                : `5.45 ${language === "it" ? "Secondi" : "Seconds"}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive trigger */}
                      <button
                        onClick={runSpeedTest}
                        disabled={speedStatus === "scanning"}
                        className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-dark-bg font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {speedStatus === "scanning" ? (
                          <>
                            <SpinnerIcon className="w-4 h-4 animate-spin" />
                            {language === "it" ? "Analisi Google PageSpeed in corso..." : "Running Google PageSpeed analysis..."}
                          </>
                        ) : speedStatus === "completed" ? (
                          <>
                            <SpinnerIcon className="w-4 h-4" />
                            {language === "it" ? "Ricomincia l'analisi" : "Restart analysis"}
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 fill-dark-bg" />
                            {language === "it" ? "Inizia analisi PageSpeed live" : "Start Live PageSpeed analysis"}
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}

                  {/* 6. AI AUTOMATION SIMULATION */}
                  {activeService === "ai_automation" && (
                    <motion.div
                      key="sim-ai"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 w-full text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-cyan-400" /> {language === "it" ? "Assistente AI Live-Demo" : "AI Assistant Live-Demo"}
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {language === "it" 
                            ? "Simula una chat clienti automatica con prenotazione di appuntamenti." 
                            : "Simulate a fully automated customer inquiry chat and instant booking."}
                        </p>
                      </div>

                      {/* Chat Box Representation */}
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 min-h-[165px] flex flex-col justify-between relative overflow-hidden">
                        {/* Background Image representing AI & Automation */}
                        <img 
                          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?fm=webp&auto=format&fit=crop&w=400&q=60" 
                          alt="AI and automation workspace" 
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none transition-all duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?fm=webp&auto=format&fit=crop&w=400&q=60";
                          }}
                        />
                        
                        {/* Messages Thread */}
                        <div className="space-y-2.5 text-[10px] flex-1 overflow-y-auto max-h-[115px]">
                          {/* Assistant Message 1 */}
                          <div className="flex gap-2 items-start max-w-[250px]">
                            <div className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                              <Bot className="w-3.5 h-3.5" />
                            </div>
                            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 leading-normal font-light font-sans">
                              {language === "it" 
                                ? "Salve! Sono l'assistente virtuale. Desidera riservare un appuntamento per una consulenza gratuita?" 
                                : "Hello! I am your automated assistant. Would you like to reserve a slot for a free consultation?"}
                            </div>
                          </div>

                          {/* Chat progression states */}
                          {aiChatState !== "initial" && (
                            <div className="flex gap-2 items-end justify-end max-w-[250px] ml-auto">
                              <div className="p-2 rounded-lg bg-gold-500 text-dark-bg font-semibold leading-normal text-right">
                                {language === "it" ? `Sì, volentieri. Scelgo le ore ${selectedTime}.` : `Yes, please. I choose ${selectedTime}.`}
                              </div>
                            </div>
                          )}

                          {isAiTyping && (
                            <div className="flex gap-2 items-start max-w-[200px]">
                              <div className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                                <Bot className="w-3.5 h-3.5" />
                              </div>
                              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce" />
                                <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                              </div>
                            </div>
                          )}

                          {aiChatState === "confirmed" && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              className="flex gap-2 items-start max-w-[250px]"
                            >
                              <div className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                                <Bot className="w-3.5 h-3.5" />
                              </div>
                              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 leading-normal font-light font-sans">
                                {language === "it" ? (
                                  <>Ottimo! La tua consulenza per domani alle ore <strong>{selectedTime}</strong> è stata riservata. Ti abbiamo inviato una conferma via SMS. A presto! 🇨🇭</>
                                ) : (
                                  <>Perfect! Your consultation for tomorrow at <strong>{selectedTime}</strong> is successfully booked. We have sent you a confirmation via SMS. See you soon! 🇨🇭</>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Interactive Timing Options in initial state */}
                        {aiChatState === "initial" && (
                          <div className="space-y-1.5 border-t border-zinc-900 pt-2">
                            <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                              {language === "it" ? "SCEGLI L'ORARIO:" : "CHOOSE TIME:"}
                            </span>
                            <div className="flex gap-1.5">
                              {["10:15", "14:00", "16:30"].map((time) => (
                                <button
                                  key={time}
                                  onClick={() => handleSelectTime(time)}
                                  className="flex-1 py-1 px-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-[9px] transition-all cursor-pointer text-center"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Reset chat state button */}
                      {aiChatState !== "initial" && (
                        <button
                          onClick={resetAiChat}
                          className="w-full py-2 px-4 bg-zinc-900 border border-zinc-800 hover:border-gold-500 hover:text-gold-500 text-zinc-400 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                        >
                          {language === "it" ? "Ripristina conversazione 🔄" : "Reset Conversation 🔄"}
                        </button>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Showcase Frame Footer with direct Inquiry button */}
              <div className="relative z-10 pt-4 border-t border-zinc-900/60 mt-5 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" /> {language === "it" ? "Eccellenza Svizzera" : "Swiss Excellence"}
                </span>
                <button
                  onClick={handleScrollToContact}
                  className="group inline-flex items-center gap-1 text-[10px] font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {language === "it" ? "Richiedi info senza impegno" : "Enquire now"}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Trust & Compliance Banner */}
        <div className="mt-16 sm:mt-24 p-6 sm:p-8 rounded-2xl glass-panel border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue shrink-0 border border-electric-blue/15">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-white">
                {language === "it" ? "Conforme alla Legge federale sulla protezione dei dati (LPD)" : "Compliant with Swiss Data Protection Act (DPA)"}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl font-light leading-relaxed font-sans">
                {language === "it" 
                  ? "Tutti i siti web creati da PixelForge includono una dichiarazione sulla privacy e sui cookie completa e conforme alle leggi. L'hosting avviene su server altamente sicuri in Svizzera."
                  : "All websites built by PixelForge include a complete, legally compliant privacy and cookie policy. Hosting is deployed on highly secure servers physically located in Switzerland."}
              </p>
            </div>
          </div>
          <button
            onClick={handleScrollToContact}
            className="group shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 border border-zinc-800 hover:border-gold-500 hover:text-gold-500 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 text-white cursor-pointer"
          >
            {language === "it" ? "Richiedi ora" : "Request now"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
