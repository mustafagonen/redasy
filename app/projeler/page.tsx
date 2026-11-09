"use client";

import Link from "next/link";
import { projects } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function ProjectsPage() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              {t("home")}
            </Link>{" "}
            / {t("projects")}
          </p>
          <p className="kicker mt-6">REDASY</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] lg:text-5xl">{t("projectsTitle")}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{t("projectsLead")}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 lg:px-8 lg:py-16">
        {projects.map((item, index) => (
          <article key={item.slug} className="grid overflow-hidden border border-line bg-white lg:grid-cols-2">
            <img src={item.image} alt="" className={`h-64 w-full object-cover lg:h-full ${index % 2 === 1 ? "lg:order-2" : ""}`} />
            <div className="flex flex-col justify-center p-7 lg:p-10">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-burgundy uppercase">{item.sector[lang]}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{item.title[lang]}</h2>
              <p className="mt-4 text-[15px] leading-7 text-muted">{item.text[lang]}</p>
              <p className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-slate uppercase">{t("scope")}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
                {item.points[lang].map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={item.href} className="mt-6 inline-flex w-fit items-center gap-3 text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
                {t("line")}
                <span className="h-px w-6 bg-burgundy" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
