"use client";

import Link from "next/link";
import { activities } from "@/lib/activities";
import { useI18n } from "@/lib/i18n";

export default function AreasPage() {
  const { lang, t } = useI18n();
  return (
    <div className="bg-[#f2f4f7]">
      <section className="border-b-4 border-[#8b1220] bg-[#1c2024] px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              {t("home")}
            </Link>{" "}
            / {t("areas")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold">{t("areas")}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-2">
        {activities.map((item) => (
          <Link key={item.slug} href={item.href} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#8b1220]">
            <p className="text-xs font-bold tracking-wider text-[#8b1220] uppercase">{item.tab[lang]}</p>
            <h2 className="mt-2 font-display text-2xl font-bold">{item.title[lang]}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{item.desc[lang]}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
