import React from "react";
import { Compass, Paintbrush, Code2, Rocket, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Process() {
  const { language } = useLanguage();

  const steps = language === "it" ? [
    {
      number: "01",
      title: "Discovery & Strategia",
      subtitle: "Comprendere il mercato",
      description:
        "Analizziamo la tua posizione nel mercato locale, studiamo i concorrenti chiave e creiamo una strategia SEO su misura per attirare i tuoi clienti ideali.",
      icon: Compass,
      color: "from-amber-500 to-gold-500",
      details: ["Analisi parole chiave", "Studio concorrenza", "Mappa di conversione"],
    },
    {
      number: "02",
      title: "Premium UX/UI Design",
      subtitle: "Identità visiva esclusiva",
      description:
        "Progettiamo un'interfaccia utente personalizzata e lussuosa. Nessun template predefinito: il tuo design sarà unico, in linea con lo stile e l'eccellenza svizzera.",
      icon: Paintbrush,
      color: "from-gold-500 to-electric-blue",
      details: ["Layout esclusivi", "Ottimizzazione mobile", "User Experience fluida"],
    },
    {
      number: "03",
      title: "Codice High-Performance",
      subtitle: "Pulito e reattivo",
      description:
        "Scriviamo codice pulito di ultima generazione con React, Vite e Tailwind CSS. Il risultato: performance eccellenti, animazioni fluide e caricamento sotto i 0.4 secondi.",
      icon: Code2,
      color: "from-electric-blue to-purple-500",
      details: ["Motore React & Vite", "100/100 PageSpeed", "Conformità LPD svizzera"],
    },
    {
      number: "04",
      title: "Launch & Ottimizzazione",
      subtitle: "Massima visibilità",
      description:
        "Pubblichiamo il tuo sito su server svizzeri ultra-veloci, configuriamo Google Search Console e ottimizziamo il profilo Google per generare traffico organico immediato.",
      icon: Rocket,
      color: "from-purple-500 to-emerald-500",
      details: ["Hosting svizzero sicuro", "Indicizzazione immediata", "Supporto prioritario post-launch"],
    },
  ] : [
    {
      number: "01",
      title: "Discovery & Strategy",
      subtitle: "Understanding the market",
      description:
        "We analyze your local market position, study key competitors, and build a tailored SEO strategy to reach your ideal clients.",
      icon: Compass,
      color: "from-amber-500 to-gold-500",
      details: ["Keyword analysis", "Competitor research", "Conversion mapping"],
    },
    {
      number: "02",
      title: "Premium UX/UI Design",
      subtitle: "Exclusive visual identity",
      description:
        "We design a customized, luxurious user interface. No standard templates: your design will be unique, reflecting Swiss precision and style.",
      icon: Paintbrush,
      color: "from-gold-500 to-electric-blue",
      details: ["Exclusive layouts", "Mobile optimization", "Fluid user experience"],
    },
    {
      number: "03",
      title: "High-Performance Code",
      subtitle: "Clean and reactive",
      description:
        "We write clean, next-generation code using React, Vite, and Tailwind CSS. The result: outstanding performance, fluid animations, and load times under 0.4s.",
      icon: Code2,
      color: "from-electric-blue to-purple-500",
      details: ["React & Vite engine", "100/100 PageSpeed", "Swiss DPA compliance"],
    },
    {
      number: "04",
      title: "Launch & Optimization",
      subtitle: "Maximum visibility",
      description:
        "We deploy your website on ultra-fast Swiss servers, configure Google Search Console, and optimize your Google profile for instant organic traffic.",
      icon: Rocket,
      color: "from-purple-500 to-emerald-500",
      details: ["Secure Swiss hosting", "Instant indexing", "Priority post-launch support"],
    },
  ];

  return (
    <section id="processo" className="py-20 sm:py-32 bg-dark-bg relative overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full radial-glow-blue opacity-5 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-gold-500 font-mono text-xs uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            {language === "it" ? "IL NOSTRO METODO" : "OUR METHOD"}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            {language === "it" ? (
              <>Dal concetto al capolavoro in <span className="text-gradient-gold">4 passaggi</span></>
            ) : (
              <>From concept to masterpiece in <span className="text-gradient-gold">4 steps</span></>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light"
          >
            {language === "it"
              ? "Un processo trasparente e preciso per garantire la massima qualità visiva e risultati commerciali eccezionali."
              : "A transparent, meticulously planned process to guarantee supreme visual quality and first-class business results."}
          </motion.p>
        </div>

        {/* Process steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="group relative rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/5 hover:-translate-y-1.5 text-left"
              >
                {/* Visual number tag */}
                <div className="absolute top-6 right-6 font-mono text-4xl font-extrabold text-zinc-800/60 group-hover:text-gold-500/20 transition-colors duration-500">
                  {step.number}
                </div>

                <div className="space-y-4">
                  {/* Step icon with gradient background */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-0.5 flex items-center justify-center shadow-lg shadow-black/20`}>
                    <div className="w-full h-full rounded-[10px] bg-dark-bg flex items-center justify-center text-white">
                      <IconComponent className="w-5 h-5 text-zinc-100 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Titles */}
                  <div>
                    <span className="text-xs font-mono font-semibold tracking-wider text-gold-500 uppercase block mb-1">
                      {step.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Micro bullet details */}
                <div className="mt-6 pt-4 border-t border-zinc-850/60 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                      <ArrowRight className="w-3 h-3 text-gold-500 shrink-0" />
                      <span className="font-light">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
