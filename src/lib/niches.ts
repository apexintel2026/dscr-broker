import { calculatorHref } from "@/lib/calculator-query";
import type { OccupancyType } from "@/lib/dscr";

/**
 * Phase 6 niches. Add Bridge or Portfolio as another entry + a thin route
 * that renders `<NicheLanding niche={requireNiche("slug")} />`.
 * Do not fork calculator math.
 */
export type Niche = {
  slug: string;
  href: string;
  name: string;
  navLabel: string;
  footerLabel: string;
  occupancyType: OccupancyType;
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
  incomeVsLtr: {
    title: string;
    intro: string;
    columns: { title: string; body: string }[];
    note: string;
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

export const niches = [
  {
    slug: "str",
    href: "/str",
    name: "Short-term rental / Airbnb",
    navLabel: "STR",
    footerLabel: "STR / Airbnb",
    occupancyType: "str",
    relatedResourceHref: "/resources/short-term-rentals",
    seo: {
      title: "DSCR for short-term rentals",
      description:
        "Business-purpose DSCR for Airbnb and short-term rentals. Broker, not a lender. Income method is program-dependent. Book a 30-minute strategy call.",
    },
    hero: {
      eyebrow: "Short-term rental",
      title: "DSCR for Airbnb and short-term rentals.",
      description:
        "Non-owner-occupied, business-purpose files only. We desk the asset and broker it. We do not fund the loan. STR income method is program-dependent — in-place actuals vs. a projection. Nothing here is a pre-approval or a rate.",
    },
    why: {
      title: "Why DSCR shows up on STR files",
      items: [
        {
          title: "The asset carries the file",
          body: "Nightly rent is not a W-2 story. DSCR desks Gross Monthly Rent against PITIA. Personal DTI is usually the wrong conversation for this occupancy.",
        },
        {
          title: "Hold plan still has to be investment",
          body: "If you stay in the property, occupancy is the fight. This desk does not desk primary residences or consumer vacation-home loans.",
        },
        {
          title: "Local rules can kill the rent story",
          body: "HOA bans, night caps, and municipal licenses are first-order. If the use is not allowed, coverage on a worksheet does not matter.",
        },
      ],
    },
    incomeVsLtr: {
      title: "How STR income is treated vs. long-term",
      intro: "Same lender DSCR formula. Different rent story. The capital source sets the income method — not this website.",
      columns: [
        {
          title: "Long-term (LTR)",
          body: "In-place lease or market rent you can defend. The calculator LTR toggle treats that number as in-place, not a projection.",
        },
        {
          title: "Short-term (STR)",
          body: "Trailing channel actuals, market comps, or a hybrid — whichever the program will take. Many haircut gross. Some want 12 months of in-place history. The STR toggle marks rent as a projection. You still type the monthly number. We do not scrape Airbnb or VRBO.",
        },
      ],
      note: "Do not invent a nightly rate to clear 1.25. Say which hold you actually intend after close. Mid-term (30+ day) can be a different overlay than nightly.",
    },
    calculator: {
      title: "Run the STR worksheet before you book the hour.",
      body: "Opens occupancy on STR. Lender DSCR is still rent ÷ PITIA (or ITIA if interest-only). Vacancy, maintenance, and PM stay in the investor view. Orientation only — not a credit decision.",
      ctaLabel: "Open calculator (STR occupancy)",
    },
    bookCta: {
      title: "Book a 30-minute STR strategy call",
      body: "Bring the address, the channel history you have, estimated PITIA, entity vs. personal vest, and whether you will keep STR or convert to long-term. We desk investor loans. We do not fund them.",
    },
  },
] as const satisfies readonly Niche[];

export type NicheSlug = (typeof niches)[number]["slug"];

export function getNiche(slug: string): Niche | undefined {
  return niches.find((item) => item.slug === slug);
}

export function requireNiche(slug: string): Niche {
  const niche = getNiche(slug);
  if (!niche) {
    throw new Error(`Unknown niche: ${slug}`);
  }
  return niche;
}

export function calculatorHrefFor(niche: Niche): string {
  return calculatorHref(niche.occupancyType);
}
