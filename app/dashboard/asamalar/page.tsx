import { StageStepsEditor } from "@/components/dashboard/StageStepsEditor";
import { readStageSteps } from "@/lib/stageStepsStore";

export const dynamic = "force-dynamic";

export default async function StageStepsPage() {
  const steps = await readStageSteps();
  return <StageStepsEditor initialSteps={steps} />;
}
