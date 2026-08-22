# dscr.broker

Marketing site for **dscr.broker** — a DSCR / business-purpose investor-loan **broker** (not a lender). The primary KPI is booking a 30-minute strategy call.

Domain later: `dscr.broker` on Vercel. This repo does not require the custom domain to resolve.

## Phase 1 (this build)

Shipped:

- Next.js 15 App Router + TypeScript + Tailwind CSS
- Dark-mode-first design system and persistent header CTA (`Book a 30-min call` → `/book`)
- All public routes as styled pages (calculator is a layout shell)
- SEO metadata + Open Graph on the root layout and key pages
- Footer compliance placeholders (NMLS TBD, Equal Housing, broker-not-lender)

Out of scope until later phases:

- DSCR math
- HighLevel webhook / live calendar credentials
- PDF reports
- NMLS number
- Analytics pixels

## Local run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Routes

| Path | Notes |
| --- | --- |
| `/` | Hero, calculator teaser, 3-step process, book CTA |
| `/calculator` | Input shell + “Coming in Phase 2” |
| `/calculator/report/[id]` | Report placeholder |
| `/how-it-works` | Process |
| `/resources` | Hub |
| `/resources/what-is-dscr` | Article |
| `/resources/dscr-vs-conventional` | Article |
| `/resources/requirements` | Article |
| `/resources/short-term-rentals` | Article |
| `/resources/llc-entity` | Article |
| `/resources/faq` | Article |
| `/about` | Desk positioning |
| `/book` | HighLevel calendar embed slot |
| `/contact` | Placeholder form → `/thank-you` |
| `/thank-you` | Confirmation |
| `/privacy` | Placeholder |
| `/terms` | Placeholder |

## Copy rules

Do not say we pre-approve, guarantee qualification, “get approved,” or “see your rate.” Do not imply dscr.broker is the lender or capital source.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Geist / Geist Mono via `next/font`

Vercel: import the repo and deploy as a standard Next.js app. Set the production domain to `dscr.broker` when DNS is ready.
