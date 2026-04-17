"use client";

import { useState, useEffect } from "react";
import { Disc3, Plus, Trash2, Edit, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DJItem {
  id: string;
  day: string;
  dj_name: string;
  genre: string | null;
  start_time: string;
  end_time: string;
  is_resident: boolean;
  active_from: string | null;
  active_to: string | null;
}

const daysOrder = ["friday", "saturday", "sunday"];
const dayLabels: Record<string, string> = {
  monday: "Pondelok",
  tuesday: "Utorok",
  wednesday: "Streda",
  thursday: "Štvrtok",
  friday: "Piatok",
  saturday: "Sobota",
  sunday: "Nedeľa",
};

export default function AdminDJSchedulePage() {
  const [items, setItems] = useState<DJItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DJItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyForm: Omit<DJItem, "id"> = {
    day: "friday",
    dj_name: "",
    genre: "",
    start_time: "22:00",
    end_time: "04:00",
    is_resident: false,
    active_from: null,
    active_to: null,
  };
  const [form, setForm] = useState<Omit<DJItem, "id">>(emptyForm);

  async function loadSchedule() {
    setLoading(true);
    const { data, error } = await supabase
      .from("dj_schedule")
      .select("*")
      .order("day", { ascending: true });
    if (!error && data) setItems(data as DJItem[]);
    setLoading(false);
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      const { error } = await supabase
        .from("dj_schedule")
        .update(form)
        .eq("id", editing.id);
      if (error) {
        alert("Chyba pri ukladaní: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("dj_schedule").insert(form);
      if (error) {
        alert("Chyba pri vytváraní: " + error.message);
        return;
      }
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    await loadSchedule();
  }

  async function handleDelete(id: string) {
    if (!confirm("Zmazať tento záznam?")) return;
    const { error } = await supabase.from("dj_schedule").delete().eq("id", id);
    if (error) {
      alert("Chyba pri mazaní: " + error.message);
      return;
    }
    await loadSchedule();
  }

  function openEdit(item: DJItem) {
    setEditing(item);
    setForm({
      day: item.day,
      dj_name: item.dj_name,
      genre: item.genre || "",
      start_time: item.start_time,
      end_time: item.end_time,
      is_resident: item.is_resident,
      active_from: item.active_from,
      active_to: item.active_to,
    });
    setShowForm(true);
  }

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  const grouped = daysOrder.reduce<Record<string, DJItem[]>>((acc, day) => {
    acc[day] = items.filter((i) => i.day === day);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#d4af37]">
            DJ Rozpis týždňa
          </h2>
          <p className="text-[#c0b8b0] text-sm mt-1">
            {items.length} záznamov · upravujte a pridávajte podľa potreby
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c41e2a] to-[#8b0000] text-white rounded-lg hover:-translate-y-0.5 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Pridať DJa
        </button>
      </div>

      {loading ? (
        <div className="text-[#c0b8b0]">Načítavam...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {daysOrder.map((day) => (
            <div
              key={day}
              className="bg-[#0d0507] border border-[rgba(212,175,55,0.12)] rounded-lg p-4"
            >
              <h3 className="text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                <Disc3 className="w-4 h-4" />
                {dayLabels[day]}
              </h3>
              {grouped[day].length === 0 ? (
                <p className="text-sm text-[#6b6b6b] italic">Žiadne DJs</p>
              ) : (
                <ul className="space-y-3">
                  {grouped[day].map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-[rgba(212,175,55,0.1)] pb-2 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-white">
                            {item.dj_name}
                          </p>
                          {item.genre && (
                            <p className="text-xs text-[#c0b8b0]">
                              {item.genre}
                            </p>
                          )}
                          <p className="text-xs text-[#c0b8b0] mt-1">
                            {item.start_time} — {item.end_time}
                            {item.is_resident && (
                              <span className="ml-2 text-[10px] px-1.5 py-0.5 border border-[#d4af37]/40 text-[#d4af37] rounded">
                                Resident
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEdit(item)}
                            className="p-1 text-[#c0b8b0] hover:text-[#d4af37]"
                            aria-label="Upraviť"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-[#c0b8b0] hover:text-[#c41e2a]"
                            aria-label="Zmazať"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-[#0d0507] border border-[rgba(212,175,55,0.25)] rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#d4af37]">
                {editing ? "Upraviť DJ" : "Nový DJ"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-[#c0b8b0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs text-[#c0b8b0] mb-1 uppercase">
                  Meno DJa *
                </label>
                <input
                  type="text"
                  required
                  value={form.dj_name}
                  onChange={(e) => setForm({ ...form, dj_name: e.target.value })}
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c0b8b0] mb-1 uppercase">
                  Deň *
                </label>
                <select
                  value={form.day}
                  onChange={(e) => setForm({ ...form, day: e.target.value })}
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm"
                >
                  {Object.entries(dayLabels).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#c0b8b0] mb-1 uppercase">
                  Žáner
                </label>
                <input
                  type="text"
                  value={form.genre || ""}
                  onChange={(e) =>
                    setForm({ ...form, genre: e.target.value || null })
                  }
                  placeholder="House / Deep"
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#c0b8b0] mb-1 uppercase">
                    Od *
                  </label>
                  <input
                    type="time"
                    required
                    value={form.start_time}
                    onChange={(e) =>
                      setForm({ ...form, start_time: e.target.value })
                    }
                    className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#c0b8b0] mb-1 uppercase">
                    Do *
                  </label>
                  <input
                    type="time"
                    required
                    value={form.end_time}
                    onChange={(e) =>
                      setForm({ ...form, end_time: e.target.value })
                    }
                    className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  checked={form.is_resident}
                  onChange={(e) =>
                    setForm({ ...form, is_resident: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                Resident DJ
              </label>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-[#c41e2a] to-[#8b0000] text-white rounded font-semibold"
                >
                  {editing ? "Uložiť" : "Vytvoriť"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="py-2 px-4 border border-[rgba(212,175,55,0.2)] text-[#c0b8b0] rounded"
                >
                  Zrušiť
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
