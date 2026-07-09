import React, { useState } from "react";
import { AlertTriangle, TrendingDown, EyeOff, Check, RefreshCw, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function PainPoints() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const { language, t } = useLanguage();

  const questions = language === "it" ? [
    {
      id: 1,
      text: "La tua azienda appare tra i primi 3 risultati su Google Maps quando qualcuno nella tua zona cerca il tuo servizio?",
      icon: "Search"
    },
    {
      id: 2,
      text: "Un cliente può consultare il tuo listino prezzi, il menu o gli orari in meno di 2 secondi sul proprio smartphone?",
      icon: "Smartphone"
    },
    {
      id: 3,
      text: "Disponi di un sistema automatizzato per acquisire nuovi clienti o richieste di appuntamento mentre stai lavorando?",
      icon: "Calendar"
    }
  ] : [
    {
      id: 1,
      text: "Does your business appear in the top 3 results on Google Maps when someone in your area searches for your service?",
      icon: "Search"
    },
    {
      id: 2,
      text: "Can a client check your price list, menu, or opening hours in less than 2 seconds on their smartphone?",
      icon: "Smartphone"
    },
    {
      id: 3,
      text: "Do you have an automated system to acquire new clients or booking requests while you are working?",
      icon: "Calendar"
    }
  ];

  const handleAnswer = (qId: number, val: boolean) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
    
    if (Object.keys({ ...answers, [qId]: val }).length === questions.length) {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const resetTest = () => {
    setAnswers({});
    setShowResult(false);
  };

  const yesCount = Object.values(answers).filter(Boolean).length;
  const noCount = questions.length - yesCount;

  const getFeedback = () => {
    if (language === "it") {
      if (noCount === 3) {
        return {
          score: "Invisibile 🔴",
          percentage: "90% di potenziali clienti persi",
          desc: "I clienti nella tua zona che cercano su Google i tuoi servizi finiscono direttamente dai tuoi concorrenti. Ogni giorno perdi opportunità preziose.",
          recommendation: "Ti consigliamo il nostro pacchetto **Starter** o **Professional** con indicizzazione urgente su Google Maps."
        };
      } else if (noCount >= 1) {
        return {
          score: "Rischio Medio 🟡",
          percentage: "50% di potenziali clienti persi",
          desc: "Hai una presenza online minima, ma non è ottimizzata. Molti potenziali clienti trovano il tuo profilo, ma abbandonano perché mancano informazioni chiare o una prenotazione diretta.",
          recommendation: "Il pacchetto **Professional** è l'ideale per colmare queste lacune e convertire i visitatori in contatti reali."
        };
      } else {
        return {
          score: "Stato Eccellente 🟢",
          percentage: "Presenza Ottimizzata",
          desc: "La tua presenza online ha solide fondamenta! Puoi massimizzare ulteriormente l'esperienza cliente e distinguerti con un design d'élite esclusivo.",
          recommendation: "Il pacchetto **Premium Custom** ti permetterà di superare tutti i concorrenti svizzeri con animazioni ed esperienze utente di altissimo livello."
        };
      }
    } else {
      if (noCount === 3) {
        return {
          score: "Invisible 🔴",
          percentage: "90% potential customer loss",
          desc: "Customers in your area searching Google for your services go straight to your competitors. Valuable opportunities are lost every day.",
          recommendation: "We recommend our **Starter** or **Professional** package with urgent Google Maps indexation."
        };
      } else if (noCount >= 1) {
        return {
          score: "Medium Risk 🟡",
          percentage: "50% potential customer loss",
          desc: "You have a minimal online presence, but it is not optimized. Many prospects find your profile but leave because they lack clear info or direct booking.",
          recommendation: "The **Professional** package is ideal to fill these gaps and convert visitors into real inquiries."
        };
      } else {
        return {
          score: "Excellent Status 🟢",
          percentage: "Optimized Presence",
          desc: "Your online presence has a solid foundation! You can further maximize the customer experience and stand out with an exclusive elite design.",
          recommendation: "The **Premium Custom** package will allow you to outperform Swiss competitors with world-class animations and experiences."
        };
      }
    }
  };

  const feedback = getFeedback();

  return (
    <section id="diagnostica" className="py-20 sm:py-24 lg:py-32 bg-dark-accent relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full radial-glow-gold opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-12 w-[300px] h-[300px] rounded-full radial-glow-blue opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and context (Col-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-500 bg-gold-950/20 border border-gold-900/40 rounded-full px-3.5 py-1 text-xs font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              {language === "it" ? "ANALISI DI MERCATO SVIZZERA 🇨🇭" : "SWISS MARKET ANALYSIS 🇨🇭"}
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === "it" ? (
                <>
                  La tua attività è ancora <br className="hidden sm:inline" />
                  <span className="text-gradient-gold">senza un sito professionale?</span>
                </>
              ) : (
                <>
                  Is your business still <br className="hidden sm:inline" />
                  <span className="text-gradient-gold">without a professional website?</span>
                </>
              )}
            </h2>

            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              {language === "it" 
                ? "Oggi i clienti cercano tutto su Google. Se la tua attività non ha un sito web professionale, perdi ogni giorno visibilità, fiducia e clienti preziosi nella tua regione svizzera."
                : "Today, customers search everything on Google. If your business lacks a professional website, you lose visibility, trust, and premium local customers in Switzerland every single day."}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 mt-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">
                    {language === "it" ? "Perdita di clienti locali" : "Loss of local clients"}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light">
                    {language === "it" 
                      ? "Il 97% delle persone cerca servizi locali online prima di decidere a quale professionista affidarsi."
                      : "97% of people search online for local services before making a decision on who to hire."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 mt-1">
                  <EyeOff className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">
                    {language === "it" ? "Invisibilità su Google" : "Invisibility on Google"}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light">
                    {language === "it" 
                      ? "Senza un sito web strutturato e ottimizzato SEO, Google non mostrerà la tua attività tra i risultati locali."
                      : "Without a structured and SEO-optimized website, Google won't display your business in local results."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Test de visibilità (Col-6) */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-gold-500/10 text-gold-500 text-[10px] font-mono tracking-widest rounded-bl-xl border-l border-b border-gold-500/15">
                {language === "it" ? "INTERATTIVO" : "INTERACTIVE"}
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                {language === "it" ? "Test di Visibilità Digitale" : "Digital Visibility Test"}
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                {language === "it" 
                  ? "Analizza lo stato della tua presenza online in 3 semplici passaggi."
                  : "Analyze the status of your online presence in 3 simple steps."}
              </p>

              <AnimatePresence mode="wait">
                {!showResult ? (
                  <div className="space-y-6">
                    {questions.map((q, idx) => {
                      const isCurrent = Object.keys(answers).length === idx;
                      const isAnswered = answers[q.id] !== undefined;

                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-xl transition-all duration-300 ${
                            isCurrent
                              ? "bg-zinc-900/80 border border-gold-500/30 shadow-md shadow-gold-500/5 scale-102"
                              : isAnswered
                              ? "bg-zinc-950/40 border border-zinc-900 opacity-60"
                              : "bg-zinc-950/10 border border-transparent opacity-30 pointer-events-none"
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <span className="font-mono text-xs font-bold text-gold-500 shrink-0 bg-gold-950/30 px-2 py-0.5 rounded border border-gold-900/20">
                              0{q.id}
                            </span>
                            <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed flex-1">
                              {q.text}
                            </p>
                          </div>

                          {isCurrent && (
                            <div className="flex justify-end gap-3 mt-4">
                              <button
                                onClick={() => handleAnswer(q.id, false)}
                                className="px-4 py-1.5 bg-zinc-950 hover:bg-zinc-900 text-xs font-semibold text-red-400 hover:text-red-300 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                              >
                                {language === "it" ? "No, non credo" : "No, I don't think so"}
                              </button>
                              <button
                                onClick={() => handleAnswer(q.id, true)}
                                className="px-4 py-1.5 bg-gold-500 hover:bg-gold-400 text-xs font-bold text-dark-bg rounded-lg transition-colors cursor-pointer"
                              >
                                {language === "it" ? "Sì, assolutamente" : "Yes, absolutely"}
                              </button>
                            </div>
                          )}

                          {isAnswered && (
                            <div className="flex justify-end gap-2 mt-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                answers[q.id] 
                                  ? "text-emerald-400 bg-emerald-950/20 border border-emerald-900/30" 
                                  : "text-red-400 bg-red-950/20 border border-red-900/30"
                              }`}>
                                {answers[q.id] ? (language === "it" ? "Sì" : "Yes") : "No"}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-4"
                  >
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-gold-500/20 mb-2">
                      <TrendingDown className="w-8 h-8 text-gold-500" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                        {language === "it" ? "STATO ATTUALE" : "CURRENT STATUS"}
                      </span>
                      <h4 className="text-2xl font-display font-extrabold text-white mt-1">
                        {feedback.score}
                      </h4>
                      <p className="text-xs font-semibold text-red-400 mt-0.5 font-mono">
                        {feedback.percentage}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-left">
                      <p className="text-xs text-zinc-400 leading-relaxed mb-3 font-light">
                        {feedback.desc}
                      </p>
                      <div className="pt-2.5 border-t border-zinc-900 flex items-start gap-2 text-xs">
                        <Check className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span className="text-zinc-300 font-light" dangerouslySetInnerHTML={{ __html: feedback.recommendation }} />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={resetTest}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 rounded-xl transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        {language === "it" ? "Ripeti il test" : "Repeat test"}
                      </button>
                      <a
                        href={`https://wa.me/41798905964?text=Ciao%20PixelForge!%20Ho%20fatto%20il%20test%20di%20visibilita%20e%20il%20mio%20risultato%20e%20%22${encodeURIComponent(feedback.score)}%22.%20Vorrei%20sapere%20come%20posso%20migliorare.`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gold-500 hover:bg-gold-400 text-dark-bg font-extrabold rounded-xl transition-all shadow-lg shadow-gold-500/10 text-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {language === "it" ? "Contatta l'esperto" : "Contact expert"}
                      </a>
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
