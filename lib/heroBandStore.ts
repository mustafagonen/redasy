import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { defaultHeroPanels, normalizeHeroPanels, type HeroPanelContent } from "@/lib/heroBand";

export async function readHeroBand(): Promise<HeroPanelContent[]> {
  const data = await readSiteDoc("heroBand");
  return data ? normalizeHeroPanels(data.panels) : defaultHeroPanels;
}

export async function writeHeroBand(panels: HeroPanelContent[]) {
  const normalized = normalizeHeroPanels(panels);
  const firebase = await saveSiteDoc("heroBand", { panels: normalized });
  return { panels: normalized, firebase };
}
