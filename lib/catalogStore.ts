import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { emptyCatalog, normalizeCatalog, type Catalog } from "@/lib/catalog";

export async function readCatalog(): Promise<Catalog> {
  const data = await readSiteDoc("catalog");
  return data ? normalizeCatalog(data) : emptyCatalog;
}

export async function writeCatalog(value: unknown) {
  const catalog = normalizeCatalog(value);
  const firebase = await saveSiteDoc("catalog", catalog);
  return { catalog, firebase };
}
