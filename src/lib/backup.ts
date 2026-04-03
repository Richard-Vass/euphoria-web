import { getAllReservations, type Reservation } from "./admin";

/**
 * Exportuje vsetky rezervacie ako CSV string.
 */
export async function exportReservationsCSV(): Promise<string> {
  const reservations = await getAllReservations();

  const headers = [
    "ID",
    "Meno",
    "Email",
    "Telefon",
    "Datum",
    "Cas od",
    "Cas do",
    "Pocet hosti",
    "Miestnost",
    "Status",
    "Poznamka",
    "Vytvorene",
  ];

  const rows = reservations.map((r: Reservation) => [
    r.id,
    escapeCSV(r.customer_name),
    escapeCSV(r.customer_email),
    escapeCSV(r.customer_phone),
    r.date,
    r.time_slots?.start_time?.slice(0, 5) || "",
    r.time_slots?.end_time?.slice(0, 5) || "",
    r.guests_count,
    r.rooms?.name || "",
    r.status,
    escapeCSV(r.note || ""),
    r.created_at,
  ]);

  const csv = [headers.join(";"), ...rows.map((row) => row.join(";"))].join(
    "\n"
  );

  // BOM for Excel to correctly handle UTF-8
  return "\uFEFF" + csv;
}

/**
 * Spusti stahovanie CSV suboru v prehliadaci.
 */
export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeCSV(value: string): string {
  if (value.includes(";") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
