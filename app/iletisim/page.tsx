"use client";

import Link from "next/link";
import { useState } from "react";
import { email, phones, whatsappNumber } from "@/lib/content";
import { useI18n, type Lang } from "@/lib/i18n";

const copy: Record<
  Lang,
  {
    lead: string;
    company: string;
    topic: string;
    topicPh: string;
    topics: string[];
    send: string;
    sentTitle: string;
    need: string;
  }
> = {
  tr: {
    lead: "Teklif, yedek parça ve proje taleplerinizi buradan iletin. Üç hat ve e-posta Ankara ekibine ulaşır.",
    company: "Firma",
    topic: "Konu",
    topicPh: "Konu seçin",
    topics: ["Yedek parça", "Kırma ve eleme", "İş makinesi ataşmanları", "Araç üstü ekipman", "Mobil çözümler", "Fason imalat", "Diğer"],
    send: "Mesajı gönder",
    sentTitle: "Mesajınız alındı",
    need: "Ad, e-posta ve mesaj gerekli.",
  },
  en: {
    lead: "Send a quotation, spare-parts or project request. All three lines and e-mail reach the Ankara team.",
    company: "Company",
    topic: "Subject",
    topicPh: "Choose a subject",
    topics: ["Spare parts", "Crushing and screening", "Machine attachments", "Truck-mounted equipment", "Mobile solutions", "Contract manufacturing", "Other"],
    send: "Send message",
    sentTitle: "Message received",
    need: "Name, e-mail and message are required.",
  },
  ar: {
    lead: "أرسلوا طلب عرض أو قطع غيار أو مشروع. تصل الخطوط الثلاثة والبريد إلى فريق أنقرة.",
    company: "الشركة",
    topic: "الموضوع",
    topicPh: "اختاروا الموضوع",
    topics: ["قطع الغيار", "الكسر والغربلة", "ملحقات الآليات", "معدات المركبات", "حلول متنقلة", "تصنيع للغير", "أخرى"],
    send: "إرسال الرسالة",
    sentTitle: "تم استلام الرسالة",
    need: "الاسم والبريد والرسالة مطلوبة.",
  },
};

export default function ContactPage() {
  const { t, lang } = useI18n();
  const text = copy[lang];
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-[1240px] items-end gap-8 px-5 py-14 lg:grid-cols-[1.2fr_auto] lg:px-8 lg:py-16">
          <div>
            <p className="text-sm text-muted">
              <Link href="/" className="hover:text-ink">
                {t("home")}
              </Link>
              {" / "}
              {t("contact")}
            </p>
            <p className="kicker mt-6">REDASY</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-slate lg:text-5xl">{t("contact")}</h1>
            <p className="mt-4 max-w-xl text-[16px] leading-7 text-muted">{text.lead}</p>
          </div>
          <img src="/brand/redasy-logo.png" alt="" className="hidden h-20 w-auto lg:block" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-6 px-5 py-12 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:py-16">
        <aside className="bg-slate text-white">
          <div className="h-[3px] bg-burgundy" />
          <div className="space-y-8 p-7 lg:p-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#e7c5c6] uppercase">{t("addressLabel")}</p>
              <p className="mt-2 text-lg">{t("address")}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#e7c5c6] uppercase">{t("phoneLabel")}</p>
              <ul className="mt-3 divide-y divide-white/10">
                {phones.map((item) => (
                  <li key={item.tel} className="py-3">
                    <a
                      href={item.whatsapp ? `https://wa.me/${whatsappNumber}` : `tel:${item.tel}`}
                      className="flex items-baseline justify-between gap-4 hover:text-[#e7c5c6]"
                    >
                      <span className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">{item.role[lang]}</span>
                      <span className="text-base">{item.display}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#e7c5c6] uppercase">{t("mailLabel")}</p>
              <a href={`mailto:${email}`} className="mt-2 block text-lg hover:text-[#e7c5c6]">
                {email}
              </a>
            </div>
          </div>
        </aside>

        {sent ? (
          <div className="flex flex-col justify-center border border-line bg-white p-8 lg:p-10">
            <p className="kicker">{text.sentTitle}</p>
            <p className="mt-4 max-w-md text-[16px] leading-7 text-muted">{t("sent")}</p>
          </div>
        ) : (
          <form
            className="border border-line bg-white p-6 lg:p-8"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const name = String(data.get("name") || "").trim();
              const mail = String(data.get("email") || "").trim();
              const message = String(data.get("message") || "").trim();
              if (!name || !mail.includes("@") || !message) {
                setError(text.need);
                return;
              }
              setError("");
              setSent(true);
            }}
          >
            <p className="kicker">{t("write")}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-[12px] font-semibold tracking-wide text-slate">
                {t("yourName")}
                <input name="name" className="field font-normal" />
              </label>
              <label className="grid gap-1.5 text-[12px] font-semibold tracking-wide text-slate">
                {text.company}
                <input name="company" className="field font-normal" />
              </label>
              <label className="grid gap-1.5 text-[12px] font-semibold tracking-wide text-slate">
                {t("email")}
                <input name="email" type="email" className="field font-normal" />
              </label>
              <label className="grid gap-1.5 text-[12px] font-semibold tracking-wide text-slate">
                {t("phone")}
                <input name="phone" className="field font-normal" />
              </label>
              <label className="grid gap-1.5 text-[12px] font-semibold tracking-wide text-slate sm:col-span-2">
                {text.topic}
                <select name="topic" className="field font-normal" defaultValue="">
                  <option value="">{text.topicPh}</option>
                  {text.topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-[12px] font-semibold tracking-wide text-slate sm:col-span-2">
                {t("message")}
                <textarea name="message" rows={6} className="field font-normal" />
              </label>
            </div>
            {error ? <p className="mt-3 text-sm text-burgundy">{error}</p> : null}
            <button type="submit" className="btn btn-fill mt-5">
              {text.send}
              <span aria-hidden>→</span>
            </button>
          </form>
        )}
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-16 lg:px-8">
        <img src="/images/map.jpg" alt={t("mapTitle")} className="w-full border border-line bg-white" />
      </section>
    </div>
  );
}
