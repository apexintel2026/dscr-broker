import type { Metadata } from "next";
import { pageTitle, site } from "@/lib/site";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
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
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
