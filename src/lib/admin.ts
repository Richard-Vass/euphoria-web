import { supabase } from "./supabase";

// ============================================
// Types
// ============================================

export interface Reservation {
  id: string;
  room_id: string;
  date: string;
  time_slot_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  guests_count: number;
  note: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  rooms?: { name: string };
  time_slots?: { start_time: string; end_time: string };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  dj: string | null;
  type: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CreateEventData {
  title: string;
  date: string;
  dj?: string;
  type: string;
  description?: string;
  image_url?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string | null;
  category: string | null;
  sort_order: number;
  created_at: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  confirmed: number;
  today: number;
}

export interface ReservationFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ============================================
// DASHBOARD
// ============================================

export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date().toISOString().split("T")[0];

  const { data: all, error: allErr } = await supabase
    .from("reservations")
    .select("id, status, date");

  if (allErr) throw allErr;

  const reservations = all || [];
  return {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    today: reservations.filter(
      (r) => r.date === today && r.status !== "cancelled"
    ).length,
  };
}

// ============================================
// RESERVATIONS
// ============================================

export async function getAllReservations(
  filters?: ReservationFilters
): Promise<Reservation[]> {
  let query = supabase
    .from("reservations")
    .select("*, rooms(name), time_slots(start_time, end_time)")
    .order("created_at", { ascending: false });

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters?.dateFrom) {
    query = query.gte("date", filters.dateFrom);
  }
  if (filters?.dateTo) {
    query = query.lte("date", filters.dateTo);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as Reservation[]) || [];
}

export async function getRecentReservations(
  limit = 10
): Promise<Reservation[]> {
  const { data, error } = await supabase
    .from("reservations")
    .select("*, rooms(name), time_slots(start_time, end_time)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as Reservation[]) || [];
}

export async function updateReservationStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
): Promise<void> {
  const { error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

// ============================================
// EVENTS
// ============================================

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return (data as Event[]) || [];
}

export async function createEvent(eventData: CreateEventData): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .insert({
      title: eventData.title,
      date: eventData.date,
      dj: eventData.dj || null,
      type: eventData.type,
      description: eventData.description || null,
      image_url: eventData.image_url || null,
      is_active: true,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Event;
}

export async function updateEvent(
  id: string,
  eventData: Partial<CreateEventData>
): Promise<void> {
  const { error } = await supabase
    .from("events")
    .update(eventData)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw error;
}

// ============================================
// GALLERY
// ============================================

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data as GalleryImage[]) || [];
}

export async function addGalleryImage(image: {
  url: string;
  alt?: string;
  category?: string;
}): Promise<GalleryImage> {
  // Get max sort_order
  const { data: existing } = await supabase
    .from("gallery")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0;

  const { data, error } = await supabase
    .from("gallery")
    .insert({
      url: image.url,
      alt: image.alt || null,
      category: image.category || null,
      sort_order: nextOrder,
    })
    .select()
    .single();

  if (error) throw error;
  return data as GalleryImage;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) throw error;
}

// ============================================
// BLOCKED DATES
// ============================================

export interface BlockedDate {
  id: string;
  room_id: string | null;
  date: string;
  reason: string | null;
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return (data as BlockedDate[]) || [];
}

export async function addBlockedDate(
  date: string,
  reason?: string
): Promise<BlockedDate> {
  const { data, error } = await supabase
    .from("blocked_dates")
    .insert({
      date,
      reason: reason || null,
      room_id: null, // blocks all rooms
    })
    .select()
    .single();

  if (error) throw error;
  return data as BlockedDate;
}

export async function deleteBlockedDate(id: string): Promise<void> {
  const { error } = await supabase.from("blocked_dates").delete().eq("id", id);

  if (error) throw error;
}
