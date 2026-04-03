"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { exportReservationsCSV, downloadCSV } from "@/lib/backup";

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const csv = await exportReservationsCSV();
      const date = new Date().toISOString().split("T")[0];
      downloadCSV(csv, `euphoria-rezervacie-${date}.csv`);
    } catch (err) {
      console.error("Export error:", err);
      alert("Chyba pri exporte. Skus znova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-[rgba(212,175,55,0.2)] rounded-lg text-[#c0b8b0] hover:text-white hover:border-[#d4af37] transition-all cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      Exportovat CSV
    </button>
  );
}
