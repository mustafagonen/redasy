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
    <div className="bg-paper px-4 py-10 text-ink print:bg-white">
      <article className="mx-auto max-w-3xl border border-line bg-white p-8 print:border-0 print:shadow-none">
        <p className="kicker">REDASY</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{product.title[lang]}</h1>
        {product.code ? <p className="mt-2 text-sm text-black/60">{product.code}</p> : null}
        <img src={product.hero ?? product.image} alt="" className="mt-6 max-h-[420px] w-full bg-[#f3f0eb] object-contain" />
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
          <button type="button" onClick={() => window.print()} className="btn btn-fill">
            {t("print")}
          </button>
          <Link href={`/urun/${product.slug}`} className="btn btn-line">
            {t("details")}
          </Link>
        </div>
      </article>
    </div>
  );
}
