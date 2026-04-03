"use client";

import { useEffect } from "react";

/**
 * Tawk.to Live Chat Widget
 *
 * Zobrazuje sa v lavom dolnom rohu (WhatsApp je vpravo).
 *
 * SETUP:
 * 1. Vytvor ucet na https://dashboard.tawk.to
 * 2. Skopiruj Property ID a Widget ID z dashboard
 * 3. Nahrad PROPERTY_ID a WIDGET_ID nizsie
 *
 * PRIDANIE DO LAYOUTU:
 * Vloz <LiveChat /> do src/app/[locale]/layout.tsx pred </body>
 * Priklad:
 *   import LiveChat from "@/components/ui/LiveChat";
 *   ...
 *   <LiveChat />
 *   </body>
 */
export default function LiveChat() {
  useEffect(() => {
    // Tawk.to integration — replace PROPERTY_ID and WIDGET_ID with real values
    const s = document.createElement("script");
    s.src = "https://embed.tawk.to/PROPERTY_ID/WIDGET_ID";
    s.async = true;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);

    // Move widget to bottom-left (default is bottom-right)
    const style = document.createElement("style");
    style.textContent = `
      /* Tawk.to widget — bottom-left position */
      iframe[title="chat widget"],
      .tawk-min-container {
        left: 16px !important;
        right: auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(s);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
