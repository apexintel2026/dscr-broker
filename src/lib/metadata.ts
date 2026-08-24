import type { Metadata } from "next";
import { pageTitle, site } from "@/lib/site";

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
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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
