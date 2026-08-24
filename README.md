# dscr.broker

Marketing site for **dscr.broker** — a DSCR / business-purpose investor-loan **broker** (not a lender). The primary KPI is booking a 30-minute strategy call.

Domain later: `dscr.broker` on Vercel. This repo does not require the custom domain to resolve.

## Phase 7 (this build)

Polish: accessibility, Core Web Vitals, error states, security headers. Not a rewrite.

- Skip link, `:focus-visible`, labeled calculator fields, keyboard mobile nav (Escape to close), heading order on key pages
- HighLevel booking/form iframes are `loading="lazy"` with titles and reserved height (no CLS from zero-height embeds)
- Calculator: zero rent still scores (weak); zero price stays on the worksheet with a clear message; invalid `/calculator/report/[id]` is a clean empty state
- `next.config.ts` security headers: CSP (`frame-src` includes `api.leadconnectorhq.com`), `X-Frame-Options: DENY`, `Referrer-Policy`, `nosniff`, `Permissions-Policy`
- Vercel Analytics page views only (`@vercel/analytics`). No GA4/Meta pixels — owner has not provided IDs
- Mint Book CTA; red Call me now → `/contact#form`

### Remaining owner items

| Item | Status |
| --- | --- |
| NMLS ID in footer / terms | TBD — do not invent |
| `dscr.broker` DNS → Vercel | Owner |
| Calculator lead capture (`NEXT_PUBLIC_CALCULATOR_LEAD_CAPTURE`) | Off. Turn on only with a live webhook |
| `HIGHLEVEL_WEBHOOK_URL` | Leave unset (Phase 5 paused) |
| GA4 / Meta pixels | Optional later, needs real IDs |
| Privacy / terms | Placeholders — counsel-reviewed copy still needed |

Do not change HighLevel widget URLs, `src/lib/dscr.ts` math, or invent an NMLS number.

## Phase 6

First niche landing: Short-term rental / Airbnb at `/str`.

Niches are **copy + config**, not one-off pages. Config lives in `src/lib/niches.ts`. The conversion layout is `src/components/NicheLanding.tsx` (hero, why DSCR, income vs LTR, calculator CTA, Book + Call me now). The live calculator formula is imported from `src/lib/dscr.ts` — do not fork it.

`/str` opens `/calculator?occupancy=str` so occupancy starts on STR. Same worksheet, same math.

### How to add a niche (Bridge, Portfolio, …)

1. Add an entry to `niches` in `src/lib/niches.ts`: `slug`, `href`, `name`, `occupancyType` (`ltr` | `str`), hero, why, income comparison, calculator CTA, `relatedResourceHref`, book CTA.
2. Add a thin route that matches `href`, for example `src/app/bridge/page.tsx`:

```tsx
import { NicheLanding } from "@/components/NicheLanding";
import { requireNiche } from "@/lib/niches";
import { buildMetadata } from "@/lib/metadata";

const niche = requireNiche("bridge");

export const metadata = buildMetadata({
  title: niche.seo.title,
  description: niche.seo.description,
  path: niche.href,
  type: "article",
});

export default function BridgeNichePage() {
  return <NicheLanding niche={niche} />;
}
```

3. Home, the resources hub, footer, and sitemap already iterate `niches`. Link the related resource article to the new `href` and, if needed, a calculator deep-link (`/calculator?occupancy=str` or omit for LTR).
4. Header: one short nav label is enough (`navLabel`). Do not add a full mega-menu.

Do not change HighLevel widget URLs, `dscr.ts` math, or invent an NMLS number.

## Phase 5 (paused)

Calculator → HighLevel speed-to-lead is **paused**. Calculator use is weaker intent than a booked 30-minute call.

- Leave `HIGHLEVEL_WEBHOOK_URL` unset. Do not wire the webhook.
- `POST /api/leads`, `src/lib/lead-payload.ts`, and `LeadCapture` stay in the repo for later.
- LeadCapture is **off by default**. It only renders when `NEXT_PUBLIC_CALCULATOR_LEAD_CAPTURE=true`. Production should keep this off until a webhook is actually configured.

## Phase 4

Knowledge / content layer. Same `/resources` hub and routes as Phase 1 — expanded in place into authority articles (not a second hub).

| Path | Topic |
| --- | --- |
| `/resources/what-is-dscr` | What is a DSCR loan / how lender DSCR is calculated |
| `/resources/dscr-vs-conventional` | DSCR vs conventional and bank-statement loans |
| `/resources/requirements` | Occupancy, entity, reserves, property types, credit/experience (no program matrix) |
| `/resources/short-term-rentals` | Airbnb / STR considerations |
| `/resources/llc-entity` | Entity / LLC borrowing |
| `/resources/faq` | FAQ plus common objections |

Calculator results surface 1–3 of those articles (STR article when occupancy is STR; what-is-dscr / requirements otherwise). FAQPage JSON-LD on `/resources/faq`. Article/WebPage JSON-LD on the long articles. Lender DSCR copy imports the formula from `src/lib/dscr.ts`.

## Phase 3

Conversion: live HighLevel booking and form.

### Booking

- Widget URL: `https://api.leadconnectorhq.com/widget/bookings/investor-strategy-call-gr4odyuguyt`
- Placement: `/book`
- Override with `NEXT_PUBLIC_GHL_BOOKING_URL` if the calendar slug changes
- HighLevel may redirect after book; we do not control that

### Form

- Form URL: `https://api.leadconnectorhq.com/widget/form/F8FDVqy3kaUeK4M4KKYZ`
- Primary placement: `/contact`
- Fallback on `/book` under the calendar: “Send the deal, we will reach out”
- Override with `NEXT_PUBLIC_GHL_FORM_URL`
- Local site-only contact form (route to `/thank-you`) is removed

