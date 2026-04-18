"use client";

/**
 * DJ profile editor — admin UI pre spravu DJ profilov.
 * UI-only placeholder — backend cez Supabase sa dopojí neskor.
 *
 * Poskytuje:
 *  - zoznam DJ-ov (meno, foto URL, bio)
 *  - social links (Instagram, SoundCloud, Mixcloud, Spotify)
 *  - schedule editor (den + cas + DJ)
 */

import { useState } from "react";

export interface DjProfile {
  id: string;
  name: string;
  photoUrl?: string;
  bio?: string;
  socials: {
    instagram?: string;
    soundcloud?: string;
    mixcloud?: string;
    spotify?: string;
  };
}

interface Props {
  initial?: DjProfile[];
  onChange?: (djs: DjProfile[]) => void;
  locale?: "sk" | "en" | string;
}

const COPY = {
  sk: {
    title: "DJ profily",
    sub: "Spravujte profily rezidentných DJ-ov",
    add: "+ Pridať DJ",
    name: "Meno",
    photo: "Foto URL",
    bio: "Bio",
    instagram: "Instagram",
    soundcloud: "SoundCloud",
    mixcloud: "Mixcloud",
    spotify: "Spotify",
    remove: "Odstrániť",
    save: "Uložiť profil",
    empty: "Zatiaľ nie sú žiadne DJ profily.",
    saved: "Uložené (lokálne, žiadny backend).",
  },
  en: {
    title: "DJ profiles",
    sub: "Manage resident DJ profiles",
    add: "+ Add DJ",
    name: "Name",
    photo: "Photo URL",
    bio: "Bio",
    instagram: "Instagram",
    soundcloud: "SoundCloud",
    mixcloud: "Mixcloud",
    spotify: "Spotify",
    remove: "Remove",
    save: "Save profile",
    empty: "No DJ profiles yet.",
    saved: "Saved (local only, no backend).",
  },
} as const;

export function DjProfileEditor({ initial = [], onChange, locale = "sk" }: Props) {
  const copy = COPY[locale === "en" ? "en" : "sk"];
  const [djs, setDjs] = useState<DjProfile[]>(initial);
  const [toast, setToast] = useState<string | null>(null);

  function addDj() {
    const dj: DjProfile = {
      id: crypto.randomUUID(),
      name: "",
      socials: {},
    };
    const next = [...djs, dj];
    setDjs(next);
    onChange?.(next);
  }

  function updateDj(id: string, patch: Partial<DjProfile>) {
    const next = djs.map((d) => (d.id === id ? { ...d, ...patch } : d));
    setDjs(next);
    onChange?.(next);
  }

  function updateSocial(id: string, key: keyof DjProfile["socials"], value: string) {
    const next = djs.map((d) =>
      d.id === id ? { ...d, socials: { ...d.socials, [key]: value || undefined } } : d
    );
    setDjs(next);
    onChange?.(next);
  }

  function removeDj(id: string) {
    const next = djs.filter((d) => d.id !== id);
    setDjs(next);
    onChange?.(next);
  }

  function save() {
    setToast(copy.saved);
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-1">
            {copy.title}
          </h2>
          <p className="text-sm text-slate-400">{copy.sub}</p>
        </div>
        <button
          onClick={addDj}
          className="bg-purple-700 hover:bg-purple-600 text-white font-semibold text-sm px-4 py-2 rounded-lg"
        >
          {copy.add}
        </button>
      </div>

      {djs.length === 0 ? (
        <p className="text-slate-500 text-sm italic py-6 text-center">
          {copy.empty}
        </p>
      ) : (
        <div className="space-y-6">
          {djs.map((dj) => (
            <div
              key={dj.id}
              className="bg-black/40 border border-white/10 rounded-xl p-5"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <LabeledInput
                  label={copy.name}
                  value={dj.name}
                  onChange={(v) => updateDj(dj.id, { name: v })}
                />
                <LabeledInput
                  label={copy.photo}
                  value={dj.photoUrl || ""}
                  onChange={(v) => updateDj(dj.id, { photoUrl: v || undefined })}
                />
              </div>

              <LabeledTextarea
                label={copy.bio}
                value={dj.bio || ""}
                onChange={(v) => updateDj(dj.id, { bio: v || undefined })}
              />

              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <LabeledInput
                  label={copy.instagram}
                  value={dj.socials.instagram || ""}
                  onChange={(v) => updateSocial(dj.id, "instagram", v)}
                  placeholder="https://instagram.com/..."
                />
                <LabeledInput
                  label={copy.soundcloud}
                  value={dj.socials.soundcloud || ""}
                  onChange={(v) => updateSocial(dj.id, "soundcloud", v)}
                  placeholder="https://soundcloud.com/..."
                />
                <LabeledInput
                  label={copy.mixcloud}
                  value={dj.socials.mixcloud || ""}
                  onChange={(v) => updateSocial(dj.id, "mixcloud", v)}
                  placeholder="https://mixcloud.com/..."
                />
                <LabeledInput
                  label={copy.spotify}
                  value={dj.socials.spotify || ""}
                  onChange={(v) => updateSocial(dj.id, "spotify", v)}
                  placeholder="https://open.spotify.com/..."
                />
              </div>

              <div className="flex gap-3 justify-end mt-5 pt-4 border-t border-white/5">
                <button
                  onClick={() => removeDj(dj.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1.5 rounded"
                >
                  {copy.remove}
                </button>
                <button
                  onClick={save}
                  className="bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg"
                >
                  {copy.save}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg z-50"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5 block">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />
    </label>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5 block">
        {label}
      </span>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />
    </label>
  );
}
