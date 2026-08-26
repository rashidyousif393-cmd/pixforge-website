import { useEffect, useRef, type RefObject } from "react";

export interface TiltOptions {
  /** Maximum rotation in degrees. */
  max?: number;
  /** Scale applied on hover. */
  scale?: number;
}

/**
 * Reusable 3D tilt + light-follow-ready hover effect for cards.
 * Disabled on touch/coarse-pointer devices and when prefers-reduced-motion is set --
 * on those paths GSAP is never even fetched, since the import only happens below.
 * Sets --pf-glow-x/--pf-glow-y CSS vars (0-100%) for optional light-follow overlays.
 */
export function useTiltEffect<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const { max = 8, scale = 1.02 } = options;

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

      const setRotateX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });
      const setRotateY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });
      const setScale = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power3.out" });

      const handleMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setRotateX(-(py - 0.5) * max);
        setRotateY((px - 0.5) * max);
        el.style.setProperty("--pf-glow-x", `${px * 100}%`);
        el.style.setProperty("--pf-glow-y", `${py * 100}%`);
      };
      const handleEnter = () => setScale(scale);
      const handleLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setScale(1);
      };

      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform";

      el.addEventListener("pointermove", handleMove);
      el.addEventListener("pointerenter", handleEnter);
      el.addEventListener("pointerleave", handleLeave);

      cleanup = () => {
        el.removeEventListener("pointermove", handleMove);
        el.removeEventListener("pointerenter", handleEnter);
        el.removeEventListener("pointerleave", handleLeave);
        gsap.set(el, { clearProps: "transform" });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [max, scale]);

  return ref;
}
