import { HomePage } from "@/components/HomePage";
import { readContact } from "@/lib/contactStore";
import { readHeroBand } from "@/lib/heroBandStore";
import { readStageSteps } from "@/lib/stageStepsStore";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [heroPanels, contact, steps] = await Promise.all([readHeroBand(), readContact(), readStageSteps()]);
  return <HomePage heroPanels={heroPanels} contact={contact} steps={steps} />;
}
