import { Music, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Locale } from "@/lib/i18n";

interface DJScheduleItem {
  id: string;
  day: string; // 'friday' | 'saturday' ...
  dj_name: string;
  genre: string | null;
  start_time: string; // 22:00
  end_time: string; // 04:00
  is_resident: boolean;
  active_from: string | null;
  active_to: string | null;
}

async function getSchedule(): Promise<DJScheduleItem[]> {
  try {
    const { data, error } = await supabase
      .from("dj_schedule")
      .select("*")
      .order("day", { ascending: true });
    if (error || !data) return [];
    return data as DJScheduleItem[];
  } catch {
    return [];
  }
}

// Fallback placeholder — kým klient neposkytne reálny rozpis
const placeholder: DJScheduleItem[] = [
  {
    id: "p1",
    day: "friday",
    dj_name: "DJ Shadow",
    genre: "House / Deep",
    start_time: "22:00",
    end_time: "04:00",
    is_resident: true,
    active_from: null,
    active_to: null,
  },
  {
    id: "p2",
    day: "saturday",
    dj_name: "DJ Nova",
    genre: "Tech / Electro",
    start_time: "22:00",
    end_time: "06:00",
    is_resident: true,
    active_from: null,
    active_to: null,
  },
  {
    id: "p3",
    day: "friday",
    dj_name: "DJ Elite",
    genre: "R&B / Urban",
    start_time: "22:00",
    end_time: "02:00",
    is_resident: false,
    active_from: "2026-04-18",
    active_to: "2026-05-31",
  },
];

const dayLabels: Record<string, Record<string, string>> = {
  sk: { friday: "Piatok", saturday: "Sobota", sunday: "Nedeľa" },
  cz: { friday: "Pátek", saturday: "Sobota", sunday: "Neděle" },
  hu: { friday: "Péntek", saturday: "Szombat", sunday: "Vasárnap" },
  de: { friday: "Freitag", saturday: "Samstag", sunday: "Sonntag" },
  en: { friday: "Friday", saturday: "Saturday", sunday: "Sunday" },
};

const titleLabels: Record<string, string> = {
  sk: "DJ rozpis týždňa",
  cz: "DJ rozpis týdne",
  hu: "DJ heti beosztás",
  de: "DJ Wochenplan",
  en: "This week's DJ schedule",
};

const subLabels: Record<string, string> = {
  sk: "Rezidenti a hostia, ktorí roztáčajú parket",
  cz: "Rezidenti a hosté, kteří roztáčí parket",
  hu: "Rezidens és vendég DJ-k, akik pörgetik a parkettet",
  de: "Resident und Gast-DJs, die die Tanzfläche rocken",
  en: "Resident and guest DJs rocking the dance floor",
};

const residentLabels: Record<string, string> = {
  sk: "Rezident",
  cz: "Rezident",
  hu: "Rezidens",
  de: "Resident",
  en: "Resident",
};

interface Props {
  locale: Locale;
}

export default async function DJSchedule({ locale }: Props) {
  const dbSchedule = await getSchedule();
  const schedule = dbSchedule.length > 0 ? dbSchedule : placeholder;
  const days = dayLabels[locale] || dayLabels.en;

  // Groupnuté podľa dňa
  const byDay = schedule.reduce<Record<string, DJScheduleItem[]>>((acc, s) => {
    (acc[s.day] ||= []).push(s);
    return acc;
  }, {});

  const orderedDays = ["friday", "saturday", "sunday"].filter((d) => byDay[d]);

  if (orderedDays.length === 0) return null;

  return (
    <section className="py-20 px-4" aria-labelledby="dj-schedule-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="dj-schedule-title" className="section-title">
            {titleLabels[locale] || titleLabels.en}
          </h2>
          <div className="gold-line mx-auto mt-4" />
          <p className="text-euphoria-muted mt-6 text-sm">
            {subLabels[locale] || subLabels.en}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedDays.map((day) => (
            <div
              key={day}
              className="card border border-euphoria-gold/10 hover:border-euphoria-gold/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-euphoria-gold mb-4">
                <Calendar size={18} />
                <h3 className="text-lg font-heading font-semibold">
                  {days[day]}
                </h3>
              </div>

              <ul className="space-y-4">
                {byDay[day].map((s) => (
                  <li
                    key={s.id}
                    className="border-b border-euphoria-gold/10 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <Music
                          size={16}
                          className="text-euphoria-gold mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium">{s.dj_name}</p>
                          {s.genre && (
                            <p className="text-xs text-euphoria-muted mt-0.5">
                              {s.genre}
                            </p>
                          )}
                        </div>
                      </div>
                      {s.is_resident && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-euphoria-gold/40 text-euphoria-gold rounded-sm">
                          {residentLabels[locale] || residentLabels.en}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-euphoria-muted mt-2 ml-6">
                      {s.start_time} — {s.end_time}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
