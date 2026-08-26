import { useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCookieConsent } from "../context/CookieConsentContext";

/**
 * Real, functioning cookie consent banner -- not a decorative placeholder. The
 * visitor's choice is persisted (src/lib/cookieConsent.ts) and immediately applied
 * to Google's Consent Mode signal (analytics_storage / ad_storage / etc.), which
 * defaults to "denied" in index.html until the visitor explicitly accepts.
 */
export default function CookieConsentBanner() {
  const { language } = useLanguage();
  const { isPanelOpen, closePanel, acceptAll, rejectOptional } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (!isPanelOpen) return null;

  const isIt = language === "it";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={isIt ? "Preferenze cookie" : "Cookie preferences"}
      className="fixed inset-x-0 bottom-0 z-[999999] p-4 sm:p-6 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-3xl glass-panel border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-gold-500">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-white text-sm sm:text-base">
              {isIt ? "Rispettiamo la tua privacy" : "We respect your privacy"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-1.5">
              {isIt ? (
                <>
                  Usiamo cookie tecnici necessari al funzionamento del sito e, solo con il tuo
                  consenso, cookie di analisi (Google Analytics) per capire come viene usato il
                  sito. Puoi accettare, rifiutare o personalizzare la tua scelta in qualsiasi
                  momento. Leggi la{" "}
                  <Link to="/privacy-policy" className="text-gold-500 hover:text-gold-400 underline">
                    Privacy Policy
                  </Link>{" "}
                  e la{" "}
                  <Link to="/cookie-policy" className="text-gold-500 hover:text-gold-400 underline">
                    Cookie Policy
                  </Link>
                  .
                </>
              ) : (
                <>
                  We use technical cookies required for the site to work and, only with your
                  consent, analytics cookies (Google Analytics) to understand how the site is
                  used. You can accept, reject or change your choice at any time. Read our{" "}
                  <Link to="/privacy-policy" className="text-gold-500 hover:text-gold-400 underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/cookie-policy" className="text-gold-500 hover:text-gold-400 underline">
                    Cookie Policy
                  </Link>
                  .
                </>
              )}
            </p>

            {showDetails && (
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-950/60 border border-zinc-900">
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">
                      {isIt ? "Cookie necessari" : "Necessary cookies"}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {isIt
                        ? "Sempre attivi: lingua del sito e funzionamento di base. Non richiedono consenso."
                        : "Always active: site language and basic functionality. No consent required."}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 shrink-0">
                    {isIt ? "Sempre attivi" : "Always on"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-950/60 border border-zinc-900">
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">
                      {isIt ? "Cookie di analisi (Google Analytics)" : "Analytics cookies (Google Analytics)"}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {isIt
                        ? "Ci aiutano a capire come i visitatori usano il sito. Attivi solo se accetti."
                        : "Help us understand how visitors use the site. Only active if you accept."}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 shrink-0">
                    {isIt ? "Con consenso" : "Opt-in"}
                  </span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={closePanel}
            aria-label={isIt ? "Chiudi" : "Close"}
            className="text-zinc-500 hover:text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors underline underline-offset-4 sm:mr-auto"
          >
            {showDetails ? (isIt ? "Nascondi dettagli" : "Hide details") : (isIt ? "Gestisci preferenze" : "Manage preferences")}
          </button>
          <button onClick={rejectOptional} className="btn-secondary !py-2.5 !px-5 text-xs sm:text-sm font-semibold">
            {isIt ? "Rifiuta" : "Reject"}
          </button>
          <button onClick={acceptAll} className="btn-primary !py-2.5 !px-5 text-xs sm:text-sm">
            {isIt ? "Accetta" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
