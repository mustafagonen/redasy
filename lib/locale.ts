export const locales = ["tr", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const localeCookie = "redasy-lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "tr" || value === "en" || value === "ar";
}

type CopyLike = { tr?: string; en?: string; ar?: string };

export function pick(copy: CopyLike | null | undefined, locale: Locale) {
  const chosen = copy?.[locale]?.trim();
  if (chosen) return chosen;
  return copy?.tr?.trim() || "";
}

export function localized<T extends { title: string; text: string }>(row: { tr: T; en: T; ar: T }, locale: Locale): T {
  const chosen = row[locale];
  return {
    ...chosen,
    title: chosen.title.trim() || row.tr.title,
    text: chosen.text.trim() || row.tr.text,
  };
}
