import { Locale, getDictionary } from "@/lib/i18n";
import { Star, Users, Music, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import WhyEuphoriaSection from "@/components/about/WhyEuphoriaSection";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    sk: "O nás",
    cs: "O nás",
    hu: "Rólunk",
    de: "Über uns",
    en: "About",
  };
  const descriptions: Record<string, string> = {
    sk: "Euphoria Night Club — exkluzívny nočný klub v Šamoríne. Naša história a hodnoty.",
    cs: "Euphoria Night Club — exkluzivní noční klub v Šamoríně. Náš příběh a hodnoty.",
    hu: "Euphoria Night Club — exkluzív éjszakai klub Somorján. Történetünk és értékeink.",
    de: "Euphoria Night Club — exklusiver Nachtclub in Šamorín. Unsere Geschichte und Werte.",
    en: "Euphoria Night Club — an exclusive nightclub in Šamorín. Our story and values.",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const stats = [
    { icon: Star, target: 5, suffix: "★", label: locale === "sk" ? "Hodnotenie" : locale === "cs" ? "Hodnocení" : locale === "hu" ? "Értékelés" : locale === "de" ? "Bewertung" : "Rating" },
    { icon: Users, target: 500, suffix: "+", label: locale === "sk" ? "Kapacita" : locale === "cs" ? "Kapacita" : locale === "hu" ? "Kapacitás" : locale === "de" ? "Kapazität" : "Capacity" },
    { icon: Music, target: 50, suffix: "+", label: locale === "sk" ? "DJs ročne" : locale === "cs" ? "DJs ročně" : locale === "hu" ? "DJ évente" : locale === "de" ? "DJs jährlich" : "DJs yearly" },
    { icon: Sparkles, target: 200, suffix: "+", label: locale === "sk" ? "Eventov" : locale === "cs" ? "Událostí" : locale === "hu" ? "Esemény" : locale === "de" ? "Events" : "Events" },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title">{dict.about_title}</h1>
          <div className="gold-line mx-auto mt-4" />
        </div>

        {/* Story */}
        <div className="card mb-16 text-center py-12 px-8">
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-6">
            {dict.about_story}
          </h2>
          <p className="text-euphoria-muted text-sm max-w-2xl mx-auto leading-relaxed">
            {locale === "sk"
              ? "Euphoria Night Club je miesto, kde sa stretáva luxus s diskrétnou atmosférou. Naším cieľom je vytvoriť nezabudnuteľné zážitky pre každého hosťa — privátne izby, prémiový servis a absolútna diskrétnosť."
              : locale === "cs"
              ? "Euphoria Night Club je místo, kde se setkává luxus s diskrétní atmosférou. Naším cílem je vytvořit nezapomenutelné zážitky pro každého hosta — privátní pokoje, prémiový servis a absolutní diskrétnost."
              : locale === "hu"
              ? "Az Euphoria Night Club az a hely, ahol a luxus találkozik a diszkrét hangulattal. Célunk minden vendég számára felejthetetlen élményeket teremteni — privát szobák, prémium szolgáltatás és teljes diszkréció."
              : locale === "de"
              ? "Der Euphoria Night Club ist ein Ort, an dem Luxus auf diskrete Atmosphäre trifft. Unser Ziel ist es, unvergessliche Erlebnisse für jeden Gast zu schaffen — private Zimmer, Premium-Service und absolute Diskretion."
              : "Euphoria Night Club is where luxury meets discreet atmosphere. Our goal is to create unforgettable experiences for every guest — private rooms, premium service and absolute discretion."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, target, suffix, label }) => (
            <div key={label} className="card text-center py-8">
              <Icon size={36} className="text-euphoria-gold mx-auto mb-3" />
              <div className="text-3xl font-heading font-bold mb-1">
                <AnimatedCounter target={target} suffix={suffix} />
              </div>
              <div className="text-euphoria-muted text-sm uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Why Euphoria */}
        <WhyEuphoriaSection locale={locale} />
      </div>
    </section>
  );
}
