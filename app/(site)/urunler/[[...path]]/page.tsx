import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView, ProductView } from "@/components/CatalogView";
import { JsonLd } from "@/components/JsonLd";
import { childrenOf, productListSegment, productsOf, publicHref, resolveCatalog, type Catalog, type CatalogMatch } from "@/lib/catalog";
import { readCatalog } from "@/lib/catalogStore";
import { getLocale } from "@/lib/getLocale";
import { pick, type Locale } from "@/lib/locale";
import { ui } from "@/lib/messages";
import { activitySummary, activityTitle, breadcrumbGraph, catalogIndexSummary, pageMeta, productGraph } from "@/lib/seo";

export const dynamic = "force-dynamic";

function readPath(path?: string[]) {
  const segments = path ?? [];
  const listing = segments.at(-1) === productListSegment;
  return { segments: listing ? segments.slice(0, -1) : segments, listing };
}

function catalogPath(segments: string[], listing: boolean) {
  const base = segments.length ? `/urunler/${segments.join("/")}` : "/urunler";
  return listing ? `${base}/${productListSegment}` : base;
}

function catalogCopy(catalog: Catalog, match: CatalogMatch | null, listing: boolean, locale: Locale, segments: string[]) {
  const copy = ui(locale);
  const path = catalogPath(segments, listing);
  if (!match || match.kind === "root" || (listing && match.kind !== "category")) {
    return { title: copy.activities, description: catalogIndexSummary(locale), path: "/urunler" };
  }
  if (match.kind === "product") {
    const name = pick(match.product.title, locale);
    const own = pick(match.product.summary, locale) || pick(match.product.overview, locale);
    const description = own || activitySummary(match.category.slug, locale, pick(match.category.lead, locale)) || `${name}. ${pick(match.category.title, locale)}.`;
    return { title: name, description, path: publicHref(catalog.categories, match.category, match.product) };
  }
  const name = pick(match.category.title, locale);
  const description = activitySummary(match.category.slug, locale, pick(match.category.lead, locale)) || catalogIndexSummary(locale);
  return { title: activityTitle(match.category.slug, locale, name), description, path };
}

export async function generateMetadata({ params }: { params: Promise<{ path?: string[] }> }): Promise<Metadata> {
  const { path } = await params;
  const { segments, listing } = readPath(path);
  const [catalog, locale] = await Promise.all([readCatalog(), getLocale()]);
  const match = resolveCatalog(catalog, segments);
  const entry = catalogCopy(catalog, match, listing, locale, segments);
  return pageMeta(locale, entry);
}

export default async function CatalogPage({ params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params;
  const { segments, listing } = readPath(path);
  const [catalog, locale] = await Promise.all([readCatalog(), getLocale()]);
  const match = resolveCatalog(catalog, segments);
  if (!match || (listing && match.kind !== "category")) notFound();
  const copy = ui(locale);
  const trail = [
    { name: copy.home, path: "/" },
    { name: copy.activities, path: "/urunler" },
  ];
  if (match.kind === "product") {
    for (const crumb of match.crumbs) trail.push({ name: pick(crumb.title, locale), path: publicHref(catalog.categories, crumb) });
    const name = pick(match.product.title, locale);
    const path = publicHref(catalog.categories, match.category, match.product);
    const code = match.product.stats.find((item) => item.label.tr === "Kod");
    trail.push({ name, path });
    return (
      <>
        <JsonLd data={breadcrumbGraph(trail)} />
        <JsonLd
          data={productGraph({
            name,
            description: pick(match.product.summary, locale) || pick(match.product.overview, locale) || name,
            path,
            sku: code ? pick(code.value, locale) : "",
            images: match.product.images,
          })}
        />
        <ProductView catalog={catalog} product={match.product} category={match.category} crumbs={match.crumbs} locale={locale} />
      </>
    );
  }
  if (match.kind === "category") {
    for (const crumb of match.crumbs) trail.push({ name: pick(crumb.title, locale), path: publicHref(catalog.categories, crumb) });
    const children = childrenOf(catalog.categories, match.category.id).filter((item) => item.visible && item.title.tr);
    const products = productsOf(catalog.products, match.category.id).filter((item) => item.visible && item.title.tr);
    const mode = listing || (!children.length && products.length > 0) ? "products" : "tree";
    return (
      <>
        <JsonLd data={breadcrumbGraph(trail)} />
        <CatalogView catalog={catalog} category={match.category} crumbs={match.crumbs} mode={mode} locale={locale} />
      </>
    );
  }
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail)} />
      <CatalogView catalog={catalog} category={null} crumbs={[]} mode="tree" locale={locale} />
    </>
  );
}
