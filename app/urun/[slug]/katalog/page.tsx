"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getProduct } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function CatalogPage() {
  const params = useParams<{ slug: string }>();
  const product = getProduct(params.slug);
  const { t, lang } = useI18n();

  if (!product) {
    return (
      <div className="px-4 py-24 text-center">
        <p>{t("notFound")}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f5f6] px-4 py-10 text-[#191e24] print:bg-white">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm print:shadow-none">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#d75a23]">REDASY</p>
        <h1 className="mt-2 text-3xl font-bold">{product.title[lang]}</h1>
        {product.code ? <p className="mt-2 text-sm text-black/60">{product.code}</p> : null}
        <img src={product.hero ?? product.image} alt="" className="mt-6 w-full rounded-2xl object-cover" />
        <p className="mt-6 leading-7">{product.body?.[lang]}</p>
        <ul className="mt-6 divide-y divide-black/10">
          {product.specs?.map((spec) => (
            <li key={spec.label.tr} className="grid gap-1 py-3 sm:grid-cols-[220px_1fr]">
              <span className="font-semibold">{spec.label[lang]}</span>
              <span>{spec.value[lang]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-black/50 print:hidden">{t("catalogNote")}</p>
        <div className="mt-4 flex gap-3 print:hidden">
          <button type="button" onClick={() => window.print()} className="rounded-full bg-[#d75a23] px-5 py-2.5 text-sm font-semibold text-white">
            {t("print")}
          </button>
          <Link href={`/urun/${product.slug}`} className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold">
            {t("details")}
          </Link>
        </div>
      </article>
    </div>
  );
}
