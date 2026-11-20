import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { defaultTheme, normalizeTheme, type Theme } from "@/lib/theme";

export async function readTheme(): Promise<Theme> {
  const data = await readSiteDoc("theme");
  return data ? normalizeTheme(data) : defaultTheme;
}

export async function writeTheme(value: unknown) {
  const theme = normalizeTheme(value);
  const firebase = await saveSiteDoc("theme", theme);
  return { theme, firebase };
}
