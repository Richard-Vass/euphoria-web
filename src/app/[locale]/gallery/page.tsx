import { Locale, getDictionary } from "@/lib/i18n";
import { Camera } from "lucide-react";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    sk: "Galéria",
    hu: "Galéria",
    de: "Galerie",
    en: "Gallery",
  };
  const descriptions: Record<string, string> = {
    sk: "Fotky a videá z najlepších nocí v Euphoria Night Club.",
    hu: "Fotók és videók a legjobb éjszakákról az Euphoria Night Clubban.",
    de: "Fotos und Videos der besten Nächte im Euphoria Night Club.",
    en: "Photos and videos from the best nights at Euphoria Night Club.",
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

interface GalleryImage {
  id: string;
  url: string;
  alt: string | null;
  category: string | null;
  sort_order: number | null;
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("id, url, alt, category, sort_order")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }
    return data;
  } catch {
    return [];
  }
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const images = await getGalleryImages();

  const comingSoonText =
    locale === "sk" ? "Fotky budú doplnené čoskoro." :
    locale === "hu" ? "A fotók hamarosan érkeznek." :
    locale === "de" ? "Fotos folgen in Kürze." :
    "Photos coming soon.";

  // Placeholder grid
  const placeholders = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    aspect: i % 3 === 0 ? "aspect-square" : i % 3 === 1 ? "aspect-video" : "aspect-[3/4]",
  }));

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title">{dict.gallery_title}</h1>
          <div className="gold-line mx-auto mt-4" />
        </div>

        {images.length > 0 ? (
          <GalleryGrid images={images} />
        ) : (
          <>
            <p className="text-center text-euphoria-muted mb-8">
              {comingSoonText}
            </p>

            {/* Masonry grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {placeholders.map((item) => (
                <div
                  key={item.id}
                  className={`${item.aspect} bg-euphoria-dark border border-euphoria-gray/20 flex items-center justify-center group hover:border-euphoria-gold/30 transition-all duration-300 cursor-pointer break-inside-avoid`}
                >
                  <Camera
                    size={40}
                    className="text-euphoria-muted/20 group-hover:text-euphoria-gold/30 transition-colors"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
