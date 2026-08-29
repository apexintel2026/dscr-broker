import { PartnerLanding } from "@/components/PartnerLanding";
import { requirePartner } from "@/lib/partners";
import { buildMetadata } from "@/lib/metadata";

const partner = requirePartner("realtors");

export const metadata = buildMetadata({
  title: partner.seo.title,
  description: partner.seo.description,
  path: partner.href,
  type: "article",
});

export default function RealtorsPage() {
  return <PartnerLanding partner={partner} />;
}
