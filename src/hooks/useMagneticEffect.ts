import { useEffect, useRef, type RefObject } from "react";

/**
 * Reusable magnetic-hover pull effect for buttons/CTAs.
 * Disabled on touch/coarse-pointer devices and when prefers-reduced-motion is set --
 * on those paths GSAP is never even fetched, since the import only happens below.
 */
export function useMagneticEffect<T extends HTMLElement = HTMLElement>(
  strength = 0.35
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("../lib/gsap").then(({ gsap }) => {
      if (cancelled) return;

      const setX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const setY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const handleMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        setX(relX * strength);
        setY(relY * strength);
      };
      const handleLeave = () => {
        setX(0);
        setY(0);
      };

      el.addEventListener("pointermove", handleMove);
      el.addEventListener("pointerleave", handleLeave);

      cleanup = () => {
        el.removeEventListener("pointermove", handleMove);
        el.removeEventListener("pointerleave", handleLeave);
        gsap.set(el, { clearProps: "transform" });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [strength]);

  return ref;
}
