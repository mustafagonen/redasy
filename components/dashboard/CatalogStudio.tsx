"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  MAX_CATEGORIES,
  MAX_DEPTH,
  MAX_PRODUCTS,
  childrenOf,
  emptyCopy,
  productsOf,
  publicHref,
  slugify,
  type Catalog,
  type CatalogLang,
  type CatalogNote,
  type CatalogStat,
  type Category,
  type Copy,
  type Product,
  type SpecGroup,
  type SpecRow,
} from "@/lib/catalog";

const langs: { id: CatalogLang; label: string }[] = [
  { id: "tr", label: "Türkçe" },
  { id: "en", label: "English" },
  { id: "ar", label: "العربية" },
];

function uid() {
  return crypto.randomUUID();
}

function depthOf(categories: Category[], category: Category) {
  let depth = 1;
  const seen = new Set<string>([category.id]);
  let parentId = category.parentId;
  while (parentId) {
    if (seen.has(parentId)) break;
    seen.add(parentId);
    depth += 1;
    parentId = categories.find((item) => item.id === parentId)?.parentId ?? null;
  }
  return depth;
}

function descendantIds(categories: Category[], id: string) {
  const ids = new Set<string>();
  const walk = (current: string) => {
    if (ids.has(current)) return;
    ids.add(current);
    categories.filter((item) => item.parentId === current).forEach((item) => walk(item.id));
  };
  walk(id);
  return ids;
}

function withOrders<T extends { order: number }>(items: T[]) {
  return items.map((item, index) => ({ ...item, order: index }));
}

function blankProduct(categoryId: string, order: number): Product {
  return {
    id: uid(),
    categoryId,
    slug: "urun",
    order,
    visible: true,
    title: emptyCopy(),
    summary: emptyCopy(),
    overview: emptyCopy(),
    brochure: "",
    images: [],
    stats: [],
    highlights: [],
    specs: [],
    applications: [],
  };
}

function keepSlug(current: string, previousTitle: string, nextTitle: string, fallback: string) {
  const previous = slugify(previousTitle);
  if (!current || current === fallback || current === previous) return slugify(nextTitle);
  return current;
}

