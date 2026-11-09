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
    <div className="bg-paper text-ink">
      <section className="relative h-[300px] overflow-hidden bg-deep text-white lg:h-[360px]">
        <img src={category.hero} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/85 via-deep/55 to-deep/15 rtl:bg-gradient-to-l" />
        <div className="relative mx-auto flex h-full max-w-[1240px] flex-col justify-end px-5 py-10 lg:px-8">
          {category.eyebrow ? <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e7c5c6] uppercase">{category.eyebrow[lang]}</p> : null}
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] lg:text-5xl">{category.title[lang]}</h1>
          {category.subtitle ? <p className="mt-4 max-w-xl text-white/70">{category.subtitle[lang]}</p> : null}
          <p className="mt-6 text-sm text-white/50">
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

      <section className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8">
        {category.lead ? <p className="mb-8 max-w-3xl text-[16px] leading-8 text-muted">{category.lead[lang]}</p> : null}
        {category.tabs.length > 0 ? (
          <div className={`grid gap-3 ${category.tabs.length > 1 ? "md:grid-cols-2" : ""}`}>
            {category.tabs.map((tab, index) => {
              const on = tab.href ? false : filter === "all" ? index === 0 : filter === tab.id;
              const current = tab.href === category.href;
              const className = `px-4 py-4 text-center text-[12px] font-semibold tracking-[0.12em] ${
                current || on ? "bg-burgundy text-white" : "border border-line bg-white text-ink/75 hover:border-slate hover:text-ink"
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

        <div className="relative mt-8">
          {category.badge ? (
            <div className="mb-5 flex justify-end">
              <div className="flex items-center gap-3 border border-line bg-white px-4 py-2.5 text-[13px] font-medium text-ink">
                <span className="h-2 w-2 rounded-full bg-burgundy" />
                {category.badge[lang]}
              </div>
            </div>
          ) : null}
          <div className={`grid gap-4 ${cols[category.columns]}`}>
            {items.map((product) => (product ? <ProductCard key={product.slug} product={product} /> : null))}
          </div>
        </div>
        <p className="sr-only">{crumbs.title[lang]}</p>
      </section>
    </div>
  );
}
