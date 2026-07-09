import React, { useState } from "react";
import { 
  Zap, Search, Sparkles, Smartphone, HeartHandshake, Award, 
  XCircle, CheckCircle, ArrowRight, ShieldAlert, Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function WhyChooseUs() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  const pillars = language === "it" ? [
    {
      title: "Estrema Velocità",
      description: "Tempi di caricamento fulminei inferiori a 0.4 secondi. Un sito veloce riduce la frequenza di rimbalzo del 50% e massimizza le conversioni.",
      icon: Zap,
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Precisione SEO Svizzera",
      description: "Sviluppato per posizionarsi al top su Google. Analizziamo il volume di ricerca locale nella tua regione per un vantaggio competitivo duraturo.",
      icon: Search,
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Design Premium",
      description: "Estetica ai massimi livelli, ispirata ai moderni design system di Apple e Linear. Il tuo sito web trasmette assoluta eccellenza.",
      icon: Sparkles,
      accent: "text-gold-500 bg-gold-500/10 border-gold-500/20",
    },
    {
      title: "Mobile First",
      description: "Oltre l'85% degli utenti svizzeri effettua ricerche da mobile. I nostri siti offrono un'esperienza smartphone incredibilmente fluida e intuitiva.",
      icon: Smartphone,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Supporto Personale",
      description: "Nessun call center anonimo. Avrai un referente svizzero dedicato e diretto, raggiungibile in qualsiasi momento via WhatsApp o email.",
      icon: HeartHandshake,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Posizionamento Google Maps",
      description: "Ottimizzazione continua affinché la tua attività rimanga ben visibile sia nelle ricerche organiche sia su Google Maps per i nuovi clienti.",
      icon: Award,
      accent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ] : [
    {
      title: "Extreme Speed",
      description: "Blazing-fast load times under 0.4 seconds. A fast website reduces bounce rates by 50% and maximizes your conversions.",
      icon: Zap,
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Swiss SEO Precision",
      description: "Engineered to rank at the absolute top of Google. We analyze local search volumes in your region for a lasting competitive edge.",
      icon: Search,
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Premium Design",
      description: "Aesthetics at the highest level, inspired by the modern design systems of Apple and Linear. Your web presence radiates absolute excellence.",
      icon: Sparkles,
      accent: "text-gold-500 bg-gold-500/10 border-gold-500/20",
    },
    {
      title: "Mobile First",
      description: "Over 85% of Swiss users search via mobile. Our websites offer an unmatched fluid and intuitive smartphone experience.",
      icon: Smartphone,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Personal Support",
      description: "No anonymous call centers. You have a direct Swiss point of contact, reachable easily via WhatsApp or email at any time.",
      icon: HeartHandshake,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Google Maps Ranking",
      description: "Continuous optimization to ensure your business remains highly visible in both organic searches and Google Maps for new clients.",
      icon: Award,
      accent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <section id="perche-sceglierci" className="py-20 sm:py-32 bg-dark-accent relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-gold-500 font-mono text-xs uppercase tracking-widest font-semibold">
            <Award className="w-3.5 h-3.5" />
            {language === "it" ? "LA DIFFERENZA DI PIXELFORGE" : "THE PIXELFORGE DIFFERENCE"}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight text-center">
            {language === "it" ? (
              <>Perché <span className="text-gradient-gold">PixelForge</span>?</>
            ) : (
              <>Why <span className="text-gradient-gold">PixelForge</span>?</>
            )}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
            {language === "it" 
              ? "Non vendiamo semplici siti web predefiniti. Sviluppiamo strumenti digitali d'élite progettati per aumentare i contatti e rafforzare il tuo marchio nel tempo."
              : "We do not sell ordinary template websites. We build elite digital platforms designed to drive leads and strengthen your brand sustainably."}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/80 hover:border-gold-500/30 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/5 hover:-translate-y-1 text-left"
              >
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold-500/10 to-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />

                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl shrink-0 p-3 border ${pillar.accent} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Before vs After Interactive Showcase */}
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle decoration lines */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-gold-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Explanations and Interactive Toggles */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-zinc-400 tracking-wider uppercase">
                  {language === "it" ? "CONFRONTO DIRETTO" : "DIRECT COMPARISON"}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {language === "it" ? (
                    <>Prima vs. Dopo <span className="text-gradient-gold">PixelForge</span></>
                  ) : (
                    <>Before vs. After <span className="text-gradient-gold">PixelForge</span></>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                  {language === "it" 
                    ? "Guarda tu stesso come cambiano i contatti di un'attività locale svizzera quando una vecchia presenza web viene sostituita con la piattaforma altamente ottimizzata di PixelForge."
                    : "See for yourself how inquiries change for a typical Swiss local business when an outdated web presence is replaced with a highly optimized PixelForge platform."}
                </p>
              </div>

              {/* Toggle Controls */}
              <div className="flex p-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 w-full max-w-sm">
                <button
                  onClick={() => setActiveTab("before")}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                    activeTab === "before"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {language === "it" ? "Sito web obsoleto ❌" : "Outdated Website ❌"}
                </button>
                <button
                  onClick={() => setActiveTab("after")}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                    activeTab === "after"
                      ? "bg-gold-500 text-dark-bg font-extrabold shadow-lg shadow-gold-500/10"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  PixelForge ✨
                </button>
              </div>

              {/* Text Bullet List Based on Tab */}
              <div className="space-y-4 min-h-[160px]">
                {activeTab === "before" ? (
                  <motion.div
                    key="before-list"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    {(language === "it" ? [
                      "Nessuno trova la tua attività su Google o Google Maps.",
                      "I pochi visitatori abbandonano subito a causa di caricamenti lenti o scarsa visualizzazione mobile.",
                      "Nessun sistema di prenotazione: i clienti devono fare fatica a chiamare o scrivere email.",
                      "Mancanza di credibilità. Il sito web appare poco professionale rispetto ai concorrenti.",
                      "Nessuna misurazione dei risultati: le spese pubblicitarie vanno in fumo senza efficacia."
                    ] : [
                      "Nobody finds your business on Google or Google Maps.",
                      "The few visitors leave immediately due to slow loading or poor mobile view.",
                      "No booking system: customers must tediously call or write emails.",
                      "Lack of credibility. The web presence looks unprofessional compared to competitors.",
                      "No performance tracking: marketing budgets evaporate with zero results."
                    ]).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-left">
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">{item}</span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="after-list"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    {(language === "it" ? [
                      "Visibilità garantita nella prima pagina di Google e Google Maps.",
                      "Tempi di caricamento record (<0.4 sec) che entusiasmano i visitatori dal primo secondo.",
                      "Integrazione diretta con WhatsApp e calendario prenotazioni per contatti automatici 24/7.",
                      "Estetica straordinaria nello stile Dark-Luxury. Fiducia immediata del cliente.",
                      "Supporto personale svizzero per modifiche rapide e assistenza continua."
                    ] : [
                      "Guaranteed visibility on the first page of Google and Google Maps.",
                      "Record-breaking load speeds (<0.4s) that captivate visitors from the first second.",
                      "Direct WhatsApp and booking calendar integration for automated leads 24/7.",
                      "Outstanding aesthetics in a dark luxury style. Instant customer trust.",
                      "Personal Swiss support for quick updates and continuous backing."
                    ]).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-left">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">{item}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Visual Simulated Output Card */}
            <div className="lg:col-span-7 flex justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "before" ? (
                  <motion.div
                    key="before-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[420px] rounded-2xl bg-zinc-950 border border-zinc-900/80 p-6 flex flex-col space-y-6 relative overflow-hidden text-left"
                  >
                    {/* Simulated outdated browser window */}
                    <div className="flex items-center gap-1.5 pb-3 border-b border-zinc-900">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      <span className="text-[10px] font-mono text-zinc-600 ml-4 truncate">www.sito-obsoleto.ch</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-zinc-600">
                      <div className="flex items-center gap-2 text-rose-500/80 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30 text-[10px] sm:text-xs">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{language === "it" ? "Non sicuro (Senza HTTPS) • Caricamento: 4.8s" : "Not secure (No HTTPS) • Load time: 4.8s"}</span>
                      </div>

                      <div className="h-4 bg-zinc-900 rounded w-1/3" />
                      <div className="space-y-2">
                        <div className="h-3 bg-zinc-900/60 rounded w-full" />
                        <div className="h-3 bg-zinc-900/60 rounded w-5/6" />
                        <div className="h-3 bg-zinc-900/60 rounded w-2/3" />
                      </div>

                      <div className="border border-zinc-900/80 rounded-xl p-4 flex justify-between items-center text-zinc-500 bg-zinc-900/20">
                        <span className="text-[11px] sm:text-xs">{language === "it" ? "Modulo di contatto rotto" : "Contact form broken"}</span>
                        <div className="px-3 py-1 bg-zinc-900 text-[10px] rounded">{language === "it" ? "Invia" : "Send"}</div>
                      </div>

                      <div className="pt-2 text-center">
                        <span className="text-[10px] font-mono text-rose-500/70 bg-rose-950/20 px-2 py-1 rounded">
                          {language === "it" ? "Tasso di conversione: 0.2% (Quasi zero)" : "Conversion rate: 0.2% (Almost zero)"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="after-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[420px] rounded-2xl bg-zinc-900 border border-gold-500/20 shadow-2xl shadow-gold-500/10 p-6 flex flex-col space-y-6 relative overflow-hidden text-left"
                  >
                    {/* Glowing effect inside card */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full radial-glow-gold opacity-30 pointer-events-none blur-2xl" />

                    {/* Simulated browser window */}
                    <div className="flex items-center gap-1.5 pb-3 border-b border-zinc-800">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-mono text-zinc-400 ml-4 truncate flex items-center gap-1 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> https://www.pixforge.ch
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase">{language === "it" ? "AURA BEAUTY SPA LUGANO" : "AURA BEAUTY SPA ZURICH"}</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-400" /> 0.4s
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-display font-extrabold text-white leading-tight">
                        {language === "it" ? "Trattamenti Viso & Wellness a Lugano" : "Facial Treatments & Wellness in Zurich"}
                      </h4>
                      
                      {/* Booking card simulator */}
                      <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-500">
                            <Star className="w-4 h-4 fill-gold-500" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-zinc-100">{language === "it" ? "Massaggio Relax" : "Relaxing Massage"}</div>
                            <div className="text-[10px] text-zinc-400">CHF 120 • 60 {language === "it" ? "Minuti" : "Minutes"}</div>
                          </div>
                        </div>
                        <button className="bg-gold-500 hover:bg-gold-400 text-dark-bg font-extrabold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer select-none">
                          {language === "it" ? "Prenota" : "Book"}
                        </button>
                      </div>

                      {/* Stat summary */}
                      <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-zinc-400 text-xs">
                        <div className="text-center flex-1 border-r border-zinc-800">
                          <div className="font-mono font-extrabold text-gold-500 text-lg">+40%</div>
                          <div className="text-[8px] text-zinc-500 uppercase tracking-wider">{language === "it" ? "Fatturato" : "Revenue"}</div>
                        </div>
                        <div className="text-center flex-1 border-r border-zinc-800">
                          <div className="font-mono font-extrabold text-emerald-400 text-lg">100/100</div>
                          <div className="text-[8px] text-zinc-500 uppercase tracking-wider">SEO Score</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="font-mono font-extrabold text-indigo-400 text-lg">24/7</div>
                          <div className="text-[8px] text-zinc-500 uppercase tracking-wider">{language === "it" ? "Contatti" : "Inquiries"}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
