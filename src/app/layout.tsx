import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://euphoria-web-gules.vercel.app"),
  title: {
    default: "Euphoria Night Club | Šamorín",
    template: "%s | Euphoria Night Club",
  },
  description:
    "Luxusný nočný klub v Šamoríne. VIP izby, prémiové koktaily, nezabudnuteľné nočné eventy.",
  keywords: [
    "night club",
    "Šamorín",
    "Somorja",
    "VIP",
    "party",
    "koktaily",
    "nočný klub",
    "Euphoria",
  ],
  icons: {
    icon: "/images/logo-figure-dark.png",
  },
  openGraph: {
    title: "Euphoria Night Club | Šamorín",
    description:
      "Luxusný nočný klub v Šamoríne. VIP izby, prémiové koktaily, nezabudnuteľné nočné eventy.",
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
