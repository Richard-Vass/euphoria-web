"use client";

/**
 * Newsletter signup — UI-only placeholder.
 * Integracia s MailerLite/Mailchimp sa spravi neskor cez API route.
 * Ulozi email do localStorage ako queue (nie backend).
 */

import { useState } from "react";

const STORAGE_KEY = "euphoria_newsletter_queue";

interface Props {
  locale: "sk" | "en" | string;
  variant?: "inline" | "footer" | "modal";
}

type Status = "idle" | "submitting" | "ok" | "error";

const COPY = {
  sk: {
    title: "Prihláste sa na newsletter",
    sub: "Dostávajte informácie o nových eventoch, DJ line-upoch a špeciálnych akciách.",
    email: "Váš e-mail",
    submit: "Prihlásiť sa",
    success: "Ďakujeme! Budete medzi prvými, ktorí sa dozvedia.",
    privacy: "Kliknutím súhlasíte so spracovaním e-mailu pre newsletter podľa GDPR.",
    errorEmail: "Zadajte platný e-mail.",
  },
  en: {
    title: "Join our newsletter",
    sub: "Get info about new events, DJ line-ups and special offers.",
    email: "Your e-mail",
    submit: "Subscribe",
    success: "Thanks! You'll be among the first to know.",
    privacy: "By clicking you consent to e-mail processing for newsletter per GDPR.",
    errorEmail: "Please enter a valid e-mail.",
  },
} as const;

export function NewsletterSignup({ locale, variant = "inline" }: Props) {
  const copy = COPY[locale === "en" ? "en" : "sk"];
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const email = (fd.get("email") as string)?.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErr(copy.errorEmail);
      return;
    }

    setStatus("submitting");

    // UI-only: pridame do localStorage queue, manual import neskor
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const queue = raw ? JSON.parse(raw) : [];
      queue.push({ email, locale, ts: new Date().toISOString() });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    } catch {
      // ignore
    }

    await new Promise((r) => setTimeout(r, 500));
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  }

  const containerClasses =
    variant === "footer"
      ? "max-w-md"
      : variant === "modal"
      ? "max-w-lg mx-auto"
      : "max-w-2xl mx-auto text-center";

  return (
    <div className={containerClasses}>
      {variant !== "footer" && (
        <>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
            {copy.title}
          </h3>
          <p className="text-slate-400 mb-6">{copy.sub}</p>
        </>
      )}

      {variant === "footer" && (
        <h4 className="uppercase text-xs tracking-[0.2em] font-semibold text-white mb-3">
          {copy.title}
        </h4>
      )}

      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder={copy.email}
          aria-label={copy.email}
          className="flex-1 rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-900/50"
          disabled={status === "submitting" || status === "ok"}
        />
        <button
          type="submit"
          disabled={status === "submitting" || status === "ok"}
          className="bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-purple-900/30 transition-colors"
        >
          {status === "submitting" ? "..." : copy.submit}
        </button>
      </form>

      {err && (
        <div
          role="alert"
          className="mt-3 text-sm text-red-300"
        >
          {err}
        </div>
      )}
      {status === "ok" && (
        <div role="status" className="mt-3 text-sm text-green-300">
          {copy.success}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-500">{copy.privacy}</p>
    </div>
  );
}
