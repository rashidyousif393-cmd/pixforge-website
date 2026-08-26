import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

/**
 * Shared layout for legal/trust pages (Privacy Policy, Cookie Policy, Termini e
 * Condizioni) -- reuses the same breadcrumb, glass cover panel and `.blog-content`
 * prose styling already established for blog articles, so these pages match the
 * site's existing premium design instead of introducing a new visual language.
 */
export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <article className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-[0.08] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-[0.08] blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-zinc-400 flex items-center gap-2">
          <Link to="/" className="hover:text-gold-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{title}</span>
        </nav>

        <h1
          className="font-display font-extrabold text-white leading-tight mb-4 [overflow-wrap:break-word]"
          style={{ fontSize: "clamp(1.9rem, 1rem + 2.6vw, 3rem)" }}
        >
          {title}
        </h1>

        <p className="text-xs font-mono text-zinc-400 mb-12 pb-8 border-b border-zinc-900">
          Ultimo aggiornamento: <time>{lastUpdated}</time>
        </p>

        <div className="blog-content font-sans text-zinc-300 text-base sm:text-[17px]">{children}</div>
      </div>
    </article>
  );
}
