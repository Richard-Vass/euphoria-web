import { Locale, locales, getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Inter, Raleway } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

  return (
    <html lang={locale} className={`${bodoni.variable} ${inter.variable} ${raleway.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar locale={locale as Locale} dict={dict} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
