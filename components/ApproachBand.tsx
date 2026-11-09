"use client";

import { approach } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function ApproachBand() {
  const { t, lang } = useI18n();
  return (
    <section className="bg-slate text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e7c5c6] uppercase">{t("approachKicker")}</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] lg:text-4xl">{t("approachTitle")}</h2>
        <ol className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((step, index) => (
            <li key={step.title.tr} className="bg-slate p-6 lg:p-7">
              <p className="text-[28px] font-semibold tracking-tight text-[#e7c5c6]">0{index + 1}</p>
              <h3 className="mt-4 text-lg font-semibold">{step.title[lang]}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{step.text[lang]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
