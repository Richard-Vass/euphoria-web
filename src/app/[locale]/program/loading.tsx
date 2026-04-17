export default function LoadingProgram() {
  return (
    <section className="py-20 px-4" aria-label="Načítanie DJ programu">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-10 w-72 bg-euphoria-gold/10 rounded-sm mx-auto animate-pulse" />
          <div className="h-1 w-24 bg-euphoria-gold/20 mx-auto mt-6 rounded-sm animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="card border border-euphoria-gold/10"
              aria-hidden="true"
            >
              <div className="h-6 w-24 bg-euphoria-gold/20 rounded-sm mb-6 animate-pulse" />
              {Array.from({ length: 2 }).map((__, j) => (
                <div
                  key={j}
                  className="border-b border-euphoria-gold/10 pb-4 mb-4 last:border-0"
                >
                  <div className="h-5 w-40 bg-euphoria-muted/20 rounded-sm mb-2 animate-pulse" />
                  <div className="h-4 w-28 bg-euphoria-muted/10 rounded-sm animate-pulse" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
