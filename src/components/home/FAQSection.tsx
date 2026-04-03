"use client";

import { useState } from "react";
import { ChevronDown, CalendarCheck, Clock, ShieldCheck, Shirt, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FAQSectionProps {
  locale: string;
}

type LangKey = "sk" | "hu" | "de" | "en";

function t(obj: Record<string, string>, locale: string): string {
  return obj[locale as LangKey] || obj.en;
}

const sectionTitle: Record<string, string> = {
  sk: "Často kladené otázky",
  hu: "Gyakran ismételt kérdések",
  de: "Häufig gestellte Fragen",
  en: "Frequently Asked Questions",
};

const sectionSubtitle: Record<string, string> = {
  sk: "Všetko, čo potrebujete vedieť",
  hu: "Minden, amit tudnia kell",
  de: "Alles, was Sie wissen müssen",
  en: "Everything you need to know",
};

const faqs = [
  {
    icon: CalendarCheck,
    question: {
      sk: "Je potrebná rezervácia?",
      hu: "Szükséges előzetes foglalás?",
      de: "Ist eine Reservierung erforderlich?",
      en: "Is a reservation required?",
    },
    answer: {
      sk: "Rezervácia je odporúčaná, ale nie povinná. Pre privátne izby a bottle service odporúčame rezervovať vopred.",
      hu: "A foglalás ajánlott, de nem kötelező. Privát szobákhoz és palack szervízhez ajánlott előre foglalni.",
      de: "Eine Reservierung wird empfohlen, ist aber nicht zwingend erforderlich. Für Privatzimmer und Flaschenservice empfehlen wir eine Vorabreservierung.",
      en: "Reservation is recommended but not mandatory. For private rooms and bottle service, we recommend booking in advance.",
    },
  },
  {
    icon: Clock,
    question: {
      sk: "Aké sú otváracie hodiny?",
      hu: "Mik a nyitvatartási idők?",
      de: "Was sind die Öffnungszeiten?",
      en: "What are the opening hours?",
    },
    answer: {
      sk: "Naše otváracie hodiny nájdete na stránke kontakt. Otvorené máme každý deň od 19:00.",
      hu: "Nyitvatartási időnket a kapcsolat oldalon találja. Minden nap 19:00-tól nyitva tartunk.",
      de: "Unsere Öffnungszeiten finden Sie auf der Kontaktseite. Wir haben täglich ab 19:00 Uhr geöffnet.",
      en: "Check our contact page for opening hours. We are open daily from 19:00.",
    },
  },
  {
    icon: ShieldCheck,
    question: {
      sk: "Je zaručená diskrétnosť?",
      hu: "Garantált a diszkréció?",
      de: "Ist Diskretion garantiert?",
      en: "Is discretion guaranteed?",
    },
    answer: {
      sk: "Absolútne. Diskrétnosť je naša najvyššia priorita. Žiadne kamery v privátnych priestoroch, diskrétny personál a maximálne súkromie.",
      hu: "Abszolút. A diszkréció a legfontosabb prioritásunk. Nincsenek kamerák a privát helyiségekben, diszkrét személyzet és maximális magánélet.",
      de: "Absolut. Diskretion ist unsere höchste Priorität. Keine Kameras in privaten Bereichen, diskretes Personal und maximale Privatsphäre.",
      en: "Absolutely. Privacy is our top priority. No cameras in private areas, discreet staff and maximum privacy.",
    },
  },
  {
    icon: Shirt,
    question: {
      sk: "Aký je dress code?",
      hu: "Milyen az öltözködési kód?",
      de: "Was ist der Dresscode?",
      en: "What's the dress code?",
    },
    answer: {
      sk: "Smart casual — elegantné oblečenie. Odporúčame košeľu a dlhé nohavice. Športové oblečenie a šľapky nie sú povolené.",
      hu: "Smart casual — elegáns öltözet. Inget és hosszú nadrágot ajánlunk. Sportruha és papucs nem engedélyezett.",
      de: "Smart Casual — elegante Kleidung. Wir empfehlen Hemd und lange Hose. Sportkleidung und Flip-Flops sind nicht erlaubt.",
      en: "Smart casual — elegant attire. We recommend a shirt and long trousers. Sportswear and flip-flops are not permitted.",
    },
  },
  {
    icon: CreditCard,
    question: {
      sk: "Akceptujete platby kartou?",
      hu: "Elfogadnak kártyás fizetést?",
      de: "Akzeptieren Sie Kartenzahlung?",
      en: "Do you accept card payments?",
    },
    answer: {
      sk: "Áno, akceptujeme hotovosť aj platobné karty (Visa, Mastercard). Apple Pay a Google Pay sú taktiež k dispozícii.",
      hu: "Igen, készpénzt és bankkártyát is elfogadunk (Visa, Mastercard). Apple Pay és Google Pay is elérhető.",
      de: "Ja, wir akzeptieren Bargeld und Kartenzahlung (Visa, Mastercard). Apple Pay und Google Pay sind ebenfalls verfügbar.",
      en: "Yes, we accept both cash and card payments (Visa, Mastercard). Apple Pay and Google Pay are also available.",
    },
  },
];

function FAQItem({
  faq,
  locale,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  locale: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = faq.icon;

  return (
    <div
      className="transition-all duration-300"
      style={{
        background: "var(--glass-bg)",
        border: `1px solid ${isOpen ? "rgba(212, 175, 55, 0.35)" : "var(--glass-border)"}`,
        borderRadius: "4px",
        backdropFilter: "blur(12px)",
        boxShadow: isOpen
          ? "0 8px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.08)"
          : "0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div
          className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(196, 30, 42, 0.15), rgba(212, 175, 55, 0.15))",
            border: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <Icon size={18} style={{ color: "var(--gold)" }} />
        </div>

        <span
          className="flex-1 text-base font-medium"
          style={{
            fontFamily: "var(--font-ui)",
            color: isOpen ? "var(--gold)" : "var(--cream)",
            letterSpacing: "0.02em",
          }}
        >
          {t(faq.question, locale)}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronDown size={20} style={{ color: "var(--gold)" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p
              className="px-5 pb-5 pl-19 text-sm leading-relaxed"
              style={{ color: "var(--light-gray)" }}
            >
              {t(faq.answer, locale)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ locale }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ScrollReveal>
      <section
        className="py-28 px-6 relative"
        style={{
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(196, 30, 42, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
            var(--black)
          `,
        }}
      >
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="section-header">
            <h2>{t(sectionTitle, locale)}</h2>
            <p>{t(sectionSubtitle, locale)}</p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <FAQItem
                  faq={faq}
                  locale={locale}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
