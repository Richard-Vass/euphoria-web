"use client";

/**
 * Mobile sticky CTA — zobrazuje sa len na mobile (<md).
 * Dve tlacitka: rezervacia + volat.
 * Na desktop skryte. Nereaguje kym user neposcrolluje.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

const COPY = {
  sk: { reserve: "Rezervovať", call: "Volať" },
  en: { reserve: "Book", call: "Call" },
} as const;

interface Props {
  locale: "sk" | "en" | string;
  phoneHref?: string;
}

export function MobileStickyCta({
  locale,
  phoneHref = "tel:+421000000000",
}: Props) {
  const [show, setShow] = useState(false);
  const copy = COPY[locale === "en" ? "en" : "sk"];

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onScroll() {
      setShow(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-t from-black/95 to-black/85 backdrop-blur-md border-t border-white/10 p-3 grid grid-cols-2 gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
      role="complementary"
      aria-label="Quick actions"
    >
      <Link
        href={`/${locale}/reservation`}
        className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg text-center text-sm shadow-lg shadow-purple-900/40"
      >
        {copy.reserve}
      </Link>
      <a
        href={phoneHref}
        className="border border-white/20 hover:border-purple-400 text-white font-semibold py-3 rounded-lg text-center text-sm"
      >
        {copy.call}
      </a>
    </div>
  );
}
