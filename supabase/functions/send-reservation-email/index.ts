// ============================================
// Euphoria Night Club — Reservation Auto-Confirm
// Supabase Edge Function (Deno)
// ============================================
//
// Trigger: HTTP POST z reservation/page.tsx po úspešnom INSERT-e do `reservations`
// Effect:
//   1. Pošle host-confirmation email (Resend) — slovenčina, brand tone
//   2. Pošle owner-notification email Zolimu (euphorianightclub11@gmail.com)
//
// ENV (set v Supabase dashboard → Edge Functions → Secrets):
//   - RESEND_API_KEY            — Resend API key (re_...)
//   - RESEND_FROM_EMAIL         — overený sender (rezervacie@euphoria-nightclub.sk)
//   - OWNER_NOTIFICATION_EMAIL  — Zoli mailbox (euphorianightclub11@gmail.com)
//
// Body:
//   {
//     customer_name: string,
//     customer_email: string,
//     customer_phone: string,
//     date: "2026-05-09",
//     time_slot: "22:00:00 – 01:00:00",
//     guests_count: number,
//     room_name: "Privátna izba",
//     price: "200€",
//     note?: string
//   }

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationEmailPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  date: string;
  time_slot: string;
  guests_count: number;
  room_name: string;
  price: string;
  note?: string;
}

