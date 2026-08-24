import { NicheLanding } from "@/components/NicheLanding";
import { requireNiche } from "@/lib/niches";
import { buildMetadata } from "@/lib/metadata";

const niche = requireNiche("str");

export const metadata = buildMetadata({
  title: niche.seo.title,
  description: niche.seo.description,
  path: niche.href,
  type: "article",
});

export default function StrNichePage() {
  return <NicheLanding niche={niche} />;
}
