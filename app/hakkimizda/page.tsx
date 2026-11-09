"use client";

import Link from "next/link";
import { categories } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ApproachBand } from "@/components/ApproachBand";

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
    <div className="bg-paper text-ink">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              {t("home")}
            </Link>{" "}
            / {copy.title}
          </p>
          <p className="kicker mt-6">REDASY</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] lg:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{copy.lead}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5 text-[15px] leading-8 text-muted">
          <p>{copy.p1}</p>
          <p>{copy.p2}</p>
        </div>
        <img src="/images/hero/atasman.jpg" alt="" className="h-full min-h-72 w-full object-cover" />
      </section>
      <section className="border-t border-line bg-white px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <p className="kicker">{t("line")}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {categories.map((item) => (
              <Link key={item.slug} href={item.href} className="group grid gap-5 border border-line bg-paper p-5 sm:grid-cols-[140px_1fr]">
                <img src={item.hero} alt="" className="h-28 w-full object-cover sm:h-full" />
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">{item.title[lang]}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.lead?.[lang] ?? item.cardText[lang]}</p>
                  <span className="mt-4 inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.14em] text-burgundy uppercase">
                    {item.productSlugs.length} {t("unit")}
                    <span className="h-px w-6 bg-burgundy transition-all group-hover:w-10" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ApproachBand />
      <section className="border-t border-line bg-white px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {copy.values.map(([title, text], index) => (
            <article key={title} className="bg-white p-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-burgundy">0{index + 1}</p>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
