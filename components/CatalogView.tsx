import type { CSSProperties } from "react";
import { CategoryGlyph } from "@/components/CategoryGlyph";
import { ProductGallery } from "@/components/ProductGallery";
import {
  childrenOf,
  coverImage,
  productListHref,
  productsOf,
  publicHref,
  type Catalog,
  type Category,
  type Copy,
  type Product,
} from "@/lib/catalog";
import { pick, type Locale } from "@/lib/locale";
import { phrase, ui } from "@/lib/messages";

function say(copy: Copy, locale: Locale) {
  return pick(copy, locale);
}

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

function codeOf(product: Product, locale: Locale) {
  const stat = product.stats.find((item) => item.label.tr === "Kod");
  return stat ? say(stat.value, locale) : "";
}

function seriesOf(product: Product, locale: Locale) {
  const stat = product.stats.find((item) => item.label.tr === "Seri");
  return stat ? say(stat.value, locale) : "";
}

function Crumbs({ catalog, crumbs, tone, locale }: { catalog: Catalog; crumbs: Category[]; tone: "brand" | "ink"; locale: Locale }) {
  const quiet = tone === "brand" ? "text-on-brand/60" : "text-soft";
  const link = tone === "brand" ? "hover:text-on-brand" : "hover:text-ink";
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold uppercase tracking-[0.16em] ${quiet}`}>
      <a href="/urunler" className={link}>{ui(locale).activities}</a>
      {crumbs.map((item) => (
        <span key={item.id} className="flex items-center gap-2">
          <span aria-hidden>/</span>
          <a href={publicHref(catalog.categories, item)} className={link}>{say(item.title, locale)}</a>
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

function CardWatermark({ src }: { src: string }) {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      <img src={src} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover grayscale opacity-[0.14]" />
      <img
        src={src}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:opacity-40"
        style={{ clipPath: "polygon(46% 0, 100% 0, 100% 100%, 28% 100%)" }}
      />
      <span className="absolute inset-0 bg-gradient-to-r from-caption from-35% via-caption/88 via-60% to-caption/25" />
    </span>
  );
}

function ShowcaseCard({ href, mark, kicker, title, lead, points = [], meta, locale }: { href: string; mark?: string; kicker: string; title: string; lead: string; points?: string[]; meta: string; locale: Locale }) {
  return (
    <a href={href} className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden border border-line bg-caption p-4 sm:p-5">
      {mark ? <CardWatermark src={mark} /> : null}
      <div className="relative">
        <p data-theme="brand" className="text-[10px] font-bold tracking-[0.16em] text-brand">{kicker}</p>
        <h2 data-theme="ink" className="mt-1.5 font-display text-[15px] font-bold uppercase leading-snug text-ink">{title}</h2>
        {points.length ? (
          <ul className="mt-3 space-y-1">
            {points.slice(0, 4).map((point) => (
              <li key={point} className="flex gap-2 text-[13px] leading-5 text-muted">
                <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : lead ? (
          <p data-theme="muted" className="mt-2 line-clamp-2 text-[13px] leading-5 text-muted">{lead}</p>
        ) : null}
      </div>
      <div className="relative mt-4 flex items-center justify-between gap-3">
        <span data-theme="soft" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-soft">{meta}</span>
        <span className="rounded-full bg-brand px-3 py-1.5 text-[13px] font-semibold text-on-brand group-hover:bg-brand-hover">{ui(locale).details}</span>
      </div>
    </a>
  );
}

function frameSrc(category: Category) {
  return frames[category.id]?.src || frames[category.slug]?.src || "";
}

function groupShot(catalog: Catalog, group: Category, area: Category) {
  return group.image || frameSrc(group) || coverImage(catalog, group.id) || frameSrc(area) || landingShot.src;
}

function GroupFilm({
  catalog,
  area,
  groups,
  activeId,
  locale,
}: {
  catalog: Catalog;
  area: Category;
  groups: Category[];
  activeId: string;
  locale: Locale;
}) {
  const sources = groups.map((group) => groupShot(catalog, group, area));

  return (
    <div className="grid h-[188px] overflow-hidden bg-[#1c1917] sm:h-[210px] lg:h-[228px]" style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}>
      {groups.map((group, index) => {
        const active = group.id === activeId;
        const src = sources[index];
        return (
          <a
            key={group.id}
            href={publicHref(catalog.categories, group)}
            aria-current={active ? "page" : undefined}
            aria-label={say(group.title, locale)}
            className="group relative min-w-0 overflow-hidden"
          >
            <img src={src} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover grayscale" />
            <img
              src={src}
              alt=""
              draggable={false}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
          </a>
        );
      })}
    </div>
  );
}

function RootTabs({ catalog, roots, activeId, locale }: { catalog: Catalog; roots: Category[]; activeId: string; locale: Locale }) {
  return (
    <nav
      aria-label={ui(locale).groups}
      className={`grid gap-3 sm:gap-4 ${roots.length === 1 ? "grid-cols-1" : "grid-cols-2"} md:[grid-template-columns:repeat(var(--tab-cols),minmax(0,1fr))]`}
      style={{ "--tab-cols": String(roots.length) } as CSSProperties}
    >
      {roots.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            href={publicHref(catalog.categories, item)}
            aria-current={active ? "page" : undefined}
            className={`flex h-[52px] items-center justify-center gap-2 rounded-none border px-5 text-center transition ${active ? "border-brand bg-brand text-white" : "border-line bg-white text-ink/80 hover:border-brand/35 hover:text-ink"}`}
          >
            <CategoryGlyph id={item.icon} className="h-4 w-4 shrink-0" />
            <span className="text-[12.5px] font-semibold uppercase leading-none tracking-[0.08em] sm:text-[13px]">{say(item.title, locale)}</span>
          </a>
        );
      })}
    </nav>
  );
}

function SiblingBar({ catalog, category, locale }: { catalog: Catalog; category: Category; locale: Locale }) {
  const siblings = visibleCategories(catalog, category.parentId);
  if (siblings.length < 2) return null;
  const wide = siblings.length === 2;

  return (
    <nav aria-label={ui(locale).siblingGroups} data-theme="paper" className="border-b border-line bg-paper">
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
              {say(item.title, locale)}
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
  locale = "tr",
}: {
  catalog: Catalog;
  category: Category | null;
  crumbs: Category[];
  mode: "tree" | "products";
  locale?: Locale;
}) {
  const parentId = category?.id ?? null;
  const categories = visibleCategories(catalog, parentId);
  const products = parentId ? visibleProducts(catalog, parentId) : [];
  const copy = ui(locale);
  const title = category ? say(category.title, locale) : copy.products;
  const lead = category ? say(category.lead, locale) : "";
  const showingProducts = mode === "products";
  const hero = (category && frames[category.id]) || landingShot;
  const roots = visibleCategories(catalog, null);
  const area = !category ? roots[0] ?? null : category.parentId === null ? category : roots.find((item) => item.id === category.parentId) ?? null;
  const activity = Boolean(area) && (!category || category.id === area?.id || category.parentId === area?.id);

  if (activity && area) {
    const childGroups = visibleCategories(catalog, area.id);
    const groups = childGroups.length ? childGroups : [area];
    const activeGroup = groups.find((item) => item.id === category?.id) ?? groups[0];
    const listed = visibleProducts(catalog, activeGroup.id);
    return (
      <article>
        <header>
          <GroupFilm catalog={catalog} area={area} groups={groups} activeId={activeGroup.id} locale={locale} />
        </header>
        <section data-theme="surface" className="bg-surface">
          <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-6 sm:px-8 sm:pt-8 lg:pb-16">
            <h1 className="font-display text-[1.7rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[2.05rem]">{say(area.title, locale)}</h1>
            <div className="mt-4"><RootTabs catalog={catalog} roots={groups} activeId={activeGroup.id} locale={locale} /></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:mt-6">
            {listed.length ? (
              listed.map((product, index) => (
                <ShowcaseCard
                  key={product.id}
                  href={publicHref(catalog.categories, activeGroup ?? area, product)}
                  mark={product.images[0] || frames[activeGroup?.id ?? ""]?.src || frames[area.id]?.src || coverImage(catalog, activeGroup?.id ?? area.id)}
                  kicker={codeOf(product, locale) || String(index + 1).padStart(2, "0")}
                  title={say(product.title, locale)}
                  lead={say(product.summary, locale)}
                  points={product.highlights.map((item) => say(item.text, locale)).filter(Boolean)}
                  meta={copy.product}
                  locale={locale}
                />
              ))
            ) : (
              <p data-theme="muted" className="text-sm leading-7 text-muted">{copy.unpublished}</p>
            )}
            </div>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article>
      <header data-theme="brand" className="bg-brand text-on-brand">
        <div className="grid lg:min-h-[520px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col justify-between px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <Crumbs catalog={catalog} crumbs={category ? crumbs.slice(0, -1) : []} tone="brand" locale={locale} />
            <div className="mt-10 lg:mt-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-on-brand/55">{showingProducts ? copy.products : category ? copy.group : "REDASY"}</p>
              <h1 className="mt-3 max-w-[16ch] font-display text-[2.3rem] font-extrabold uppercase leading-[0.92] tracking-tight sm:text-[3.2rem] lg:text-[3.6rem]">{title}</h1>
              {lead ? <p className="mt-5 max-w-[38rem] text-balance text-[17px] leading-8 text-on-brand/78">{lead}</p> : null}
            </div>
            <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.18em] text-on-brand/55">
              {showingProducts ? copy.productCount(products.length) : categories.length ? copy.groupCount(categories.length) : "REDASY"}
            </p>
          </div>
          <div className="relative min-h-[260px] bg-brand sm:min-h-[360px] lg:min-h-full">
            <Frame src={hero.src} alt={phrase(hero.alt, locale)} />
          </div>
        </div>
      </header>

      {category ? <SiblingBar catalog={catalog} category={category} locale={locale} /> : null}

      {!showingProducts && categories.length ? (
        <section data-theme="surface" className="bg-surface">
          <div className="mx-auto grid max-w-[1200px] gap-5 px-5 py-12 sm:px-8 md:grid-cols-2 lg:py-16">
            {categories.map((item, index) => {
              const nested = visibleCategories(catalog, item.id);
              const ownProducts = visibleProducts(catalog, item.id);
              const href = nested.length ? publicHref(catalog.categories, item) : productListHref(catalog.categories, item);
              const mark = category ? undefined : frames[item.id];
              return (
                <ShowcaseCard
                  key={item.id}
                  href={href}
                  mark={mark?.src}
                  kicker={String(index + 1).padStart(2, "0")}
                  title={say(item.title, locale)}
                  lead={say(item.lead, locale)}
                  meta={nested.length ? copy.childGroupCount(nested.length) : ownProducts.length ? copy.productCount(ownProducts.length) : copy.group}
                  locale={locale}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      {!showingProducts && category && products.length ? (
        <section data-theme="paper" className="border-t border-line bg-paper">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-8">
            <div>
              <p data-theme="soft" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-soft">{copy.productsInGroup}</p>
              <p data-theme="ink" className="mt-1 font-display text-2xl font-bold text-ink">{copy.productCount(products.length)}</p>
            </div>
            <a href={productListHref(catalog.categories, category)} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand hover:bg-brand-hover">
              {copy.seeProducts}
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
                  {copy.backToGroup}
                </a>
              </div>
            ) : null}
            {products.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {products.map((product) => (
                  <ProductTile key={product.id} catalog={catalog} category={category} product={product} locale={locale} />
                ))}
              </div>
            ) : (
              <p data-theme="muted" className="text-sm leading-7 text-muted">{copy.emptyGroup}</p>
            )}
          </div>
        </section>
      ) : null}

      {!showingProducts && !categories.length && !products.length ? (
        <section data-theme="surface" className="bg-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10">
            <p data-theme="ink" className="max-w-[18ch] font-display text-[1.8rem] font-extrabold uppercase leading-[1.05] text-ink sm:text-[2.4rem]">{copy.unpublished}</p>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function ProductTile({ catalog, category, product, locale }: { catalog: Catalog; category: Category; product: Product; locale: Locale }) {
  const points = product.highlights.filter((item) => say(item.text, locale)).slice(0, 4);
  const code = codeOf(product, locale);
  const copy = ui(locale);

  return (
    <a href={publicHref(catalog.categories, category, product)} className="group flex min-h-[250px] flex-col justify-between border border-line bg-surface p-6 sm:p-7">
      <div>
        {code ? <p data-theme="brand" className="text-[11px] font-bold tracking-[0.16em] text-brand">{code}</p> : null}
        <h2 data-theme="ink" className="mt-2 font-display text-xl font-extrabold uppercase leading-tight text-ink sm:text-[1.45rem]">{say(product.title, locale)}</h2>
        {points.length ? (
          <ul className="mt-4 space-y-1.5">
            {points.map((item) => (
              <li key={item.id} data-theme="body" className="flex gap-2 text-sm leading-6 text-body">
                <span data-theme="brand" className="mt-2.5 h-px w-3 shrink-0 bg-brand" />
                <span>{say(item.text, locale)}</span>
              </li>
            ))}
          </ul>
        ) : say(product.summary, locale) ? (
          <p data-theme="muted" className="mt-4 text-sm leading-6 text-muted">{say(product.summary, locale)}</p>
        ) : null}
      </div>
      <span data-theme="brand" className="mt-6 text-sm font-semibold text-brand">{copy.details} →</span>
    </a>
  );
}

export function ProductView({ catalog, product, category, crumbs, locale = "tr" }: { catalog: Catalog; product: Product; category: Category; crumbs: Category[]; locale?: Locale }) {
  const copy = ui(locale);
  const siblings = visibleProducts(catalog, category.id).filter((item) => item.id !== product.id).slice(0, 4);
  const specs = product.specs.flatMap((group) => group.rows.filter((row) => say(row.label, locale) || say(row.value, locale)));
  const listHref = productListHref(catalog.categories, category);
  const code = codeOf(product, locale);
  const series = seriesOf(product, locale);

  return (
    <article data-theme="surface" className="bg-surface">
      <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 lg:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
            <a href="/" className="hover:text-ink">{copy.home}</a>
            {crumbs.map((item) => (
              <span key={item.id} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <a href={publicHref(catalog.categories, item)} className="hover:text-ink">{say(item.title, locale)}</a>
              </span>
            ))}
          </p>
          <a href={listHref} className="inline-flex items-center gap-2 border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink hover:border-brand">
            ← {copy.backToCategory}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 data-theme="ink" className="font-display text-[1.7rem] font-extrabold leading-tight text-ink sm:text-[2.15rem]">{say(product.title, locale)}</h1>
          {series ? <span className="bg-brand px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-on-brand">{series}</span> : null}
          {code ? <span className="border border-line bg-paper px-3 py-1.5 text-[12px] font-semibold text-ink">{code}</span> : null}
        </div>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
          {product.images.length ? (
            <ProductGallery images={product.images} alt={say(product.title, locale)} framed locale={locale} />
          ) : (
            <div className="flex aspect-[4/3] items-end border border-line bg-paper p-5">
              <p className="text-sm font-semibold text-muted">{say(product.title, locale)}</p>
            </div>
          )}
          <div className="border border-line bg-white p-5 sm:p-6">
            {say(product.summary, locale) ? <p data-theme="brand" className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand">{say(product.summary, locale)}</p> : null}
            {say(product.overview, locale) ? <p data-theme="body" className="mt-3 whitespace-pre-line text-[15px] leading-7 text-body">{say(product.overview, locale)}</p> : null}
            {specs.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {specs.map((row) => (
                  <div key={row.id} className="border border-line bg-paper px-3.5 py-3">
                    {say(row.label, locale) ? (
                      <p className="flex items-center gap-2 text-[12px] text-muted">
                        <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3.5 8.2 6.4 11 12.5 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {say(row.label, locale)}
                      </p>
                    ) : null}
                    <p data-theme="ink" className="mt-1 pl-[1.35rem] text-sm font-semibold leading-6 text-ink">{say(row.value, locale)}</p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className={`mt-5 grid gap-3 ${product.brochure ? "sm:grid-cols-2" : ""}`}>
              <a href="/#iletisim" className="inline-flex items-center justify-center bg-brand px-4 py-3 text-center text-sm font-semibold text-on-brand hover:bg-brand-hover">
                {copy.quote} →
              </a>
              {product.brochure ? (
                <a href={product.brochure} className="inline-flex items-center justify-center border border-line px-4 py-3 text-center text-sm font-semibold text-ink hover:border-brand">
                  {copy.brochure}
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
                <p data-theme="soft" className="text-[12px] font-semibold uppercase tracking-[0.18em] text-soft">{copy.related}</p>
                <h2 data-theme="ink" className="mt-2 font-display text-[1.6rem] font-extrabold uppercase tracking-tight text-ink">{say(category.title, locale)}</h2>
              </div>
              <a href={listHref} data-theme="brand" className="text-sm font-semibold text-brand">{copy.seeAll} →</a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((item) => (
                <a key={item.id} href={publicHref(catalog.categories, category, item)} className="border border-line bg-surface p-4">
                  {codeOf(item, locale) ? <p data-theme="brand" className="text-[11px] font-bold tracking-[0.14em] text-brand">{codeOf(item, locale)}</p> : null}
                  <h3 data-theme="ink" className="mt-2 font-display text-base font-bold uppercase leading-tight text-ink">{say(item.title, locale)}</h3>
                  {say(item.summary, locale) ? <p data-theme="muted" className="mt-2 line-clamp-2 text-xs leading-5 text-muted">{say(item.summary, locale)}</p> : null}
                  <span data-theme="brand" className="mt-3 block text-xs font-semibold text-brand">{copy.inspect} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
