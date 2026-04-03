"use client";

import { Star } from "lucide-react";

const translations: Record<string, { heading: string; cta: string }> = {
  sk: {
    heading: "Google Recenzie",
    cta: "Ohodnoťte nás na Google",
  },
  hu: {
    heading: "Google Vélemények",
    cta: "Értékeljen minket a Google-on",
  },
  cs: {
    heading: "Google Recenze",
    cta: "Ohodnoťte nás na Google",
  },
  de: {
    heading: "Google Bewertungen",
    cta: "Bewerten Sie uns auf Google",
  },
  en: {
    heading: "Google Reviews",
    cta: "Rate us on Google",
  },
};

function GoogleGLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function GoogleReviews({ locale = "sk" }: { locale?: string }) {
  const t = translations[locale] || translations.en;

  // Placeholder link — replace with actual Google Business URL
  const googleMapsUrl = "https://maps.google.com/?q=Euphoria+Night+Club+Samorin";

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Google G logo */}
        <div className="flex justify-center mb-6">
          <GoogleGLogo className="w-12 h-12" />
        </div>

        {/* Heading */}
        <h2
          className="text-2xl text-euphoria-cream mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t.heading}
        </h2>

        {/* Rating */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span
            className="text-5xl font-bold text-euphoria-gold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            4.8
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={
                  star <= 4
                    ? "text-euphoria-gold fill-euphoria-gold"
                    : "text-euphoria-gold/40 fill-euphoria-gold/40"
                }
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-8 py-3 border border-euphoria-gold/40 text-euphoria-gold rounded-sm hover:bg-euphoria-gold/10 transition-all text-base"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          <GoogleGLogo className="w-5 h-5" />
          {t.cta}
        </a>
      </div>
    </section>
  );
}
