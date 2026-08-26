// Window.gtag / Window.dataLayer are declared in ./cookieConsent.ts (module
// augmentation applies program-wide regardless of import order).
const GA_MEASUREMENT_ID = "G-XZQE75D04L";

let gaScriptRequested = false;

/**
 * Dynamically injects the Google Analytics (gtag.js) script and initializes it --
 * called only after the visitor has explicitly granted analytics consent (see
 * src/lib/cookieConsent.ts), never on page load. This is a stronger guarantee than
 * relying on Consent Mode alone: the script itself is never fetched from Google's
 * servers until consent exists, not just "fetched but blocked from storing".
 * Idempotent -- safe to call from both "restore prior consent on mount" and
 * "visitor just clicked Accept" without loading the script twice.
 */
export function loadGoogleAnalytics(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (gaScriptRequested) return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
    gaScriptRequested = true;
    return;
  }
  gaScriptRequested = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer!.push(args); };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}
