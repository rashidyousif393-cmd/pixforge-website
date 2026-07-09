import React, { useState, useEffect } from "react";
import { 
  ArrowUp, Mail, MapPin, Shield, MessageCircle, ExternalLink, 
  ClipboardCheck, ClipboardCopy, Linkedin, Instagram, Github, 
  Twitter, Send, Check, Clock, ArrowRight, Lock, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const [swissTime, setSwissTime] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Keep Schweizer Zeit (CET/CEST) accurate down to the second
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Zurich",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formattedTime = new Intl.DateTimeFormat("de-CH", options).format(new Date());
      setSwissTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@pixforge.ch");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
      return;
    }

    setNewsletterStatus("loading");
    
    // Simulate API registration
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
    }, 1500);
  };

  // Nav categories & links with specific anchors
  const navigationColumns = language === "it" ? [
    {
      title: "Servizi",
      links: [
        { label: "Web Design Premium", href: "#servizi" },
        { label: "Siti E-Commerce", href: "#servizi" },
        { label: "Ottimizzazione SEO", href: "#servizi" },
        { label: "Branding & Corporate Design", href: "#servizi" },
      ]
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi siamo", href: "#chi-siamo" },
        { label: "Recensioni", href: "#testimonials" },
        { label: "Casi di studio", href: "#storie-successo" },
        { label: "Prezzi & Listino", href: "#listino" },
      ]
    }
  ] : [
    {
      title: "Services",
      links: [
        { label: "Premium Web Design", href: "#servizi" },
        { label: "E-Commerce Shops", href: "#servizi" },
        { label: "Search Engine Optimization", href: "#servizi" },
        { label: "Branding & Corporate Design", href: "#servizi" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#chi-siamo" },
        { label: "Client Testimonials", href: "#testimonials" },
        { label: "Success Stories", href: "#storie-successo" },
        { label: "Pricing & Plans", href: "#listino" },
      ]
    }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer id="agency-footer" className="bg-dark-bg border-t border-zinc-900 pt-20 pb-10 relative overflow-hidden w-full group">
      {/* Background Alps Image with Swiss premium branding overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=webp&auto=format&fit=crop&w=800&q=60" 
          alt="Swiss Alps Mountain Peak" 
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover opacity-[0.03] scale-100 group-hover:scale-[1.02] transition-transform duration-[2000ms] mix-blend-overlay"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes("photo-1486406146926")) {
              target.src = "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?fm=webp&auto=format&fit=crop&w=800&q=60";
            } else {
              target.src = "https://picsum.photos/seed/alps_backup/1600/900";
            }
          }}
        />
      </div>

      {/* Background radial glows for premium feeling */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full radial-glow-blue opacity-[0.08] pointer-events-none blur-3xl" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full radial-glow-gold opacity-[0.08] pointer-events-none blur-3xl" />

      {/* Decorative Top Line with Glowing Nodes */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent">
        <div className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-2.5 h-2.5 rounded-full bg-gold-500 shadow-[0_0_10px_#dfb51c] border border-dark-bg" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-zinc-900 text-left w-full">
          
          {/* Column 1: Brand representation, tagline & socials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-electric-blue flex items-center justify-center p-[1px] shadow-lg shadow-gold-500/5">
                <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-sm text-white tracking-tighter">PF</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-wider text-white">
                  Pixel<span className="text-gold-500">Forge</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase leading-none mt-0.5">
                  Web-Craftsmanship
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              {language === "it"
                ? "Creazioni digitali su misura con precisione svizzera. Trasformiamo la presenza digitale delle PMI svizzere in esperienze di marca ad alta conversione."
                : "Bespoke digital creations with Swiss precision. We transform the digital presence of Swiss SMEs into high-converting brand experiences."}
            </p>

            {/* Swiss Quality Trust Info */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-900">
              <span className="text-sm">🇨🇭</span>
              <span className="font-mono text-[9px] tracking-wider text-zinc-400 font-semibold uppercase">
                {language === "it" ? "Qualità & Servizio Svizzero" : "Swiss Quality & Service"}
              </span>
            </div>

            {/* Social Media Link Icons */}
            <div className="space-y-2.5 pt-2">
              <h5 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {language === "it" ? "Seguici" : "Follow Us"}
              </h5>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com/pixelforge.ch", label: "Instagram" },
                  { icon: <Github className="w-4 h-4" />, href: "https://github.com", label: "GitHub" },
                  { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com", label: "Twitter" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-gold-500 hover:border-gold-500/30 transition-all flex items-center justify-center shadow-md cursor-pointer"
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Dynamic Navigation Columns */}
          {navigationColumns.map((col, index) => (
            <div key={index} className="sm:col-span-1 lg:col-span-2 space-y-5">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider font-extrabold pb-1 border-b border-zinc-900/40 inline-block">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="group flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors font-light"
                    >
                      <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact & Direct WhatsApp Support */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider font-extrabold pb-1 border-b border-zinc-900/40 inline-block">
              {language === "it" ? "Contatto Diretto & Supporto" : "Direct Contact & Support"}
            </h4>

            <div className="space-y-4">
              {/* Clipboard copyable email */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase leading-none">
                      {language === "it" ? "INDIRIZZO E-MAIL" : "EMAIL ADDRESS"}
                    </span>
                    <a href="mailto:info@pixforge.ch" className="text-xs sm:text-sm font-semibold text-zinc-200 hover:text-gold-500 transition-colors mt-1">
                      info@pixforge.ch
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer active:scale-95"
                  title={language === "it" ? "Copia e-mail" : "Copy email"}
                >
                  {copiedEmail ? (
                    <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ClipboardCopy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Physical/virtual Office location */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Bellinzona%2C%20Ticino%2C%20Svizzera"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-950/40 border border-zinc-900/60 hover:border-zinc-800 transition-colors group cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-gold-500 transition-colors shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase leading-none">
                    {language === "it" ? "SEDE AGENZIA" : "AGENCY HEADQUARTERS"}
                  </span>
                  <span className="text-xs text-zinc-300 font-bold mt-1.5 leading-relaxed group-hover:text-white transition-colors">
                    PixelForge
                  </span>
                  <span className="text-xs text-zinc-400 font-light leading-relaxed">
                    Bellinzona, Ticino, Svizzera
                  </span>
                </div>
              </a>

              {/* Dedicated WhatsApp Card with Pulse */}
              <motion.a
                href="https://wa.me/41798905964"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.01 }}
                className="block p-3.5 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-[#075E54]/10 to-[#25D366]/5 hover:from-[#075E54]/20 hover:to-[#25D366]/10 transition-all cursor-pointer relative overflow-hidden group text-left"
              >
                {/* Micro-sparkle effect inside */}
                <div className="absolute right-3 top-3 opacity-20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 stroke-[1]" />
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        {language === "it" ? "Supporto WhatsApp" : "WhatsApp Support"}
                      </span>
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white mt-0.5 group-hover:text-emerald-300 transition-colors">
                      {language === "it" ? "Inizia la chat ora 🇨🇭" : "Start Chat Now 🇨🇭"}
                    </p>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>

        </div>

        {/* Premium Newsletter Registration Block */}
        <div className="py-12 border-b border-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left w-full">
          <div className="lg:col-span-5 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-gold-500 font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {language === "it" ? "IMPULSI DIGITALI" : "DIGITAL INSIGHTS"}
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              {language === "it" ? "Iscriviti alla nostra newsletter" : "Subscribe to our Newsletter"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
              {language === "it"
                ? "Ricevi strategie esclusive su sviluppo web, psicologia delle vendite e conversioni direttamente nella tua casella di posta. Zero spam."
                : "Receive exclusive strategies on web development, sales psychology, and high conversion optimization directly to your inbox. No spam."}
            </p>
          </div>

          <div className="lg:col-span-7 w-full max-w-xl lg:ml-auto">
            <AnimatePresence mode="wait">
              {newsletterStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 w-full"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-dark-bg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm">
                      {language === "it" ? "Iscrizione avvenuta con successo!" : "Successfully Subscribed!"}
                    </h5>
                    <p className="text-[11px] text-emerald-500/80 mt-0.5">
                      {language === "it"
                        ? "Grazie per la fiducia. Riceverai presto una conferma."
                        : "Thank you for your trust. You will receive a confirmation email shortly."}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleNewsletterSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={language === "it" ? "Il tuo indirizzo e-mail..." : "Your email address..."}
                      className="w-full px-4 py-3.5 rounded-2xl bg-zinc-950 border border-zinc-900 focus:border-gold-500/30 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                      disabled={newsletterStatus === "loading"}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-dark-bg font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-gold-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50 shrink-0 font-display"
                  >
                    {newsletterStatus === "loading" ? (
                      <span className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{language === "it" ? "Iscriviti" : "Subscribe"}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            {newsletterStatus === "error" && (
              <p className="text-[11px] text-red-400 mt-2 pl-2">
                {language === "it" ? "Inserisci un indirizzo e-mail valido." : "Please enter a valid email address."}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section: Copyright, Live Clock, SSL security, Scroll to top */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-10 gap-6 w-full">
          
          {/* Copyright & Location Statement */}
          <div className="space-y-1 text-center lg:text-left">
            <p className="font-sans text-[10px] sm:text-xs text-zinc-500 font-light">
              {language === "it"
                ? "© 2026 PixelForge.ch. Tutti i diritti riservati."
                : "© 2026 PixelForge.ch. All rights reserved."}
            </p>
            <p className="text-[9px] text-zinc-600 font-mono tracking-wider">
              {language === "it"
                ? "SVILUPPO WEB SVIZZERO INNOVATIVO • CONCEIVED IN SWITZERLAND"
                : "INNOVATIVE SWISS WEB DEVELOPMENT • CONCEIVED IN SWITZERLAND"}
            </p>
          </div>

          {/* Time & SSL Security status widgets */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* Live Switzerland Clock Widget */}
            <div className="px-3 py-1.5 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center gap-2.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              </span>
              <span className="font-mono text-[9px] text-zinc-500 tracking-wider font-semibold">
                {language === "it" ? "ORA SVIZZERA:" : "SWISS TIME:"}
              </span>
              <span className="font-mono text-xs font-black text-gold-500 tracking-widest">
                {swissTime || "12:00:00"}
              </span>
            </div>

            {/* SSL Secure pill */}
            <div className="px-3 py-1.5 bg-zinc-950/40 border border-zinc-900/60 rounded-xl flex items-center gap-2 text-zinc-500">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span className="font-mono text-[9px] font-semibold tracking-wider uppercase">SSL ENCRYPTED SECURE</span>
            </div>
          </div>

          {/* Legal link rules & back to top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
              <a href="#diagnostica" className="hover:text-gold-500 transition-colors">
                {language === "it" ? "Note Legali" : "Legal Notice"}
              </a>
              <span>•</span>
              <a href="#diagnostica" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
            </div>

            {/* Scroll back to top premium floating button */}
            <motion.button
              onClick={handleScrollTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-gold-500/30 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-lg group"
              title={language === "it" ? "Torna su" : "Scroll to top"}
            >
              <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform text-gold-500" />
            </motion.button>
          </div>

        </div>

      </div>
    </footer>
  );
}
