import type { Metadata } from "next";
import type { ContactInfo } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/messages";
import type { SocialConfig } from "@/lib/social";

export const siteUrl = "https://redasy.com";

const ogLocale = { tr: "tr_TR", en: "en_US", ar: "ar_AR" } as const;

type Line = Record<Locale, string>;

const activityTitles: Record<string, Line> = {
  "kirma-eleme-yikama": {
    tr: "Mobil Kırma Eleme Yıkama Tesisi",
    en: "Mobile Crushing, Screening and Washing Plant",
    ar: "مصنع تكسير وغربلة وغسل متنقل",
  },
  makineler: {
    tr: "Mobil Konkasör ve Eleme Tesisi",
    en: "Mobile Crusher and Screening Plant",
    ar: "كسارة وغربال متنقل",
  },
  "yedek-parca": {
    tr: "Kırıcı ve Elek Yedek Parça",
    en: "Crusher and Screen Spare Parts",
    ar: "قطع غيار الكسارات والغرابيل",
  },
  "is-makinesi-atasmanlari": {
    tr: "Ekskavatör ve İş Makinesi Ataşmanları",
    en: "Excavator and Equipment Attachments",
    ar: "ملحقات الحفارات ومعدات البناء",
  },
  "arac-ustu-ekipmanlar": {
    tr: "Araç Üstü Ekipman Üretimi",
    en: "Truck-Mounted Equipment",
    ar: "تصنيع تجهيزات المركبات",
  },
  "mobil-cozumler": {
    tr: "Özel Amaçlı Mobil Treyler",
    en: "Special-Purpose Mobile Trailers",
    ar: "مقطورات متنقلة لأغراض خاصة",
  },
};

const activityBlurbs: Record<string, Line> = {
  "kirma-eleme-yikama": {
    tr: "Mobil çeneli ve darbeli kırıcı, elek, helezonlu yıkama, konveyör ve çelik bunker. REDASY kırma, eleme ve yıkama tesisini kendi fabrikasında üretir.",
    en: "Mobile jaw and impact crushers, screens, spiral washers, conveyors and steel hoppers. REDASY builds crushing, screening and washing plants in its own factory.",
    ar: "كسارات فكية وصادمية متنقلة، وغرابيل، وغسالات حلزونية، وسيور، وقواديس فولاذية. تصنّع REDASY مصانع التكسير والغربلة والغسل في مصنعها.",
  },
  makineler: {
    tr: "MC-120 mobil çeneli ve darbeli kırıcı, MW-200 elek ve helezonlu yıkama, MT-175 tekerlekli kırma eleme tesisi, konveyör bant ve çelik bunker.",
    en: "MC-120 mobile jaw and impact crusher, MW-200 screen and spiral washer, MT-175 wheeled crushing and screening plant, conveyors and steel hoppers.",
    ar: "الكسارة الفكية والصادمية المتنقلة MC-120، وغربال وغسالة حلزونية MW-200، ومصنع التكسير والغربلة بعجلات MT-175، والسيور والقواديس.",
  },
  "yedek-parca": {
    tr: "Çeneli, darbeli, tersiyer, dik milli ve çekiçli kırıcı yedek parçaları; elek teli, konveyör rulosu, tambur ve helezon yıkayıcı aşınma parçaları.",
    en: "Spare parts for jaw, impact, tertiary, vertical-shaft and hammer crushers, plus screen mesh, conveyor rollers, drums and spiral-washer wear parts.",
    ar: "قطع غيار للكسارات الفكية والصادمية والثالثية وذات العمود الرأسي والمطرقية، إضافة إلى شبك الغربال وبكرات السير والطبل وأجزاء تآكل الغسالة.",
  },
  "is-makinesi-atasmanlari": {
    tr: "Ekskavatör kovası, rotatif elek kova, hidrolik kıskaç, yıkım makası, riper, quick coupler ve loader kovası. REDASY iş makinesi ataşmanı üretir.",
    en: "Excavator buckets, rotary screening buckets, hydraulic grapples, demolition shears, rippers, quick couplers and loader buckets, built by REDASY.",
    ar: "دلاء حفارات، ودلاء غربلة دوّارة، وملاقط هيدروليكية، ومقصات هدم، وريبر، وقارنات سريعة، ودلاء لوادر. تصنّعها REDASY.",
  },
  "arac-ustu-ekipmanlar": {
    tr: "Frigo kasa, vidanjör, arazöz, silobas, sıkıştırmalı çöp kasası, itfaiye üst yapısı, hidrolik vinç, hooklift ve oto kurtarıcı üretimi.",
    en: "Refrigerated bodies, vacuum tankers, water bowsers, cement bulker, refuse compactors, fire bodies, cranes, hooklifts and recovery vehicles.",
    ar: "صناديق تبريد، وشفط صرف، وصهاريج مياه، وصوامع أسمنت، وصناديق نفايات ضاغطة، وهياكل إطفاء، ورافعات، وخطاطيف، ومركبات إنقاذ.",
  },
  "mobil-cozumler": {
    tr: "Kan bağışı, diş kliniği, mamografi, poliklinik, mutfak ve afet koordinasyon treyleri. REDASY özel amaçlı mobil çözümler üretir.",
    en: "Blood-donation, dental, mammography, clinic, kitchen and disaster-coordination trailers. REDASY builds special-purpose mobile units.",
    ar: "مقطورات للتبرع بالدم وطب الأسنان وتصوير الثدي والعيادات والمطابخ وتنسيق الكوارث. تصنّع REDASY حلولاً متنقلة للأغراض الخاصة.",
  },
};

