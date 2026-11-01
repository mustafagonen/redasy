"use client";

import Link from "next/link";
import { categories } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function AreasPage() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-[#12161b]">
      <section className="bg-[#191e24] px-4 py-14 text-white lg:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-white/55">
            <Link href="/">{t("home")}</Link> / {t("areas")}
          </p>
          <h1 className="mt-3 text-4xl font-bold lg:text-5xl">{t("areas")}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 md:grid-cols-2 lg:px-6">
        {categories.map((item, index) => (
          <Link key={item.slug} href={item.href} className="group relative min-h-[240px] overflow-hidden rounded-[22px] bg-[#14181d] text-white">
            <img src={item.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14181d] via-[#14181d]/55 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <span className="text-sm text-[#d75a23]">0{index + 1}</span>
              <h2 className="mt-1 text-2xl font-bold">{item.title[lang]}</h2>
              <p className="mt-2 max-w-md text-sm text-white/75">{item.cardText[lang]}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
