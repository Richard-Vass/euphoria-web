# send-reservation-email — Supabase Edge Function

Auto-confirm rezervácie privátnej izby v Euphoria Night Club.

## Čo robí

1. Po úspešnom INSERT-e do `reservations` (status `confirmed`) klient (frontend) volá tento endpoint.
2. Function pošle:
   - **Host email** — potvrdenie zákazníkovi (slovensky, brand tone, gold + dark)
   - **Owner email** — notifikácia Zolimu (`euphorianightclub11@gmail.com`)
3. Resend API ako mail provider.

## Env (Supabase Dashboard → Edge Functions → Secrets)

| Premenná | Príklad | Poznámka |
|----------|---------|----------|
| `RESEND_API_KEY` | `re_...` | Z Resend dashboardu |
| `RESEND_FROM_EMAIL` | `rezervacie@euphoria-nightclub.sk` | **MUSÍ byť verified domain v Resend** |
| `OWNER_NOTIFICATION_EMAIL` | `euphorianightclub11@gmail.com` | Default ak nie je nastavené |

## Deploy

```bash
# raz na lokálnom stroji
supabase login

# v repo root (~/Projects/euphoria-web)
supabase link --project-ref szuarwlwkbcqfigqdaby

# deploy
supabase functions deploy send-reservation-email --project-ref szuarwlwkbcqfigqdaby
```

## Resend doména verify (BLOCKER)

Predtým ako zapneme produkčné emaily musíme verifikovať doménu **euphoria-nightclub.sk** (alebo whatever finálnu doménu Zoli zvolí) v Resend.

### Postup:

1. **Resend Dashboard** → Domains → **Add Domain** → zadať `euphoria-nightclub.sk`
2. Resend vyhodí cca 4 DNS records:
   - 1× MX (Resend's mail server)
   - 1× TXT (SPF — `v=spf1 include:amazonses.com ~all`)
   - 2× CNAME (DKIM keys — `resend._domainkey` a `resend2._domainkey`)
   - 1× TXT (DMARC — `_dmarc`)
3. Pridať tieto records do Cloudflare DNS zone `ed427d22167294b95ee5235ac81dd105` (zone Pending → after Active 24 nameserver switch)
4. Resend → Domains → Verify → status musí byť **Verified** (typicky 5–30 min)

### Status (8.5.2026):

- 🟡 **Cloudflare zone Pending** — Active 24 (registrátor) ešte nepustil nameserver switch
- 🟡 **Resend domain not added** — čaká na CF zone Active
- 🟡 **Resend API key** — Richard musí vygenerovať a vložiť do Supabase Secrets

## Test

```bash
# v Supabase dashboard → Edge Functions → send-reservation-email → Logs
# alebo curl:
curl -X POST 'https://szuarwlwkbcqfigqdaby.supabase.co/functions/v1/send-reservation-email' \
  -H 'Authorization: Bearer <SUPABASE_ANON_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "customer_name": "Test Tester",
    "customer_email": "test@example.com",
    "customer_phone": "+421900000000",
    "date": "2026-05-09",
    "time_slot": "22:00:00 – 01:00:00",
    "guests_count": 2,
    "room_name": "Privátna izba",
    "price": "200€",
    "note": "test"
  }'
```

## Schema referenca

Reservation INSERT má auto-status `confirmed` (viď `src/lib/reservations.ts` line 287).
Tabuľka `reservations` má unique index `(room_id, date, time_slot_id)` ktorý
zabraňuje double-booking — INSERT vyhodí 23505 error ak je slot obsadený.
