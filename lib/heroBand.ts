import { cleanHref } from "@/lib/nav";

export type HeroCopy = { title: string; text: string };

export type HeroPanelId = "kirma" | "atasman" | "arac" | "mobil";

export type HeroPanelContent = {
  id: HeroPanelId;
  image: string;
  href: string;
  tr: HeroCopy;
  en: HeroCopy;
  ar: HeroCopy;
};

export const heroPanelIds: HeroPanelId[] = ["kirma", "atasman", "arac", "mobil"];

export function isHeroPanelId(value: string): value is HeroPanelId {
  return (heroPanelIds as string[]).includes(value);
}

const blankCopy = (): HeroCopy => ({ title: "", text: "" });

export const defaultHeroPanels: HeroPanelContent[] = [
  { id: "kirma", image: "/images/home/panels/kirma-1795010691119.jpg", href: "/urunler/kirma-eleme-yikama", tr: blankCopy(), en: blankCopy(), ar: blankCopy() },
  { id: "atasman", image: "/images/home/atasman-color.jpg", href: "/urunler/is-makinesi-atasmanlari", tr: blankCopy(), en: blankCopy(), ar: blankCopy() },
  { id: "arac", image: "/images/home/arac-color.jpg", href: "/urunler/arac-ustu-ekipmanlar", tr: blankCopy(), en: blankCopy(), ar: blankCopy() },
  { id: "mobil", image: "/images/home/mobil-color.jpg", href: "/urunler/mobil-cozumler", tr: blankCopy(), en: blankCopy(), ar: blankCopy() },
];

function imageOf(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const clean = value.split("?")[0];
  if (!clean.startsWith("/images/home/") || clean.includes("..")) return fallback;
  return clean;
}

function hrefOf(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  return cleanHref(value.slice(0, 300));
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
      href: hrefOf(record.href, base.href),
      tr: copyOf(record.tr, base.tr),
      en: copyOf(record.en, base.en),
      ar: copyOf(record.ar, base.ar),
    };
  });
}

export function turkishMissing(panels: HeroPanelContent[]) {
  return panels.some((panel) => !panel.tr.title.trim() || !panel.tr.text.trim());
}
