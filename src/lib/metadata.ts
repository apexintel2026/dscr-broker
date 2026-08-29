import type { Metadata } from "next";
import { pageTitle, site } from "@/lib/site";

/** Default 1200×630 share card. Committed at /public/og.png. */
export const defaultShareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
} as const;

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${site.url}${path}`;
  const isHome = title === site.name;
  const fullTitle = isHome ? `${site.name} — ${site.tagline}` : pageTitle(title);

  return {
    title: isHome ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      images: [defaultShareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultShareImage.url],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    name: site.name,
    legalName: site.companyName,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: `+1-${site.phoneDisplay}`,
    image: `${site.url}${defaultShareImage.url}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1741 Eastlake Pkwy, Ste 102-1101",
      addressLocality: "Chula Vista",
      addressRegion: "CA",
      postalCode: "91915",
      addressCountry: "US",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "CA DRE License",
      value: "01311868",
    },
    disambiguatingDescription:
      "Broker, not a lender. Business-purpose only.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function articleJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": ["Article", "WebPage"],
    headline: title,
    name: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function faqPageJsonLd(
  faqs: readonly { q: string; a: string }[],
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "FAQ",
    url: `${site.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
