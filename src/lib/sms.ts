/**
 * SMS notifikacie cez Twilio
 *
 * SETUP:
 * 1. Vytvor ucet na https://www.twilio.com
 * 2. V Console ziskaj Account SID a Auth Token
 * 3. Kup si telefonne cislo (napr. +421...)
 * 4. Nastav env vars:
 *    TWILIO_ACCOUNT_SID=ACxxxxxxxxxx
 *    TWILIO_AUTH_TOKEN=xxxxxxxxxx
 *    TWILIO_PHONE_NUMBER=+421xxxxxxxxx
 * 5. Pridaj do .env.local a Vercel env vars
 */

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;

/**
 * Posle SMS spravu. Ak nie su nastavene Twilio credentials, loguje do konzoly.
 */
export async function sendSMS(phone: string, message: string): Promise<void> {
  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM) {
    console.log(`[SMS MOCK] To: ${phone} | Message: ${message}`);
    return;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: phone,
      From: TWILIO_FROM,
      Body: message,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Twilio SMS error: ${error}`);
  }
}

/**
 * Template pre potvrdenie rezervacie.
 * Kratka, diskretna sprava — bez nazvu podniku v tele SMS.
 */
export function reservationConfirmationSMS(data: {
  name: string;
  date: string;
  time: string;
  guests: number;
}): string {
  return `Dobry den ${data.name}, vasa rezervacia na ${data.date} o ${data.time} pre ${data.guests} ${data.guests === 1 ? "osobu" : data.guests < 5 ? "osoby" : "osob"} je potvrdena. Tesime sa na vas.`;
}

/**
 * Template pre zrusenie rezervacie.
 */
export function reservationCancellationSMS(data: {
  name: string;
  date: string;
}): string {
  return `Dobry den ${data.name}, vasa rezervacia na ${data.date} bola zrusena. Pre novu rezervaciu nas kontaktujte.`;
}
