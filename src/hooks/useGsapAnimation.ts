import { useEffect, useRef, type DependencyList, type RefObject } from "react";

type GsapType = typeof import("gsap").default;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

export interface GsapAnimationHelpers {
  /** True when the user's OS/browser requests reduced motion. */
  reducedMotion: boolean;
  /** True on touch/coarse-pointer devices or narrow viewports. */
  isTouch: boolean;
  /** The loaded gsap core instance -- loaded on demand, not eagerly bundled. */
  gsap: GsapType;
  /** The loaded ScrollTrigger plugin. */
  ScrollTrigger: ScrollTriggerType;
}

type GsapAnimationSetup<T extends HTMLElement> = (
  scope: RefObject<T>,
  helpers: GsapAnimationHelpers
) => void;

/**
 * Reusable helper for wiring GSAP animations into a component via a scoped ref.
 * GSAP itself is dynamically imported (not statically bundled), so it's never part
 * of the critical/eager initial JavaScript -- it loads on demand after mount, which
 * for eagerly-rendered components (e.g. Hero) means after first paint, and for
 * lazy-mounted below-the-fold sections happens alongside their own chunk anyway.
 * Cleanup mirrors @gsap/react's useGSAP via a manual gsap.context().
 */
export function useGsapAnimation<T extends HTMLElement = HTMLDivElement>(
  setup: GsapAnimationSetup<T>,
  deps: DependencyList = []
): RefObject<T> {
  const scope = useRef<T>(null);

  useEffect(() => {
    if (!scope.current) return;
    let ctx: ReturnType<GsapType["context"]> | undefined;
    let cancelled = false;

    import("../lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !scope.current) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
      ctx = gsap.context(() => setup(scope, { reducedMotion, isTouch, gsap, ScrollTrigger }), scope.current);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
