"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const labels = {
  sk: {
    title: "Overenie veku",
    question: "Máte 18 alebo viac rokov?",
    yes: "Áno, mám 18+",
    no: "Nie",
    denied: "Pre vstup na túto stránku musíte mať 18 rokov.",
  },
  cs: {
    title: "Ověření věku",
    question: "Je vám 18 nebo více let?",
    yes: "Ano, je mi 18+",
    no: "Ne",
    denied: "Pro vstup na tuto stránku musíte mít 18 let.",
  },
  hu: {
    title: "Korhatár ellenőrzés",
    question: "Betöltötte a 18. életévét?",
    yes: "Igen, 18+ vagyok",
    no: "Nem",
    denied: "Az oldal megtekintéséhez 18 évesnek kell lennie.",
  },
  de: {
    title: "Altersüberprüfung",
    question: "Sind Sie 18 Jahre oder älter?",
    yes: "Ja, ich bin 18+",
    no: "Nein",
    denied: "Sie müssen 18 Jahre alt sein, um diese Seite zu betreten.",
  },
  en: {
    title: "Age Verification",
    question: "Are you 18 years or older?",
    yes: "Yes, I am 18+",
    no: "No",
    denied: "You must be 18 years old to enter this site.",
  },
};

interface AgeGateProps {
  locale: string;
}

export default function AgeGate({ locale }: AgeGateProps) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("euphoria_age_verified");
    if (stored === "true") {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, []);

  const handleYes = () => {
    sessionStorage.setItem("euphoria_age_verified", "true");
    setVerified(true);
  };

  const handleNo = () => {
    setDenied(true);
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  // Still loading from sessionStorage
  if (verified === null) return null;

  // Already verified
  if (verified) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="age-gate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
        style={{
          background: "rgba(5, 5, 5, 0.97)",
          backdropFilter: "blur(30px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-md w-full p-10"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.15)",
          }}
        >
          {/* Logo */}
          <Image
            src="/images/logo-figure-transparent.png"
            alt="Euphoria"
            width={120}
            height={120}
            className="w-24 h-24 mx-auto mb-6 object-contain"
          />

          {/* Gold line */}
          <div
            className="w-20 h-[1px] mx-auto mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--crimson), var(--gold), var(--crimson), transparent)",
            }}
          />

          {!denied ? (
            <>
              <h2
                className="text-2xl uppercase tracking-wider mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--gold)",
                  letterSpacing: "0.15em",
                }}
              >
                {t.title}
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: "var(--cream)", fontFamily: "var(--font-body)" }}
              >
                {t.question}
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleYes}
                  className="btn-primary px-8 py-3 text-sm uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {t.yes}
                </button>
                <button
                  onClick={handleNo}
                  className="btn-secondary px-8 py-3 text-sm uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {t.no}
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="text-lg mb-6"
                style={{ color: "var(--crimson)", fontFamily: "var(--font-body)" }}
              >
                {t.denied}
              </p>
              <a
                href="https://www.google.com"
                className="inline-block text-sm uppercase tracking-wider hover:text-[var(--gold)] transition-colors"
                style={{
                  color: "var(--light-gray)",
                  fontFamily: "var(--font-ui)",
                  letterSpacing: "0.1em",
                }}
              >
                &larr; {locale === "sk" ? "Odísť" : locale === "cs" ? "Odejít" : locale === "hu" ? "Kilépés" : locale === "de" ? "Verlassen" : "Leave"}
              </a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
