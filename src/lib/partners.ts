/**
 * Partner landings (realtor referral, later CPA / attorney if needed).
 * Copy + config, then a thin route that renders
 * `<PartnerLanding partner={requirePartner("slug")} />`.
 *
 * These pages are shareable landings — not SMS blast templates.
 * Do not invent referral fees. Conversion is a booked 30-min call
 * or Call me now. Do not treat the calculator as a lead form.
 */

export type Partner = {
  slug: string;
  href: string;
  name: string;
  footerLabel: string;
  hubLabel: string;
  calculatorHref: string;
  relatedResourceHref: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  why: {
    title: string;
    items: { title: string; body: string }[];
  };
  steps: {
    title: string;
    items: { n: string; title: string; body: string }[];
  };
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

export const partners = [
  {
    slug: "realtors",
    href: "/realtors",
    name: "For realtors with investor clients",
    footerLabel: "For realtors",
    hubLabel: "Realtors",
    calculatorHref: "/calculator",
    relatedResourceHref: "/resources",
    seo: {
      title: "For realtors with investor clients",
      description:
        "For realtors whose buyer or seller is an investor. Share the ungated DSCR calculator, then book a 30-minute strategy call. You stay the realtor. We desk the file. Broker, not a lender. Business-purpose / non-owner-occupied only.",
    },
    hero: {
      eyebrow: "For realtors",
      title: "Your buyer or seller is an investor. Run the deal. Send them to the desk.",
      description:
        "When the occupancy is non-owner-occupied and the use is business-purpose, we desk the file and broker it. You stay the realtor. We are not the lender. Nothing here is a pre-approval or a rate.",
    },
    why: {
      title: "Why send the investor here",
      items: [
        {
          title: "Ungated DSCR calculator",
          body: "They run the worksheet and get a shareable report URL. No form wall. Same formula as /calculator — rent ÷ PITIA. The calculator is orientation, not a lead form.",
        },
        {
          title: "A 30-minute strategy call",
          body: "That is the conversion. Book the hour or leave a number. We package and broker the file. We do not fund the loan or issue a credit decision.",
        },
        {
          title: "You stay the realtor",
          body: "We desk the investor file. You keep the listing or the buyer. We do not take the relationship.",
        },
      ],
    },
    steps: {
      title: "Send them. We desk. You keep the relationship.",
      items: [
        {
          n: "01",
          title: "Send the investor",
          body: "Point them at the calculator or have them book a 30-minute call. Address, rents, PITIA, entity, and how they intend to hold it.",
        },
        {
          n: "02",
          title: "We desk the file",
          body: "We map the asset against business-purpose programs we can broker. Gaps get named. No theater.",
        },
        {
          n: "03",
          title: "You keep the relationship",
          body: "They remain your client. We stay the desk. Structure and the next document pull if the deal is worth running.",
        },
      ],
    },
    calculator: {
      title: "Share the worksheet. Then book the hour.",
      body: "Same ungated calculator the investor can run. Share a report URL. When the deal is worth thirty minutes, book the call.",
      ctaLabel: "Open the calculator",
    },
    bookCta: {
      title: "Book a 30-minute strategy call",
      body: "Bring the address, the rent story, and the hold plan. We desk investor loans. We do not fund them. You stay the realtor.",
    },
  },
] as const satisfies readonly Partner[];

export type PartnerSlug = (typeof partners)[number]["slug"];

export function getPartner(slug: string): Partner | undefined {
  return partners.find((item) => item.slug === slug);
}

export function requirePartner(slug: string): Partner {
  const partner = getPartner(slug);
  if (!partner) {
    throw new Error(`Unknown partner: ${slug}`);
  }
  return partner;
}
