import { StateLanding } from "@/components/StateLanding";
import { requireState } from "@/lib/states";
import { buildMetadata } from "@/lib/metadata";

const state = requireState("florida");

export const metadata = buildMetadata({
  title: state.seo.title,
  description: state.seo.description,
  path: state.href,
  type: "article",
});

export default function FloridaPage() {
  return <StateLanding state={state} />;
}
