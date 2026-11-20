import { ProductGallery } from "@/components/ProductGallery";
import {
  childrenOf,
  productListHref,
  productsOf,
  publicHref,
  type Catalog,
  type Category,
  type Product,
} from "@/lib/catalog";

const frames: Record<string, { src: string; alt: string }> = {
  kirma: { src: "/images/home/panels/kirma-1795010691119.jpg", alt: "Mobil kırma ve eleme sistemleri" },
  "kirma-makine": { src: "/images/home/panels/kirma-1795010691119.jpg", alt: "Mobil kırma ve eleme sistemleri" },
  "kirma-yedek": { src: "/images/home/panels/kirma-1795010691119.jpg", alt: "Mobil kırma ve eleme sistemleri" },
  atasman: { src: "/images/home/atasman-color.jpg", alt: "İş makinesi ataşmanları" },
  arac: { src: "/images/home/arac-color.jpg", alt: "Araç üstü ekipmanlar" },
  mobil: { src: "/images/home/mobil-color.jpg", alt: "Mobil çözümler" },
};

const landingShot = { src: "/images/home/atolye.jpg", alt: "Atölyede kaynak yapan çalışanlar" };

function visibleCategories(catalog: Catalog, parentId: string | null) {
  return childrenOf(catalog.categories, parentId).filter((item) => item.visible && item.title.tr);
}

function visibleProducts(catalog: Catalog, categoryId: string) {
  return productsOf(catalog.products, categoryId).filter((item) => item.visible && item.title.tr);
}

function codeOf(product: Product) {
  return product.stats.find((item) => item.label.tr === "Kod")?.value.tr || "";
}

function seriesOf(product: Product) {
  return product.stats.find((item) => item.label.tr === "Seri")?.value.tr || "";
}

