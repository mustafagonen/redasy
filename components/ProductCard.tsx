"use client";

import Link from "next/link";
import type { Product } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useI18n();
  return (
    <article className="flex min-h-[240px] min-w-0 flex-col overflow-hidden border border-line bg-white sm:flex-row">
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">{product.cardTitle[lang]}</h3>
        <ul className="mt-3 space-y-1.5 text-sm leading-6 text-muted">
          {product.bullets[lang].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link href={`/urun/${product.slug}`} className="mt-5 inline-flex w-fit items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
          {t("details")}
          <span className="h-px w-6 bg-burgundy" />
        </Link>
      </div>
      <div className="flex h-52 w-full shrink-0 items-center justify-center bg-[#f3f0eb] p-4 sm:h-auto sm:w-[42%]">
        <img src={product.image} alt={product.cardTitle[lang]} className="max-h-48 w-full object-contain" />
      </div>
    </article>
  );
}
