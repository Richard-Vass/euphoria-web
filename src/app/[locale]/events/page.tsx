import { Locale, getDictionary } from "@/lib/i18n";
import { Calendar, Music } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    sk: "Eventy & Párty",
    hu: "Események & Partik",
    de: "Events & Partys",
    en: "Events & Parties",
  };
  const descriptions: Record<string, string> = {
    sk: "Najbližšie akcie, párty a tematické večery v Euphoria Night Club Šamorín.",
    hu: "Közelgő események, partik és tematikus esték az Euphoria Night Clubban, Somorján.",
    de: "Kommende Events, Partys und Themenabende im Euphoria Night Club Šamorín.",
    en: "Upcoming events, parties and themed nights at Euphoria Night Club Šamorín.",
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

interface Event {
  id: string;
  title: string;
  date: string;
  dj: string | null;
  type: string | null;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

async function getEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, date, dj, type, description, image_url, is_active")
      .eq("is_active", true)
      .order("date", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }
    return data;
  } catch {
    return [];
  }
}

// Placeholder events — fallback if no events in DB
const placeholderEvents: Event[] = [
  {
    id: "1",
    title: "Grand Opening Party",
    date: "2026-04-15",
    dj: "DJ Shadow",
    type: "party",
    description: null,
    image_url: null,
    is_active: true,
  },
  {
    id: "2",
    title: "Neon Nights",
    date: "2026-04-22",
    dj: "DJ Nova",
    type: "themed",
    description: null,
    image_url: null,
    is_active: true,
  },
  {
    id: "3",
    title: "VIP Friday",
    date: "2026-04-29",
    dj: "DJ Elite",
    type: "vip",
    description: null,
    image_url: null,
    is_active: true,
  },
];

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const dbEvents = await getEvents();
  const events = dbEvents.length > 0 ? dbEvents : placeholderEvents;

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title">{dict.events_title}</h1>
          <div className="gold-line mx-auto mt-4" />
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="card group hover:border-euphoria-gold/30 transition-all duration-300">
              {/* Image */}
              <div className="aspect-video bg-euphoria-gray/30 mb-4 flex items-center justify-center overflow-hidden relative">
                {event.image_url ? (
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Music size={48} className="text-euphoria-muted/30" />
                )}
              </div>

              <div className="flex items-center gap-2 text-euphoria-gold text-sm mb-2">
                <Calendar size={18} />
                <span>{new Date(event.date).toLocaleDateString(locale)}</span>
                {event.type && (
                  <span
                    className="ml-auto text-xs uppercase tracking-wider px-2 py-0.5"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--gold)",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      borderRadius: "2px",
                    }}
                  >
                    {event.type}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-heading font-semibold mb-1">
                {event.title}
              </h3>
              {event.dj && (
                <p className="text-euphoria-muted text-sm mb-1">{event.dj}</p>
              )}
              {event.description && (
                <p className="text-euphoria-muted text-sm mb-4 line-clamp-2">{event.description}</p>
              )}
              {!event.description && <div className="mb-4" />}

              <Link href={`/${locale}/reservation`} className="btn-primary w-full block text-center">
                {dict.events_buy_ticket}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
