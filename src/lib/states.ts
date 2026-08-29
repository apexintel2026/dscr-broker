/**
 * State landings (Texas, Florida first). Copy + config, then a thin route
 * that renders `<StateLanding state={requireState("slug")} />`.
 *
 * V1 property-state set is TX and FL. Clone another state by adding an
 * entry here and a matching `src/app/<slug>/page.tsx`. Do not add states
 * to the primary header nav. Do not invent program matrices, rates, or
 * a residential mortgage license in the property state.
 */

export type StateRelatedLink = {
  href: string;
  label: string;
};

export type StateSection = {
  heading: string;
  answer: string;
  body?: readonly string[];
};

export type StatePage = {
  slug: string;
  href: string;
  name: string;
  abbreviation: string;
  footerLabel: string;
  hubLabel: string;
  calculatorHref: string;
  relatedExtra?: readonly StateRelatedLink[];
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  sections: readonly StateSection[];
  calculator: {
    title: string;
    body: string;
    ctaLabel: string;
  };
  bookCta: {
    title: string;
    body: string;
  };
};

/** Shared graph so a cloned state still hits calculator, book, and desk notes. */
export const defaultStateRelatedLinks = [
  { href: "/calculator", label: "Calculator" },
  { href: "/book", label: "Book a 30-min call" },
  { href: "/resources/what-is-dscr", label: "What is DSCR?" },
  { href: "/resources/requirements", label: "Typical requirements" },
  { href: "/resources/llc-entity", label: "LLC and entity title" },
  { href: "/str", label: "DSCR for short-term rentals" },
  { href: "/realtors", label: "For realtors" },
] as const satisfies readonly StateRelatedLink[];

