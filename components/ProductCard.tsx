"use client";

import Link from "next/link";
import type { Product } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useI18n();
  return (
    <article className="flex min-h-[260px] min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#171b20] text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:flex-row">
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-snug lg:text-xl">{product.cardTitle[lang]}</h3>
        <ul className="mt-3 space-y-1.5 text-sm leading-5 text-white/75">
          {product.bullets[lang].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d75a23]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link href={`/urun/${product.slug}`} className="mt-5 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1a1d21] hover:bg-white/90">
          {t("details")}
        </Link>
      </div>
      <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[44%] sm:self-stretch">
        <img src={product.image} alt={product.cardTitle[lang]} className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-[#161b20] to-transparent rtl:bg-gradient-to-l" />
      </div>
    </article>
  );
}
