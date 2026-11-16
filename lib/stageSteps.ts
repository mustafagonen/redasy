export type StageCopy = { title: string; text: string };

export type StageStep = {
  id: string;
  tr: StageCopy;
  en: StageCopy;
  ar: StageCopy;
};

export const defaultStageSteps: StageStep[] = [
  {
    id: "muhendislik",
    tr: { title: "Üstün Mühendislik", text: "Güçlü Ar-Ge ve mühendislik kadromuzla her türlü ihtiyaca çözüm sunarız..." },
    en: { title: "Superior Engineering", text: "Our strong R&D and engineering team delivers a solution for every need..." },
    ar: { title: "هندسة متفوقة", text: "نقدم حلاً لكل احتياج بفضل فريق البحث والتطوير والهندسة القوي..." },
  },
  {
    id: "kalite",
    tr: { title: "Yüksek Kalite & Güven", text: "Uluslararası standartlarda üretilen kaliteli ürünlerimizle dünya çapında..." },
    en: { title: "High Quality & Trust", text: "Quality products manufactured to international standards, worldwide..." },
    ar: { title: "جودة عالية وثقة", text: "منتجات عالية الجودة مصنّعة وفق المعايير الدولية حول العالم..." },
  },
  {
    id: "erisim",
    tr: { title: "Global Erişim", text: "Dünya çapındaki imalat ağımız ve uluslararası konnektörlerimiz..." },
    en: { title: "Global Reach", text: "Our worldwide manufacturing network and international connectors..." },
    ar: { title: "وصول عالمي", text: "شبكة التصنيع العالمية وموصلاتنا الدولية..." },
  },
];

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
  return steps.length ? steps : defaultStageSteps.map((step) => ({ ...step, tr: { ...step.tr }, en: { ...step.en }, ar: { ...step.ar } }));
}

export function stageTurkishMissing(steps: StageStep[]) {
  return steps.length === 0 || steps.some((step) => !step.tr.title.trim() || !step.tr.text.trim());
}
