import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function FloatingGoogleReview() {
  const { language } = useLanguage();
  
  const text = language === "it" ? "Lascia una recensione" : "Leave a review";
  const reviewUrl = "https://www.google.com/search?q=PixelForge+Ticino+recensioni"; // Elegant search query for reviews
  
  return (
    <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-[calc(2rem+56px+16px)] z-50 flex items-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="pointer-events-auto"
      >
        <a 
          href={reviewUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="google-review-btn"
        >
          ⭐ {text}
        </a>
      </motion.div>
    </div>
  );
}
