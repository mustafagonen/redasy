"use client";

import Link from "next/link";
import { legalName } from "@/lib/content";
import { useSite, type SiteView } from "./site";

const columns: { title: string; links: { label: string; view?: SiteView; anchor?: string; contact?: boolean }[] }[] = [
  {
    title: "Kurumsal",
    links: [
      { label: "Anasayfa", view: "home" },
      { label: "Hakkımızda", view: "hakkimizda" },
      { label: "Biz Kimiz", view: "hakkimizda", anchor: "biz-kimiz" },
      { label: "Vizyon & Misyon", view: "hakkimizda", anchor: "vizyon" },
      { label: "Kalite Politikamız", view: "hakkimizda", anchor: "kalite" },
    ],
  },
  {
    title: "Faaliyet Alanlarımız",
    links: [
      { label: "Mobil Kırma & Eleme", view: "kirma-eleme-yikama" },
      { label: "İş Makinesi Ataşmanları", view: "is-makinesi-atasmanlari" },
      { label: "Araç Üstü Ekipmanlar", view: "arac-ustu-ekipmanlar" },
      { label: "Mobil Çözümler", view: "mobil-cozumler" },
      { label: "Fason İmalat", view: "fason-imalat" },
    ],
  },
  {
    title: "Haberler & Medya",
    links: [
      { label: "Bizden Haberler", view: "haberler" },
      { label: "Sektördeki Gelişmeler", view: "haberler" },
      { label: "Galeri & Teknik Föyler", view: "kirma-eleme-yikama" },
      { label: "Basın Kiti", view: "haberler" },
    ],
  },
  {
    title: "İletişim",
    links: [
      { label: "Bize Ulaşın", contact: true },
      { label: "Bilgi Edinme", contact: true },
      { label: "Lokasyon Haritası", contact: true },
      { label: "İK & Kariyer", contact: true },
    ],
  },
];

export function Footer() {
  const { go, openContact } = useSite();
  return (
    <footer className="print:hidden">
      <section className="border-t border-white/10 bg-[#1c2024] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-extrabold tracking-wide uppercase sm:text-[26px]">Hızlı Erişim</h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 border-b border-white/10 pb-2 font-display text-base font-bold">{column.title}</h3>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => (link.contact ? openContact() : go(link.view ?? "home", link.anchor))}
                        className="hover:ps-1 hover:text-white"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="border-t border-red-900/60 bg-[#750e1a] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded bg-white font-display text-xl font-black text-[#750e1a]">R</span>
              <div>
                <span className="block font-display text-xl leading-none font-extrabold tracking-wider">REDASY</span>
                <span className="text-[10px] tracking-tight text-red-200">Engineering & Industrial Group</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-red-100/90">
              REDASY Engineering & Industrial Group. Tescilli Holding Ünvanı: {legalName}
            </p>
          </div>
          <p className="text-xs font-medium text-red-100/90">© 2026 REDASY Engineering & Industrial Group. Her Hakkı Saklıdır.</p>
        </div>
        <div className="bg-[#590913] px-4 py-2.5 text-[11px] text-red-200/80 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
            <span>© 2026 REDASY Engineering & Industrial Group. REDASY</span>
            <p className="flex gap-6">
              <Link href="/gizlilik" className="hover:text-white">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="hover:text-white">
                Kullanım Koşulları
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
