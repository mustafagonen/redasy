"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "tr" | "en" | "ar";

type Dict = Record<string, string>;

const copy: Record<Lang, Dict> = {
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    areas: "Faaliyet Alanlarımız",
    news: "Haberler",
    contact: "İletişim",
    products: "Ürünler",
    projects: "Projeler",
    explore: "Faaliyet Alanlarımızı Keşfedin",
    details: "Detayları İncele",
    corporate: "KURUMSAL BAKIŞ",
    corpTitle: "Kurumsal Gücümüz & Mühendislik Vizyonumuz",
    statSectors: "Ana Sektör",
    statCountries: "Ülkeye İhracat",
    statLocal: "Yerli Mühendislik & Ar-Ge",
    statTurnkey: "Teslim Çözümler",
    statTurnkeyValue: "Anahtar",
    mapTitle: "Küresel Erişim & İhracat Ağımız",
    footerBlurb: "Endüstriyel güç, mühendislik ve inovasyonla geleceği tasarlıyoruz.",
    contactTitle: "İletişim",
    addressLabel: "Merkez & Fabrika:",
    address: "Ankara, Türkiye",
    phoneLabel: "Tel:",
    mailLabel: "E-Posta:",
    quick: "Hızlı Erişim",
    write: "Bize Yazın",
    namePh: "Adınız / E-posta",
    msgPh: "Mesajınız...",
    send: "Gönder",
    sent: "Mesajınız alındı. Ekibimiz en kısa sürede dönüş yapacak.",
    rights: "© 2026 REDASY Engineering & Industrial Group. Tüm Hakları Saklıdır. Tasarım REDASY",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    heroTitle: "Endüstrinin Geleceğini Mühendislikle Tasarlıyoruz.",
    heroText:
      "Yüksek performanslı mobil kırma, eleme, ataşman ve araç üstü ekipman çözümleri sunan global güç.",
    quote: "Teklif Al / Bilgi İste",
    catalog: "Katalog İndir (PDF)",
    techCatalog: "Teknik Katalog İndir (PDF)",
    close: "Kapat",
    yourName: "Ad Soyad",
    email: "E-posta",
    phone: "Telefon",
    message: "Mesaj",
    product: "Ürün",
    required: "Lütfen ad ve e-posta alanlarını doldurun.",
    menu: "Menü",
    allNews: "Tüm Haberler",
    read: "Devamını Oku",
    sendRequest: "Talebi Gönder",
    related: "İlgili ürün",
    notFound: "Aradığınız sayfa bulunamadı.",
    backHome: "Ana sayfaya dön",
    print: "PDF olarak kaydet",
    catalogNote: "Yazdır penceresinden “PDF olarak kaydet” seçeneğini kullanabilirsiniz.",
  },
  en: {
    home: "Home",
    about: "About Us",
    areas: "Business Areas",
    news: "News",
    contact: "Contact",
    products: "Products",
    projects: "Projects",
    explore: "Explore Our Business Areas",
    details: "View Details",
    corporate: "CORPORATE OUTLOOK",
    corpTitle: "Our Corporate Strength & Engineering Vision",
    statSectors: "Core Sectors",
    statCountries: "Export Countries",
    statLocal: "Local Engineering & R&D",
    statTurnkey: "Delivery Solutions",
    statTurnkeyValue: "Turnkey",
    mapTitle: "Our Global Reach & Export Network",
    footerBlurb: "We design the future with industrial strength, engineering and innovation.",
    contactTitle: "Contact",
    addressLabel: "Headquarters & Plant:",
    address: "Ankara, Türkiye",
    phoneLabel: "Tel:",
    mailLabel: "E-mail:",
    quick: "Quick Links",
    write: "Write to Us",
    namePh: "Name / E-mail",
    msgPh: "Your message...",
    send: "Send",
    sent: "Your message has been received. Our team will get back to you shortly.",
    rights: "© 2026 REDASY Engineering & Industrial Group. All Rights Reserved. Design REDASY",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    heroTitle: "We Engineer the Future of Industry.",
    heroText:
      "A global force in high-performance mobile crushing, screening, attachments and truck-mounted equipment.",
    quote: "Request a Quote",
    catalog: "Download Catalog (PDF)",
    techCatalog: "Download Technical Catalog (PDF)",
    close: "Close",
    yourName: "Full name",
    email: "E-mail",
    phone: "Phone",
    message: "Message",
    product: "Product",
    required: "Please enter your name and e-mail.",
    menu: "Menu",
    allNews: "All News",
    read: "Read More",
    sendRequest: "Submit Request",
    related: "Related product",
    notFound: "The page you are looking for could not be found.",
    backHome: "Back to home",
    print: "Save as PDF",
    catalogNote: "In the print dialog, choose “Save as PDF”.",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    areas: "مجالات النشاط",
    news: "الأخبار",
    contact: "اتصل بنا",
    products: "المنتجات",
    projects: "المشاريع",
    explore: "اكتشف مجالات نشاطنا",
    details: "عرض التفاصيل",
    corporate: "النظرة المؤسسية",
    corpTitle: "قوتنا المؤسسية ورؤيتنا الهندسية",
    statSectors: "قطاعات رئيسية",
    statCountries: "دول التصدير",
    statLocal: "هندسة محلية وبحث وتطوير",
    statTurnkey: "حلول تسليم",
    statTurnkeyValue: "مفتاح",
    mapTitle: "انتشارنا العالمي وشبكة التصدير",
    footerBlurb: "نصمّم المستقبل بقوة صناعية وهندسة وابتكار.",
    contactTitle: "التواصل",
    addressLabel: "المركز والمصنع:",
    address: "أنقرة، تركيا",
    phoneLabel: "هاتف:",
    mailLabel: "البريد:",
    quick: "وصول سريع",
    write: "راسلنا",
    namePh: "الاسم / البريد",
    msgPh: "رسالتك...",
    send: "إرسال",
    sent: "تم استلام رسالتك. سيتواصل فريقنا معك قريبًا.",
    rights: "© 2026 REDASY Engineering & Industrial Group. جميع الحقوق محفوظة. تصميم REDASY",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    heroTitle: "نصمّم مستقبل الصناعة بالهندسة.",
    heroText:
      "قوة عالمية في حلول الكسر والغربلة المتنقلة والملحقات ومعدات المركبات عالية الأداء.",
    quote: "اطلب عرض سعر",
    catalog: "تنزيل الكتالوج (PDF)",
    techCatalog: "تنزيل الكتالوج الفني (PDF)",
    close: "إغلاق",
    yourName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    product: "المنتج",
    required: "يرجى إدخال الاسم والبريد الإلكتروني.",
    menu: "القائمة",
    allNews: "كل الأخبار",
    read: "اقرأ المزيد",
    sendRequest: "إرسال الطلب",
    related: "منتج ذو صلة",
    notFound: "الصفحة التي تبحث عنها غير موجودة.",
    backHome: "العودة إلى الرئيسية",
    print: "حفظ كملف PDF",
    catalogNote: "من نافذة الطباعة اختر «حفظ كملف PDF».",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const saved = window.localStorage.getItem("redasy-lang") as Lang | null;
    if (saved === "tr" || saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("redasy-lang", next);
  };

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key) => copy[lang][key] ?? key,
      dir: lang === "ar" ? "rtl" : "ltr",
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}

export const languages: { id: Lang; label: string }[] = [
  { id: "tr", label: "TR" },
  { id: "en", label: "EN" },
  { id: "ar", label: "العربية" },
];
