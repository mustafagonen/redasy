"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useSite } from "./site";

const items: { name: string; type: string; mark: ReactNode }[] = [
  {
    name: "T.C. ANKARA BÜYÜKŞEHİR BELEDİYESİ",
    type: "Büyükşehir Belediyesi",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <rect x="14" y="8" width="52" height="62" rx="8" fill="#0f3d7a" />
        <circle cx="40" cy="36" r="16" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M32 48 L40 20 L48 48 Z" fill="#ffffff" />
        <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold">ANKARA</text>
      </svg>
    ),
  },
  {
    name: "T.C. İSTANBUL BÜYÜKŞEHİR BELEDİYESİ",
    type: "Büyükşehir Belediyesi",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#104587" strokeWidth="3" />
        <path d="M26 52 L26 32 L32 24 L32 52 M40 52 L40 18 L46 28 L46 52 M52 52 L52 32 L56 26 L56 52" stroke="#104587" strokeWidth="3" fill="none" />
        <path d="M20 54 Q40 62 60 54" stroke="#104587" strokeWidth="3" fill="none" />
      </svg>
    ),
  },
  {
    name: "T.C. KONYA BÜYÜKŞEHİR BELEDİYESİ",
    type: "Büyükşehir Belediyesi",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <rect x="12" y="12" width="56" height="56" rx="6" fill="#f5c400" />
        <path d="M40 24 L24 44 L34 44 L34 56 L46 56 L46 44 L56 44 Z" fill="#1c2024" />
        <circle cx="33" cy="24" r="4" fill="#1c2024" />
        <circle cx="47" cy="24" r="4" fill="#1c2024" />
      </svg>
    ),
  },
  {
    name: "T.C. GAZİANTEP BÜYÜKŞEHİR BELEDİYESİ",
    type: "Büyükşehir Belediyesi",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <path d="M14 48 L26 28 L40 40 L54 28 L66 48 Z" fill="none" stroke="#1c2024" strokeWidth="3" />
        <rect x="16" y="52" width="48" height="6" fill="#8b1220" />
        <text x="40" y="24" textAnchor="middle" fill="#1c2024" fontSize="8" fontWeight="bold">GAZİANTEP</text>
      </svg>
    ),
  },
  {
    name: "T.C. BURSA BÜYÜKŞEHİR BELEDİYESİ",
    type: "Büyükşehir Belediyesi",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <circle cx="40" cy="42" r="24" fill="none" stroke="#164a8a" strokeWidth="2.5" strokeDasharray="4 3" />
        <path d="M26 52 Q40 22 54 52 Z" fill="#164a8a" />
        <path d="M35 20 L40 12 L45 20 Z" fill="#164a8a" />
      </svg>
    ),
  },
  {
    name: "YÜCELEN MADENCİLİK & AGREGA",
    type: "Maden & Taş Ocağı",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <polygon points="10,58 34,24 52,48 48,58" fill="#c98a1c" />
        <polygon points="36,58 52,30 70,58" fill="#8b1220" />
        <rect x="10" y="61" width="60" height="4" fill="#1c2024" />
      </svg>
    ),
  },
  {
    name: "BOZDOĞAN KUM & ÇAKIL OCAKLARI",
    type: "Kum Ocağı & Eleme Tesisi",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <polygon points="14,54 40,22 66,54" fill="#d97706" />
        <circle cx="32" cy="46" r="3" fill="#ffffff" />
        <circle cx="44" cy="42" r="3" fill="#ffffff" />
        <circle cx="40" cy="50" r="2.5" fill="#ffffff" />
        <path d="M12 60 Q40 52 68 60" stroke="#1c2024" strokeWidth="4" fill="none" />
      </svg>
    ),
  },
  {
    name: "ANADOLU BAZALT & TAŞ OCAKLARI A.Ş.",
    type: "Bazalt & Kalker Ocağı",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <polygon points="20,56 30,22 50,22 60,56" fill="#374151" />
        <polygon points="32,56 40,28 56,56" fill="#8b1220" />
        <circle cx="40" cy="15" r="4" fill="#d97706" />
      </svg>
    ),
  },
  {
    name: "KIZILIRMAK KUM & AGREGA TESİSLERİ",
    type: "Nehir Kumu & Yıkama Ocağı",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <polygon points="16,50 38,24 62,50" fill="#b45309" />
        <path d="M12 56 Q28 50 40 56 T68 56" stroke="#0284c7" strokeWidth="4" fill="none" />
        <path d="M12 63 Q28 57 40 63 T68 63" stroke="#0369a1" strokeWidth="3.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "TOROSLAR KALKER & MADEN SANAYİ",
    type: "Maden & Kırma Eleme",
    mark: (
      <svg viewBox="0 0 80 80" className="mx-auto h-14 w-14">
        <rect x="16" y="16" width="48" height="48" rx="8" fill="#1c2024" />
        <polygon points="22,54 38,26 58,54" fill="#e11d48" />
        <polygon points="36,54 48,34 60,54" fill="#f59e0b" />
      </svg>
    ),
  },
];

export function ReferenceRail() {
  const { showToast } = useSite();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % items.length), 3200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const shift = (dir: number) => setIndex((value) => (value + dir + items.length) % items.length);

  return (
    <section className="relative border-b border-gray-200 bg-[#f2f4f7] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-wider text-gray-600 uppercase sm:text-sm">Referanslar</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-[#1c2024] sm:text-3xl">
          İş Birliği Yaptığımız Belediyeler, Madenler ve Kum Ocakları
        </h2>
        <div className="mt-8 flex items-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <button type="button" aria-label="Önceki" onClick={() => shift(-1)} className="me-2 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gray-200/90 text-gray-700 shadow-md hover:bg-[#8b1220] hover:text-white">
            ‹
          </button>
          <div className="w-full overflow-hidden py-2">
            <div className="flex gap-5 transition-transform duration-700" style={{ transform: `translateX(-${index * 205}px)` }}>
              {[...items, ...items].map((item, i) => (
                <button
                  key={`${item.name}-${i}`}
                  type="button"
                  onClick={() => showToast(`${item.name} referans projemiz hakkında bilgi almak için formu doldurabilirsiniz.`)}
                  className="flex h-[168px] w-[185px] shrink-0 flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#8b1220] hover:shadow-[0_12px_24px_-6px_rgba(139,18,32,0.16)]"
                >
                  <span className="flex h-20 w-full items-center justify-center">{item.mark}</span>
                  <span>
                    <span className="line-clamp-2 block font-display text-[12px] leading-tight font-extrabold text-[#1c2024]">{item.name}</span>
                    <span className="mt-1 block text-[10.5px] font-medium text-gray-500">{item.type}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <button type="button" aria-label="Sonraki" onClick={() => shift(1)} className="ms-2 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gray-200/90 text-gray-700 shadow-md hover:bg-[#8b1220] hover:text-white">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
