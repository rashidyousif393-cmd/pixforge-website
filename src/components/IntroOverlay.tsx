import { useEffect, useMemo, useRef, useState } from "react";

const SESSION_KEY = "pf_intro_shown";
const SAFETY_TIMEOUT_MS = 1100;
const LETTERS = "PixelForge".split("");

interface IntroOverlayProps {
  onComplete: () => void;
}

function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Always play in dev so it can be re-checked on every hard refresh while iterating.
  if (import.meta.env.DEV) return true;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  // Hydration-safe: `shouldPlayIntro()` depends on sessionStorage/matchMedia, which
  // don't exist during prerendering and can genuinely differ for a real first-time
  // visitor client-side. Starting at `null` ("not yet determined") guarantees the
  // very first client render matches the server's ("render nothing") exactly; the
  // real value is only decided in the effect below, after mount.
  const [active, setActive] = useState<boolean | null>(null);
  useEffect(() => {
    setActive(shouldPlayIntro());
  }, []);
  const rootRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<SVGRectElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const pfLabelRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const doneRef = useRef(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 0.6,
      })),
    []
  );

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sessionStorage unavailable (private mode etc.) — safe to ignore */
    }
    onComplete();
  };

  useEffect(() => {
    if (active === null) return; // not yet determined -- wait for the effect above
    if (!active) {
      finish();
      return;
    }

    // Absolute safety net: the intro must never trap the visitor, even if the
    // dynamic GSAP import is slow/fails.
    const safetyTimer = window.setTimeout(finish, SAFETY_TIMEOUT_MS);
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    // GSAP is loaded on demand here instead of being statically bundled, so this
    // purely decorative overlay never adds to the critical initial JavaScript.
    import("../lib/gsap").then(({ gsap }) => {
      if (cancelled) return;
      const root = rootRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        const outline = outlineRef.current;
        const logoGroup = logoGroupRef.current;
        const pfLabel = pfLabelRef.current;
        const sweep = sweepRef.current;
        const letters = lettersRef.current.filter(Boolean);
        const particleEls = root.querySelectorAll<HTMLDivElement>("[data-intro-particle]");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => window.clearTimeout(safetyTimer),
        });

        if (outline) tl.set(outline, { strokeDasharray: 100, strokeDashoffset: 100 });
        if (pfLabel) tl.set(pfLabel, { opacity: 0, scale: 0.82 });
        if (letters.length) tl.set(letters, { opacity: 0, y: 22, filter: "blur(6px)" });
        if (sweep) tl.set(sweep, { xPercent: -160, opacity: 0 });
        if (particleEls?.length) tl.set(particleEls, { opacity: 0, scale: 0.3 });

        // Same choreography as before, compressed ~35% (all positions/durations
        // scaled by 0.65) so the branded intro clears the way for real content
        // sooner -- this is the dominant contributor to LCP under throttled
        // mobile conditions for a first-time visitor.
        if (outline) tl.to(outline, { strokeDashoffset: 0, duration: 0.21, ease: "power2.out" }, 0);
        if (particleEls?.length) {
          tl.to(particleEls, { opacity: 0.7, scale: 1, duration: 0.19, stagger: 0.005, ease: "power2.out" }, 0.01);
        }
        if (pfLabel) tl.to(pfLabel, { opacity: 1, scale: 1, duration: 0.16, ease: "back.out(1.7)" }, 0.11);
        if (logoGroup) {
          tl.to(
            logoGroup,
            {
              filter: "drop-shadow(0 0 18px rgba(223,181,28,0.55)) drop-shadow(0 0 32px rgba(0,210,255,0.35))",
              duration: 0.16,
            },
            0.19
          );
        }
        if (letters.length) {
          tl.to(letters, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.19, stagger: 0.016, ease: "power3.out" }, 0.18);
        }
        if (sweep) {
          tl.to(sweep, { xPercent: 160, opacity: 1, duration: 0.30, ease: "power2.inOut" }, 0.19);
          tl.to(sweep, { opacity: 0, duration: 0.11 }, 0.44);
        }

        // Hold the fully-revealed state briefly, then transition out into the Hero.
        tl.to(root, { opacity: 0, scale: 1.04, duration: 0.16, ease: "power2.inOut", onComplete: finish }, 0.49);
      }, root);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
      ctx?.revert();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      role="presentation"
      aria-hidden="true"
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-[#030303] overflow-hidden"
    >
      {/* Depth background: grid + noise + glows, matching the Hero's visual language */}
      <div className="absolute inset-0 pf-grid-bg opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pf-noise-bg opacity-[0.04] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full radial-glow-gold opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[550px] h-[550px] rounded-full radial-glow-blue opacity-20 blur-3xl pointer-events-none" />

      {/* Small ambient particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          data-intro-particle
          className="absolute rounded-full bg-gold-300/70 pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 6px rgba(223,181,28,0.6)",
          }}
        />
      ))}

      {/* Diagonal blue/gold light sweep */}
      <div
        ref={sweepRef}
        className="absolute top-1/2 left-1/2 w-[60%] h-[220%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, transparent 35%, rgba(0,210,255,0.16) 47%, rgba(255,255,255,0.22) 50%, rgba(223,181,28,0.16) 53%, transparent 65%)",
        }}
      />

      {/* Logo + wordmark */}
      <div className="relative flex flex-col items-center gap-5 px-6">
        <div ref={logoGroupRef} className="relative w-20 h-20 sm:w-24 sm:h-24">
          <svg viewBox="0 0 96 96" className="absolute inset-0 w-full h-full" fill="none">
            <defs>
              <linearGradient id="pfIntroGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#dfb51c" />
                <stop offset="100%" stopColor="#00d2ff" />
              </linearGradient>
            </defs>
            <rect
              ref={outlineRef}
              x="3"
              y="3"
              width="90"
              height="90"
              rx="20"
              stroke="url(#pfIntroGrad)"
              strokeWidth="2"
              pathLength={100}
            />
          </svg>
          <div className="absolute inset-[10px] rounded-2xl bg-dark-bg flex items-center justify-center">
            <span ref={pfLabelRef} className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter text-white">
              PF
            </span>
          </div>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white flex">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
              className={`inline-block ${i < 5 ? "text-white" : "text-gradient-gold"}`}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
