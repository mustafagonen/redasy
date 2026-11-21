import { categoryIconId } from "@/lib/categoryIcons";

export const catalogLangs = ["tr", "en", "ar"] as const;

export type CatalogLang = (typeof catalogLangs)[number];

export type Copy = Record<CatalogLang, string>;

export type Category = {
  id: string;
  parentId: string | null;
  slug: string;
  order: number;
  visible: boolean;
  title: Copy;
  lead: Copy;
  icon: string;
  image: string;
};

export type SpecRow = {
  id: string;
  label: Copy;
  value: Copy;
};

export type SpecGroup = {
  id: string;
  title: Copy;
  rows: SpecRow[];
};

export type CatalogNote = {
  id: string;
  text: Copy;
};

export type CatalogStat = {
  id: string;
  label: Copy;
  value: Copy;
};

export type Product = {
  id: string;
  categoryId: string;
  slug: string;
  order: number;
  visible: boolean;
  title: Copy;
  summary: Copy;
  overview: Copy;
  brochure: string;
  images: string[];
  stats: CatalogStat[];
  highlights: CatalogNote[];
  specs: SpecGroup[];
  applications: CatalogNote[];
};

export type Catalog = {
  categories: Category[];
  products: Product[];
};

export const emptyCatalog: Catalog = { categories: [], products: [] };

export const MAX_CATEGORIES = 120;
export const MAX_PRODUCTS = 240;
export const MAX_DEPTH = 8;

export function emptyCopy(): Copy {
  return { tr: "", en: "", ar: "" };
}

export function slugify(value: string) {
  const letters: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    i: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    â: "a",
    î: "i",
    û: "u",
  };
  const lower = value.trim().toLocaleLowerCase("tr");
  const mapped = [...lower].map((char) => letters[char] ?? char).join("");
  const slug = mapped
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || "oge";
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function prose(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim().slice(0, max) : "";
}

function copyOf(value: unknown, max: number, rich = false) {
  const record = value && typeof value === "object" ? (value as Partial<Copy>) : {};
  const read = rich ? prose : text;
  return {
    tr: read(record.tr, max),
    en: read(record.en, max),
    ar: read(record.ar, max),
  };
}

function idOf(value: unknown, fallback: string) {
  const id = text(value, 80);
  return /^[a-zA-Z0-9_-]+$/.test(id) ? id : fallback;
}

export const productListSegment = "liste";

function uniqueSlug(base: string, used: Set<string>) {
  const root = slugify(base);
  let slug = root === productListSegment ? `${root}-2` : root;
  let index = 2;
  while (used.has(slug) || slug === productListSegment) {
    slug = `${root}-${index}`.slice(0, 70);
    index += 1;
  }
  used.add(slug);
  return slug;
}

function brochureOf(value: unknown) {
  const href = text(value, 240);
  if (!href) return "";
  if (href.startsWith("/") || /^https?:\/\//i.test(href)) return href;
  return "";
}

function imageOf(value: unknown) {
  const src = text(value, 180).split("?")[0];
  if (!src.startsWith("/images/products/") || src.includes("..")) return "";
  return src;
}

export function categoryPath(categories: Category[], category: Category) {
  const crumbs: Category[] = [];
  const seen = new Set<string>();
  let current: Category | undefined = category;
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    crumbs.unshift(current);
    current = categories.find((item) => item.id === current?.parentId);
  }
  return crumbs;
}

export function publicHref(categories: Category[], category: Category, product?: Product) {
  const crumbs = categoryPath(categories, category);
  const path = crumbs.map((item) => item.slug).join("/");
  return product ? `/urunler/${path}/${product.slug}` : `/urunler/${path}`;
}

export function productListHref(categories: Category[], category: Category) {
  const children = childrenOf(categories, category.id).filter((item) => item.visible && item.title.tr);
  const href = publicHref(categories, category);
  return children.length ? `${href}/${productListSegment}` : href;
}

export function childrenOf(categories: Category[], parentId: string | null) {
  return categories.filter((item) => item.parentId === parentId).sort((a, b) => a.order - b.order || a.title.tr.localeCompare(b.title.tr, "tr"));
}

export function productsOf(products: Product[], categoryId: string) {
  return products.filter((item) => item.categoryId === categoryId).sort((a, b) => a.order - b.order || a.title.tr.localeCompare(b.title.tr, "tr"));
}

