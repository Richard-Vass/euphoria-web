"use client";

import { Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ReviewsSectionProps {
  locale: string;
}

const reviews = [
  {
    name: { sk: "Overený hosť", cs: "Ověřený host", hu: "Ellenőrzött vendég", de: "Verifizierter Gast", en: "Verified Guest" },
    initial: "V",
    rating: 5,
    text: {
      sk: "Výborná atmosféra a diskrétny servis. Privátna izba bola na úrovni, koktaily špičkové. Presne to, čo som hľadal. Vrátim sa!",
      cs: "Výborná atmosféra a diskrétní servis. Privátní pokoj byl na úrovni, koktejly špičkové. Přesně to, co jsem hledal. Vrátím se!",
      hu: "Kiváló hangulat és diszkrét kiszolgálás. A privát szoba magas színvonalú volt, a koktélok csúcsminőségűek. Visszatérek!",
      de: "Ausgezeichnete Atmosphäre und diskreter Service. Das Privatzimmer war erstklassig, die Cocktails hervorragend. Ich komme wieder!",
      en: "Excellent atmosphere and discreet service. The private room was top-notch, cocktails superb. Exactly what I was looking for. I'll be back!",
    },
  },
  {
    name: { sk: "Stály hosť", cs: "Stálý host", hu: "Törzsvendég", de: "Stammgast", en: "Regular Guest" },
    initial: "S",
    rating: 5,
    text: {
      sk: "Najlepší podnik v okolí. Perfektná atmosféra, skvelé drinky a hlavne absolútna diskrétnosť. Každý týždeň sa sem rád vraciam.",
      cs: "Nejlepší podnik v okolí. Perfektní atmosféra, skvělé drinky a hlavně absolutní diskrétnost. Každý týden se sem rád vracím.",
      hu: "A legjobb hely a környéken. Tökéletes hangulat, remek italok és ami a legfontosabb — teljes diszkréció. Minden héten szívesen visszatérek.",
      de: "Das beste Lokal in der Umgebung. Perfekte Atmosphäre, tolle Drinks und vor allem absolute Diskretion. Ich komme jede Woche gerne wieder.",
      en: "The best place around. Perfect atmosphere, great drinks and above all — absolute discretion. I gladly come back every week.",
    },
  },
  {
    name: { sk: "Prémiový hosť", cs: "Prémiový host", hu: "Prémium vendég", de: "Premium-Gast", en: "Premium Guest" },
    initial: "E",
    rating: 5,
    text: {
      sk: "Bottle service bol na úrovni. Diskrétne, elegantné a profesionálne. Odporúčam každému, kto hľadá niečo exkluzívne.",
      cs: "Bottle service byl na úrovni. Diskrétní, elegantní a profesionální. Doporučuji každému, kdo hledá něco exkluzivního.",
      hu: "A palack szervíz magas színvonalú volt. Diszkrét, elegáns és professzionális. Ajánlom mindenkinek, aki valami exkluzívat keres.",
      de: "Der Flaschenservice war erstklassig. Diskret, elegant und professionell. Empfehle es jedem, der etwas Exklusives sucht.",
      en: "Bottle service was top class. Discreet, elegant and professional. I recommend it to anyone looking for something exclusive.",
    },
  },
];

const sectionTitle: Record<string, string> = {
  sk: "Recenzie",
  cs: "Recenze",
  hu: "Vélemények",
  de: "Bewertungen",
  en: "Reviews",
};

const sectionSubtitle: Record<string, string> = {
  sk: "Čo hovoria naši hostia",
  cs: "Co říkají naši hosté",
  hu: "Amit vendégeink mondanak",
  de: "Was unsere Gäste sagen",
  en: "What our guests say",
};

export default function ReviewsSection({ locale }: ReviewsSectionProps) {
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
            <h2>{sectionTitle[locale] || sectionTitle.en}</h2>
            <p>{sectionSubtitle[locale] || sectionSubtitle.en}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.initial} delay={i * 100}>
                <div
                  className="p-6 h-full transition-all duration-500 hover:translate-y-[-3px]"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "4px",
                    backdropFilter: "blur(12px)",
                    boxShadow:
                      "0 8px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <Star
                        key={s}
                        size={16}
                        fill="var(--gold)"
                        style={{ color: "var(--gold)" }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "var(--light-gray)", fontStyle: "italic" }}
                  >
                    &ldquo;{review.text[locale as keyof typeof review.text] || review.text.en}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(196, 30, 42, 0.2), rgba(212, 175, 55, 0.2))",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                        color: "var(--gold)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {review.initial}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: "var(--cream)",
                        fontFamily: "var(--font-ui)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {review.name[locale as keyof typeof review.name] || review.name.en}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
