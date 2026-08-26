import { Link } from "react-router-dom";
import { ArrowRight, Compass, Home } from "lucide-react";
import { useDocumentHead } from "../hooks/useDocumentHead";

/**
 * Catch-all for any unmatched route (bad link, typo, stale bookmark). Reached
 * client-side only -- there's no bounded list of "unknown" URLs to prerender,
 * so this always renders via the app-shell.html SPA fallback (see
 * public/_redirects) plus this route's own "*" match in App.tsx.
 */
export default function NotFoundPage() {
  useDocumentHead({
    title: "Pagina non trovata | PixelForge",
    description: "La pagina che stai cercando non esiste o è stata spostata.",
    canonicalPath: "/",
    noindex: true,
  });

  return (
    <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-[0.08] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-[0.08] blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="kicker justify-center">
          <Compass className="w-3.5 h-3.5" aria-hidden="true" />
          Errore 404
        </div>

        <p
          className="font-display font-extrabold leading-none text-gradient-gold select-none"
          style={{ fontSize: "clamp(5rem, 3rem + 8vw, 9rem)" }}
        >
          404
        </p>

        <h1
          className="font-display font-extrabold text-white leading-tight"
          style={{ fontSize: "clamp(1.7rem, 1rem + 2.2vw, 2.5rem)" }}
        >
          Pagina non trovata
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
          Il link che hai seguito potrebbe essere errato o la pagina potrebbe essere stata spostata.
          Torna alla home o continua a esplorare il sito da lì.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="btn-primary w-full sm:w-auto">
            <Home className="w-4 h-4" aria-hidden="true" />
            Torna alla home
          </Link>
          <Link to="/blog" className="btn-secondary w-full sm:w-auto">
            Leggi il blog
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
