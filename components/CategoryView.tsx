"use client";

import Link from "next/link";
import { useState } from "react";
import { getProduct, type Category } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

const cols = {
  2: "lg:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

export function CategoryView({ category, parent }: { category: Category; parent?: Category }) {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<string>("all");
  const crumbs = parent ?? category;
  const items = category.productSlugs
    .map((slug) => getProduct(slug))
    .filter((item) => item && (filter === "all" || !item.group || item.group === filter));

  return (
    <div className="bg-[#12161b]">
      <section className="relative overflow-hidden bg-[#191e24]">
        <img src={category.hero} alt="" className="absolute inset-y-0 end-0 hidden h-full w-[54%] object-cover md:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191e24] via-[#191e24]/88 to-[#191e24]/20 rtl:bg-gradient-to-l" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-16">
          {category.eyebrow ? <p className="text-sm font-semibold text-[#d75a23]">{category.eyebrow[lang]}</p> : null}
          <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">{category.title[lang]}</h1>
          {category.subtitle ? <p className="mt-3 text-white/70">{category.subtitle[lang]}</p> : null}
          <p className="mt-4 text-sm text-white/55">
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
            {" / "}
            <span className="text-white/80">{category.title[lang]}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        {category.tabs.length > 0 ? (
          <div className={`grid gap-3 ${category.tabs.length > 1 ? "md:grid-cols-2" : ""}`}>
            {category.tabs.map((tab, index) => {
              const on = tab.href ? false : filter === "all" ? index === 0 : filter === tab.id;
              const current = tab.href === category.href;
              const className = `rounded-full px-4 py-4 text-center text-[13px] font-semibold tracking-[0.12em] sm:text-sm ${
                current || on
                  ? "border border-[#d75a23] text-white"
                  : "bg-[#23282f] text-white/75 hover:text-white"
              }`;
              if (tab.href) {
                return (
                  <Link key={tab.id} href={tab.href} className={className}>
                    {tab.label[lang]}
                  </Link>
                );
              }
              return (
                <button key={tab.id} type="button" className={className} onClick={() => setFilter(tab.id)}>
                  {tab.label[lang]}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="relative mt-6">
          {category.badge ? (
            <div className="mb-4 flex justify-end lg:absolute lg:end-8 lg:top-[18rem] lg:z-20 lg:mb-0">
              <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#1b2024]/95 px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d75a23] text-xs">⚙</span>
                {category.badge[lang]}
              </div>
            </div>
          ) : null}
          <div className={`grid gap-4 ${cols[category.columns]}`}>
            {items.map((product) =>
              product ? <ProductCard key={product.slug} product={product} /> : null,
            )}
          </div>
        </div>
        <p className="sr-only">{crumbs.title[lang]}</p>
      </section>
    </div>
  );
}
