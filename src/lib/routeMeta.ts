import { getAllPosts, getPostBySlug } from "../blog";

export const SITE_URL = "https://pixforge.ch";
const SITE_NAME = "PixelForge";

export interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown>;
}

const LOCAL_BUSINESS_JSON_LD: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "PixelForge",
  alternateName: "PixelForge - Web Agency Ticino",
  description:
    "Web agency a Bellinzona specializzata nella creazione e realizzazione di siti web professionali per aziende in Ticino, Lugano e in tutta la Svizzera italiana.",
  image: "https://pixforge.ch/assets/og-image.jpg",
  url: SITE_URL,
  email: "info@pixforge.ch",
  priceRange: "CHF 900 - CHF 2100",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bellinzona",
    addressRegion: "Ticino",
    addressCountry: "CH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "46.1963",
    longitude: "9.0224",
  },
  areaServed: [
    { "@type": "City", name: "Bellinzona" },
    { "@type": "City", name: "Lugano" },
    { "@type": "AdministrativeArea", name: "Ticino" },
    { "@type": "Country", name: "Svizzera" },
  ],
  sameAs: ["https://instagram.com/pixelforge.ch"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

/**
 * Single source of truth for route metadata: title, description, canonical path
 * and JSON-LD. Consumed both by entry-server.tsx (to build literal <head> HTML at
 * prerender time) and by each page component (via useDocumentHead), so the two
 * can never drift.
 */
const STATIC_ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "Creazione Siti Web Ticino | PixelForge – Bellinzona & Lugano",
    description:
      "PixelForge è un'agenzia web a Bellinzona specializzata nella creazione e realizzazione di siti web per aziende in Ticino e Lugano. Siti veloci, moderni e ottimizzati per Google.",
    canonicalPath: "/",
    jsonLd: LOCAL_BUSINESS_JSON_LD,
  },
  "/blog": {
    title: "Blog PixelForge | Guide su siti web, prezzi e SEO in Ticino",
    description:
      "Guide pratiche e approfondimenti su siti web professionali, prezzi, SEO locale e strategie digitali per PMI in Ticino, a cura di PixelForge.",
    canonicalPath: "/blog",
  },
  "/privacy-policy": {
    title: "Privacy Policy | PixelForge",
    description:
      "Informativa sulla privacy di PixelForge: quali dati raccogliamo tramite il sito pixforge.ch, come li usiamo, con chi li condividiamo e quali sono i tuoi diritti.",
    canonicalPath: "/privacy-policy",
  },
  "/cookie-policy": {
    title: "Cookie Policy | PixelForge",
    description:
      "Quali cookie usa pixforge.ch, a cosa servono e come gestire o revocare il tuo consenso in ogni momento. Cookie Policy completa di PixelForge.",
    canonicalPath: "/cookie-policy",
  },
  "/termini-e-condizioni": {
    title: "Termini e Condizioni | PixelForge",
    description:
      "Termini e condizioni d'uso del sito pixforge.ch e dei servizi offerti da PixelForge: proprietà intellettuale, responsabilità e legge applicabile.",
    canonicalPath: "/termini-e-condizioni",
  },
};

function getBlogPostMeta(slug: string): RouteMeta | undefined {
  const post = getPostBySlug(slug);
  if (!post) return undefined;
  const canonicalPath = `/blog/${post.meta.slug}`;
  return {
    title: post.meta.seoTitle,
    description: post.meta.metaDescription,
    canonicalPath,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.meta.title,
      description: post.meta.metaDescription,
      image: [post.meta.coverImage],
      author: {
        "@type": "Organization",
        name: post.meta.author,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      datePublished: post.meta.publishedDate,
      dateModified: post.meta.updatedDate,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}${canonicalPath}`,
      },
    },
  };
}

export function getRouteMeta(pathname: string): RouteMeta {
  const blogSlugMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogSlugMatch) {
    return getBlogPostMeta(blogSlugMatch[1]) ?? STATIC_ROUTE_META["/blog"];
  }
  return STATIC_ROUTE_META[pathname] ?? STATIC_ROUTE_META["/"];
}

/** Every route that should be prerendered as static HTML: fixed pages + every blog slug. */
export function getIndexableRoutePaths(): string[] {
  return [...Object.keys(STATIC_ROUTE_META), ...getAllPosts().map((post) => `/blog/${post.meta.slug}`)];
}
