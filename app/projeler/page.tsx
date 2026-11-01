"use client";

import Link from "next/link";
import { projects } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function ProjectsPage() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-[#12161b] text-white">
      <section className="bg-[#191e24]">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <p className="text-sm text-white/55">
            <Link href="/">{t("home")}</Link> / {t("projects")}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{t("projects")}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 md:grid-cols-2 lg:px-6">
        {projects.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-[22px] border border-white/10 bg-[#161b20]">
            <img src={item.image} alt="" className="h-56 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-2xl font-bold">{item.title[lang]}</h2>
              <p className="mt-2 text-sm text-white/70">{item.text[lang]}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
