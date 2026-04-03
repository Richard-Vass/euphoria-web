"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X, Image as ImageIcon, Save } from "lucide-react";
import {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
  type GalleryImage,
} from "@/lib/admin";

const CATEGORIES = ["Interier", "Eventy", "Privátne izby", "Koktaily", "Atmosfera", "Other"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Interier");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await getGalleryImages();
      setImages(data);
    } catch (err) {
      console.error("Load gallery error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setSaving(true);
    try {
      const newImage = await addGalleryImage({ url, alt, category });
      setImages((prev) => [...prev, newImage]);
      setUrl("");
      setAlt("");
      setCategory("Interier");
      setShowForm(false);
    } catch (err) {
      console.error("Add image error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Naozaj chcete zmazat tento obrazok?")) return;

    setDeleting(id);
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Delete image error:", err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
            Galeria
          </h2>
          <p className="text-[#c0b8b0] text-sm mt-1">
            Sprava fotografii klubu
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[#dc143c] via-[#c41e2a] to-[#8b0000] text-white font-[family-name:var(--font-ui)] font-semibold uppercase tracking-[0.1em] rounded-[50px] border border-[rgba(212,175,55,0.25)] hover:shadow-[0_8px_35px_rgba(196,30,42,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Pridat obrazok
          </button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#d4af37] font-[family-name:var(--font-heading)]">
              Pridat obrazok
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-[#c0b8b0] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  URL obrazku *
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  Popis (alt text)
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                  placeholder="Popis obrazku"
                />
              </div>

              <div>
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  Kategoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] transition-all"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#050505]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview */}
            {url && (
              <div className="border border-[rgba(212,175,55,0.12)] rounded-lg overflow-hidden max-w-xs">
                <img
                  src={url}
                  alt={alt || "Preview"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "";
                    (e.target as HTMLImageElement).alt = "Neda sa nacitat";
                  }}
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
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
                {saving ? "Ukladam..." : "Pridat"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery grid */}
      {loading ? (
        <div className="text-center text-[#c0b8b0] py-8">Nacitavam...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg">
          <ImageIcon className="w-12 h-12 text-[#c0b8b0]/30 mx-auto mb-4" />
          <p className="text-[#c0b8b0]">Galeria je prazdna</p>
          <p className="text-[#c0b8b0]/60 text-sm mt-1">
            Pridajte prvy obrazok
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative bg-[rgba(180,20,40,0.04)] border border-[rgba(212,175,55,0.18)] rounded-lg overflow-hidden hover:border-[#c41e2a] transition-all"
            >
              <div className="aspect-square bg-[#1a0a0e]">
                <img
                  src={img.url}
                  alt={img.alt || "Gallery image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deleting === img.id}
                  className="p-3 bg-[#c41e2a]/80 text-white rounded-full hover:bg-[#c41e2a] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                {img.category && (
                  <span className="text-xs text-[#d4af37] font-[family-name:var(--font-ui)] uppercase tracking-wider">
                    {img.category}
                  </span>
                )}
                {img.alt && (
                  <p className="text-[#c0b8b0] text-sm mt-1 truncate">
                    {img.alt}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
