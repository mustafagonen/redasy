export type HeroCopy = { title: string; text: string };

export type HeroPanelId = "kirma" | "atasman" | "arac" | "mobil";

export type HeroPanelContent = {
  id: HeroPanelId;
  tr: HeroCopy;
  en: HeroCopy;
  ar: HeroCopy;
};

export const heroSlides: { id: HeroPanelId; src: string; alt: string }[] = [
  { id: "kirma", src: "/images/home/kirma.jpg", alt: "Taş ocağında mobil kırma ve eleme tesisi" },
  { id: "atasman", src: "/images/home/atasman.jpg?v=5", alt: "Kovası önde bir ekskavatör" },
  { id: "arac", src: "/images/home/arac.jpg", alt: "Depoda tankerli vidanjör aracı" },
  { id: "mobil", src: "/images/home/mobil.jpg", alt: "Kapısı açık, üzerinde kalp işareti olan mobil sağlık aracı" },
];

export const defaultHeroPanels: HeroPanelContent[] = [
  {
    id: "kirma",
    tr: { title: "Mobil Kırma & Eleme Sistemleri", text: "Agrega ve madencilik için yüksek verimli çözümler." },
    en: { title: "Mobile Crushing & Screening Systems", text: "High-efficiency solutions for aggregates and mining." },
    ar: { title: "أنظمة التكسير والغربلة المتنقلة", text: "حلول عالية الكفاءة للركام والتعدين." },
  },
  {
    id: "atasman",
    tr: { title: "İş Makinesi Ataşmanları", text: "Kırma, kesme ve performans artıran ataşmanlar." },
    en: { title: "Construction Equipment Attachments", text: "Attachments for crushing, cutting, and higher performance." },
    ar: { title: "ملحقات معدات البناء", text: "ملحقات للتكسير والقطع ورفع الأداء." },
  },
  {
    id: "arac",
    tr: { title: "Araç Üstü Ekipmanlar", text: "Vidanjör, tanker ve özel çevre temizlik araçları." },
    en: { title: "Truck-Mounted Equipment", text: "Vacuum trucks, tankers, and specialized environmental cleaning vehicles." },
    ar: { title: "تجهيزات محمولة على المركبات", text: "شاحنات شفط وصهاريج ومركبات تنظيف بيئي خاصة." },
  },
  {
    id: "mobil",
    tr: { title: "Mobil Çözümler", text: "Mobil kan alma aracı, sağlık klinikleri ve donörler." },
    en: { title: "Mobile Solutions", text: "Mobile blood-collection vehicle, health clinics, and donors." },
    ar: { title: "حلول متنقلة", text: "مركبة جمع دم متنقلة وعيادات صحية ومتبرعون." },
  },
];

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
      tr: copyOf(record.tr, base.tr),
      en: copyOf(record.en, base.en),
      ar: copyOf(record.ar, base.ar),
    };
  });
}

export function turkishMissing(panels: HeroPanelContent[]) {
  return panels.some((panel) => !panel.tr.title.trim() || !panel.tr.text.trim());
}
