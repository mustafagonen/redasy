"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const text = {
  tr: [
    "Bu sitedeki ürün görselleri ve teknik değerler tanıtım amaçlıdır. Kesin kapsam, teklif ve sözleşme ile netleşir.",
    "Katalog sayfası, tarayıcınızın yazdırma penceresinden PDF olarak kaydedilebilir.",
    "Marka ve model uyumlulukları, sipariş öncesi REDASY mühendislik ekibi tarafından doğrulanır.",
  ],
  en: [
    "Product images and technical figures on this site are for introduction. Final scope is confirmed in the quotation and contract.",
    "The catalog page can be saved as a PDF from your browser print dialog.",
    "Brand and model compatibility is confirmed by the REDASY engineering team before an order.",
  ],
  ar: [
    "صور المنتجات والقيم الفنية في هذا الموقع للتعريف. يُحدَّد النطاق النهائي في العرض والعقد.",
    "يمكن حفظ صفحة الكتالوج كملف PDF من نافذة الطباعة.",
    "يؤكد فريق هندسة REDASY توافق العلامات والموديلات قبل الطلب.",
  ],
};

export default function TermsPage() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-paper px-5 py-16 text-ink">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">
          <Link href="/">{t("home")}</Link> / {t("terms")}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t("terms")}</h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
          {text[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
