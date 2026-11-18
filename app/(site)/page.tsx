import { HomeComposer } from "@/components/HomeComposer";
import { readContact } from "@/lib/contactStore";
import { readHeroBand } from "@/lib/heroBandStore";
import { readHomeBlocks } from "@/lib/homeBlocksStore";
import { readStageSteps } from "@/lib/stageStepsStore";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [heroPanels, contact, steps, blocks] = await Promise.all([readHeroBand(), readContact(), readStageSteps(), readHomeBlocks()]);
  return <HomeComposer heroPanels={heroPanels} contact={contact} steps={steps} blocks={blocks} />;
}
