import { RealtorOnePager } from "@/components/RealtorOnePager";
import { buildMetadata } from "@/lib/metadata";
import { realtorOnePager } from "@/lib/realtor-one-pager";

export const metadata = buildMetadata({
  title: realtorOnePager.seo.title,
  description: realtorOnePager.seo.description,
  path: realtorOnePager.href,
  type: "article",
});

export default function RealtorOnePagerPage() {
  return <RealtorOnePager />;
}
