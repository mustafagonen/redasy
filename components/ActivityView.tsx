"use client";

import { useState } from "react";
import { activities, type Activity } from "@/lib/activities";
import { useI18n } from "@/lib/i18n";
import { useSite, type SiteView } from "./site";

const specs = [
  ["Toplam Uzunluk", "17.500 mm"],
  ["Ana Kiriş Yapısı", "I-450 Kaynaklı Kiriş"],
  ["Kingpin & Yükseklik", "3.5\" / 1.350 mm"],
  ["Dingil Grubu", "3 Dingil Tridem Boji"],
  ["Sabitleme", "Hidrolik Destek Ayakları"],
  ["Standart", "CE & Ağır Hizmet"],
];

export function ActivityView({ activity }: { activity: Activity }) {
  const { lang } = useI18n();
  const { go, requestQuote } = useSite();
  const [filter, setFilter] = useState("all");
  const cards = (activity.cards ?? []).filter((card) => filter === "all" || card.cat === filter);

  return (
    <div className="min-h-screen bg-[#f2f4f7] text-[#1c2024]">
      <section className="relative overflow-hidden border-b-4 border-[#8b1220] bg-[#1c2024] py-12 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs text-gray-400 sm:text-sm">
                <button type="button" onClick={() => go("home")} className="hover:text-white">
                  Ana Sayfa
                </button>
                {" / "}
                <span className="font-semibold text-red-400">{activity.crumb[lang]}</span>
              </p>
              <h1 className="font-display text-2xl font-extrabold sm:text-4xl">{activity.title[lang]}</h1>
              <p className="mt-2 max-w-3xl text-sm text-gray-300 sm:text-base">{activity.desc[lang]}</p>
            </div>
            <button type="button" onClick={() => go("home")} className="rounded-md border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-[#8b1220]">
              ← Ana Sayfaya Dön
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {activities
              .filter((item) => item.slug !== "lazer-kesim")
              .map((item) => {
                const on = item.slug === activity.slug || (activity.slug === "lazer-kesim" && item.slug === "fason-imalat");
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => go(item.slug as SiteView)}
                    className={`rounded px-4 py-2 text-xs font-semibold sm:text-sm ${on ? "bg-[#8b1220] font-bold text-white shadow" : "bg-white/10 text-white hover:bg-[#8b1220]"}`}
                  >
                    {item.tab[lang]}
                  </button>
                );
              })}
            <button type="button" onClick={() => go("hakkimizda")} className="rounded bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-[#8b1220] sm:text-sm">
              Kurumsal / Hakkımızda
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {activity.filters ? (
          <div className="mb-8 flex flex-wrap gap-3">
            {activity.filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-lg px-5 py-2.5 text-sm ${filter === item.id ? "bg-[#8b1220] font-bold text-white shadow" : "border border-gray-200 bg-white font-semibold text-[#1c2024] hover:border-[#8b1220]"}`}
              >
                {item.label[lang]}
              </button>
            ))}
          </div>
        ) : null}

        {activity.kind === "chassis" ? <Chassis /> : null}
        {activity.kind === "fason" ? <Fason /> : null}
        {activity.cards ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <article key={card.quote} className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition hover:border-[#8b1220]">
                <div>
                  <div className="flex h-40 items-end bg-[#1c2024] p-6">
                    <span className="rounded bg-[#8b1220] px-3 py-1 text-xs font-bold text-white">{card.badge[lang]}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-lg font-bold">{card.title[lang]}</h2>
                    <p className="mt-2 text-sm text-gray-600">{card.text[lang]}</p>
                    {card.specs.length ? (
                      <ul className="mt-4 space-y-1.5 border-t pt-3 text-xs font-medium text-gray-700">
                        {card.specs.map((spec) => (
                          <li key={spec.tr}>• {spec[lang]}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button
                    type="button"
                    onClick={() => requestQuote(card.quote)}
                    className="block w-full rounded-md bg-[#8b1220] py-2.5 text-center text-sm font-semibold text-white hover:bg-[#b3192b]"
                  >
                    Teknik Teklif İste →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Chassis() {
  const { requestQuote } = useSite();
  return (
    <article className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <span className="inline-block rounded bg-[#8b1220] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">Özel mühendislik projesi</span>
          <h2 className="font-display text-2xl font-extrabold">17,5 m 3 Dingilli (Tridem Boji) Ağır Hizmet Mobil Şasi</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Mobil kırma-eleme tesisleri ve ağır endüstriyel üniteler için özel olarak projelendirilen kademeli kazboynu şasi mimarisi. Yüksek burulma rijitliği ve zorlu arazi şartlarında stabilite sağlar.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3">
            {specs.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs text-gray-500">{label}</div>
                <div className={`font-display text-base font-bold ${label === "Standart" ? "text-[#8b1220]" : "text-[#1c2024]"}`}>{value}</div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => requestQuote("17.5m 3 Dingilli Ağır Hizmet Mobil Şasi Projesi")}
            className="inline-block rounded-md bg-[#8b1220] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#b3192b]"
          >
            Bu Proje İçin Teknik Teklif İste →
          </button>
        </div>
        <div className="rounded-xl bg-[#1c2024] p-6 text-white lg:col-span-5">
          <p className="mb-2 text-xs font-bold text-red-400 uppercase">Şasi teknik şematiği</p>
          <svg viewBox="0 0 420 190" className="h-auto w-full">
            <rect x="10" y="10" width="400" height="170" rx="8" fill="#14171a" stroke="#374151" />
            <path d="M35 85 L115 85 L135 110 L385 110 L385 124 L125 124 L105 98 L35 98 Z" fill="#8b1220" stroke="#ffffff" strokeWidth="1.2" />
            <rect x="52" y="98" width="8" height="14" fill="#f59e0b" />
            <rect x="145" y="124" width="10" height="34" fill="#9ca3af" />
            <rect x="240" y="124" width="10" height="34" fill="#9ca3af" />
            <circle cx="305" cy="140" r="18" fill="#1f2937" stroke="#e5e7eb" strokeWidth="3" />
            <circle cx="342" cy="140" r="18" fill="#1f2937" stroke="#e5e7eb" strokeWidth="3" />
            <circle cx="378" cy="140" r="18" fill="#1f2937" stroke="#e5e7eb" strokeWidth="3" />
            <text x="210" y="44" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
              L = 17.500 mm (I-450 Kiriş)
            </text>
          </svg>
          <p className="mt-3 text-xs text-gray-300">Mobil yaşam konteynerleri, mobil bakım atölyeleri ve treyler üstü enerji üniteleri müşteriye özel ölçülerde üretilmektedir.</p>
        </div>
      </div>
    </article>
  );
}

function Fason() {
  const { requestQuote } = useSite();
  const blocks = [
    {
      title: "CNC Lazer Kesim & Abkant Büküm İşlemi",
      text: "Siyah sac, paslanmaz çelik, Hardox aşınma plakaları ve yüksek mukavemetli yapı çeliklerinin (S355, S700MC) CNC lazer ve plazma kesimi, yüksek tonajlı abkant preslerde şekillendirilmesi.",
      points: ["Yüksek kalınlıkta Hardox ve zırh çeliği kesimi", "CAD/CAM destekli fire optimizasyonu", "Ağır tonajlı CNC abkant pres büküm ve silindir kıvırma"],
      quote: "CNC Lazer Kesim ve Abkant Büküm Hizmeti",
      cta: "Kesim / Büküm Teklifi Al →",
    },
    {
      title: "Ağır Kaynaklı Fason İmalat & Kumlama/Boya",
      text: "Teknik resme veya 3D CAD modeline göre ağır makine şasileri, kule ve konstrüksiyon parçaları, kumlama ve endüstriyel epoksi boya dahil anahtar teslim fason üretilir.",
      points: ["EN ISO 3834-2 sertifikalı kaynaklı imalat", "CNC borverk ve talaşlı imalat", "SA 2.5 kumlama ve endüstriyel boya kabini"],
      quote: "Fason Ağır Kaynaklı İmalat Projesi",
      cta: "Fason İmalat Teklifi Al →",
    },
  ];
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {blocks.map((block) => (
        <article key={block.quote} className="rounded-xl border border-gray-200 bg-white p-7 shadow-md">
          <h2 className="font-display text-xl font-bold">{block.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{block.text}</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {block.points.map((point) => (
              <li key={point}>✓ {point}</li>
            ))}
          </ul>
          <button type="button" onClick={() => requestQuote(block.quote)} className="mt-6 inline-block rounded-md bg-[#8b1220] px-5 py-2.5 text-sm font-semibold text-white">
            {block.cta}
          </button>
        </article>
      ))}
    </div>
  );
}
