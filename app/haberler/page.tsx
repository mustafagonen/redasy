"use client";

import Link from "next/link";
import { news } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function NewsPage() {
  const { t, lang } = useI18n();
  const [featured, ...rest] = news;
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              {t("home")}
            </Link>{" "}
            / {t("news")}
          </p>
          <p className="kicker mt-6">REDASY</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] lg:text-5xl">{t("newsTitle")}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
        <Link href={`/haberler/${featured.slug}`} className="group grid overflow-hidden border border-line bg-white lg:grid-cols-[1.15fr_0.85fr]">
          <img src={featured.image} alt="" className="h-72 w-full object-cover lg:h-full" />
          <div className="flex flex-col justify-center p-7 lg:p-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-burgundy uppercase">{featured.date}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">{featured.title[lang]}</h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">{featured.excerpt[lang]}</p>
            <span className="mt-6 inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
              {t("read")}
              <span className="h-px w-6 bg-burgundy transition-all group-hover:w-10" />
            </span>
          </div>
        </Link>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((item) => (
            <Link key={item.slug} href={`/haberler/${item.slug}`} className="group flex flex-col border border-line bg-white">
              <img src={item.image} alt="" className="h-52 w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-burgundy uppercase">{item.date}</p>
                <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight">{item.title[lang]}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{item.excerpt[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
