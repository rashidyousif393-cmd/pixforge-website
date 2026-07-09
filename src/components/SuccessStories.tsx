import React from "react";
import { motion } from "motion/react";
import { BookOpen, Clock, ArrowRight, CheckCircle, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function SuccessStories() {
  const { language } = useLanguage();

  const articles = language === "it" ? [
    {
      id: "salon-bookings",
      category: "Saloni di Bellezza & Spa",
      title: "Come un salone di bellezza ha aumentato le prenotazioni online del 40%",
      readTime: "Lettura: 4 min",
      date: "Giugno 2026",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?fm=webp&auto=format&fit=crop&w=600&q=70",
      caption: "Sito web & sistema di prenotazione automatico per Aura Beauty Spa",
      paragraphs: [
        "Nel settore della bellezza e del benessere, la facilità di prenotazione è il fattore chiave per il successo. Molti saloni si affidano ancora esclusivamente alle telefonate o a messaggi improvvisati su WhatsApp. Questo costringe i titolari a interrompere i trattamenti per rispondere al telefono o a gestire faticosamente i dettagli dei clienti su carta fuori dall'orario di lavoro.",
        "Con una presenza web ottimizzata da PixelForge e integrata con un calendario di prenotazione online, l'Aura Beauty Spa ha registrato un aumento del 40% delle prenotazioni totali in soli 90 giorni. Più della metà degli appuntamenti viene ormai prenotata tra le 20:00 e le 08:00, ovvero a negozio chiuso, a dimostrazione di quanto sia vitale l'accessibilità digitale continua."
      ],
      ctaText: "Richiedi demo per saloni di bellezza",
      anchor: "#contatti"
    },
    {
      id: "dental-trust",
      category: "Dentisti & Studi Medici",
      title: "Perché un moderno studio dentistico ha bisogno di trasmettere fiducia online",
      readTime: "Lettura: 5 min",
      date: "Maggio 2026",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=webp&auto=format&fit=crop&w=600&q=70",
      caption: "Design rassicurante e chiaro per lo Studio Dentistico San Gottardo",
      paragraphs: [
        "La scelta di un medico o di un dentista si basa interamente sulla fiducia. Quando un potenziale paziente cerca uno studio nella propria regione, il motore di ricerca è il primo punto di contatto. Un sito web obsoleto, privo di certificati di sicurezza o non ottimizzato per gli smartphone, trasmette poca cura e spinge i pazienti verso la concorrenza.",
        "Il sito di uno studio medico deve unire competenza medica ed empatia visiva. Attraverso percorsi di navigazione fluidi, PixelForge ha creato per lo Studio San Gottardo un'architettura informativa chiarissima. Il risultato: 30% in meno di chiamate ripetitive alla reception e un flusso costante di nuovi pazienti fidelizzati."
      ],
      ctaText: "Richiedi demo per studi medici",
      anchor: "#contatti"
    },
    {
      id: "restaurant-seo",
      category: "Gastronomia & Hotel",
      title: "Come un ristorante attira nuovi ospiti grazie alla SEO locale su Google",
      readTime: "Lettura: 4 min",
      date: "Aprile 2026",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=webp&auto=format&fit=crop&w=600&q=70",
      caption: "Menu digitale e SEO locale per il Grotto della Valle",
      paragraphs: [
        "In Svizzera, oltre l'85% delle ricerche di ristoranti avviene all'ultimo minuto da smartphone. Gli utenti vogliono sapere tre cose: dove si trova il locale, cosa offre il menu e se ci sono tavoli liberi. Se il menu è solo una foto sfuocata o un pesante file PDF da scaricare, gli ospiti abbandonano immediatamente la ricerca.",
        "La strategia vincente di PixelForge per il Grotto della Valle si è concentrata sull'ottimizzazione SEO locale (Google Maps) combinata con un menu digitale interattivo e veloce. Con un pulsante di prenotazione immediato, gli ospiti possono riservare un tavolo in soli due clic. Il Grotto è ora quasi sempre esaurito nei fine settimana."
      ],
      ctaText: "Richiedi demo per ristoranti",
      anchor: "#contatti"
    }
  ] : [
    {
      id: "salon-bookings",
      category: "Beauty Salons & Spas",
      title: "How a beauty salon skyrocketed its online bookings by 40%",
      readTime: "4 min read",
      date: "June 2026",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?fm=webp&auto=format&fit=crop&w=600&q=70",
      caption: "Website & automatic booking system for Aura Beauty Spa",
      paragraphs: [
        "In the beauty and wellness industry, the ease of booking is the decisive success factor. Many salons still rely exclusively on phone calls or spontaneous WhatsApp messages. This forces owners to interrupt active treatments to answer calls, or painstakingly manage appointment details on paper outside of working hours.",
        "With a web presence optimized by PixelForge combined with an online booking calendar, Aura Spa recorded a 40% increase in total bookings in just 90 days. More than half of all appointments are now booked between 8:00 PM and 8:00 AM – when the physical shop is closed. This proves how vital continuous digital accessibility is."
      ],
      ctaText: "Request beauty salon demo",
      anchor: "#contatti"
    },
    {
      id: "dental-trust",
      category: "Dentists & Clinics",
      title: "Why a modern dental clinic needs online trust to win patients",
      readTime: "5 min read",
      date: "May 2026",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=webp&auto=format&fit=crop&w=600&q=70",
      caption: "Reassuring & clear web design for San Gottardo Dental Clinic",
      paragraphs: [
        "Choosing a doctor or dentist is based entirely on trust. When a potential patient searches for a practice in the region, search engines are the first point of contact. An outdated website without security certificates, which is not optimized for smartphones, conveys unprofessionalism and drives patients directly to competitors.",
        "A first-class practice website must combine medical competence with empathetic design. Through optimized navigation paths, PixelForge created a clear information architecture for the San Gottardo clinic. The result: 30% fewer administrative calls for repetitive questions and a steady stream of new, loyal patients."
      ],
      ctaText: "Request clinic demo",
      anchor: "#contatti"
    },
    {
      id: "restaurant-seo",
      category: "Gastronomy & Hotels",
      title: "How a restaurant wins new guests via local Google SEO",
      readTime: "4 min read",
      date: "April 2026",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=webp&auto=format&fit=crop&w=600&q=70",
      caption: "Digital menu and local SEO for Grotto della Valle",
      paragraphs: [
        "In Switzerland, over 85% of restaurant searches are made on short notice via smartphones. Users want to know three things: where the restaurant is located, what the menu offers, and if there are tables available. If the menu is just an unreadable photo or a heavy PDF to download, potential guests leave immediately.",
        "PixelForge's winning strategy for Grotto della Valle focused on local search engine optimization (Google Maps) combined with an interactive, lightning-fast digital menu. With an instant booking button, guests can reserve a table in just two clicks. The Grotto is now almost fully booked every weekend and attracts many new customers."
      ],
      ctaText: "Request restaurant demo",
      anchor: "#contatti"
    }
  ];

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
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

  return (
    <section id="storie-successo" className="py-20 sm:py-32 bg-[#030303] relative overflow-hidden w-full">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-[-10%] w-[600px] h-[600px] rounded-full radial-glow-blue opacity-10 pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/3 right-[-10%] w-[600px] h-[600px] rounded-full radial-glow-gold opacity-10 pointer-events-none blur-3xl" />
      
      {/* Editorial layout divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-gold-500 font-mono text-xs uppercase tracking-widest font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            {language === "it" ? "STORIE DI SUCCESSO" : "SUCCESS STORIES & STRATEGIES"}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === "it" ? (
              <>
                Strategie digitali per le <br className="hidden sm:inline" />
                <span className="text-gradient-gold">attività in Svizzera</span>
              </>
            ) : (
              <>
                Digital strategies for <br className="hidden sm:inline" />
                <span className="text-gradient-gold">Swiss Businesses</span>
              </>
            )}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
            {language === "it"
              ? "Scopri come una presenza web studiata fin nei minimi dettagli può rivoluzionare l'acquisizione di nuovi clienti e aumentare il fatturato in modo misurabile."
              : "Discover how a web presence thought out to the smallest detail can revolutionize customer acquisition and measurably increase revenue."}
          </p>
        </div>

        {/* Editorial Articles Stack */}
        <div className="space-y-28">
          {articles.map((article, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center text-left"
              >
                {/* Visual / Image Side */}
                <div className={`col-span-1 lg:col-span-6 relative ${isEven ? "lg:order-1" : "lg:order-2"} group w-full`}>
                  
                  {/* Glowing background container frame */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-500/20 to-electric-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
                  
                  <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-950 aspect-[16/10] shadow-2xl w-full">
                    
                    {/* Main Image */}
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.03] transition-transform duration-700 brightness-90 group-hover:brightness-95"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=600&q=70";
                      }}
                    />

                    {/* Dark Editorial Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                    {/* Image Caption bar with Glassmorphism overlay */}
                    <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-zinc-950/70 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                      <span className="text-[11px] font-sans font-medium text-zinc-300">
                        {article.caption}
                      </span>
                      <span className="text-[10px] font-mono text-gold-500 font-bold bg-gold-500/10 border border-gold-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                        Svizzera 🇨🇭
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Description Side */}
                <div className={`col-span-1 lg:col-span-6 space-y-6 text-left ${isEven ? "lg:order-2" : "lg:order-1"} w-full`}>
                  
                  {/* Article Metadata tag */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                    <span className="text-gold-500 bg-gold-500/10 border border-gold-500/15 px-2.5 py-1 rounded-lg">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-600" />
                      {article.readTime}
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white group-hover:text-gold-500 transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>

                  {/* Body paragraphs (Luxury editorial spacing) */}
                  <div className="space-y-4 font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                    <p>{article.paragraphs[0]}</p>
                    <p>{article.paragraphs[1]}</p>
                  </div>

                  {/* Swiss Compliance & Trust indicators */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-900">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-400 font-light">
                        {language === "it" ? "Prenotazioni automatizzate" : "Automated bookings"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Shield className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-400 font-light">
                        {language === "it" ? "100% conforme LPD svizzera" : "100% Swiss DPA compliant"}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Interactive Call-To-Action Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleScrollTo(article.anchor)}
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-gold-500/30 text-white hover:text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-gold-500/5"
                    >
                      {article.ctaText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-gold-500" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Success Academy Micro Banner */}
        <div className="mt-32 relative rounded-3xl border border-zinc-800 bg-zinc-950/40 p-8 sm:p-12 text-center overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-electric-blue/5 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-widest uppercase">
              {language === "it" ? "ANALISI & SVILUPPO • PIXELFORGE" : "ANALYSIS & DEVELOPMENT • PIXELFORGE"}
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
              {language === "it" ? "Desideri una strategia di posizionamento su misura?" : "Do you want a customized positioning strategy?"}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              {language === "it"
                ? "Analizziamo la tua concorrenza diretta in Svizzera, identifichiamo parole chiave con elevato volume di ricerca e strutturiamo un piano d'azione concreto. Completamente gratuito e senza vincoli."
                : "We analyze your direct competition in Switzerland, identify high-volume search terms, and create a concrete action plan. Completely free of charge and non-binding."}
            </p>
            <div className="pt-4">
              <button
                onClick={() => handleScrollTo("#contatti")}
                className="bg-gold-500 hover:bg-gold-400 text-dark-bg font-extrabold px-6 py-3.5 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer shadow-lg shadow-gold-500/15 hover:shadow-gold-500/25"
              >
                {language === "it" ? "Richiedi consulenza strategica gratuita" : "Request free strategic consultation"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
