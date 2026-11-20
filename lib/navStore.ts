import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { defaultNav, normalizeNav, type NavConfig } from "@/lib/nav";

export async function readNav(): Promise<NavConfig> {
  const data = await readSiteDoc("nav");
  return data ? normalizeNav(data) : defaultNav;
}

export async function writeNav(value: unknown) {
  const nav = normalizeNav(value);
  const firebase = await saveSiteDoc("nav", nav);
  return { nav, firebase };
}
