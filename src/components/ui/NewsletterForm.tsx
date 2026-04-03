"use client";

import { useState, FormEvent } from "react";
import { Locale } from "@/lib/i18n";

const texts: Record<string, { placeholder: string; button: string; success: string }> = {
  sk: {
    placeholder: "Tvoj email",
    button: "Prihlásiť sa",
    success: "Ďakujeme! Odber bol aktivovaný.",
  },
  hu: {
    placeholder: "E-mail címed",
    button: "Feliratkozás",
    success: "Köszönjük! A feliratkozás aktív.",
  },
  de: {
    placeholder: "Deine E-Mail",
    button: "Abonnieren",
    success: "Danke! Abonnement aktiviert.",
  },
  en: {
    placeholder: "Your email",
    button: "Subscribe",
    success: "Thank you! Subscription activated.",
  },
};

export default function NewsletterForm({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const t = texts[locale] || texts.en;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          required
          className="flex-1 max-w-[320px] px-5 py-3 text-sm outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--gold)",
            borderRadius: "50px",
            color: "var(--white)",
            fontFamily: "var(--font-body)",
          }}
        />
        <button type="submit" className="btn-primary !py-3 !px-6 text-sm whitespace-nowrap">
          {t.button}
        </button>
      </form>

      {submitted && (
        <p
          className="mt-4 text-sm animate-[fadeInUp_0.4s_ease]"
          style={{ color: "var(--gold)" }}
        >
          {t.success}
        </p>
      )}
    </div>
  );
}
