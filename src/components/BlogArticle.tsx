import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "../blog/types";

interface BlogArticleProps {
  meta: BlogPostMeta;
  children: ReactNode;
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("it-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogArticle({ meta, children }: BlogArticleProps) {
  return (
    <article className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Ambient background glow, matching the site's refined (post-polish) glow intensity */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-[0.08] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-[0.08] blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-zinc-400 flex items-center gap-2">
          <Link to="/" className="hover:text-gold-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-gold-500 transition-colors">
            Blog
          </Link>
        </nav>

        <h1
          className="font-display font-extrabold text-white leading-tight mb-6 [overflow-wrap:break-word]"
          style={{ fontSize: "clamp(1.9rem, 1rem + 2.6vw, 3rem)" }}
        >
          {meta.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-zinc-400 mb-10 pb-8 border-b border-zinc-900">
          <span className="text-gold-500 font-semibold">{meta.author}</span>
          <span>•</span>
          <time dateTime={meta.publishedDate}>Pubblicato il {formatDate(meta.publishedDate)}</time>
          {meta.updatedDate !== meta.publishedDate && (
            <>
              <span>•</span>
              <time dateTime={meta.updatedDate}>Aggiornato il {formatDate(meta.updatedDate)}</time>
            </>
          )}
          <span>•</span>
          <span>{meta.readingTime} di lettura</span>
        </div>

        {meta.coverImage && (
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-white/10 mb-12 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.55)]">
            <img
              src={meta.coverImage}
              alt={meta.coverImageAlt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1600}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="blog-content font-sans text-zinc-300 text-base sm:text-[17px]">{children}</div>

        {/* CTA block linking to the Contact section */}
        <div className="mt-16 glass-panel-gold rounded-3xl p-8 sm:p-10 text-center border border-gold-500/20">
          <h2 className="font-display text-2xl font-extrabold text-white mb-3">
            {meta.ctaHeading ?? "Pronto a far crescere la tua attività online?"}
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto leading-relaxed">
            Parliamo del tuo progetto: in pochi minuti ti aiutiamo a capire la soluzione più adatta e
            l'investimento corrispondente, senza impegno.
          </p>
          <Link
            to="/#contatti"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-dark-bg font-extrabold py-4 px-8 rounded-xl shadow-2xl shadow-gold-500/10 hover:shadow-gold-500/25 transition-all duration-300 text-sm sm:text-base tracking-wide"
          >
            Richiedi una consulenza gratuita
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
