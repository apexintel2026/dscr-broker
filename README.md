# dscr.broker

Marketing site for **dscr.broker** — a DSCR / business-purpose investor-loan **broker** (not a lender). The primary KPI is booking a 30-minute strategy call.

Domain later: `dscr.broker` on Vercel. This repo does not require the custom domain to resolve.

## Phase 4 (this build)

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
- Optional lead form → `POST /api/leads` → `HIGHLEVEL_WEBHOOK_URL` if set

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

Copy `.env.example` to `.env.local` if you want a webhook.

| Variable | Required | Notes |
| --- | --- | --- |
| `HIGHLEVEL_WEBHOOK_URL` | No | If unset, `/api/leads` logs the flattened payload and still succeeds. Phase 5 wires the live URL. |
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
| `/` | Hero, calculator teaser, 3-step process, book CTA |
| `/calculator` | Live ungated worksheet |
| `/calculator/report/[id]` | Shareable deal score |
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
- Vitest for `src/lib/dscr.ts`

Vercel: import the repo and deploy as a standard Next.js app. Set the production domain to `dscr.broker` when DNS is ready.
