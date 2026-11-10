"use client";

import { useEffect, useState } from "react";
import { heroSlides, pillars } from "@/lib/activities";
import { useI18n } from "@/lib/i18n";
import { ContactBlock } from "./ContactBlock";
import { ExportMap } from "./ExportMap";
import { ReferenceRail } from "./ReferenceRail";
import { useSite, type SiteView } from "./site";

export function HomeView() {
  const { lang } = useI18n();
  const { go } = useSite();
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-[#1c2024]">
      <section className="relative overflow-hidden bg-[#1e2328] text-white">
        <div className="relative h-[500px] w-full sm:h-[540px] lg:h-[560px]">
          {heroSlides.map((item, i) => (
            <img
              key={item.title.tr}
              src={item.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171b1f]/88 via-[#1c2127]/55 to-[#1c2127]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2328] via-transparent to-black/20" />
          <button
            type="button"
            aria-label="Önceki"
            onClick={() => setIndex((value) => (value + heroSlides.length - 1) % heroSlides.length)}
            className="absolute start-3 top-1/2 z-30 grid h-11 w-11 -translate-y-12 place-items-center rounded-full bg-white/75 text-[#1c2024] shadow-lg hover:bg-[#8b1220] hover:text-white sm:start-6 sm:h-12 sm:w-12"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Sonraki"
            onClick={() => setIndex((value) => (value + 1) % heroSlides.length)}
            className="absolute end-3 top-1/2 z-30 grid h-11 w-11 -translate-y-12 place-items-center rounded-full bg-white/75 text-[#1c2024] shadow-lg hover:bg-[#8b1220] hover:text-white sm:end-6 sm:h-12 sm:w-12"
          >
            ›
          </button>
          <div className="relative z-20 mx-auto max-w-7xl px-6 pt-12 sm:px-12 sm:pt-16 lg:px-16 lg:pt-20">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px]">
                {slide.title[lang]}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">{slide.text[lang]}</p>
              <button
                type="button"
                onClick={() => go(slide.href.split("/").pop() as SiteView)}
                className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#8b1220] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5 hover:bg-[#b3192b] sm:text-[15px]"
              >
                {slide.cta[lang]}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
          <div className="absolute end-16 bottom-24 z-30 hidden items-center gap-2.5 sm:flex">
            {heroSlides.map((item, i) => (
              <button
                key={item.href + i}
                type="button"
                aria-label={item.title[lang]}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-10 bg-[#8b1220]" : "w-8 bg-white/45 hover:bg-white/75"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-30 mx-auto -mt-28 max-w-7xl px-4 pb-10 sm:-mt-32 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <button key={item.n} type="button" onClick={() => go(item.href.split("/").pop() as SiteView)} className="pillar-card h-48 rounded-xl text-start">
                <img src={item.image} alt="" className="pillar-bg absolute inset-0 h-full w-full object-cover opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#181c22]/95 via-[#1f242b]/80 to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-between p-5">
                  <div>
                    <span className="pillar-number block font-display text-3xl leading-none font-extrabold text-[#8b1220]/80">{item.n}</span>
                    <h3 className="mt-1 font-display text-[17px] leading-snug font-bold text-white">
                      {item.title[lang]}
                      {item.note ? <span className="mt-1 block text-xs font-normal text-gray-300">{item.note[lang]}</span> : null}
                    </h3>
                  </div>
                  <span className="pillar-btn inline-block w-fit rounded-md bg-[#8b1220] px-4 py-1.5 text-xs font-semibold tracking-wide text-white">
                    Detayları İncele
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-6">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#8b1220] uppercase sm:text-sm">Kurumsal bakış</p>
              <h2 className="font-display text-2xl leading-tight font-extrabold sm:text-3xl lg:text-[34px]">
                Kurumsal Gücümüz &
                <br />
                Mühendislik Vizyonumuz
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <Stat value="+25" label="Ana Sektör" />
              <Stat value="4" label="Ülkeye İhracat" />
              <Stat value="%100" label="Anahtar Teslim Çözümler" />
            </div>
          </div>
          <div className="flex justify-center lg:col-span-6">
            <div className="w-full max-w-xl">
              <ExportMap />
            </div>
          </div>
        </div>
      </section>

      <ReferenceRail />
      <ContactBlock />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold text-[#8b1220] sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-medium text-gray-700 sm:text-sm">{label}</div>
    </div>
  );
}
