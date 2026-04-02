import { Locale, locales, getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Inter, Raleway } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import LoadingScreen from "@/components/ui/LoadingScreen";

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ui",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    name: "Euphoria Night Club",
    url: `https://euphoria-web-gules.vercel.app/${locale}`,
    image: "https://euphoria-web-gules.vercel.app/images/logo-figure-dark.png",
    telephone: "+421 950 480 799",
    email: "euphorianightclub11@gmail.com",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bratislavská 11",
      addressLocality: "Šamorín",
      postalCode: "931 01",
      addressCountry: "SK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.0286,
      longitude: 17.3117,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "21:00",
        closes: "05:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        opens: "00:00",
        closes: "00:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/euphorianightclub",
      "https://www.facebook.com/euphorianightclub",
    ],
  };

  return (
    <html lang={locale} className={`${bodoni.variable} ${inter.variable} ${raleway.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        <Navbar locale={locale as Locale} dict={dict} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        <WhatsAppButton />
        <BackToTop />
        <CookieConsent locale={locale as Locale} />
      </body>
    </html>
  );
}
