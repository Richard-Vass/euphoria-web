"use client";

/**
 * Rezervacia typy: Privátna izba, tanečný parket, bar.
 * UI-only — pre live booking uz existuje page.tsx v reservation/.
 * Toto je doplnkovy landing ktory navedie na typ rezervacie.
 */

import Link from "next/link";

interface Props {
  locale: "sk" | "en" | string;
}

const COPY = {
  sk: {
    title: "Aký typ rezervácie vás zaujíma?",
    sub: "Vyberte si zážitok podľa svojich preferencií",
    types: [
      {
        key: "private",
        icon: "♔",
        title: "Privátna izba",
        desc: "Diskrétna privátna izba pre páry. Maximálne súkromie a komfort.",
        cta: "Rezervovať privátnu izbu",
      },
      {
        key: "dance",
        icon: "♪",
        title: "Tanečný parket",
        desc: "Vstup na hlavný parket, top DJ line-up, atmosféra naplno.",
        cta: "Rezervovať vstup",
      },
      {
        key: "bar",
        icon: "✦",
        title: "Bar & lounge",
        desc: "Prémiové koktaily, tichšie prostredie na rozhovor.",
        cta: "Rezervovať bar",
      },
    ],
  },
  en: {
    title: "What kind of reservation?",
    sub: "Choose the experience that suits you",
    types: [
      {
        key: "private",
        icon: "♔",
        title: "Private room",
        desc: "Discreet private room for couples. Maximum privacy and comfort.",
        cta: "Book private room",
      },
      {
        key: "dance",
        icon: "♪",
        title: "Dance floor",
        desc: "Main floor access, top DJ line-up, full atmosphere.",
        cta: "Book entry",
      },
      {
        key: "bar",
        icon: "✦",
        title: "Bar & lounge",
        desc: "Premium cocktails, quieter space for conversation.",
        cta: "Book bar",
      },
    ],
  },
} as const;

export function ReservationTypeCards({ locale }: Props) {
  const copy = COPY[locale === "en" ? "en" : "sk"];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white text-center mb-3">
          {copy.title}
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-xl mx-auto">
          {copy.sub}
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {copy.types.map((t) => (
            <article
              key={t.key}
              className="group bg-gradient-to-b from-purple-900/20 to-black border border-white/10 hover:border-purple-500/40 rounded-2xl p-8 transition-all hover:-translate-y-1"
            >
              <div
                className="w-14 h-14 rounded-full bg-purple-900/40 text-purple-300 flex items-center justify-center text-3xl mb-5"
                aria-hidden
              >
                {t.icon}
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {t.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">
                {t.desc}
              </p>
              <Link
                href={`/${locale}/reservation?type=${t.key}`}
                className="inline-block text-sm font-semibold text-purple-300 hover:text-purple-200 border border-purple-500/30 hover:border-purple-400 px-4 py-2 rounded-lg transition-colors"
              >
                {t.cta} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
