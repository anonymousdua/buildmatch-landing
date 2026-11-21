# BuildMatch landing page

One-page Next.js site: split hero, contractor/supplier picker, sign-up form, FAQ, and the free guide at `/guide`.
Sign-ups are saved to Supabase (`leads` table) on the server and get three emails through Resend
(now, +2 min, +4 min). If an email fails, the sign-up is still kept.

## Run locally

```
copy .env.example .env.local   # then fill in the values
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

| Name | Where it comes from |
|---|---|
| `SUPABASE_URL` | Supabase > Project Settings > API > Project URL |
| `SUPABASE_SECRET_KEY` | Supabase > Project Settings > API Keys > secret key (or legacy `service_role`). Server only. |
| `RESEND_API_KEY` | Resend > API Keys |
| `EMAIL_FROM` | Optional. Defaults to `BuildMatch <onboarding@resend.dev>` |
| `SITE_URL` | Your live site address, e.g. `https://buildmatch.vercel.app` (no trailing slash) |

## Files

- `lib/content.ts` – all page copy and FAQs, per role
- `lib/emails.ts` – the three emails
- `app/api/signup/route.ts` – saves the lead, then sends the emails
- `app/guide/page.tsx` – the free guide
- `supabase/leads.sql` – table, grants and row level security
