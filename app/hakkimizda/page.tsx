"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const blocks = {
  tr: {
    title: "Hakkımızda",
    lead: "REDASY Engineering & Industrial Group, Ankara merkezli üretim ve mühendislik gücüyle dört ana sektörde anahtar teslim çözümler geliştirir.",
    p1: "Mobil kırma-eleme hatlarından iş makinesi ataşmanlarına, araç üstü ekipmanlardan mobil sağlık treylerlerine uzanan ürün ailelerimizin tamamı yerli mühendislik ve Ar-Ge ile tasarlanır. Fabrika kabul testleri aynı kampüste yapılır; yedek parça ve servis ağı sevkiyatın ardından da devam eder.",
    p2: "İhracat operasyonu 25’ten fazla ülkeye Ankara’dan yönetilir. Her ürün ailesi, ilgili TS EN ISO kontrol planı ve saha devreye alma prosedürüyle teslim edilir.",
    values: [
      ["Yerli mühendislik", "Tasarım, imalat ve devreye alma aynı ekipte toplanır."],
      ["Anahtar teslim", "Makine, ekipman ve mobil ünite sahada çalışır halde teslim edilir."],
      ["Servis sürekliliği", "Yedek parça ve kurulum desteği teslimattan sonra da sürer."],
      ["Küresel sevkiyat", "Dört kıtaya uzanan ihracat ağı Ankara’dan koordine edilir."],
    ],
  },
  en: {
    title: "About Us",
    lead: "REDASY Engineering & Industrial Group develops turnkey solutions across four core sectors from its Ankara base.",
    p1: "From mobile crushing lines and machine attachments to truck-mounted equipment and mobile health trailers, every family is designed with in-house engineering and R&D. Factory acceptance stays on the same campus, and spare parts plus service continue after shipment.",
    p2: "Exports to more than 25 countries are coordinated from Ankara. Each family is delivered with its TS EN ISO inspection plan and a site commissioning procedure.",
    values: [
      ["In-house engineering", "Design, manufacturing and commissioning sit with one team."],
      ["Turnkey delivery", "Machines, bodies and mobile units arrive ready to work."],
      ["Service continuity", "Spare parts and installation support continue after handover."],
      ["Global dispatch", "An export network across four continents is run from Ankara."],
    ],
  },
  ar: {
    title: "من نحن",
    lead: "تطوّر REDASY Engineering & Industrial Group حلولًا جاهزة للتشغيل في أربعة قطاعات من قاعدتها في أنقرة.",
    p1: "من خطوط الكسر المتنقلة وملحقات الآليات إلى معدات الشاحنات ومقطورات الصحة، تُصمَّم كل عائلة بهندسة وبحث وتطوير داخليين. تُجرى اختبارات القبول في المصنع نفسه ويستمر دعم قطع الغيار بعد الشحن.",
    p2: "تُدار الصادرات إلى أكثر من 25 دولة من أنقرة، ويُسلَّم كل منتج مع خطة فحص TS EN ISO وإجراءات تشغيل في الموقع.",
    values: [
      ["هندسة محلية", "التصميم والتصنيع والتشغيل ضمن فريق واحد."],
      ["تسليم جاهز", "تصل الآلات والوحدات جاهزة للعمل."],
      ["استمرار الخدمة", "يستمر دعم القطع والتركيب بعد التسليم."],
      ["شحن عالمي", "تُنسَّق شبكة تصدير عبر أربع قارات من أنقرة."],
    ],
  },
};

export default function AboutPage() {
  const { t, lang } = useI18n();
  const copy = blocks[lang];
  return (
    <div className="bg-[#12161b] text-white">
      <section className="bg-[#191e24]">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <p className="text-sm text-white/55">
            <Link href="/">{t("home")}</Link> / {copy.title}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold lg:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{copy.lead}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2 lg:px-6">
        <div className="space-y-4 text-sm leading-7 text-white/75">
          <p>{copy.p1}</p>
          <p>{copy.p2}</p>
        </div>
        <img src="/images/hero/atasman.jpg" alt="" className="h-full min-h-64 w-full rounded-[24px] object-cover" />
      </section>
      <section className="bg-[#1b2024]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          {copy.values.map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-white/10 p-5">
              <h2 className="text-lg font-semibold text-[#d75a23]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
