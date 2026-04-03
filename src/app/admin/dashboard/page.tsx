"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentReservations,
  type Reservation,
  type DashboardStats,
} from "@/lib/admin";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayCounts, setDayCounts] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [thisMonth, setThisMonth] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, r] = await Promise.all([
        getDashboardStats(),
        getRecentReservations(10),
      ]);
      setStats(s);
      setRecent(r);

      // Day-of-week stats + this month counter
      const { data: allRes } = await supabase
        .from("reservations")
        .select("date, status")
        .neq("status", "cancelled");

      if (allRes) {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const counts = [0, 0, 0, 0, 0, 0, 0];
        let monthCount = 0;

        for (const row of allRes) {
          const d = new Date(row.date + "T00:00:00");
          counts[d.getDay()] += 1;
          if (row.date.startsWith(currentMonth)) {
            monthCount += 1;
          }
        }

        setDayCounts(counts);
        setThisMonth(monthCount);
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const statCards = stats
    ? [
        {
          label: "Celkom rezervacii",
          value: stats.total,
          icon: CalendarCheck,
          color: "#d4af37",
        },
        {
          label: "Cakajuce",
          value: stats.pending,
          icon: Clock,
          color: "#f5d77a",
        },
        {
          label: "Potvrdene",
          value: stats.confirmed,
          icon: CheckCircle,
          color: "#22c55e",
        },
        {
          label: "Dnes",
          value: stats.today,
          icon: AlertCircle,
          color: "#c41e2a",
        },
      ]
    : [];

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    const labels: Record<string, string> = {
      pending: "Cakajuca",
      confirmed: "Potvrdena",
      cancelled: "Zrusena",
    };
    return (
      <span
        className={`px-2 py-1 text-xs rounded-full border ${styles[status] || ""}`}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
            Dashboard
          </h2>
          <p className="text-[#c0b8b0] text-sm mt-1">
            Prehlad klubu Euphoria
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

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/reservations"
          className="flex items-center justify-between p-4 bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg hover:border-[#d4af37] transition-all group"
        >
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-[#d4af37]" />
            <span className="text-sm font-[family-name:var(--font-ui)]">
              Spravovat rezervacie
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#c0b8b0] group-hover:text-[#d4af37] transition-colors" />
        </Link>
        <Link
          href="/admin/events"
          className="flex items-center justify-between p-4 bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg hover:border-[#d4af37] transition-all group"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#d4af37]" />
            <span className="text-sm font-[family-name:var(--font-ui)]">
              Pridat event
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#c0b8b0] group-hover:text-[#d4af37] transition-colors" />
        </Link>
        <Link
          href="/admin/gallery"
          className="flex items-center justify-between p-4 bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg hover:border-[#d4af37] transition-all group"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#d4af37]" />
            <span className="text-sm font-[family-name:var(--font-ui)]">
              Spravovat galeriu
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#c0b8b0] group-hover:text-[#d4af37] transition-colors" />
        </Link>
      </div>

      {/* This month + Popular days */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* This month counter */}
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6 flex flex-col items-center justify-center">
          <span className="text-[#c0b8b0] text-sm font-[family-name:var(--font-ui)] mb-2">
            Tento mesiac
          </span>
          <p className="text-4xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
            {thisMonth}
          </p>
          <span className="text-[#c0b8b0] text-xs mt-1">
            {thisMonth === 1 ? "rezervacia" : thisMonth < 5 ? "rezervacie" : "rezervacii"}
          </span>
        </div>

        {/* Popular days chart */}
        <div className="lg:col-span-2 bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-[#d4af37] font-[family-name:var(--font-heading)] mb-4">
            Popularne dni
          </h3>
          {(() => {
            const dayLabels = ["Ne", "Po", "Ut", "Sr", "St", "Pi", "So"];
            const maxCount = Math.max(...dayCounts, 1);
            return (
              <div className="flex items-end gap-2 h-32">
                {dayCounts.map((count, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-[#c0b8b0] font-[family-name:var(--font-ui)]">
                      {count}
                    </span>
                    <div
                      className="w-full rounded-t transition-all"
                      style={{
                        height: `${Math.max((count / maxCount) * 100, 4)}%`,
                        backgroundColor:
                          count === maxCount && count > 0
                            ? "#d4af37"
                            : "rgba(212,175,55,0.3)",
                      }}
                    />
                    <span className="text-xs text-[#c0b8b0] font-[family-name:var(--font-ui)]">
                      {dayLabels[i]}
                    </span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Recent reservations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)]">
            Posledne rezervacie
          </h3>
          <Link
            href="/admin/reservations"
            className="text-sm text-[#c0b8b0] hover:text-[#d4af37] transition-colors font-[family-name:var(--font-ui)]"
          >
            Zobrazit vsetky
          </Link>
        </div>

        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-[#c0b8b0]">Nacitavam...</div>
          ) : recent.length === 0 ? (
            <div className="p-8 text-center text-[#c0b8b0]">
              Ziadne rezervacie
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(212,175,55,0.12)]">
                    <th className="text-left p-4 text-[#d4af37] font-[family-name:var(--font-ui)] text-xs uppercase tracking-wider">
                      Meno
                    </th>
                    <th className="text-left p-4 text-[#d4af37] font-[family-name:var(--font-ui)] text-xs uppercase tracking-wider">
                      Datum
                    </th>
                    <th className="text-left p-4 text-[#d4af37] font-[family-name:var(--font-ui)] text-xs uppercase tracking-wider">
                      Cas
                    </th>
                    <th className="text-left p-4 text-[#d4af37] font-[family-name:var(--font-ui)] text-xs uppercase tracking-wider">
                      Hosti
                    </th>
                    <th className="text-left p-4 text-[#d4af37] font-[family-name:var(--font-ui)] text-xs uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-[rgba(212,175,55,0.06)] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 text-white">{r.customer_name}</td>
                      <td className="p-4 text-[#c0b8b0]">{r.date}</td>
                      <td className="p-4 text-[#c0b8b0]">
                        {r.time_slots
                          ? `${r.time_slots.start_time?.slice(0, 5)} - ${r.time_slots.end_time?.slice(0, 5)}`
                          : "-"}
                      </td>
                      <td className="p-4 text-[#c0b8b0]">{r.guests_count}</td>
                      <td className="p-4">{statusBadge(r.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
