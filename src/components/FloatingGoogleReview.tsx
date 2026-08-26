import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Star, X, Check, ArrowRight } from "lucide-react";
import { gsap } from "../lib/gsap";

export default function FloatingGoogleReview() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const reviewUrl = "https://www.google.com/search?q=PixelForge+Ticino+recensioni"; // Direct Google search query for review panel

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      it: {
        floatingBtn: "Lascia una recensione",
        question: "Ti è piaciuto il nostro lavoro?",
        subtitle: "La tua opinione è fondamentale per aiutarci a crescere e a garantire sempre lo standard di eccellenza svizzero.",
        starsRedirect: "Valutando con 5 stelle si aprirà automaticamente la pagina Google Reviews di PixelForge.",
        redirecting: "Grazie mille per le 5 stelle! Ti stiamo reindirizzando...",
        fallbackText: "Se non vieni reindirizzato automaticamente entro pochi secondi, clicca sul pulsante qui sotto:",
        openGoogleBtn: "Apri Google Reviews",
        feedbackThanks: "Grazie per il tuo feedback!",
        feedbackDetails: "La tua opinione ci aiuta a migliorare. Lavoriamo sodo ogni giorno per offrire soluzioni digitali di altissimo livello. Se c'è qualcosa che possiamo fare per migliorare la tua esperienza, faccelo sapere!",
        contactUs: "Contattaci",
        closeBtn: "Chiudi"
      },
      en: {
        floatingBtn: "Leave a review",
        question: "Did you like our work?",
        subtitle: "Your rating is essential to help us grow and always guarantee the Swiss standard of excellence.",
        starsRedirect: "Rating with 5 stars will automatically open PixelForge's Google Reviews page.",
        redirecting: "Thank you so much for the 5 stars! Redirecting you...",
        fallbackText: "If you are not automatically redirected within a few seconds, click the button below:",
        openGoogleBtn: "Open Google Reviews",
        feedbackThanks: "Thank you for your feedback!",
        feedbackDetails: "Your opinion helps us improve. We work hard every day to provide top-tier digital solutions. If there is any way we can improve your experience, please let us know!",
        contactUs: "Contact Us",
        closeBtn: "Close"
      }
    };
    return translations[language]?.[key] || translations["it"]?.[key] || "";
  };

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating === 5) {
      setIsRedirecting(true);
      // Immediately open in direct click handler to bypass popup blockers
      window.open(reviewUrl, "_blank", "noopener,noreferrer");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset states after animation duration
    setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setIsRedirecting(false);
    }, 300);
  };

  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !backdropRef.current || !cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }
      );
    });
    return () => ctx.revert();
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-[calc(2rem+56px+16px)] z-50 flex items-center pointer-events-none review-floating-button">
        <div className="pointer-events-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="google-review-btn"
          >
            ⭐ {t("floatingBtn")}
          </button>
        </div>
      </div>

      {/* Elegant Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div
            ref={backdropRef}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <div
            ref={cardRef}
            className="glass-panel-gold max-w-md w-full rounded-2xl p-6 lg:p-8 relative text-center flex flex-col items-center gap-5 border border-gold-500/20 shadow-[0_0_50px_rgba(223,181,28,0.15)] z-10"
          >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Dynamic Content */}
              {rating === 0 ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-500 mb-1">
                    <Star className="w-6 h-6 fill-gold-500" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                    {t("question")}
                  </h3>
                  
                  <p className="text-sm text-zinc-300 leading-relaxed max-w-sm">
                    {t("subtitle")}
                  </p>

                  {/* Star Rating Row */}
                  <div className="flex items-center gap-3 my-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRatingClick(star)}
                        className="transition-transform duration-150 hover:scale-125 focus:outline-none cursor-pointer"
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          className={`w-10 h-10 transition-all duration-200 ${
                            star <= (hoverRating || rating)
                              ? "fill-gold-400 text-gold-400 drop-shadow-[0_0_8px_rgba(243,212,67,0.5)]"
                              : "text-zinc-600 hover:text-zinc-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-zinc-400 max-w-xs leading-normal">
                    {t("starsRedirect")}
                  </p>
                </>
              ) : rating === 5 ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-500 mb-2 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                    {t("feedbackThanks")}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {t("redirecting")}
                  </p>

                  <div className="flex items-center gap-2 text-gold-400 my-1 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-400 max-w-xs leading-normal">
                    <p className="mb-3">{t("fallbackText")}</p>
                    <a
                      href={reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500 hover:bg-gold-600 text-dark-bg font-bold transition-all text-sm shadow-md"
                    >
                      {t("openGoogleBtn")} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-500 mb-1">
                    <Star className="w-6 h-6 fill-gold-500" />
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                    {t("feedbackThanks")}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed max-w-sm">
                    {t("feedbackDetails")}
                  </p>

                  {/* Feedback Stars Row */}
                  <div className="flex items-center gap-2 my-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-gold-400 text-gold-400"
                            : "text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Action Buttons for non-5 star feedback */}
                  <div className="flex items-center gap-3 mt-4 w-full justify-center">
                    <button
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-full border border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all text-sm font-medium cursor-pointer"
                    >
                      {t("closeBtn")}
                    </button>
                    <a
                      href="#contatti"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 text-dark-bg font-semibold transition-all text-sm shadow-[0_4px_12px_rgba(223,181,28,0.2)] cursor-pointer"
                    >
                      {t("contactUs")}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
    </>
  );
}

