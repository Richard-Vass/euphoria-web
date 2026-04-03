import type { Metadata } from "next";

const translations = {
  sk: {
    title: "Naskenujte a rezervujte",
    subtitle: "Euphoria Night Club",
    scan: "Naskenujte QR kód a rezervujte si privátnu izbu",
    address: "Bratislavská 11, Šamorín",
  },
  cz: {
    title: "Naskenujte a rezervujte",
    subtitle: "Euphoria Night Club",
    scan: "Naskenujte QR kód a rezervujte si soukromý pokoj",
    address: "Bratislavská 11, Šamorín",
  },
  hu: {
    title: "Szkenneljen és foglaljon",
    subtitle: "Euphoria Night Club",
    scan: "Szkennelje be a QR kódot és foglalja le privát szobáját",
    address: "Bratislavská 11, Šamorín",
  },
  de: {
    title: "Scannen und reservieren",
    subtitle: "Euphoria Night Club",
    scan: "Scannen Sie den QR-Code und reservieren Sie Ihr Privatzimmer",
    address: "Bratislavská 11, Šamorín",
  },
  en: {
    title: "Scan & Reserve",
    subtitle: "Euphoria Night Club",
    scan: "Scan the QR code and reserve your private room",
    address: "Bratislavská 11, Šamorín",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  return {
    title: t.title,
    description: t.scan,
  };
}

export default async function QRPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const reservationUrl = `https://euphoria-web-gules.vercel.app/${locale}/reservation`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(reservationUrl)}&bgcolor=050505&color=d4af37`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              /* Override all dark theme for print */
              .qr-page {
                background: #ffffff !important;
                color: #000000 !important;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .qr-page * {
                color: #000000 !important;
                -webkit-text-fill-color: #000000 !important;
                background: transparent !important;
              }
              .qr-logo-text {
                color: #000000 !important;
                -webkit-text-fill-color: #000000 !important;
              }
              .qr-gold-line {
                background: linear-gradient(90deg, transparent, #888, #000, #888, transparent) !important;
              }
              .qr-container {
                border: 2px solid #000000 !important;
                padding: 2rem !important;
                background: #ffffff !important;
              }
              .qr-scan-text {
                color: #333333 !important;
              }
              nav, footer, .fixed, [aria-label="WhatsApp"], [aria-label="Back to top"] {
                display: none !important;
              }
              main {
                padding: 0 !important;
              }
            }
          `,
        }}
      />
      <section className="qr-page py-24 px-4 min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          {/* Logo text */}
          <h1 className="qr-logo-text text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)] gold-text mb-2">
            EUPHORIA
          </h1>
          <p className="text-[#c0b8b0] text-sm uppercase tracking-[0.3em] font-[family-name:var(--font-ui)] mb-8">
            {t.subtitle}
          </p>

          <div className="qr-gold-line gold-line mx-auto mb-10" />

          {/* QR Code */}
          <div className="qr-container inline-block p-6 border border-[rgba(212,175,55,0.25)] rounded-lg bg-[rgba(180,20,40,0.04)] mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="QR Code - Reservation"
              width={300}
              height={300}
              className="mx-auto"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Text */}
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[#d4af37] mb-3">
            {t.title}
          </h2>
          <p className="qr-scan-text text-[#c0b8b0] text-base mb-6">
            {t.scan}
          </p>

          <div className="qr-gold-line gold-line mx-auto mb-6" />

          <p className="text-[#c0b8b0] text-sm font-[family-name:var(--font-ui)] uppercase tracking-[0.1em]">
            {t.address}
          </p>
        </div>
      </section>
    </>
  );
}
