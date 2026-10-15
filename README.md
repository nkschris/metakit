# Metakit

URL metadata / link-preview **API** for vibe coders and builders.

North star: one-time **Stripe credit packs** (not subscriptions-first). Call `GET`/`POST /api/v1/meta` with a URL → JSON `{ url, title, description, ogImage, favicon, siteName, statusCode, fetchedAt }`.

## What's included

- Landing page: hero, what it does, curl + JS samples, credit packs, newsletter stub
- `/docs` — API reference
- `/pricing` — $9 / $29 / $79 packs + Stripe button placeholder
- `/signup` — dashboard stub with localStorage / demo API key
- Working `/api/v1/meta` (server-side fetch, HTML/OG parse, 5s timeout, basic SSRF block)
- SEO: meta tags, `robots.txt`, `sitemap.xml`, `public/llms.txt`
- Newsletter UI with `TODO(Resend)` (not wired)

## Run locally

```bash
cd /workspace/metakit   # or your clone path
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

### Quick API test

```bash
curl -s "http://localhost:3000/api/v1/meta?url=https://example.com" \
  -H "x-api-key: mk_live_demo_metakit" | jq .
```

Missing key → `401` JSON.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Add env vars (optional):
   - `NEXT_PUBLIC_SITE_URL` — production URL (e.g. `https://metakit.dev` or your `.vercel.app`)
   - `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` — Stripe Payment Link URL
5. Deploy

## Where to paste the Stripe payment link

Either:

- **Env:** set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...` in `.env.local` / Vercel, or
- **Config:** edit `stripePaymentLink` in [`src/config.ts`](src/config.ts) (look for the TODO comment)

Until set, pricing CTAs fall back to `mailto:hello@metakit.dev`.

## How the demo API key works

- Shared demo key: **`mk_live_demo_metakit`** (also in `siteConfig.demoApiKey`)
- Send it as header: `x-api-key: mk_live_demo_metakit`
- `/signup` may show a generated `mk_live_demo_…` placeholder in localStorage for UI polish — **the API only accepts the shared demo key** in this MVP
- No real auth, billing ledger, or per-user keys yet

## Newsletter (Resend)

UI is in [`src/components/NewsletterForm.tsx`](src/components/NewsletterForm.tsx). It does **not** send email yet.

**TODO:** add an API route and call [Resend](https://resend.com) — search for `TODO(Resend)` in that file.

## Pages

| Path | Purpose |
|------|---------|
| `/` | Landing, samples, packs, newsletter |
| `/docs` | API reference |
| `/pricing` | Credit packs + Stripe / mailto CTA |
| `/signup` | Dashboard stub + API key display |
| `/api/v1/meta` | Metadata fetch API |
| `/llms.txt` | Machine-readable site summary |

## Config

See [`src/config.ts`](src/config.ts): `siteName`/`name`, `url`, `stripePaymentLink`, `creditPacks`, `demoApiKey`.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript — same shape as Buildstack for Vercel deploy.

## Auth later (Chris)

For a live checkout path, the only required external auth / setup for now is **Stripe** (create Payment Link → paste into env/config). Resend and real API-key auth can wait.
