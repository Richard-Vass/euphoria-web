"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Locale, locales, localeNames } from "@/lib/i18n";

interface NavbarProps {
  locale: Locale;
  dict: Record<string, string>;
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Get the path without the locale prefix (e.g., /sk/events -> /events)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav_home },
    { href: `/${locale}/about`, label: dict.nav_about },
    { href: `/${locale}/events`, label: dict.nav_events },
    { href: `/${locale}/reservation`, label: dict.nav_reservation },
    { href: `/${locale}/gallery`, label: dict.nav_gallery },
    { href: `/${locale}/contact`, label: dict.nav_contact },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-500"
        style={{
          padding: scrolled ? "0.7rem 2.5rem" : "1.2rem 2.5rem",
          background: scrolled ? "rgba(5,5,5,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(30px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(30px) saturate(1.2)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(212, 175, 55, 0.18)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(196,30,42,0.15)"
            : "none",
        }}
      >
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0">
          <Image
            src="/images/logo-transparent.png"
            alt="Euphoria Night Club"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-underline relative uppercase tracking-[0.15em] hover:text-[var(--gold)] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.85rem",
                color: "var(--light-gray)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language switcher + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-1">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}${pathWithoutLocale}`}
                className={`text-xs uppercase px-2 py-1 transition-colors ${
                  loc === locale
                    ? "text-[var(--gold)]"
                    : "text-[var(--light-gray)] hover:text-white"
                }`}
                title={localeNames[loc]}
              >
                {loc}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/reservation`} className="nav-cta">
            {dict.hero_cta}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-[var(--gold)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay (from demo) */}
      {isOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8">
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-[var(--gold)]"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem" }}
              className="text-white hover:text-[var(--gold)] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={`/${locale}/reservation`}
            className="nav-cta mt-4"
            onClick={() => setIsOpen(false)}
          >
            {dict.hero_cta}
          </Link>

          <div className="flex gap-3 mt-4">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}${pathWithoutLocale}`}
                onClick={() => setIsOpen(false)}
                className={`text-sm uppercase px-3 py-1.5 border transition-colors ${
                  loc === locale
                    ? "border-[var(--gold)] text-[var(--gold)]"
                    : "border-[var(--glass-border)] text-[var(--light-gray)] hover:text-white"
                }`}
                style={{ borderRadius: "50px" }}
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
