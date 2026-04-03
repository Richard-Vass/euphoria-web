"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Calendar,
  Music,
  Save,
} from "lucide-react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  type Event,
  type CreateEventData,
} from "@/lib/admin";

const EVENT_TYPES = [
  "DJ Night",
  "Themed Party",
  "Live Music",
  "Ladies Night",
  "Premium Event",
  "Special",
  "Other",
];

const emptyForm: CreateEventData = {
  title: "",
  date: "",
  dj: "",
  type: "DJ Night",
  description: "",
  image_url: "",
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateEventData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Load events error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.type) return;

    setSaving(true);
    try {
      if (editingId) {
        await updateEvent(editingId, form);
      } else {
        await createEvent(form);
      }
      await loadEvents();
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    } catch (err) {
      console.error("Save event error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event: Event) => {
    setForm({
      title: event.title,
      date: event.date,
      dj: event.dj || "",
      type: event.type,
      description: event.description || "",
      image_url: event.image_url || "",
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Naozaj chcete zmazat tento event?")) return;

    setDeleting(id);
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete event error:", err);
    } finally {
      setDeleting(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
            Eventy
          </h2>
          <p className="text-[#c0b8b0] text-sm mt-1">
            Sprava eventov a vecierkoch
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[#dc143c] via-[#c41e2a] to-[#8b0000] text-white font-[family-name:var(--font-ui)] font-semibold uppercase tracking-[0.1em] rounded-[50px] border border-[rgba(212,175,55,0.25)] hover:shadow-[0_8px_35px_rgba(196,30,42,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Novy event
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)]">
              {editingId ? "Upravit event" : "Novy event"}
            </h3>
            <button
              onClick={handleCancel}
              className="text-[#c0b8b0] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  Nazov *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  required
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                  placeholder="Nazov eventu"
                />
              </div>

              <div>
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  Datum *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  required
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  DJ / Umelec
                </label>
                <input
                  type="text"
                  value={form.dj}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dj: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                  placeholder="Meno DJ-a"
                />
              </div>

              <div>
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  Typ *
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                  required
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#050505]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  Popis
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all resize-none"
                  placeholder="Popis eventu"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  URL obrazku
                </label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image_url: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 text-sm bg-white/5 text-[#c0b8b0] border border-[rgba(212,175,55,0.2)] rounded-[50px] hover:text-white transition-all cursor-pointer"
              >
                Zrusit
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[#dc143c] via-[#c41e2a] to-[#8b0000] text-white font-[family-name:var(--font-ui)] font-semibold uppercase tracking-[0.1em] rounded-[50px] border border-[rgba(212,175,55,0.25)] hover:shadow-[0_8px_35px_rgba(196,30,42,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Ukladam..." : editingId ? "Ulozit" : "Vytvorit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events list */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-[#c0b8b0] py-8">Nacitavam...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-[#c0b8b0] py-8 bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg">
            Ziadne eventy. Vytvorte prvy!
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-5 hover:border-[#c41e2a] transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-heading)] truncate">
                    {event.title}
                  </h3>
                  <span className="px-2 py-0.5 text-xs rounded-full border border-[rgba(212,175,55,0.3)] text-[#d4af37] bg-[rgba(212,175,55,0.08)] whitespace-nowrap">
                    {event.type}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#c0b8b0]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  {event.dj && (
                    <span className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5" />
                      {event.dj}
                    </span>
                  )}
                </div>
                {event.description && (
                  <p className="text-[#c0b8b0]/70 text-sm mt-2 line-clamp-2">
                    {event.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 text-[#c0b8b0] hover:text-[#d4af37] bg-white/5 border border-[rgba(212,175,55,0.15)] rounded-lg transition-all cursor-pointer"
                  title="Upravit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  disabled={deleting === event.id}
                  className="p-2 text-[#c0b8b0] hover:text-[#c41e2a] bg-white/5 border border-[rgba(212,175,55,0.15)] rounded-lg transition-all cursor-pointer disabled:opacity-50"
                  title="Zmazat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
