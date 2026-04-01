import { supabase } from "./supabase";

// ============================================
// Types
// ============================================

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price_per_slot: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface TimeSlot {
  id: string;
  room_id: string;
  day_of_week: number; // 0=Sun, 5=Fri, 6=Sat
  start_time: string; // "19:00:00"
  end_time: string; // "22:00:00"
  is_active: boolean;
}

export interface ReservationAvailability {
  id: string;
  room_id: string;
  date: string;
  time_slot_id: string;
  status: "pending" | "confirmed" | "cancelled";
}

export interface BlockedDate {
  id: string;
  room_id: string | null;
  date: string;
  reason: string | null;
}

export interface CreateReservationData {
  room_id: string;
  date: string;
  time_slot_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  guests_count: number;
  note?: string;
}

// ============================================
// MOCK DATA — TODO: Replace with Supabase
// ============================================

const MOCK_ROOM: Room = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  name: "VIP Izba",
  description:
    "Exkluzivna VIP miestnost s privatnym barom a obsluhou. Kapacita az 10 hosti.",
  capacity: 10,
  price_per_slot: 200,
  image_url: null,
  is_active: true,
  created_at: new Date().toISOString(),
};

const MOCK_TIME_SLOTS: TimeSlot[] = [
  // Friday (5)
  { id: "ts-fri-1", room_id: MOCK_ROOM.id, day_of_week: 5, start_time: "19:00:00", end_time: "22:00:00", is_active: true },
  { id: "ts-fri-2", room_id: MOCK_ROOM.id, day_of_week: 5, start_time: "22:00:00", end_time: "01:00:00", is_active: true },
  { id: "ts-fri-3", room_id: MOCK_ROOM.id, day_of_week: 5, start_time: "01:00:00", end_time: "04:00:00", is_active: true },
  // Saturday (6)
  { id: "ts-sat-1", room_id: MOCK_ROOM.id, day_of_week: 6, start_time: "19:00:00", end_time: "22:00:00", is_active: true },
  { id: "ts-sat-2", room_id: MOCK_ROOM.id, day_of_week: 6, start_time: "22:00:00", end_time: "01:00:00", is_active: true },
  { id: "ts-sat-3", room_id: MOCK_ROOM.id, day_of_week: 6, start_time: "01:00:00", end_time: "04:00:00", is_active: true },
  { id: "ts-sat-4", room_id: MOCK_ROOM.id, day_of_week: 6, start_time: "04:00:00", end_time: "06:00:00", is_active: true },
  // Sunday (0)
  { id: "ts-sun-1", room_id: MOCK_ROOM.id, day_of_week: 0, start_time: "19:00:00", end_time: "22:00:00", is_active: true },
  { id: "ts-sun-2", room_id: MOCK_ROOM.id, day_of_week: 0, start_time: "22:00:00", end_time: "01:00:00", is_active: true },
  { id: "ts-sun-3", room_id: MOCK_ROOM.id, day_of_week: 0, start_time: "01:00:00", end_time: "04:00:00", is_active: true },
];

// Some mock reservations to show realistic availability
const MOCK_RESERVATIONS: ReservationAvailability[] = (() => {
  const res: ReservationAvailability[] = [];
  const now = new Date();

  // Get next Friday
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7 || 7));

  // Get next Saturday
  const nextSaturday = new Date(nextFriday);
  nextSaturday.setDate(nextFriday.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  // Friday: first slot booked
  res.push({
    id: "res-1",
    room_id: MOCK_ROOM.id,
    date: formatDate(nextFriday),
    time_slot_id: "ts-fri-1",
    status: "confirmed",
  });

  // Saturday: second and third slots booked
  res.push({
    id: "res-2",
    room_id: MOCK_ROOM.id,
    date: formatDate(nextSaturday),
    time_slot_id: "ts-sat-2",
    status: "confirmed",
  });
  res.push({
    id: "res-3",
    room_id: MOCK_ROOM.id,
    date: formatDate(nextSaturday),
    time_slot_id: "ts-sat-3",
    status: "pending",
  });

  return res;
})();

