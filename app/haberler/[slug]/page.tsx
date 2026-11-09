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
      <div className="bg-paper px-4 py-24 text-center text-ink">
        <p>{t("notFound")}</p>
      </div>
    );
  }
  return (
    <article className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
        <p className="text-sm text-muted">
          <Link href="/haberler" className="hover:text-ink">
            {t("allNews")}
          </Link>
        </p>
        <p className="kicker mt-6">{item.date}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.03em]">{item.title[lang]}</h1>
        <img src={item.image} alt="" className="mt-8 w-full object-cover" />
        <p className="mt-6 text-lg leading-8 text-ink">{item.excerpt[lang]}</p>
        <p className="mt-6 text-base leading-8 text-muted">{item.body[lang]}</p>
      </div>
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-5 px-5 py-12 md:grid-cols-2 lg:px-8">
          {news
            .filter((entry) => entry.slug !== item.slug)
            .map((entry) => (
              <Link key={entry.slug} href={`/haberler/${entry.slug}`} className="border border-line bg-paper p-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-burgundy uppercase">{entry.date}</p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight">{entry.title[lang]}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{entry.excerpt[lang]}</p>
              </Link>
            ))}
        </div>
      </section>
    </article>
  );
}
