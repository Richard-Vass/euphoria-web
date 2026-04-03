import { Locale, getDictionary } from "@/lib/i18n";
import VideoHero from "@/components/home/VideoHero";
import MenuTabs from "@/components/home/MenuTabs";
import Link from "next/link";
import { Calendar, Wine, Music, Sparkles, Cake, Clock, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReviewsSection from "@/components/home/ReviewsSection";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    sk: "Euphoria Night Club | Šamorín",
    cs: "Euphoria Night Club | Šamorín",
    hu: "Euphoria Night Club | Somorja",
    de: "Euphoria Night Club | Šamorín",
    en: "Euphoria Night Club | Šamorín",
  };
  const descriptions: Record<string, string> = {
    sk: "Exkluzívny pánsky bar v Šamoríne. Privátne izby, prémiové koktaily, diskrétna atmosféra.",
    cs: "Exkluzivní pánský bar v Šamoríně. Privátní pokoje, prémiové koktejly, diskrétní atmosféra.",
    hu: "Exkluzív úri bár Somorján. Privát szobák, prémium koktélok, diszkrét hangulat.",
    de: "Exklusive Gentlemen's Bar in Šamorín. Privatzimmer, Premium-Cocktails, diskrete Atmosphäre.",
    en: "Exclusive gentlemen's bar in Šamorín. Private rooms, premium cocktails, discreet atmosphere.",
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
                  ? "Exkluzívny pánsky bar v srdci Šamorína. Diskrétna atmosféra, prémiový zážitok a špičkové koktaily."
                  : locale === "cz"
                  ? "Exkluzivní pánský bar v srdci Šamorínu. Diskrétní atmosféra, prémiový zážitek a špičkové koktejly."
                  : locale === "hu"
                  ? "Exkluzív úri bár Somorja szívében. Diszkrét hangulat, prémium élmény és csúcsminőségű koktélok."
                  : locale === "de"
                  ? "Exklusive Gentlemen's Bar im Herzen von Šamorín. Diskrete Atmosphäre, Premium-Erlebnis und erstklassige Cocktails."
                  : "An exclusive gentlemen's bar in the heart of Šamorín. Discreet atmosphere, premium experience and top-tier cocktails."}
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
                       locale === "cz" ? "Nejlepší párty, DJs a tematické večery" :
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
                      {locale === "sk" ? "Privátna izba" :
                       locale === "cz" ? "Privátní pokoj" :
                       locale === "hu" ? "Privát szoba" :
                       locale === "de" ? "Privatzimmer" :
                       "Private Room"}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "Diskrétna privátna izba pre váš súkromný zážitok" :
                       locale === "cz" ? "Diskrétní privátní pokoj pro váš soukromý zážitek" :
                       locale === "hu" ? "Diszkrét privát szoba az Ön privát élményéhez" :
                       locale === "de" ? "Diskretes Privatzimmer für Ihr privates Erlebnis" :
                       "Discreet private room for your personal experience"}
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
                       locale === "cz" ? "Fotky a videa z nejlepších nocí" :
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

      {/* ─── REVIEWS SECTION ─── */}
      <ReviewsSection locale={locale} />

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
                 locale === "cz" ? "Nápojový lístek" :
                 locale === "hu" ? "Italok" :
                 locale === "de" ? "Getränkekarte" :
                 "Drink Menu"}
              </h2>
              <p>
                {locale === "sk" ? "Prémiové nápoje pripravené s vášňou" :
                 locale === "cz" ? "Prémiové nápoje připravené s vášní" :
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
                 locale === "cz" ? "Nadcházející akce a párty" :
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
                        {locale === "sk" ? "Party" : locale === "cz" ? "Párty" : locale === "hu" ? "Parti" : "Party"}
                      </span>
                      <span className="text-sm" style={{ color: "var(--light-gray)" }}>
                        {locale === "sk" ? "Piatok" : locale === "cz" ? "Pátek" : locale === "hu" ? "Péntek" : locale === "de" ? "Freitag" : "Friday"}
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
                       locale === "cz" ? "DJ sety, neonová světla a nejlepší elektronická hudba." :
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
                      {locale === "sk" ? "Viac info" : locale === "cz" ? "Více info" : locale === "hu" ? "Több infó" : locale === "de" ? "Mehr Info" : "More info"} &rarr;
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
                        Premium
                      </span>
                      <span className="text-sm" style={{ color: "var(--light-gray)" }}>
                        {locale === "sk" ? "Sobota" : locale === "cz" ? "Sobota" : locale === "hu" ? "Szombat" : locale === "de" ? "Samstag" : "Saturday"}
                      </span>
                    </div>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--white)" }}
                    >
                      Gold & Glamour
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--light-gray)" }}>
                      {locale === "sk" ? "Exkluzívna noc s bottle service a prémiovými koktailmi." :
                       locale === "cz" ? "Exkluzivní noc s bottle service a prémiovými koktejly." :
                       locale === "hu" ? "Exkluzív est palack szervízzel és prémium koktélokkal." :
                       locale === "de" ? "Exklusive Nacht mit Flaschenservice und Premium-Cocktails." :
                       "Exclusive night with bottle service and premium cocktails."}
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
                      {locale === "sk" ? "Viac info" : locale === "cz" ? "Více info" : locale === "hu" ? "Több infó" : locale === "de" ? "Mehr Info" : "More info"} &rarr;
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
                        {locale === "sk" ? "Piatok" : locale === "cz" ? "Pátek" : locale === "hu" ? "Péntek" : locale === "de" ? "Freitag" : "Friday"}
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
                       locale === "cz" ? "Živá hudba, salsa a latino atmosféra." :
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
                      {locale === "sk" ? "Viac info" : locale === "cz" ? "Více info" : locale === "hu" ? "Több infó" : locale === "de" ? "Mehr Info" : "More info"} &rarr;
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/events`} className="btn-secondary">
                {locale === "sk" ? "Všetky eventy" : locale === "cz" ? "Všechny události" : locale === "hu" ? "Összes rendezvény" : locale === "de" ? "Alle Events" : "All events"}
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── SPECIAL OFFERS SECTION ─── */}
      <ScrollReveal delay={100}>
        <section
          className="py-28 px-6 relative"
          style={{
            background: `
              radial-gradient(ellipse at 40% 50%, rgba(196, 30, 42, 0.06) 0%, transparent 60%),
              linear-gradient(180deg, var(--black) 0%, var(--deep-red-bg) 50%, var(--black) 100%)
            `,
          }}
        >
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="section-header">
              <h2>
                {locale === "sk" ? "Speciálne ponuky" :
                 locale === "cz" ? "Speciální nabídky" :
                 locale === "hu" ? "Különleges ajánlatok" :
                 locale === "de" ? "Spezielle Angebote" :
                 "Special Offers"}
              </h2>
              <p>
                {locale === "sk" ? "Exkluzívne ponuky len pre vás" :
                 locale === "cz" ? "Exkluzivní nabídky jen pro vás" :
                 locale === "hu" ? "Exkluzív ajánlatok csak Önnek" :
                 locale === "de" ? "Exklusive Angebote nur für Sie" :
                 "Exclusive offers just for you"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Birthday Package */}
              <ScrollReveal delay={0}>
                <div
                  className="relative p-6 text-center group transition-all duration-500 hover:translate-y-[-5px]"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(135deg, var(--gold), rgba(212, 175, 55, 0.2), var(--gold)) 1",
                    borderRadius: "0px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
                  }}
                >
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(196, 30, 42, 0.1))",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                      }}
                    >
                      <Cake size={28} style={{ color: "var(--gold)" }} />
                    </div>
                  </div>
                  <h3
                    className="text-xl uppercase tracking-wider mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
                  >
                    {locale === "sk" ? "Narodeninový balíček" :
                     locale === "cz" ? "Narozeninový balíček" :
                     locale === "hu" ? "Születésnapi csomag" :
                     locale === "de" ? "Geburtstagspaket" :
                     "Birthday Package"}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Privátna izba + fľaša šampanského zadarmo" :
                     locale === "cz" ? "Privátní pokoj + láhev šampaňského zdarma" :
                     locale === "hu" ? "Privát szoba + egy üveg pezsgő ingyen" :
                     locale === "de" ? "Privatzimmer + eine Flasche Champagner gratis" :
                     "Private room + free bottle of champagne"}
                  </p>
                  <Link
                    href={`/${locale}/reservation`}
                    className="inline-block text-sm uppercase tracking-wider hover:text-[var(--light-gold)] transition-colors"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--gold)", letterSpacing: "0.1em" }}
                  >
                    {locale === "sk" ? "Rezervovať" : locale === "cz" ? "Rezervovat" : locale === "hu" ? "Foglalás" : locale === "de" ? "Reservieren" : "Reserve"} &rarr;
                  </Link>
                </div>
              </ScrollReveal>

              {/* Happy Hour */}
              <ScrollReveal delay={100}>
                <div
                  className="relative p-6 text-center group transition-all duration-500 hover:translate-y-[-5px]"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(135deg, var(--gold), rgba(212, 175, 55, 0.2), var(--gold)) 1",
                    borderRadius: "0px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
                  }}
                >
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(196, 30, 42, 0.1))",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                      }}
                    >
                      <Clock size={28} style={{ color: "var(--gold)" }} />
                    </div>
                  </div>
                  <h3
                    className="text-xl uppercase tracking-wider mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
                  >
                    Happy Hour
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Každý deň 19:00 – 21:00, 30% zľava na drinky" :
                     locale === "cz" ? "Každý den 19:00 – 21:00, 30% sleva na drinky" :
                     locale === "hu" ? "Minden nap 19:00 – 21:00, 30% kedvezmény az italokra" :
                     locale === "de" ? "Täglich 19:00 – 21:00, 30% Rabatt auf Getränke" :
                     "Every day 19:00 – 21:00, 30% off drinks"}
                  </p>
                  <Link
                    href={`/${locale}/reservation`}
                    className="inline-block text-sm uppercase tracking-wider hover:text-[var(--light-gold)] transition-colors"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--gold)", letterSpacing: "0.1em" }}
                  >
                    {locale === "sk" ? "Rezervovať" : locale === "cz" ? "Rezervovat" : locale === "hu" ? "Foglalás" : locale === "de" ? "Reservieren" : "Reserve"} &rarr;
                  </Link>
                </div>
              </ScrollReveal>

              {/* Bottle Service */}
              <ScrollReveal delay={200}>
                <div
                  className="relative p-6 text-center group transition-all duration-500 hover:translate-y-[-5px]"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(135deg, var(--gold), rgba(212, 175, 55, 0.2), var(--gold)) 1",
                    borderRadius: "0px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
                  }}
                >
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(196, 30, 42, 0.1))",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                      }}
                    >
                      <Wine size={28} style={{ color: "var(--gold)" }} />
                    </div>
                  </div>
                  <h3
                    className="text-xl uppercase tracking-wider mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
                  >
                    Bottle Service
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Prémiová fľaša k privátnej izbe — diskrétny servis na úrovni" :
                     locale === "cz" ? "Prémiová láhev k privátnímu pokoji — diskrétní servis na úrovni" :
                     locale === "hu" ? "Prémium palack a privát szobához — diszkrét, magas szintű szolgáltatás" :
                     locale === "de" ? "Premium-Flasche zum Privatzimmer — diskreter Service auf höchstem Niveau" :
                     "Premium bottle with private room — discreet top-level service"}
                  </p>
                  <Link
                    href={`/${locale}/reservation`}
                    className="inline-block text-sm uppercase tracking-wider hover:text-[var(--light-gold)] transition-colors"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--gold)", letterSpacing: "0.1em" }}
                  >
                    {locale === "sk" ? "Rezervovať" : locale === "cz" ? "Rezervovat" : locale === "hu" ? "Foglalás" : locale === "de" ? "Reservieren" : "Reserve"} &rarr;
                  </Link>
                </div>
              </ScrollReveal>
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
                {locale === "sk" ? "Rezervuj si privátnu izbu" :
                 locale === "cz" ? "Rezervujte si privátní pokoj" :
                 locale === "hu" ? "Foglaljon privát szobát" :
                 locale === "de" ? "Reservieren Sie ein Privatzimmer" :
                 "Reserve a private room"}
              </h2>
              <p>
                {locale === "sk" ? "Diskrétna privátna izba, maximálne súkromie. Rezervuj teraz." :
                 locale === "cz" ? "Diskrétní privátní pokoj, maximální soukromí. Rezervujte nyní." :
                 locale === "hu" ? "Diszkrét privát szoba, maximális magánélet. Foglaljon most." :
                 locale === "de" ? "Diskretes Privatzimmer, maximale Privatsphäre. Jetzt reservieren." :
                 "Discreet private room, maximum privacy. Reserve now."}
              </p>
            </div>
            <Link href={`/${locale}/reservation`} className="btn-primary">
              {dict.hero_cta}
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── INSTAGRAM SECTION ─── */}
      <ScrollReveal delay={100}>
        <section
          className="py-28 px-6 relative"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(196, 30, 42, 0.04) 0%, transparent 60%),
              linear-gradient(180deg, var(--black) 0%, var(--deep-red-bg) 50%, var(--black) 100%)
            `,
          }}
        >
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="section-header">
              <h2>Instagram</h2>
              <p>
                {locale === "sk" ? "Sledujte nás na Instagrame" :
                 locale === "cz" ? "Sledujte nás na Instagramu" :
                 locale === "hu" ? "Kövessen minket az Instagramon" :
                 locale === "de" ? "Folgen Sie uns auf Instagram" :
                 "Follow us on Instagram"}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/euphoria_nightclub_samorin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, var(--deep-red-bg), var(--deep-red), #1a0508)",
                    border: "1px solid var(--glass-border)",
                  }}
                  aria-label={`Instagram post ${i + 1}`}
                >
                  {/* Placeholder pattern */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(196, 30, 42, 0.6), rgba(212, 175, 55, 0.4))",
                    }}
                  >
                    <svg className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="https://www.instagram.com/euphoria_nightclub_samorin/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @euphoria_nightclub_samorin
              </a>
            </div>
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
                    {locale === "sk" ? "Adresa" : locale === "cz" ? "Adresa" : locale === "hu" ? "Cím" : locale === "de" ? "Adresse" : "Address"}
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
                    {locale === "sk" ? "Telefon" : locale === "cz" ? "Telefon" : locale === "hu" ? "Telefon" : locale === "de" ? "Telefon" : "Phone"}
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
                    {locale === "sk" ? "Pondelok - Štvrtok" : locale === "cz" ? "Pondělí - Čtvrtek" : locale === "hu" ? "Hétfő - Csütörtök" : locale === "de" ? "Montag - Donnerstag" : "Monday - Thursday"}: 19:00 - 02:00
                  </p>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Piatok" : locale === "cz" ? "Pátek" : locale === "hu" ? "Péntek" : locale === "de" ? "Freitag" : "Friday"}: 19:00 - 04:00
                  </p>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Sobota" : locale === "cz" ? "Sobota" : locale === "hu" ? "Szombat" : locale === "de" ? "Samstag" : "Saturday"}: 19:00 - 06:00
                  </p>
                  <p className="text-sm" style={{ color: "var(--light-gray)" }}>
                    {locale === "sk" ? "Nedeľa" : locale === "cz" ? "Neděle" : locale === "hu" ? "Vasárnap" : locale === "de" ? "Sonntag" : "Sunday"}: 19:00 - 02:00
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
