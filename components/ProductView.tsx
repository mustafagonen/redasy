"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, getCategory, getProduct, spareCategory } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useQuote } from "./Providers";

export function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const { t, lang } = useI18n();
  const { openQuote } = useQuote();
  const photos = useMemo(() => {
    if (!product) return [];
    return Array.from(new Set([product.hero, product.image].filter(Boolean))) as string[];
  }, [product]);
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <div className="bg-paper px-4 py-24 text-center text-ink">
        <p>{t("notFound")}</p>
        <Link href="/" className="mt-4 inline-block text-burgundy">
          {t("backHome")}
        </Link>
      </div>
    );
  }

  const category = getCategory(product.category) ?? (product.category === "yedek-parca" ? spareCategory : undefined);
  const parent = product.category === "yedek-parca" ? categories[0] : undefined;
  const photo = photos[active] ?? product.image;

  return (
    <div className="bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
        <p className="text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            {t("home")}
          </Link>
          {" / "}
          <Link href="/faaliyet-alanlari" className="hover:text-ink">
            {t("areas")}
          </Link>
          {parent ? (
            <>
              {" / "}
              <Link href={parent.href} className="hover:text-ink">
                {parent.title[lang]}
              </Link>
            </>
          ) : null}
          {category ? (
            <>
              {" / "}
              <Link href={category.href} className="hover:text-ink">
                {category.title[lang]}
              </Link>
            </>
          ) : null}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight lg:text-4xl">{product.title[lang]}</h1>
          {product.series ? (
            <span className="bg-burgundy px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white uppercase">{product.series[lang]}</span>
          ) : null}
          {product.code ? <span className="border border-line bg-white px-3 py-1 text-[11px] font-semibold tracking-wide">{product.code}</span> : null}
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative flex items-center justify-center bg-[#f3f0eb] p-4">
              <img src={photo} alt={product.title[lang]} className="max-h-[460px] w-full object-contain" />
              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="absolute start-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/90 text-lg text-ink"
                    onClick={() => setActive((value) => (value + photos.length - 1) % photos.length)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="absolute end-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/90 text-lg text-ink"
                    onClick={() => setActive((value) => (value + 1) % photos.length)}
                  >
                    ›
                  </button>
                </>
              ) : null}
              <span className="absolute bottom-3 end-3 bg-deep/80 px-2 py-1 text-xs text-white">
                0{active + 1}/0{photos.length}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`overflow-hidden border ${i === active ? "border-burgundy" : "border-line"}`}
                >
                  <img src={src} alt="" className="aspect-[4/3] w-full bg-[#f3f0eb] object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="kicker">{product.eyebrow?.[lang]}</h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">{product.body?.[lang]}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.specs?.map((spec) => {
                const tone = spec.tone === "burgundy" ? "text-burgundy" : spec.tone === "muted" ? "text-muted" : "text-ink";
                const tick = spec.tick ?? "before";
                return (
                  <div key={spec.label.tr} className={`border border-line bg-white px-4 py-3 text-sm leading-5 ${tone}`}>
                    <p className="flex items-start gap-2 font-semibold">
                      {tick === "before" ? <span className="text-burgundy">✓</span> : null}
                      <span>{spec.label[lang]}</span>
                      {tick === "after" ? <span className="text-burgundy">✓</span> : null}
                    </p>
                    <p className="mt-1 ps-5 text-muted">{spec.value[lang]}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => openQuote(product.title[lang])} className="btn btn-fill">
                {t("quote")}
                <span aria-hidden>→</span>
              </button>
              <Link href={`/urun/${product.slug}/katalog`} className="btn btn-line text-ink">
                {t(product.catalogLabel ?? "catalog")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
