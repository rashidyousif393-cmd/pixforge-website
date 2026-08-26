import { useEffect } from "react";

const SITE_URL = "https://pixforge.ch";

interface DocumentHeadOptions {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown>;
  /** Injects <meta name="robots" content="noindex, follow"> for the page's lifetime -- used by routes that shouldn't be indexed (e.g. the 404 page). */
  noindex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string): HTMLMetaElement {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

/**
 * Sets the document title, meta description, OG/Twitter tags, canonical link and an
 * optional JSON-LD script for the lifetime of the calling page. Restores the previous
 * title on unmount; the next page sets its own values on mount so nothing else needs
 * to be restored globally.
 */
export function useDocumentHead({ title, description, canonicalPath, jsonLd, noindex }: DocumentHeadOptions) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    // Upserted, not blindly created: the app-shell.html SPA fallback already ships a
    // static noindex tag (see scripts/prerender.mjs), so a route reached through it
    // must update that same element instead of appending a duplicate.
    let robotsMeta: HTMLMetaElement | null = null;
    let robotsWasCreated = false;
    let previousRobotsContent: string | null = null;
    if (noindex) {
      robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
      robotsWasCreated = !robotsMeta;
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.setAttribute("name", "robots");
        document.head.appendChild(robotsMeta);
      }
      previousRobotsContent = robotsMeta.getAttribute("content");
      robotsMeta.setAttribute("content", "noindex, follow");
    }

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", `${SITE_URL}${canonicalPath}`);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalWasCreated = !canonicalEl;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    const previousCanonicalHref = canonicalEl.getAttribute("href");
    canonicalEl.setAttribute("href", `${SITE_URL}${canonicalPath}`);

    let jsonLdScript: HTMLScriptElement | null = null;
    if (jsonLdString) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.text = jsonLdString;
      document.head.appendChild(jsonLdScript);
    }

    return () => {
      document.title = previousTitle;
      if (jsonLdScript) jsonLdScript.remove();
      if (robotsMeta) {
        if (robotsWasCreated) {
          robotsMeta.remove();
        } else if (previousRobotsContent) {
          robotsMeta.setAttribute("content", previousRobotsContent);
        } else {
          robotsMeta.remove();
        }
      }
      if (canonicalEl) {
        if (canonicalWasCreated) {
          canonicalEl.remove();
        } else if (previousCanonicalHref) {
          canonicalEl.setAttribute("href", previousCanonicalHref);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonicalPath, jsonLdString, noindex]);
}
