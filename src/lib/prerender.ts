/**
 * Shared signal for hydration-safe below-the-fold rendering.
 *
 * `LazySection`/`useInView` normally defer mounting off-screen content until it
 * scrolls into view (both hooks start at `false` on every render). That's wrong
 * for a prerendered page: the whole point of prerendering is that this content
 * already exists as real, crawlable HTML, so the very first client render must
 * also treat it as "in view" -- otherwise the client would discard/re-hide markup
 * the server just sent, and React would report a hydration mismatch.
 *
 * `wasPrerendered` is computed once, at module-eval time, from whether `#root`
 * already contains server-rendered markup when this script starts running --
 * true for every prerendered route, false for the empty `app-shell.html` SPA
 * fallback (pure client render, where the original scroll-gated behavior is
 * both correct and still desirable).
 */
export const wasPrerendered =
  typeof document !== "undefined" && !!document.getElementById("root")?.firstElementChild;

export const IS_SERVER = typeof window === "undefined";
