import { useEffect, useRef, useState } from "react";
import { IS_SERVER, wasPrerendered } from "../lib/prerender";

/**
 * True once the observed element has entered (or is near) the viewport.
 * Fires once, then disconnects -- used to defer mounting/downloading
 * below-the-fold content until it's actually about to be needed.
 *
 * Hydration-safe: on the server (prerendering) and on the client's first render
 * of an already-prerendered page, this starts `true` so the section's real,
 * crawlable content is what both sides render -- see src/lib/prerender.ts. Only
 * a genuine client-only mount (pure SPA fallback, or a later in-app navigation)
 * starts `false` and defers via IntersectionObserver as before.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(rootMargin = "600px 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(IS_SERVER || wasPrerendered);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}
