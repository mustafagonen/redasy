"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, getProduct, news, phones, projects, slides, whatsappNumber } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ApproachBand } from "./ApproachBand";

const partSlugs = ["ceneli-kirici-parcalari", "titresimli-elek-parcalari", "bant-konveyor-parcalari", "helezon-yikayici-parcalari"];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      {dir === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 5.25 8 12l6.25 6.75" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 5.25 16 12l-6.25 6.75" />
      )}
    </svg>
  );
}

export function HomeView() {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const parts = partSlugs.map((slug) => getProduct(slug)).filter((item) => item !== undefined);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 8000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-paper">
      <section className="relative h-[460px] overflow-hidden bg-deep sm:h-[520px] lg:h-[560px]">
        {slides.map((item, i) => (
          <img
            key={item.slug}
            src={item.hero}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-deep/80 via-deep/45 to-transparent rtl:bg-gradient-to-l" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col justify-center px-5 pb-24 pt-8 lg:px-8">
          <div className="max-w-[640px]">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] text-[#e7c5c6] uppercase">
              <span className="h-px w-8 bg-burgundy" />
              REDASY
            </p>
            <h1 className="mt-5 max-w-[16ch] text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[52px]">
              {slide.title[lang]}
            </h1>
            <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-white/72">{slide.cardText[lang]}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={slide.href} className="btn btn-fill">
                {t("details")}
                <span aria-hidden>→</span>
              </Link>
              <Link href="/iletisim" className="btn btn-line border-white/35 text-white hover:border-white">
                {t("quote")}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute end-5 top-1/2 z-20 hidden -translate-y-[70%] flex-col gap-2 lg:end-8 lg:flex">
          <button
            type="button"
            aria-label="prev"
            onClick={() => setIndex((value) => (value + slides.length - 1) % slides.length)}
            className="grid h-11 w-11 place-items-center border border-white/30 text-white backdrop-blur-sm transition hover:bg-white hover:text-deep"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="next"
            onClick={() => setIndex((value) => (value + 1) % slides.length)}
            className="grid h-11 w-11 place-items-center border border-white/30 text-white backdrop-blur-sm transition hover:bg-white hover:text-deep"
          >
            <Chevron dir="right" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-deep/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1240px] items-stretch px-5 lg:px-8">
            <div className="hidden w-[88px] shrink-0 items-center border-e border-white/10 pe-4 text-[13px] font-medium tracking-[0.18em] text-white sm:flex">
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/35">/{String(slides.length).padStart(2, "0")}</span>
            </div>
            <div className="flex min-w-0 flex-1 overflow-x-auto">
              {slides.map((item, i) => {
                const on = i === index;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`min-w-[148px] flex-1 px-4 py-4 text-start text-[13px] leading-snug transition sm:px-5 ${on ? "text-white" : "text-white/50 hover:text-white/80"}`}
                  >
                    <span className={`mb-2 block h-px w-7 ${on ? "bg-burgundy" : "bg-white/25"}`} />
                    {item.cardTitle[lang]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="kicker">{t("areas")}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-ink lg:text-4xl">{t("areasLead")}</h2>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item, i) => (
              <Link key={item.slug} href={item.href} className="group">
                <div className="relative aspect-[16/10] overflow-hidden bg-deep">
                  <img src={item.hero} alt="" className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-4 text-[11px] font-semibold tracking-[0.18em] text-burgundy">
                  0{i + 1}
                  <span className="ms-3 text-muted">
                    {item.productSlugs.length} {t("unit")}
                  </span>
                </p>
                <h3 className="mt-1 text-[17px] font-semibold leading-snug tracking-tight text-ink">{item.cardTitle[lang]}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted">{item.cardText[lang]}</p>
                <span className="mt-4 inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
                  {t("details")}
                  <span className="h-px w-6 bg-burgundy transition-all duration-300 group-hover:w-10" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ApproachBand />

      <section className="px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="kicker">{t("partsKicker")}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.03em] text-ink lg:text-4xl">{t("partsTitle")}</h2>
            <Link href="/faaliyet-alanlari/kirma-eleme-yikama" className="text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
              {t("details")} →
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">{t("partsLead")}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {parts.map((product) => (
              <Link key={product.slug} href={`/urun/${product.slug}`} className="group border border-line bg-white">
                <div className="flex h-40 items-center justify-center bg-[#f3f0eb] p-4">
                  <img src={product.image} alt="" className="max-h-32 w-full object-contain" />
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-semibold leading-snug text-ink">{product.cardTitle[lang]}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{product.bullets[lang][0]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="kicker">{t("projectsKicker")}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.03em] text-ink lg:text-4xl">{t("projectsTitle")}</h2>
            <Link href="/projeler" className="text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
              {t("allProjects")} →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {projects.map((item) => (
              <Link key={item.slug} href={item.href} className="group grid overflow-hidden border border-line bg-paper sm:grid-cols-[0.9fr_1.1fr]">
                <img src={item.image} alt="" className="h-48 w-full object-cover sm:h-full" />
                <div className="p-6">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-burgundy uppercase">{item.sector[lang]}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{item.title[lang]}</h3>
                  <ul className="mt-4 space-y-1.5 text-sm leading-6 text-muted">
                    {item.points[lang].map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <p className="kicker">{t("corporate")}</p>
          <h2 className="mt-4 max-w-xl text-[36px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink lg:text-[46px]">{t("corpTitle")}</h2>
          <div className="mt-10 grid grid-cols-2 border-t border-line">
            <Stat value="4" label={t("statSectors")} />
            <Stat value="+25" label={t("statCountries")} />
            <Stat value="%100" label={t("statLocal")} />
            <Stat value={t("statTurnkeyValue")} label={t("statTurnkey")} />
          </div>
        </div>
        <figure className="border border-line bg-white p-6 lg:p-8">
          <figcaption className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">{t("mapTitle")}</figcaption>
          <img src="/images/map.jpg" alt={t("mapTitle")} className="w-full object-contain" />
        </figure>
      </section>

      <section className="border-t border-line bg-white px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="kicker">{t("newsKicker")}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink lg:text-4xl">{t("newsTitle")}</h2>
            <Link href="/haberler" className="text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
              {t("allNews")} →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {news.map((item) => (
              <Link key={item.slug} href={`/haberler/${item.slug}`} className="group border border-line bg-paper">
                <img src={item.image} alt="" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-burgundy uppercase">{item.date}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink">{item.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.excerpt[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep text-white">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">{t("homeCtaTitle")}</h2>
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-white/70">{t("homeCtaText")}</p>
            <Link href="/iletisim" className="btn btn-fill mt-6">
              {t("contact")}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <ul className="divide-y divide-white/10 border border-white/10">
            {phones.map((item) => (
              <li key={item.tel}>
                <a
                  href={item.whatsapp ? `https://wa.me/${whatsappNumber}` : `tel:${item.tel}`}
                  className="flex items-baseline justify-between gap-4 px-5 py-4 hover:bg-white/[0.04]"
                >
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-[#e7c5c6] uppercase">{item.role[lang]}</span>
                  <span className="text-lg font-semibold">{item.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-b border-line px-1 py-6 odd:border-e odd:pe-6 even:ps-6">
      <p className="text-[34px] font-semibold tracking-tight text-burgundy lg:text-[40px]">{value}</p>
      <p className="mt-1 text-sm leading-5 text-muted">{label}</p>
    </div>
  );
}
