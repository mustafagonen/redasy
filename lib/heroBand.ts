export type HeroCopy = { title: string; text: string };

export type HeroPanelId = "kirma" | "atasman" | "arac" | "mobil";

export type HeroPanelContent = {
  id: HeroPanelId;
  image: string;
  tr: HeroCopy;
  en: HeroCopy;
  ar: HeroCopy;
};

export const heroPanelIds: HeroPanelId[] = ["kirma", "atasman", "arac", "mobil"];

export function isHeroPanelId(value: string): value is HeroPanelId {
  return (heroPanelIds as string[]).includes(value);
}

export const defaultHeroPanels: HeroPanelContent[] = [
  {
    id: "kirma",
    image: "/images/home/kirma-color.jpg",
    tr: { title: "Mobil Kırma & Eleme Sistemleri", text: "Agrega ve madencilik için yüksek verimli çözümler." },
    en: { title: "Mobile Crushing & Screening Systems", text: "High-efficiency solutions for aggregates and mining." },
    ar: { title: "أنظمة التكسير والغربلة المتنقلة", text: "حلول عالية الكفاءة للركام والتعدين." },
  },
  {
    id: "atasman",
    image: "/images/home/atasman-color.jpg",
    tr: { title: "İş Makinesi Ataşmanları", text: "Kırma, kesme ve performans artıran ataşmanlar." },
    en: { title: "Construction Equipment Attachments", text: "Attachments for crushing, cutting, and higher performance." },
    ar: { title: "ملحقات معدات البناء", text: "ملحقات للتكسير والقطع ورفع الأداء." },
  },
  {
    id: "arac",
    image: "/images/home/arac-color.jpg",
    tr: { title: "Araç Üstü Ekipmanlar", text: "Vidanjör, tanker ve özel çevre temizlik araçları." },
    en: { title: "Truck-Mounted Equipment", text: "Vacuum trucks, tankers, and specialized environmental cleaning vehicles." },
    ar: { title: "تجهيزات محمولة على المركبات", text: "شاحنات شفط وصهاريج ومركبات تنظيف بيئي خاصة." },
  },
  {
    id: "mobil",
    image: "/images/home/mobil-color.jpg",
    tr: { title: "Mobil Çözümler", text: "Mobil kan alma aracı, sağlık klinikleri ve donörler." },
    en: { title: "Mobile Solutions", text: "Mobile blood-collection vehicle, health clinics, and donors." },
    ar: { title: "حلول متنقلة", text: "مركبة جمع دم متنقلة وعيادات صحية ومتبرعون." },
  },
];

function imageOf(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const clean = value.split("?")[0];
  if (!clean.startsWith("/images/home/") || clean.includes("..")) return fallback;
  return clean;
}

function copyOf(value: unknown, fallback: HeroCopy): HeroCopy {
  if (!value || typeof value !== "object") return { ...fallback };
  const record = value as Partial<HeroCopy>;
  return {
    title: typeof record.title === "string" ? record.title : fallback.title,
    text: typeof record.text === "string" ? record.text : fallback.text,
  };
}

export function normalizeHeroPanels(value: unknown): HeroPanelContent[] {
  const raw = Array.isArray(value) ? value : [];
  return defaultHeroPanels.map((base) => {
    const found = raw.find((item) => item && typeof item === "object" && (item as { id?: string }).id === base.id);
    const record = (found ?? {}) as Partial<HeroPanelContent>;
    return {
      id: base.id,
      image: imageOf(record.image, base.image),
      tr: copyOf(record.tr, base.tr),
      en: copyOf(record.en, base.en),
      ar: copyOf(record.ar, base.ar),
    };
  });
}

export function turkishMissing(panels: HeroPanelContent[]) {
  return panels.some((panel) => !panel.tr.title.trim() || !panel.tr.text.trim());
}