export function coverImage(catalog: Catalog, categoryId: string, seen = new Set<string>()): string {
  if (seen.has(categoryId)) return "";
  seen.add(categoryId);
  const own = productsOf(catalog.products, categoryId).find((item) => item.visible && item.title.tr && item.images[0]);
  if (own?.images[0]) return own.images[0];
  for (const child of childrenOf(catalog.categories, categoryId)) {
    if (!child.visible || !child.title.tr) continue;
    const image = coverImage(catalog, child.id, seen);
    if (image) return image;
  }
  return "";
}

export type CatalogMatch =
  | { kind: "root" }
  | { kind: "category"; category: Category; crumbs: Category[] }
  | { kind: "product"; product: Product; category: Category; crumbs: Category[] };

export function resolveCatalog(catalog: Catalog, segments: string[], includeHidden = false): CatalogMatch | null {
  const categories = catalog.categories.filter((item) => includeHidden || (item.visible && item.title.tr));
  const products = catalog.products.filter((item) => includeHidden || (item.visible && item.title.tr));
  if (!segments.length) return { kind: "root" };

  const crumbs: Category[] = [];
  let parentId: string | null = null;
  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const category = categories.find((item) => item.parentId === parentId && item.slug === segment);
    if (category) {
      crumbs.push(category);
      parentId = category.id;
      continue;
    }
    const categoryParent = crumbs[crumbs.length - 1];
    if (index === segments.length - 1 && categoryParent) {
      const product = products.find((item) => item.categoryId === categoryParent.id && item.slug === segment);
      if (product) return { kind: "product", product, category: categoryParent, crumbs };
    }
    return null;
  }
  const category = crumbs[crumbs.length - 1];
  if (!category) return null;
  return { kind: "category", category, crumbs };
}

function normalizeProduct(value: unknown, index: number, categoryIds: Set<string>): Product | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<Product>;
  const categoryId = text(record.categoryId, 80);
  if (!categoryIds.has(categoryId)) return null;
  const images = Array.isArray(record.images) ? record.images.map(imageOf).filter(Boolean).slice(0, 8) : [];
  const stats = Array.isArray(record.stats)
    ? record.stats.slice(0, 6).map((item, row) => {
        const stat = item && typeof item === "object" ? (item as Partial<CatalogStat>) : {};
        return { id: idOf(stat.id, `stat-${index}-${row}`), label: copyOf(stat.label, 40), value: copyOf(stat.value, 60) };
      }).filter((item) => item.label.tr || item.value.tr || item.label.en || item.value.en)
    : [];
  const highlights = Array.isArray(record.highlights)
    ? record.highlights.slice(0, 16).map((item, row) => {
        const note = item && typeof item === "object" ? (item as Partial<CatalogNote>) : {};
        return { id: idOf(note.id, `note-${index}-${row}`), text: copyOf(note.text, 240) };
      }).filter((item) => item.text.tr || item.text.en || item.text.ar)
    : [];
  const applications = Array.isArray(record.applications)
    ? record.applications.slice(0, 16).map((item, row) => {
        const note = item && typeof item === "object" ? (item as Partial<CatalogNote>) : {};
        return { id: idOf(note.id, `app-${index}-${row}`), text: copyOf(note.text, 80) };
      }).filter((item) => item.text.tr || item.text.en || item.text.ar)
    : [];
  const specs = Array.isArray(record.specs)
    ? record.specs.slice(0, 12).map((item, groupIndex) => {
        const group = item && typeof item === "object" ? (item as Partial<SpecGroup>) : {};
        const rows = Array.isArray(group.rows)
          ? group.rows.slice(0, 24).map((row, rowIndex) => {
              const spec = row && typeof row === "object" ? (row as Partial<SpecRow>) : {};
              return { id: idOf(spec.id, `row-${index}-${groupIndex}-${rowIndex}`), label: copyOf(spec.label, 80), value: copyOf(spec.value, 240) };
            }).filter((row) => row.label.tr || row.value.tr || row.label.en || row.value.en)
          : [];
        return { id: idOf(group.id, `group-${index}-${groupIndex}`), title: copyOf(group.title, 80), rows };
      }).filter((group) => group.title.tr || group.title.en || group.rows.length)
    : [];
  return {
    id: idOf(record.id, `urun-${index}`),
    categoryId,
    slug: slugify(text(record.slug, 70) || text(record.title && typeof record.title === "object" ? (record.title as Copy).tr : "", 70)),
    order: Number.isFinite(record.order) ? Math.max(0, Math.round(Number(record.order))) : index,
    visible: record.visible !== false,
    title: copyOf(record.title, 160),
    summary: copyOf(record.summary, 240),
    overview: copyOf(record.overview, 2000, true),
    brochure: brochureOf(record.brochure),
    images: [...new Set(images)],
    stats,
    highlights,
    specs,
    applications,
  };
}

