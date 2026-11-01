"use client";

import Link from "next/link";
import { news } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function NewsPage() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-[#12161b] text-white">
      <section className="bg-[#191e24]">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <p className="text-sm text-white/55">
            <Link href="/">{t("home")}</Link> / {t("news")}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{t("news")}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 md:grid-cols-3 lg:px-6">
        {news.map((item) => (
          <Link key={item.slug} href={`/haberler/${item.slug}`} className="overflow-hidden rounded-[22px] border border-white/10 bg-[#161b20]">
            <img src={item.image} alt="" className="h-48 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs text-[#d75a23]">{item.date}</p>
              <h2 className="mt-2 text-xl font-bold leading-snug">{item.title[lang]}</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">{item.excerpt[lang]}</p>
              <span className="mt-4 inline-block text-sm font-semibold">{t("read")} →</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
