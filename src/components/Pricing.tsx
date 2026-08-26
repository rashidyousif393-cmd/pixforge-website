import React, { useState } from "react";
import {
  Check, ArrowRight, Zap, Star, ShieldCheck, Sparkles,
  Crown, Gem, Award, Scale, CheckCircle2, ChevronRight, Info, AlertCircle
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTiltEffect } from "../hooks/useTiltEffect";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ScrollReveal from "./ScrollReveal";

interface AddonItem {
  label: string;
  price: number;
  enabled: boolean;
}

export default function Pricing() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"plans" | "table">("plans");
  const [selectedBaseId, setSelectedBaseId] = useState<string>("professional");
  const [basePlanPrice, setBasePlanPrice] = useState<number>(1500);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // Quote Configurator States with multilingual translations
  const [addons, setAddons] = useState<Record<string, AddonItem>>({
    multilingual: { 
      label: language === "it" 
        ? "Multilinguismo (Italiano + Tedesco/Francese/Inglese)" 
        : "Multilingual capability (English + Italian/French/German)", 
      price: 400, 
      enabled: false 
    },
    branding: { 
      label: language === "it" 
        ? "Logo Premium e linee guida per il Corporate Design" 
        : "Premium Logo & Corporate Design guidelines", 
      price: 300, 
      enabled: false 
    },
    advancedSeo: { 
      label: language === "it" 
        ? "SEO avanzato su Google e analisi della concorrenza" 
        : "Advanced Google SEO & competitor analysis", 
      price: 500, 
      enabled: false 
    },
    booking: { 
      label: language === "it" 
        ? "Calendario delle prenotazioni online e sistema di appuntamenti" 
        : "Online booking calendar & appointment system", 
      price: 400, 
      enabled: false 
    },
    copywriting: { 
      label: language === "it" 
        ? "Creazione professionale dei testi (Copywriting professionale)" 
        : "Professional copywriting", 
      price: 300, 
      enabled: false 
    },
  });

  // Sync addons label when language changes
  React.useEffect(() => {
    setAddons({
      multilingual: { 
        label: language === "it" 
          ? "Multilinguismo (Italiano + Tedesco/Francese/Inglese)" 
          : "Multilingual capability (English + Italian/French/German)", 
        price: 400, 
        enabled: addons.multilingual.enabled 
      },
      branding: { 
        label: language === "it" 
          ? "Logo Premium e linee guida per il Corporate Design" 
          : "Premium Logo & Corporate Design guidelines", 
        price: 300, 
        enabled: addons.branding.enabled 
      },
      advancedSeo: { 
        label: language === "it" 
          ? "SEO avanzato su Google e analisi della concorrenza" 
          : "Advanced Google SEO & competitor analysis", 
        price: 500, 
        enabled: addons.advancedSeo.enabled 
      },
      booking: { 
        label: language === "it" 
          ? "Calendario delle prenotazioni online e sistema di appuntamenti" 
          : "Online booking calendar & appointment system", 
        price: 400, 
        enabled: addons.booking.enabled 
      },
      copywriting: { 
        label: language === "it" 
          ? "Creazione professionale dei testi (Copywriting professionale)" 
          : "Professional copywriting", 
        price: 300, 
        enabled: addons.copywriting.enabled 
      },
    });
  }, [language]);

  const pricingPlans = language === "it" ? [
    {
      id: "starter",
      name: "Starter",
      price: "900",
      period: "Sito web",
      description: "Perfetto per artigiani e piccole imprese che desiderano una presenza online elegante e professionale in tempi record.",
      features: [
        "Landing page professionale (1 pagina)",
        "Design esclusivo e reattivo (Mobile-First)",
        "Ottimizzazione della velocità di caricamento",
        "Integrazione con WhatsApp e Google Maps",
        "Modulo di contatto standard",
        "SEO di base e indicizzazione su Google",
        "Fino a 3 cicli di revisione inclusi"
      ]
    },
    {
      id: "professional",
      name: "Professional",
      price: "1'500",
      period: "Sito web",
      description: "La scelta ideale per aziende locali e professionisti che desiderano presentare i propri servizi in modo completo ed efficace.",
      features: [
        "Sito web completo fino a 5 pagine",
        "Design personalizzato ad alto impatto",
        "Presentazione dettagliata dei servizi e del team",
        "Galleria progetti interattiva / Portfolio di riferimento",
        "Ottimizzazione SEO locale approfondita",
        "Integrazione delle recensioni Google",
        "Pannello di amministrazione semplice per modificare i testi",
        "Fino a 5 cicli di revisione inclusi",
        "30 giorni di supporto tecnico post-lancio"
      ],
      isPopular: true
    },
    {
      id: "premium",
      name: "Premium Custom",
      price: "2'100",
      period: "Sito web",
      description: "Design di altissimo livello senza compromessi per marchi e aziende che vogliono imporsi sul mercato con una presenza digitale da premio.",
      features: [
        "Numero illimitato di pagine con design su misura",
        "Animazioni fluide di alto livello (stile Apple/Awwwards)",
        "Sistema di prenotazione online o listini prezzi interattivi",
        "Configuratore personalizzato o calcolatore di preventivi",
        "Strategia SEO avanzata con analisi della concorrenza",
        "Multilinguismo integrato (Italiano + De/Fr/En)",
        "Formazione personale per l'uso del pannello di controllo",
        "Cicli di revisione illimitati",
        "90 giorni di supporto prioritario e manutenzione"
      ]
    }
  ] : [
    {
      id: "starter",
      name: "Starter",
      price: "900",
      period: "Website",
      description: "Perfect for artisans and small businesses who want an elegant, professional online presence in record time.",
      features: [
        "Professional landing page (1 page)",
        "Exclusive & responsive design (Mobile-First)",
        "Page load speed optimization",
        "WhatsApp & Google Maps integration",
        "Standard contact form",
        "SEO foundations & Google indexing",
        "Up to 3 revision rounds included"
      ]
    },
    {
      id: "professional",
      name: "Professional",
      price: "1'500",
      period: "Website",
      description: "The ideal choice for local businesses and service providers who want to present their services comprehensively and convincingly.",
      features: [
        "Complete website with up to 5 pages",
        "Custom high-end design",
        "Detailed presentation of services & team",
        "Interactive project gallery / reference portfolio",
        "Deep local SEO optimization",
        "Google Reviews integration",
        "Easy admin panel for updating your own texts",
        "Up to 5 revision rounds included",
        "30 days of technical support after launch"
      ],
      isPopular: true
    },
    {
      id: "premium",
      name: "Premium Custom",
      price: "2'100",
      period: "Website",
      description: "Uncompromising high-end design for brands and businesses that want to stand out with an award-winning presence.",
      features: [
        "Unlimited pages with bespoke design",
        "Fluid high-end animations (Apple/Awwwards style)",
        "Online booking system or interactive price lists",
        "Custom configurator or quote calculator",
        "Advanced SEO strategy with competitor analysis",
        "Multilingual integrated (English + It/De/Fr)",
        "Personal training for the admin panel",
        "Unlimited revision rounds",
        "90 days of priority support and maintenance"
      ]
    }
  ];

  const handleBaseChange = (planId: string, priceStr: string) => {
    setSelectedBaseId(planId);
    const numericPrice = parseInt(priceStr.replace(/'/g, ""), 10) || 900;
    setBasePlanPrice(numericPrice);
  };

  const toggleAddon = (addonKey: string) => {
    setAddons(prev => ({
      ...prev,
      [addonKey]: {
        ...prev[addonKey],
        enabled: !prev[addonKey].enabled
      }
    }));
  };

  const calculateTotal = () => {
    let total = basePlanPrice;
    (Object.values(addons) as AddonItem[]).forEach(addon => {
      if (addon.enabled) {
        total += addon.price;
      }
    });
    return total;
  };

  const handleApplyQuote = () => {
    const selectedAddonLabels = (Object.values(addons) as AddonItem[])
      .filter(a => a.enabled)
      .map(a => a.label)
      .join(", ");
    
    const formattedAddons = selectedAddonLabels ? ` con moduli aggiuntivi: ${selectedAddonLabels}` : "";
    
    const quoteMessage = language === "it"
      ? `Ciao PixelForge! Ho configurato un preventivo nel calcolatore.\nBase: ${selectedBaseId.toUpperCase()} (CHF ${basePlanPrice})${formattedAddons}.\nInvestimento stimato: CHF ${calculateTotal()}.\n\nDesidero richiedere una consulenza gratuita.`
      : `Hello PixelForge! I have put together a quote in the configurator.\nBase: ${selectedBaseId.toUpperCase()} (CHF ${basePlanPrice})${formattedAddons}.\nEstimated investment: CHF ${calculateTotal()}.\n\nI would like to request a free consultation regarding this.`;

    const contactForm = document.querySelector("#contact-msg-textarea") as HTMLTextAreaElement;
    if (contactForm) {
      contactForm.value = quoteMessage;
      
      const element = document.querySelector("#contatti");
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        contactForm.focus();
        contactForm.classList.add("ring-2", "ring-gold-500");
        setTimeout(() => {
          contactForm.classList.remove("ring-2", "ring-gold-500");
        }, 1500);
      }
    } else {
      const waUrl = `https://wa.me/41798905964?text=${encodeURIComponent(quoteMessage)}`;
      window.open(waUrl, "_blank");
    }
  };

  const handleSelectPlan = (planName: string, planPrice: string) => {
    const form = document.querySelector("#contact-msg-textarea") as HTMLTextAreaElement;
    if (form) {
      form.value = language === "it"
        ? `Ciao PixelForge!\n\nSono molto interessato al pacchetto *${planName}* (da CHF ${planPrice}). Vorrei richiedere una consulenza gratuita e non vincolante per discutere del mio progetto.\n\nCordiali saluti`
        : `Hello PixelForge!\n\nI am highly interested in the *${planName}* package (from CHF ${planPrice}). I would like to request a free, non-binding consultation to discuss my project.\n\nBest regards`;
    }
    const element = document.querySelector("#contatti");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // High-fidelity comparison table data with multilingual support
  const comparisonCategories = language === "it" ? [
    {
      title: "Concezione & Design",
      rows: [
        { name: "Numero di pagine", info: "Numero di pagine create su misura per la tua presenza ottimale.", starter: "1 pagina (Landingpage)", professional: "Fino a 5 pagine", premium: "Illimitato" },
        { name: "Approccio al Design", info: "Come viene concepito il layout visivo per la tua attività.", starter: "Design moderno e reattivo", professional: "Design personalizzato ad alto impatto", premium: "Stile Awwwards su misura" },
        { name: "Cicli di revisione", info: "Numero di revisioni durante il processo di progettazione per garantire la perfezione assoluta.", starter: "3 cicli", professional: "5 cicli", premium: "Illimitati" },
        { name: "Animazioni Premium", info: "Transizioni fluide ed effetti di scorrimento in stile Apple per il massimo coinvolgimento degli utenti.", starter: "Effetti hover standard", professional: "Fluidi & dinamici (GSAP)", premium: "Effetti di altissimo livello senza compromessi" },
      ]
    },
    {
      title: "Google SEO & Visibilità",
      rows: [
        { name: "Ottimizzazione SEO", info: "Ottimizzazione per i motori di ricerca inclusa, per posizionarsi in cima a Google.", starter: "Basi del SEO", professional: "SEO locale approfondito", premium: "SEO d'élite e strategia di concorrenza" },
        { name: "Google Business / Maps", info: "Creazione e ottimizzazione della tua scheda profilo Google Business.", starter: "Integrazione standard", professional: "Ottimizzazione completa", premium: "Configurazione e cura continua" },
        { name: "Ottimizzazione velocità", info: "Caricamento ultraveloce. Programmiamo con codice pulito per prestazioni al top.", starter: "Ottimizzato (Punteggio 90+)", professional: "Eccellente (Punteggio 95+)", premium: "Senza compromessi (Punteggio 99-100)" },
      ]
    },
    {
      title: "Integrazioni & Amministrazione",
      rows: [
        { name: "Conformità LPD svizzera", info: "Piena conformità alla nuova legge svizzera sulla protezione dei dati (LPD) con banner cookie incluso.", starter: "Incluso", professional: "Incluso", premium: "Incluso" },
        { name: "Sistemi di contatto & prenotazione", info: "Moduli interattivi che generano direttamente nuovi contatti qualificato.", starter: "Modulo di contatto standard", professional: "Galleria progetti interattiva", premium: "Prenotazione online o configuratore" },
        { name: "Pannello di amministrazione (CMS)", info: "Piattaforma user-friendly per aggiornare autonomamente testi e immagini in modo semplicissimo.", starter: "No", professional: "Incluso (gestione semplicissima)", premium: "Completo (controllo totale)" },
      ]
    },
    {
      title: "Supporto & Garanzia",
      rows: [
        { name: "Hosting su server svizzeri", info: "Hosting sicuro su server localizzati in Svizzera per massima velocità e riservatezza.", starter: "Compatibile", professional: "Compatibile", premium: "Hosting ad alta velocità ottimizzato" },
        { name: "Supporto Post-Lancio", info: "Supporto tecnico dopo la messa online del tuo nuovo sito web.", starter: "Standard", professional: "30 giorni di supporto tecnico", premium: "90 giorni di supporto prioritario VIP" },
        { name: "Garanzia di supporto", info: "La nostra disponibilità svizzera per qualsiasi domanda o modifica.", starter: "Supporto via e-mail", professional: "Supporto prioritario (Tel/WhatsApp)", premium: "Contatto diretto d'emergenza 24/7" },
      ]
    }
  ] : [
    {
      title: "Conception & Design",
      rows: [
        { name: "Number of pages", info: "Number of custom-designed pages for your optimal web presence.", starter: "1 page (landing page)", professional: "Up to 5 pages", premium: "Unlimited" },
        { name: "Design approach", info: "How the visual layout is conceptualized for your brand.", starter: "Modern Responsive Design", professional: "Custom High-End Design", premium: "Bespoke Awwwards Style" },
        { name: "Revision rounds", info: "Number of revisions during the design process to guarantee absolute perfection.", starter: "3 rounds", professional: "5 rounds", premium: "Unlimited" },
        { name: "Premium animations", info: "Fluid transitions and scroll effects in Apple style for maximum engagement.", starter: "Standard Hover Effects", professional: "Fluid & Dynamic (GSAP)", premium: "Uncompromising High-End Effects" },
      ]
    },
    {
      title: "Google SEO & Visibility",
      rows: [
        { name: "SEO optimization", info: "Included search engine optimization to make you land at the top of Google.", starter: "SEO Foundations", professional: "Deep Local SEO", premium: "Elite SEO & Competitor Strategy" },
        { name: "Google Business / Maps", info: "Creation and optimization of your Google Business Profile entry.", starter: "Standard Integration", professional: "Full Optimization", premium: "Setup & Continuous Maintenance" },
        { name: "Load speed optimization", info: "Ultra-fast loading. We program clean code for maximum green speed score.", starter: "Optimized (Speed Score 90+)", professional: "Excellent (Speed Score 95+)", premium: "Uncompromising (Speed Score 99-100)" },
      ]
    },
    {
      title: "Integrations & Admin",
      rows: [
        { name: "Swiss DPA Compliance", info: "Full compliance with the new Swiss Data Protection Act including a custom cookie banner.", starter: "Included", professional: "Included", premium: "Included" },
        { name: "Contact & booking systems", info: "Interactive forms that directly capture and generate leads.", starter: "Standard contact form", professional: "Interactive Project Gallery", premium: "Online Booking or Configurator" },
        { name: "Admin panel (CMS)", info: "User-friendly platform to easily update your own text and photos anytime.", starter: "No", professional: "Included (Super Easy Updates)", premium: "Comprehensive (Full Control)" },
      ]
    },
    {
      title: "Support & Warranty",
      rows: [
        { name: "Swiss server hosting", info: "Secure hosting on Swiss-based servers for optimal speed, loading times and compliance.", starter: "Compatible", professional: "Compatible", premium: "Optimized High-Speed Hosting" },
        { name: "Post-launch support", info: "Technical support after the successful launch of your new website.", starter: "Standard", professional: "30 Days Technical Support", premium: "90 Days VIP Priority Support" },
        { name: "Support guarantee", info: "Our Swiss availability for any questions or requests.", starter: "Email Support", professional: "Priority Support (Tel/WhatsApp)", premium: "24/7 Emergency Direct Contact" },
      ]
    }
  ];

  // Heading, tab switcher, quote configurator and pricing cards now all reveal via
  // ScrollReveal (IntersectionObserver + CSS) -- see the JSX below. The configurator
  // panel is a large block, so its ref/class is applied directly (useScrollReveal)
  // rather than risking a mismatched closing tag by wrapping it in <ScrollReveal>.
  const configuratorReveal = useScrollReveal<HTMLDivElement>();

  // Restrained desktop-only tilt for each pricing card (fixed at 3 plans, so 3 hooks is safe).
  const tiltRefs = [
    useTiltEffect<HTMLDivElement>({ max: 4, scale: 1.015 }),
    useTiltEffect<HTMLDivElement>({ max: 4, scale: 1.015 }),
    useTiltEffect<HTMLDivElement>({ max: 4, scale: 1.015 }),
  ];

  return (
    <section id="listino" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden w-full">
      {/* Background radial glowing gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 pointer-events-none blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#1e293b]/20 pointer-events-none blur-3xl" />

      {/* Minimal luxury design line element */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Section Heading */}
        <ScrollReveal effect="fade-up" className="text-center max-w-3xl mx-auto section-header space-y-5">
          <div className="kicker justify-center">
            {language === "it" ? "INVESTIMENTO NELL'ECCELLENZA" : "INVESTMENT IN EXCELLENCE"}
          </div>
          <h2 className="section-title">
            {language === "it" ? (
              <>
                Prezzi trasparenti, <br />
                <span className="text-gradient-gold">standard svizzero senza compromessi</span>
              </>
            ) : (
              <>
                Transparent pricing, <br />
                <span className="text-gradient-gold">uncompromising Swiss standard</span>
              </>
            )}
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            {language === "it"
              ? "Nessun costo nascosto. Ogni pacchetto è perfettamente studiato per la crescita delle PMI svizzere più ambiziose."
              : "No hidden fees. Every package is perfectly tailored to the growth of ambitious Swiss SMEs."}
          </p>
        </ScrollReveal>

        {/* View Switcher: Plans vs Comparison Table */}
        <ScrollReveal effect="fade-up" delay={100} className="flex justify-center mb-16">
          <div className="inline-flex p-1 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl">
            <button
              onClick={() => setActiveTab("plans")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === "plans"
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold shadow-md"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{language === "it" ? "Panoramica Pacchetti" : "Package Overview"}</span>
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === "table"
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold shadow-md"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{language === "it" ? "Confronto Dettagliato" : "Detailed Comparison"}</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Tab 1: Pricing Plans Grid */}
        {activeTab === "plans" && (
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24"
            >
              {pricingPlans.map((plan, index) => {
                const isProfessional = plan.id === "professional";
                
                // Set custom details for design luxury look
                const getPlanMetadata = (id: string) => {
                  switch (id) {
                    case "starter":
                      return {
                        subtitle: language === "it" ? "PER ESIGENZE ESSENZIALI" : "FOR ESSENTIAL NEEDS",
                        icon: Zap,
                        iconBg: "bg-zinc-900/60 text-zinc-400 border-zinc-800",
                        glowColor: "rgba(113, 113, 122, 0.03)",
                        badge: null
                      };
                    case "professional":
                      return {
                        subtitle: language === "it" ? "LO SWISS STANDARD" : "THE SWISS STANDARD",
                        icon: Crown,
                        iconBg: "bg-gold-500/10 text-gold-400 border-gold-500/20",
                        glowColor: "rgba(212, 175, 55, 0.12)",
                        badge: language === "it" ? "PIÙ SCELTO • CONSIGLIATO PMI" : "MOST POPULAR • SWISS SME RECOMMENDATION"
                      };
                    case "premium":
                      return {
                        subtitle: language === "it" ? "MISURA SENZA COMPROMESSI" : "UNCOMPROMISING BESPOKE",
                        icon: Gem,
                        iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                        glowColor: "rgba(99, 102, 241, 0.05)",
                        badge: language === "it" ? "PRESTIGIO & PERFEZIONE" : "PRESTIGE & PERFECTION"
                      };
                    default:
                      return {
                        subtitle: "DIGITAL WORKSHOPS",
                        icon: Award,
                        iconBg: "bg-zinc-900 text-zinc-400",
                        glowColor: "rgba(255,255,255,0.01)",
                        badge: null
                      };
                  }
                };

                const meta = getPlanMetadata(plan.id);
                const IconComponent = meta.icon;

                return (
                  <ScrollReveal key={plan.id} effect="fade-up" delay={index * 100} className="h-full">
                  <div
                    ref={tiltRefs[index]}
                    className={`relative h-full rounded-3xl transition-all duration-500 group ${
                      isProfessional ? "scale-103 z-20" : "z-10"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Premium animated conic-gradient ring — recommended plan only, pure CSS + reduced-motion safe */}
                    {isProfessional && (
                      <div className="absolute -inset-[2px] rounded-3xl overflow-hidden pointer-events-none">
                        <div
                          className="absolute -inset-[60%] animate-spin-slow"
                          style={{
                            background: "conic-gradient(from 0deg, transparent 0%, #dfb51c 12%, #f3d443 22%, #dfb51c 32%, transparent 50%, #007aff 68%, #00d2ff 78%, #007aff 88%, transparent 100%)"
                          }}
                        />
                      </div>
                    )}

                    <div
                      className={`relative rounded-3xl flex flex-col justify-between overflow-hidden transition-all duration-500 h-full ${
                        isProfessional
                          ? "shadow-[0_25px_60px_-10px_rgba(212,175,55,0.25)]"
                          : "p-px bg-zinc-800/80 group-hover:bg-zinc-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                      }`}
                    >
                      {/* Glowing card internal gradient background */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-500 group-hover:opacity-75"
                        style={{
                          background: `radial-gradient(circle at 50% 10%, ${meta.glowColor} 0%, transparent 70%)`
                        }}
                      />

                    {/* Main Inner Container */}
                    <div className={`h-full rounded-[22px] p-7 sm:p-9 flex flex-col justify-between relative z-10 ${
                      isProfessional ? "bg-[#0b0b0e]" : "glass-panel"
                    }`}>

                      <div className="space-y-6 text-left">
                        {/* Plan Header */}
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                              {meta.subtitle}
                            </span>
                            
                            {meta.badge && (
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-black tracking-wider uppercase animate-pulse flex items-center gap-1 ${
                                isProfessional 
                                  ? "bg-gold-500 text-dark-bg" 
                                  : "bg-zinc-900 text-indigo-400 border border-indigo-500/20"
                              }`}>
                                {isProfessional && <Star className="w-2.5 h-2.5 fill-dark-bg" />}
                                {meta.badge}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${meta.iconBg}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-display text-2xl font-extrabold text-white tracking-tight">
                                {plan.name}
                              </h3>
                            </div>
                          </div>

                          <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                            {plan.description}
                          </p>
                        </div>

                        {/* Plan Price */}
                        <div className="py-5 border-y border-zinc-900 flex items-baseline gap-2.5">
                          <span className="text-xs font-mono text-zinc-400 uppercase">
                            {language === "it" ? "Una Tantum" : "One-time"}
                          </span>
                          <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
                            CHF {plan.price}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono font-light">
                            {language === "it" ? "IVA incl." : "VAT incl."}
                          </span>
                        </div>

                        {/* Feature Checklist */}
                        <div className="space-y-4">
                          <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                            {language === "it" ? "COSA INCLUDE IL PACCHETTO:" : "WHAT IS INCLUDED:"}
                          </span>
                          <ul className="space-y-3.5">
                            {plan.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-3 group/item">
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 ${
                                  isProfessional 
                                    ? "bg-gold-500/10 text-gold-400 border border-gold-500/20 group-hover/item:bg-gold-500/20" 
                                    : "bg-zinc-900 text-emerald-400 border border-zinc-800"
                                }`}>
                                  <Check className="w-3 h-3 font-extrabold" />
                                </span>
                                <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light group-hover/item:text-white transition-colors duration-200">
                                  {feat}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-8 mt-8 border-t border-zinc-900/60">
                        <button
                          onClick={() => handleSelectPlan(plan.name, plan.price)}
                          className={`w-full py-4 px-4 rounded-xl font-bold text-center text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                            isProfessional
                              ? "bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-dark-bg font-extrabold hover:brightness-115 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] active:scale-98"
                              : "bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 hover:text-white text-zinc-300 border border-zinc-800/80 active:scale-98"
                          }`}
                        >
                          <span>{language === "it" ? `Richiedi ${plan.name}` : `Request ${plan.name}`}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        
                        <div className="text-center mt-3">
                          <span className="text-[9px] font-mono text-zinc-400 tracking-wider">
                            {language === "it" 
                              ? "✓ Primo colloquio gratuito & non vincolante" 
                              : "✓ Free consultation & non-binding offer"}
                          </span>
                        </div>
                      </div>

                      </div>
                    </div>
                  </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Tab 2: Comparison Table */}
          {activeTab === "table" && (
            <div className="mb-24 space-y-4">
              {/* Horizontal scroll notice for mobile */}
              <div className="lg:hidden flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-gold-400 animate-pulse text-center">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {language === "it" 
                    ? "Scorri orizzontalmente per confrontare tutti i pacchetti" 
                    : "Swipe horizontally to compare all packages"}
                </span>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-md shadow-2xl">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  
                  {/* Table Header */}
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-950">
                      <th className="p-6 text-sm font-bold text-zinc-400 w-1/4">
                        {language === "it" ? "Servizi & Caratteristiche" : "Services & Features"}
                      </th>
                      <th className="p-6 text-center w-1/4">
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">STANDARD</span>
                        <span className="text-base font-extrabold text-white block">Starter</span>
                        <span className="text-xs font-mono text-gold-500/80 block mt-1">CHF 900</span>
                      </th>
                      <th className="p-6 text-center w-1/4 bg-gold-500/5 relative border-x border-zinc-800/50">
                        {/* Highlights visual indicator */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-500 to-amber-400" />
                        <span className="text-[9px] font-mono font-black text-gold-500 uppercase tracking-wider block mb-1">
                          {language === "it" ? "CONSIGLIATO PMI" : "SWISS RECOMMENDATION"}
                        </span>
                        <span className="text-base font-black text-white block flex items-center justify-center gap-1">
                          <Crown className="w-4 h-4 text-gold-400 fill-gold-500/10" />
                          Professional
                        </span>
                        <span className="text-xs font-mono text-gold-500 block mt-1 font-extrabold">CHF 1'500</span>
                      </th>
                      <th className="p-6 text-center w-1/4">
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">PRESTIGE</span>
                        <span className="text-base font-extrabold text-white block">Premium Custom</span>
                        <span className="text-xs font-mono text-gold-500/80 block mt-1">CHF 2'100</span>
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {comparisonCategories.map((category, catIdx) => (
                      <React.Fragment key={catIdx}>
                        {/* Section Header Row */}
                        <tr className="bg-zinc-900/30">
                          <td colSpan={4} className="p-4 px-6 text-[10px] font-mono font-black text-gold-400 uppercase tracking-widest border-b border-zinc-900 text-left">
                            {category.title}
                          </td>
                        </tr>

                        {category.rows.map((row, rowIdx) => (
                          <tr 
                            key={rowIdx}
                            className="border-b border-zinc-900/65 hover:bg-zinc-900/15 transition-colors duration-200 group text-left"
                          >
                            {/* Feature description name */}
                            <td className="p-5 px-6 font-medium text-xs sm:text-sm text-zinc-300 relative">
                              <div className="flex items-center gap-2">
                                <span>{row.name}</span>
                                <div className="relative">
                                  <button
                                    onMouseEnter={() => setActiveTooltip(`${catIdx}-${rowIdx}`)}
                                    onMouseLeave={() => setActiveTooltip(null)}
                                    onClick={() => setActiveTooltip(activeTooltip === `${catIdx}-${rowIdx}` ? null : `${catIdx}-${rowIdx}`)}
                                    className="text-zinc-400 hover:text-zinc-300 p-0.5 rounded transition-colors"
                                    aria-label="Show info"
                                  >
                                    <Info className="w-3.5 h-3.5" />
                                  </button>
                                  
                                  {/* Tooltip Popup */}
                                  {activeTooltip === `${catIdx}-${rowIdx}` && (
                                    <div
                                      className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-xs text-zinc-400 font-normal leading-relaxed z-50 backdrop-blur-md"
                                    >
                                      <div className="absolute top-full left-3 w-2.5 h-2.5 bg-zinc-950 border-r border-b border-zinc-800 rotate-45 -mt-1.5" />
                                      {row.info}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Starter column value */}
                            <td className="p-5 text-center text-xs text-zinc-400 font-light">
                              {row.starter === "Incluso" || row.starter === "Inklusive" || row.starter === "Included" ? (
                                <div className="flex items-center justify-center text-emerald-400">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                              ) : row.starter === "Nein" || row.starter === "No" ? (
                                <span className="text-zinc-600">-</span>
                              ) : (
                                <span>{row.starter}</span>
                              )}
                            </td>

                            {/* Professional column value (Highlighted) */}
                            <td className="p-5 text-center text-xs text-zinc-100 font-bold bg-gold-500/5 border-x border-zinc-800/50">
                              {row.professional === "Incluso" || row.professional === "Inklusive" || row.professional === "Included" ? (
                                <div className="flex items-center justify-center text-gold-400">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                              ) : (
                                <span className="text-gold-300 font-medium">{row.professional}</span>
                              )}
                            </td>

                            {/* Premium column value */}
                            <td className="p-5 text-center text-xs text-zinc-400 font-light">
                              {row.premium === "Incluso" || row.premium === "Inklusive" || row.premium === "Included" ? (
                                <div className="flex items-center justify-center text-indigo-400">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                              ) : (
                                <span className="text-indigo-300/90 font-medium">{row.premium}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Persuasive comparison table footer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {language === "it" ? "100% DESIGN REALE" : "100% REAL BESPOKE DESIGN"}
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed mt-1">
                      {language === "it"
                        ? "Nessun modello preconfezionato. Ogni dettaglio è progettato e programmato con precisione pixel-perfect da esperti programmatori svizzeri."
                        : "No cookie-cutter templates. Every single detail is custom-coded with pixel-perfect precision by Swiss craftsmen."}
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900 flex gap-3">
                  <Sparkles className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {language === "it" ? "GARANZIA PREZZO FISSO" : "FIXED PRICE GUARANTEE"}
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed mt-1">
                      {language === "it"
                        ? "Tutti i prezzi sono concordati in modo vincolante. Nessuna brutta sorpresa o costo aggiuntivo non pianificato in fattura."
                        : "All prices are binding and agreed upfront. No nasty surprises or unannounced post-invoicing."}
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900 flex gap-3">
                  <Zap className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {language === "it" ? "MANUTENZIONE CONTINUA" : "CONTINUOUS MAINTENANCE"}
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed mt-1">
                      {language === "it"
                        ? "Sempre aggiornato. Dopo il lancio della pagina, ti accompagniamo nella crescita digitale per garantire il successo continuo."
                        : "Always up-to-date. After the launch, we continue to accompany you to secure your long-term digital success."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Dynamic Interactive Quote Configurator Panel */}
        <div
          ref={configuratorReveal.ref}
          className={`scroll-reveal scroll-reveal--fade-up${configuratorReveal.visible ? " is-visible" : ""} relative rounded-3xl p-[1.5px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 shadow-2xl overflow-hidden w-full`}
        >
          
          <div className="bg-[#0b0b0e] rounded-[22px] p-6 sm:p-10 relative overflow-hidden">
            
            {/* Background absolute subtle element */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gold-500/5 pointer-events-none blur-3xl" />
            
            <div className="absolute top-0 right-0 p-4 bg-gold-500/10 border-l border-b border-gold-500/20 text-gold-400 text-[9px] font-mono tracking-widest rounded-bl-2xl font-bold">
              {language === "it" ? "CALCOLO PREVENTIVO" : "QUOTE CALCULATOR"}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Options Selector Side (Col-7) */}
              <div className="lg:col-span-7 space-y-6 text-left relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-gold-400">
                    <Sparkles className="w-5 h-5 text-gold-400" />
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                      {language === "it" ? "Configuratore di Preventivi Svizzero" : "Swiss Quote Configurator"}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {language === "it"
                      ? "Personalizza il pacchetto desiderato in base alle tue precise esigenze. Aggiungi moduli opzionali e calcola il tuo investimento svizzero in tempo reale."
                      : "Customize your desired package to your exact needs. Add optional modules and calculate your Swiss investment in real-time."}
                  </p>
                </div>

                {/* 1. Base Package selection */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block">
                    {language === "it" ? "1. SELEZIONA IL PACCHETTO DI BASE" : "1. SELECT BASE PACKAGE"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "starter", label: "Starter", price: "900" },
                      { id: "professional", label: "Professional", price: "1500" },
                      { id: "premium", label: "Premium Custom", price: "2100" },
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => handleBaseChange(pkg.id, pkg.price)}
                        className={`p-3.5 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                          selectedBaseId === pkg.id
                            ? "bg-gold-500/10 border-gold-500 text-gold-400 shadow-lg shadow-gold-500/5 scale-[1.02] font-bold"
                            : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                        }`}
                      >
                        <div className="text-xs font-extrabold uppercase tracking-wide">{pkg.label}</div>
                        <div className="text-[11px] font-mono mt-1 font-medium">ab CHF {pkg.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Addons toggles */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block">
                    {language === "it" ? "2. MODULI PREMIUM OPZIONALI" : "2. OPTIONAL PREMIUM MODULES"}
                  </span>
                  <div className="space-y-2.5">
                    {(Object.entries(addons) as [string, AddonItem][]).map(([key, addon]) => (
                      <div
                        key={key}
                        onClick={() => toggleAddon(key)}
                        className={`p-3 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                          addon.enabled
                            ? "bg-gold-500/5 border-gold-500/40 shadow-sm"
                            : "bg-zinc-950/20 border-zinc-900/60 hover:border-zinc-800 hover:bg-zinc-950/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border transition-all ${
                            addon.enabled 
                              ? "bg-gold-500 border-gold-500 text-dark-bg" 
                              : "border-zinc-800 bg-zinc-900"
                          }`}>
                            {addon.enabled && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm text-zinc-300 font-light">
                            {addon.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-gold-400 shrink-0 ml-4">
                          + CHF {addon.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Preview Side (Col-5) */}
              <div className="lg:col-span-5 h-full flex flex-col justify-center relative z-10 w-full">
                <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-900/80 flex flex-col justify-between h-full space-y-6 shadow-2xl">
                  <div className="text-center space-y-2">
                    <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase block">
                      {language === "it" ? "STIMA DELL'INVESTIMENTO" : "ESTIMATED INVESTMENT"}
                    </span>
                    
                    {/* Dynamic Pricing display */}
                    <div className="inline-flex items-baseline gap-1.5 py-1">
                      <span className="text-xs font-bold text-zinc-400 font-mono">CHF</span>
                      <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
                        {calculateTotal().toLocaleString("it-CH")}.00
                      </span>
                    </div>

                    <p className="text-[10px] text-zinc-400 leading-normal font-light">
                      {language === "it"
                        ? "Stima dell'investimento non vincolante, inclusa la configurazione dell'hosting, codice pulito e messa in produzione. Nessun abbonamento forzato."
                        : "Non-binding cost estimate including hosting configuration, clean source code, and deployment. No forced subscriptions."}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-left">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>{language === "it" ? "Pacchetto base" : "Base package"} ({selectedBaseId.toUpperCase()})</span>
                      <span className="font-mono text-zinc-300">CHF {basePlanPrice}</span>
                    </div>
                    
                    {(Object.values(addons) as AddonItem[]).filter(a => a.enabled).map((addon, index) => (
                      <div key={index} className="flex justify-between text-xs text-zinc-400">
                        <span className="truncate max-w-[190px]">{addon.label}</span>
                        <span className="font-mono text-zinc-300">+ CHF {addon.price}</span>
                      </div>
                    ))}

                    <div className="h-px bg-zinc-900 my-2" />

                    <div className="flex justify-between text-xs font-bold text-gold-500">
                      <span>{language === "it" ? "Supporto svizzero personale" : "Personal Swiss Support"}</span>
                      <span className="text-[9px] uppercase font-mono tracking-wider bg-gold-500/10 text-gold-400 px-2 py-0.5 rounded border border-gold-500/15">
                        {language === "it" ? "INCLUSO" : "INCLUDED"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplyQuote}
                    className="w-full py-4 px-4 bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-xl shadow-gold-500/10 hover:brightness-110 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{language === "it" ? "Riporta nel modulo di contatto" : "Apply to Contact Form"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
