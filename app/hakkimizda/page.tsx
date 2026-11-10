"use client";

import { useSite } from "@/components/site";

export default function AboutPage() {
  const { go } = useSite();
  return (
    <div className="bg-[#f2f4f7] text-[#1c2024]">
      <section className="border-b-4 border-[#8b1220] bg-[#1c2024] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">
            <button type="button" onClick={() => go("home")} className="hover:text-white">
              Ana Sayfa
            </button>{" "}
            / <span className="font-semibold text-red-400">Kurumsal / Hakkımızda</span>
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">REDASY Engineering & Industrial Group Hakkında</h1>
          <p className="mt-2 max-w-3xl text-gray-300">
            Ankara merkezli üretim gücümüzle madencilik, taş ocağı, inşaat ve kamu sektörlerine yüksek standartlarda makine ve ekipman üretiyoruz.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <div id="biz-kimiz" className="max-w-3xl">
            <p className="text-xs font-bold text-[#8b1220] uppercase">Kurumsal kimliğimiz</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">REDASY Endüstri Makina Sanayi ve Ticaret Ltd. Şti.</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              Ankara Sanayi Odası 2. OSB (Sincan / Ankara) yerleşkesinde faaliyet gösteren <strong>REDASY Engineering & Industrial Group</strong>; cevher ve taş kırma-eleme-yıkama makineleri, ağır hizmet ekskavatör ataşmanları, araç üstü ekipmanlar ve özel mobil şasi çözümleri alanında mühendislik odaklı üretim gerçekleştirmektedir.
            </p>
          </div>
          <div id="vizyon" className="grid gap-6 pt-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-display font-bold text-[#8b1220]">Vizyonumuz</h3>
              <p className="mt-2 text-sm text-gray-600">Ağır sanayi ve mobil kırma-eleme teknolojilerinde Türkiye&apos;nin mühendislik gücünü küresel pazarlarda temsil eden lider grup şirketi olmak.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-display font-bold text-[#8b1220]">Misyonumuz</h3>
              <p className="mt-2 text-sm text-gray-600">Belediyeler, maden işletmeleri ve inşaat projeleri için uzun ömürlü, düşük işletme maliyetli ve %100 anahtar teslim makineler tasarlamak.</p>
            </div>
            <div id="kalite" className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-display font-bold text-[#8b1220]">Kalite Standartlarımız</h3>
              <p className="mt-2 text-sm text-gray-600">ISO 9001, CE Makine Emniyeti Direktifi ve EN 1090 çelik yapı standartlarına tam uyumlu üretim ve kalite kontrol süreçleri.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
