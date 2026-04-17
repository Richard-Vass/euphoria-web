"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const labels: Record<string, string> = {
  sk: "Rezervovať",
  cs: "Rezervovat",
  hu: "Foglalás",
  de: "Reservieren",
  en: "Reserve",
};

interface Props {
  locale: Locale;
}

/**
 * Sticky button na mobile, viditeľný po scroll > 400px.
 * Desktop: schovaný.
 * Nestrašné s ostatnými ui (BackToTop, WhatsApp) — pozícia bottom-20 left.
 */
export default function StickyMobileCTA({ locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href={`/${locale}/reservation`}
      aria-label={labels[locale] || labels.en}
      className={`
        md:hidden fixed bottom-4 left-4 z-50
        px-5 py-3 rounded-full
        bg-gradient-to-r from-[#dc143c] via-[#c41e2a] to-[#8b0000]
        text-white font-semibold text-sm
        shadow-[0_8px_25px_rgba(196,30,42,0.4)]
        flex items-center gap-2
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      <Calendar className="w-4 h-4" aria-hidden="true" />
      {labels[locale] || labels.en}
    </Link>
  );
}
