import { isThemeId, type ThemeId } from "@/lib/theme";

export const blockCatalog = [
  {
    kind: "film",
    label: "Çapraz görseller",
    hint: "Dört görsel ve gri bant",
    colors: ["surface", "caption", "caption-line", "ink", "muted", "brand"],
  },
  {
    kind: "stages",
    label: "Aşamalar",
    hint: "Üç adımlı tanıtım bandı",
    colors: ["stage", "line", "brand", "ink", "muted"],
  },
  {
    kind: "about",
    label: "Hakkımızda",
    hint: "Biz kimiz metni ve atölye fotoğrafı",
    colors: ["surface", "soft", "ink", "brand", "brand-hover", "body", "on-brand"],
  },
  {
    kind: "stats",
    label: "Rakamlar",
    hint: "Logo ve dört istatistik",
    colors: ["brand", "on-brand"],
  },
  {
    kind: "reasons",
    label: "Neden biz",
    hint: "Üç gerekçe kartı",
    colors: ["paper", "surface", "line", "ink", "muted", "brand"],
  },
  {
    kind: "contact",
    label: "İletişim",
    hint: "İletişim bilgisi ve form",
    colors: ["surface", "line", "brand", "brand-bar", "on-brand", "form", "field", "ink", "soft"],
  },
] as const;

export type BlockKind = (typeof blockCatalog)[number]["kind"];
export type BlockColors = Partial<Record<ThemeId, string>>;
export type HomeBlock = { id: string; kind: BlockKind; colors: BlockColors };

const hex = /^#[0-9a-f]{6}$/;

export function isBlockKind(value: string): value is BlockKind {
  return blockCatalog.some((item) => item.kind === value);
}

export function blockInfo(kind: BlockKind) {
  return blockCatalog.find((item) => item.kind === kind) ?? blockCatalog[0];
}

export function defaultHomeBlocks(): HomeBlock[] {
  return blockCatalog.map((item) => ({ id: item.kind, kind: item.kind, colors: {} }));
}

export function normalizeHomeBlocks(value: unknown): HomeBlock[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const blocks: HomeBlock[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as { id?: unknown; kind?: unknown; colors?: unknown };
    if (typeof record.kind !== "string" || !isBlockKind(record.kind)) continue;
    const kind = record.kind;
    let id = typeof record.id === "string" && record.id.trim() ? record.id.trim() : kind;
    while (seen.has(id)) id = `${id}-2`;
    seen.add(id);
    const allowed = new Set<string>(blockInfo(kind).colors);
    const colors: BlockColors = {};
    if (record.colors && typeof record.colors === "object") {
      for (const [key, raw] of Object.entries(record.colors as Record<string, unknown>)) {
        if (!allowed.has(key) || !isThemeId(key) || typeof raw !== "string" || !hex.test(raw.trim().toLowerCase())) continue;
        colors[key] = raw.trim().toLowerCase();
      }
    }
    blocks.push({ id, kind, colors });
  }
  return blocks;
}

export function blocksEqual(a: HomeBlock[], b: HomeBlock[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function blockColorStyle(colors: BlockColors) {
  const style: Record<string, string> = {};
  for (const [id, value] of Object.entries(colors)) {
    if (value) style[`--theme-${id}`] = value;
  }
  return style;
}
