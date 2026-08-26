import React, { useMemo, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export type ScrollRevealEffect = "fade-up" | "fade-left" | "fade-right" | "zoom" | "image-cinematic";

interface ScrollRevealProps {
  /** Direction/style of the reveal. Defaults to "fade-up". */
  effect?: ScrollRevealEffect;
  /** Stagger delay in ms -- e.g. `index * 80` for a grid of cards. */
  delay?: number;
  /** Transition duration in ms. Defaults to the CSS value (700ms). */
  duration?: number;
  className?: string;
  /** Wrapper tag, e.g. "section"/"h2" to avoid an extra div where semantics matter. */
  as?: ElementType;
  children: ReactNode;
}

/**
 * Lightweight, dependency-free scroll-reveal wrapper: IntersectionObserver (shared
 * across all instances via useScrollReveal) flips a class once the element nears the
 * viewport; the actual animation is a plain CSS transition (see .scroll-reveal* rules
 * in index.css), which also means it's automatically inert under prefers-reduced-motion.
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  effect = "fade-up",
  delay = 0,
  duration,
  className = "",
  as = "div",
  children,
}) => {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const Tag = as as any;

  const style: CSSProperties = useMemo(() => {
    const s: CSSProperties = {};
    if (delay) s.transitionDelay = `${delay}ms`;
    if (duration) s.transitionDuration = `${duration}ms`;
    return s;
  }, [delay, duration]);

  const classes = [
    "scroll-reveal",
    `scroll-reveal--${effect}`,
    visible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} style={style}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
