import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView, ProductView } from "@/components/CatalogView";
import { childrenOf, productListSegment, productsOf, resolveCatalog } from "@/lib/catalog";
import { readCatalog } from "@/lib/catalogStore";
import { getLocale } from "@/lib/getLocale";
import { pick } from "@/lib/locale";
import { ui } from "@/lib/messages";

export const dynamic = "force-dynamic";

function readPath(path?: string[]) {
  const segments = path ?? [];
  const listing = segments.at(-1) === productListSegment;
  return { segments: listing ? segments.slice(0, -1) : segments, listing };
}

export async function generateMetadata({ params }: { params: Promise<{ path?: string[] }> }): Promise<Metadata> {
  const { path } = await params;
  const { segments, listing } = readPath(path);
  const [catalog, locale] = await Promise.all([readCatalog(), getLocale()]);
  const copy = ui(locale);
  const match = resolveCatalog(catalog, segments);
  if (!match || (listing && match.kind !== "category")) return { title: `${copy.activities} | REDASY` };
  if (match.kind === "product") return { title: `${pick(match.product.title, locale)} | REDASY` };
  if (match.kind === "category") return { title: `${pick(match.category.title, locale)} | REDASY` };
  return { title: `${copy.activities} | REDASY` };
}

export default async function CatalogPage({ params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params;
  const { segments, listing } = readPath(path);
  const [catalog, locale] = await Promise.all([readCatalog(), getLocale()]);
  const match = resolveCatalog(catalog, segments);
  if (!match || (listing && match.kind !== "category")) notFound();
  if (match.kind === "product") {
    return <ProductView catalog={catalog} product={match.product} category={match.category} crumbs={match.crumbs} locale={locale} />;
  }
  if (match.kind === "category") {
    const children = childrenOf(catalog.categories, match.category.id).filter((item) => item.visible && item.title.tr);
    const products = productsOf(catalog.products, match.category.id).filter((item) => item.visible && item.title.tr);
    const mode = listing || (!children.length && products.length > 0) ? "products" : "tree";
    return <CatalogView catalog={catalog} category={match.category} crumbs={match.crumbs} mode={mode} locale={locale} />;
  }
  return <CatalogView catalog={catalog} category={null} crumbs={[]} mode="tree" locale={locale} />;
}