export function stateRelatedLinks(state: StatePage): StateRelatedLink[] {
  const merged = [...defaultStateRelatedLinks, ...(state.relatedExtra ?? [])];
  const seen = new Set<string>();
  return merged.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export const states = [
  {
    slug: "texas",
    href: "/texas",
    name: "DSCR loans for Texas investors",
    abbreviation: "TX",
    footerLabel: "Texas",
    hubLabel: "Texas",
    calculatorHref: "/calculator",
    seo: {
      title: "DSCR loans for Texas investors",
      description:
        "Business-purpose DSCR for Texas rental property. Broker, not a lender. The desk shops files in states where capital sources do not require a residential mortgage license. Book a 30-minute strategy call.",
    },
    hero: {
      eyebrow: "Texas",
      title: "DSCR loans for Texas investors.",
      description:
        "Non-owner-occupied, business-purpose files only. We desk the asset and broker it. We do not fund the loan. We do not claim a Texas mortgage license. Nothing here is a pre-approval or a rate.",
    },
    sections: [
      {
        heading: "What is a DSCR loan for Texas investors?",
        answer:
          "A DSCR loan for a Texas investor is a business-purpose, non-owner-occupied file that desks the property’s rental income against PITIA — not a W-2 or personal DTI story.",
        body: [
          "This desk packages and shops that file to capital sources. We are a broker, not a lender. See [what DSCR is](/resources/what-is-dscr) for the ratio. Typical overlays live on [requirements](/resources/requirements). Nothing on this page is a program matrix.",
        ],
      },
      {
        heading: "Are Texas DSCR loans business-purpose and non-owner-occupied only?",
        answer:
          "Yes. This desk only shops business-purpose / non-owner-occupied files. A Texas primary residence or a consumer vacation-home story does not belong here.",
        body: [
          "Occupancy is the first filter. If you stay in the property, say so on the [30-minute call](/book) — do not force the deal into a DSCR box.",
        ],
      },
      {
        heading: "Can a Texas DSCR loan close in an LLC or in a personal name?",
        answer:
          "Often either, at a high level. Many business-purpose investor files vest in an LLC; some capital sources will also look at an individual vest when the use is investment. This is not legal advice.",
        body: [
          "What stalls a file is a mismatch between title, the entity documents, and who is signing. Formation, operating agreement, EIN, and how title will read at close have to line up. See [LLC and entity title](/resources/llc-entity). We are not your formation attorney.",
        ],
      },
      {
        heading: "Can Texas Airbnb and short-term rentals use a DSCR loan?",
        answer:
          "Yes, when the property is non-owner-occupied and the use is business-purpose. A Texas short-term rental can still be an investor file.",
        body: [
          "The desk questions are how income is documented and whether local or HOA rules allow the use. The [STR landing](/str) and the [calculator](/calculator?occupancy=str) are the next step — occupancy starts on STR. We do not invent a nightly rate.",
        ],
      },
      {
        heading: "Does this desk hold a Texas mortgage license?",
        answer:
          "No. GI Realty LLC is a California real estate broker (CA DRE). This site does not claim a Texas residential mortgage license.",
        body: [
          "The desk shops business-purpose files in states where capital sources do not require a residential mortgage license, and Texas is one of those concentration states on public wholesale matrices. That is not a rate, an approval, or a promise that any Texas file will clear.",
        ],
      },
      {
        heading: "How do I check a Texas rental on the DSCR calculator?",
        answer:
          "Run the ungated [calculator](/calculator), then [book a 30-minute call](/book) if the deal is worth desk time. The calculator is orientation, not a lead form and not a credit decision.",
        body: [
          "Lender DSCR is still rent ÷ PITIA (or ITIA if interest-only). Realtors with a Texas investor client can start on [the realtor page](/realtors).",
        ],
      },
    ],
    calculator: {
      title: "Run the Texas worksheet before you book the hour.",
      body: "Same ungated calculator as /calculator. Lender DSCR is still rent ÷ PITIA (or ITIA if interest-only). Orientation only — not a credit decision and not a lead form.",
      ctaLabel: "Open the calculator",
    },
    bookCta: {
      title: "Book a 30-minute Texas strategy call",
      body: "Bring the address, the rent story, estimated PITIA, entity vs. personal vest, and the hold plan. We desk investor loans. We do not fund them.",
    },
  },
  {
    slug: "florida",
    href: "/florida",
    name: "DSCR loans for Florida investors",
    abbreviation: "FL",
    footerLabel: "Florida",
    hubLabel: "Florida",
    calculatorHref: "/calculator",
    seo: {
      title: "DSCR loans for Florida investors",
      description:
        "Business-purpose DSCR for Florida rental property. Many desks want LLC or entity vesting. Short-term rental is a real Florida use case. Broker, not a lender. Book a 30-minute strategy call.",
    },
    hero: {
      eyebrow: "Florida",
      title: "DSCR loans for Florida investors.",
      description:
        "Non-owner-occupied, business-purpose files only. Many DSCR desks want Florida property in an LLC or other entity. We desk the asset and broker it. We do not fund the loan. Nothing here is a pre-approval or a rate.",
    },
    sections: [
      {
        heading: "What is a DSCR loan for Florida investors?",
        answer:
          "A DSCR loan for a Florida investor is a business-purpose, non-owner-occupied file that desks the property’s rental income against PITIA — not a W-2 or personal DTI story.",
        body: [
          "This desk packages and shops that file to capital sources. We are a broker, not a lender. See [what DSCR is](/resources/what-is-dscr) for the ratio. Typical overlays live on [requirements](/resources/requirements). Nothing on this page is a program matrix.",
        ],
      },
      {
        heading: "Are Florida DSCR loans business-purpose and non-owner-occupied only?",
        answer:
          "Yes. This desk only shops business-purpose / non-owner-occupied files. A Florida primary residence or a consumer second-home story does not belong here.",
        body: [
          "Occupancy is the first filter. If you stay in the property, say so on the [30-minute call](/book) — do not force the deal into a DSCR box.",
        ],
      },
      {
        heading: "Do Florida DSCR loans need to close in an LLC?",
        answer:
          "Many DSCR desks and capital sources want the Florida property titled in an LLC or other entity. Treat that as a common overlay — not legal advice and not a promise from this site.",
        body: [
          "Individual vest can still come up; it is not the usual Florida conversation we see. Formation, operating agreement, EIN, and how title will read at close have to match. See [LLC and entity title](/resources/llc-entity). We are not your formation attorney.",
        ],
      },
      {
        heading: "Can Florida Airbnb and short-term rentals use a DSCR loan?",
        answer:
          "Yes. Short-term rental is a real Florida use case on business-purpose DSCR files — when occupancy is investment and the use is allowed.",
        body: [
          "Income method and local / HOA rules still come first. Start on the [STR landing](/str) or open the [calculator with STR occupancy](/calculator?occupancy=str). We do not scrape Airbnb or invent a nightly rate.",
        ],
      },
      {
        heading: "Does this desk hold a Florida mortgage license?",
        answer:
          "No. GI Realty LLC is a California real estate broker (CA DRE). This site does not claim a Florida residential mortgage license.",
        body: [
          "The desk shops business-purpose files in states where capital sources do not require a residential mortgage license. Florida is in the current property-state set we desk. That is not a rate, an approval, or a promise that any Florida file will clear.",
        ],
      },
      {
        heading: "How do I check a Florida rental on the DSCR calculator?",
        answer:
          "Run the ungated [calculator](/calculator), then [book a 30-minute call](/book) if the deal is worth desk time. The calculator is orientation, not a lead form and not a credit decision.",
        body: [
          "Lender DSCR is still rent ÷ PITIA (or ITIA if interest-only). Realtors with a Florida investor client can start on [the realtor page](/realtors).",
        ],
      },
    ],
    calculator: {
      title: "Run the Florida worksheet before you book the hour.",
      body: "Same ungated calculator as /calculator. Lender DSCR is still rent ÷ PITIA (or ITIA if interest-only). Orientation only — not a credit decision and not a lead form.",
      ctaLabel: "Open the calculator",
    },
    bookCta: {
      title: "Book a 30-minute Florida strategy call",
      body: "Bring the address, the rent story, estimated PITIA, the LLC or entity vest, and the hold plan. We desk investor loans. We do not fund them.",
    },
  },
] as const satisfies readonly StatePage[];

export type StateSlug = (typeof states)[number]["slug"];

export function getState(slug: string): StatePage | undefined {
  return states.find((item) => item.slug === slug);
}

export function requireState(slug: string): StatePage {
  const state = getState(slug);
  if (!state) {
    throw new Error(`Unknown state: ${slug}`);
  }
  return state;
}