## Phase 2

Live ungated single-property DSCR calculator.

- Lender DSCR = Gross Monthly Rent ÷ Monthly PITIA (or ITIA if interest-only)
- Investor cash flow is display-only and never mixed into lender DSCR
- Shareable `/calculator/report/[id]` (inputs encoded in the id; math is re-run)
- Lead capture (`LeadCapture` → `POST /api/leads`) is built but **off by default**. Phase 5 webhook is paused.

Math lives in `src/lib/dscr.ts` with no UI imports. Do not fork the formula in Content/Growth pages.

## Local run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local` only if you need local overrides. Do not set `HIGHLEVEL_WEBHOOK_URL` for Phase 5.

| Variable | Required | Notes |
| --- | --- | --- |
| `HIGHLEVEL_WEBHOOK_URL` | No | **Paused.** Leave unset. If unset, `/api/leads` logs the flattened payload and still succeeds. |
| `NEXT_PUBLIC_CALCULATOR_LEAD_CAPTURE` | No | Default off. Set to `true` to render calculator LeadCapture. Do not enable in production without a live webhook. |
| `NEXT_PUBLIC_SITE_URL` | No | Absolute origin for `report_url` in the payload. Falls back to `https://dscr.broker`. |
| `NEXT_PUBLIC_GHL_BOOKING_URL` | No | HighLevel booking iframe on `/book`. Defaults to the investor strategy-call widget. |
| `NEXT_PUBLIC_GHL_FORM_URL` | No | HighLevel form iframe on `/contact` and `/book`. Defaults to the live desk form. |

## Webhook payload (Phase 0 schema)

Flattened JSON, no arrays. `POST` to `HIGHLEVEL_WEBHOOK_URL`.

| Key | Notes |
| --- | --- |
| `first_name` | |
| `email` | Empty string if they used phone |
| `phone` | Empty string if they used email |
| `source` | Always `calculator` |
| `niche` | Always `core` |
| `occupancy_type` | `ltr` or `str` |
| `rent_is_projection` | `yes` on STR, `no` on LTR |
| `purchase_price` | |
| `down_payment` | Dollars |
| `down_payment_percent` | |
| `down_payment_mode` | `percent` or `amount` |
| `loan_amount` | |
| `ltv` | Fraction (0.75) or `""` |
| `monthly_gross_rent` | |
| `interest_rate_estimate` | User-entered. Not a quote. |
| `term_years` | |
| `interest_only` | `yes` / `no` |
| `taxes_monthly` | Normalized |
| `insurance_monthly` | |
| `hoa_monthly` | |
| `vacancy_percent` | Investor view only |
| `maintenance_percent` | Investor view only |
| `property_management_percent` | Investor view only |
| `monthly_pi` | 0 when IO |
| `monthly_interest` | |
| `monthly_debt_service` | P&I or I |
| `monthly_pitia` | PITIA or ITIA total |
| `debt_service_label` | `PITIA` or `ITIA` |
| `lender_dscr` | Raw ratio or `""` |
| `dscr_display` | Two-decimal band input |
| `dscr_band` | `strong` / `acceptable` / `weak` |
| `investor_cash_flow_monthly` | |
| `cash_on_cash_annual` | Fraction or `""` |
| `rent_needed_1_00` | |
| `rent_needed_1_25` | |
| `typical_ltv_max` | `0.75` illustration |
| `ltv_exceeds_typical` | `yes` / `no` |
| `binding_constraint` | `none` / `ratio` / `ltv` / `ratio_and_ltv` |
| `report_id` | |
| `report_url` | |

## Calculator math

- **PITIA** = Principal + Interest + monthly Taxes + monthly Insurance + monthly HOA
- **ITIA** (IO toggle, off by default) = Interest + T + I + HOA
- **Amortizing P&I** = standard US mortgage formula from loan amount, annual rate, term years
- **Loan amount** = price − down (`%` or `$`)
- **Bands** (guidance, not a credit decision): Strong ≥ 1.25, Acceptable 1.00–1.24, Weak < 1.00
- **Investor cash flow** = rent − PITIA/ITIA − optional vacancy/maint/PM (% of rent)

## Routes

| Path | Notes |
| --- | --- |
| `/` | Hero, calculator teaser, STR niche, 3-step process, book CTA |
| `/calculator` | Live ungated worksheet. `?occupancy=str` starts occupancy on STR |
| `/calculator/report/[id]` | Shareable deal score. Invalid id → clean empty state |
| `/str` | Phase 6 STR / Airbnb niche landing |
| `/how-it-works` | Process (not an education dump) |
| `/resources` | Hub + Phase 4 articles |
| `/resources/what-is-dscr` | What is DSCR |
| `/resources/dscr-vs-conventional` | DSCR vs conventional / bank-statement |
| `/resources/requirements` | Typical requirements |
| `/resources/short-term-rentals` | STR / Airbnb |
| `/resources/llc-entity` | LLC / entity title |
| `/resources/faq` | FAQ + common objections |
| `/about` | Desk positioning |
| `/book` | Live HighLevel 30-minute strategy-call calendar |
| `/contact` | Live HighLevel desk form |
| `/privacy` `/terms` | Placeholders |

## Copy rules

Do not say we pre-approve, guarantee qualification, “get approved,” or “see your rate.” Do not imply dscr.broker is the lender or capital source.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Geist / Geist Mono via `next/font`
- Vitest for calculator math, security headers, sitemap, and report decode
- `@vercel/analytics` (first-party page views; no extra ID)

Vercel: import the repo and deploy as a standard Next.js app. Set the production domain to `dscr.broker` when DNS is ready. After deploy, confirm `/book` and `/contact` iframes still load (CSP must keep `api.leadconnectorhq.com` in `frame-src`).
