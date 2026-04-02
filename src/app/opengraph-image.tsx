import { ImageResponse } from "next/og";

export const alt = "Euphoria Night Club — Šamorín";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050505 0%, #1a0a0e 40%, #0d0507 70%, #050505 100%)",
          position: "relative",
        }}
      >
        {/* Gold glow top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #c41e2a, #d4af37, #c41e2a, transparent)",
          }}
        />

        {/* Gold glow bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #c41e2a, #d4af37, #c41e2a, transparent)",
          }}
        />

        {/* Decorative diamond */}
        <div
          style={{
            fontSize: "24px",
            color: "#c41e2a",
            marginBottom: "24px",
            letterSpacing: "0.5em",
            opacity: 0.7,
          }}
        >
          ✦
        </div>

        {/* EUPHORIA */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: 700,
            color: "#d4af37",
            letterSpacing: "0.15em",
            textShadow: "0 0 60px rgba(212, 175, 55, 0.3)",
            lineHeight: 1,
          }}
        >
          EUPHORIA
        </div>

        {/* Gold line */}
        <div
          style={{
            width: "200px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #c41e2a, #d4af37, #c41e2a, transparent)",
            margin: "24px 0",
          }}
        />

        {/* Night Club */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          Night Club
        </div>

        {/* Address */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "18px",
            color: "#c0b8b0",
            letterSpacing: "0.1em",
          }}
        >
          Bratislavská 11, Šamorín
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
