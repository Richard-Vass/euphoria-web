"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface BusinessHoursProps {
  locale: string;
}

type LangKey = "sk" | "hu" | "de" | "en";

function t(obj: Record<string, string>, locale: string): string {
  return obj[locale as LangKey] || obj.en;
}

const sectionTitle: Record<string, string> = {
  sk: "Otváracie hodiny",
  hu: "Nyitvatartás",
  de: "Öffnungszeiten",
  en: "Opening Hours",
};

const sectionSubtitle: Record<string, string> = {
  sk: "Tešíme sa na vašu návštevu",
  hu: "Várjuk látogatását",
  de: "Wir freuen uns auf Ihren Besuch",
  en: "We look forward to your visit",
};

const openNowLabel: Record<string, string> = {
  sk: "Otvorené teraz",
  hu: "Most nyitva",
  de: "Jetzt geöffnet",
  en: "Open now",
};

const closedNowLabel: Record<string, string> = {
  sk: "Zatvorené",
  hu: "Zárva",
  de: "Geschlossen",
  en: "Closed",
};

const dayNames: Record<string, string[]> = {
  sk: ["Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"],
  hu: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"],
  de: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
};

// Hours: [openHour, closeHour] (closeHour > 24 means next day)
const schedule = [
  { open: 19, close: 26 }, // Mon 19:00-02:00
  { open: 19, close: 26 }, // Tue 19:00-02:00
  { open: 19, close: 26 }, // Wed 19:00-02:00
  { open: 19, close: 26 }, // Thu 19:00-02:00
  { open: 19, close: 28 }, // Fri 19:00-04:00
  { open: 19, close: 30 }, // Sat 19:00-06:00
  { open: 19, close: 26 }, // Sun 19:00-02:00
];

const hoursDisplay = [
  "19:00 – 02:00",
  "19:00 – 02:00",
  "19:00 – 02:00",
  "19:00 – 02:00",
  "19:00 – 04:00",
  "19:00 – 06:00",
  "19:00 – 02:00",
];

function isOpenNow(): boolean {
  const now = new Date();
  // JS getDay: 0=Sun, we need 0=Mon
  const jsDay = now.getDay();
  const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
  const hour = now.getHours();

  // Check if we're in the current day's window (after open)
  const todaySchedule = schedule[dayIndex];
  if (hour >= todaySchedule.open) {
    return true;
  }

  // Check if we're in the previous day's late-night window
  const prevDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const prevSchedule = schedule[prevDayIndex];
  const prevClose = prevSchedule.close - 24; // e.g., 26-24 = 2 (2:00 AM)
  if (hour < prevClose) {
    return true;
  }

  return false;
}

function getCurrentDayIndex(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export default function BusinessHours({ locale }: BusinessHoursProps) {
  const [currentDay, setCurrentDay] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentDay(getCurrentDayIndex());
    setIsOpen(isOpenNow());

    const interval = setInterval(() => {
      setCurrentDay(getCurrentDayIndex());
      setIsOpen(isOpenNow());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const days = dayNames[locale as LangKey] || dayNames.en;

  return (
    <ScrollReveal>
      <section
        className="py-28 px-6 relative"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.04) 0%, transparent 50%),
            var(--black)
          `,
        }}
      >
        <div className="max-w-[600px] mx-auto relative z-10">
          <div className="section-header">
            <h2>{t(sectionTitle, locale)}</h2>
            <p>{t(sectionSubtitle, locale)}</p>
          </div>

          {/* Open/Closed indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                background: isOpen ? "#22c55e" : "var(--red)",
                boxShadow: isOpen
                  ? "0 0 10px rgba(34, 197, 94, 0.5)"
                  : "0 0 10px rgba(196, 30, 42, 0.5)",
                animation: isOpen ? "pulse-green 2s ease-in-out infinite" : undefined,
              }}
            />
            <span
              className="text-sm uppercase tracking-wider font-medium"
              style={{
                fontFamily: "var(--font-ui)",
                color: isOpen ? "#22c55e" : "var(--red)",
              }}
            >
              {isOpen ? t(openNowLabel, locale) : t(closedNowLabel, locale)}
            </span>
          </div>

          {/* Hours list */}
          <div
            className="overflow-hidden"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "4px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 8px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
            }}
          >
            {days.map((day, i) => {
              const isToday = i === currentDay;
              return (
                <div
                  key={day}
                  className="flex items-center justify-between px-6 py-4 transition-colors duration-300"
                  style={{
                    borderBottom:
                      i < 6 ? "1px solid rgba(212, 175, 55, 0.08)" : "none",
                    background: isToday
                      ? "linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(196, 30, 42, 0.04))"
                      : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <Clock
                        size={16}
                        style={{ color: "var(--gold)" }}
                      />
                    )}
                    <span
                      className="text-sm uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-ui)",
                        color: isToday ? "var(--gold)" : "var(--light-gray)",
                        fontWeight: isToday ? 600 : 400,
                      }}
                    >
                      {day}
                    </span>
                  </div>
                  <span
                    className="text-sm tracking-wide"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: isToday ? "var(--gold)" : "var(--cream)",
                      fontWeight: isToday ? 700 : 400,
                    }}
                  >
                    {hoursDisplay[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
