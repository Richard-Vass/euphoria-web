import { Locale, getDictionary } from "@/lib/i18n";
import { Calendar, Music } from "lucide-react";
import Link from "next/link";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Placeholder events — will be loaded from Supabase
  const placeholderEvents = [
    {
      id: "1",
      title: "Grand Opening Party",
      date: "2026-04-15",
      dj: "DJ Shadow",
      type: "party",
      image: null,
    },
    {
      id: "2",
      title: "Neon Nights",
      date: "2026-04-22",
      dj: "DJ Nova",
      type: "themed",
      image: null,
    },
    {
      id: "3",
      title: "VIP Friday",
      date: "2026-04-29",
      dj: "DJ Elite",
      type: "vip",
      image: null,
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title">{dict.events_title}</h1>
          <div className="gold-line mx-auto mt-4" />
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderEvents.map((event) => (
            <div key={event.id} className="card group hover:border-euphoria-gold/30 transition-all duration-300">
              {/* Image placeholder */}
              <div className="aspect-video bg-euphoria-gray/30 mb-4 flex items-center justify-center">
                <Music size={48} className="text-euphoria-muted/30" />
              </div>

              <div className="flex items-center gap-2 text-euphoria-gold text-sm mb-2">
                <Calendar size={18} />
                <span>{new Date(event.date).toLocaleDateString(locale)}</span>
              </div>

              <h3 className="text-xl font-heading font-semibold mb-1">
                {event.title}
              </h3>
              <p className="text-euphoria-muted text-sm mb-4">{event.dj}</p>

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
