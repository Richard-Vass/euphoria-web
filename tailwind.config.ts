import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        euphoria: {
          black: "#0A0A0A",
          dark: "#1A1A1A",
          gray: "#2D2D2D",
          red: "#C41E2A",
          "red-light": "#E02030",
          "red-glow": "rgba(196, 30, 42, 0.3)",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(196, 30, 42, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(196, 30, 42, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
