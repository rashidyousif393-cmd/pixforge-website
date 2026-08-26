import { useMemo } from "react";
import ScrollReveal from "./ScrollReveal";
import { useGsapAnimation } from "../hooks/useGsapAnimation";

/**
 * Purely decorative transitional "chapter break" between two dark sections
 * (Services -> Process) that would otherwise be a large flat dead zone since
 * both share the same bg-dark-bg background. Echoes the fullscreen intro's
 * visual language (PF monogram + wordmark, particles, glow) at section scale.
 */
export default function BrandInterlude() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
      })),
    []
  );

  const sectionRef = useGsapAnimation<HTMLElement>((scope, { reducedMotion, isTouch, gsap }) => {
    if (reducedMotion || !scope.current) return;

    const glows = scope.current.querySelectorAll('[data-anim="glow"]');
    const logoGroup = scope.current.querySelector('[data-anim="logo-group"]');
    const bgLayer = scope.current.querySelector('[data-anim="bg-layer"]');

    // Gentle continuous glow pulse on the monogram.
    if (logoGroup) {
      gsap.to(logoGroup, {
        filter: "drop-shadow(0 0 22px rgba(223,181,28,0.5)) drop-shadow(0 0 38px rgba(0,210,255,0.3))",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (isTouch) return;

    // Slow ambient drift on the background glow blobs.
    if (glows.length) {
      gsap.to(Array.from(glows), {
        x: () => gsap.utils.random(-18, 18),
        y: () => gsap.utils.random(-14, 14),
        duration: () => gsap.utils.random(7, 10),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 1, from: "random" },
      });
    }

    // Subtle scroll parallax: background drifts one way, logo the other, for depth.
    if (bgLayer) {
      gsap.to(bgLayer, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }
    if (logoGroup) {
      gsap.to(logoGroup, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="relative flex items-center justify-center min-h-[42vh] sm:min-h-[50vh] py-20 sm:py-28 overflow-hidden"
    >
      <div data-anim="bg-layer" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 pf-grid-bg opacity-40" />
        <div className="absolute inset-0 pf-noise-bg opacity-[0.03] mix-blend-overlay" />
        <div data-anim="glow" className="absolute top-[8%] left-[8%] w-[380px] h-[380px] rounded-full radial-glow-gold opacity-15 blur-3xl" />
        <div data-anim="glow" className="absolute bottom-[8%] right-[8%] w-[420px] h-[420px] rounded-full radial-glow-blue opacity-15 blur-3xl" />
      </div>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold-300/60 pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 6px rgba(223,181,28,0.5)",
          }}
        />
      ))}

      <ScrollReveal effect="zoom" className="relative flex flex-col items-center gap-5 px-6">
        <div data-anim="logo-group" className="relative w-16 h-16 sm:w-20 sm:h-20">
          <svg viewBox="0 0 96 96" className="absolute inset-0 w-full h-full" fill="none">
            <defs>
              <linearGradient id="brandInterludeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#dfb51c" />
                <stop offset="100%" stopColor="#00d2ff" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="90" height="90" rx="20" stroke="url(#brandInterludeGrad)" strokeWidth="2" />
          </svg>
          <div className="absolute inset-[10px] rounded-2xl bg-dark-bg flex items-center justify-center">
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-white">PF</span>
          </div>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white text-center">
          Pixel<span className="text-gradient-gold">Forge</span>
        </h2>
      </ScrollReveal>
    </section>
  );
}
