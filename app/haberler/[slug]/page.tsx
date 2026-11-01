"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { news } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const item = news.find((entry) => entry.slug === params.slug);
  if (!item) {
    return (
      <div className="bg-[#12161b] px-4 py-24 text-center text-white">
        <p>{t("notFound")}</p>
      </div>
    );
  }
  return (
    <article className="bg-[#12161b] text-white">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
        <p className="text-sm text-white/55">
          <Link href="/haberler">{t("allNews")}</Link>
        </p>
        <p className="mt-4 text-sm text-[#d75a23]">{item.date}</p>
        <h1 className="mt-2 text-4xl font-bold leading-tight">{item.title[lang]}</h1>
        <img src={item.image} alt="" className="mt-6 w-full rounded-[24px] object-cover" />
        <p className="mt-6 text-base leading-8 text-white/80">{item.body[lang]}</p>
      </div>
    </article>
  );
}
