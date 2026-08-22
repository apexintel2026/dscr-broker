# dscr.broker

Marketing site for **dscr.broker** — a DSCR / business-purpose investor-loan **broker** (not a lender). The primary KPI is booking a 30-minute strategy call.

Domain later: `dscr.broker` on Vercel. This repo does not require the custom domain to resolve.

## Phase 2 (this build)

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
| `/how-it-works` | Process |
| `/resources` | Hub + articles |
| `/about` | Desk positioning |
| `/book` | HighLevel calendar embed slot (Phase 3) |
| `/contact` | Placeholder form → `/thank-you` |
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
