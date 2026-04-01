import { Locale } from "@/lib/i18n";

export type EventType = "party" | "themed" | "vip" | "concert" | "special";
export type TableType = "standard" | "vip" | "premium";
export type ReservationStatus = "pending" | "confirmed" | "cancelled";
export type MediaType = "photo" | "video";

export interface Event {
  id: string;
  title_sk: string;
  title_hu: string;
  title_de: string;
  title_en: string;
  description_sk: string;
  description_hu: string;
  description_de: string;
  description_en: string;
  date: string;
  end_date: string;
  dj_name: string;
  event_type: EventType;
  cover_image: string;
  ticket_price: number;
  ticket_link: string;
  is_featured: boolean;
  created_at: string;
}

export interface Reservation {
  id: string;
  event_id: string | null;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests_count: number;
  table_type: TableType;
  bottle_service: boolean;
  note: string;
  status: ReservationStatus;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  event_id: string | null;
  media_url: string;
  media_type: MediaType;
  caption_sk: string;
  caption_hu: string;
  caption_de: string;
  caption_en: string;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export function getLocalizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: Locale
): string {
  const key = `${field}_${locale}` as keyof T;
  return (item[key] as string) || (item[`${field}_en` as keyof T] as string) || "";
}
