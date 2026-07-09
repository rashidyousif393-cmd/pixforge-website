import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const text = language === "it" 
      ? "Ciao PixelForge! Desidero informazioni su una demo gratuita." 
      : "Hello PixelForge! I would like information about a free demo.";
    window.open(`https://wa.me/41798905964?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div 
      className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-50 flex items-center justify-end pointer-events-none"
      id="floating-whatsapp-container"
    >
      <div className="flex items-center gap-3 pointer-events-auto">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-zinc-950/95 border border-emerald-500/35 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md hidden sm:flex flex-col text-right max-w-xs"
            >
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest leading-none">
                {language === "it" ? "Consulenza Svizzera" : "Swiss Advisory"}
              </span>
              <span className="text-xs font-bold text-white mt-1">
                {language === "it" ? "Chatta ora su WhatsApp" : "Chat with us now"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/45 cursor-pointer group transition-colors"
          aria-label="Contact us on WhatsApp"
        >
          {/* Outer Pulsing Glow */}
          <span className="absolute inset-0 rounded-2xl bg-emerald-500 animate-ping opacity-25 -z-10" />
          
          <MessageCircle className="w-7 h-7 fill-white stroke-emerald-500 stroke-[1.5] group-hover:scale-105 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}
