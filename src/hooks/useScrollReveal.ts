import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll trigger, sibling to useInView.ts's lazy-mount trigger but tuned
 * for visual reveals: fires once when the element is actually nearing the viewport
 * (not 600px early like the lazy-mount case), then disconnects.
 *
 * Unlike useInView (one IntersectionObserver per call -- fine for the handful of
 * LazySection instances), this is meant to back potentially dozens of reveal targets
 * per page (every card in every grid), so it shares a single IntersectionObserver
 * across all instances instead of creating one per element.
 */
let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, () => void>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealCallbacks.get(entry.target)?.();
        sharedObserver?.unobserve(entry.target);
        revealCallbacks.delete(entry.target);
      }
    },
    // threshold: 0 (not e.g. 0.15) is required, not just a stricter/looser knob:
    // effects that hide via clip-path (see .scroll-reveal--image-cinematic) start
    // with zero *visible* area by design, so their intersection ratio is pinned at
    // 0 no matter how far into the viewport they scroll. Any threshold > 0 can
    // never be crossed for those targets -- a permanent reveal deadlock -- while
    // threshold 0 still reports `isIntersecting: true` from geometric overlap
    // alone, which is what unblocks them (confirmed empirically while wiring up
    // the redesign's first real usage of image-cinematic).
    { threshold: 0, rootMargin: "0px 0px -8% 0px" }
  );
  return sharedObserver;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = getSharedObserver();
    if (!observer) {
      // No IntersectionObserver support: fail open rather than hide content forever.
      setVisible(true);
      return;
    }

    revealCallbacks.set(el, () => setVisible(true));
    observer.observe(el);

    return () => {
      revealCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, []);

  return { ref, visible };
}
