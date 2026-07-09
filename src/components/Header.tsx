import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, MessageSquare, Globe, Instagram } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.services"), href: "#servizi" },
    { label: t("nav.method"), href: "#processo" },
    { label: t("nav.about"), href: "#chi-siamo" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.projects"), href: "#portfolio" },
    { label: t("nav.cases"), href: "#storie-successo" },
    { label: t("nav.pricing"), href: "#listino" },
    { label: t("nav.contact"), href: "#contatti" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-1 bg-zinc-950/80 border border-zinc-800/80 p-1 rounded-full text-[10px] font-bold shadow-inner">
      <button
        onClick={() => setLanguage("it")}
        className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
          language === "it"
            ? "bg-gold-500 text-dark-bg font-extrabold shadow"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        IT
      </button>
      <span className="text-zinc-800 select-none px-0.5">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
          language === "en"
            ? "bg-gold-500 text-dark-bg font-extrabold shadow"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-panel py-3.5 shadow-xl border-b border-white/5"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="logo-brand-link"
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-white via-gold-500 to-electric-blue flex items-center justify-center p-[1px] shadow-lg shadow-gold-500/10">
              <div className="w-full h-full bg-dark-bg rounded-[7px] flex items-center justify-center transition-all duration-300 group-hover:bg-transparent">
                <span className="font-display font-extrabold text-sm tracking-tighter text-white group-hover:text-dark-bg transition-colors duration-300">
                  PF
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wider text-white">
                Pixel<span className="text-gold-500">Forge</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase -mt-1">
                pixforge.ch
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans text-xs font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-white ${
                  activeSection === item.href.substring(1)
                    ? "text-gold-500 font-semibold"
                    : "text-zinc-400"
                }`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-500 to-electric-blue rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Desktop CTA & Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            
            <a
              id="cta-whatsapp-quick"
              href="https://wa.me/41798905964?text=Ciao%20PixelForge!%20Desidero%20maggiori%20informazioni%20su%20una%20demo%20gratuita."
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-emerald-500 hover:text-emerald-400 transition-colors"
              title="WhatsApp"
            >
              <MessageSquare className="w-4.5 h-4.5" />
            </a>

            <a
              id="cta-instagram-quick"
              href="https://instagram.com/pixelforge.ch"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-pink-500 hover:text-pink-400 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            
            <a
              id="cta-header-demo"
              href="#contatti"
              onClick={(e) => handleNavClick(e, "#contatti")}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-white rounded-lg group bg-gradient-to-br from-gold-500 via-white to-electric-blue hover:text-dark-bg focus:ring-4 focus:outline-none focus:ring-gold-800 transition-all duration-300"
            >
              <span className="relative px-3.5 py-2 transition-all ease-in duration-75 bg-dark-bg rounded-md group-hover:bg-opacity-0 flex items-center gap-1.5">
                {t("common.btnDemo")}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile & Tablet switcher/hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            
            <a
              href="https://wa.me/41798905964?text=Ciao%20PixelForge!"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-emerald-500"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href="https://instagram.com/pixelforge.ch"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-pink-500"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white bg-dark-accent rounded-lg border border-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-y-0 right-0 w-72 sm:w-80 max-w-full bg-dark-bg/95 border-l border-zinc-800/80 z-50 backdrop-blur-2xl shadow-2xl p-6 transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-electric-blue flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-dark-bg rounded-[7px] flex items-center justify-center">
                <span className="font-display font-extrabold text-xs text-white">PF</span>
              </div>
            </div>
            <span className="font-display font-bold text-base tracking-wider text-white">
              Pixel<span className="text-gold-500">Forge</span>
            </span>
          </div>
          <button
            id="mobile-drawer-close"
            onClick={() => setIsOpen(false)}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 mb-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`font-sans text-sm font-medium py-1.5 border-b border-zinc-900 transition-colors ${
                activeSection === item.href.substring(1)
                  ? "text-gold-500 pl-2 border-l-2 border-l-gold-500 border-b-transparent"
                  : "text-zinc-400"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <a
            id="mobile-drawer-cta-demo"
            href="#contatti"
            onClick={(e) => handleNavClick(e, "#contatti")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-bg font-bold py-3 px-4 rounded-lg shadow-lg shadow-gold-500/20 transition-all text-xs"
          >
            {t("common.btnDemo")}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <div className="text-center pt-4 border-t border-zinc-900">
            <p className="font-mono text-[9px] text-zinc-500">pixforge.ch • Svizzera 🇨🇭</p>
            <a href="mailto:info@pixforge.ch" className="font-sans text-xs text-zinc-400 hover:text-gold-500 transition-colors mt-1 block">
              info@pixforge.ch
            </a>
            <div className="flex items-center justify-center gap-4 mt-3">
              <a href="https://wa.me/41798905964" target="_blank" rel="noreferrer" className="text-emerald-500 hover:text-emerald-400 text-xs flex items-center gap-1 font-semibold">
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <span className="text-zinc-800">|</span>
              <a href="https://instagram.com/pixelforge.ch" target="_blank" rel="noreferrer" className="text-pink-500 hover:text-pink-400 text-xs flex items-center gap-1 font-semibold">
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          id="mobile-drawer-overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm lg:hidden"
        />
      )}
    </header>
  );
}
