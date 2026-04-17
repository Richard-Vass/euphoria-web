export default function LoadingEvents() {
  return (
    <section className="py-24 px-4" aria-label="Načítanie udalostí">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="h-10 w-64 bg-euphoria-gold/10 rounded-sm mx-auto animate-pulse" />
          <div className="h-1 w-24 bg-euphoria-gold/20 mx-auto mt-6 rounded-sm animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card border border-euphoria-gold/10"
              aria-hidden="true"
            >
              <div className="aspect-video bg-euphoria-gray/30 mb-4 animate-pulse rounded-sm" />
              <div className="h-4 w-24 bg-euphoria-gold/20 rounded-sm mb-3 animate-pulse" />
              <div className="h-6 w-3/4 bg-euphoria-muted/10 rounded-sm mb-2 animate-pulse" />
              <div className="h-4 w-1/2 bg-euphoria-muted/10 rounded-sm mb-4 animate-pulse" />
              <div className="h-10 w-full bg-euphoria-gold/10 rounded-sm animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
