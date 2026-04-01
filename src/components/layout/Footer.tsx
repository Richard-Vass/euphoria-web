import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: Record<string, string>;
}

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="relative" style={{ background: "var(--black)" }}>
      {/* Gradient top border (from demo) */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--crimson), var(--gold), var(--crimson), transparent)",
        }}
      />

      {/* Footer grid (from demo: 2fr 1fr 1fr 1fr) */}
      <div className="pt-16 pb-12 px-6">
        <div
          className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12"
        >
          {/* Branding column */}
          <div>
            <Image
              src="/images/logo-transparent.png"
              alt="Euphoria Night Club"
              width={260}
              height={80}
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed max-w-[300px]" style={{ color: "var(--light-gray)" }}>
              {locale === "sk"
                ? "Exkluzívny nočný klub v Šamoríne. Premium zážitok každý víkend."
                : locale === "hu"
                ? "Exkluzív éjszakai klub Somorján. Prémium élmény minden hétvégén."
                : locale === "de"
                ? "Exklusiver Nachtclub in Šamorín. Premium-Erlebnis jedes Wochenende."
                : "An exclusive nightclub in Šamorín. Premium experience every weekend."}
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/euphoria_nightclub_samorin"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/euphorianightclub"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="footer-col">
            <h4>
              {locale === "sk" ? "Navigácia" : locale === "hu" ? "Navigáció" : locale === "de" ? "Navigation" : "Navigation"}
            </h4>
            <ul className="list-none space-y-3">
              <li><Link href={`/${locale}`}>{dict.nav_home}</Link></li>
              <li><Link href={`/${locale}/events`}>{dict.nav_events}</Link></li>
              <li><Link href={`/${locale}/reservation`}>{dict.nav_reservation}</Link></li>
              <li><Link href={`/${locale}/gallery`}>{dict.nav_gallery}</Link></li>
              <li><Link href={`/${locale}/contact`}>{dict.nav_contact}</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="footer-col">
            <h4>{dict.nav_contact}</h4>
            <div className="space-y-3 text-sm" style={{ color: "var(--light-gray)" }}>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--crimson)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Bratislavská 11, 931 01 Šamorín</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--crimson)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:+421950480799" className="hover:text-[var(--gold)] transition-colors">+421 950 480 799</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--crimson)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:euphorianightclub11@gmail.com" className="hover:text-[var(--gold)] transition-colors">euphorianightclub11@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Hours column */}
          <div className="footer-col">
            <h4>{dict.contact_hours}</h4>
            <div className="space-y-2 text-sm" style={{ color: "var(--light-gray)" }}>
              <div className="flex justify-between">
                <span>{locale === "sk" ? "Po - Št" : locale === "hu" ? "Hé - Cs" : locale === "de" ? "Mo - Do" : "Mon - Thu"}</span>
                <span>19:00 - 02:00</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === "sk" ? "Piatok" : locale === "hu" ? "Péntek" : locale === "de" ? "Freitag" : "Friday"}</span>
                <span>19:00 - 04:00</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === "sk" ? "Sobota" : locale === "hu" ? "Szombat" : locale === "de" ? "Samstag" : "Saturday"}</span>
                <span>19:00 - 06:00</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === "sk" ? "Nedeľa" : locale === "hu" ? "Vasárnap" : locale === "de" ? "Sonntag" : "Sunday"}</span>
                <span>19:00 - 02:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom bar (from demo) */}
      <div
        className="py-6 px-6"
        style={{ borderTop: "1px solid var(--glass-border)" }}
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
          <p className="text-xs" style={{ color: "var(--light-gray)" }}>
            &copy; {new Date().getFullYear()} Euphoria Night Club. {dict.footer_rights}
          </p>
          <p className="text-xs" style={{ color: "var(--light-gray)" }}>
            Made by{" "}
            <a
              href="https://vassweb.sk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--gold)" }}
              className="hover:underline"
            >
              VassWeb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
