"use client";

import Link from "next/link";
import { email } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const text = {
  tr: [
    "İletişim formuna yazdığınız ad, e-posta, telefon ve mesaj yalnızca talebinize cevap vermek için kullanılır.",
    "Form verisi tarayıcınızda işlenir; bu tanıtım sitesi mesajları bir sunucuda saklamaz.",
    "Dil tercihiniz yalnızca kendi tarayıcınızda saklanır.",
    `Sorularınız için ${email} adresine yazabilirsiniz.`,
  ],
  en: [
    "The name, e-mail, phone and message you submit are used only to answer your request.",
    "The form is handled in your browser. This introductory site does not store messages on a server.",
    "Your language choice is stored only in your own browser.",
    `For questions, write to ${email}.`,
  ],
  ar: [
    "يُستخدم الاسم والبريد والهاتف والرسالة للرد على طلبك فقط.",
    "تُعالَج الاستمارة في متصفحك، ولا يخزّن هذا الموقع الرسائل على خادم.",
    "يُحفظ اختيار اللغة في متصفحك فقط.",
    `للاستفسار راسلوا ${email}.`,
  ],
};

export default function PrivacyPage() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-[#12161b] px-4 py-14 text-white">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm text-white/55">
          <Link href="/">{t("home")}</Link> / {t("privacy")}
        </p>
        <h1 className="mt-3 text-4xl font-bold">{t("privacy")}</h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-white/75">
          {text[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
