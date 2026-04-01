import { Locale, getDictionary } from "@/lib/i18n";
import { Star, Users, Music, Sparkles } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const stats = [
    { icon: Star, value: "5★", label: locale === "sk" ? "Hodnotenie" : locale === "hu" ? "Értékelés" : locale === "de" ? "Bewertung" : "Rating" },
    { icon: Users, value: "500+", label: locale === "sk" ? "Kapacita" : locale === "hu" ? "Kapacitás" : locale === "de" ? "Kapazität" : "Capacity" },
    { icon: Music, value: "50+", label: locale === "sk" ? "DJs ročne" : locale === "hu" ? "DJ évente" : locale === "de" ? "DJs jährlich" : "DJs yearly" },
    { icon: Sparkles, value: "200+", label: locale === "sk" ? "Eventov" : locale === "hu" ? "Esemény" : locale === "de" ? "Events" : "Events" },
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
              ? "Euphoria Night Club je miesto, kde sa stretáva luxus s energiou nočného života. Naším cieľom je vytvoriť nezabudnuteľné zážitky pre každého hosťa — od VIP izieb po tanečný parket."
              : locale === "hu"
              ? "Az Euphoria Night Club az a hely, ahol a luxus találkozik az éjszakai élet energiájával. Célunk minden vendég számára felejthetetlen élményeket teremteni — a VIP szobáktól a tánctérig."
              : locale === "de"
              ? "Der Euphoria Night Club ist ein Ort, an dem Luxus auf die Energie des Nachtlebens trifft. Unser Ziel ist es, unvergessliche Erlebnisse für jeden Gast zu schaffen — von VIP-Zimmern bis zur Tanzfläche."
              : "Euphoria Night Club is where luxury meets the energy of nightlife. Our goal is to create unforgettable experiences for every guest — from VIP rooms to the dance floor."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="card text-center py-8">
              <Icon size={36} className="text-euphoria-gold mx-auto mb-3" />
              <div className="text-3xl font-heading font-bold mb-1">{value}</div>
              <div className="text-euphoria-muted text-sm uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