function Crumbs({ catalog, crumbs, tone }: { catalog: Catalog; crumbs: Category[]; tone: "brand" | "ink" }) {
  const quiet = tone === "brand" ? "text-on-brand/60" : "text-soft";
  const link = tone === "brand" ? "hover:text-on-brand" : "hover:text-ink";
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold uppercase tracking-[0.16em] ${quiet}`}>
      <a href="/urunler" className={link}>Ürünler</a>
      {crumbs.map((item) => (
        <span key={item.id} className="flex items-center gap-2">
          <span aria-hidden>/</span>
          <a href={publicHref(catalog.categories, item)} className={link}>{item.title.tr}</a>
        </span>
      ))}
    </p>
  );
}

function Frame({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover grayscale lg:hidden" style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }} />
      <img src={src} alt="" className="absolute inset-0 hidden h-full w-full object-cover grayscale lg:block" style={{ clipPath: "polygon(13% 0, 100% 0, 100% 100%, 0 100%)" }} />
    </>
  );
}

function SiblingBar({ catalog, category }: { catalog: Catalog; category: Category }) {
  const siblings = visibleCategories(catalog, category.parentId);
  if (siblings.length < 2) return null;
  const wide = siblings.length === 2;

  return (
    <nav aria-label="Aynı seviyedeki gruplar" data-theme="paper" className="border-b border-line bg-paper">
      <div className={`mx-auto max-w-[1200px] px-5 py-5 sm:px-8 ${wide ? "grid gap-3 md:grid-cols-2" : "flex gap-3 overflow-x-auto [scrollbar-width:none]"}`}>
        {siblings.map((item) => {
          const active = item.id === category.id;
          const href = visibleCategories(catalog, item.id).length ? publicHref(catalog.categories, item) : productListHref(catalog.categories, item);
          return (
            <a
              key={item.id}
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                wide
                  ? `px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.12em] sm:text-[15px] ${active ? "bg-brand text-on-brand" : "border border-line bg-surface text-ink hover:border-brand"}`
                  : `shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] ${active ? "border-brand bg-brand text-on-brand" : "border-line bg-surface text-ink hover:border-brand"}`
              }
            >
              {item.title.tr}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function CatalogView({
  catalog,
  category,
  crumbs,
  mode,
}: {
  catalog: Catalog;
  category: Category | null;
  crumbs: Category[];
  mode: "tree" | "products";
}) {
  const parentId = category?.id ?? null;
  const categories = visibleCategories(catalog, parentId);
  const products = parentId ? visibleProducts(catalog, parentId) : [];
  const title = category?.title.tr || "Ürünler";
  const lead = category?.lead.tr || "";
  const showingProducts = mode === "products";
  const hero = (category && frames[category.id]) || landingShot;

  return (
    <article>
      <header data-theme="brand" className="bg-brand text-on-brand">
        <div className="grid lg:min-h-[520px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col justify-between px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <Crumbs catalog={catalog} crumbs={category ? crumbs.slice(0, -1) : []} tone="brand" />
            <div className="mt-10 lg:mt-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-on-brand/55">{showingProducts ? "Ürünler" : category ? "Grup" : "REDASY"}</p>
              <h1 className="mt-3 max-w-[16ch] font-display text-[2.3rem] font-extrabold uppercase leading-[0.92] tracking-tight sm:text-[3.2rem] lg:text-[3.6rem]">{title}</h1>
              {lead ? <p className="mt-5 max-w-[38rem] text-balance text-[17px] leading-8 text-on-brand/78">{lead}</p> : null}
            </div>
            <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.18em] text-on-brand/55">
              {showingProducts ? `${products.length} ürün` : categories.length ? `${categories.length} grup` : "REDASY"}
            </p>
          </div>
          <div className="relative min-h-[260px] bg-brand sm:min-h-[360px] lg:min-h-full">
            <Frame src={hero.src} alt={hero.alt} />
          </div>
        </div>
      </header>

      {category ? <SiblingBar catalog={catalog} category={category} /> : null}

      {!showingProducts && categories.length ? (
        <section data-theme="surface" className="bg-surface">
          <div className="mx-auto grid max-w-[1200px] gap-5 px-5 py-12 sm:px-8 md:grid-cols-2 lg:py-16">
            {categories.map((item, index) => {
              const nested = visibleCategories(catalog, item.id);
              const ownProducts = visibleProducts(catalog, item.id);
              const href = nested.length ? publicHref(catalog.categories, item) : productListHref(catalog.categories, item);
              return (
                <a key={item.id} href={href} className="group flex min-h-[240px] flex-col justify-between border border-line bg-caption p-6 sm:p-7">
                  <div>
                    <p data-theme="brand" className="text-[11px] font-bold tracking-[0.18em] text-brand">{String(index + 1).padStart(2, "0")}</p>
                    <h2 data-theme="ink" className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight text-ink">{item.title.tr}</h2>
                    {item.lead.tr ? <p data-theme="muted" className="mt-3 max-w-[48ch] text-sm leading-6 text-muted">{item.lead.tr}</p> : null}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span data-theme="soft" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-soft">
                      {nested.length ? `${nested.length} alt grup` : ownProducts.length ? `${ownProducts.length} ürün` : "Grup"}
                    </span>
                    <span className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-on-brand group-hover:bg-brand-hover">Detayları incele</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      ) : null}

      {!showingProducts && category && products.length ? (
        <section data-theme="paper" className="border-t border-line bg-paper">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-8">
            <div>
              <p data-theme="soft" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-soft">Bu gruba bağlı ürünler</p>
              <p data-theme="ink" className="mt-1 font-display text-2xl font-bold text-ink">{products.length} ürün</p>
            </div>
            <a href={productListHref(catalog.categories, category)} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand hover:bg-brand-hover">
              Ürünleri gör
            </a>
          </div>
        </section>
      ) : null}

      {showingProducts && category ? (
        <section data-theme="surface" className="bg-surface">
          <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:py-16">
            {categories.length ? (
              <div className="mb-6 flex justify-end">
                <a href={publicHref(catalog.categories, category)} className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">
                  Gruba dön
                </a>
              </div>
            ) : null}
            {products.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {products.map((product) => (
                  <ProductTile key={product.id} catalog={catalog} category={category} product={product} />
                ))}
              </div>
            ) : (
              <p data-theme="muted" className="text-sm leading-7 text-muted">Bu grupta yayında ürün yok.</p>
            )}
          </div>
        </section>
      ) : null}

      {!showingProducts && !categories.length && !products.length ? (
        <section data-theme="surface" className="bg-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10">
            <p data-theme="ink" className="max-w-[18ch] font-display text-[1.8rem] font-extrabold uppercase leading-[1.05] text-ink sm:text-[2.4rem]">Bu bölüm henüz yayında değil.</p>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function ProductTile({ catalog, category, product }: { catalog: Catalog; category: Category; product: Product }) {
  const points = product.highlights.filter((item) => item.text.tr).slice(0, 4);
  const code = codeOf(product);

  return (
    <a href={publicHref(catalog.categories, category, product)} className="group flex min-h-[250px] flex-col justify-between border border-line bg-surface p-6 sm:p-7">
      <div>
        {code ? <p data-theme="brand" className="text-[11px] font-bold tracking-[0.16em] text-brand">{code}</p> : null}
        <h2 data-theme="ink" className="mt-2 font-display text-xl font-extrabold uppercase leading-tight text-ink sm:text-[1.45rem]">{product.title.tr}</h2>
        {points.length ? (
          <ul className="mt-4 space-y-1.5">
            {points.map((item) => (
              <li key={item.id} data-theme="body" className="flex gap-2 text-sm leading-6 text-body">
                <span data-theme="brand" className="mt-2.5 h-px w-3 shrink-0 bg-brand" />
                <span>{item.text.tr}</span>
              </li>
            ))}
          </ul>
        ) : product.summary.tr ? (
          <p data-theme="muted" className="mt-4 text-sm leading-6 text-muted">{product.summary.tr}</p>
        ) : null}
      </div>
      <span data-theme="brand" className="mt-6 text-sm font-semibold text-brand">Detayları incele →</span>
    </a>
  );
}

export function ProductView({ catalog, product, category, crumbs }: { catalog: Catalog; product: Product; category: Category; crumbs: Category[] }) {
  const siblings = visibleProducts(catalog, category.id).filter((item) => item.id !== product.id).slice(0, 4);
  const specs = product.specs.flatMap((group) => group.rows.filter((row) => row.label.tr || row.value.tr));
  const listHref = productListHref(catalog.categories, category);
  const code = codeOf(product);
  const series = seriesOf(product);

  return (
    <article data-theme="surface" className="bg-surface">
      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Crumbs catalog={catalog} crumbs={crumbs} tone="ink" />
          <a href={listHref} className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">
            Kategoriye dön
          </a>
        </div>
        <p data-theme="brand" className="mt-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand">{category.title.tr}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 data-theme="ink" className="max-w-[22ch] font-display text-[2rem] font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-[2.7rem]">{product.title.tr}</h1>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {series ? <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-on-brand">{series}</span> : null}
          {code ? <span data-theme="ink" className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-ink">{code}</span> : null}
        </div>

        <div className={`mt-8 grid items-start gap-8 ${product.images.length ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : ""}`}>
          {product.images.length ? <ProductGallery images={product.images} alt={product.title.tr} framed /> : null}
          <div>
            {product.summary.tr ? <p data-theme="brand" className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">{product.summary.tr}</p> : null}
            {product.overview.tr ? <p data-theme="body" className="mt-4 max-w-[68ch] whitespace-pre-line text-[16px] leading-8 text-body">{product.overview.tr}</p> : null}
            {specs.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {specs.map((row) => (
                  <div key={row.id} data-theme="paper" className="border border-line bg-paper px-4 py-3.5">
                    {row.label.tr ? <p data-theme="muted" className="text-[12px] text-muted">{row.label.tr}</p> : null}
                    <p data-theme="ink" className="mt-1 text-sm font-semibold leading-6 text-ink">{row.value.tr}</p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/#iletisim" className="inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-on-brand hover:bg-brand-hover">
                Teklif al / Bilgi iste →
              </a>
              {product.brochure ? (
                <a href={product.brochure} className="inline-flex items-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-brand">
                  Teknik katalog
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {siblings.length ? (
        <section data-theme="paper" className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p data-theme="soft" className="text-[12px] font-semibold uppercase tracking-[0.18em] text-soft">Aynı kategorideki diğer ürünler</p>
                <h2 data-theme="ink" className="mt-2 font-display text-[1.6rem] font-extrabold uppercase tracking-tight text-ink">{category.title.tr}</h2>
              </div>
              <a href={listHref} data-theme="brand" className="text-sm font-semibold text-brand">Tümünü gör →</a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((item) => (
                <a key={item.id} href={publicHref(catalog.categories, category, item)} className="border border-line bg-surface p-4">
                  {codeOf(item) ? <p data-theme="brand" className="text-[11px] font-bold tracking-[0.14em] text-brand">{codeOf(item)}</p> : null}
                  <h3 data-theme="ink" className="mt-2 font-display text-base font-bold uppercase leading-tight text-ink">{item.title.tr}</h3>
                  {item.summary.tr ? <p data-theme="muted" className="mt-2 line-clamp-2 text-xs leading-5 text-muted">{item.summary.tr}</p> : null}
                  <span data-theme="brand" className="mt-3 block text-xs font-semibold text-brand">İncele →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