export function normalizeCatalog(value: unknown): Catalog {
  const record = value && typeof value === "object" ? (value as { categories?: unknown; products?: unknown }) : {};
  const incoming = Array.isArray(record.categories) ? record.categories : [];
  const drafted: Category[] = [];
  const seenIds = new Set<string>();

  incoming.slice(0, MAX_CATEGORIES).forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const row = item as Partial<Category>;
    let id = idOf(row.id, `kat-${index}`);
    while (seenIds.has(id)) id = `${id}-${index}`;
    seenIds.add(id);
    const parentId = text(row.parentId, 80);
    drafted.push({
      id,
      parentId: parentId && parentId !== id ? parentId : null,
      slug: slugify(text(row.slug, 70) || text(row.title && typeof row.title === "object" ? (row.title as Copy).tr : "", 70)),
      order: Number.isFinite(row.order) ? Math.max(0, Math.round(Number(row.order))) : index,
      visible: row.visible !== false,
      title: copyOf(row.title, 120),
      lead: copyOf(row.lead, 400),
      icon: categoryIconId(row.icon),
      image: imageOf(row.image),
    });
  });

  const byId = new Map(drafted.map((item) => [item.id, item]));
  drafted.forEach((item) => {
    const seen = new Set<string>();
    let current: Category | undefined = item;
    let depth = 0;
    while (current) {
      depth += 1;
      if (seen.has(current.id) || depth > MAX_DEPTH || (current.parentId && !byId.has(current.parentId))) {
        item.parentId = null;
        break;
      }
      seen.add(current.id);
      current = current.parentId ? byId.get(current.parentId) : undefined;
    }
  });

  const categories = drafted;

  const groups = new Map<string | null, Category[]>();
  categories.forEach((item) => {
    const key = item.parentId && categories.some((category) => category.id === item.parentId) ? item.parentId : null;
    item.parentId = key;
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  });
  groups.forEach((list) => {
    const used = new Set<string>();
    list
      .sort((a, b) => a.order - b.order)
      .forEach((item, index) => {
        item.order = index;
        item.slug = uniqueSlug(item.slug || item.title.tr, used);
      });
  });

  const categoryIds = new Set(categories.map((item) => item.id));
  const childSlugs = new Map<string, Set<string>>();
  categories.forEach((item) => {
    if (!item.parentId) return;
    const used = childSlugs.get(item.parentId) ?? new Set<string>();
    used.add(item.slug);
    childSlugs.set(item.parentId, used);
  });

  const rawProducts = Array.isArray(record.products) ? record.products : [];
  const products = rawProducts
    .slice(0, MAX_PRODUCTS)
    .map((item, index) => normalizeProduct(item, index, categoryIds))
    .filter((item): item is Product => Boolean(item));

  const seenProductIds = new Set<string>();
  products.forEach((item, index) => {
    let id = item.id;
    while (seenProductIds.has(id)) id = `${id}-${index}`;
    seenProductIds.add(id);
    item.id = id;
  });

  const byCategory = new Map<string, Product[]>();
  products.forEach((item) => {
    const list = byCategory.get(item.categoryId) ?? [];
    list.push(item);
    byCategory.set(item.categoryId, list);
  });
  byCategory.forEach((list, categoryId) => {
    const used = new Set(childSlugs.get(categoryId) ?? []);
    list
      .sort((a, b) => a.order - b.order)
      .forEach((item, index) => {
        item.order = index;
        item.slug = uniqueSlug(item.slug || item.title.tr, used);
      });
  });

  return {
    categories: categories.sort((a, b) => a.order - b.order),
    products: products.sort((a, b) => a.order - b.order),
  };
}