const USE_MOCK = false; // Supabase is live!

// ============================================
// API Functions
// ============================================

export async function getRooms(): Promise<Room[]> {
  if (USE_MOCK) return [MOCK_ROOM];

  // TODO: Replace with Supabase
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;
  return data || [];
}

export async function getTimeSlots(roomId: string): Promise<TimeSlot[]> {
  if (USE_MOCK) return MOCK_TIME_SLOTS.filter((s) => s.room_id === roomId);

  // TODO: Replace with Supabase
  const { data, error } = await supabase
    .from("time_slots")
    .select("*")
    .eq("room_id", roomId)
    .eq("is_active", true)
    .order("day_of_week")
    .order("start_time");

  if (error) throw error;
  return data || [];
}

export async function getReservationsForMonth(
  roomId: string,
  year: number,
  month: number
): Promise<ReservationAvailability[]> {
  if (USE_MOCK) {
    const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const endMonth = month === 11 ? 0 : month + 1;
    const endYear = month === 11 ? year + 1 : year;
    const endDate = `${endYear}-${String(endMonth + 1).padStart(2, "0")}-01`;

    return MOCK_RESERVATIONS.filter(
      (r) =>
        r.room_id === roomId &&
        r.date >= startDate &&
        r.date < endDate &&
        r.status !== "cancelled"
    );
  }

  // TODO: Replace with Supabase
  const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const endMonth = month === 11 ? 0 : month + 1;
  const endYear = month === 11 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth + 1).padStart(2, "0")}-01`;

  const { data, error } = await supabase
    .from("reservation_availability")
    .select("id, room_id, date, time_slot_id, status")
    .eq("room_id", roomId)
    .gte("date", startDate)
    .lt("date", endDate);

  if (error) throw error;
  return data || [];
}

export async function getBlockedDates(
  roomId: string,
  year: number,
  month: number
): Promise<BlockedDate[]> {
  if (USE_MOCK) return []; // No blocked dates in mock

  // TODO: Replace with Supabase
  const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const endMonth = month === 11 ? 0 : month + 1;
  const endYear = month === 11 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth + 1).padStart(2, "0")}-01`;

  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .or(`room_id.eq.${roomId},room_id.is.null`)
    .gte("date", startDate)
    .lt("date", endDate);

  if (error) throw error;
  return data || [];
}

export async function checkAvailability(
  roomId: string,
  date: string,
  timeSlotId: string
): Promise<boolean> {
  if (USE_MOCK) {
    return !MOCK_RESERVATIONS.some(
      (r) =>
        r.room_id === roomId &&
        r.date === date &&
        r.time_slot_id === timeSlotId &&
        r.status !== "cancelled"
    );
  }

  // TODO: Replace with Supabase
  const { data, error } = await supabase
    .from("reservation_availability")
    .select("id")
    .eq("room_id", roomId)
    .eq("date", date)
    .eq("time_slot_id", timeSlotId)
    .limit(1);

  if (error) throw error;
  return !data || data.length === 0;
}

export async function createReservation(
  data: CreateReservationData
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (USE_MOCK) {
    // Simulate a short delay
    await new Promise((r) => setTimeout(r, 800));
    return { success: true, id: "mock-" + Date.now() };
  }

  // TODO: Replace with Supabase
  // First check availability
  const available = await checkAvailability(
    data.room_id,
    data.date,
    data.time_slot_id
  );
  if (!available) {
    return { success: false, error: "Slot is already booked" };
  }

  const { data: result, error } = await supabase
    .from("reservations")
    .insert({
      room_id: data.room_id,
      date: data.date,
      time_slot_id: data.time_slot_id,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      guests_count: data.guests_count,
      note: data.note || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, id: result.id };
}
