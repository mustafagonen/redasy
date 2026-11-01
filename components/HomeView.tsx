"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, slides } from "@/lib/content";
import { useI18n, type Lang } from "@/lib/i18n";

const pillLabels: Record<Lang, [string, string][]> = {
  tr: [
    ["İş Makinesi", "Ataşmanları"],
    ["Araç Üstü", "Ekipmanlar"],
    ["Mobil", "Çözümler"],
  ],
  en: [
    ["Machine", "Attachments"],
    ["Truck", "Equipment"],
    ["Mobile", "Solutions"],
  ],
  ar: [
    ["ملحقات", "الآليات"],
    ["معدات", "المركبات"],
    ["حلول", "متنقلة"],
  ],
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 lg:h-8 lg:w-8" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      {dir === "left" ? <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 5.25 8 12l6.25 6.75" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 5.25 16 12l-6.25 6.75" />}
    </svg>
  );
}

export function HomeView() {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 8000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      <section className="relative h-[520px] overflow-hidden bg-[#14181d] sm:h-[580px] lg:h-[min(62vh,680px)]">
        {slides.map((item, i) => (
          <img
            key={item.slug}
            src={item.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-[78%_center] transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#14181d]/35 via-transparent to-transparent rtl:bg-gradient-to-l" />

        <button
          type="button"
          aria-label="prev"
          onClick={() => setIndex((value) => (value + slides.length - 1) % slides.length)}
          className="absolute start-4 top-[46%] z-20 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:bg-white/25 lg:start-7 lg:h-[76px] lg:w-[76px]"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          aria-label="next"
          onClick={() => setIndex((value) => (value + 1) % slides.length)}
          className="absolute end-4 top-[46%] z-20 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:bg-white/25 lg:end-7 lg:h-[76px] lg:w-[76px]"
        >
          <Chevron dir="right" />
        </button>

        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-16 pb-24 sm:px-20 lg:px-28 lg:pb-28">
          <div className="max-w-[760px]">
            <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[54px]">
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-[540px] text-[15px] leading-7 text-white/80 sm:text-[17px]">{t("heroText")}</p>
            <Link
              href="/faaliyet-alanlari"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d75a23] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(215,90,35,0.35)] hover:bg-[#c24e1c]"
            >
              {t("explore")} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-28 z-20 flex justify-end sm:bottom-32 lg:bottom-[9.25rem] lg:end-[4vw] lg:start-auto">
          <div className="flex max-w-full items-center gap-4 overflow-x-auto rounded-full bg-[#12161b]/82 px-5 py-3.5 shadow-[0_18px_44px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:gap-5 sm:px-7 sm:py-4 lg:gap-6 lg:px-8 lg:py-[18px]">
            <span className="shrink-0 text-[32px] font-bold leading-none tracking-tight text-white sm:text-[40px] lg:text-[46px]">
              {String(index + 1).padStart(2, "0")}/04
            </span>
            <span className="h-[3px] w-6 shrink-0 rounded-full bg-white/75 sm:w-8" aria-hidden />
            <div className="flex items-start gap-3 sm:gap-5 lg:gap-6">
              {pillLabels[lang].map((lines, i) => {
                const active = index === i;
                return (
                  <button
                    key={lines.join("-")}
                    type="button"
                    onClick={() => setIndex(i)}
                    className="w-[88px] shrink-0 text-center text-[12px] font-medium leading-[1.25] text-white sm:w-[112px] sm:text-[14px] lg:w-[124px] lg:text-[15px]"
                  >
                    <span className="relative inline-block px-1 pb-2">
                      {lines[0]}
                      <br />
                      {lines[1]}
                      {active ? <span className="absolute inset-x-2 bottom-0 h-[2.5px] rounded-full bg-white" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-30 -mt-16 px-[4vw] sm:-mt-[4.5rem] lg:-mt-24">
        <div className="mx-auto grid max-w-[1680px] gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">
          {categories.map((item, i) => (
            <article
              key={item.slug}
              className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[22px] bg-[#15191e] text-white shadow-[0_18px_40px_rgba(16,18,22,0.18)] lg:min-h-[300px] xl:min-h-[330px]"
            >
              <img src={item.cardImage} alt="" className="absolute inset-y-0 end-0 h-full w-[62%] object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#15191e] from-[34%] via-[#15191e]/92 via-[52%] to-transparent rtl:bg-gradient-to-l" />
              <div className="relative flex h-full flex-1 flex-col px-5 pb-5 pt-5 lg:px-6 lg:pb-6 lg:pt-6">
                <span className="text-[46px] font-semibold leading-none tracking-tight text-white lg:text-[52px]">{i + 1}</span>
                <h2 className="mt-4 max-w-[13rem] text-[18px] font-bold leading-[1.15] lg:text-[20px]">{item.cardTitle[lang]}</h2>
                <p className="mt-2 max-w-[14rem] text-[13px] leading-5 text-white/70 lg:text-[14px] lg:leading-6">{item.cardText[lang]}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex w-fit rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#1a1d21] shadow-sm hover:bg-white/90 lg:px-5 lg:py-2.5 lg:text-[14px]"
                >
                  {t("details")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="h-10 bg-white lg:h-14" />

      <section className="bg-[#1b2024] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-[#d75a23]">{t("corporate")}</p>
            <h2 className="mt-3 max-w-xl text-4xl font-bold leading-tight lg:text-5xl">{t("corpTitle")}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              <Stat value="4" label={t("statSectors")} />
              <Stat value="+25" label={t("statCountries")} />
              <Stat value="%100" label={t("statLocal")} />
              <Stat value={t("statTurnkeyValue")} label={t("statTurnkey")} word />
            </div>
          </div>
          <div className="relative">
            <p className="mb-3 text-center text-sm text-white/70">{t("mapTitle")}</p>
            <img src="/images/map.jpg" alt={t("mapTitle")} className="w-full object-contain" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label, word = false }: { value: string; label: string; word?: boolean }) {
  return (
    <div>
      <p className={`font-bold text-[#d75a23] ${word ? "text-4xl" : "text-5xl"}`}>{value}</p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </div>
  );
}
