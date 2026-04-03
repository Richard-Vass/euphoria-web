"use client";

import { Shield, Crown, Flame, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface WhyEuphoriaSectionProps {
  locale: string;
}

type LangKey = "sk" | "hu" | "de" | "en";

function t(obj: Record<string, string>, locale: string): string {
  return obj[locale as LangKey] || obj.en;
}

const sectionTitle: Record<string, string> = {
  sk: "Prečo Euphoria",
  cs: "Proč Euphoria",
  hu: "Miért az Euphoria",
  de: "Warum Euphoria",
  en: "Why Euphoria",
};

const cards = [
  {
    icon: Shield,
    title: {
      sk: "Diskrétnosť",
      cs: "Diskrétnost",
      hu: "Diszkréció",
      de: "Diskretion",
      en: "Discretion",
    },
    description: {
      sk: "Absolútne súkromie je naša priorita. Váš večer zostane len váš.",
      cs: "Absolutní soukromí je naše priorita. Váš večer zůstane jen váš.",
      hu: "Az abszolút magánélet a prioritásunk. Az Ön estéje csak az Öné marad.",
      de: "Absolute Privatsphäre ist unsere Priorität. Ihr Abend bleibt nur Ihrer.",
      en: "Absolute privacy is our priority. Your evening stays yours alone.",
    },
  },
  {
    icon: Crown,
    title: {
      sk: "Prémiový servis",
      cs: "Prémiový servis",
      hu: "Prémium szolgáltatás",
      de: "Premium-Service",
      en: "Premium Service",
    },
    description: {
      sk: "Servis na najvyššej úrovni. Každý detail je premyslený pre váš komfort.",
      cs: "Servis na nejvyšší úrovni. Každý detail je promyšlený pro váš komfort.",
      hu: "A legmagasabb szintű kiszolgálás. Minden részlet az Ön kényelméért van átgondolva.",
      de: "Service auf höchstem Niveau. Jedes Detail ist für Ihren Komfort durchdacht.",
      en: "Top-level service. Every detail is designed for your comfort.",
    },
  },
  {
    icon: Flame,
    title: {
      sk: "Atmosféra",
      cs: "Atmosféra",
      hu: "Hangulat",
      de: "Atmosphäre",
      en: "Ambiance",
    },
    description: {
      sk: "Unikátna atmosféra, ktorá spojí luxus, eleganciu a nezabudnuteľné zážitky.",
      cs: "Unikátní atmosféra, která spojí luxus, eleganci a nezapomenutelné zážitky.",
      hu: "Egyedülálló hangulat, amely ötvözi a luxust, az eleganciát és a felejthetetlen élményeket.",
      de: "Einzigartige Atmosphäre, die Luxus, Eleganz und unvergessliche Erlebnisse verbindet.",
      en: "Unique ambiance blending luxury, elegance and unforgettable experiences.",
    },
  },
  {
    icon: MapPin,
    title: {
      sk: "Poloha",
      cs: "Poloha",
      hu: "Helyszín",
      de: "Lage",
      en: "Location",
    },
    description: {
      sk: "V srdci Šamorína. Ľahko dostupné, diskrétne umiestnené.",
      cs: "V srdci Šamorínu. Snadno dostupné, diskrétně umístěné.",
      hu: "Somorja szívében. Könnyen megközelíthető, diszkrét elhelyezkedés.",
      de: "Im Herzen von Šamorín. Leicht erreichbar, diskret gelegen.",
      en: "In the heart of Šamorín. Easily accessible, discreetly located.",
    },
  },
];

export default function WhyEuphoriaSection({ locale }: WhyEuphoriaSectionProps) {
  return (
    <div className="mt-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2
            className="text-2xl uppercase tracking-wider mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--gold)",
              textShadow: "0 0 20px rgba(212, 175, 55, 0.15)",
            }}
          >
            {t(sectionTitle, locale)}
          </h2>
          <div className="gold-line mx-auto" />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className="p-6 h-full text-center transition-all duration-500 hover:translate-y-[-3px]"
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
                  className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(196, 30, 42, 0.15), rgba(212, 175, 55, 0.15))",
                    border: "1px solid rgba(212, 175, 55, 0.25)",
                  }}
                >
                  <Icon size={24} style={{ color: "var(--gold)" }} />
                </div>

                <h3
                  className="text-lg mb-2 uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--cream)",
                  }}
                >
                  {t(card.title, locale)}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--light-gray)" }}
                >
                  {t(card.description, locale)}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
