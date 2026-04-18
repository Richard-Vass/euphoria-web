"use client";

/**
 * Galeria s lightboxom + keyboard nav + touch swipe.
 * Preberame pole images (string URL alebo objekt so src/alt).
 */

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

interface ImageItem {
  src: string;
  alt?: string;
  caption?: string;
}

interface Props {
  images: Array<string | ImageItem>;
  locale?: "sk" | "en" | string;
  columns?: 2 | 3 | 4;
}

const LABELS = {
  sk: { close: "Zatvoriť", prev: "Predchádzajúci", next: "Ďalší", of: "z" },
  en: { close: "Close", prev: "Previous", next: "Next", of: "of" },
} as const;

function normalize(img: string | ImageItem): ImageItem {
  return typeof img === "string" ? { src: img } : img;
}

export function GalleryLightbox({
  images,
  locale = "sk",
  columns = 3,
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items = images.map(normalize);
  const labels = LABELS[locale === "en" ? "en" : "sk"];
  const touchStart = useRef<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(() => {
    setOpenIdx((i) => (i === null ? null : Math.max(0, i - 1)));
  }, []);
  const next = useCallback(() => {
    setOpenIdx((i) =>
      i === null ? null : Math.min(items.length - 1, i + 1)
    );
  }, [items.length]);

  useEffect(() => {
    if (openIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, prev, next]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) prev();
      else next();
    }
    touchStart.current = null;
  }

  const gridCols =
    columns === 4
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-2 md:grid-cols-3";

  return (
    <>
      <div className={`grid ${gridCols} gap-3`}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setOpenIdx(i)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 hover:border-purple-500/50 transition-all bg-black/40"
            aria-label={`${item.alt || `Photo ${i + 1}`} — ${labels.next}`}
          >
            {/* If src is a real URL, render Image. Otherwise show placeholder. */}
            {item.src && item.src.startsWith("/") ? (
              <Image
                src={item.src}
                alt={item.alt || ""}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black flex items-center justify-center text-slate-600 text-xs">
                {item.alt || `Photo ${i + 1}`}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery"
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label={labels.close}
            className="absolute top-4 right-4 p-3 text-white/80 hover:text-white z-10"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          {/* Prev */}
          {openIdx > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={labels.prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/40 rounded-full"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {openIdx < items.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={labels.next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/40 rounded-full"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-full max-h-[80vh] aspect-square md:aspect-auto">
              {items[openIdx].src && items[openIdx].src.startsWith("/") ? (
                <Image
                  src={items[openIdx].src}
                  alt={items[openIdx].alt || ""}
                  width={1200}
                  height={900}
                  className="max-h-[80vh] w-auto object-contain rounded-lg"
                />
              ) : (
                <div className="w-[600px] max-w-full aspect-square bg-gradient-to-br from-purple-900/40 to-black rounded-lg flex items-center justify-center text-slate-400">
                  {items[openIdx].alt || `Photo ${openIdx + 1}`}
                </div>
              )}
            </div>

            {items[openIdx].caption && (
              <div className="mt-3 text-center text-sm text-slate-300">
                {items[openIdx].caption}
              </div>
            )}

            <div className="mt-2 text-xs text-slate-500">
              {openIdx + 1} {labels.of} {items.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
