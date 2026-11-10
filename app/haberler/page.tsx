"use client";

import { useSite } from "@/components/site";

const items = [
  {
    tag: "SAHA TESLİMATI • 2026",
    title: "17,5 m Tridem Boji Mobil Kırma Şasisi Sevkiyatı Tamamlandı",
    text: "Yurt dışı maden projemiz için tasarlanan ağır hizmet tipi 3 dingilli mobil kırma tesisi şasimiz test edilerek sevk edildi.",
  },
  {
    tag: "KAMU & BELEDİYE • 2026",
    title: "Büyükşehir Belediyeleri İçin Yeni Nesil Araç Üstü Ekipman Teslimatı",
    text: "Altyapı ve yol yapım çalışmalarında kullanılmak üzere ağır hizmet kaya damperleri ve ataşmanlar teslim edildi.",
  },
  {
    tag: "E-KATALOG • 2026",
    title: "2026 Yılı Konveyör, Yıkama ve Kırma Sistemleri Kataloğumuz Yayında",
    text: "Kum ocağı yıkama sistemleri ve ağır hizmet konveyör tambur/rulo ekipmanlarının yer aldığı güncel teknik katalog yayınlandı.",
  },
];

export default function NewsPage() {
  const { go } = useSite();
  return (
    <div className="bg-[#f2f4f7] text-[#1c2024]">
      <section className="border-b-4 border-[#8b1220] bg-[#1c2024] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-sm text-gray-400">
            <button type="button" onClick={() => go("home")} className="hover:text-white">
              Ana Sayfa
            </button>{" "}
            / Haberler & Medya
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Bizden Haberler ve Sektörel Duyurular</h1>
          <p className="mt-2 max-w-3xl text-gray-300">REDASY Engineering & Industrial Group bünyesindeki yeni saha teslimatları, katılımlar ve yeni nesil ekipmanlar.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-7 px-4 py-12 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
            <div className="h-44 bg-[#1c2024]" />
            <div className="p-6">
              <p className="text-xs font-bold text-[#8b1220]">{item.tag}</p>
              <h2 className="mt-1 font-display text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{item.text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
