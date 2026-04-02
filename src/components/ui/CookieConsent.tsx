"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts: Record<string, { message: string; accept: string; decline: string }> = {
  sk: {
    message: "Táto stránka používa cookies na zlepšenie vášho zážitku. Pokračovaním súhlasíte s ich používaním.",
    accept: "Súhlasím",
    decline: "Odmietnuť",
  },
  hu: {
    message: "Ez a weboldal sütiket használ a felhasználói élmény javítása érdekében. A folytatással elfogadja a használatukat.",
    accept: "Elfogadom",
    decline: "Elutasítom",
  },
  de: {
    message: "Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. Durch die weitere Nutzung stimmen Sie der Verwendung zu.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
  },
  en: {
    message: "This website uses cookies to improve your experience. By continuing, you agree to their use.",
    accept: "Accept",
    decline: "Decline",
  },
};

export default function CookieConsent({ locale }: { locale: string }) {
  const [show, setShow] = useState(false);
  const t = texts[locale] || texts.en;

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6"
            style={{
              background: "rgba(5, 5, 5, 0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "12px",
              boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <p className="text-sm text-euphoria-muted flex-1 text-center sm:text-left">
              {t.message}
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={handleDecline}
                className="px-5 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:text-white cursor-pointer"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--light-gray)",
                  border: "1px solid rgba(192, 184, 176, 0.3)",
                  borderRadius: "50px",
                  background: "transparent",
                }}
              >
                {t.decline}
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:brightness-110 cursor-pointer"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--black)",
                  background: "linear-gradient(135deg, var(--light-gold), var(--gold))",
                  border: "none",
                  borderRadius: "50px",
                }}
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
