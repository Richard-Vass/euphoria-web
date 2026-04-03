import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <html lang="sk">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(196, 30, 42, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 70%, rgba(212, 175, 55, 0.04) 0%, transparent 50%),
            #050505
          `,
          fontFamily: "Inter, sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "520px",
            padding: "3rem 2rem",
            background: "rgba(180, 20, 40, 0.04)",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            borderRadius: "4px",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
          }}
        >
          <Image
            src="/images/logo-transparent.png"
            alt="Euphoria Night Club"
            width={200}
            height={60}
            style={{
              height: "48px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "2rem",
            }}
          />

          <h1
            style={{
              fontFamily: "Bodoni Moda, serif",
              fontSize: "clamp(4rem, 10vw, 7rem)",
              fontWeight: 700,
              color: "#d4af37",
              lineHeight: 1,
              marginBottom: "0.5rem",
              textShadow: "0 0 40px rgba(212, 175, 55, 0.2)",
            }}
          >
            404
          </h1>

          <div
            style={{
              width: "120px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #dc143c, #d4af37, #dc143c, transparent)",
              margin: "1.5rem auto",
            }}
          />

          <p
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "1.1rem",
              color: "#c0b8b0",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Stránka nenájdená
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(192, 184, 176, 0.6)",
              marginBottom: "2.5rem",
              fontStyle: "italic",
            }}
          >
            Táto stránka neexistuje alebo bola presunutá.
          </p>

          <Link
            href="/sk"
            style={{
              display: "inline-block",
              padding: "1rem 2.8rem",
              background: "linear-gradient(135deg, #dc143c, #c41e2a, #8b0000)",
              color: "#ffffff",
              fontFamily: "Raleway, sans-serif",
              fontSize: "0.95rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              borderRadius: "50px",
              textDecoration: "none",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            Domov
          </Link>
        </div>
      </body>
    </html>
  );
}
