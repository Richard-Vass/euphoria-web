"use client";

import { Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ReviewsSectionProps {
  locale: string;
}

const reviews = [
  {
    name: "Martin K.",
    rating: 5,
    text: {
      sk: "Výborná atmosféra a diskrétny servis. VIP izba bola na úrovni, koktaily špičkové. Presne to, čo som hľadal. Vrátim sa!",
      hu: "Kiváló hangulat és diszkrét kiszolgálás. A VIP szoba magas színvonalú volt, a koktélok csúcsminőségűek. Visszatérek!",
      de: "Ausgezeichnete Atmosphäre und diskreter Service. Das VIP-Zimmer war erstklassig, die Cocktails hervorragend. Ich komme wieder!",
      en: "Excellent atmosphere and discreet service. The VIP room was top-notch, cocktails superb. Exactly what I was looking for. I'll be back!",
    },
  },
  {
    name: "Tomáš B.",
    rating: 5,
    text: {
      sk: "Najlepší podnik v okolí. Perfektná atmosféra, skvelé drinky a hlavne absolútna diskrétnosť. Každý týždeň sa sem rád vraciam.",
      hu: "A legjobb hely a környéken. Tökéletes hangulat, remek italok és ami a legfontosabb — teljes diszkréció. Minden héten szívesen visszatérek.",
      de: "Das beste Lokal in der Umgebung. Perfekte Atmosphäre, tolle Drinks und vor allem absolute Diskretion. Ich komme jede Woche gerne wieder.",
      en: "The best place around. Perfect atmosphere, great drinks and above all — absolute discretion. I gladly come back every week.",
    },
  },
  {
    name: "Róbert M.",
    rating: 5,
    text: {
      sk: "Oslávili sme tu rozlúčku so slobodou a bolo to fantastické. VIP bottle service bol na úrovni. Odporúčam každému pánovi!",
      hu: "Itt tartottuk a legénybúcsút és fantasztikus volt. A VIP palack szervíz magas színvonalú volt. Minden úriembernek ajánlom!",
      de: "Wir haben hier einen Junggesellenabschied gefeiert und es war fantastisch. Der VIP-Flaschenservice war erstklassig. Empfehle es jedem Herrn!",
      en: "We had a stag party here and it was fantastic. VIP bottle service was top class. I recommend it to every gentleman!",
    },
  },
];

const sectionTitle: Record<string, string> = {
  sk: "Recenzie",
  hu: "Vélemények",
  de: "Bewertungen",
  en: "Reviews",
};

const sectionSubtitle: Record<string, string> = {
  sk: "Čo hovoria naši hostia",
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
              <ScrollReveal key={review.name} delay={i * 100}>
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
                      {review.name.charAt(0)}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: "var(--cream)",
                        fontFamily: "var(--font-ui)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {review.name}
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
