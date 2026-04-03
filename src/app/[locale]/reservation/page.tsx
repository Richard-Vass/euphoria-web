"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Euro,
  Check,
  Crown,
  Loader2,
  CalendarPlus,
  MessageCircle,
} from "lucide-react";
import {
  getRooms,
  getTimeSlots,
  getReservationsForMonth,
  getBlockedDates,
  createReservation,
  type Room,
  type TimeSlot,
  type ReservationAvailability,
  type BlockedDate,
} from "@/lib/reservations";

// ============================================
// Translations
// ============================================

const labels: Record<string, Record<string, string>> = {
  sk: {
    title: "Rezervácia privátnej izby",
    subtitle: "Rezervujte si privátnu izbu v Euphoria",
    step1: "Izba",
    step2: "Dátum",
    step3: "Čas",
    step4: "Údaje",
    step5: "Hotovo",
    selectRoom: "Vyberte izbu",
    selectDate: "Vyberte dátum",
    selectTime: "Vyberte čas",
    yourDetails: "Vaše údaje",
    confirmation: "Potvrdenie",
    capacity: "Kapacita",
    perSlot: "za slot",
    guests: "hostí",
    prev: "Predchádzajúci",
    next: "Ďalší",
    available: "Voľné",
    booked: "Obsadené",
    partiallyBooked: "Čiastočne obsadené",
    blocked: "Zablokované",
    closed: "Zatvorené",
    name: "Meno a priezvisko",
    email: "Email",
    phone: "Telefón",
    guestsCount: "Počet hostí",
    note: "Poznámka (voliteľné)",
    totalPrice: "Celková cena",
    submit: "Odoslať rezerváciu",
    submitting: "Odosielam...",
    successTitle: "Rezervácia potvrdená!",
    successMsg: "Vaša rezervácia bola automaticky potvrdená.",
    successDetail: "Detaily rezervácie boli zaslané na váš email.",
    backToCalendar: "Nová rezervácia",
    back: "Späť",
    continue: "Pokračovať",
    fri: "Pia",
    sat: "Sob",
    sun: "Ned",
    mon: "Pon",
    tue: "Uto",
    wed: "Str",
    thu: "Štv",
    january: "Január",
    february: "Február",
    march: "Marec",
    april: "Apríl",
    may: "Máj",
    june: "Jún",
    july: "Júl",
    august: "August",
    september: "September",
    october: "Október",
    november: "November",
    december: "December",
    addToCalendar: "Pridať do kalendára",
    shareWhatsApp: "Zdieľať cez WhatsApp",
  },
  hu: {
    title: "Privát szoba foglalás",
    subtitle: "Foglaljon privát szobát az Euphoriában",
    step1: "Szoba",
    step2: "Dátum",
    step3: "Idő",
    step4: "Adatok",
    step5: "Kész",
    selectRoom: "Válasszon szobát",
    selectDate: "Válasszon dátumot",
    selectTime: "Válasszon időpontot",
    yourDetails: "Az Ön adatai",
    confirmation: "Megerősítés",
    capacity: "Kapacitás",
    perSlot: "per slot",
    guests: "vendég",
    prev: "Előző",
    next: "Következő",
    available: "Szabad",
    booked: "Foglalt",
    partiallyBooked: "Részben foglalt",
    blocked: "Blokkolt",
    closed: "Zárva",
    name: "Teljes név",
    email: "Email",
    phone: "Telefon",
    guestsCount: "Vendégek száma",
    note: "Megjegyzés (opcionális)",
    totalPrice: "Teljes ár",
    submit: "Foglalás elküldése",
    submitting: "Küldés...",
    successTitle: "Foglalás megerősítve!",
    successMsg: "Az Ön foglalása automatikusan megerősítésre került.",
    successDetail: "A foglalás részleteit elküldtük az Ön email címére.",
    backToCalendar: "Új foglalás",
    back: "Vissza",
    continue: "Tovább",
    fri: "Pén",
    sat: "Szo",
    sun: "Vas",
    mon: "Hét",
    tue: "Kedd",
    wed: "Sze",
    thu: "Csüt",
    january: "Január",
    february: "Február",
    march: "Március",
    april: "Április",
    may: "Május",
    june: "Június",
    july: "Július",
    august: "Augusztus",
    september: "Szeptember",
    october: "Október",
    november: "November",
    december: "December",
    addToCalendar: "Hozzáadás a naptárhoz",
    shareWhatsApp: "Megosztás WhatsAppon",
  },
  de: {
    title: "Privatzimmer-Reservierung",
    subtitle: "Reservieren Sie ein Privatzimmer in der Euphoria",
    step1: "Zimmer",
    step2: "Datum",
    step3: "Zeit",
    step4: "Daten",
    step5: "Fertig",
    selectRoom: "Zimmer wählen",
    selectDate: "Datum wählen",
    selectTime: "Zeitfenster wählen",
    yourDetails: "Ihre Daten",
    confirmation: "Bestätigung",
    capacity: "Kapazität",
    perSlot: "pro Slot",
    guests: "Gäste",
    prev: "Vorheriger",
    next: "Nächster",
    available: "Verfügbar",
    booked: "Gebucht",
    partiallyBooked: "Teilweise gebucht",
    blocked: "Gesperrt",
    closed: "Geschlossen",
    name: "Vollständiger Name",
    email: "E-Mail",
    phone: "Telefon",
    guestsCount: "Anzahl der Gäste",
    note: "Anmerkung (optional)",
    totalPrice: "Gesamtpreis",
    submit: "Reservierung absenden",
    submitting: "Senden...",
    successTitle: "Reservierung bestätigt!",
    successMsg: "Ihre Reservierung wurde automatisch bestätigt.",
    successDetail: "Die Reservierungsdetails wurden an Ihre E-Mail gesendet.",
    backToCalendar: "Neue Reservierung",
    back: "Zurück",
    continue: "Weiter",
    fri: "Fr",
    sat: "Sa",
    sun: "So",
    mon: "Mo",
    tue: "Di",
    wed: "Mi",
    thu: "Do",
    january: "Januar",
    february: "Februar",
    march: "März",
    april: "April",
    may: "Mai",
    june: "Juni",
    july: "Juli",
    august: "August",
    september: "September",
    october: "Oktober",
    november: "November",
    december: "Dezember",
    addToCalendar: "Zum Kalender hinzufügen",
    shareWhatsApp: "Auf WhatsApp teilen",
  },
  en: {
    title: "Private Room Reservation",
    subtitle: "Reserve a private room at Euphoria",
    step1: "Room",
    step2: "Date",
    step3: "Time",
    step4: "Details",
    step5: "Done",
    selectRoom: "Select room",
    selectDate: "Select date",
    selectTime: "Select time slot",
    yourDetails: "Your details",
    confirmation: "Confirmation",
    capacity: "Capacity",
    perSlot: "per slot",
    guests: "guests",
    prev: "Previous",
    next: "Next",
    available: "Available",
    booked: "Booked",
    partiallyBooked: "Partially booked",
    blocked: "Blocked",
    closed: "Closed",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    guestsCount: "Number of guests",
    note: "Note (optional)",
    totalPrice: "Total price",
    submit: "Submit reservation",
    submitting: "Submitting...",
    successTitle: "Reservation confirmed!",
    successMsg: "Your reservation has been automatically confirmed.",
    successDetail: "Reservation details have been sent to your email.",
    backToCalendar: "New reservation",
    back: "Back",
    continue: "Continue",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    addToCalendar: "Add to Calendar",
    shareWhatsApp: "Share on WhatsApp",
  },
};

