export type NoticeCopy = { tr: string; en: string; ar: string };

export type Notice = {
  visible: boolean;
  mark: boolean;
  text: NoticeCopy;
};

export const defaultNotice: Notice = {
  visible: true,
  mark: true,
  text: {
    tr: "29 Ekim Cumhuriyet Bayramımız kutlu olsun",
    en: "29 October Republic Day, congratulations",
    ar: "29 أكتوبر، عيد الجمهورية مبارك",
  },
};

function line(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export function normalizeNotice(value: unknown): Notice {
  const record = value && typeof value === "object" ? (value as Partial<Notice>) : {};
  const text = record.text && typeof record.text === "object" ? (record.text as Partial<NoticeCopy>) : {};
  return {
    visible: record.visible !== false,
    mark: record.mark !== false,
    text: {
      tr: line(text.tr, 180),
      en: line(text.en, 180),
      ar: line(text.ar, 180),
    },
  };
}
