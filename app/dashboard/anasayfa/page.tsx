import { PageBuilder } from "@/components/dashboard/PageBuilder";
import { readHomeBlocks } from "@/lib/homeBlocksStore";

export const dynamic = "force-dynamic";

export default async function HomeBuilderPage() {
  const blocks = await readHomeBlocks();
  return <PageBuilder initial={blocks} />;
}
