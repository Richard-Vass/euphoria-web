import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euphoria Night Club",
  description: "Euphoria Night Club — The ultimate nightlife experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
