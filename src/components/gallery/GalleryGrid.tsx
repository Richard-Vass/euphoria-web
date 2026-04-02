"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: string;
  url: string;
  alt: string | null;
  category: string | null;
  sort_order: number | null;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="relative overflow-hidden group cursor-pointer break-inside-avoid border border-euphoria-gray/20 hover:border-euphoria-gold/30 transition-all duration-300"
            onClick={() => setSelected(img)}
          >
            <Image
              src={img.url}
              alt={img.alt || "Euphoria Night Club"}
              width={600}
              height={i % 3 === 0 ? 600 : i % 3 === 1 ? 337 : 800}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)" }}>
                {img.category || ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(5, 5, 5, 0.95)", backdropFilter: "blur(20px)" }}
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(5, 5, 5, 0.8)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "var(--gold)",
              }}
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.url}
                alt={selected.alt || "Euphoria Night Club"}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded"
                style={{ border: "1px solid rgba(212, 175, 55, 0.2)" }}
              />
              {selected.alt && (
                <p className="text-center mt-4 text-euphoria-muted text-sm">{selected.alt}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
