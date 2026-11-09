"use client";

import Link from "next/link";
import { areaExtras, categories } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function AreasPage() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-paper">
      <section className="border-b border-line bg-white px-5 py-16 text-ink lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              {t("home")}
            </Link>{" "}
            / {t("areas")}
          </p>
          <p className="kicker mt-6">REDASY</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] lg:text-5xl">{t("areas")}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{t("areasLead")}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1240px] gap-6 px-5 py-12 lg:px-8">
        {categories.map((item, index) => (
          <Link key={item.slug} href={item.href} className="group grid overflow-hidden border border-line bg-white lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-64 bg-deep">
              <img src={item.hero} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center p-7 lg:p-10">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-burgundy">
                0{index + 1}
                <span className="ms-3 text-muted">
                  {item.productSlugs.length} {t("unit")}
                </span>
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink lg:text-3xl">{item.title[lang]}</h2>
              <p className="mt-4 text-[15px] leading-7 text-muted">{item.lead?.[lang] ?? item.cardText[lang]}</p>
              {item.badge ? <p className="mt-4 text-sm font-medium text-slate">{item.badge[lang]}</p> : null}
              <span className="mt-6 inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
                {t("details")}
                <span className="h-px w-6 bg-burgundy transition-all group-hover:w-10" />
              </span>
            </div>
          </Link>
        ))}
        {areaExtras.map((item) => (
          <Link key={item.href + item.title.tr} href={item.href} className="border border-line bg-slate p-7 text-white lg:p-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#e7c5c6] uppercase">05</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">{item.title[lang]}</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/75">{t("fasonText")}</p>
            <span className="mt-6 inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.14em] uppercase">
              {t("contact")}
              <span className="h-px w-6 bg-white" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
