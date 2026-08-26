import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 24;

/**
 * Global background (src/components/StudioExperience.tsx): fixed behind the entire
 * site, pointer-events-none, background-only. Deep navy-to-black gradient, grid,
 * glowing blue orbit circles, soft light beams, floating particles and a vignette.
 * --scroll-y / --scroll-y-slow are set from a single rAF-throttled scroll listener
 * and consumed by the CSS keyframes/transforms for a gentle parallax.
 */
export default function StudioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      root.style.setProperty("--scroll-y", `${Math.min(80, y * 0.04)}px`);
      root.style.setProperty("--scroll-y-slow", `${Math.min(30, y * 0.015)}px`);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="animated-background" aria-hidden="true">
      <div className="animated-background__base" />
      <div className="animated-background__grid">
        <div className="animated-background__grid-pattern" />
      </div>

      <div className="animated-background__orbit animated-background__orbit--one" />
      <div className="animated-background__orbit animated-background__orbit--two" />
      <div className="animated-background__orbit animated-background__orbit--three" />

      <div className="animated-background__beam animated-background__beam--one" />
      <div className="animated-background__beam animated-background__beam--two" />

      <div className="animated-background__particles">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span key={i} className={`animated-background__particle particle-${i + 1}`} />
        ))}
      </div>

      <div className="animated-background__vignette" />
    </div>
  );
}
