"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  X,
  RefreshCw,
} from "lucide-react";
import {
  getAllReservations,
  updateReservationStatus,
  type Reservation,
  type ReservationFilters,
} from "@/lib/admin";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ReservationFilters>({
    status: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const loadReservations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllReservations(filters);
      setReservations(data);
    } catch (err) {
      console.error("Load reservations error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const handleStatusUpdate = async (
    id: string,
    status: "confirmed" | "cancelled"
  ) => {
    setUpdating(id);
    try {
      await updateReservationStatus(id, status);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      if (selectedReservation?.id === id) {
        setSelectedReservation((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (err) {
      console.error("Update status error:", err);
    } finally {
      setUpdating(null);
    }
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
          Rezervacie
        </h2>
        <p className="text-[#c0b8b0] text-sm mt-1">
          Sprava vsetkych rezervacii
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-4">
        <div className="flex items-center gap-2 text-[#d4af37]">
          <Filter className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
            Filtre
          </span>
        </div>

        <div>
          <label className="block text-[#c0b8b0] text-xs mb-1 font-[family-name:var(--font-ui)]">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
            className="bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#d4af37]"
          >
            <option value="all">Vsetky</option>
            <option value="pending">Cakajuce</option>
            <option value="confirmed">Potvrdene</option>
            <option value="cancelled">Zrusene</option>
          </select>
        </div>

        <div>
          <label className="block text-[#c0b8b0] text-xs mb-1 font-[family-name:var(--font-ui)]">
            Od
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateFrom: e.target.value }))
            }
            className="bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-[#c0b8b0] text-xs mb-1 font-[family-name:var(--font-ui)]">
            Do
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateTo: e.target.value }))
            }
            className="bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#d4af37]"
          />
        </div>

        <button
          onClick={loadReservations}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-[rgba(212,175,55,0.2)] rounded text-[#c0b8b0] hover:text-white hover:border-[#d4af37] transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#c0b8b0]">Nacitavam...</div>
        ) : reservations.length === 0 ? (
          <div className="p-8 text-center text-[#c0b8b0]">
            Ziadne rezervacie na zobrazenie
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
                    Email
                  </th>
                  <th className="text-left p-4 text-[#d4af37] font-[family-name:var(--font-ui)] text-xs uppercase tracking-wider">
                    Telefon
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
                  <th className="text-left p-4 text-[#d4af37] font-[family-name:var(--font-ui)] text-xs uppercase tracking-wider">
                    Akcie
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-[rgba(212,175,55,0.06)] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4 text-white font-medium">
                      {r.customer_name}
                    </td>
                    <td className="p-4 text-[#c0b8b0]">{r.customer_email}</td>
                    <td className="p-4 text-[#c0b8b0]">{r.customer_phone}</td>
                    <td className="p-4 text-[#c0b8b0]">{r.date}</td>
                    <td className="p-4 text-[#c0b8b0]">
                      {r.time_slots
                        ? `${r.time_slots.start_time?.slice(0, 5)} - ${r.time_slots.end_time?.slice(0, 5)}`
                        : "-"}
                    </td>
                    <td className="p-4 text-[#c0b8b0]">{r.guests_count}</td>
                    <td className="p-4">{statusBadge(r.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedReservation(r)}
                          className="p-1.5 text-[#c0b8b0] hover:text-[#d4af37] transition-colors cursor-pointer"
                          title="Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {r.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(r.id, "confirmed")
                              }
                              disabled={updating === r.id}
                              className="p-1.5 text-green-500/70 hover:text-green-400 transition-colors cursor-pointer disabled:opacity-50"
                              title="Potvrdit"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(r.id, "cancelled")
                              }
                              disabled={updating === r.id}
                              className="p-1.5 text-red-500/70 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                              title="Zrusit"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {r.status === "confirmed" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(r.id, "cancelled")
                            }
                            disabled={updating === r.id}
                            className="p-1.5 text-red-500/70 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                            title="Zrusit"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d0507] border border-[rgba(212,175,55,0.18)] rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[rgba(212,175,55,0.12)]">
              <h3 className="text-lg font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
                Detail rezervacie
              </h3>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-[#c0b8b0] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Meno
                  </span>
                  <p className="text-white mt-1">
                    {selectedReservation.customer_name}
                  </p>
                </div>
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Status
                  </span>
                  <p className="mt-1">
                    {statusBadge(selectedReservation.status)}
                  </p>
                </div>
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Email
                  </span>
                  <p className="text-[#c0b8b0] mt-1">
                    {selectedReservation.customer_email}
                  </p>
                </div>
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Telefon
                  </span>
                  <p className="text-[#c0b8b0] mt-1">
                    {selectedReservation.customer_phone}
                  </p>
                </div>
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Datum
                  </span>
                  <p className="text-[#c0b8b0] mt-1">
                    {selectedReservation.date}
                  </p>
                </div>
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Cas
                  </span>
                  <p className="text-[#c0b8b0] mt-1">
                    {selectedReservation.time_slots
                      ? `${selectedReservation.time_slots.start_time?.slice(0, 5)} - ${selectedReservation.time_slots.end_time?.slice(0, 5)}`
                      : "-"}
                  </p>
                </div>
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Izba
                  </span>
                  <p className="text-[#c0b8b0] mt-1">
                    {selectedReservation.rooms?.name || "-"}
                  </p>
                </div>
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Pocet hosti
                  </span>
                  <p className="text-[#c0b8b0] mt-1">
                    {selectedReservation.guests_count}
                  </p>
                </div>
              </div>

              {selectedReservation.note && (
                <div>
                  <span className="text-[#d4af37] text-xs uppercase tracking-wider font-[family-name:var(--font-ui)]">
                    Poznamka
                  </span>
                  <p className="text-[#c0b8b0] mt-1">
                    {selectedReservation.note}
                  </p>
                </div>
              )}

              <div className="text-xs text-[#c0b8b0]/60">
                Vytvorene: {new Date(selectedReservation.created_at).toLocaleString("sk-SK")}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-[rgba(212,175,55,0.12)]">
              {selectedReservation.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedReservation.id, "confirmed")
                    }
                    disabled={updating === selectedReservation.id}
                    className="px-4 py-2 text-sm bg-green-600/20 text-green-400 border border-green-500/30 rounded-[50px] hover:bg-green-600/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    Potvrdit
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedReservation.id, "cancelled")
                    }
                    disabled={updating === selectedReservation.id}
                    className="px-4 py-2 text-sm bg-red-600/20 text-red-400 border border-red-500/30 rounded-[50px] hover:bg-red-600/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    Zrusit
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedReservation(null)}
                className="px-4 py-2 text-sm bg-white/5 text-[#c0b8b0] border border-[rgba(212,175,55,0.2)] rounded-[50px] hover:text-white transition-all cursor-pointer"
              >
                Zavriet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
