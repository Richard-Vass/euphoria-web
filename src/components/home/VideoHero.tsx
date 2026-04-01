"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";

interface VideoHeroProps {
  locale: Locale;
  dict: Record<string, string>;
}

function Particles() {
  const particles = [
    { id: 0, left: "12%", size: 3, delay: 0, duration: 10 },
    { id: 1, left: "25%", size: 3, delay: 2, duration: 12 },
    { id: 2, left: "38%", size: 2, delay: 4, duration: 9 },
    { id: 3, left: "50%", size: 3, delay: 1, duration: 11 },
    { id: 4, left: "63%", size: 2, delay: 5, duration: 13 },
    { id: 5, left: "75%", size: 3, delay: 3, duration: 8 },
    { id: 6, left: "88%", size: 3, delay: 6, duration: 10 },
    { id: 7, left: "7%", size: 2, delay: 7, duration: 14 },
    { id: 8, left: "43%", size: 3, delay: 1.5, duration: 9 },
    { id: 9, left: "82%", size: 2, delay: 4.5, duration: 11 },
  ];

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function VideoHero({ locale, dict }: VideoHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden -mt-20 flex items-center justify-center text-center"
      style={{ height: "100vh", minHeight: "750px" }}
    >
      {/* Background layers (EXACT from demo) */}
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-vignette" />

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-[850px] px-8">
        {/* Gold line above logo */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="gold-line mb-8"
          style={{ width: "80px" }}
        />

        {/* Figure logo image — big and centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src="/images/logo-figure-transparent.png"
            alt="Euphoria Night Club"
            width={600}
            height={840}
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] h-auto"
            style={{
              filter: "drop-shadow(0 0 60px rgba(212, 175, 55, 0.12)) drop-shadow(0 0 120px rgba(196, 30, 42, 0.08))",
            }}
            priority
          />
        </motion.div>

        {/* Gold line divider below logo */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="gold-line mt-8 mb-10"
          style={{ width: "120px" }}
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href={`/${locale}/reservation`} className="btn-primary">
            {dict.hero_cta}
          </Link>
          <Link href={`/${locale}/events`} className="btn-secondary">
            {dict.hero_events_cta}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator (from demo — bounce animation) */}
      <div
        className="absolute bottom-8 left-1/2 z-10"
        style={{ animation: "bounce 2s ease-in-out infinite" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-[var(--light-gray)] text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Scroll
          </span>
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-[var(--gold)]">
            <path d="M10 2 L10 22 M4 16 L10 22 L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
