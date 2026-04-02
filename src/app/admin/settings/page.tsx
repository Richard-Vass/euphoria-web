"use client";

import { useState } from "react";
import { Save, Shield, Globe, Clock } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
          Nastavenia
        </h2>
        <p className="text-[#c0b8b0] text-sm mt-1">
          Konfiguracia admin panelu
        </p>
      </div>

      {/* Info cards */}
      <div className="space-y-4">
        {/* Club info */}
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)]">
              Informacie o klube
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                Nazov klubu
              </label>
              <input
                type="text"
                defaultValue="Euphoria Night Club"
                className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                Mesto
              </label>
              <input
                type="text"
                defaultValue="Samorin"
                className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="info@euphoria-club.sk"
                className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                Telefon
              </label>
              <input
                type="tel"
                defaultValue="+421 900 000 000"
                className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Opening hours */}
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)]">
              Otvaracie hodiny
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { day: "Piatok", time: "19:00 - 04:00" },
              { day: "Sobota", time: "19:00 - 06:00" },
              { day: "Nedela", time: "19:00 - 02:00" },
            ].map((item) => (
              <div key={item.day} className="flex items-center gap-4">
                <span className="text-[#c0b8b0] text-sm w-24 font-[family-name:var(--font-ui)]">
                  {item.day}
                </span>
                <input
                  type="text"
                  defaultValue={item.time}
                  className="flex-1 bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-2 text-white text-sm outline-none focus:border-[#d4af37] transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)]">
              Bezpecnost
            </h3>
          </div>
          <p className="text-[#c0b8b0] text-sm mb-4">
            PIN kod na prihlasenie do admin panelu je nastaveny cez environment premennu{" "}
            <code className="text-[#d4af37] bg-white/5 px-1.5 py-0.5 rounded text-xs">
              NEXT_PUBLIC_ADMIN_PIN
            </code>
          </p>
          <p className="text-[#c0b8b0]/60 text-xs">
            Pre zmenu PIN kodu upravte .env subor alebo Vercel environment
            variables.
          </p>
        </div>

        {/* Supabase */}
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 rounded bg-[#3ecf8e] flex items-center justify-center text-[10px] font-bold text-white">
              S
            </div>
            <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)]">
              Supabase
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-[rgba(212,175,55,0.08)]">
              <span className="text-[#c0b8b0]">Tabulky</span>
              <span className="text-white">
                rooms, time_slots, reservations, blocked_dates, events, gallery
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(212,175,55,0.08)]">
              <span className="text-[#c0b8b0]">RLS</span>
              <span className="text-green-400">Aktivne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 text-sm bg-gradient-to-r from-[#dc143c] via-[#c41e2a] to-[#8b0000] text-white font-[family-name:var(--font-ui)] font-semibold uppercase tracking-[0.1em] rounded-[50px] border border-[rgba(212,175,55,0.25)] hover:shadow-[0_8px_35px_rgba(196,30,42,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {saved ? "Ulozene!" : "Ulozit nastavenia"}
        </button>
      </div>
    </div>
  );
}
