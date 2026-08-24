import { site } from "./site";

export const faqs = [
  {
    q: "Are you the lender?",
    a: "No. dscr.broker is a broker / investor loan desk. We package and shop business-purpose files to capital sources. We do not fund loans.",
  },
  {
    q: "Is this a commitment to lend?",
    a: "No. Nothing on this site is a commitment to lend, a credit decision, or a lock. Those sit with the capital source.",
  },
  {
    q: "Can I use this for a primary residence?",
    a: "No. This desk is business-purpose / non-owner-occupied only.",
  },
  {
    q: "What happens on the 30-minute call?",
    a: "We review the deal, the occupancy, and whether a program we can broker is even in range. If it is, we list the next documents.",
  },
  {
    q: "Does the calculator decide anything?",
    a: "No. It computes lender DSCR (rent ÷ PITIA) and an investor cash-flow view for orientation. It is not a credit decision, a lock, or a quote.",
  },
  {
    q: "Do you publish rates here?",
    a: "No. Pricing is deal-specific and set by the capital source, not by a page on this site.",
  },
  {
    q: "What is your license number?",
    a: site.legalEntity,
  },
  {
    q: "How is lender DSCR calculated?",
    a: "Lender DSCR is Gross Monthly Rent ÷ Monthly PITIA (or ITIA if interest-only). Investor cash flow is a separate labeled view and never mixed into that ratio. Run it on /calculator.",
  },
  {
    q: "Can the loan close in an LLC?",
    a: "Often yes on business-purpose investor files. Vesting, the operating agreement, EIN, and who can sign have to match. We are not your formation attorney.",
  },
  {
    q: "Do you work short-term rentals?",
    a: "Yes, as business-purpose / non-owner-occupied files. Income method and local / HOA rules are the first filters. The calculator STR toggle marks rent as a projection.",
  },
  {
    q: "Can this be a refinance or cash-out on a rental I already hold?",
    a: "Some capital sources will look at refinance or cash-out on non-owner-occupied, business-purpose property. Occupancy and use still have to be investment. Nothing here is a cash-out decision.",
  },
  {
    q: "What should I bring to the call?",
    a: "Address, unit mix, in-place or expected rent, estimated PITIA, entity vs. personal vest, and the hold plan. Enough to desk — not a full credit package.",
  },
] as const;

export const objections = [
  {
    q: "My DTI will not clear a conventional file.",
    a: "Then this is probably an asset conversation, not a personal DTI conversation. DSCR desks the property’s rent against PITIA. That does not mean every deal clears, and it is not a path for a primary residence.",
  },
  {
    q: "I do not want the file underwritten off my tax returns.",
    a: "Many business-purpose DSCR programs are built around the asset, not a 1040 recreation of the borrower. Capital sources still review identity, credit, and reserves. We do not promise a no-doc file.",
  },
  {
    q: "I buy and hold in an LLC.",
    a: "That is normal on this desk. The stall is a mismatch: property in the LLC, borrower talking as if it is personal, or an operating agreement that does not name the people who will sign.",
  },
  {
    q: "It is an Airbnb / short-term rental.",
    a: "Short-term can still be a business-purpose investor file. How income is documented and whether local or HOA rules allow the use are the first questions — not a nightly-rate fantasy.",
  },
  {
    q: "The calculator came in under 1.25.",
    a: "That is a worksheet, not a decline. Some programs look below 1.25; others do not. Higher rent, a lower price or payment, or a different hold plan are the levers. Book the call if you want the file mapped.",
  },
  {
    q: "Just tell me the rate.",
    a: "We do not publish rates here. Pricing is set by the capital source on a specific file. The calculator rate field is your estimate — not a quote from this desk.",
  },
  {
    q: "I am on my first rental.",
    a: "First deal vs. tenth deal changes overlays, not the occupancy rule. We will say if experience is likely to bind. A web form does not decide that.",
  },
] as const;

export const faqJsonLdItems = [...faqs, ...objections];