const pageBlurbs: Record<string, Line> = {
  hakkimizda: {
    tr: "REDASY, mobil kırma eleme yıkama tesislerini, iş makinesi ataşmanlarını, araç üstü ekipmanları ve özel mobil treylerleri kendi sanayi tesisinde üretir.",
    en: "REDASY manufactures mobile crushing plants, equipment attachments, truck-mounted bodies and special mobile trailers in its own industrial plant.",
    ar: "تصنّع REDASY مصانع التكسير المتنقلة وملحقات المعدات وتجهيزات المركبات والمقطورات الخاصة في منشأتها الصناعية.",
  },
  vizyonumuz: {
    tr: "REDASY, kırma eleme, ataşman ve araç üstü ekipmanda mühendislik çözümünü kendi Ar-Ge kadrosu ve üretim ağıyla daha geniş coğrafyaya taşır.",
    en: "REDASY takes its crushing, attachment and truck-equipment engineering to a wider geography through its own R&D team and manufacturing network.",
    ar: "تنقل REDASY هندسة التكسير والملحقات وتجهيزات المركبات إلى جغرافيا أوسع عبر فريق البحث وشبكة التصنيع لديها.",
  },
  sertifikalarimiz: {
    tr: "REDASY, kırma eleme tesislerini, ataşmanları ve araç üstü ekipmanları uluslararası üretim standardına göre kendi fabrikasında üretir.",
    en: "REDASY builds crushing plants, attachments and truck-mounted equipment in its own factory, to an international production standard.",
    ar: "تنتج REDASY مصانع التكسير والملحقات وتجهيزات المركبات في مصنعها وفق معيار إنتاج دولي.",
  },
  "kalite-politikamiz": {
    tr: "REDASY kalite politikası, kırma eleme tesisinden ataşmana ve araç üstü ekipmana kadar ürünün sahada güvenle çalışmasını hedefler.",
    en: "REDASY’s quality policy aims for crushing plants, attachments and truck-mounted equipment that work reliably in the field.",
    ar: "تهدف سياسة جودة REDASY إلى أن تعمل مصانع التكسير والملحقات وتجهيزات المركبات بثقة في الموقع.",
  },
};

const indexBlurb: Line = {
  tr: "Kırma eleme yıkama tesisleri, ekskavatör ataşmanları, araç üstü ekipmanlar ve özel amaçlı mobil treylerler. REDASY faaliyet alanları.",
  en: "Crushing and washing plants, excavator attachments, truck-mounted equipment and special-purpose trailers. REDASY fields of activity.",
  ar: "مصانع تكسير وغسل، وملحقات حفارات، وتجهيزات مركبات، ومقطورات لأغراض خاصة. مجالات نشاط REDASY.",
};

export function clip(value: string, max = 165) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return (space > 80 ? cut.slice(0, space) : cut).replace(/[.,;:\s]+$/, "");
}

export function activityTitle(slug: string, locale: Locale, fallback: string) {
  return activityTitles[slug]?.[locale] || fallback;
}

export function activitySummary(slug: string, locale: Locale, lead = "") {
  const own = lead.replace(/\s+/g, " ").trim();
  if (own.length >= 80) return clip(own);
  return activityBlurbs[slug]?.[locale] || pageBlurbs[slug]?.[locale] || "";
}

export function pageSummary(slug: string, locale: Locale, lead = "") {
  return activitySummary(slug, locale, lead) || indexBlurb[locale];
}

export function catalogIndexSummary(locale: Locale) {
  return indexBlurb[locale];
}

export function pageMeta(locale: Locale, options: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  const title = options.title.includes("REDASY") ? options.title : `${options.title} | REDASY`;
  const description = clip(options.description);
  const url = !options.path || options.path === "/" ? siteUrl : new URL(options.path, siteUrl).toString();
  return {
    title: { absolute: title },
    description,
    keywords: options.keywords ?? [],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "REDASY",
      type: "website",
      locale: ogLocale[locale],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

function phoneE164(number: string) {
  const raw = number.replace(/\D/g, "");
  if (!raw) return "";
  if (raw.startsWith("90")) return `+${raw}`;
  if (raw.startsWith("0")) return `+90${raw.slice(1)}`;
  return `+90${raw}`;
}

function compact(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== ""));
}

export function siteGraph(locale: Locale, contact: ContactInfo, social: SocialConfig) {
  const copy = ui(locale);
  const phone = contact.phones.find((item) => !item.whatsapp) ?? contact.phones[0];
  const sameAs = social.links.filter((item) => item.visible && /^https?:\/\//i.test(item.href)).map((item) => item.href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      compact({
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "REDASY",
        legalName: "REDASY Engineering & Industrial Group",
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
        description: copy.metaDescription,
        email: contact.email || undefined,
        telephone: phone ? phoneE164(phone.number) : undefined,
        address: contact.address
          ? { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "TR" }
          : undefined,
        sameAs: sameAs.length ? sameAs : undefined,
      }),
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "REDASY",
        description: copy.metaDescription,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export function breadcrumbGraph(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path || "/", siteUrl).toString(),
    })),
  };
}

export function productGraph(options: { name: string; description: string; path: string; sku?: string; images: string[] }) {
  const images = options.images.filter((src) => src.startsWith("/")).map((src) => new URL(src, siteUrl).toString());
  return compact({
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: clip(options.description, 400),
    sku: options.sku || undefined,
    image: images.length ? images : undefined,
    url: new URL(options.path, siteUrl).toString(),
    brand: { "@type": "Brand", name: "REDASY" },
    manufacturer: { "@id": `${siteUrl}/#organization` },
  });
}
