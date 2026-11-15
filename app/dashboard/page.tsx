import { HeroBandEditor } from "@/components/dashboard/HeroBandEditor";
import { readHeroBand } from "@/lib/heroBandStore";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const panels = await readHeroBand();
  return <HeroBandEditor initialPanels={panels} />;
}