const monthKeys = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

// ============================================
// Helpers
// ============================================

function formatTime(time: string): string {
  return time.slice(0, 5); // "19:00:00" → "19:00"
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isClubOpen(_dayOfWeek: number): boolean {
  // Club is open every day
  return true;
}

function formatDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ============================================
// Step indicator component
// ============================================

function StepIndicator({
  currentStep,
  t,
}: {
  currentStep: number;
  t: Record<string, string>;
}) {
  const steps = [
    { num: 1, label: t.step1 },
    { num: 2, label: t.step2 },
    { num: 3, label: t.step3 },
    { num: 4, label: t.step4 },
    { num: 5, label: t.step5 },
  ];

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-12">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                step.num < currentStep
                  ? "bg-euphoria-gold text-euphoria-black"
                  : step.num === currentStep
                    ? "bg-gradient-to-br from-euphoria-crimson to-euphoria-red text-white shadow-[0_0_20px_rgba(196,30,42,0.4)]"
                    : "bg-euphoria-gray/30 text-euphoria-muted border border-euphoria-gray/30"
              }`}
              style={{ fontFamily: "var(--font-ui)" }}
            >
              {step.num < currentStep ? (
                <Check size={16} />
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-xs mt-1 transition-colors duration-300 hidden sm:block ${
                step.num <= currentStep
                  ? "text-euphoria-gold"
                  : "text-euphoria-muted/50"
              }`}
              style={{ fontFamily: "var(--font-ui)" }}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 sm:w-12 h-px mx-1 sm:mx-2 transition-colors duration-500 ${
                step.num < currentStep
                  ? "bg-euphoria-gold"
                  : "bg-euphoria-gray/30"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// Animation variants
// ============================================

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const pageTransition = {
  type: "tween" as const,
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

// ============================================
// Main component
// ============================================

export default function ReservationPage() {
  const params = useParams();
  const locale = (params.locale as string) || "sk";
  const t = labels[locale] || labels.en;

  // State
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Data
  const [rooms, setRooms] = useState<Room[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [reservations, setReservations] = useState<ReservationAvailability[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);

  // Selections
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [calendarDirection, setCalendarDirection] = useState(0);

  // Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Load rooms on mount
  useEffect(() => {
    async function load() {
      try {
        const r = await getRooms();
        setRooms(r);
        // Auto-select if only 1 room
        if (r.length === 1) {
          setSelectedRoom(r[0]);
          setStep(2);
        }
      } catch (e) {
        console.error("Failed to load rooms:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Load time slots when room is selected
  useEffect(() => {
    if (!selectedRoom) return;
    async function load() {
      try {
        const slots = await getTimeSlots(selectedRoom!.id);
        setTimeSlots(slots);
      } catch (e) {
        console.error("Failed to load time slots:", e);
      }
    }
    load();
  }, [selectedRoom]);

  // Load reservations + blocked dates when month changes
  useEffect(() => {
    if (!selectedRoom) return;
    async function load() {
      try {
        const [res, blocked] = await Promise.all([
          getReservationsForMonth(selectedRoom!.id, currentYear, currentMonth),
          getBlockedDates(selectedRoom!.id, currentYear, currentMonth),
        ]);
        setReservations(res);
        setBlockedDates(blocked);
      } catch (e) {
        console.error("Failed to load availability:", e);
      }
    }
    load();
  }, [selectedRoom, currentYear, currentMonth]);

  // Navigation
  const goToStep = useCallback(
    (newStep: number) => {
      setDirection(newStep > step ? 1 : -1);
      setStep(newStep);
    },
    [step]
  );

  const goNext = useCallback(() => goToStep(step + 1), [goToStep, step]);
  const goBack = useCallback(() => goToStep(step - 1), [goToStep, step]);

  // Calendar navigation
  const prevMonth = () => {
    setCalendarDirection(-1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    setCalendarDirection(1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if we can go to previous month (don't go before current month)
  const now = new Date();
  const canGoPrev =
    currentYear > now.getFullYear() ||
    (currentYear === now.getFullYear() && currentMonth > now.getMonth());

  // Get slots for a given day of week
  const getSlotsForDay = useCallback(
    (dayOfWeek: number) => {
      return timeSlots.filter((s) => s.day_of_week === dayOfWeek);
    },
    [timeSlots]
  );

  // Get day availability status
  const getDayStatus = useCallback(
    (dateStr: string, dayOfWeek: number) => {
      // Check if blocked
      const isBlocked = blockedDates.some(
        (b) => b.date === dateStr && (b.room_id === selectedRoom?.id || !b.room_id)
      );
      if (isBlocked) return "blocked";

      // Check if club is open
      if (!isClubOpen(dayOfWeek)) return "closed";

      // Get slots for this day
      const daySlots = getSlotsForDay(dayOfWeek);
      if (daySlots.length === 0) return "closed";

      // Check reservations
      const dayReservations = reservations.filter((r) => r.date === dateStr);
      if (dayReservations.length === 0) return "available";
      if (dayReservations.length >= daySlots.length) return "full";
      return "partial";
    },
    [blockedDates, reservations, selectedRoom, getSlotsForDay]
  );

  // Available slots for selected date
  const availableSlots = useMemo(() => {
    if (!selectedDate || !selectedRoom) return [];
    const dateObj = new Date(selectedDate + "T12:00:00");
    const dayOfWeek = dateObj.getDay();
    const daySlots = getSlotsForDay(dayOfWeek);

    return daySlots.map((slot) => {
      const isBooked = reservations.some(
        (r) =>
          r.date === selectedDate &&
          r.time_slot_id === slot.id &&
          r.status !== "cancelled"
      );
      return { ...slot, isBooked };
    });
  }, [selectedDate, selectedRoom, getSlotsForDay, reservations]);

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !selectedDate || !selectedSlot) return;

    setSubmitting(true);
    try {
      const result = await createReservation({
        room_id: selectedRoom.id,
        date: selectedDate,
        time_slot_id: selectedSlot.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        guests_count: formData.guests,
        note: formData.note || undefined,
      });

      if (result.success) {
        setBookingId(result.id || null);

        // Send email notification via Edge Function
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-reservation-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                date: selectedDate,
                time_slot: `${selectedSlot.start_time} – ${selectedSlot.end_time}`,
                guests_count: formData.guests,
                room_name: selectedRoom.name,
                price: `${selectedRoom.price_per_slot}€`,
                note: formData.note || undefined,
              }),
            }
          );
        } catch (emailErr) {
          console.error("Email notification failed:", emailErr);
        }

        goNext();
      } else {
        alert(result.error || "Error");
      }
    } catch (e) {
      console.error(e);
      alert("Error submitting reservation");
    } finally {
      setSubmitting(false);
    }
  };

  // Reset
  const resetReservation = () => {
    setStep(rooms.length === 1 ? 2 : 1);
    setDirection(-1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setFormData({ name: "", email: "", phone: "", guests: 2, note: "" });
    setBookingId(null);
  };

  // ============================================
  // RENDER: Calendar grid
  // ============================================

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cells: React.ReactNode[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateStr(currentYear, currentMonth, day);
      const dateObj = new Date(currentYear, currentMonth, day);
      const dayOfWeek = dateObj.getDay();
      const isPast = dateObj < today;

      const status = isPast ? "past" : getDayStatus(dateStr, dayOfWeek);
      const isSelected = selectedDate === dateStr;
      const isOpen = isClubOpen(dayOfWeek);

      let cellClass =
        "aspect-square flex flex-col items-center justify-center rounded-md text-lg font-medium relative transition-all duration-300 ";
      let dotColor = "";

      if (isPast || !isOpen) {
        cellClass += "text-euphoria-muted/30 cursor-default";
      } else if (status === "blocked") {
        cellClass += "text-euphoria-muted/30 cursor-default";
      } else if (isSelected) {
        cellClass +=
          "bg-euphoria-gold/20 text-euphoria-gold border border-euphoria-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer";
      } else if (status === "full") {
        cellClass +=
          "text-euphoria-muted/50 cursor-default";
        dotColor = "bg-euphoria-red";
      } else if (status === "partial") {
        cellClass +=
          "text-white hover:bg-euphoria-gold/10 hover:text-euphoria-gold cursor-pointer";
        dotColor = "bg-yellow-500";
      } else if (status === "available") {
        cellClass +=
          "text-white hover:bg-euphoria-gold/10 hover:text-euphoria-gold cursor-pointer";
        dotColor = "bg-green-500";
      }

      const canClick =
        !isPast && isOpen && status !== "blocked" && status !== "full";

      cells.push(
        <motion.div
          key={dateStr}
          className={cellClass}
          onClick={() => {
            if (canClick) {
              setSelectedDate(dateStr);
            }
          }}
          whileHover={canClick ? { scale: 1.1 } : undefined}
          whileTap={canClick ? { scale: 0.95 } : undefined}
        >
          <span style={{ fontFamily: "var(--font-ui)" }}>{day}</span>
          {dotColor && (
            <span
              className={`absolute bottom-1 w-2 h-2 rounded-full ${dotColor}`}
            />
          )}
        </motion.div>
      );
    }

    return cells;
  };

  // ============================================
  // RENDER: Main
  // ============================================

  if (loading) {
    return (
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Loader2 className="w-8 h-8 animate-spin text-euphoria-gold mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="section-title">{t.title}</h1>
          <div className="gold-line mx-auto mt-4" />
          <p className="section-subtitle mt-3">{t.subtitle}</p>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={step} t={t} />

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          {/* ========== STEP 1: Room selection ========== */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <h2
                className="text-2xl text-center text-euphoria-cream mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.selectRoom}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    className={`card cursor-pointer flex flex-col items-center gap-4 py-8 ${
                      selectedRoom?.id === room.id
                        ? "border-euphoria-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedRoom(room);
                      goNext();
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Crown
                      size={36}
                      className={
                        selectedRoom?.id === room.id
                          ? "text-euphoria-gold"
                          : "text-euphoria-muted"
                      }
                    />
                    <h3
                      className="text-xl text-euphoria-cream"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {room.name}
                    </h3>
                    <p className="text-euphoria-muted text-base text-center px-2">
                      {room.description}
                    </p>
                    <div className="flex items-center gap-4 text-base">
                      <span className="flex items-center gap-1 text-euphoria-muted">
                        <Users size={14} />
                        {room.capacity} {t.guests}
                      </span>
                      <span className="flex items-center gap-1 text-euphoria-gold font-semibold">
                        <Euro size={14} />
                        {room.price_per_slot} {t.perSlot}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== STEP 2: Calendar ========== */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <h2
                className="text-2xl text-center text-euphoria-cream mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.selectDate}
              </h2>

              {/* Calendar card */}
              <div className="card max-w-3xl mx-auto p-6">
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevMonth}
                    disabled={!canGoPrev}
                    className={`p-2 rounded transition-colors ${
                      canGoPrev
                        ? "text-euphoria-gold hover:bg-euphoria-gold/10"
                        : "text-euphoria-muted/30 cursor-default"
                    }`}
                    aria-label={t.prev}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={`${currentYear}-${currentMonth}`}
                      className="text-2xl text-euphoria-cream"
                      style={{ fontFamily: "var(--font-heading)" }}
                      initial={{ opacity: 0, y: calendarDirection > 0 ? 10 : -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: calendarDirection > 0 ? -10 : 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t[monthKeys[currentMonth]]} {currentYear}
                    </motion.h3>
                  </AnimatePresence>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded text-euphoria-gold hover:bg-euphoria-gold/10 transition-colors"
                    aria-label={t.next}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {dayKeys.map((key) => (
                    <div
                      key={key}
                      className="text-center text-xs text-euphoria-muted uppercase tracking-wider py-2 font-semibold"
                      style={{ fontFamily: "var(--font-ui)" }}
                    >
                      {t[key]}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentYear}-${currentMonth}`}
                    className="grid grid-cols-7 gap-1"
                    initial={{ opacity: 0, x: calendarDirection > 0 ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: calendarDirection > 0 ? -40 : 40 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    {renderCalendar()}
                  </motion.div>
                </AnimatePresence>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-euphoria-muted" style={{ fontFamily: "var(--font-ui)" }}>
                      {t.available}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-euphoria-muted" style={{ fontFamily: "var(--font-ui)" }}>
                      {t.partiallyBooked}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-euphoria-red" />
                    <span className="text-euphoria-muted" style={{ fontFamily: "var(--font-ui)" }}>
                      {t.booked}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 max-w-lg mx-auto">
                {rooms.length > 1 && (
                  <button
                    onClick={goBack}
                    className="btn-secondary"
                  >
                    {t.back}
                  </button>
                )}
                <div className="flex-1" />
                <button
                  onClick={goNext}
                  disabled={!selectedDate}
                  className={`btn-primary ${
                    !selectedDate ? "opacity-30 cursor-default" : ""
                  }`}
                >
                  {t.continue}
                </button>
              </div>
            </motion.div>
          )}

          {/* ========== STEP 3: Time slot selection ========== */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <h2
                className="text-2xl text-center text-euphoria-cream mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.selectTime}
              </h2>
              <p
                className="text-center text-euphoria-muted mb-8 text-base"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {selectedDate &&
                  (() => {
                    const d = new Date(selectedDate + "T12:00:00");
                    return d.toLocaleDateString(
                      locale === "sk"
                        ? "sk-SK"
                        : locale === "hu"
                          ? "hu-HU"
                          : locale === "de"
                            ? "de-DE"
                            : "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    );
                  })()}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {availableSlots.map((slot) => (
                  <motion.div
                    key={slot.id}
                    className={`card flex items-center justify-between gap-4 cursor-pointer ${
                      slot.isBooked
                        ? "opacity-40 cursor-default border-euphoria-gray/20"
                        : selectedSlot?.id === slot.id
                          ? "border-euphoria-gold shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-euphoria-gold/5"
                          : "hover:border-euphoria-gold/60 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    }`}
                    onClick={() => {
                      if (!slot.isBooked) {
                        setSelectedSlot(slot);
                      }
                    }}
                    whileHover={!slot.isBooked ? { scale: 1.02 } : undefined}
                    whileTap={!slot.isBooked ? { scale: 0.98 } : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Clock
                        size={20}
                        className={
                          slot.isBooked
                            ? "text-euphoria-muted/40"
                            : selectedSlot?.id === slot.id
                              ? "text-euphoria-gold"
                              : "text-euphoria-muted"
                        }
                      />
                      <div>
                        <div
                          className={`text-lg font-semibold ${
                            slot.isBooked
                              ? "line-through text-euphoria-muted/40"
                              : "text-white"
                          }`}
                          style={{ fontFamily: "var(--font-ui)" }}
                        >
                          {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                        </div>
                        <div
                          className={`text-sm ${
                            slot.isBooked
                              ? "text-euphoria-red/60"
                              : "text-euphoria-muted"
                          }`}
                          style={{ fontFamily: "var(--font-ui)" }}
                        >
                          {slot.isBooked ? t.booked : t.available}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-xl font-semibold ${
                        slot.isBooked
                          ? "text-euphoria-muted/30"
                          : "text-euphoria-gold"
                      }`}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {selectedRoom?.price_per_slot}€
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 max-w-2xl mx-auto">
                <button
                  onClick={goBack}
                  className="btn-secondary text-base px-8 py-3"
                >
                  {t.back}
                </button>
                <button
                  onClick={goNext}
                  disabled={!selectedSlot}
                  className={`btn-primary ${
                    !selectedSlot ? "opacity-30 cursor-default" : ""
                  }`}
                >
                  {t.continue}
                </button>
              </div>
            </motion.div>
          )}

          {/* ========== STEP 4: Booking form ========== */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <h2
                className="text-2xl text-center text-euphoria-cream mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.yourDetails}
              </h2>

              {/* Booking summary */}
              <div className="card max-w-2xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Crown size={20} className="text-euphoria-gold" />
                  <span className="text-euphoria-cream" style={{ fontFamily: "var(--font-heading)" }}>
                    {selectedRoom?.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-base text-euphoria-muted">
                  <span>
                    {selectedDate &&
                      new Date(selectedDate + "T12:00:00").toLocaleDateString(
                        locale === "sk"
                          ? "sk-SK"
                          : locale === "hu"
                            ? "hu-HU"
                            : locale === "de"
                              ? "de-DE"
                              : "en-US",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                  </span>
                  <span className="text-euphoria-gold">
                    {selectedSlot && `${formatTime(selectedSlot.start_time)} - ${formatTime(selectedSlot.end_time)}`}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs text-euphoria-muted mb-2 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-ui)" }}
                    >
                      {t.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs text-euphoria-muted mb-2 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-ui)" }}
                    >
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs text-euphoria-muted mb-2 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-ui)" }}
                    >
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors rounded-sm"
                    />
                  </div>
                  {/* Guests count je fixne 2 pre privatnu izbu */}
                  <input type="hidden" value={2} />
                </div>

                <div>
                  <label
                    className="block text-xs text-euphoria-muted mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-ui)" }}
                  >
                    {t.note}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors rounded-sm"
                  />
                </div>

                {/* Price */}
                <div className="flex items-center justify-between py-4 border-t border-euphoria-gray/20">
                  <span
                    className="text-euphoria-muted uppercase tracking-wider text-xs"
                    style={{ fontFamily: "var(--font-ui)" }}
                  >
                    {t.totalPrice}
                  </span>
                  <span
                    className="text-3xl font-bold text-euphoria-gold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {selectedRoom?.price_per_slot}€
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBack}
                    className="btn-secondary"
                  >
                    {t.back}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`btn-primary flex-1 flex items-center justify-center gap-2 ${
                      submitting ? "opacity-60 cursor-default" : ""
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t.submitting}
                      </>
                    ) : (
                      t.submit
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ========== STEP 5: Confirmation ========== */}
          {step === 5 && (
            <motion.div
              key="step5"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <div className="card max-w-lg mx-auto text-center py-12 px-8">
                {/* Animated checkmark with gold glow */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="relative w-24 h-24 mx-auto mb-6"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(212, 175, 55, 0.2), 0 0 40px rgba(212, 175, 55, 0.1)",
                        "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)",
                        "0 0 20px rgba(212, 175, 55, 0.2), 0 0 40px rgba(212, 175, 55, 0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full bg-euphoria-gold/20 border-2 border-euphoria-gold flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Check size={40} className="text-euphoria-gold" strokeWidth={3} />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl text-euphoria-cream mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t.successTitle}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-euphoria-muted mb-6"
                >
                  {t.successMsg}
                </motion.p>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-left space-y-3 bg-euphoria-black/50 rounded-sm p-5 border border-euphoria-gray/20 mb-6"
                >
                  <div className="flex justify-between text-base">
                    <span className="text-euphoria-muted">{t.step1}</span>
                    <span className="text-white">{selectedRoom?.name}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-euphoria-muted">{t.step2}</span>
                    <span className="text-white">
                      {selectedDate &&
                        new Date(selectedDate + "T12:00:00").toLocaleDateString(
                          locale === "sk"
                            ? "sk-SK"
                            : locale === "hu"
                              ? "hu-HU"
                              : locale === "de"
                                ? "de-DE"
                                : "en-US",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-euphoria-muted">{t.step3}</span>
                    <span className="text-euphoria-gold">
                      {selectedSlot &&
                        `${formatTime(selectedSlot.start_time)} - ${formatTime(selectedSlot.end_time)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-euphoria-muted">{t.guestsCount}</span>
                    <span className="text-white">{formData.guests}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-euphoria-gray/20 pt-3">
                    <span className="text-euphoria-muted">{t.totalPrice}</span>
                    <span className="text-euphoria-gold font-bold">
                      {selectedRoom?.price_per_slot}€
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-euphoria-muted text-base mb-6"
                >
                  {t.successDetail}
                </motion.p>

                {/* Action buttons: Add to Calendar + Share WhatsApp */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
                >
                  <button
                    onClick={() => {
                      if (!selectedDate || !selectedSlot || !selectedRoom) return;
                      const startParts = selectedSlot.start_time.split(":");
                      const endParts = selectedSlot.end_time.split(":");
                      const startDate = new Date(selectedDate + "T12:00:00");
                      startDate.setHours(parseInt(startParts[0]), parseInt(startParts[1]), 0);
                      const endDate = new Date(selectedDate + "T12:00:00");
                      endDate.setHours(parseInt(endParts[0]), parseInt(endParts[1]), 0);
                      // If end time is before start time, it's next day
                      if (endDate <= startDate) {
                        endDate.setDate(endDate.getDate() + 1);
                      }
                      const pad = (n: number) => n.toString().padStart(2, "0");
                      const formatICS = (d: Date) =>
                        `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
                      const icsContent = [
                        "BEGIN:VCALENDAR",
                        "VERSION:2.0",
                        "PRODID:-//Euphoria Night Club//Reservation//EN",
                        "BEGIN:VEVENT",
                        `DTSTART:${formatICS(startDate)}`,
                        `DTEND:${formatICS(endDate)}`,
                        `SUMMARY:Euphoria Night Club - ${selectedRoom.name}`,
                        `DESCRIPTION:Reservation for ${formData.guests} guests at ${selectedRoom.name}`,
                        "LOCATION:Bratislavská 11\\, 931 01 Šamorín\\, Slovakia",
                        `ORGANIZER:mailto:euphorianightclub11@gmail.com`,
                        "END:VEVENT",
                        "END:VCALENDAR",
                      ].join("\r\n");
                      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "euphoria-reservation.ics";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-euphoria-gold/40 text-euphoria-gold hover:bg-euphoria-gold/10 transition-all duration-300 text-sm font-ui uppercase tracking-wider"
                  >
                    <CalendarPlus size={18} />
                    {t.addToCalendar}
                  </button>

                  <button
                    onClick={() => {
                      if (!selectedDate || !selectedSlot || !selectedRoom) return;
                      const dateFormatted = new Date(selectedDate + "T12:00:00").toLocaleDateString(
                        locale === "sk" ? "sk-SK" : locale === "hu" ? "hu-HU" : locale === "de" ? "de-DE" : "en-US",
                        { day: "numeric", month: "long", year: "numeric" }
                      );
                      const timeFormatted = `${formatTime(selectedSlot.start_time)} - ${formatTime(selectedSlot.end_time)}`;
                      const message = encodeURIComponent(
                        `Euphoria Night Club\n${selectedRoom.name}\n${dateFormatted}\n${timeFormatted}\n${formData.guests} guests\nBratislavská 11, Šamorín`
                      );
                      window.open(`https://wa.me/?text=${message}`, "_blank");
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-green-600/40 text-green-500 hover:bg-green-600/10 transition-all duration-300 text-sm font-ui uppercase tracking-wider"
                  >
                    <MessageCircle size={18} />
                    {t.shareWhatsApp}
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <button
                    onClick={resetReservation}
                    className="btn-secondary text-base px-8 py-3"
                  >
                    {t.backToCalendar}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
