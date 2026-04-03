import { Locale, getDictionary } from "@/lib/i18n";
import { Gift, Wine, Clock, Sparkles } from "lucide-react";
import type { Metadata } from "next";

const WHATSAPP_NUMBER = "421950480799";

const translations = {
  sk: {
    title: "Darčekové poukážky",
    subtitle: "Darujte zážitok, ktorý sa nezabudne",
    buy: "Kúpiť",
    includes: "Zahŕňa",
    voucher50: {
      name: "Poukážka Classic",
      desc: "Ideálny darček pre prvú návštevu",
      items: ["2x prémiový koktail", "1 hodina v privátnej izbe"],
    },
    voucher100: {
      name: "Poukážka Gold",
      desc: "Večer plný luxusu a pohody",
      items: ["4x prémiový koktail", "2 hodiny v privátnej izbe", "Bottle service"],
    },
    voucher200: {
      name: "Poukážka Platinum",
      desc: "Nezabudnuteľný zážitok na celý večer",
      items: ["8x prémiový koktail", "4 hodiny v privátnej izbe", "Bottle service", "Privátny barman"],
    },
    whatsappMsg: "Dobrý deň, mám záujem o darčekovú poukážku",
    note: "Po zakúpení vám zašleme elegantný voucher v digitálnej alebo tlačenej forme.",
  },
  cz: {
    title: "Dárkové poukazy",
    subtitle: "Darujte zážitek, který se nezapomene",
    buy: "Koupit",
    includes: "Zahrnuje",
    voucher50: {
      name: "Poukaz Classic",
      desc: "Ideální dárek pro první návštěvu",
      items: ["2x prémiový koktejl", "1 hodina v privátním pokoji"],
    },
    voucher100: {
      name: "Poukaz Gold",
      desc: "Večer plný luxusu a pohody",
      items: ["4x prémiový koktejl", "2 hodiny v privátním pokoji", "Bottle service"],
    },
    voucher200: {
      name: "Poukaz Platinum",
      desc: "Nezapomenutelný zážitek na celý večer",
      items: ["8x prémiový koktejl", "4 hodiny v privátním pokoji", "Bottle service", "Soukromý barman"],
    },
    whatsappMsg: "Dobrý den, mám zájem o dárkový poukaz",
    note: "Po zakoupení vám zašleme elegantní voucher v digitální nebo tištěné formě.",
  },
  hu: {
    title: "Ajándékutalványok",
    subtitle: "Ajándékozzon felejthetetlen élményt",
    buy: "Vásárlás",
    includes: "Tartalmazza",
    voucher50: {
      name: "Classic utalvány",
      desc: "Tökéletes ajándék az első látogatásra",
      items: ["2x prémium koktél", "1 óra privát szobában"],
    },
    voucher100: {
      name: "Gold utalvány",
      desc: "Egy este tele luxussal és kényelemmel",
      items: ["4x prémium koktél", "2 óra privát szobában", "Palack szervíz"],
    },
    voucher200: {
      name: "Platinum utalvány",
      desc: "Felejthetetlen élmény az egész estére",
      items: ["8x prémium koktél", "4 óra privát szobában", "Palack szervíz", "Privát bármixer"],
    },
    whatsappMsg: "Jó napot, érdeklődöm az ajándékutalvány iránt",
    note: "Vásárlás után elegáns vouchert küldünk digitális vagy nyomtatott formában.",
  },
  de: {
    title: "Geschenkgutscheine",
    subtitle: "Verschenken Sie ein unvergessliches Erlebnis",
    buy: "Kaufen",
    includes: "Beinhaltet",
    voucher50: {
      name: "Classic Gutschein",
      desc: "Das ideale Geschenk für den ersten Besuch",
      items: ["2x Premium-Cocktail", "1 Stunde im Privatzimmer"],
    },
    voucher100: {
      name: "Gold Gutschein",
      desc: "Ein Abend voller Luxus und Komfort",
      items: ["4x Premium-Cocktail", "2 Stunden im Privatzimmer", "Flaschenservice"],
    },
    voucher200: {
      name: "Platinum Gutschein",
      desc: "Ein unvergessliches Erlebnis für den ganzen Abend",
      items: ["8x Premium-Cocktail", "4 Stunden im Privatzimmer", "Flaschenservice", "Privater Barkeeper"],
    },
    whatsappMsg: "Guten Tag, ich interessiere mich für einen Geschenkgutschein",
    note: "Nach dem Kauf senden wir Ihnen einen eleganten Gutschein in digitaler oder gedruckter Form.",
  },
  en: {
    title: "Gift Vouchers",
    subtitle: "Give the gift of an unforgettable experience",
    buy: "Buy",
    includes: "Includes",
    voucher50: {
      name: "Classic Voucher",
      desc: "The perfect gift for a first visit",
      items: ["2x premium cocktail", "1 hour in a private room"],
    },
    voucher100: {
      name: "Gold Voucher",
      desc: "An evening full of luxury and comfort",
      items: ["4x premium cocktail", "2 hours in a private room", "Bottle service"],
    },
    voucher200: {
      name: "Platinum Voucher",
      desc: "An unforgettable experience for the whole evening",
      items: ["8x premium cocktail", "4 hours in a private room", "Bottle service", "Private bartender"],
    },
    whatsappMsg: "Hello, I'm interested in a gift voucher",
    note: "After purchase, we will send you an elegant voucher in digital or printed form.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  return {
    title: t.title,
    description: t.subtitle,
    openGraph: {
      title: `${t.title} — Euphoria Night Club`,
      description: t.subtitle,
    },
  };
}

