import { useState } from "react";
import { ArrowRight, Search, Zap, CheckCircle2, Star, Smartphone, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { language, t } = useLanguage();
  const [heroImageSrc, setHeroImageSrc] = useState("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fm=webp&auto=format&fit=crop&w=800&q=70");
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const handleHeroImageError = () => {
    if (fallbackLevel === 0) {
      setHeroImageSrc("https://images.unsplash.com/photo-1507679799987-c73779587ccf?fm=webp&auto=format&fit=crop&w=800&q=70");
      setFallbackLevel(1);
    } else if (fallbackLevel === 1) {
      setHeroImageSrc("https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=webp&auto=format&fit=crop&w=800&q=70");
      setFallbackLevel(2);
    } else {
      setHeroImageSrc("https://picsum.photos/seed/swissoffice/1000/1000");
    }
  };

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

  const industries = t("hero.industries") as string[];
  const clientLogos = t("hero.logos") as Array<{ name: string; locale: string }>;

  return (
    <section
      id="home"
      className="relative min-h-screen pt-40 pb-24 flex flex-col justify-between overflow-hidden bg-[#030303]"
    >
      {/* Background cinematic glowing gradients simulating luxury alpine atmosphere */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full radial-glow-gold opacity-25 pointer-events-none blur-3xl" />
      <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] rounded-full radial-glow-blue opacity-20 pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full radial-glow-gold opacity-10 pointer-events-none blur-3xl" />
      
      {/* Precision grid overlay with dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Fine glowing horizontal/vertical rule lines for that award-winning Linear style */}
      <div className="absolute top-32 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-28 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Hero left text content (Col-7) */}
          <div className="lg:col-span-7 text-left space-y-10">
            {/* Top Tagline / Local trust */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-zinc-300 font-bold uppercase flex items-center gap-1">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Main Cinematic Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
              >
                {t("hero.titlePre")} <br className="hidden sm:inline" />
                <span className="text-gradient-gold">{t("hero.titleGradient")}</span> <br className="hidden sm:inline" />
                <span className="text-gradient-blue relative inline-block">
                  {t("hero.titlePost")}
                  <span className="absolute left-0 bottom-1.5 w-full h-[3px] bg-gradient-to-r from-electric-blue to-electric-blue-glow rounded-full" />
                </span>
              </motion.h1>
              
              {/* Premium Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light animate-fade-in"
              >
                {t("hero.subtitle")}
              </motion.p>
            </div>

            {/* Target Client Tags Slider preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {industries.map((industry, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-[11px] font-semibold text-zinc-400 bg-zinc-900/30 border border-zinc-800/60 rounded-lg hover:border-gold-500/30 hover:text-white transition-all duration-300"
                >
                  {industry}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => handleScrollTo("#contatti")}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-dark-bg font-extrabold py-4 px-8 rounded-xl shadow-2xl shadow-gold-500/10 hover:shadow-gold-500/25 active:scale-98 transition-all duration-300 cursor-pointer text-sm sm:text-base tracking-wide"
              >
                {t("common.btnDemo")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={() => handleScrollTo("#portfolio")}
                className="group flex items-center justify-center gap-2 bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 cursor-pointer text-sm sm:text-base tracking-wide"
              >
                {t("common.btnProjects")}
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </motion.div>

            {/* Small trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-900"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="font-sans text-xs font-semibold text-zinc-400">{t("hero.speedScore")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-electric-blue shrink-0" />
                <span className="font-sans text-xs font-semibold text-zinc-400">{t("hero.localSeo")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-sans text-xs font-semibold text-zinc-400">{t("hero.noHiddenCosts")}</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Floating Graphical Simulator & Premium Hero Image (Col-5) */}
          <div className="lg:col-span-5 relative w-full h-[480px] sm:h-[560px] flex items-center justify-center z-10">
            
            {/* Background Image showing a premium Swiss business office atmosphere with professional work & mockups */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 pointer-events-none shadow-2xl">
              <img 
                src={heroImageSrc} 
                alt="Happy Swiss business owner using a premium website on a laptop in a luxurious modern office"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover opacity-85 brightness-[0.85] saturate-[1.15] transition-transform duration-700 hover:scale-[1.03]"
                onError={handleHeroImageError}
              />
              {/* Premium cinematic gradients for maximum overlay contrast and text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            </div>

            {/* Elegant 3D Laptop Mockup displaying the PixelForge website */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.85, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: -5 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-6 sm:-right-16 bottom-16 w-[320px] sm:w-[400px] md:w-[460px] aspect-[16/10] bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl p-2.5 flex flex-col z-0 hidden sm:flex origin-bottom-right pointer-events-auto"
              style={{
                boxShadow: "0 30px 60px -15px rgba(0, 122, 255, 0.15), 0 15px 30px -10px rgba(223, 181, 28, 0.1)"
              }}
            >
              {/* Screen Inner Glass */}
              <div className="flex-1 w-full bg-[#040406] rounded-xl border border-white/5 overflow-hidden flex flex-col relative group/laptop">
                {/* Custom glowing border effects inside screen */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,122,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Browser Tab/URL Bar */}
                <div className="h-6 w-full bg-zinc-950/90 border-b border-zinc-900 flex items-center justify-between px-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  </div>
                  <div className="bg-zinc-900/60 border border-white/5 rounded-md px-3 py-0.5 text-[8px] text-zinc-400 font-mono tracking-wider flex items-center gap-1.5 h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    pixelforge.ch
                  </div>
                  <div className="w-8" />
                </div>
                
                {/* Page content of the PixelForge website */}
                <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden relative">
                  
                  {/* Neon light beams */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/10 rounded-full filter blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-full filter blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-gradient-to-r from-zinc-950 to-zinc-900 border border-gold-500/30 flex items-center justify-center">
                        <span className="text-[9px] font-extrabold text-gold-500 font-display">P</span>
                      </div>
                      <span className="text-[10px] font-display font-black text-white tracking-tight">PixelForge</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[7px] text-zinc-400 font-sans font-bold">
                      <span className="hover:text-white transition-colors">Servizi</span>
                      <span className="hover:text-white transition-colors">Portfolio</span>
                      <span className="hover:text-white transition-colors">Prezzi</span>
                      <span className="text-[7px] text-dark-bg font-extrabold px-2 py-0.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-md shadow-md">Contatti</span>
                    </div>
                  </div>

                  {/* Hero text */}
                  <div className="relative z-10 my-auto text-center max-w-[260px] mx-auto space-y-2">
                    <div className="inline-flex items-center gap-1 bg-zinc-950/80 border border-white/5 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-2.5 h-2.5 text-gold-500" />
                      <span className="text-[7px] font-mono font-bold text-zinc-300 uppercase tracking-widest">Swiss Premium Web Agency</span>
                    </div>
                    <h4 className="text-[12px] sm:text-[14px] font-display font-extrabold text-white leading-tight tracking-tight">
                      {language === "it" ? (
                        <>Siti Web d'Élite per <span className="bg-gradient-to-r from-gold-500 to-gold-400 bg-clip-text text-transparent">Aziende Svizzere</span></>
                      ) : (
                        <>Elite Websites for <span className="bg-gradient-to-r from-gold-500 to-gold-400 bg-clip-text text-transparent">Swiss Businesses</span></>
                      )}
                    </h4>
                    <p className="text-[8px] text-zinc-400 leading-normal max-w-[220px] mx-auto">
                      {language === "it" 
                        ? "Progettiamo esperienze digitali premium con prestazioni estreme e design sartoriale."
                        : "We engineer premium digital experiences with absolute performance and tailored craftsmanship."}
                    </p>
                  </div>

                  {/* Footer Stats bar */}
                  <div className="relative z-10 flex items-center justify-between border-t border-zinc-900/60 pt-2 text-[6px] text-zinc-500 font-mono">
                    <span className="text-emerald-400">● Performance: 100%</span>
                    <span className="text-gold-500">● SEO Score: 100%</span>
                    <span>© PixelForge Swiss</span>
                  </div>
                </div>
              </div>
              
              {/* Laptop Keyboard Base */}
              <div className="h-2 w-full bg-zinc-800 rounded-b-xl border-t border-white/10 shrink-0 mt-1 flex justify-center items-center">
                <div className="w-12 h-1 bg-zinc-900 rounded-full" />
              </div>
            </motion.div>

            {/* Background glowing halo behind phone */}
            <div className="absolute w-[350px] h-[350px] bg-gold-500/5 rounded-full filter blur-3xl animate-pulse pointer-events-none" />

            {/* Main Mockup Container with glowing borders */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/18.5] bg-zinc-950 rounded-[44px] border-[6px] border-zinc-800 shadow-2xl p-4 overflow-hidden flex flex-col justify-between group z-10"
              style={{ boxShadow: "0 25px 50px -12px rgba(223, 181, 28, 0.15)" }}
            >
              {/* Phone ear-piece and camera (island) */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-800 rounded-full z-30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-zinc-900 mr-2" />
                <div className="w-8 h-1 bg-zinc-900 rounded-full" />
              </div>

              {/* Live Preview Simulated Applet */}
              <div className="relative w-full h-full bg-[#0a0a0c] rounded-[30px] overflow-hidden flex flex-col p-4 z-10">
                {/* Header of mock app */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3 mt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-gold-500/20 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-gold-500">P</span>
                    </div>
                    <span className="text-[10px] font-display font-bold text-zinc-200">PixelForge Studio</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[7px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/50 flex items-center gap-1 font-bold">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> DEMO
                    </span>
                  </div>
                </div>

                {/* Body of mock app */}
                <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
                  {/* Banner */}
                  <div className="h-24 rounded-xl bg-gradient-to-tr from-zinc-900 to-gold-950/50 border border-zinc-800/40 p-3 flex flex-col justify-end relative overflow-hidden">
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 px-1.5 py-0.5 rounded-full border border-white/5">
                      <Star className="w-2.5 h-2.5 text-gold-500 fill-gold-500" />
                      <span className="text-[8px] text-zinc-300 font-bold">5.0 (98% {language === "it" ? "Soddisfazione" : "Satisfaction"})</span>
                    </div>
                    <h3 className="text-xs font-display font-extrabold text-white leading-tight">
                      {language === "it" ? "Zahnarztpraxis San Gottardo" : "San Gottardo Dental Clinic"}
                    </h3>
                    <p className="text-[8px] text-zinc-400">{language === "it" ? "Eccellenza Medica Svizzera" : "Premium Medical Precision"}</p>
                  </div>

                  {/* List items */}
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                      {language === "it" ? "Moduli Digitali" : "Digital Forms"}
                    </span>
                    {[
                      { 
                        name: language === "it" ? "Sincronizzazione Casse Malati" : "Insurance Alignment", 
                        desc: language === "it" ? "Fatturazione e controllo diretto" : "Direct billing & analysis" 
                      },
                      { 
                        name: language === "it" ? "Richiesta prima visita online" : "Book Initial Visit Online", 
                        desc: language === "it" ? "Conferma immediata in pochi secondi" : "Instant confirmation in seconds" 
                      },
                    ].map((srv, idx) => (
                      <div key={idx} className="bg-zinc-900/50 p-2 rounded-lg border border-zinc-900 hover:border-zinc-800 transition-colors">
                        <span className="text-[9px] text-zinc-200 font-bold block">{srv.name}</span>
                        <span className="text-[8px] text-zinc-500 block">{srv.desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trust factors */}
                  <div className="bg-emerald-950/10 border border-emerald-900/20 p-2.5 rounded-xl flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[9px] font-bold text-emerald-400">
                        {language === "it" ? "Sicuro e conforme LPD" : "Secure & DPA Compliant"}
                      </h4>
                      <p className="text-[8px] text-zinc-400 leading-snug">
                        {language === "it" ? "Protezione completa dei dati sensibili dei pazienti." : "Full protection of sensitive patient records."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer and Book button */}
                <div className="pt-2 border-t border-zinc-900 mt-2">
                  <button className="w-full bg-gold-500 hover:bg-gold-400 text-dark-bg font-extrabold text-[10px] py-2 rounded-lg shadow-lg transition-colors">
                    {language === "it" ? "Prenota appuntamento online" : "Book appointment online"}
                  </button>
                  <span className="text-[7px] text-center text-zinc-500 block mt-1.5 font-sans">
                    © {language === "it" ? "Creato da PixelForge" : "Created by PixelForge"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating stats card 1 - Speed (Moved outside mockup for zero clipping and 3D floating effect) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-3 sm:-left-8 top-[15%] glass-panel rounded-xl p-3 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 flex items-center gap-3 z-20 max-w-[145px]"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] text-zinc-400 font-bold leading-none uppercase">
                  {language === "it" ? "Caricamento" : "Loading speed"}
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400 mt-1">0.4 {t("common.seconds")}</div>
              </div>
            </motion.div>

            {/* Floating stats card 2 - SEO Google */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -right-3 sm:-right-8 bottom-[20%] glass-panel rounded-xl p-3 border border-gold-500/30 shadow-lg shadow-gold-500/10 flex items-center gap-3 z-20 max-w-[145px]"
            >
              <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] text-zinc-400 font-bold leading-none uppercase">Google SEO</div>
                <div className="text-xs font-mono font-bold text-gold-500 mt-1">100 / 100 Score</div>
              </div>
            </motion.div>

            {/* Floating stats card 3 - Mobile check */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute left-[15%] -bottom-4 glass-panel rounded-xl p-2.5 px-3 border border-electric-blue/30 shadow-lg flex items-center gap-2 z-20"
            >
              <Smartphone className="w-4 h-4 text-electric-blue" />
              <span className="text-[9px] font-bold text-zinc-300">
                {language === "it" ? "100% Ottimizzato mobile" : "100% Mobile responsive"}
              </span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Elegant Client Logos Infinite Scrolling Ticker Section */}
      <div className="relative w-full border-t border-b border-zinc-900/80 bg-zinc-950/40 py-8 mt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-3">
          <p className="text-center font-mono text-[9px] tracking-widest text-zinc-500 uppercase font-bold">
            {language === "it" 
              ? "FIDUCIA SVIZZERA: AZIENDE LOCALI CHE CRESCONO INSIEME A NOI" 
              : "SWISS TRUST: LOCAL BUSINESSES GROWING SUCCESSFULLY WITH PIXELFORGE"}
          </p>
        </div>
        
        {/* Infinite scrolling block using keyframe translation */}
        <div className="flex overflow-hidden select-none gap-16 w-full">
          <div className="flex shrink-0 justify-around min-w-full gap-16 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {clientLogos.concat(clientLogos).map((client, index) => (
              <div
                key={index}
                className="flex items-center gap-2 hover:opacity-100 opacity-40 transition-opacity duration-300"
              >
                <div className="w-2.5 h-2.5 rounded bg-gold-500" />
                <span className="font-display font-extrabold text-sm sm:text-base text-zinc-300 tracking-wider">
                  {client.name.toUpperCase()}
                </span>
                <span className="font-mono text-[9px] text-zinc-600 px-1.5 py-0.5 border border-zinc-900 rounded bg-zinc-900/50">
                  {client.locale}
                </span>
              </div>
            ))}
          </div>
          {/* Duplicate to ensure continuous flow */}
          <div className="flex shrink-0 justify-around min-w-full gap-16 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" aria-hidden="true">
            {clientLogos.concat(clientLogos).map((client, index) => (
              <div
                key={index}
                className="flex items-center gap-2 hover:opacity-100 opacity-40 transition-opacity duration-300"
              >
                <div className="w-2.5 h-2.5 rounded bg-gold-500" />
                <span className="font-display font-extrabold text-sm sm:text-base text-zinc-300 tracking-wider">
                  {client.name.toUpperCase()}
                </span>
                <span className="font-mono text-[9px] text-zinc-600 px-1.5 py-0.5 border border-zinc-900 rounded bg-zinc-900/50">
                  {client.locale}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Adding CSS keyframes custom rules dynamically inline */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
