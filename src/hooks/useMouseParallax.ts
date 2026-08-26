import { useEffect, useRef, type RefObject } from "react";

export interface ParallaxLayer {
  /** CSS selector (scoped to the container) for the element(s) in this depth layer. */
  selector: string;
  /** Max travel distance in px. */
  strength: number;
}

/**
 * Multi-layer mouse-parallax: as the pointer moves within the returned container,
 * each matched layer offsets on x/y proportionally to its own `strength`, creating
 * a depth illusion. Disabled on touch/coarse-pointer devices and prefers-reduced-motion.
 *
 * Only animates x/y via GSAP quickTo -- pair with layers that don't already have
 * another tween touching x/y (e.g. an ambient auto-drift), or the two will fight.
 */
export function useMouseParallax<T extends HTMLElement = HTMLElement>(
  layers: ParallaxLayer[]
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || layers.length === 0) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // GSAP is loaded on demand (see useGsapAnimation) so this never adds to the
    // critical initial bundle.
    import("../lib/gsap").then(({ gsap }) => {
      if (cancelled) return;

      const setters = layers.flatMap(({ selector, strength }) =>
        Array.from(container.querySelectorAll<HTMLElement>(selector)).map((el: HTMLElement) => ({
          el,
          setX: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
          setY: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          strength,
        }))
      );
      if (!setters.length) return;

      const handleMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        setters.forEach(({ setX, setY, strength }) => {
          setX(relX * strength);
          setY(relY * strength);
        });
      };
      const handleLeave = () => {
        setters.forEach(({ setX, setY }) => {
          setX(0);
          setY(0);
        });
      };

      container.addEventListener("pointermove", handleMove);
      container.addEventListener("pointerleave", handleLeave);

      cleanup = () => {
        container.removeEventListener("pointermove", handleMove);
        container.removeEventListener("pointerleave", handleLeave);
        setters.forEach(({ el }) => gsap.set(el, { clearProps: "transform" }));
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
    // Layers are expected to be a stable/static config from the caller (mirrors
    // useTiltEffect/useMagneticEffect using primitive deps rather than object identity).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
