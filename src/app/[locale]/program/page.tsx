import { Locale, getDictionary } from "@/lib/i18n";
import DJSchedule from "@/components/home/DJSchedule";
import InstagramFeed from "@/components/home/InstagramFeed";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    sk: "DJ program — Euphoria Night Club",
    cs: "DJ program — Euphoria Night Club",
    hu: "DJ program — Euphoria Night Club",
    de: "DJ Programm — Euphoria Night Club",
    en: "DJ program — Euphoria Night Club",
  };
  const descriptions: Record<string, string> = {
    sk: "Kompletný DJ rozpis a týždenný program Euphoria Night Club v Šamoríne. Rezidenti a hosťujúci DJi, žánre, časy.",
    cs: "Kompletní DJ rozpis a týdenní program Euphoria Night Club v Šamoríně.",
    hu: "Teljes DJ és heti program — Euphoria Night Club, Somorja.",
    de: "Vollständiger DJ-Zeitplan und Wochenprogramm im Euphoria Night Club, Šamorín.",
    en: "Full DJ schedule and weekly program at Euphoria Night Club, Šamorín.",
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

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // preserve i18n hook for future expansion (header section nadpis)
  await getDictionary(locale as Locale);

  return (
    <>
      <DJSchedule locale={locale as Locale} />
      <InstagramFeed locale={locale as Locale} />
    </>
  );
}
