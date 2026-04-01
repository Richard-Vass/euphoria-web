import { Locale, getDictionary } from "@/lib/i18n";
import VideoHero from "@/components/home/VideoHero";
import MenuTabs from "@/components/home/MenuTabs";
import Link from "next/link";
import { Calendar, Wine, Music, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    sk: "Euphoria Night Club | Šamorín",
    hu: "Euphoria Night Club | Somorja",
    de: "Euphoria Night Club | Šamorín",
    en: "Euphoria Night Club | Šamorín",
  };
  const descriptions: Record<string, string> = {
    sk: "Luxusný nočný klub v Šamoríne. VIP izby, prémiové koktaily, nezabudnuteľné nočné eventy.",
    hu: "Luxus éjszakai klub Somorján. VIP szobák, prémium koktélok, felejthetetlen esti események.",
    de: "Luxuriöser Nachtclub in Šamorín. VIP-Zimmer, Premium-Cocktails, unvergessliche Nacht-Events.",
    en: "Luxury nightclub in Šamorín. VIP rooms, premium cocktails, unforgettable night events.",
  };
  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero */}
      <VideoHero locale={locale as Locale} dict={dict} />

      {/* ─── ABOUT SECTION (from demo: #about background) ─── */}
      <ScrollReveal>
        <section
          className="py-28 px-6 relative"
          style={{
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(139, 0, 0, 0.08) 0%, transparent 60%),
              linear-gradient(180deg, var(--black) 0%, var(--deep-red-bg) 50%, var(--black) 100%)
            `,
          }}
        >
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="section-header">
              <h2>Euphoria</h2>
              <p>
                {locale === "sk"
                  ? "Exkluzívny nočný klub v srdci Šamorína. Prémiový zážitok, špičkové koktaily a nezabudnuteľné noci."
                  : locale === "hu"
                  ? "Exkluzív éjszakai klub Somorja szívében. Prémium élmény, csúcsminőségű koktélok és felejthetetlen éjszakák."
                  : locale === "de"
                  ? "Exklusiver Nachtclub im Herzen von Šamorín. Premium-Erlebnis, erstklassige Cocktails und unvergessliche Nächte."
                  : "An exclusive nightclub in the heart of Šamorín. Premium experience, top-tier cocktails and unforgettable nights."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0}>
                <Link href={`/${locale}/events`} className="card group block">
                  <div className="flex flex-col items-center text-center gap-4 py-6">
                    <Calendar size={36} style={{ color: "var(--gold)" }} />
                    <h3
                      className="text-xl uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
                    >
                      {dict.nav_events}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "Najlepšie párty, DJs a tematické večery" :
                       locale === "hu" ? "A legjobb partik, DJ-k és tematikus esték" :
                       locale === "de" ? "Die besten Partys, DJs und Themenabende" :
                       "The best parties, DJs and themed nights"}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <Link href={`/${locale}/reservation`} className="card group block">
                  <div className="flex flex-col items-center text-center gap-4 py-6">
                    <Wine size={36} style={{ color: "var(--gold)" }} />
                    <h3
                      className="text-xl uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
                    >
                      VIP
                    </h3>
                    <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "VIP izby, bottle service a exkluzívny zážitok" :
                       locale === "hu" ? "VIP szobák, palack szervíz és exkluzív élmény" :
                       locale === "de" ? "VIP-Zimmer, Flaschenservice und exklusives Erlebnis" :
                       "VIP rooms, bottle service and an exclusive experience"}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <Link href={`/${locale}/gallery`} className="card group block">
                  <div className="flex flex-col items-center text-center gap-4 py-6">
                    <Music size={36} style={{ color: "var(--gold)" }} />
                    <h3
                      className="text-xl uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
                    >
                      {dict.nav_gallery}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "Fotky a videá z najlepších nocí" :
                       locale === "hu" ? "Fotók és videók a legjobb éjszakákról" :
                       locale === "de" ? "Fotos und Videos der besten Nächte" :
                       "Photos and videos from the best nights"}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── MENU SECTION (from demo: #menu background) ─── */}
      <ScrollReveal delay={100}>
        <section
          className="py-28 px-6 relative"
          style={{
            background: `
              radial-gradient(ellipse at 70% 40%, rgba(74, 0, 17, 0.1) 0%, transparent 60%),
              var(--black)
            `,
          }}
        >
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="section-header">
              <h2>
                {locale === "sk" ? "Nápojový lístok" :
                 locale === "hu" ? "Italok" :
                 locale === "de" ? "Getränkekarte" :
                 "Drink Menu"}
              </h2>
              <p>
                {locale === "sk" ? "Prémiové nápoje pripravené s vášňou" :
                 locale === "hu" ? "Prémium italok szenvedéllyel készítve" :
                 locale === "de" ? "Premium-Getränke mit Leidenschaft zubereitet" :
                 "Premium drinks crafted with passion"}
              </p>
            </div>

            <MenuTabs locale={locale} />
          </div>
        </section>
      </ScrollReveal>

      {/* ─── EVENTS SECTION (from demo: #events background) ─── */}
      <ScrollReveal delay={100}>
        <section
          className="py-28 px-6 relative"
          style={{ background: "var(--black)" }}
        >
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="section-header">
              <h2>{dict.nav_events}</h2>
              <p>
                {locale === "sk" ? "Najbližšie akcie a párty" :
                 locale === "hu" ? "Közelgő rendezvények és partik" :
                 locale === "de" ? "Kommende Events und Partys" :
                 "Upcoming events and parties"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Event card 1 */}
              <ScrollReveal delay={0}>
                <div className="event-card">
                  <div
                    className="h-[200px] flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--deep-red-bg), var(--deep-red), #1a0508)" }}
                  >
                    <Sparkles size={48} style={{ color: "rgba(212, 175, 55, 0.3)" }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs uppercase tracking-wider px-3 py-1"
                        style={{
                          fontFamily: "var(--font-ui)",
                          color: "var(--gold)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "2px",
                        }}
                      >
                        {locale === "sk" ? "Party" : locale === "hu" ? "Parti" : "Party"}
                      </span>
                      <span className="text-sm" style={{ color: "var(--light-gray)" }}>
                        {locale === "sk" ? "Piatok" : locale === "hu" ? "Péntek" : locale === "de" ? "Freitag" : "Friday"}
                      </span>
                    </div>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--white)" }}
                    >
                      Neon Nights
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "DJ sets, neónové svetlá a najlepšia elektronická hudba." :
                       locale === "hu" ? "DJ szettek, neon fények és a legjobb elektronikus zene." :
                       locale === "de" ? "DJ-Sets, Neonlichter und die beste elektronische Musik." :
                       "DJ sets, neon lights and the best electronic music."}
                    </p>
                    <Link
                      href={`/${locale}/events`}
                      className="hover:text-[var(--light-gold)] transition-colors"
                      style={{
                        fontFamily: "var(--font-ui)",
                        color: "var(--gold)",
                        fontSize: "0.85rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {locale === "sk" ? "Viac info" : locale === "hu" ? "Több infó" : locale === "de" ? "Mehr Info" : "More info"} &rarr;
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Event card 2 */}
              <ScrollReveal delay={100}>
                <div className="event-card">
                  <div
                    className="h-[200px] flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--deep-red-bg), var(--deep-red), #1a0508)" }}
                  >
                    <Wine size={48} style={{ color: "rgba(212, 175, 55, 0.3)" }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs uppercase tracking-wider px-3 py-1"
                        style={{
                          fontFamily: "var(--font-ui)",
                          color: "var(--gold)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "2px",
                        }}
                      >
                        VIP
                      </span>
                      <span className="text-sm" style={{ color: "var(--light-gray)" }}>
                        {locale === "sk" ? "Sobota" : locale === "hu" ? "Szombat" : locale === "de" ? "Samstag" : "Saturday"}
                      </span>
                    </div>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--white)" }}
                    >
                      Gold & Glamour
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "Exkluzívna VIP noc s bottle service a prémiovými koktailmi." :
                       locale === "hu" ? "Exkluzív VIP est palack szervízzel és prémium koktélokkal." :
                       locale === "de" ? "Exklusive VIP-Nacht mit Flaschenservice und Premium-Cocktails." :
                       "Exclusive VIP night with bottle service and premium cocktails."}
                    </p>
                    <Link
                      href={`/${locale}/events`}
                      className="hover:text-[var(--light-gold)] transition-colors"
                      style={{
                        fontFamily: "var(--font-ui)",
                        color: "var(--gold)",
                        fontSize: "0.85rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {locale === "sk" ? "Viac info" : locale === "hu" ? "Több infó" : locale === "de" ? "Mehr Info" : "More info"} &rarr;
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Event card 3 */}
              <ScrollReveal delay={200}>
                <div className="event-card">
                  <div
                    className="h-[200px] flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--deep-red-bg), var(--deep-red), #1a0508)" }}
                  >
                    <Music size={48} style={{ color: "rgba(212, 175, 55, 0.3)" }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs uppercase tracking-wider px-3 py-1"
                        style={{
                          fontFamily: "var(--font-ui)",
                          color: "var(--gold)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "2px",
                        }}
                      >
                        Live
                      </span>
                      <span className="text-sm" style={{ color: "var(--light-gray)" }}>
                        {locale === "sk" ? "Piatok" : locale === "hu" ? "Péntek" : locale === "de" ? "Freitag" : "Friday"}
                      </span>
                    </div>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--white)" }}
                    >
                      Latin Vibes
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "Živá hudba, salsa a latino atmosféra." :
                       locale === "hu" ? "Élő zene, salsa és latin hangulat." :
                       locale === "de" ? "Live-Musik, Salsa und Latino-Atmosphäre." :
                       "Live music, salsa and latino atmosphere."}
                    </p>
                    <Link
                      href={`/${locale}/events`}
                      className="hover:text-[var(--light-gold)] transition-colors"
                      style={{
                        fontFamily: "var(--font-ui)",
                        color: "var(--gold)",
                        fontSize: "0.85rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {locale === "sk" ? "Viac info" : locale === "hu" ? "Több infó" : locale === "de" ? "Mehr Info" : "More info"} &rarr;
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/events`} className="btn-secondary">
                {locale === "sk" ? "Všetky eventy" : locale === "hu" ? "Összes rendezvény" : locale === "de" ? "Alle Events" : "All events"}
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── RESERVATION CTA SECTION ─── */}
      <ScrollReveal delay={100}>
        <section
          className="py-28 px-6 relative overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(196, 30, 42, 0.06) 0%, transparent 60%),
              linear-gradient(160deg, var(--black) 0%, var(--deep-red-bg) 40%, #120408 70%, var(--black) 100%)
            `,
          }}
        >
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="section-header">
              <h2>
                {locale === "sk" ? "Rezervuj si VIP izbu" :
                 locale === "hu" ? "Foglald le a VIP szobát" :
                 locale === "de" ? "Reserviere dein VIP-Zimmer" :
                 "Reserve your VIP room"}
              </h2>
              <p>
                {locale === "sk" ? "VIP izby, bottle service a nezabudnuteľný zážitok. Rezervuj teraz a zabezpeč si miesto." :
                 locale === "hu" ? "VIP szobák, palack szervíz és felejthetetlen élmény. Foglalj most és biztosítsd a helyed." :
                 locale === "de" ? "VIP-Zimmer, Flaschenservice und unvergessliches Erlebnis. Jetzt reservieren." :
                 "VIP rooms, bottle service and an unforgettable experience. Reserve now and secure your spot."}
              </p>
            </div>
            <Link href={`/${locale}/reservation`} className="btn-primary">
              {dict.hero_cta}
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── CONTACT SECTION (from demo: #contact) ─── */}
      <ScrollReveal delay={100}>
        <section
          className="py-28 px-6 relative"
          style={{
            background: `
              radial-gradient(ellipse at 60% 50%, rgba(74, 0, 17, 0.06) 0%, transparent 60%),
              var(--black)
            `,
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="section-header">
              <h2>{dict.nav_contact}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Address */}
              <ScrollReveal delay={0}>
                <div className="card text-center py-8">
                  <div className="flex justify-center mb-4" style={{ color: "var(--gold)" }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg uppercase tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--cream)" }}
                  >
                    {locale === "sk" ? "Adresa" : locale === "hu" ? "Cím" : locale === "de" ? "Adresse" : "Address"}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>Bratislavská 11</p>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>931 01 Šamorín</p>
                </div>
              </ScrollReveal>

              {/* Phone & Email */}
              <ScrollReveal delay={100}>
                <div className="card text-center py-8">
                  <div className="flex justify-center mb-4" style={{ color: "var(--gold)" }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg uppercase tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--cream)" }}
                  >
                    {locale === "sk" ? "Telefon" : locale === "hu" ? "Telefon" : locale === "de" ? "Telefon" : "Phone"}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    <a href="tel:+421950480799" className="hover:text-[var(--gold)] transition-colors">+421 950 480 799</a>
                  </p>
                  <p className="text-sm mt-1" style={{ color: "var(--light-gray)" }}>
                    <a href="mailto:euphorianightclub11@gmail.com" className="hover:text-[var(--gold)] transition-colors">euphorianightclub11@gmail.com</a>
                  </p>
                </div>
              </ScrollReveal>

              {/* Hours */}
              <ScrollReveal delay={200}>
                <div className="card text-center py-8">
                  <div className="flex justify-center mb-4" style={{ color: "var(--gold)" }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg uppercase tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--cream)" }}
                  >
                    {dict.contact_hours}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Pondelok - Štvrtok" : locale === "hu" ? "Hétfő - Csütörtök" : locale === "de" ? "Montag - Donnerstag" : "Monday - Thursday"}: 19:00 - 02:00
                  </p>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Piatok" : locale === "hu" ? "Péntek" : locale === "de" ? "Freitag" : "Friday"}: 19:00 - 04:00
                  </p>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Sobota" : locale === "hu" ? "Szombat" : locale === "de" ? "Samstag" : "Saturday"}: 19:00 - 06:00
                  </p>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Nedeľa" : locale === "hu" ? "Vasárnap" : locale === "de" ? "Sonntag" : "Sunday"}: 19:00 - 02:00
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
