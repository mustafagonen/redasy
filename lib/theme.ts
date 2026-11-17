export const themeTokens = [
  { id: "brand", label: "Marka", hint: "Düğmeler, vurgular ve istatistik bandı", value: "#550506" },
  { id: "brand-bar", label: "Üst şerit", hint: "Sosyal medya çubuğu", value: "#5a0305" },
  { id: "brand-hover", label: "Düğme hover", hint: "Marka düğmesinin üzerine gelince", value: "#3f0405" },
  { id: "brand-hot", label: "WhatsApp hover", hint: "Sohbet düğmesinin üzerine gelince", value: "#6a080a" },
  { id: "on-brand", label: "Marka üstü yazı", hint: "Koyu zemin üzerindeki yazı", value: "#ffffff" },
  { id: "ink", label: "Başlık", hint: "Ana başlıklar", value: "#1a1a1a" },
  { id: "header", label: "Menü yazısı", hint: "Üst menü ve telefon", value: "#2a2a2a" },
  { id: "body", label: "Gövde metni", hint: "Paragraflar", value: "#4d4d4d" },
  { id: "muted", label: "İkincil metin", hint: "Açıklamalar", value: "#5f5f5f" },
  { id: "soft", label: "Soluk etiket", hint: "Küçük üst yazılar", value: "#8d8d8d" },
  { id: "surface", label: "Sayfa zemini", hint: "Beyaz alanlar", value: "#ffffff" },
  { id: "paper", label: "Kağıt zemin", hint: "Açık gri bloklar", value: "#f3f3f3" },
  { id: "caption", label: "Gri şerit", hint: "Dört görselin altındaki bant", value: "#ececee" },
  { id: "caption-line", label: "Şerit ayırıcı", hint: "Gri şeritteki ince çizgiler", value: "#c4c4c6" },
  { id: "stage", label: "Aşama bandı", hint: "Üç aşamanın zemini", value: "#f7f6f6" },
  { id: "field", label: "Form alanı", hint: "Yazı kutuları", value: "#ececee" },
  { id: "field-focus", label: "Alan odağı", hint: "Kutuya tıklayınca zemin", value: "#f3f3f4" },
  { id: "form", label: "Form paneli", hint: "İletişim formunun zemini", value: "#f6f6f7" },
  { id: "line", label: "Çizgi", hint: "Kenarlıklar", value: "#e5e5e5" },
  { id: "footer", label: "Alt bilgi", hint: "Sayfa sonu", value: "#141618" },
  { id: "band", label: "Kurumsal şerit", hint: "Sayfa altındaki koyu menü", value: "#161616" },
  { id: "slate", label: "Arduvaz", hint: "Kurumsal sayfa detayları", value: "#38444e" },
] as const;

export type ThemeId = (typeof themeTokens)[number]["id"];
export type Theme = Record<ThemeId, string>;

const hex = /^#[0-9a-f]{6}$/;

export const defaultTheme: Theme = Object.fromEntries(themeTokens.map((token) => [token.id, token.value])) as Theme;

export function isThemeId(value: string): value is ThemeId {
  return themeTokens.some((token) => token.id === value);
}

export function themeToken(id: ThemeId) {
  return themeTokens.find((token) => token.id === id) ?? themeTokens[0];
}

export function normalizeTheme(value: unknown): Theme {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const theme = { ...defaultTheme };
  for (const token of themeTokens) {
    const raw = source[token.id];
    if (typeof raw === "string" && hex.test(raw.trim().toLowerCase())) theme[token.id] = raw.trim().toLowerCase();
  }
  return theme;
}

export function themesEqual(a: Theme, b: Theme) {
  return themeTokens.every((token) => a[token.id] === b[token.id]);
}

export function themeVars(theme: Theme) {
  const style: Record<string, string> = {};
  for (const token of themeTokens) style[`--theme-${token.id}`] = theme[token.id];
  return style;
}
