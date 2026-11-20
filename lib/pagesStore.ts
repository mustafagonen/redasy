import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { normalizePage, normalizePages, type SitePage } from "@/lib/pages";

export async function readPages(): Promise<SitePage[]> {
  const data = await readSiteDoc("pages");
  return normalizePages(data ?? { pages: [] });
}

export async function writePage(value: unknown) {
  const page = normalizePage(value);
  if (!page) throw new Error("invalid-page");
  const pages = (await readPages()).map((item) => (item.slug === page.slug ? page : item));
  const firebase = await saveSiteDoc("pages", { pages });
  return { page, firebase };
}
