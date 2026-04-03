"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ReservationData {
  id: string;
  date: string;
  status: string;
  created_at: string;
  rooms: { name: string; price_per_slot: number } | null;
}

interface DayStats {
  date: string;
  count: number;
  revenue: number;
}

const DAY_NAMES = ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"];

export default function RevenuePage() {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<ReservationData[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("id, date, status, created_at, rooms(name, price_per_slot)")
        .neq("status", "cancelled")
        .order("date", { ascending: false });

      if (error) throw error;
      setReservations((data as unknown as ReservationData[]) || []);
    } catch (err) {
      console.error("Revenue load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calculate stats
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

  const getRevenue = (r: ReservationData) => r.rooms?.price_per_slot || 200;

  const totalRevenue = reservations.reduce((sum, r) => sum + getRevenue(r), 0);
  const weekRevenue = reservations
    .filter((r) => r.date >= weekAgo)
    .reduce((sum, r) => sum + getRevenue(r), 0);
  const monthRevenue = reservations
    .filter((r) => r.date >= monthStart)
    .reduce((sum, r) => sum + getRevenue(r), 0);
  const totalBookings = reservations.length;

  // Top days by bookings
  const dayMap = new Map<string, DayStats>();
  reservations.forEach((r) => {
    const existing = dayMap.get(r.date) || { date: r.date, count: 0, revenue: 0 };
    existing.count++;
    existing.revenue += getRevenue(r);
    dayMap.set(r.date, existing);
  });
  const topDays = Array.from(dayMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 7);
  const maxDayCount = topDays.length > 0 ? topDays[0].count : 1;

  // Average bookings per day of week
  const dowCounts: number[] = [0, 0, 0, 0, 0, 0, 0];
  const dowDays = new Set<string>();
  reservations.forEach((r) => {
    const d = new Date(r.date);
    dowCounts[d.getDay()]++;
    dowDays.add(r.date);
  });
  // Approximate weeks span
  const weeks = Math.max(1, Math.ceil(dowDays.size / 7));
  const dowAvg = dowCounts.map((c) => +(c / weeks).toFixed(1));
  const maxDowAvg = Math.max(...dowAvg, 1);

  const statCards = [
    {
      label: "Celkove trzby",
      value: `${totalRevenue.toLocaleString()}€`,
      icon: DollarSign,
      color: "#d4af37",
    },
    {
      label: "Tento tyzden",
      value: `${weekRevenue.toLocaleString()}€`,
      icon: TrendingUp,
      color: "#22c55e",
    },
    {
      label: "Tento mesiac",
      value: `${monthRevenue.toLocaleString()}€`,
      icon: Calendar,
      color: "#f5d77a",
    },
    {
      label: "Celkom rezervacii",
      value: totalBookings.toString(),
      icon: BarChart3,
      color: "#c41e2a",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
            Trzby
          </h2>
          <p className="text-[#c0b8b0] text-sm mt-1">
            Prehlad trzieb z rezervacii
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-[rgba(212,175,55,0.2)] rounded-lg text-[#c0b8b0] hover:text-white hover:border-[#d4af37] transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Obnovit
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6 animate-pulse"
              >
                <div className="h-4 bg-white/10 rounded w-24 mb-4" />
                <div className="h-8 bg-white/10 rounded w-16" />
              </div>
            ))
          : statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6 hover:border-[#c41e2a] hover:shadow-[0_6px_25px_rgba(196,30,42,0.15)] transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#c0b8b0] text-sm font-[family-name:var(--font-ui)]">
                      {card.label}
                    </span>
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <p
                    className="text-3xl font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </p>
                </div>
              );
            })}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top days */}
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)] mb-6">
            Top dni podla rezervacii
          </h3>
          {loading ? (
            <div className="text-[#c0b8b0] text-center py-8">Nacitavam...</div>
          ) : topDays.length === 0 ? (
            <div className="text-[#c0b8b0] text-center py-8">Ziadne data</div>
          ) : (
            <div className="space-y-3">
              {topDays.map((day) => {
                const pct = (day.count / maxDayCount) * 100;
                const d = new Date(day.date);
                const dayName = DAY_NAMES[d.getDay()];
                return (
                  <div key={day.date} className="flex items-center gap-3">
                    <span className="text-[#c0b8b0] text-xs font-[family-name:var(--font-ui)] w-20 flex-shrink-0">
                      {dayName} {day.date.slice(5)}
                    </span>
                    <div className="flex-1 h-7 bg-white/5 rounded overflow-hidden relative">
                      <div
                        className="h-full rounded transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: "linear-gradient(90deg, #c41e2a, #d4af37)",
                        }}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-[family-name:var(--font-ui)]">
                        {day.count} ({day.revenue}€)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Average per day of week */}
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)] mb-6">
            Priemer na den v tyzdni
          </h3>
          {loading ? (
            <div className="text-[#c0b8b0] text-center py-8">Nacitavam...</div>
          ) : (
            <div className="flex items-end justify-between gap-2 h-48">
              {dowAvg.map((avg, i) => {
                const heightPct = (avg / maxDowAvg) * 100;
                const isWeekend = i === 5 || i === 6;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-[#c0b8b0] font-[family-name:var(--font-ui)]">
                      {avg}
                    </span>
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full rounded-t transition-all duration-700"
                        style={{
                          height: `${Math.max(heightPct, 4)}%`,
                          background: isWeekend
                            ? "linear-gradient(180deg, #d4af37, #c41e2a)"
                            : "linear-gradient(180deg, rgba(212,175,55,0.4), rgba(196,30,42,0.3))",
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs font-[family-name:var(--font-ui)] ${
                        isWeekend ? "text-[#d4af37]" : "text-[#c0b8b0]"
                      }`}
                    >
                      {DAY_NAMES[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
