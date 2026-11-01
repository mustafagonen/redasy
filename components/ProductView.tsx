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
      <div className="bg-[#12161b] px-4 py-24 text-center text-white">
        <p>{t("notFound")}</p>
        <Link href="/" className="mt-4 inline-block text-[#d75a23]">
          {t("backHome")}
        </Link>
      </div>
    );
  }

  const category = getCategory(product.category) ?? (product.category === "yedek-parca" ? spareCategory : undefined);
  const parent = product.category === "yedek-parca" ? categories[0] : undefined;
  const photo = photos[active] ?? product.image;

  return (
    <div className="bg-[#12161b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <p className="text-sm text-white/55">
          <Link href="/" className="hover:text-white">
            {t("home")}
          </Link>
          {" / "}
          <Link href="/faaliyet-alanlari" className="hover:text-white">
            {t("areas")}
          </Link>
          {parent ? (
            <>
              {" / "}
              <Link href={parent.href} className="hover:text-white">
                {parent.title[lang]}
              </Link>
            </>
          ) : null}
          {category ? (
            <>
              {" / "}
              <Link href={category.href} className="hover:text-white">
                {category.title[lang]}
              </Link>
            </>
          ) : null}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold leading-tight lg:text-4xl">{product.title[lang]}</h1>
          {product.series ? (
            <span className="rounded-full bg-[#d75a23] px-3 py-1 text-xs font-semibold tracking-wide">{product.series[lang]}</span>
          ) : null}
          {product.code ? <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{product.code}</span> : null}
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative overflow-hidden rounded-[24px] bg-black/20">
              <img src={photo} alt={product.title[lang]} className="aspect-[16/10] w-full object-cover" />
              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="absolute start-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-xl"
                    onClick={() => setActive((value) => (value + photos.length - 1) % photos.length)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="absolute end-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-xl"
                    onClick={() => setActive((value) => (value + 1) % photos.length)}
                  >
                    ›
                  </button>
                </>
              ) : null}
              <span className="absolute bottom-3 end-3 rounded-lg bg-black/55 px-2 py-1 text-xs">
                0{active + 1}/0{photos.length}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-xl border ${i === active ? "border-[#d75a23]" : "border-white/10"}`}
                >
                  <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.12em] text-[#d75a23]">{product.eyebrow?.[lang]}</h2>
            <p className="mt-3 text-sm leading-7 text-white/75">{product.body?.[lang]}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.specs?.map((spec) => (
                <div key={spec.label.tr} className="flex gap-2 text-sm leading-5">
                  <span className="mt-0.5 text-[#d75a23]">✓</span>
                  <p>
                    <span className="font-semibold text-white">{spec.label[lang]}: </span>
                    <span className="text-white/75">{spec.value[lang]}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => openQuote(product.title[lang])}
                className="rounded-full bg-[#d75a23] px-5 py-3 text-sm font-semibold hover:bg-[#c24e1c]"
              >
                {t("quote")} →
              </button>
              <Link
                href={`/urun/${product.slug}/katalog`}
                className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold hover:border-white"
              >
                {t(product.catalogLabel ?? "catalog")} ↓
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
