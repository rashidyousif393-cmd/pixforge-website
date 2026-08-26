import React, { useState, useEffect, useRef } from "react";
import { Bot, X, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
// @n8n/chat pulls in its own Vue runtime (~1.5MB) -- dynamically imported only once
// the user actually opens the chat, instead of a static top-level import, so that
// heavy chunk never loads (or blocks the main thread) during initial page load.

interface AIChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AIChatWidget({ isOpen, setIsOpen }: AIChatWidgetProps) {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const chatInstanceRef = useRef<any>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const webhookUrl = "https://pixforge.app.n8n.cloud/webhook/fb006c65-9337-4d53-a75e-765a52cf7583/chat";

  const btnText = language === "it" ? "Parla con PixForge AI" : "Chat with PixForge AI";
  const statusText = language === "it" ? "Online • Sempre attivo" : "Online • Always active";

  // Safe check for mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (typeof window === "undefined" || typeof document === "undefined") return;

    if (isOpen) {
      if (chatInstanceRef.current) return;
      let cancelled = false;

      // Small timeout to guarantee `#n8n-chat-container` is rendered in the DOM
      const timer = setTimeout(() => {
        // The heavy @n8n/chat + Vue bundle is fetched here, on first open, not on
        // initial page load.
        Promise.all([import("@n8n/chat"), import("@n8n/chat/style.css")])
          .then(([{ createChat }]) => {
            if (cancelled) return;
            if (typeof window === "undefined" || typeof document === "undefined") return;
            if (chatInstanceRef.current) return;

            const chat = createChat({
              webhookUrl: webhookUrl,
              target: '#n8n-chat-container',
              mode: 'fullscreen',
              showWelcomeScreen: false,
              initialMessages: [
                '👋 Benvenuto su PixelForge!',
                'Come posso aiutarti oggi?'
              ]
            });

            chatInstanceRef.current = chat;
          })
          .catch((error) => {
            console.error("Error initializing n8n chat:", error);
          });
      }, 50);

      return () => {
        cancelled = true;
        clearTimeout(timer);
        if (chatInstanceRef.current) {
          if (typeof chatInstanceRef.current.unmount === "function") {
            try {
              chatInstanceRef.current.unmount();
            } catch (e) {
              // Ignore unmount error
            }
          }
          chatInstanceRef.current = null;
        }
      };
    }
  }, [isOpen, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <style>{`
        #n8n-chat-container {
          --chat--color--primary: #dfb51c !important;
          --chat--color--primary-shade-50: #c19213 !important;
          --chat--color--primary--shade-100: #9a6d10 !important;
          --chat--color--secondary: #dfb51c !important;
          --chat--color-secondary-shade-50: #c19213 !important;
          --chat--color-white: #ffffff !important;
          --chat--color-light: #0c0c0e !important;
          --chat--color-light-shade-50: #1a1a1e !important;
          --chat--color-light-shade-100: #2a2a2e !important;
          --chat--color-medium: #1a1a1e !important;
          --chat--color-dark: #030303 !important;
          --chat--color-disabled: #44444c !important;
          --chat--color-typing: #dfb51c !important;
          --chat--message--bot--background: #0c0c0e !important;
          --chat--message--bot--color: #ffffff !important;
          --chat--message--bot--border: 1px solid #1a1a1e !important;
          --chat--message--user--background: #dfb51c !important;
          --chat--message--user--color: #030303 !important;
          --chat--body--background: #030303 !important;
          --chat--input--background: #0c0c0e !important;
          --chat--input--text-color: #ffffff !important;
          --chat--input--container--background: #0c0c0e !important;
          --chat--input--container--border: 1px solid #1a1a1e !important;
          --chat--footer--background: #0c0c0e !important;
          --chat--footer--color: #a1a1aa !important;
          --chat--footer--border-top: 1px solid #1a1a1e !important;
          --chat--font-family: "Plus Jakarta Sans", sans-serif !important;
          width: 100%;
          height: 100%;
        }

        /* Adjust internal styles for full integration and scrollbars */
        #n8n-chat-container textarea {
          color: #ffffff !important;
          background: #0c0c0e !important;
        }
        #n8n-chat-container .chat-layout {
          background-color: #030303 !important;
        }
        #n8n-chat-container .chat-body {
          background-color: #030303 !important;
        }
        /* Hide any n8n header to let our custom React header stand out */
        #n8n-chat-container .chat-header {
          display: none !important;
        }

        /* Floating Button Container.
           Base (mobile/tablet, <1024px): compact position, clear of the WhatsApp/Google row.
           The width/height square lock only applies below 640px, matching the button's own
           circle-vs-pill breakpoint below -- forcing it above that range clipped the text label. */
        .aichat-launcher-container {
          position: fixed;
          right: 16px;
          bottom: calc(90px + env(safe-area-inset-bottom));
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          pointer-events: none;
        }
        @media (max-width: 639px) {
          .aichat-launcher-container {
            width: 56px !important;
            height: 56px !important;
          }
        }
        /* Desktop (matches the lg breakpoint the WhatsApp/Google Review buttons switch at):
           sit above that row instead of overlapping it. */
        @media (min-width: 1024px) {
          .aichat-launcher-container {
            bottom: 100px;
            right: 32px;
          }
        }

        /* Floating Button Style */
        .aichat-launcher-button {
          pointer-events: auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: rgba(9, 9, 11, 0.9) !important; /* zinc-950/90 */
          border: 1px solid rgba(223, 181, 28, 0.3) !important; /* gold-500/30 */
          color: #ffffff !important;
          font-family: ui-sans-serif, system-ui, sans-serif !important;
          font-size: 0.75rem !important; /* text-xs */
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer !important;
          overflow: visible;
        }
        .aichat-launcher-button:hover {
          background-color: #121214 !important; /* zinc-900 */
          border-color: rgba(223, 181, 28, 0.6) !important;
          color: #f3d443 !important; /* gold-400 */
        }
        .aichat-launcher-button:active {
          transform: scale(0.95) !important;
        }
        @media (min-width: 640px) {
          .aichat-launcher-button {
            border-radius: 9999px !important;
            padding: 12px 20px !important;
          }
        }
        @media (max-width: 639px) {
          .aichat-launcher-button {
            width: 56px !important;
            height: 56px !important;
            border-radius: 50% !important;
            padding: 0 !important;
          }
        }

        /* Mobile & Desktop Chat Window */
        .aichat-window-container {
          position: fixed;
          z-index: 999999 !important;
          display: flex;
          flex-direction: column;
          background-color: #09090b !important; /* zinc-950 */
          border: 1px solid rgba(223, 181, 28, 0.2) !important; /* gold-500/20 */
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.8) !important;
          overflow: hidden;
          pointer-events: auto;
        }
        @media (min-width: 640px) {
          .aichat-window-container {
            bottom: 24px !important;
            right: 24px !important;
            width: 440px !important;
            height: 620px !important;
            border-radius: 1rem !important; /* rounded-2xl */
          }
        }
        @media (max-width: 639px) {
          .aichat-window-container {
            right: 12px !important;
            bottom: calc(82px + env(safe-area-inset-bottom)) !important;
            width: calc(100vw - 24px) !important;
            max-width: 380px !important;
            height: min(70vh, 600px) !important;
            border-radius: 1rem !important; /* rounded-2xl */
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes chatPopIn {
          from { opacity: 0; transform: scale(0.95) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Floating Button */}
      <div className="aichat-launcher-container ai-floating-button">
        <div className="pointer-events-auto w-full h-full sm:w-auto sm:h-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="aichat-launcher-button group"
            title={btnText}
          >
            <Bot className="w-5 h-5 sm:w-4 sm:h-4 text-gold-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden sm:inline">{btnText}</span>
            <Sparkles className="hidden sm:inline w-3 h-3 text-gold-500/80 animate-pulse ml-0.5" />

            {/* Pulsing Badge on top-right of the launcher */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Modern Popup Chat window */}
      {isOpen && (
          <>
            {/* Backdrop overlay for mobile */}
            <div
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden pointer-events-auto z-[999998] ${
                prefersReducedMotion ? "" : "animate-[fadeIn_0.3s_ease-out]"
              }`}
            />

            {/* Chat Box Container */}
            <div
              className={`aichat-window-container ${
                prefersReducedMotion ? "" : "animate-[chatPopIn_0.35s_cubic-bezier(0.16,1,0.3,1)]"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500">
                    <Bot className="w-5 h-5" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-zinc-950 rounded-full"></span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-display text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                      PixelForge AI
                      <span className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-gold-500/10 text-gold-400 border border-gold-500/20">
                        PRO
                      </span>
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-sans">
                      {statusText}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat embed container */}
              <div className="flex-1 bg-zinc-950 relative overflow-hidden">
                <div id="n8n-chat-container" className="w-full h-full" />
              </div>

              {/* Footer Brand Seal */}
              <div className="px-5 py-2.5 border-t border-zinc-900 bg-zinc-950 text-center text-[10px] text-zinc-400 font-mono tracking-wider flex items-center justify-center gap-1">
                <span>POWERED BY PIXELFORGE CORE ENGINE</span>
              </div>
            </div>
          </>
      )}
    </>
  );
}
