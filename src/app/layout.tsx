import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://euphoria-web-gules.vercel.app"),
  title: {
    default: "Euphoria Night Club | Šamorín",
    template: "%s | Euphoria Night Club",
  },
  description:
    "Exkluzívny pánsky bar v Šamoríne. Privátne izby, prémiové koktaily, diskrétna atmosféra.",
  keywords: [
    "gentlemen's bar",
    "pánsky bar",
    "Šamorín",
    "Somorja",
    "privátne izby",
    "bar",
    "koktaily",
    "Euphoria",
    "night bar",
  ],
  icons: {
    icon: "/images/logo-figure-dark.png",
    apple: "/images/logo-figure-dark.png",
  },
  openGraph: {
    title: "Euphoria Night Club | Šamorín",
    description:
      "Exkluzívny pánsky bar v Šamoríne. Privátne izby, prémiové koktaily, diskrétna atmosféra.",
    type: "website",
    siteName: "Euphoria Night Club",
    locale: "sk_SK",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Euphoria Night Club — Šamorín",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
