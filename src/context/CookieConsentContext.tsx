import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getStoredConsent, setStoredConsent, type StoredConsent } from "../lib/cookieConsent";
import { loadGoogleAnalytics } from "../lib/analytics";

interface CookieConsentContextValue {
  /** Null until the visitor has made a choice (banner should be visible in that case). */
  consent: StoredConsent | null;
  /** True while the banner/settings panel should be shown -- first visit, or reopened manually. */
  isPanelOpen: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  /** Re-opens the panel so a returning visitor can change their choice (footer "Gestisci preferenze cookie"). */
  openSettings: () => void;
  closePanel: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    setIsPanelOpen(!stored);
    // Returning visitor who already granted analytics consent on a previous visit:
    // load gtag.js now. Nothing loads for a first-time visitor or a prior "reject".
    if (stored?.analytics) loadGoogleAnalytics();
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isPanelOpen,
      acceptAll: () => {
        setConsent(setStoredConsent(true));
        setIsPanelOpen(false);
      },
      rejectOptional: () => {
        setConsent(setStoredConsent(false));
        setIsPanelOpen(false);
      },
      openSettings: () => setIsPanelOpen(true),
      closePanel: () => setIsPanelOpen(false),
    }),
    [consent, isPanelOpen]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
