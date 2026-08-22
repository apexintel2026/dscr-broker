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
} as const;

export const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
] as const;

export const resourceLinks = [
  {
    href: "/resources/what-is-dscr",
    title: "What is DSCR?",
    summary:
      "How debt service coverage is used to desk an investor loan — income on the asset, not a W-2 story.",
  },
  {
    href: "/resources/dscr-vs-conventional",
    title: "DSCR vs. conventional",
    summary:
      "When cash flow on the property is the file, and when a conventional path still makes more sense.",
  },
  {
    href: "/resources/requirements",
    title: "Typical requirements",
    summary:
      "Entity, occupancy, reserves, and property types we see on business-purpose investor files.",
  },
  {
    href: "/resources/short-term-rentals",
    title: "Short-term rentals",
    summary:
      "How STR and mid-term rental deals are usually packaged for DSCR desks.",
  },
  {
    href: "/resources/llc-entity",
    title: "LLC and entity title",
    summary:
      "Closing in an entity, vesting, and what capital sources typically ask to see.",
  },
  {
    href: "/resources/faq",
    title: "FAQ",
    summary:
      "Direct answers on process, occupancy, and what a brokered investor loan actually is.",
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
