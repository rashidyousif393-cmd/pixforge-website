import { ArrowRight, Search, Zap, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useGsapAnimation } from "../hooks/useGsapAnimation";
import { useMouseParallax } from "../hooks/useMouseParallax";
import { useMagneticEffect } from "../hooks/useMagneticEffect";
import ScrollReveal from "./ScrollReveal";

/**
 * Splits a phrase into word-mask spans for the CSS-only staggered reveal
 * (.hero-word-mask, see index.css). Pure render-time work, no state/effect --
 * preserves the Hero's "must never depend on JS completing" guarantee, since
 * this only decides *inline animation-delay values*, not visibility itself.
 */
function StaggeredWords({
  text,
  startDelay,
  step = 0.038,
  gradientClassName,
}: {
  text: string;
  startDelay: number;
  step?: number;
  /** Applied on the innermost text-bearing span, not a wrapping element --
      background-clip: text only clips against an element's own glyphs, so a
      gradient class on an ancestor of these display:inline-block word masks
      silently renders nothing (confirmed while QA-ing this: the words were
      present and correctly positioned in the DOM, just invisible). */
  gradientClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        // The space between words is a plain sibling text node, NOT trailing
        // content inside the overflow:hidden mask -- a space at the very end
        // of an inline-block's own content gets collapsed away by the browser
        // (same rule as trailing whitespace at a line-end), which silently ate
        // every inter-word gap when the space lived inside the mask instead.
        <span key={i}>
          <span className="hero-word-mask">
            <span
              className={gradientClassName}
              style={{ animationDelay: `${(startDelay + i * step).toFixed(3)}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const { language, t } = useLanguage();

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const industries = t("hero.industries") as string[];
  const clientLogos = t("hero.logos") as Array<{ name: string; locale: string }>;

  const titlePre = t("hero.titlePre") as string;
  const titleGradient = t("hero.titleGradient") as string;
  const titlePost = t("hero.titlePost") as string | undefined;

  // Continuous stagger budget across the three headline fragments -- each
  // fragment picks up its word-delay offset where the previous one left off,
  // so the whole headline reads as one uninterrupted cinematic reveal instead
  // of three separately-timed blocks.
  const HEADLINE_START = 0.18;
  const WORD_STEP = 0.038;
  const preWords = titlePre.split(" ").length;
  const gradientStart = HEADLINE_START + preWords * WORD_STEP;
  const gradientWords = titleGradient.split(" ").length;
  const postStart = gradientStart + gradientWords * WORD_STEP;

  // The Hero sits directly on the shared global background (StudioExperience,
  // rendered once at the top of HomePage) instead of running its own aurora/particle
  // layer -- one background system for the whole site. Headline/subtitle still use a
  // fast pure-CSS entrance (no async GSAP dependency, no flash-of-hidden-content);
  // GSAP itself only drives the ambient scroll-exit fade and the visual panel's
  // depth parallax below.
  const heroRef = useGsapAnimation<HTMLElement>((scope, { reducedMotion, gsap }) => {
    if (reducedMotion || !scope.current) return;

    const content = scope.current.querySelector('[data-hero-anim="content"]');
    if (content) {
      gsap.to(content, {
        yPercent: -10,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    // Layered depth: the visual panel drifts opposite the text on scroll, at a
    // different rate than the whole-content fade above -- foreground/background
    // moving at different speeds is what actually sells "depth", not just an
    // opacity fade. Desktop is covered by useMouseParallax below too; this is
    // the scroll-driven half of the same panel's motion.
    const visual = scope.current.querySelector('[data-hero-anim="visual"]');
    if (visual) {
      gsap.to(visual, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }
  }, []);

  // Subtle pointer-follow tilt (desktop only, self-gated) -- headline and visual
  // panel drift at different strengths for a mild parallax-depth illusion.
  const parallaxRef = useMouseParallax<HTMLElement>([
    { selector: '[data-hero-anim="headline"]', strength: 8 },
    { selector: '[data-hero-anim="visual"]', strength: 16 },
  ]);

  const setHeroRefs = (el: HTMLElement | null) => {
    heroRef.current = el;
    parallaxRef.current = el;
  };

  const magneticCtaRef = useMagneticEffect<HTMLButtonElement>(0.3);

  return (
    <section
      id="home"
      ref={setHeroRefs}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <div data-hero-anim="content" className="relative z-10 flex-1 flex items-center px-5 sm:px-8 lg:px-10 py-32 sm:py-36 lg:py-24">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Text column -- left-anchored, editorial composition instead of the
              previous dead-centered block. */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

            {/* The LCP candidate on this page -- uses the same fast pure-CSS entrance as
                the headline/subtitle below instead of ScrollReveal, so its first paint
                isn't gated behind React mount + IntersectionObserver firing. */}
            <div className="hero-fade-in-0 kicker justify-center lg:justify-start">
              {t("hero.badge")}
            </div>

            {/* Main Headline -- oversized editorial statement scale, revealed word by
                word via a pure-CSS mask (no JS dependency for the reveal itself). */}
            <h1
              data-hero-anim="headline"
              className="font-display font-extrabold tracking-tight text-white leading-[0.99] [overflow-wrap:break-word] break-words max-w-full"
              style={{ fontSize: "clamp(2.75rem, 1rem + 5.8vw, 6.25rem)" }}
            >
              <StaggeredWords text={titlePre} startDelay={HEADLINE_START} step={WORD_STEP} />{" "}
              <StaggeredWords
                text={titleGradient}
                startDelay={gradientStart}
                step={WORD_STEP}
                gradientClassName="text-gradient-gold"
              />
              {titlePost ? (
                <>
                  {" "}
                  <StaggeredWords
                    text={titlePost}
                    startDelay={postStart}
                    step={WORD_STEP}
                    gradientClassName="text-gradient-blue"
                  />
                </>
              ) : null}
            </h1>

            <p
              data-hero-anim="subtitle"
              className="hero-fade-in-2 font-sans text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-light"
            >
              {t("hero.subtitle")}
            </p>

            <div className="hero-fade-in-3 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 font-mono text-[11px] tracking-wider text-zinc-500">
              {industries.map((industry, index) => (
                <span key={index} className="hover:text-gold-400 transition-colors duration-300">
                  {industry}{index < industries.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>

            <div className="hero-fade-in-4 flex flex-col sm:flex-row gap-4 pt-2">
              <button
                ref={magneticCtaRef}
                onClick={() => handleScrollTo("#contatti")}
                className="btn-primary group"
              >
                {t("common.btnDemo")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleScrollTo("#portfolio")}
                className="btn-secondary group"
              >
                {t("common.btnProjects")}
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>

            <div className="hero-fade-in-5 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3 pt-6 text-xs font-semibold text-zinc-500">
              <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-gold-400" />{t("hero.speedScore")}</span>
              <span className="hidden sm:inline text-zinc-800">/</span>
              <span className="flex items-center gap-2"><Search className="w-3.5 h-3.5 text-electric-blue" />{t("hero.localSeo")}</span>
              <span className="hidden sm:inline text-zinc-800">/</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{t("hero.noHiddenCosts")}</span>
            </div>
          </div>

          {/* Visual column -- a fixed-shape "slot" (see .hero-visual-panel in index.css)
              so the current placeholder can be swapped for a custom editorial photo or
              video later without touching this layout. Curtain-mask reveal reuses the
              same ScrollReveal infrastructure as the rest of the site; because the Hero
              is always in the initial viewport, its IntersectionObserver fires almost
              immediately after mount -- effectively an entrance, not a scroll-gate. */}
          <div className="lg:col-span-4 w-full" data-hero-anim="visual">
            <ScrollReveal
              effect="image-cinematic"
              delay={120}
              duration={1000}
              className="hero-visual-panel w-full max-w-md mx-auto lg:mx-0 aspect-[5/6] border border-white/[0.06] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
            >
              <img
                src="/images/pixelforge-hero-premium-1400.webp"
                srcSet="/images/pixelforge-hero-premium-800.webp 800w, /images/pixelforge-hero-premium-1400.webp 1400w"
                sizes="(max-width: 1024px) 90vw, 34vw"
                alt="Interfaccia web premium progettata da PixelForge, visualizzata su desktop, laptop e smartphone"
                width={1400}
                height={876}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: "62% 42%" }}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Client Logos Ticker */}
      <div className="relative w-full border-t border-b border-zinc-900/80 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-3">
          <p className="text-center font-mono text-[9px] tracking-widest text-zinc-500 uppercase font-bold">
            {language === "it"
              ? "FIDUCIA SVIZZERA: AZIENDE LOCALI CHE CRESCONO INSIEME A NOI"
              : "SWISS TRUST: LOCAL BUSINESSES GROWING SUCCESSFULLY WITH PIXELFORGE"}
          </p>
        </div>

        <div className="flex overflow-hidden select-none gap-16 w-full">
          <div className="flex shrink-0 justify-around min-w-full gap-16 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {clientLogos.concat(clientLogos).map((client, index) => (
              <div
                key={index}
                className="flex items-center gap-2 hover:opacity-100 opacity-40 transition-opacity duration-300"
              >
                <div className="w-2.5 h-2.5 rounded bg-gold-500" />
                <span className="font-display font-extrabold text-sm sm:text-base text-zinc-300 tracking-wider">
                  {client.name.toUpperCase()}
                </span>
                <span className="font-mono text-[9px] text-zinc-600 px-1.5 py-0.5 border border-zinc-900 rounded">
                  {client.locale}
                </span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 justify-around min-w-full gap-16 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" aria-hidden="true">
            {clientLogos.concat(clientLogos).map((client, index) => (
              <div
                key={index}
                className="flex items-center gap-2 hover:opacity-100 opacity-40 transition-opacity duration-300"
              >
                <div className="w-2.5 h-2.5 rounded bg-gold-500" />
                <span className="font-display font-extrabold text-sm sm:text-base text-zinc-300 tracking-wider">
                  {client.name.toUpperCase()}
                </span>
                <span className="font-mono text-[9px] text-zinc-600 px-1.5 py-0.5 border border-zinc-900 rounded">
                  {client.locale}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
