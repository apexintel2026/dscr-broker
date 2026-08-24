export const DEFAULT_GHL_BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/bookings/investor-strategy-call-gr4odyuguyt";

export const DEFAULT_GHL_FORM_URL =
  "https://api.leadconnectorhq.com/widget/form/F8FDVqy3kaUeK4M4KKYZ";

export const site = {
  name: "dscr.broker",
  tagline: "Qualify the deal. Book the call.",
  navSubtitle: "The investor loan desk.",
  description:
    "DSCR and business-purpose investor loans, brokered — not funded in-house. Qualify the deal, then book a 30-minute strategy call.",
  url: "https://dscr.broker",
  email: "desk@dscr.broker",
  phoneDisplay: "619-618-1419",
  phoneHref: "+16196181419",
  bookingMinutes: 30,
  bookingWidgetUrl:
    process.env.NEXT_PUBLIC_GHL_BOOKING_URL || DEFAULT_GHL_BOOKING_URL,
  formWidgetUrl: process.env.NEXT_PUBLIC_GHL_FORM_URL || DEFAULT_GHL_FORM_URL,
  /** CA DRE identity. Footer, FAQ, and terms share this string. */
  legalEntity:
    "GI Realty LLC, a California Real Estate Broker — CA DRE Lic# 01311868",
  equalHousingOpportunity: "Equal Housing Opportunity",
} as const;

export const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/resources", label: "Resources" },
  { href: "/str", label: "STR" },
  { href: "/about", label: "About" },
] as const;

export const resourceLinks = [
  {
    href: "/resources/what-is-dscr",
    title: "What is DSCR?",
    summary:
      "Lender DSCR is rent ÷ PITIA. How the ratio is used, what it is not, and how it differs from investor cash flow.",
    related: [
      "/resources/dscr-vs-conventional",
      "/resources/requirements",
      "/resources/short-term-rentals",
    ],
  },
  {
    href: "/resources/dscr-vs-conventional",
    title: "DSCR vs. conventional",
    summary:
      "When the asset carries the file, when conventional or bank-statement still fits, and what changes on occupancy and income.",
    related: [
      "/resources/what-is-dscr",
      "/resources/requirements",
      "/resources/faq",
    ],
  },
  {
    href: "/resources/requirements",
    title: "Typical requirements",
    summary:
      "Occupancy, entity, reserves, property types, credit and experience — a working list, not a program matrix.",
    related: [
      "/resources/what-is-dscr",
      "/resources/llc-entity",
      "/resources/short-term-rentals",
    ],
  },
  {
    href: "/resources/short-term-rentals",
    title: "Short-term rentals",
    summary:
      "Airbnb and mid-term rentals on a DSCR file: income method, local rules, and how to run the worksheet.",
    related: [
      "/resources/what-is-dscr",
      "/resources/requirements",
      "/resources/llc-entity",
    ],
  },
  {
    href: "/resources/llc-entity",
    title: "LLC and entity title",
    summary:
      "Closing in an LLC: vesting, operating agreements, EIN, and the mismatches that stall a file.",
    related: [
      "/resources/requirements",
      "/resources/what-is-dscr",
      "/resources/faq",
    ],
  },
  {
    href: "/resources/faq",
    title: "FAQ",
    summary:
      "Direct answers and common objections. Broker, not a lender. Business-purpose only.",
    related: [
      "/resources/what-is-dscr",
      "/resources/requirements",
      "/resources/dscr-vs-conventional",
    ],
  },
] as const;

export const howItWorksSteps = [
  {
    n: "01",
    title: "Send the deal",
    body: "Address, rents, PITIA, entity, and how you intend to hold it. Enough to desk — not a full credit package.",
  },
  {
    n: "02",
    title: "We desk the file",
    body: "We map the asset against business-purpose programs we can broker. Gaps get named. No theater.",
  },
  {
    n: "03",
    title: "Book the call",
    body: "Thirty minutes. Structure, capital-source fit, and the next document pull if the deal is worth running.",
  },
] as const;

export function pageTitle(page: string) {
  return `${page} | ${site.name}`;
}
