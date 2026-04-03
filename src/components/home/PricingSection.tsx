"use client";

import { Wine, DoorOpen, Key } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PricingSectionProps {
  locale: string;
}

const translations = {
  title: {
    sk: "Cenník",
    cs: "Ceník",
    hu: "Árlista",
    de: "Preisliste",
    en: "Pricing",
  },
  subtitle: {
    sk: "Transparentné ceny, prémiový zážitok",
    cs: "Transparentní ceny, prémiový zážitek",
    hu: "Átlátható árak, prémium élmény",
    de: "Transparente Preise, Premium-Erlebnis",
    en: "Transparent prices, premium experience",
  },
  privateRoom: {
    title: {
      sk: "Privátna izba",
      cs: "Privátní místnost",
      hu: "Privát szoba",
      de: "Privatzimmer",
      en: "Private Room",
    },
    description: {
      sk: "Diskrétny priestor pre váš večer. Plná výbava, osobný servis.",
      cs: "Diskrétní prostor pro váš večer. Plné vybavení, osobní servis.",
      hu: "Diszkrét tér az Ön estéjéhez. Teljes felszereltség, személyes kiszolgálás.",
      de: "Diskreter Raum für Ihren Abend. Volle Ausstattung, persönlicher Service.",
      en: "A discreet space for your evening. Full amenities, personal service.",
    },
    price: {
      sk: "od XX€/hod",
      cs: "od XX€/hod",
      hu: "XX€/óra-tól",
      de: "ab XX€/Std",
      en: "from XX€/hr",
    },
  },
  bottleService: {
    title: {
      sk: "Bottle Service",
      cs: "Bottle Service",
      hu: "Palack Szervíz",
      de: "Flaschenservice",
      en: "Bottle Service",
    },
    description: {
      sk: "Prémiový výber fľašiek priamo k vášmu stolu. Šampanské, whisky, vodka.",
      cs: "Prémiový výběr lahví přímo k vašemu stolu. Šampaňské, whisky, vodka.",
      hu: "Prémium palackválaszték közvetlenül az asztalához. Pezsgő, whisky, vodka.",
      de: "Premium-Flaschenauswahl direkt an Ihren Tisch. Champagner, Whisky, Wodka.",
      en: "Premium bottle selection delivered to your table. Champagne, whisky, vodka.",
    },
    price: {
      sk: "od XX€",
      cs: "od XX€",
      hu: "XX€-tól",
      de: "ab XX€",
      en: "from XX€",
    },
  },
  entry: {
    title: {
      sk: "Vstup",
      cs: "Vstup",
      hu: "Belépő",
      de: "Eintritt",
      en: "Entry",
    },
    description: {
      sk: "Vstup do Euphoria je voľný. Vítame každého gentlemana.",
      cs: "Vstup do Euphoria je volný. Vítáme každého gentlemana.",
      hu: "Az Euphoriába a belépés ingyenes. Minden úriembert szívesen látunk.",
      de: "Der Eintritt in die Euphoria ist frei. Wir begrüßen jeden Gentleman.",
      en: "Entry to Euphoria is free. We welcome every gentleman.",
    },
    price: {
      sk: "Vstup voľný",
      cs: "Vstup volný",
      hu: "Ingyenes belépés",
      de: "Eintritt frei",
      en: "Free entry",
    },
  },
};

type LangKey = "sk" | "cz" | "hu" | "de" | "en";

function t(obj: Record<string, string>, locale: string): string {
  return obj[locale as LangKey] || obj.en;
}

const pricingItems = [
  {
    icon: Key,
    titleKey: "privateRoom" as const,
  },
  {
    icon: Wine,
    titleKey: "bottleService" as const,
  },
  {
    icon: DoorOpen,
    titleKey: "entry" as const,
  },
];

export default function PricingSection({ locale }: PricingSectionProps) {
  return (
    <ScrollReveal>
      <section
        className="py-28 px-6 relative"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 60%),
            var(--black)
          `,
        }}
      >
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="section-header">
            <h2>{t(translations.title, locale)}</h2>
            <p>{t(translations.subtitle, locale)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingItems.map((item, i) => {
              const data = translations[item.titleKey];
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.titleKey} delay={i * 120}>
                  <div
                    className="p-8 h-full text-center transition-all duration-500 hover:translate-y-[-3px]"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: "4px",
                      backdropFilter: "blur(12px)",
                      boxShadow:
                        "0 8px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
                    }}
                  >
                    <div
                      className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(196, 30, 42, 0.15), rgba(212, 175, 55, 0.15))",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                      }}
                    >
                      <Icon size={28} style={{ color: "var(--gold)" }} />
                    </div>

                    <h3
                      className="text-xl mb-3 uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--cream)",
                      }}
                    >
                      {t(data.title, locale)}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: "var(--light-gray)" }}
                    >
                      {t(data.description, locale)}
                    </p>

                    <div
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--gold)",
                        textShadow: "0 0 20px rgba(212, 175, 55, 0.2)",
                      }}
                    >
                      {t(data.price, locale)}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
