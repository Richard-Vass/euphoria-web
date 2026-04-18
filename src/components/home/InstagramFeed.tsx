import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import InstagramIcon from "@/components/icons/InstagramIcon";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  thumbnail_url?: string;
}

// Instagram Graph API — len ak je token v env
// Vytvorí sa cez https://developers.facebook.com/apps/ ako Business Display
// Minimálne scope: instagram_basic, pages_show_list
async function fetchInstagramFeed(limit = 6): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type,thumbnail_url&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache 1 hodina
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data as InstagramPost[]) || [];
  } catch {
    return [];
  }
}

const titleLabels: Record<string, string> = {
  sk: "Sledujte nás na Instagrame",
  cz: "Sledujte nás na Instagramu",
  hu: "Kövessen minket Instagramon",
  de: "Folgen Sie uns auf Instagram",
  en: "Follow us on Instagram",
};

const subLabels: Record<string, string> = {
  sk: "Najnovšie momenty z klubu @euphoria_nightclub_samorin",
  cz: "Nejnovější momenty z klubu @euphoria_nightclub_samorin",
  hu: "Legfrissebb pillanatok a klubból @euphoria_nightclub_samorin",
  de: "Neueste Momente aus dem Club @euphoria_nightclub_samorin",
  en: "Latest moments from the club @euphoria_nightclub_samorin",
};

const ctaLabels: Record<string, string> = {
  sk: "Otvoriť Instagram",
  cz: "Otevřít Instagram",
  hu: "Instagram megnyitása",
  de: "Instagram öffnen",
  en: "Open Instagram",
};

interface Props {
  locale: Locale;
  username?: string;
}

export default async function InstagramFeed({
  locale,
  username = "euphoria_nightclub_samorin",
}: Props) {
  const posts = await fetchInstagramFeed(6);
  const hasRealFeed = posts.length > 0;

  return (
    <section className="py-20 px-4" aria-labelledby="ig-feed-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <InstagramIcon className="text-euphoria-gold" size={32} />
          </div>
          <h2 id="ig-feed-title" className="section-title">
            {titleLabels[locale] || titleLabels.en}
          </h2>
          <div className="gold-line mx-auto mt-4" />
          <p className="text-euphoria-muted mt-6 text-sm">
            {subLabels[locale] || subLabels.en}
          </p>
        </div>

        {hasRealFeed ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post) => {
              const mediaUrl =
                post.media_type === "VIDEO" && post.thumbnail_url
                  ? post.thumbnail_url
                  : post.media_url;
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group aspect-square relative overflow-hidden rounded-sm border border-euphoria-gold/10 hover:border-euphoria-gold/50 transition-all duration-300"
                  aria-label={post.caption?.slice(0, 80) || "Instagram post"}
                >
                  <Image
                    src={mediaUrl}
                    alt={post.caption?.slice(0, 80) || "Instagram post"}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <InstagramIcon
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      size={32}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          /* Placeholder grid — kým nedodá klient INSTAGRAM_ACCESS_TOKEN */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square relative overflow-hidden rounded-sm border border-euphoria-gold/10 bg-gradient-to-br from-euphoria-gray/40 to-euphoria-black/80 flex items-center justify-center"
                aria-hidden="true"
              >
                <InstagramIcon
                  size={40}
                  className="text-euphoria-gold/20"
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-euphoria-muted/60">
                  #{i + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href={`https://www.instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <InstagramIcon size={18} />
            {ctaLabels[locale] || ctaLabels.en}
          </a>
        </div>
      </div>
    </section>
  );
}
