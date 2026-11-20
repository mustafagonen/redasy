import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { normalizeStageSteps, type StageStep } from "@/lib/stageSteps";

export async function readStageSteps(): Promise<StageStep[]> {
  const data = await readSiteDoc("stageSteps");
  return normalizeStageSteps(data?.steps);
}

export async function writeStageSteps(value: unknown) {
  const steps = normalizeStageSteps(value);
  const firebase = await saveSiteDoc("stageSteps", { steps });
  return { steps, firebase };
}
