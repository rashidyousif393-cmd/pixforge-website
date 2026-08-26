import { loadGoogleAnalytics } from "./analytics";

export type ConsentChoice = "accepted" | "rejected";

export interface StoredConsent {
  analytics: boolean;
  choice: ConsentChoice;
  timestamp: string;
}

const STORAGE_KEY = "pf_cookie_consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Reads the visitor's stored consent choice, if any (null = never asked). */
export function getStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === "boolean") return parsed as StoredConsent;
    return null;
  } catch {
    return null;
  }
}

function applyToGtag(analyticsGranted: boolean) {
  // The gtag.js library itself is only ever fetched here, when consent is actually
  // granted -- never on page load, never speculatively. Rejecting never loads it.
  if (!analyticsGranted) return;
  loadGoogleAnalytics();
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
}

/** Persists the visitor's choice and immediately updates Google's Consent Mode signal. */
export function setStoredConsent(analytics: boolean): StoredConsent {
  const record: StoredConsent = {
    analytics,
    choice: analytics ? "accepted" : "rejected",
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* localStorage unavailable (private mode etc.) -- consent still applies for this session */
  }
  applyToGtag(analytics);
  return record;
}