export function CatalogStudio({ initial }: { initial: Catalog }) {
  const [catalog, setCatalog] = useState(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [lang, setLang] = useState<CatalogLang>("tr");
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(initial.categories[0]?.id ?? null);
  const [productId, setProductId] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set(initial.categories.map((item) => item.id)));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{ kind: "category" | "product"; id: string } | null>(null);

  const dirty = JSON.stringify(catalog) !== saved;
  const category = catalog.categories.find((item) => item.id === categoryId) ?? null;
  const product = catalog.products.find((item) => item.id === productId) ?? null;
  const rtl = lang === "ar";

  useEffect(() => {
    const onLeave = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  function touch() {
    setMessage(null);
    setPendingDelete(null);
  }

  function selectCategory(id: string) {
    setCategoryId(id);
    setProductId(null);
    setPendingDelete(null);
    setOpen((current) => {
      const next = new Set(current);
      let parent = catalog.categories.find((item) => item.id === id)?.parentId ?? null;
      while (parent) {
        next.add(parent);
        parent = catalog.categories.find((item) => item.id === parent)?.parentId ?? null;
      }
      return next;
    });
  }

  function addCategory(parentId: string | null) {
    if (catalog.categories.length >= MAX_CATEGORIES) {
      setMessage({ tone: "warn", text: `Kategori sayısı ${MAX_CATEGORIES} ile sınırlı.` });
      return;
    }
    const parent = catalog.categories.find((item) => item.id === parentId);
    if (parent && depthOf(catalog.categories, parent) >= MAX_DEPTH) {
      setMessage({ tone: "warn", text: `Kategori ağacı ${MAX_DEPTH} seviyeden derine inemez.` });
      return;
    }
    const siblings = childrenOf(catalog.categories, parentId);
    const created: Category = {
      id: uid(),
      parentId,
      slug: "kategori",
      order: siblings.length,
      visible: true,
      title: emptyCopy(),
      lead: emptyCopy(),
    };
    setCatalog((current) => ({ ...current, categories: [...current.categories, created] }));
    setCategoryId(created.id);
    setProductId(null);
    if (parentId) setOpen((current) => new Set(current).add(parentId));
    touch();
  }

  function patchCategory(id: string, patch: Partial<Category>, title?: string) {
    setCatalog((current) => ({
      ...current,
      categories: current.categories.map((item) => {
        if (item.id !== id) return item;
        const next = { ...item, ...patch };
        if (title !== undefined) next.slug = keepSlug(item.slug, item.title.tr, title, "kategori");
        return next;
      }),
    }));
    touch();
  }

  function moveCategory(id: string, direction: -1 | 1) {
    setCatalog((current) => {
      const item = current.categories.find((row) => row.id === id);
      if (!item) return current;
      const siblings = childrenOf(current.categories, item.parentId);
      const index = siblings.findIndex((row) => row.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= siblings.length) return current;
      const nextSiblings = [...siblings];
      const [row] = nextSiblings.splice(index, 1);
      nextSiblings.splice(target, 0, row);
      const orders = new Map(withOrders(nextSiblings).map((entry) => [entry.id, entry.order]));
      return {
        ...current,
        categories: current.categories.map((entry) => (orders.has(entry.id) ? { ...entry, order: orders.get(entry.id) ?? entry.order } : entry)),
      };
    });
    touch();
  }

  function removeCategory(id: string) {
    const ids = descendantIds(catalog.categories, id);
    const parentId = catalog.categories.find((item) => item.id === id)?.parentId ?? null;
    setCatalog((current) => ({
      categories: current.categories.filter((item) => !ids.has(item.id)),
      products: current.products.filter((item) => !ids.has(item.categoryId)),
    }));
    setCategoryId(parentId);
    setProductId(null);
    setPendingDelete(null);
    touch();
  }

  function addProduct() {
    if (!category) return;
    if (catalog.products.length >= MAX_PRODUCTS) {
      setMessage({ tone: "warn", text: `Ürün sayısı ${MAX_PRODUCTS} ile sınırlı.` });
      return;
    }
    const created = blankProduct(category.id, productsOf(catalog.products, category.id).length);
    setCatalog((current) => ({ ...current, products: [...current.products, created] }));
    setProductId(created.id);
    touch();
  }

  function patchProduct(id: string, patch: Partial<Product>, title?: string) {
    setCatalog((current) => ({
      ...current,
      products: current.products.map((item) => {
        if (item.id !== id) return item;
        const next = { ...item, ...patch };
        if (title !== undefined) next.slug = keepSlug(item.slug, item.title.tr, title, "urun");
        return next;
      }),
    }));
    touch();
  }

  function moveProduct(id: string, direction: -1 | 1) {
    if (!category) return;
    setCatalog((current) => {
      const siblings = productsOf(current.products, category.id);
      const index = siblings.findIndex((item) => item.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= siblings.length) return current;
      const nextSiblings = [...siblings];
      const [row] = nextSiblings.splice(index, 1);
      nextSiblings.splice(target, 0, row);
      const orders = new Map(withOrders(nextSiblings).map((item) => [item.id, item.order]));
      return {
        ...current,
        products: current.products.map((item) => (orders.has(item.id) ? { ...item, order: orders.get(item.id) ?? item.order } : item)),
      };
    });
    touch();
  }

  function removeProduct(id: string) {
    setCatalog((current) => ({ ...current, products: current.products.filter((item) => item.id !== id) }));
    setProductId(null);
    setPendingDelete(null);
    touch();
  }

  async function uploadImages(files: FileList | null) {
    if (!product || !files?.length) return;
    const room = 8 - product.images.length;
    const list = [...files].slice(0, room);
    if (!list.length) {
      setMessage({ tone: "warn", text: "Bir ürüne en fazla 8 görsel eklenebilir." });
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const uploaded: string[] = [];
      for (const file of list) {
        const form = new FormData();
        form.set("file", file);
        const response = await fetch("/api/catalog/image", { method: "POST", body: form });
        const body = await response.json().catch(() => null);
        if (!response.ok || !body?.image) {
          setMessage({ tone: "error", text: body?.error || "Görsel yüklenemedi." });
          break;
        }
        uploaded.push(body.image);
      }
      if (uploaded.length) {
        patchProduct(product.id, { images: [...product.images, ...uploaded] });
      }
    } catch {
      setMessage({ tone: "error", text: "Görsel yüklenemedi." });
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/catalog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(catalog),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.catalog) {
        setMessage({ tone: "error", text: "Kayıt tamamlanamadı." });
        return;
      }
      setCatalog(body.catalog);
      setSaved(JSON.stringify(body.catalog));
      if (body.firebase === "ok") setMessage({ tone: "ok", text: "Kaydedildi." });
      else if (body.firebase === "denied") setMessage({ tone: "warn", text: "Firebase yazmayı reddetti. Kayıt gitmedi." });
      else setMessage({ tone: "warn", text: "Firebase yazısı tamamlanamadı. Kayıt gitmedi." });
    } catch {
      setMessage({ tone: "error", text: "Bağlantı kurulamadı." });
    } finally {
      setSaving(false);
    }
  }

  const preview = product && category ? publicHref(catalog.categories, category, product) : category ? publicHref(catalog.categories, category) : "/urunler";
  const needle = query.trim().toLocaleLowerCase("tr");

  const treeVisible = useMemo(() => {
    if (!needle) return null;
    const ids = new Set<string>();
    const hit = (item: Category) => {
      const blob = `${item.title.tr} ${item.title.en} ${item.title.ar} ${item.slug}`.toLocaleLowerCase("tr");
      const productHit = productsOf(catalog.products, item.id).some((entry) =>
        `${entry.title.tr} ${entry.title.en} ${entry.title.ar} ${entry.slug}`.toLocaleLowerCase("tr").includes(needle),
      );
      return blob.includes(needle) || productHit;
    };
    const mark = (item: Category): boolean => {
      const childHit = childrenOf(catalog.categories, item.id).some(mark);
      const self = hit(item) || childHit;
      if (self) ids.add(item.id);
      return self;
    };
    childrenOf(catalog.categories, null).forEach(mark);
    return ids;
  }, [catalog, needle]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/92 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Site</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Ürünler</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full bg-[#ececee] p-1" role="tablist" aria-label="Dil">
              {langs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={lang === item.id}
                  onClick={() => setLang(item.id)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold ${lang === item.id ? "bg-white text-ink shadow-sm" : "text-muted"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <a href={preview} className="rounded-full px-3 py-2 text-sm font-semibold text-ink hover:text-brand">
              Sayfayı gör
            </a>
            <button
              type="button"
              onClick={save}
              disabled={saving || !dirty}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-bar disabled:opacity-50"
            >
              {saving ? "Kaydediliyor" : dirty ? "Kaydet" : "Kaydedildi"}
            </button>
          </div>
        </div>
      </header>

      {message ? (
        <p
          role="status"
          className={`mx-5 mt-4 rounded-xl px-4 py-3 text-sm leading-6 sm:mx-6 ${
            message.tone === "ok" ? "bg-[#eef6ef] text-[#1d5a32]" : message.tone === "warn" ? "bg-[#fbf4e8] text-[#7a5414]" : "bg-[#fdecec] text-brand"
          }`}
        >
          {message.text}
        </p>
      ) : null}

      <div className="lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <aside className="border-b border-black/5 bg-white lg:sticky lg:top-[77px] lg:h-[calc(100vh-77px)] lg:overflow-y-auto lg:border-r lg:border-b-0">
          <div className="sticky top-0 z-10 bg-white px-4 py-4">
            <button type="button" onClick={() => addCategory(null)} className="h-10 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-bar">
              Kök kategori
            </button>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Kategori veya ürün ara"
              className="field mt-3 h-10 w-full rounded-xl px-3 text-sm"
            />
          </div>
          <div className="px-2 pb-6">
            {childrenOf(catalog.categories, null).length ? (
              childrenOf(catalog.categories, null).map((item) => (
                <TreeRow
                  key={item.id}
                  catalog={catalog}
                  category={item}
                  depth={0}
                  selected={categoryId}
                  visibleIds={treeVisible}
                  open={open}
                  onToggle={(id) =>
                    setOpen((current) => {
                      const next = new Set(current);
                      if (next.has(id)) next.delete(id);
                      else next.add(id);
                      return next;
                    })
                  }
                  onSelect={selectCategory}
                  onAdd={addCategory}
                  onMove={moveCategory}
                />
              ))
            ) : (
              <p className="px-3 py-6 text-sm leading-6 text-muted">Henüz kategori yok. Kök kategori ile ağacı başlatın.</p>
            )}
          </div>
        </aside>

        <main className="min-w-0 px-5 py-6 sm:px-6">
          {pendingDelete ? (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fdecec] px-4 py-3 text-sm text-brand">
              <p>
                {pendingDelete.kind === "category"
                  ? "Bu kategori, alt kategorileri ve içindeki ürünler silinecek."
                  : "Bu ürün silinecek. Görseller kayıt sırasında temizlenir."}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setPendingDelete(null)} className="rounded-full px-3 py-1.5 font-semibold">
                  Vazgeç
                </button>
                <button
                  type="button"
                  onClick={() => (pendingDelete.kind === "category" ? removeCategory(pendingDelete.id) : removeProduct(pendingDelete.id))}
                  className="rounded-full bg-brand px-3 py-1.5 font-semibold text-white"
                >
                  Sil
                </button>
              </div>
            </div>
          ) : null}

          {category ? (
            <CategoryEditor
              catalog={catalog}
              category={category}
              product={product}
              lang={lang}
              rtl={rtl}
              uploading={uploading}
              onChange={(patch, title) => patchCategory(category.id, patch, title)}
              onAddChild={() => addCategory(category.id)}
              onAddProduct={addProduct}
              onOpenProduct={setProductId}
              onMoveProduct={moveProduct}
              onDelete={() => setPendingDelete({ kind: "category", id: category.id })}
              onChangeProduct={(id, patch, title) => patchProduct(id, patch, title)}
              onUpload={uploadImages}
              onDeleteProduct={(id) => setPendingDelete({ kind: "product", id })}
            />
          ) : (
            <section className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
              <h2 className="font-display text-2xl font-bold text-ink">Katalog boş</h2>
              <p className="mt-3 max-w-[46ch] text-sm leading-6 text-muted">
                Kategoriler iç içe açılır. Her kategorinin kendi ürünleri olur. Sitede yalnızca Türkçe başlığı olan ve görünür olanlar yer alır.
              </p>
              <button type="button" onClick={() => addCategory(null)} className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">
                İlk kategoriyi ekle
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function TreeRow({
  catalog,
  category,
  depth,
  selected,
  visibleIds,
  open,
  onToggle,
  onSelect,
  onAdd,
  onMove,
}: {
  catalog: Catalog;
  category: Category;
  depth: number;
  selected: string | null;
  visibleIds: Set<string> | null;
  open: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onAdd: (parentId: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
}) {
  if (visibleIds && !visibleIds.has(category.id)) return null;
  const children = childrenOf(catalog.categories, category.id);
  const count = productsOf(catalog.products, category.id).length;
  const expanded = open.has(category.id) || Boolean(visibleIds);
  const active = selected === category.id;

  return (
    <div>
      <div className={`group flex items-center gap-1 rounded-xl pr-1 ${active ? "bg-[#f6ecec]" : "hover:bg-[#f6f6f7]"}`} style={{ paddingLeft: 8 + depth * 14 }}>
        <button
          type="button"
          aria-label={expanded ? "Alt kategorileri gizle" : "Alt kategorileri aç"}
          onClick={() => onToggle(category.id)}
          className={`grid h-8 w-6 place-items-center text-muted ${children.length ? "" : "invisible"}`}
        >
          <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 transition ${expanded ? "rotate-90" : ""}`} fill="currentColor">
            <path d="M7 4.5 13 10 7 15.5z" />
          </svg>
        </button>
        <button type="button" onClick={() => onSelect(category.id)} className="min-w-0 flex-1 py-2 text-left">
          <span className={`block truncate text-sm font-semibold ${category.visible ? "text-ink" : "text-soft line-through"}`}>
            {category.title.tr || "Adsız kategori"}
          </span>
          <span className="block truncate text-[11px] text-muted">{count ? `${count} ürün` : "Ürün yok"}</span>
        </button>
        <span className="flex shrink-0">
          <IconButton label="Yukarı" onClick={() => onMove(category.id, -1)}>↑</IconButton>
          <IconButton label="Aşağı" onClick={() => onMove(category.id, 1)}>↓</IconButton>
          <IconButton label="Alt kategori" onClick={() => onAdd(category.id)}>+</IconButton>
        </span>
      </div>
      {expanded ? children.map((item) => (
        <TreeRow
          key={item.id}
          catalog={catalog}
          category={item}
          depth={depth + 1}
          selected={selected}
          visibleIds={visibleIds}
          open={open}
          onToggle={onToggle}
          onSelect={onSelect}
          onAdd={onAdd}
          onMove={onMove}
        />
      )) : null}
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className="grid h-7 w-7 place-items-center rounded-lg text-xs font-bold text-muted hover:bg-white hover:text-ink">
      {children}
    </button>
  );
}

function CategoryEditor({
  catalog,
  category,
  product,
  lang,
  rtl,
  uploading,
  onChange,
  onAddChild,
  onAddProduct,
  onOpenProduct,
  onMoveProduct,
  onDelete,
  onChangeProduct,
  onUpload,
  onDeleteProduct,
}: {
  catalog: Catalog;
  category: Category;
  product: Product | null;
  lang: CatalogLang;
  rtl: boolean;
  uploading: boolean;
  onChange: (patch: Partial<Category>, title?: string) => void;
  onAddChild: () => void;
  onAddProduct: () => void;
  onOpenProduct: (id: string | null) => void;
  onMoveProduct: (id: string, direction: -1 | 1) => void;
  onDelete: () => void;
  onChangeProduct: (id: string, patch: Partial<Product>, title?: string) => void;
  onUpload: (files: FileList | null) => void;
  onDeleteProduct: (id: string) => void;
}) {
  const products = productsOf(catalog.products, category.id);
  const crumbs = publicHref(catalog.categories, category);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">{crumbs}</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">{category.title[lang] || category.title.tr || "Adsız kategori"}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onAddChild} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink">
              Alt kategori
            </button>
            <button type="button" onClick={onDelete} className="rounded-full px-4 py-2 text-sm font-semibold text-brand">
              Sil
            </button>
          </div>
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-ink">
          <input type="checkbox" checked={category.visible} onChange={(event) => onChange({ visible: event.target.checked })} />
          Sitede görünsün
        </label>
        <div className="mt-4 grid gap-4" dir={rtl ? "rtl" : "ltr"}>
          <Field label="Başlık">
            <input
              className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm"
              value={category.title[lang]}
              onChange={(event) => onChange({ title: { ...category.title, [lang]: event.target.value } }, lang === "tr" ? event.target.value : undefined)}
            />
          </Field>
          <Field label="Kısa giriş">
            <textarea
              className="field mt-1.5 min-h-24 w-full rounded-xl px-4 py-3 text-sm leading-6"
              value={category.lead[lang]}
              onChange={(event) => onChange({ lead: { ...category.lead, [lang]: event.target.value } })}
            />
          </Field>
        </div>
        <Field label="Adres">
          <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={category.slug} onChange={(event) => onChange({ slug: event.target.value })} />
        </Field>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-ink">Ürünler</h3>
          <button type="button" onClick={onAddProduct} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
            Ürün ekle
          </button>
        </div>
        {products.length ? (
          <ul className="mt-4 space-y-2">
            {products.map((item) => {
              const open = product?.id === item.id;
              return (
                <li key={item.id} className={`overflow-hidden rounded-2xl border transition ${open ? "border-brand bg-[#faf7f7]" : "border-line bg-white hover:border-brand/50"}`}>
                  <div className="flex items-center gap-1 pr-1">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => onOpenProduct(open ? null : item.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left"
                    >
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${open ? "bg-brand text-white" : "bg-[#ececee] text-ink"}`} aria-hidden>
                        <svg viewBox="0 0 20 20" className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className={`block truncate font-semibold ${item.visible ? "text-ink" : "text-soft line-through"}`}>{item.title.tr || "Adsız ürün"}</span>
                        <span className="block truncate text-sm text-muted">{item.summary.tr || item.slug}</span>
                      </span>
                      <span className={`ml-auto shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${open ? "bg-brand text-white" : "bg-[#ececee] text-ink"}`}>
                        {open ? "Kapat" : "Düzenle"}
                      </span>
                    </button>
                    <IconButton label="Yukarı" onClick={() => onMoveProduct(item.id, -1)}>↑</IconButton>
                    <IconButton label="Aşağı" onClick={() => onMoveProduct(item.id, 1)}>↓</IconButton>
                  </div>
                  {open ? (
                    <div className="border-t border-brand/15 px-3 py-4 sm:px-4">
                      <ProductEditor
                        catalog={catalog}
                        category={category}
                        product={item}
                        lang={lang}
                        rtl={rtl}
                        uploading={uploading}
                        embedded
                        onChange={(patch, title) => onChangeProduct(item.id, patch, title)}
                        onUpload={onUpload}
                        onDelete={() => onDeleteProduct(item.id)}
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-6 text-muted">Bu kategoride ürün yok. Alt kategorisi olan bir kategoriye de ürün eklenebilir.</p>
        )}
      </section>
    </div>
  );
}

function ProductEditor({
  catalog,
  category,
  product,
  lang,
  rtl,
  uploading,
  embedded = false,
  onBack,
  onChange,
  onUpload,
  onDelete,
}: {
  catalog: Catalog;
  category: Category;
  product: Product;
  lang: CatalogLang;
  rtl: boolean;
  uploading: boolean;
  embedded?: boolean;
  onBack?: () => void;
  onChange: (patch: Partial<Product>, title?: string) => void;
  onUpload: (files: FileList | null) => void;
  onDelete: () => void;
}) {
  function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= product.images.length) return;
    const images = [...product.images];
    const [row] = images.splice(index, 1);
    images.splice(target, 0, row);
    onChange({ images });
  }

  const card = embedded ? "rounded-2xl border border-line bg-white p-5" : "rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {onBack ? (
          <button type="button" onClick={onBack} className="text-sm font-semibold text-muted hover:text-ink">
            ← {category.title.tr || "Kategori"}
          </button>
        ) : (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">{publicHref(catalog.categories, category, product)}</p>
        )}
        <button type="button" onClick={onDelete} className="text-sm font-semibold text-brand">
          Ürünü sil
        </button>
      </div>

      <section className={card}>
        {onBack ? <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">{publicHref(catalog.categories, category, product)}</p> : null}
        <h2 className={`${onBack ? "mt-1" : ""} font-display text-2xl font-bold text-ink`}>{product.title[lang] || product.title.tr || "Adsız ürün"}</h2>
        <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-ink">
          <input type="checkbox" checked={product.visible} onChange={(event) => onChange({ visible: event.target.checked })} />
          Sitede görünsün
        </label>
        <div className="mt-4 grid gap-4" dir={rtl ? "rtl" : "ltr"}>
          <Field label="Ürün adı">
            <input
              className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm"
              value={product.title[lang]}
              onChange={(event) => onChange({ title: { ...product.title, [lang]: event.target.value } }, lang === "tr" ? event.target.value : undefined)}
            />
          </Field>
          <Field label="Tek cümlelik özet">
            <input
              className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm"
              value={product.summary[lang]}
              onChange={(event) => onChange({ summary: { ...product.summary, [lang]: event.target.value } })}
            />
          </Field>
          <Field label="Genel bakış">
            <textarea
              className="field mt-1.5 min-h-36 w-full rounded-xl px-4 py-3 text-sm leading-6"
              value={product.overview[lang]}
              onChange={(event) => onChange({ overview: { ...product.overview, [lang]: event.target.value } })}
            />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Adres">
            <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={product.slug} onChange={(event) => onChange({ slug: event.target.value })} />
          </Field>
          <Field label="Broşür bağlantısı">
            <input
              className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm"
              value={product.brochure}
              placeholder="https:// veya /dosya.pdf"
              onChange={(event) => onChange({ brochure: event.target.value })}
            />
          </Field>
        </div>
      </section>

      <section className={card}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-ink">Görseller</h3>
          <label className="cursor-pointer rounded-full bg-[#ececee] px-4 py-2 text-sm font-semibold text-ink">
            {uploading ? "Yükleniyor" : "Görsel ekle"}
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" disabled={uploading} onChange={(event) => { onUpload(event.target.files); event.target.value = ""; }} />
          </label>
        </div>
        <p className="mt-2 text-sm text-muted">İlk görsel kapak olur. En fazla 8 görsel, her biri 8 MB.</p>
        {product.images.length ? (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {product.images.map((src, index) => (
              <li key={src} className="overflow-hidden rounded-xl bg-[#ececee]">
                <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-[11px] font-semibold text-muted">{index === 0 ? "Kapak" : index + 1}</span>
                  <span className="flex">
                    <IconButton label="Sola" onClick={() => moveImage(index, -1)}>←</IconButton>
                    <IconButton label="Sağa" onClick={() => moveImage(index, 1)}>→</IconButton>
                    <IconButton label="Görseli kaldır" onClick={() => onChange({ images: product.images.filter((item) => item !== src) })}>×</IconButton>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <PairList
        title="Öne çıkan rakamlar"
        hint="Kapasite, ağırlık, ölçü gibi en fazla 6 değer."
        lang={lang}
        rtl={rtl}
        rows={product.stats}
        left="Etiket"
        right="Değer"
        onChange={(stats) => onChange({ stats: stats.slice(0, 6) })}
        create={(id): CatalogStat => ({ id, label: emptyCopy(), value: emptyCopy() })}
      />
      <NoteList title="Öne çıkanlar" hint="Kısa maddeler. Boş satırlar kayda girmez." lang={lang} rtl={rtl} notes={product.highlights} onChange={(highlights) => onChange({ highlights })} />
      <SpecEditor product={product} lang={lang} rtl={rtl} onChange={(specs) => onChange({ specs })} />
      <NoteList title="Kullanım alanları" hint="Kısa etiketler halinde." lang={lang} rtl={rtl} notes={product.applications} onChange={(applications) => onChange({ applications })} />
    </div>
  );
}

function PairList<T extends { id: string; label: Copy; value: Copy }>({
  title,
  hint,
  lang,
  rtl,
  rows,
  left,
  right,
  onChange,
  create,
}: {
  title: string;
  hint: string;
  lang: CatalogLang;
  rtl: boolean;
  rows: T[];
  left: string;
  right: string;
  onChange: (rows: T[]) => void;
  create: (id: string) => T;
}) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
        <button type="button" onClick={() => onChange([...rows, create(uid())])} className="rounded-full bg-[#ececee] px-4 py-2 text-sm font-semibold text-ink">
          Satır ekle
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">{hint}</p>
      <div className="mt-4 space-y-3" dir={rtl ? "rtl" : "ltr"}>
        {rows.map((row) => (
          <div key={row.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <input className="field h-11 rounded-xl px-3 text-sm" aria-label={left} placeholder={left} value={row.label[lang]} onChange={(event) => onChange(rows.map((item) => (item.id === row.id ? { ...item, label: { ...item.label, [lang]: event.target.value } } : item)))} />
            <input className="field h-11 rounded-xl px-3 text-sm" aria-label={right} placeholder={right} value={row.value[lang]} onChange={(event) => onChange(rows.map((item) => (item.id === row.id ? { ...item, value: { ...item.value, [lang]: event.target.value } } : item)))} />
            <button type="button" onClick={() => onChange(rows.filter((item) => item.id !== row.id))} className="h-11 rounded-xl px-3 text-sm font-semibold text-brand">
              Sil
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function NoteList({ title, hint, lang, rtl, notes, onChange }: { title: string; hint: string; lang: CatalogLang; rtl: boolean; notes: CatalogNote[]; onChange: (notes: CatalogNote[]) => void }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
        <button type="button" onClick={() => onChange([...notes, { id: uid(), text: emptyCopy() }])} className="rounded-full bg-[#ececee] px-4 py-2 text-sm font-semibold text-ink">
          Madde ekle
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">{hint}</p>
      <div className="mt-4 space-y-2" dir={rtl ? "rtl" : "ltr"}>
        {notes.map((note) => (
          <div key={note.id} className="flex gap-2">
            <input
              className="field h-11 min-w-0 flex-1 rounded-xl px-3 text-sm"
              value={note.text[lang]}
              onChange={(event) => onChange(notes.map((item) => (item.id === note.id ? { ...item, text: { ...item.text, [lang]: event.target.value } } : item)))}
            />
            <button type="button" onClick={() => onChange(notes.filter((item) => item.id !== note.id))} className="h-11 rounded-xl px-3 text-sm font-semibold text-brand">
              Sil
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpecEditor({ product, lang, rtl, onChange }: { product: Product; lang: CatalogLang; rtl: boolean; onChange: (specs: SpecGroup[]) => void }) {
  function patchGroup(id: string, patch: Partial<SpecGroup>) {
    onChange(product.specs.map((group) => (group.id === id ? { ...group, ...patch } : group)));
  }
  function patchRow(groupId: string, rowId: string, patch: Partial<SpecRow>) {
    onChange(product.specs.map((group) => (group.id === groupId ? { ...group, rows: group.rows.map((row) => (row.id === rowId ? { ...row, ...patch } : row)) } : group)));
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-ink">Teknik tablo</h3>
        <button type="button" onClick={() => onChange([...product.specs, { id: uid(), title: emptyCopy(), rows: [] }])} className="rounded-full bg-[#ececee] px-4 py-2 text-sm font-semibold text-ink">
          Grup ekle
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">Genel, hazne, konveyör gibi gruplar. Her grubun kendi satırları olur.</p>
      <div className="mt-4 space-y-4">
        {product.specs.map((group) => (
          <div key={group.id} className="rounded-xl border border-line p-4">
            <div className="flex gap-2" dir={rtl ? "rtl" : "ltr"}>
              <input
                className="field h-11 min-w-0 flex-1 rounded-xl px-3 text-sm font-semibold"
                placeholder="Grup adı"
                value={group.title[lang]}
                onChange={(event) => patchGroup(group.id, { title: { ...group.title, [lang]: event.target.value } })}
              />
              <button type="button" onClick={() => onChange(product.specs.filter((item) => item.id !== group.id))} className="h-11 rounded-xl px-3 text-sm font-semibold text-brand">
                Grubu sil
              </button>
            </div>
            <div className="mt-3 space-y-2" dir={rtl ? "rtl" : "ltr"}>
              {group.rows.map((row) => (
                <div key={row.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <input className="field h-11 rounded-xl px-3 text-sm" placeholder="Özellik" value={row.label[lang]} onChange={(event) => patchRow(group.id, row.id, { label: { ...row.label, [lang]: event.target.value } })} />
                  <input className="field h-11 rounded-xl px-3 text-sm" placeholder="Değer" value={row.value[lang]} onChange={(event) => patchRow(group.id, row.id, { value: { ...row.value, [lang]: event.target.value } })} />
                  <button type="button" onClick={() => patchGroup(group.id, { rows: group.rows.filter((item) => item.id !== row.id) })} className="h-11 rounded-xl px-3 text-sm font-semibold text-brand">
                    Sil
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => patchGroup(group.id, { rows: [...group.rows, { id: uid(), label: emptyCopy(), value: emptyCopy() }] })} className="mt-3 text-sm font-semibold text-ink">
              Satır ekle
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-[12px] font-semibold text-ink">
      {label}
      {children}
    </label>
  );
}