function formatDateSk(isoDate: string): string {
  // "2026-05-09" → "9. máj 2026"
  const months = [
    "január", "február", "marec", "apríl", "máj", "jún",
    "júl", "august", "september", "október", "november", "december",
  ];
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${d}. ${months[m - 1]} ${y}`;
}

function formatTimeSlot(slot: string): string {
  // "22:00:00 – 01:00:00" → "22:00 – 01:00"
  return slot.replace(/(\d{2}:\d{2}):\d{2}/g, "$1");
}

function buildHostHtml(p: ReservationEmailPayload): string {
  const dateSk = formatDateSk(p.date);
  const time = formatTimeSlot(p.time_slot);
  const noteRow = p.note
    ? `<tr><td style="padding:8px 0;color:#9a9a9a;font-size:13px;letter-spacing:.05em;">POZNÁMKA</td><td style="padding:8px 0;color:#fff;text-align:right;">${p.note}</td></tr>`
    : "";

  return `<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Rezervácia potvrdená — Euphoria Night Club</title>
</head>
<body style="margin:0;padding:0;background:#0a0606;font-family:'Inter',Arial,sans-serif;color:#e5d8b8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0606;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111;border:1px solid rgba(212,175,55,0.25);border-radius:4px;overflow:hidden;">

        <!-- Header -->
        <tr><td align="center" style="padding:36px 32px 18px;background:linear-gradient(135deg,#1a0508,#0a0606);">
          <div style="font-family:'Bodoni Moda',Georgia,serif;font-size:28px;font-weight:700;color:#d4af37;letter-spacing:.08em;">EUPHORIA</div>
          <div style="font-family:'Bodoni Moda',Georgia,serif;font-size:11px;color:#9a9a9a;letter-spacing:.3em;margin-top:4px;">NIGHT CLUB · ŠAMORÍN</div>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px;">
          <h1 style="font-family:'Bodoni Moda',Georgia,serif;color:#d4af37;font-size:24px;margin:0 0 12px;font-weight:600;">Rezervácia potvrdená</h1>
          <p style="color:#cfcfcf;font-size:15px;line-height:1.6;margin:0 0 24px;">
            Dobrý deň ${p.customer_name},<br>
            ďakujeme za rezerváciu v Euphoria Night Club. Vaša privátna izba je rezervovaná —
            tešíme sa na vás.
          </p>

          <!-- Detail box -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(212,175,55,0.2);border-bottom:1px solid rgba(212,175,55,0.2);margin:0 0 24px;">
            <tr><td style="padding:8px 0;color:#9a9a9a;font-size:13px;letter-spacing:.05em;">IZBA</td><td style="padding:8px 0;color:#fff;text-align:right;">${p.room_name}</td></tr>
            <tr><td style="padding:8px 0;color:#9a9a9a;font-size:13px;letter-spacing:.05em;">DÁTUM</td><td style="padding:8px 0;color:#fff;text-align:right;">${dateSk}</td></tr>
            <tr><td style="padding:8px 0;color:#9a9a9a;font-size:13px;letter-spacing:.05em;">ČAS</td><td style="padding:8px 0;color:#d4af37;text-align:right;">${time}</td></tr>
            <tr><td style="padding:8px 0;color:#9a9a9a;font-size:13px;letter-spacing:.05em;">POČET HOSTÍ</td><td style="padding:8px 0;color:#fff;text-align:right;">${p.guests_count}</td></tr>
            ${noteRow}
            <tr><td style="padding:12px 0 8px;color:#9a9a9a;font-size:13px;letter-spacing:.05em;">CENA</td><td style="padding:12px 0 8px;color:#d4af37;text-align:right;font-size:20px;font-weight:600;">${p.price}</td></tr>
          </table>

          <p style="color:#cfcfcf;font-size:14px;line-height:1.6;margin:0 0 12px;">
            <strong style="color:#d4af37;">Adresa:</strong> Bratislavská 11, 931 01 Šamorín
          </p>
          <p style="color:#cfcfcf;font-size:14px;line-height:1.6;margin:0 0 12px;">
            <strong style="color:#d4af37;">Kontakt:</strong> +421 950 480 799
          </p>
          <p style="color:#888;font-size:13px;line-height:1.6;margin:24px 0 0;font-style:italic;">
            V prípade zmeny alebo zrušenia rezervácie nás prosím kontaktujte minimálne 24 hodín vopred.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding:24px 32px;background:#080404;border-top:1px solid rgba(212,175,55,0.15);">
          <div style="font-family:'Bodoni Moda',Georgia,serif;font-size:11px;color:#666;letter-spacing:.2em;">EUPHORIA NIGHT CLUB · BRATISLAVSKÁ 11 · 931 01 ŠAMORÍN</div>
          <div style="font-size:11px;color:#444;margin-top:8px;">© ${new Date().getFullYear()} Euphoria Night Club. Všetky práva vyhradené.</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildOwnerHtml(p: ReservationEmailPayload): string {
  const dateSk = formatDateSk(p.date);
  const time = formatTimeSlot(p.time_slot);
  const noteRow = p.note
    ? `<tr><td style="padding:6px 0;color:#666;">Poznámka:</td><td style="padding:6px 0;color:#000;">${p.note}</td></tr>`
    : "";

  return `<!doctype html>
<html lang="sk">
<body style="font-family:Arial,sans-serif;color:#000;background:#fff;padding:24px;">
  <h2 style="color:#c41e2a;margin:0 0 12px;">Nová rezervácia — ${dateSk}, ${time}</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Meno:</td><td style="padding:6px 0;color:#000;font-weight:600;">${p.customer_name}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Telefón:</td><td style="padding:6px 0;color:#000;"><a href="tel:${p.customer_phone}">${p.customer_phone}</a></td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Email:</td><td style="padding:6px 0;color:#000;"><a href="mailto:${p.customer_email}">${p.customer_email}</a></td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Izba:</td><td style="padding:6px 0;color:#000;">${p.room_name}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Dátum:</td><td style="padding:6px 0;color:#000;">${dateSk}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Čas:</td><td style="padding:6px 0;color:#000;font-weight:600;">${time}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Hostí:</td><td style="padding:6px 0;color:#000;">${p.guests_count}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#666;">Cena:</td><td style="padding:6px 0;color:#000;font-weight:600;">${p.price}</td></tr>
    ${noteRow}
  </table>
  <p style="color:#666;font-size:13px;margin-top:16px;">Status: <strong style="color:#0a0;">CONFIRMED</strong> (auto-confirm)</p>
</body></html>`;
}

async function sendResendEmail(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const RESEND_FROM_EMAIL =
    Deno.env.get("RESEND_FROM_EMAIL") ?? "rezervacie@euphoria-nightclub.sk";
  const OWNER_EMAIL =
    Deno.env.get("OWNER_NOTIFICATION_EMAIL") ?? "euphorianightclub11@gmail.com";

  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "RESEND_API_KEY not configured" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }

  let payload: ReservationEmailPayload;
  try {
    payload = (await req.json()) as ReservationEmailPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  // Basic validation
  const required = [
    "customer_name", "customer_email", "customer_phone",
    "date", "time_slot", "guests_count", "room_name", "price",
  ] as const;
  for (const k of required) {
    if (!payload[k as keyof ReservationEmailPayload] && payload[k as keyof ReservationEmailPayload] !== 0) {
      return new Response(JSON.stringify({ error: `Missing field: ${k}` }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }
  }

  const dateSk = formatDateSk(payload.date);
  const time = formatTimeSlot(payload.time_slot);

  // 1. Host confirmation
  const hostResult = payload.customer_email
    ? await sendResendEmail(
        RESEND_API_KEY,
        `Euphoria Night Club <${RESEND_FROM_EMAIL}>`,
        payload.customer_email,
        `Rezervácia potvrdená — ${dateSk}, ${time}`,
        buildHostHtml(payload),
        OWNER_EMAIL,
      )
    : { ok: true, status: 0, body: "skipped (no email)" };

  // 2. Owner notification
  const ownerResult = await sendResendEmail(
    RESEND_API_KEY,
    `Euphoria Rezervácie <${RESEND_FROM_EMAIL}>`,
    OWNER_EMAIL,
    `Nová rezervácia — ${payload.customer_name}, ${dateSk}, ${time}`,
    buildOwnerHtml(payload),
    payload.customer_email || undefined,
  );

  return new Response(
    JSON.stringify({
      ok: hostResult.ok && ownerResult.ok,
      host: { ok: hostResult.ok, status: hostResult.status },
      owner: { ok: ownerResult.ok, status: ownerResult.status },
    }),
    {
      status: hostResult.ok && ownerResult.ok ? 200 : 502,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    },
  );
});
