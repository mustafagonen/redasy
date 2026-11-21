export const categoryIcons = [
  { id: "gear", label: "Dişli" },
  { id: "truck", label: "Araç" },
  { id: "crusher", label: "Kırıcı" },
  { id: "screen", label: "Elek" },
  { id: "conveyor", label: "Konveyör" },
  { id: "wash", label: "Yıkama" },
  { id: "parts", label: "Yedek parça" },
  { id: "trailer", label: "Treyler" },
  { id: "bucket", label: "Ataşman" },
  { id: "layers", label: "Sistem" },
] as const;

export type CategoryIconId = (typeof categoryIcons)[number]["id"];

export function categoryIconId(value: unknown) {
  const id = typeof value === "string" ? value.trim().slice(0, 24) : "";
  return categoryIcons.some((item) => item.id === id) ? id : "";
}