export default async function VouchersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = translations[locale as keyof typeof translations] || translations.en;

  const vouchers = [
    {
      price: 50,
      ...t.voucher50,
      icon: Wine,
      gradient: "from-[rgba(196,30,42,0.12)] to-[rgba(212,175,55,0.06)]",
      featured: false,
    },
    {
      price: 100,
      ...t.voucher100,
      icon: Sparkles,
      gradient: "from-[rgba(212,175,55,0.12)] to-[rgba(196,30,42,0.06)]",
      featured: true,
    },
    {
      price: 200,
      ...t.voucher200,
      icon: Gift,
      gradient: "from-[rgba(212,175,55,0.15)] to-[rgba(139,0,0,0.1)]",
      featured: false,
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <h1 className="section-title">{t.title}</h1>
          <div className="gold-line mx-auto mt-4" />
          <p className="section-subtitle mt-4">{t.subtitle}</p>
        </div>

        {/* Voucher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {vouchers.map((voucher, i) => {
            const Icon = voucher.icon;
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${t.whatsappMsg} — ${voucher.name} (${voucher.price}€)`)}`;

            return (
              <div
                key={voucher.price}
                className={`reveal relative group rounded-lg overflow-hidden transition-all duration-500 ${
                  voucher.featured ? "md:-translate-y-4" : ""
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Glass card */}
                <div
                  className={`relative bg-gradient-to-br ${voucher.gradient} backdrop-blur-sm border border-[rgba(212,175,55,0.18)] p-8 h-full flex flex-col group-hover:border-[#c41e2a] group-hover:shadow-[0_12px_40px_rgba(196,30,42,0.2),0_0_20px_rgba(212,175,55,0.1)] transition-all duration-500`}
                  style={{ borderRadius: "4px" }}
                >
                  {/* Featured badge */}
                  {voucher.featured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#dc143c] to-[#c41e2a] text-white text-xs font-[family-name:var(--font-ui)] uppercase tracking-[0.15em] px-4 py-1.5">
                      Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-full border border-[rgba(212,175,55,0.3)] flex items-center justify-center bg-[rgba(212,175,55,0.05)] group-hover:border-[rgba(212,175,55,0.5)] transition-all">
                      <Icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] mb-2">
                    {voucher.name}
                  </h3>
                  <p className="text-[#c0b8b0] text-sm mb-6">{voucher.desc}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold font-[family-name:var(--font-heading)] gold-text">
                      {voucher.price}€
                    </span>
                  </div>

                  {/* Includes */}
                  <div className="mb-8 flex-1">
                    <p className="text-[#d4af37] text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-ui)] mb-3">
                      {t.includes}
                    </p>
                    <ul className="space-y-2.5">
                      {voucher.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-[#c0b8b0]">
                          <Clock className="w-3.5 h-3.5 text-[#c41e2a] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-center w-full block"
                  >
                    {t.buy}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-[#c0b8b0] text-sm mt-12 max-w-lg mx-auto reveal">
          {t.note}
        </p>
      </div>
    </section>
  );
}
