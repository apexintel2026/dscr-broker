import { site } from "@/lib/site";

/**
 * Printable realtor send-sheet. Copy lives here so /realtors and
 * /realtors/when-to-send stay in lockstep. Not a referral-fee pitch.
 */
export const realtorOnePager = {
  href: "/realtors/when-to-send",
  ctaLabel: "Print this one-pager",
  seo: {
    title: "When to send dscr.broker the file",
    description:
      "Printable one-pager for realtors. When to send an investor file to the dscr.broker desk, what we need to look, and how to run the deal or book 30 minutes. We desk DSCR. We do not fund. Broker, not a lender.",
  },
  title: "When to send dscr.broker the file",
  lede: "Investor buyer or seller. Non-owner-occupied, business-purpose only. We desk DSCR. We do not fund. Not a credit decision.",
  when: {
    title: "Send it when",
    items: [
      "1–4 unit (or STR) investment",
      "They have an address or a contract",
      "They want rent to carry the debt",
    ],
  },
  need: {
    title: "What we need to look",
    items: [
      "Purchase price or value",
      "Monthly rent (or STR actuals)",
      "Occupancy — LTR vs STR",
      "Entity, if any",
      "Target close",
    ],
  },
  run: {
    label: "Run the deal",
    href: "/calculator",
    url: `${site.url}/calculator`,
  },
  book: {
    label: "Book 30 minutes",
    href: "/book",
    url: `${site.url}/book`,
  },
  textPrefix: "Or text",
  closer: "You stay the realtor. We stay the desk.",
  brokerLine:
    "Broker, not a lender. Business-purpose / non-owner-occupied only.",
} as const;
