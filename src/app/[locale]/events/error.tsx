"use client";

import { useEffect } from "react";

export default function EventsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Events page error:", error);
  }, [error]);

  return (
    <section className="py-24 px-4 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Eventy sa nepodarilo načítať
        </h2>
        <p className="text-euphoria-muted mb-8">
          Skúste obnoviť stránku. Ak problém pretrváva, kontaktujte nás.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary"
          type="button"
        >
          Skúsiť znova
        </button>
      </div>
    </section>
  );
}
