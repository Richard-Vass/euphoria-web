"use client";

import { Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ReviewsSectionProps {
  locale: string;
}

const reviews = [
  {
    name: "Martina K.",
    rating: 5,
    text: {
      sk: "Absolútne perfektný zážitok! VIP izba bola nádherná, koktaily na úrovni a personál veľmi profesionálny. Určite sa vrátime!",
      hu: "Teljesen tökéletes élmény! A VIP szoba gyönyörű volt, a koktélok kiválóak és a személyzet nagyon profi. Biztosan visszatérünk!",
      de: "Ein absolut perfektes Erlebnis! Das VIP-Zimmer war wunderschön, die Cocktails erstklassig und das Personal sehr professionell. Wir kommen definitiv wieder!",
      en: "An absolutely perfect experience! The VIP room was gorgeous, cocktails top-notch and the staff very professional. We will definitely come back!",
    },
  },
  {
    name: "Tomáš B.",
    rating: 5,
    text: {
      sk: "Najlepší klub v okolí! Atmosféra je neuveriteľná, hudba perfektná a drinky fantastické. Každý piatok sme tu!",
      hu: "A legjobb klub a környéken! A hangulat hihetetlen, a zene tökéletes és az italok fantasztikusak. Minden pénteken itt vagyunk!",
      de: "Der beste Club in der Umgebung! Die Atmosphäre ist unglaublich, die Musik perfekt und die Drinks fantastisch. Jeden Freitag sind wir hier!",
      en: "The best club around! The atmosphere is incredible, music is perfect and drinks are fantastic. We're here every Friday!",
    },
  },
  {
    name: "Petra N.",
    rating: 5,
    text: {
      sk: "Oslávili sme tu narodeniny a bolo to úžasné. Narodeninový balíček s fľašou šampanského bol skvelý bonus. Odporúčam každému!",
      hu: "Itt ünnepeltük a születésnapot és fantasztikus volt. A születésnapi csomag pezsgővel remek bónusz volt. Mindenkinek ajánlom!",
      de: "Wir haben hier Geburtstag gefeiert und es war großartig. Das Geburtstagspaket mit Champagner war ein toller Bonus. Empfehle es jedem!",
      en: "We celebrated a birthday here and it was amazing. The birthday package with champagne was a great bonus. I recommend it to everyone!",
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
