export type StageCopy = { title: string; text: string };

export type StageStep = {
  id: string;
  tr: StageCopy;
  en: StageCopy;
  ar: StageCopy;
};

export const defaultStageSteps: StageStep[] = [];

function copyOf(value: unknown): StageCopy {
  const record = value && typeof value === "object" ? (value as Partial<StageCopy>) : {};
  return {
    title: typeof record.title === "string" ? record.title : "",
    text: typeof record.text === "string" ? record.text : "",
  };
}

export function normalizeStageSteps(value: unknown): StageStep[] {
  const raw = Array.isArray(value) ? value : [];
  const steps = raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Partial<StageStep>;
      const id = typeof record.id === "string" ? record.id.trim() : "";
      if (!id || id.length > 80) return null;
      return { id, tr: copyOf(record.tr), en: copyOf(record.en), ar: copyOf(record.ar) };
    })
    .filter((item): item is StageStep => Boolean(item))
    .slice(0, 6);
  return steps;
}

export function stageTurkishMissing(steps: StageStep[]) {
  return steps.length === 0 || steps.some((step) => !step.tr.title.trim() || !step.tr.text.trim());
}
