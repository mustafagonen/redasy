import type { MetadataRoute } from "next";
import { publicHref } from "@/lib/catalog";
import { readCatalog } from "@/lib/catalogStore";
import { pageSlugs } from "@/lib/pages";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Map<string, number>([
    ["/", 1],
    ["/urunler", 0.9],
    ...pageSlugs.map((slug) => [`/${slug}`, 0.5] as const),
    ["/gizlilik", 0.2],
    ["/kullanim-kosullari", 0.2],
  ]);

  try {
    const catalog = await readCatalog();
    for (const category of catalog.categories) {
      if (!category.visible || !category.title.tr) continue;
      const priority = category.parentId ? 0.7 : 0.9;
      paths.set(publicHref(catalog.categories, category), priority);
    }
    for (const product of catalog.products) {
      if (!product.visible || !product.title.tr) continue;
      const category = catalog.categories.find((item) => item.id === product.categoryId);
      if (!category || !category.visible) continue;
      paths.set(publicHref(catalog.categories, category, product), 0.6);
    }
  } catch {
    // A catalog read failure still leaves the fixed public pages in the map.
  }

  return [...paths.entries()].map(([path, priority]) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
