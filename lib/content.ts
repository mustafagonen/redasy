import type { Lang } from "./i18n";

export type L<T> = Record<Lang, T>;

export type Spec = {
  label: L<string>;
  value: L<string>;
  tick?: "before" | "after" | "none";
  tone?: "ink" | "burgundy" | "muted";
};

export type Product = {
  slug: string;
  category: string;
  group?: string;
  image: string;
  hero?: string;
  cardTitle: L<string>;
  title: L<string>;
  bullets: L<string[]>;
  series?: L<string>;
  code?: string;
  eyebrow?: L<string>;
  body?: L<string>;
  specs?: Spec[];
  catalogLabel?: "catalog" | "techCatalog";
};

export type Category = {
  slug: string;
  href: string;
  image: string;
  cardImage: string;
  hero: string;
  eyebrow?: L<string>;
  title: L<string>;
  cardTitle: L<string>;
  cardText: L<string>;
  lead?: L<string>;
  subtitle?: L<string>;
  columns: 2 | 3 | 4;
  badge?: L<string>;
  tabs: { id: string; label: L<string>; href?: string }[];
  productSlugs: string[];
  parkedSlugs?: string[];
};

const tr = (s: string, en: string, ar: string): L<string> => ({ tr: s, en, ar });
const bullets = (tr: string[], en: string[], ar: string[]): L<string[]> => ({ tr, en, ar });

export const phones = [
  { display: "0850 303 02 06", tel: "+908503030206", role: tr("Santral", "Switchboard", "السنترال") },
  { display: "0531 529 02 06", tel: "+905315290206", whatsapp: true, role: tr("WhatsApp", "WhatsApp", "واتساب") },
  { display: "0312 870 06 02", tel: "+903128700602", role: tr("Ofis", "Office", "المكتب") },
];
export const phone = phones[0].display;
export const whatsappNumber = "905315290206";
export const email = "info@redasy.com";

export const products: Product[] = [
  {
    slug: "mobil-kirma-eleme",
    category: "kirma-eleme-yikama",
    image: "/images/products/mobil-kirma-eleme.jpg",
    hero: "/images/products/mobil-kirma-eleme-hero.jpg",
    cardTitle: tr("Mobil Kırma & Eleme Tesisleri", "Mobile Crushing & Screening Plants", "محطات الكسر والغربلة المتنقلة"),
    title: tr(
      "Mobil Çeneli ve Darbeli Kırıcı - MC-120",
      "Mobile Jaw & Impact Crusher - MC-120",
      "كسارة فكية وصدمة متنقلة - MC-120",
    ),
    series: tr("Mobil Kırma & Eleme Serisi", "Mobile Crushing & Screening Series", "سلسلة الكسر والغربلة المتنقلة"),
    bullets: bullets(
      ["Mobil Çeneli ve Darbeli Kırıcılar", "Mobil Eleme Üniteleri", "Paletli ve Tekerlekli Seçenekler"],
      ["Mobile jaw and impact crushers", "Mobile screening units", "Tracked and wheeled options"],
      ["كسارات فكية وصدمة متنقلة", "وحدات غربلة متنقلة", "خيارات مجنزرة وعجلات"],
    ),
    eyebrow: tr("YÜKSEK PERFORMANS & MOBİLİTE", "HIGH PERFORMANCE & MOBILITY", "أداء عالٍ وتنقل"),
    body: tr(
      "Zorlu şantiye ve maden şartlarında yüksek verimlilikle çalışmak üzere tasarlanan MC-120, üstün kırma kapasitesi, paletli yürüyüş sistemi ve kolay taşınabilirliği ile her türlü doğal taş ve geri dönüşüm malzemesini hızla işler.",
      "Designed for high output in demanding quarry and site conditions, the MC-120 processes natural stone and recycling material quickly with strong crushing capacity, a tracked undercarriage and easy transport.",
      "صُممت MC-120 للعمل بكفاءة عالية في ظروف المقالع والمواقع الصعبة، وتعالج الحجر الطبيعي ومواد إعادة التدوير بسرعة بفضل قدرة الكسر والمجنزر وسهولة النقل.",
    ),
    specs: [
      { label: tr("Kapasite", "Capacity", "السعة"), value: tr("150 - 250 Ton / Saat", "150 - 250 tph", "150 - 250 طن / ساعة") },
      { label: tr("Ağırlık", "Weight", "الوزن"), value: tr("42 Ton", "42 tons", "42 طنًا") },
      { label: tr("Kırıcı Tipi", "Crusher Type", "نوع الكسارة"), value: tr("Çeneli ve Darbeli (Kombine)", "Jaw and impact (combined)", "فكية وصدمة (مدمجة)") },
      { label: tr("Yürüyüş Sistemi", "Undercarriage", "نظام الحركة"), value: tr("Ağır Hizmet Tipi Paletli", "Heavy-duty tracked", "مجنزر للخدمة الشاقة") },
      { label: tr("Besleme Boyutu", "Feed Size", "حجم التغذية"), value: tr("Maksimum 800 mm", "Maximum 800 mm", "800 مم كحد أقصى") },
      { label: tr("Kontrol Sistemi", "Control System", "نظام التحكم"), value: tr("Kablosuz Uzaktan Kumanda & PLC", "Wireless remote & PLC", "تحكم لاسلكي وPLC") },
      { label: tr("Motor Gücü", "Power", "الاستطاعة"), value: tr("350 kW Jeneratör & Dizel", "350 kW generator & diesel", "مولد 350 كيلوواط وديزل") },
      { label: tr("Çevre Dostu", "Environmental", "البيئة"), value: tr("Toz İndirgeme ve Gürültü İzolasyonu", "Dust suppression and noise isolation", "تقليل الغبار وعزل الضجيج") },
    ],
  },
  {
    slug: "mobil-eleme-yikama",
    category: "kirma-eleme-yikama",
    image: "/images/products/mobil-eleme-yikama.jpg",
    cardTitle: tr("Mobil Eleme & Yıkama Tesisleri", "Mobile Screening & Washing Plants", "محطات الغربلة والغسل المتنقلة"),
    title: tr("Mobil Eleme & Yıkama Tesisleri", "Mobile Screening & Washing Plants", "محطات الغربلة والغسل المتنقلة"),
    bullets: bullets(
      ["Mobil Helezonlu Yıkama Üniteleri", "Kılçık ve Susuzlandırma Elekleri", "Kum ve Çakıl Yıkama Tesisleri"],
      ["Mobile screw washing units", "Dewatering and fine screens", "Sand and gravel washing plants"],
      ["وحدات غسل حلزونية متنقلة", "غرابيل نزح المياه", "محطات غسل الرمل والحصى"],
    ),
    eyebrow: tr("TEMİZ AGREGA, YÜKSEK VERİM", "CLEAN AGGREGATE, HIGH OUTPUT", "ركام نظيف وإنتاج عالٍ"),
    body: tr(
      "Kum, çakıl ve geri dönüşüm hatları için tasarlanan mobil eleme ve yıkama tesisleri; helezonlu yıkama, kılçık elek ve susuzlandırma üniteleriyle satışa hazır agrega üretir.",
      "Mobile screening and washing plants for sand, gravel and recycling lines produce sale-ready aggregate with screw washers, fine screens and dewatering units.",
      "تنتج محطات الغربلة والغسل المتنقلة ركامًا جاهزًا للبيع عبر وحدات الغسل الحلزونية وغرابيل النزح.",
    ),
  },
  {
    slug: "mobil-kirma-yuksek",
    category: "kirma-eleme-yikama",
    image: "/images/products/mobil-kirma-yuksek.jpg",
    cardTitle: tr("Mobil Kırma & Eleme Tesisleri", "Mobile Crushing & Screening Plants", "محطات الكسر والغربلة المتنقلة"),
    title: tr("Yüksek Kapasiteli Mobil Kırma Tesisi", "High-Capacity Mobile Crushing Plant", "محطة كسر متنقلة عالية السعة"),
    bullets: bullets(
      ["Mobil Çeneli ve Darbeli Kırıcılar", "Paletli ve Tekerlekli Seçenekler", "Yüksek Kapasiteli Agrega Üretimi"],
      ["Mobile jaw and impact crushers", "Tracked and wheeled options", "High-capacity aggregate production"],
      ["كسارات فكية وصدمة متنقلة", "خيارات مجنزرة وعجلات", "إنتاج ركام عالي السعة"],
    ),
    eyebrow: tr("YÜKSEK KAPASİTELİ AGREGA", "HIGH-CAPACITY AGGREGATE", "ركام عالي السعة"),
    body: tr(
      "Büyük ölçekli ocak ve altyapı projeleri için kurgulanan yüksek kapasiteli mobil kırma hattı, çeneli ve darbeli kırıcı kombinasyonuyla sürekli agrega üretimi sağlar.",
      "Configured for large quarries and infrastructure projects, this high-capacity mobile line keeps aggregate flowing with a jaw and impact combination.",
      "خُط الكسر المتنقل عالي السعة مخصص للمقالع الكبيرة ومشاريع البنية التحتية ويؤمن تدفقًا مستمرًا للركام.",
    ),
  },
  {
    slug: "konveyor-bunker",
    category: "kirma-eleme-yikama",
    image: "/images/products/konveyor-bunker.jpg",
    cardTitle: tr("Konveyör Bantlar & Bunker Sistemleri", "Conveyors & Bunker Systems", "السيور وأنظمة المخابئ"),
    title: tr("Konveyör Bantlar & Bunker Sistemleri", "Conveyors & Bunker Systems", "السيور وأنظمة المخابئ"),
    bullets: bullets(
      ["Ağır Hizmet Tipi Konveyör Bantlar", "Stok ve Besleme Bunkerleri", "Mobil ve Sabit Silo Çözümleri", "Yüksek Kapasiteli Çelik Bunkerler"],
      ["Heavy-duty conveyor belts", "Stockpile and feed hoppers", "Mobile and fixed silo solutions", "High-capacity steel bunkers"],
      ["سيور خدمة شاقة", "مخابئ تخزين وتغذية", "حلول صوامع متنقلة وثابتة", "مخابئ فولاذية عالية السعة"],
    ),
    eyebrow: tr("TAŞIMA VE DEPOLAMA", "HANDLING AND STORAGE", "النقل والتخزين"),
    body: tr(
      "Yüksek dayanımlı taşıma ve depolama sistemleri; ağır hizmet konveyörleri, stok bunkerleri ve mobil-sabit silo çözümleriyle tesis içi malzeme akışını kesintisiz kılar.",
      "High-strength handling and storage systems keep in-plant material moving with heavy-duty conveyors, stockpile hoppers and mobile or fixed silos.",
      "أنظمة نقل وتخزين عالية المتانة تبقي تدفق المواد مستمرًا عبر السيور والمخابئ والصوامع.",
    ),
  },
  {
    slug: "bant-konveyor-parcalari",
    category: "yedek-parca",
    image: "/images/products/bant-konveyor-parcalari.jpg",
    cardTitle: tr("Bant Konveyör Yedek Parçaları", "Belt Conveyor Spare Parts", "قطع غيار السيور الناقلة"),
    title: tr("Bant Konveyör Yedek Parçaları", "Belt Conveyor Spare Parts", "قطع غيار السيور الناقلة"),
    bullets: bullets(
      ["Rulolar ve Şaseler", "Yüksek Dayanımlı Bantlar", "Tahrik ve Geri Tamburları"],
      ["Rollers and frames", "High-strength belts", "Drive and return drums"],
      ["بكرات وهياكل", "سيور عالية المتانة", "درامات القيادة والرجوع"],
    ),
  },
  {
    slug: "dmk-parcalari",
    category: "yedek-parca",
    image: "/images/products/dmk-parcalari.jpg",
    cardTitle: tr("Dere Malzemesi Kırıcı (DMK) Parçaları", "DMK Crusher Parts", "قطع كسارة المواد النهرية"),
    title: tr("Dere Malzemesi Kırıcı (DMK) Parçaları", "River-Material Crusher (DMK) Parts", "قطع كسارة المواد النهرية (DMK)"),
    bullets: bullets(
      ["DMK Kırıcı Palet ve Çeneler", "Aşınma Astar Plakaları", "Rotor ve Kırıcı Çekiçler"],
      ["DMK breaker plates and jaws", "Wear liner plates", "Rotors and hammers"],
      ["ألواح وفكوك DMK", "بطائن تآكل", "دوارات ومطارق"],
    ),
  },
  {
    slug: "titresimli-elek-parcalari",
    category: "yedek-parca",
    image: "/images/products/titresimli-elek-parcalari.jpg",
    cardTitle: tr("Titreşimli Elek Yedek Parçaları", "Vibrating Screen Spare Parts", "قطع غيار الغرابيل الهزازة"),
    title: tr("Titreşimli Elek Yedek Parçaları", "Vibrating Screen Spare Parts", "قطع غيار الغرابيل الهزازة"),
    bullets: bullets(
      ["Çelik ve Poliüretan Elek Telleri", "Titreşim Motorları ve Yaylar", "Eksantrik Miller"],
      ["Steel and polyurethane screen media", "Vibrator motors and springs", "Eccentric shafts"],
      ["شبك فولاذي وبولي يوريثان", "محركات اهتزاز ونوابض", "أعمدة لامركزية"],
    ),
  },
  {
    slug: "tersiyer-kirici-parcalari",
    category: "yedek-parca",
    image: "/images/products/tersiyer-kirici-parcalari.jpg",
    cardTitle: tr("Tersiyer Kırıcı Yedek Parçaları", "Tertiary Crusher Spare Parts", "قطع غيار الكسارة الثالثية"),
    title: tr("Tersiyer Kırıcı Yedek Parçaları", "Tertiary Crusher Spare Parts", "قطع غيار الكسارة الثالثية"),
    bullets: bullets(
      ["Tersiyer Kırıcı Paletleri", "Aşınma ve Çarpma Plakaları", "Ayar Mekanizmaları"],
      ["Tertiary breaker plates", "Wear and impact plates", "Adjustment mechanisms"],
      ["ألواح الكسارة الثالثية", "ألواح تآكل وصدمة", "آليات الضبط"],
    ),
  },
  {
    slug: "ceneli-kirici-parcalari",
    category: "yedek-parca",
    image: "/images/products/ceneli-kirici-parcalari.jpg",
    hero: "/images/products/ceneli-kirici-parcalari-hero.jpg",
    cardTitle: tr("Çeneli Kırıcı Yedek Parçaları", "Jaw Crusher Spare Parts", "قطع غيار الكسارة الفكية"),
    title: tr(
      "Çeneli Kırıcı Yedek Parçaları - Manganlı Çene Astarları",
      "Jaw Crusher Parts - Manganese Jaw Plates",
      "قطع الكسارة الفكية - بطائن فك منغنيزية",
    ),
    series: tr("YEDEK PARÇA SERİSİ", "SPARE PARTS SERIES", "سلسلة قطع الغيار"),
    bullets: bullets(
      ["Hareketli ve Sabit Çeneler", "Aşınma Astarları (Çene)", "Merdaneler ve Volanlar"],
      ["Moving and fixed jaws", "Jaw wear liners", "Rollers and flywheels"],
      ["فكوك متحركة وثابتة", "بطائن تآكل الفك", "درافيل وحدافات"],
    ),
    eyebrow: tr("YÜKSEK AŞINMA DİRENCİ", "HIGH WEAR RESISTANCE", "مقاومة تآكل عالية"),
    body: tr(
      "Zorlu kırma ve madencilik şartlarında maksimum çalışma ömrü sunan manganlı çene astarlarımız, darbe ve aşınmaya karşı en yüksek dayanıklılığı sağlar. Ağır hizmet tipi tesislerimiz ve ocaklarımız için özel olarak üretilmiştir.",
      "Our manganese jaw plates are built for maximum service life in harsh crushing and mining duty, with high resistance to impact and abrasion.",
      "توفر بطائن الفك المنغنيزية أطول عمر تشغيل في ظروف الكسر والتعدين القاسية مع مقاومة عالية للصدم والتآكل.",
    ),
    specs: [
      { label: tr("Malzeme Grubu", "Material", "المادة"), value: tr("Mn14, Mn18, Mn22 Alaşımlı Manganez Çelik", "Mn14, Mn18, Mn22 manganese steel", "فولاذ منغنيز Mn14 وMn18 وMn22") },
      { label: tr("Darbe ve Aşınma Dayanımı", "Impact & Wear", "الصدم والتآكل"), value: tr("Yüksek aşınma ve darbe direnci", "High abrasion and impact resistance", "مقاومة عالية للتآكل والصدم") },
      { label: tr("Uyumlu Markalar", "Compatible Brands", "العلامات المتوافقة"), value: tr("Tüm global çeneli kırıcı markalarıyla uyumlu", "Compatible with global jaw crusher brands", "متوافقة مع علامات الكسارات الفكية العالمية") },
      { label: tr("Uygulama Alanı", "Application", "مجال الاستخدام"), value: tr("Sert doğal taşlar, madencilik, agrega ve geri dönüşüm", "Hard rock, mining, aggregate and recycling", "الصخور الصلبة والتعدين والركام وإعادة التدوير") },
      { label: tr("Üretim Standartları", "Manufacturing", "التصنيع"), value: tr("OEM standartlarında hassas döküm", "Precision casting to OEM standards", "صب دقيق وفق معايير OEM") },
      { label: tr("Sertlik Değeri", "Hardness", "الصلادة"), value: tr("Sıkışma sonrası yüksek yüzey sertliği", "High surface hardness after work hardening", "صلادة سطحية عالية بعد التصلد التشغيلي") },
    ],
  },
  {
    slug: "dik-milli-parcalari",
    category: "yedek-parca",
    image: "/images/products/dik-milli-parcalari.jpg",
    cardTitle: tr("Dik Milli Kırıcı Yedek Parçaları", "VSI Crusher Spare Parts", "قطع غيار الكسارة العمودية"),
    title: tr("Dik Milli Kırıcı Yedek Parçaları", "Vertical Shaft Impact Spare Parts", "قطع غيار الكسارة ذات العمود الرأسي"),
    bullets: bullets(
      ["Rotor Aşınma Parçaları", "Kırıcı Elmaslar ve Pabuçlar", "Dağıtıcı Tablalar"],
      ["Rotor wear parts", "Anvils and shoes", "Distributor tables"],
      ["قطع تآكل الدوار", "سنادين وأحذية", "طاولات التوزيع"],
    ),
  },
  {
    slug: "sekonder-darbeli-parcalari",
    category: "yedek-parca",
    image: "/images/products/sekonder-darbeli-parcalari.jpg",
    cardTitle: tr("Sekonder Darbeli Kırıcı Parçaları", "Secondary Impact Crusher Parts", "قطع الكسارة الصدمية الثانوية"),
    title: tr("Sekonder Darbeli Kırıcı Parçaları", "Secondary Impact Crusher Parts", "قطع الكسارة الصدمية الثانوية"),
    bullets: bullets(
      ["Kırıcı Paletler ve Çekiçler", "Aşınma ve Tavan Astarları", "Rotor ve Mil Bileşenleri"],
      ["Breaker plates and hammers", "Wear and roof liners", "Rotor and shaft components"],
      ["ألواح ومطارق", "بطائن سقف وتآكل", "مكونات الدوار والعمود"],
    ),
  },
  {
    slug: "cekicli-kirici-parcalari",
    category: "yedek-parca",
    image: "/images/products/cekicli-kirici-parcalari.jpg",
    cardTitle: tr("Çekiçli Kırıcı Yedek Parçaları", "Hammer Crusher Spare Parts", "قطع غيار الكسارة المطرقية"),
    title: tr("Çekiçli Kırıcı Yedek Parçaları", "Hammer Crusher Spare Parts", "قطع غيار الكسارة المطرقية"),
    bullets: bullets(
      ["Kırıcı Çekiçler ve Rotorlar", "Izgara ve Elek Plakaları", "Zırh ve Aşınma Astarları"],
      ["Hammers and rotors", "Grate and screen plates", "Armor and wear liners"],
      ["مطارق ودوارات", "ألواح شبك وغربال", "دروع وبطائن تآكل"],
    ),
  },
  {
    slug: "helezon-yikayici-parcalari",
    category: "yedek-parca",
    image: "/images/products/helezon-yikayici-parcalari.jpg",
    cardTitle: tr("Helezon Yıkayıcı Yedek Parçaları", "Screw Washer Spare Parts", "قطع غيار الغسالة الحلزونية"),
    title: tr("Helezon Yıkayıcı Yedek Parçaları", "Screw Washer Spare Parts", "قطع غيار الغسالة الحلزونية"),
    bullets: bullets(
      ["Helezon Aşınma Pabuçları", "Mil ve Redüktör Parçaları", "Sarmal Aşınma Sacları"],
      ["Screw wear shoes", "Shaft and gearbox parts", "Spiral wear plates"],
      ["أحذية تآكل الحلزون", "قطع العمود والمخفض", "ألواح تآكل لولبية"],
    ),
  },
  {
    slug: "agir-hizmet-kova",
    category: "is-makinesi-atasmanlari",
    group: "standart",
    image: "/images/products/agir-hizmet-kova.jpg",
    hero: "/images/products/agir-hizmet-kova-hero.jpg",
    cardTitle: tr("Ağır Hizmet Kova", "Heavy-Duty Bucket", "جرافة خدمة شاقة"),
    title: tr("Ağır Hizmet Tipi Ekskavatör Kovası", "Heavy-Duty Excavator Bucket", "جرافة حفارة للخدمة الشاقة"),
    series: tr("AĞIR HİZMET SERİSİ", "HEAVY-DUTY SERIES", "سلسلة الخدمة الشاقة"),
    code: "MC-150-HD",
    bullets: bullets(
      ["Zorlu Şantiye & Kazı Şartları", "Güçlendirilmiş tırnak ve aşınma plakaları", "Ekstra hacimli, ağır dayanıklı yapı", "Zorlu kaya ve kazı işlemleri için ideal"],
      ["Tough site and excavation duty", "Reinforced teeth and wear plates", "Extra volume, heavy-duty body", "Ideal for rock and hard digging"],
      ["ظروف موقع وحفر قاسية", "أسنان وألواح تآكل معززة", "هيكل متين بسعة إضافية", "مثالية للصخور والحفر الصعب"],
    ),
    eyebrow: tr("ÜSTÜN MUKAVEMET & GÜÇLENDİRİLMİŞ TASARIM", "SUPERIOR STRENGTH & REINFORCED DESIGN", "متانة فائقة وتصميم معزز"),
    body: tr(
      "Zorlu hafriyat, madencilik ve taş ocağı şartlarında çalışmak üzere özel olarak tasarlanan Ağır Hizmet Tipi Kovalarımız, yüksek aşınma direncine sahip Hardox ve Weldox saclar kullanılarak üretilmiştir. Ekstra takviyeli yan bıçaklar ve tırnak yapısıyla en zorlu zeminlerde bile maksimum ömür ve yüksek koparma kuvveti sunar.",
      "Our heavy-duty buckets are built with Hardox and Weldox plate for excavation, mining and quarry work. Reinforced side cutters and teeth deliver long life and high breakout force even in the hardest ground.",
      "تُصنع جرافات الخدمة الشاقة من ألواح Hardox وWeldox لأعمال الحفر والتعدين والمقالع، وتوفر عمرًا طويلًا وقوة كسر عالية.",
    ),
    specs: [
      { label: tr("Hacim Kapasitesi", "Capacity", "السعة"), value: tr("0.8 m³ - 4.5 m³ (farklı tonajlara uygun)", "0.8 m³ - 4.5 m³ (matched to machine class)", "0.8 - 4.5 م³ حسب فئة الآلة") },
      { label: tr("Tırnak & Adaptör Sistemi", "Teeth & Adapters", "الأسنان والمهايئات"), value: tr("Yüksek aşınma dayanımlı, kolay değiştirilebilir", "Wear-resistant, quick to change", "مقاومة للتآكل وسهلة الاستبدال") },
      { label: tr("Malzeme Yapısı", "Material", "المادة"), value: tr("Ağır Hizmet Tipi Aşınma Plakaları (Hardox 450/500)", "Heavy-duty wear plate (Hardox 450/500)", "ألواح تآكل Hardox 450/500") },
      { label: tr("Takviye Grubu", "Reinforcement", "التعزيز"), value: tr("Ekstra alt ve yan aşınma şeritleri, burulma önleyici tasarım", "Extra bottom and side wear strips, anti-twist design", "شرائط تآكل سفلية وجانبية وتصميم مانع للالتواء") },
      { label: tr("Uyumlu Makineler", "Compatible Machines", "الآلات المتوافقة"), value: tr("12 - 70 Ton Arası Ekskavatörler", "Excavators from 12 to 70 tons", "حفارات من 12 إلى 70 طنًا") },
      { label: tr("Kaynak Kalitesi", "Weld Quality", "جودة اللحام"), value: tr("Nüfuziyeti yüksek, özel koruyucu gaz altı kaynakları", "High-penetration gas-shielded welds", "لحام عالي الاختراق تحت غاز واقٍ") },
    ],
    catalogLabel: "techCatalog",
  },
  {
    slug: "elek-kova",
    category: "is-makinesi-atasmanlari",
    group: "standart",
    image: "/images/products/elek-kova.jpg",
    cardTitle: tr("Elek Kova", "Screening Bucket", "جرافة غربلة"),
    title: tr("Elek Kova", "Screening Bucket", "جرافة غربلة"),
    bullets: bullets(
      ["Malzeme Sınıflandırma", "Hareketli eleme ve ayıklama tamburu", "Farklı elek boyutu seçenekleri", "Sahada hızlı toprak ve eleme imkânı"],
      ["Material classification", "Rotating screening drum", "Multiple mesh sizes", "Fast on-site soil screening"],
      ["تصنيف المواد", "أسطوانة غربلة دوارة", "مقاسات شبك متعددة", "غربلة سريعة للتربة في الموقع"],
    ),
  },
  {
    slug: "makas",
    category: "is-makinesi-atasmanlari",
    group: "standart",
    image: "/images/products/makas.jpg",
    cardTitle: tr("Makas (Yıkım & Kırım)", "Shear (Demolition)", "مقص الهدم"),
    title: tr("Makas (Yıkım & Kırım)", "Demolition Shear", "مقص الهدم والتكسير"),
    bullets: bullets(
      ["Beton & Hurda Kesme", "Yüksek basınçlı hidrolik çeneler", "Hurda demir, çelik ve beton kırma", "Endüstriyel yıkım ve söküm işleri"],
      ["Concrete and scrap cutting", "High-pressure hydraulic jaws", "Scrap steel and concrete processing", "Industrial demolition and dismantling"],
      ["قطع الخرسانة والخردة", "فكان هيدروليكيان عالي الضغط", "معالجة خردة الحديد والخرسانة", "أعمال الهدم والتفكيك"],
    ),
  },
  {
    slug: "loader-kovasi",
    category: "is-makinesi-atasmanlari",
    group: "standart",
    image: "/images/products/loader-kovasi.jpg",
    cardTitle: tr("Loader Kovası", "Loader Bucket", "جرافة اللودر"),
    title: tr("Loader Kovası", "Loader Bucket", "جرافة اللودر"),
    bullets: bullets(
      ["Yükleme & Malzeme Sevk", "Geniş hacimli malzeme taşıma ve yükleme", "Aşınmaya dayanıklı bıçak ve tırnaklar", "Maksimum doluluk oranı için optimize şasi"],
      ["Loading and material transfer", "High-volume handling", "Wear-resistant blade and teeth", "Shell optimized for fill factor"],
      ["تحميل ونقل المواد", "مناولة بحجم كبير", "شفرة وأسنان مقاومة للتآكل", "هيكل محسّن لنسبة الامتلاء"],
    ),
  },
  {
    slug: "grable",
    category: "is-makinesi-atasmanlari",
    group: "ozel",
    image: "/images/products/grable.jpg",
    cardTitle: tr("Grable (Kıskaç & Yakalayıcı)", "Grab (Grapple)", "كلاب الإمساك"),
    title: tr("Grable (Kıskaç & Yakalayıcı)", "Grapple Grab", "كلاب الإمساك"),
    bullets: bullets(
      ["Yıkım & Tomruk Taşıma", "Güçlü hidrolik kavrama ve 360° dönüş", "Hurda, tomruk ve yıkım atığı taşıma", "Güvenli ve yüksek torklu elleçleme"],
      ["Demolition and log handling", "Strong hydraulic grip and 360° rotation", "Scrap, timber and demolition waste", "Safe, high-torque handling"],
      ["نقل الهدم والأخشاب", "قبض هيدروليكي ودوران 360°", "خردة وأخشاب ونفايات هدم", "مناولة آمنة بعزم عالٍ"],
    ),
  },
  {
    slug: "izgara-elek-kova",
    category: "is-makinesi-atasmanlari",
    group: "ozel",
    image: "/images/products/izgara-elek-kova.jpg",
    cardTitle: tr("Izgara Elek Kova", "Skeleton Screening Bucket", "جرافة غربلة شبكية"),
    title: tr("Izgara Elek Kova", "Skeleton Screening Bucket", "جرافة غربلة شبكية"),
    bullets: bullets(
      ["Agrega & Kaya Eleme", "Izgaralı eleme ve kaba malzeme ayırma", "Ağır hizmet tipi çelik çubuklar", "Dolum öncesi taş ve toprak ayıklama"],
      ["Aggregate and rock screening", "Coarse separation on a skeleton grid", "Heavy-duty steel ribs", "Stone and soil sorting before loading"],
      ["غربلة الركام والصخور", "فصل المواد الخشنة", "أضلاع فولاذية للخدمة الشاقة", "فرز الحجر والتربة قبل التحميل"],
    ),
  },
  {
    slug: "quick-coupler",
    category: "is-makinesi-atasmanlari",
    group: "ozel",
    image: "/images/products/quick-coupler.jpg",
    cardTitle: tr("Quick (Hızlı Değiştirici)", "Quick Coupler", "قارنة سريعة"),
    title: tr("Quick (Hızlı Değiştirici)", "Hydraulic Quick Coupler", "قارنة هيدروليكية سريعة"),
    bullets: bullets(
      ["Hızlı Ataşman Değişimi", "Kabin içinden hidrolik kilitleme", "Emniyet kilitli, güvenli bağlantı", "Saniyeler içinde ataşman değişimi"],
      ["Fast attachment changes", "In-cab hydraulic locking", "Safety-locked connection", "Swap tools in seconds"],
      ["تبديل سريع للملحقات", "قفل هيدروليكي من الكابينة", "اتصال آمن بقفل أمان", "تبديل خلال ثوانٍ"],
    ),
  },
  {
    slug: "riper",
    category: "is-makinesi-atasmanlari",
    group: "ozel",
    image: "/images/products/riper.jpg",
    cardTitle: tr("Riper (Sökücü)", "Ripper", "الكسّارة السنّية"),
    title: tr("Riper (Sökücü)", "Excavator Ripper", "ريبر الحفارة"),
    bullets: bullets(
      ["Zorlu Zemin Sökme", "Sert ve donmuş zemin sökümü", "Değiştirilebilir aşınma ucu ve şank", "Kırıcı öncesi gevşetme ve kırma işleri"],
      ["Breaking hard ground", "Frozen and compact soil", "Replaceable wear tip and shank", "Loosening ahead of the breaker"],
      ["تفكيك الأرض القاسية", "تربة متجمدة ومتراصة", "رأس وساق قابلان للاستبدال", "تفكيك قبل استخدام المطرقة"],
    ),
  },
  {
    slug: "frigo-kasa",
    category: "arac-ustu-ekipmanlar",
    group: "ekipman",
    image: "/images/products/frigo-kasa.jpg",
    hero: "/images/products/frigo-kasa-hero.jpg",
    cardTitle: tr("Frigo Kasa", "Refrigerated Body", "صندوق مبرد"),
    title: tr("Frigo Kasa (Soğuk Zincir Taşıma Kasası)", "Refrigerated Body (Cold-Chain Cargo Box)", "صندوق مبرد لسلسلة التبريد"),
    series: tr("ARAÇ ÜSTÜ EKİPMAN", "TRUCK-MOUNTED EQUIPMENT", "معدات فوق المركبة"),
    code: "RED-FR-3500",
    bullets: bullets(
      ["Soğuk Zincir Taşımacılığı", "FRP panel ve yüksek yalıtım teknolojisi", "-20°C / +4°C arası iklimlendirme", "İlaç, gıda ve taze ürün lojistiğine uygun"],
      ["Cold-chain transport", "FRP panels and high insulation", "Temperature control from -20°C to +4°C", "Suited to pharma, food and fresh goods"],
      ["نقل سلسلة التبريد", "ألواح FRP وعزل عالٍ", "تحكم من -20° إلى +4°", "مناسب للدواء والغذاء والمنتجات الطازجة"],
    ),
    eyebrow: tr("MAKSİMUM ISI YALITIMI & GÜVENLİ SEVKİYAT", "MAXIMUM INSULATION & SAFE DELIVERY", "عزل حراري أقصى وشحن آمن"),
    body: tr(
      "Gıda, ilaç ve her türlü bozulabilir hassas yükün soğuk zincir bozulmadan güvenle taşınması için tasarlanan Frigo Kasalarımız, yüksek yoğunluklu poliüretan panellerle üstün bir yalıtım performansı sunar. Hafif ve dayanıklı yapısı, sızdırmazlık özellikleri ve her marka-model kamyona tam uyumluluğuyla lojistik süreçlerinizi optimize eder.",
      "Our refrigerated bodies keep food, pharmaceuticals and other perishable cargo inside an unbroken cold chain. High-density polyurethane panels, a light but strong shell and a sealed structure fit trucks and vans across brands.",
      "صُممت الصناديق المبردة لنقل الغذاء والدواء والحمولات الحساسة دون كسر سلسلة التبريد، بألواح بولي يوريثان عالية الكثافة وهيكل خفيف ومتين.",
    ),
    specs: [
      { label: tr("Panel Yapısı", "Panel", "الألواح"), value: tr("Yüksek Yoğunluklu Poliüretan (Sandviç Panel, 40-42 kg/m³)", "High-density polyurethane sandwich panel, 40-42 kg/m³", "ألواح سندويتش بولي يوريثان 40-42 كغ/م³") },
      { label: tr("Sıcaklık Aralığı", "Temperature", "درجة الحرارة"), value: tr("-20°C ile +4°C arası hassas iklimlendirme", "Precise control from -20°C to +4°C", "تحكم دقيق من -20° إلى +4°") },
      { label: tr("Kasa Kalınlığı", "Wall Thickness", "سماكة الصندوق"), value: tr("Taban, tavan ve yan duvarlar için 50-100 mm yalıtım", "50-100 mm insulation for floor, roof and walls", "عزل 50-100 مم للأرضية والسقف والجدران") },
      { label: tr("İç Kaplama", "Interior", "التكسية الداخلية"), value: tr("Hijyenik, gıda tüzüğüne uygun, kolay temizlenebilir CTP/FRP", "Hygienic, food-grade, easy-clean GRP/FRP", "CTP/FRP صحي مناسب للغذاء وسهل التنظيف") },
      { label: tr("Zemin Yapısı", "Floor", "الأرضية"), value: tr("Aşınmaya ve kaymaya karşı dirençli alüminyum veya jelkot", "Wear and slip resistant aluminum or gelcoat", "ألمنيوم أو جل كوت مقاوم للتآكل والانزلاق") },
      { label: tr("Sızdırmazlık", "Sealing", "الإحكام"), value: tr("Çok katmanlı, özel EPDM kapı fitil sistemleri", "Multi-layer EPDM door seals", "موانع تسرب EPDM متعددة الطبقات") },
      { label: tr("Aksesuar ve Donanım", "Equipment", "التجهيزات"), value: tr("İç aydınlatma, çift kanatlı arka kapılar, paslanmaz kilitler", "Interior lighting, double rear doors, stainless locks", "إضاءة داخلية وأبواب خلفية مزدوجة وأقفال ستانلس") },
      { label: tr("Uygun Tonajlar", "Vehicle Range", "فئات المركبات"), value: tr("3.5 Ton ile 26 Ton arası tüm kamyon ve kamyonetler", "Trucks and vans from 3.5 to 26 tons", "شاحنات وفانات من 3.5 إلى 26 طنًا") },
    ],
    catalogLabel: "techCatalog",
  },
  {
    slug: "vidanjor",
    category: "arac-ustu-ekipmanlar",
    group: "ekipman",
    image: "/images/products/vidanjor.jpg",
    cardTitle: tr("Vidanjör", "Vacuum Tanker", "صهريج الشفط"),
    title: tr("Vidanjör", "Vacuum Tanker", "صهريج الشفط"),
    bullets: bullets(
      ["Çevre ve Altyapı Çözümleri", "Yüksek emiş gücüne sahip vakum pompası", "Ağır hizmet tipi çelik veya paslanmaz tank", "Foseptik ve endüstriyel atık çekimi"],
      ["Environmental and utility solutions", "High-capacity vacuum pump", "Heavy-duty steel or stainless tank", "Septic and industrial waste collection"],
      ["حلول البيئة والبنية التحتية", "مضخة تفريغ عالية القدرة", "خزان فولاذي أو ستانلس", "سحب الصرف الصحي والنفايات الصناعية"],
    ),
  },
  {
    slug: "tanker",
    category: "arac-ustu-ekipmanlar",
    group: "ekipman",
    image: "/images/products/tanker.jpg",
    cardTitle: tr("Tanker", "Tanker", "صهريج"),
    title: tr("Tanker", "Liquid Tanker", "صهريج السوائل"),
    bullets: bullets(
      ["Sıvı Taşıma Sistemleri", "Su, yakıt ve kimyasal taşıma tankları", "Paslanmaz, karbon çelik veya alüminyum", "Yangınla mücadele ve sulama arazözü"],
      ["Liquid transport systems", "Water, fuel and chemical tanks", "Stainless, carbon steel or aluminum", "Firefighting and irrigation bowsers"],
      ["أنظمة نقل السوائل", "خزانات ماء ووقود وكيماويات", "ستانلس أو فولاذ كربوني أو ألمنيوم", "إطفاء وري"],
    ),
  },
  {
    slug: "silobas",
    category: "arac-ustu-ekipmanlar",
    group: "ekipman",
    image: "/images/products/silobas.jpg",
    cardTitle: tr("Silobas", "Bulk Silo Trailer", "صهريج المواد السائبة"),
    title: tr("Silobas", "Pneumatic Bulk Tanker", "صهريج هوائي للمواد السائبة"),
    bullets: bullets(
      ["Dökme Malzeme Taşıma", "Çimento, alçı, kireç gibi dökme yükler", "Kompresörlü pnömatik tahliye sistemi", "Hafif ve yüksek mukavemetli çelik gövde"],
      ["Bulk material transport", "Cement, gypsum, lime and powders", "Compressor-driven pneumatic discharge", "Light, high-strength steel shell"],
      ["نقل المواد السائبة", "أسمنت وجبس وجير", "تفريغ هوائي بضاغط", "هيكل فولاذي خفيف وعالي المتانة"],
    ),
  },
  {
    slug: "cop-kasasi",
    category: "arac-ustu-ekipmanlar",
    group: "ozel",
    image: "/images/products/cop-kasasi.jpg",
    cardTitle: tr("Çöp Kasası", "Refuse Body", "صندوق نفايات"),
    title: tr("Çöp Kasası", "Refuse Collection Body", "صندوق جمع النفايات"),
    bullets: bullets(
      ["Katı Atık Yönetimi", "Hidrolik sıkıştırma ve boşaltma sistemi", "Farklı çöp konteynerlerine uyumlu aparat", "Sızdırmaz gövde ve yüksek hacim"],
      ["Solid waste management", "Hydraulic compaction and ejection", "Gear for common container types", "Sealed, high-volume body"],
      ["إدارة النفايات الصلبة", "ضغط وتفريغ هيدروليكي", "تجهيزات للحاويات المختلفة", "هيكل محكم وعالي الحجم"],
    ),
  },
  {
    slug: "itfaiye",
    category: "arac-ustu-ekipmanlar",
    group: "ozel",
    image: "/images/products/itfaiye.jpg",
    cardTitle: tr("İtfaiye Aracı", "Fire Appliance", "مركبة إطفاء"),
    title: tr("İtfaiye Aracı", "Firefighting Vehicle", "مركبة إطفاء"),
    bullets: bullets(
      ["Acil Durum & Müdahale", "Yüksek basınçlı su ve köpük pompaları", "Kurtarma ekipmanı ve merdiven sistemleri", "Hızlı ve güvenli acil durum müdahalesi"],
      ["Emergency response", "High-pressure water and foam pumps", "Rescue tools and ladder systems", "Fast, safe incident response"],
      ["الاستجابة للطوارئ", "مضخات ماء ورغوة عالية الضغط", "معدات إنقاذ وسلالم", "تدخل سريع وآمن"],
    ),
  },
  {
    slug: "arac-ustu-vinc",
    category: "arac-ustu-ekipmanlar",
    group: "ekipman",
    image: "/images/products/arac-ustu-vinc.jpg",
    cardTitle: tr("Araç Üstü Vinç", "Truck-Mounted Crane", "رافعة فوق الشاحنة"),
    title: tr("Araç Üstü Vinç", "Truck-Mounted Crane", "رافعة فوق الشاحنة"),
    bullets: bullets(
      ["Katlanır bomlu (teleskopik/hidrolik) vinç", "Yüksek tonajlı kaldırma ve taşıma", "Destek ayakları ile maksimum denge"],
      ["Folding telescopic hydraulic crane", "High-capacity lifting", "Outriggers for maximum stability"],
      ["رافعة قابلة للطي تلسكوبية هيدروليكية", "رفع بحمولات عالية", "أرجل تثبيت لأقصى ثبات"],
    ),
  },
  {
    slug: "hooklift",
    category: "arac-ustu-ekipmanlar",
    group: "ekipman",
    image: "/images/products/hooklift.jpg",
    cardTitle: tr("Kancalı Yükleyici (Hooklift)", "Hooklift", "رافعة الخطاف"),
    title: tr("Kancalı Yükleyici (Hooklift)", "Hooklift System", "نظام رافعة الخطاف"),
    bullets: bullets(
      ["Yüksek kancalı konteyner yükleme", "Farklı kasa ve konteynerleri taşıma", "Hızlı, pratik ve tek operatörlü çalışma"],
      ["High-hook container loading", "Multiple body and container types", "Fast, one-operator changeover"],
      ["تحميل الحاويات بخطاف عالٍ", "هياكل وحاويات متعددة", "تبديل سريع بمشغّل واحد"],
    ),
  },
  {
    slug: "kurtarici",
    category: "arac-ustu-ekipmanlar",
    group: "ozel",
    image: "/images/products/kurtarici.jpg",
    cardTitle: tr("Kurtarıcı (Çekici)", "Recovery Truck", "شاحنة إنقاذ"),
    title: tr("Kurtarıcı (Çekici)", "Recovery / Tow Truck", "شاحنة سحب وإنقاذ"),
    bullets: bullets(
      ["Hidrolik kayar kasa ve güçlü halat tamburu", "Arızalı veya kazalı araç taşıma", "Güvenli sabitleme ve hızlı operasyon"],
      ["Hydraulic sliding bed and winch", "Transport of broken-down or damaged vehicles", "Secure tie-down and fast operation"],
      ["منصة منزلقة هيدروليكية وونش", "نقل المركبات العاطلة أو المتضررة", "تثبيت آمن وتشغيل سريع"],
    ),
  },
  {
    slug: "mobil-dis-klinigi",
    category: "mobil-cozumler",
    image: "/images/products/mobil-dis-klinigi.jpg",
    cardTitle: tr("Mobil Diş Kliniği", "Mobile Dental Clinic", "عيادة أسنان متنقلة"),
    title: tr("Mobil Diş Kliniği", "Mobile Dental Clinic", "عيادة أسنان متنقلة"),
    bullets: bullets(
      ["Tam donanımlı diş hekimi koltuğu ve sterilizasyon", "Kesintisiz su, hava ve elektrik altyapısı", "Gezici sağlık taramaları ve acil müdahale"],
      ["Fully equipped dental chair and sterilization", "Continuous water, air and power", "Outreach screening and emergency care"],
      ["كرسي أسنان وتعقيم متكامل", "ماء وهواء وكهرباء دون انقطاع", "مسوح ميدانية وتدخل طارئ"],
    ),
  },
  {
    slug: "mobil-mammografi",
    category: "mobil-cozumler",
    image: "/images/products/mobil-mammografi.jpg",
    cardTitle: tr("Mobil Mammografi & Sağlık Tarama", "Mobile Mammography & Screening", "تصوير الثدي والمسح الصحي المتنقل"),
    title: tr("Mobil Mammografi & Sağlık Tarama", "Mobile Mammography & Health Screening", "تصوير الثدي والمسح الصحي المتنقل"),
    bullets: bullets(
      ["X-Ray ve mamografi cihazları için yalıtımlı oda", "Özel hasta kabul ve muayene alanları", "Genişletilebilir gövde ve jeneratör desteği"],
      ["Shielded room for X-ray and mammography", "Dedicated reception and exam areas", "Expandable body and generator support"],
      ["غرفة معزولة للأشعة والماموغراف", "استقبال وفحص مخصصان", "هيكل قابل للتوسعة ودعم مولد"],
    ),
  },
  {
    slug: "mobil-kan-bagisi",
    category: "mobil-cozumler",
    image: "/images/products/mobil-kan-bagisi.jpg",
    hero: "/images/products/mobil-kan-bagisi-hero.jpg",
    cardTitle: tr("Mobil Kan Bağışı", "Mobile Blood Donation", "تبرع دم متنقل"),
    title: tr("Mobil Kan Bağışı ve Laboratuvar Aracı", "Mobile Blood Donation & Laboratory Vehicle", "مركبة تبرع الدم والمختبر المتنقلة"),
    series: tr("MOBİL SAĞLIK ÇÖZÜMLERİ", "MOBILE HEALTH SOLUTIONS", "حلول الصحة المتنقلة"),
    code: "RED-BD-500",
    bullets: bullets(
      ["4-6 kişilik kan alma sedyesi ve dinlenme alanı", "Güvenli kan saklama ve soğutma dolapları", "Konforlu iklimlendirme ve bekleme salonu"],
      ["4-6 donor couches and a rest area", "Secure blood storage and cooling", "Comfort climate and waiting lounge"],
      ["4-6 أسرّة تبرع ومنطقة راحة", "حفظ وتبريد آمن للدم", "تكييف مريح وصالة انتظار"],
    ),
    eyebrow: tr("MOBİL SAĞLIK VE DONÖR HİZMETLERİ", "MOBILE HEALTH AND DONOR SERVICES", "الصحة المتنقلة وخدمات المتبرعين"),
    body: tr(
      "Gezici sağlık hizmetleri, afet durumları ve yaygın kan bağışı kampanyaları için özel olarak tasarlanan Mobil Kan Bağışı ve Laboratuvar Aracımız, donörlerin en yüksek konforda ve en hijyenik şartlarda kan verebilmesi için optimize edilmiştir. Bağımsız jeneratör, gelişmiş iklimlendirme ve son teknoloji laboratuvar altyapısıyla her türlü saha koşulunda kesintisiz hizmet sunar.",
      "Built for outreach care, disasters and large donation drives, the vehicle lets donors give blood in comfort and hygienic conditions. An independent generator, advanced climate control and a modern laboratory keep the service running in the field.",
      "صُممت المركبة للحملات الصحية وحالات الكوارث وتبرع الدم، مع مولد مستقل وتكييف متقدم ومختبر حديث للعمل في الميدان دون انقطاع.",
    ),
    specs: [
      { label: tr("Donör Ünitesi", "Donor Unit", "وحدة المتبرعين"), value: tr("4-6 Kişilik Kan Alma Ünitesi (özel konforlu, hareketli sedyeler)", "4-6 person donation unit with adjustable couches", "وحدة تبرع لـ 4-6 أشخاص بأسرّة قابلة للضبط") },
      { label: tr("Laboratuvar Altyapısı", "Laboratory", "المختبر"), value: tr("Tam donanımlı laboratuvar, santrifüj ve test alanları", "Full laboratory with centrifuge and test areas", "مختبر متكامل مع طرد مركزي ومناطق اختبار") },
      { label: tr("Kan Saklama", "Blood Storage", "حفظ الدم"), value: tr("Güvenli, kesintisiz enerjili kan saklama dolapları (+4°C / -20°C)", "Secure cabinets at +4°C / -20°C with backup power", "خزائن آمنة +4° / -20° مع طاقة احتياطية") },
      { label: tr("Güç ve Enerji", "Power", "الطاقة"), value: tr("Yedekli jeneratör, UPS ve harici şebeke bağlantısı", "Redundant generator, UPS and shore power", "مولد احتياطي وUPS وربط بالشبكة") },
      { label: tr("İklimlendirme", "Climate", "التكييف"), value: tr("Antibakteriyel HEPA filtreli, bağımsız klima ve ısıtma", "Antibacterial HEPA filtration, independent HVAC", "تنقية HEPA مضادة للبكتيريا وتكييف مستقل") },
      { label: tr("Su ve Atık", "Water & Waste", "الماء والنفايات"), value: tr("Geniş hacimli temiz ve atık su tankları, hijyenik lavabolar", "Large fresh and waste tanks, hygienic sinks", "خزانات ماء نظيف وصرف ومغاسل صحية") },
      { label: tr("Aksesuar ve Donanım", "Equipment", "التجهيزات"), value: tr("Donör bekleme alanı, engelli biniş asansörü, özel aydınlatmalar", "Donor lounge, accessible lift, dedicated lighting", "صالة انتظار ورافعة لذوي الإعاقة وإضاءة خاصة") },
      { label: tr("Sertifikasyon", "Certification", "الاعتماد"), value: tr("Sağlık Bakanlığı yönetmeliklerine ve mobil tıbbi standartlara tam uyum", "Aligned with ministry of health and mobile medical standards", "مطابق لأنظمة وزارة الصحة والمعايير الطبية المتنقلة") },
    ],
    catalogLabel: "techCatalog",
  },
  {
    slug: "mobil-klinik",
    category: "mobil-cozumler",
    image: "/images/products/mobil-klinik.jpg",
    cardTitle: tr("Mobil Klinik & Sağlık Tarama", "Mobile Clinic & Screening", "عيادة ومسح صحي متنقل"),
    title: tr("Mobil Klinik & Sağlık Tarama", "Mobile Clinic & Health Screening", "عيادة ومسح صحي متنقل"),
    bullets: bullets(
      ["Çok amaçlı doktor muayene ve müdahale odası", "Engelli biniş asansörü ve özel giriş kapıları", "Temiz ve atık su tankları, kesintisiz enerji"],
      ["Multi-purpose exam and treatment room", "Accessible lift and dedicated doors", "Fresh and waste water tanks, continuous power"],
      ["غرفة فحص وتدخل متعددة الأغراض", "رافعة وأبواب لذوي الإعاقة", "خزانات ماء وطاقة دون انقطاع"],
    ),
  },
  {
    slug: "mobil-mutfak",
    category: "mobil-cozumler",
    image: "/images/products/mobil-mutfak.jpg",
    cardTitle: tr("Mobil Mutfak & İkram", "Mobile Kitchen & Catering", "مطبخ وتموين متنقل"),
    title: tr("Mobil Mutfak & İkram", "Mobile Kitchen & Catering", "مطبخ وتموين متنقل"),
    bullets: bullets(
      ["Endüstriyel pişirme ve saklama ekipmanları", "Yüksek kapasiteli su tankları ve jeneratörler", "Afet ve toplu organizasyonlar için hızlı hizmet"],
      ["Industrial cooking and storage equipment", "High-capacity water tanks and generators", "Rapid service for disasters and mass events"],
      ["معدات طهي وتخزين صناعية", "خزانات ماء ومولدات عالية السعة", "خدمة سريعة للكوارث والفعاليات"],
    ),
  },
  {
    slug: "mobil-afet",
    category: "mobil-cozumler",
    image: "/images/products/mobil-afet.jpg",
    cardTitle: tr("Mobil Afet & Koordinasyon", "Mobile Disaster Coordination", "تنسيق الكوارث المتنقل"),
    title: tr("Mobil Afet & Koordinasyon", "Mobile Disaster & Coordination Unit", "وحدة تنسيق الكوارث المتنقلة"),
    bullets: bullets(
      ["Uydu haberleşme, telsiz ve veri merkezleri", "Kriz yönetim odası ve çoklu ekran sistemleri", "Zorlu saha şartları için bağımsız enerji kaynağı"],
      ["Satellite, radio and data communications", "Crisis room and multi-screen systems", "Independent power for harsh field conditions"],
      ["اتصالات فضائية ولاسلكية وبيانات", "غرفة أزمة وشاشات متعددة", "طاقة مستقلة لظروف الميدان القاسية"],
    ),
  },
];

function fill(product: Product): Product {
  if (product.body && product.specs) return product;
  const eyebrow =
    product.eyebrow ??
    tr("TEKNİK ÖZELLİKLER", "TECHNICAL OUTLINE", "المواصفات الفنية");
  const body =
    product.body ??
    tr(
      `${product.cardTitle.tr} çözümümüz, saha koşullarına göre projelendirilir ve anahtar teslim devredilir.`,
      `Our ${product.cardTitle.en.toLowerCase()} solution is engineered for site conditions and delivered turnkey.`,
      `يُهندس حل ${product.cardTitle.ar} وفق ظروف الموقع ويُسلَّم جاهزًا للتشغيل.`,
    );
  const specs =
    product.specs ??
    product.bullets.tr.map((_, i) => ({
      label: tr(product.bullets.tr[i], product.bullets.en[i], product.bullets.ar[i]),
      value: tr("Standart kapsam", "Included in scope", "ضمن النطاق القياسي"),
    }));
  return { ...product, eyebrow, body, specs };
}

export const catalog: Product[] = products.map(fill);

export function getProduct(slug: string) {
  return catalog.find((item) => item.slug === slug);
}

export function productsByCategory(slug: string) {
  return catalog.filter((item) => item.category === slug);
}

export const categories: Category[] = [
  {
    slug: "kirma-eleme-yikama",
    href: "/faaliyet-alanlari/kirma-eleme-yikama",
    image: "/images/hero/slide-kirma.jpg",
    cardImage: "/images/cards/kirma.jpg",
    hero: "/images/hero/kirma.jpg",
    eyebrow: tr("Yedek Parça ve Mobil Çözümler", "Spare Parts and Mobile Solutions", "قطع الغيار والحلول المتنقلة"),
    title: tr("Kırma, Eleme ve Yıkama Sistemleri", "Crushing, Screening and Washing Systems", "أنظمة الكسر والغربلة والغسل"),
    cardTitle: tr("Mobil Kırma & Eleme Sistemleri", "Mobile Crushing & Screening", "أنظمة الكسر والغربلة المتنقلة"),
    cardText: tr(
      "Agrega ve madencilik için yüksek verimli çözümler.",
      "High-output solutions for aggregate and mining.",
      "حلول عالية الإنتاج للركام والتعدين.",
    ),
    lead: tr(
      "Çeneli, darbeli, tersiyer, çekiçli ve dik milli kırıcı parçaları; elek teli, bant ve helezon yedekleriyle aynı servis ağında durur. Mobil kırma ve yıkama makineleri için teklif Ankara ekibinden alınır.",
      "Jaw, impact, tertiary, hammer and vertical-shaft crusher parts sit with screen media, belt and screw spares in one service network. Quotes for mobile crushing and washing machines come from the Ankara team.",
      "تقف قطع الكسارات الفكية والصدمة والثالثية والمطرقة والعمود القائم مع أسلاك الغربال والسيور والحلزون في شبكة خدمة واحدة. تُطلب عروض آلات الكسر والغسل المتنقلة من فريق أنقرة.",
    ),
    columns: 3,
    badge: tr("Hızlı Yedek Parça Tedariği & Servis Desteği", "Fast spare-parts supply & service support", "توريد سريع لقطع الغيار ودعم الخدمة"),
    tabs: [
      {
        id: "makine",
        label: tr("MOBİL KIRMA, ELEME & YIKAMA MAKİNELERİ", "MOBILE CRUSHING, SCREENING & WASHING", "آلات الكسر والغربلة والغسل المتنقلة"),
        href: "/iletisim",
      },
      {
        id: "yedek",
        label: tr("YEDEK PARÇA ÇÖZÜMLERİ", "SPARE PARTS SOLUTIONS", "حلول قطع الغيار"),
        href: "/faaliyet-alanlari/kirma-eleme-yikama",
      },
    ],
    productSlugs: [
      "bant-konveyor-parcalari",
      "dmk-parcalari",
      "titresimli-elek-parcalari",
      "tersiyer-kirici-parcalari",
      "ceneli-kirici-parcalari",
      "dik-milli-parcalari",
      "sekonder-darbeli-parcalari",
      "cekicli-kirici-parcalari",
      "helezon-yikayici-parcalari",
    ],
    parkedSlugs: ["mobil-kirma-eleme", "mobil-eleme-yikama", "mobil-kirma-yuksek", "konveyor-bunker"],
  },
  {
    slug: "is-makinesi-atasmanlari",
    href: "/faaliyet-alanlari/is-makinesi-atasmanlari",
    image: "/images/hero/slide-atasman.jpg",
    cardImage: "/images/cards/atasman.jpg",
    hero: "/images/hero/atasman.jpg",
    eyebrow: tr("Ağır Hizmet ve Demolisyon Çözümleri", "Heavy-Duty and Demolition Solutions", "حلول الخدمة الشاقة والهدم"),
    title: tr("İş Makinesi Ataşmanları", "Machine Attachments", "ملحقات الآليات"),
    cardTitle: tr("İş Makinesi Ataşmanları", "Machine Attachments", "ملحقات الآليات"),
    cardText: tr(
      "Performans artıran dayanıklı ataşmanlar.",
      "Durable attachments that raise output.",
      "ملحقات متينة ترفع الأداء.",
    ),
    lead: tr(
      "Ağır hizmet kovası, elek kova, ızgaralı elek kova, loader kovası, grapple, makas, quick coupler ve riper 12-70 ton sınıfı iş makineleri için aynı ailede üretilir.",
      "Heavy-duty, screening, skeleton and loader buckets, grapples, shears, quick couplers and rippers are built in one family for the 12-70 ton class.",
      "تُنتج الجرافات الثقيلة وغرابيل الجرافة والجرافات الهيكلية وجرافات اللودر والكلابات والمقصات والقارنات السريعة والريبر في عائلة واحدة لفئة 12-70 طنًا.",
    ),
    columns: 4,
    badge: tr("Ağır Hizmet Tipi Sertifikalı Üretim", "Certified Heavy-Duty Manufacturing", "تصنيع معتمد للخدمة الشاقة"),
    tabs: [
      { id: "standart", label: tr("İŞ MAKİNESİ ATAŞMANLARI", "MACHINE ATTACHMENTS", "ملحقات الآليات") },
      { id: "ozel", label: tr("ÖZEL ÜRETİM ÇÖZÜMLERİ", "CUSTOM-BUILT SOLUTIONS", "حلول التصنيع الخاص") },
    ],
    productSlugs: ["agir-hizmet-kova", "elek-kova", "grable", "izgara-elek-kova", "makas", "loader-kovasi", "quick-coupler", "riper"],
  },
  {
    slug: "arac-ustu-ekipmanlar",
    href: "/faaliyet-alanlari/arac-ustu-ekipmanlar",
    image: "/images/hero/slide-arac.jpg",
    cardImage: "/images/cards/arac.jpg",
    hero: "/images/hero/arac.jpg",
    eyebrow: tr(
      "Belediye, Lojistik ve Hizmet Sektörü Çözümleri",
      "Municipal, Logistics and Service Solutions",
      "حلول البلديات واللوجستيات والخدمات",
    ),
    title: tr("Araç Üstü Ekipmanlar", "Truck-Mounted Equipment", "معدات فوق المركبات"),
    cardTitle: tr("Araç Üstü Ekipmanlar", "Truck-Mounted Equipment", "معدات فوق المركبات"),
    cardText: tr(
      "Belediye ve lojistik için özel araç çözümleri.",
      "Special vehicle solutions for municipalities and logistics.",
      "حلول مركبات للبلديات واللوجستيات.",
    ),
    lead: tr(
      "Frigo kasa, vidanjör, tanker, silobas, çöp kasası, itfaiye, araç üstü vinç, hooklift ve kurtarıcı ekipmanları filo tonajına göre projelendirilir. Frigo kasa -20°C ile +4°C arasında çalışır.",
      "Refrigerated bodies, vacuum tankers, tankers, silo trailers, refuse bodies, fire trucks, cranes, hooklifts and recovery equipment are specified to fleet tonnage. Refrigerated bodies run from -20°C to +4°C.",
      "تُصمَّم الصناديق المبردة وشفطات الصرف والصهاريج والصوامع وصناديق النفايات والإطفاء والرافعات والهوك ليفت ومعدات الإنقاذ وفق حمولة الأسطول. تعمل الصناديق المبردة بين -20° و+4°.",
    ),
    columns: 3,
    badge: tr("TS EN ISO Standartlarında Onaylı Üretim", "Production approved to TS EN ISO standards", "إنتاج معتمد وفق معايير TS EN ISO"),
    tabs: [
      { id: "ekipman", label: tr("ARAÇ ÜSTÜ EKİPMANLAR", "TRUCK-MOUNTED EQUIPMENT", "معدات فوق المركبات") },
      { id: "ozel", label: tr("ÖZEL HİZMET ARAÇLARI", "SPECIAL SERVICE VEHICLES", "مركبات الخدمة الخاصة") },
    ],
    productSlugs: ["frigo-kasa", "vidanjor", "tanker", "silobas", "cop-kasasi", "itfaiye", "arac-ustu-vinc", "hooklift", "kurtarici"],
  },
  {
    slug: "mobil-cozumler",
    href: "/faaliyet-alanlari/mobil-cozumler",
    image: "/images/hero/slide-mobil.jpg",
    cardImage: "/images/cards/mobil.jpg",
    hero: "/images/hero/mobil.jpg",
    title: tr("Mobil Çözümler & Özel Amaçlı Treylerler", "Mobile Solutions & Special-Purpose Trailers", "حلول متنقلة ومقطورات خاصة"),
    cardTitle: tr("Mobil Çözümler", "Mobile Solutions", "حلول متنقلة"),
    cardText: tr(
      "Mobil sağlık, diş kliniği ve özel amaçlı dorse çözümleri.",
      "Mobile health, dental and special-purpose trailer solutions.",
      "حلول الصحة المتنقلة وعيادات الأسنان والمقطورات الخاصة.",
    ),
    lead: tr(
      "Diş kliniği, mamografi, kan bağışı, klinik, mutfak ve afet-koordinasyon üniteleri saha hizmeti için hazırlanır. Kan bağışı aracı dört ila altı donör, laboratuvar ve yedekli enerjiyle teslim edilir.",
      "Dental, mammography, blood donation, clinic, kitchen and disaster-coordination units are prepared for field service. The blood donation vehicle is delivered with four to six donor stations, a laboratory and redundant power.",
      "تُجهَّز وحدات الأسنان والماموغرافيا وتبرع الدم والعيادة والمطبخ وتنسيق الكوارث للخدمة الميدانية. تُسلَّم مركبة التبرع بأربع إلى ست محطات متبرعين ومختبر وطاقة احتياطية.",
    ),
    subtitle: tr(
      "Hızlı, Esnek ve Güvenli Mobil Yaşam ve Hizmet Çözümleri",
      "Fast, flexible and safe mobile living and service solutions",
      "حلول معيشة وخدمة متنقلة سريعة ومرنة وآمنة",
    ),
    columns: 3,
    badge: tr("TS EN ISO Standartlarında Özel Mühendislik", "Custom engineering to TS EN ISO standards", "هندسة خاصة وفق معايير TS EN ISO"),
    tabs: [],
    productSlugs: ["mobil-dis-klinigi", "mobil-mammografi", "mobil-kan-bagisi", "mobil-klinik", "mobil-mutfak", "mobil-afet"],
  },
];

export const spareCategory: Category = {
  slug: "yedek-parca",
  href: "/faaliyet-alanlari/kirma-eleme-yikama/yedek-parca",
  image: "/images/hero/yedek.jpg",
  cardImage: "/images/products/ceneli-kirici-parcalari.jpg",
  hero: "/images/hero/yedek.jpg",
  eyebrow: tr("Kırma, Eleme ve Yıkama Sistemleri", "Crushing, Screening and Washing Systems", "أنظمة الكسر والغربلة والغسل"),
  title: tr("Yedek Parça Çözümleri", "Spare Parts Solutions", "حلول قطع الغيار"),
  cardTitle: tr("Yedek Parça Çözümleri", "Spare Parts", "قطع الغيار"),
  cardText: tr("Kırıcı, elek ve yıkama hatları için OEM uyumlu parçalar.", "OEM-compatible parts for crushing, screening and washing lines.", "قطع متوافقة مع OEM لخطوط الكسر والغربلة والغسل."),
  columns: 3,
  badge: tr("Hızlı Yedek Parça Tedariği & Servis Desteği", "Fast spare-parts supply & service support", "توريد سريع لقطع الغيار ودعم الخدمة"),
  tabs: [
    {
      id: "makine",
      label: tr("MOBİL KIRMA, ELEME & YIKAMA MAKİNELERİ", "MOBILE CRUSHING, SCREENING & WASHING", "آلات الكسر والغربلة والغسل المتنقلة"),
        href: "/iletisim",
      },
      {
        id: "yedek",
        label: tr("YEDEK PARÇA ÇÖZÜMLERİ", "SPARE PARTS SOLUTIONS", "حلول قطع الغيار"),
        href: "/faaliyet-alanlari/kirma-eleme-yikama/yedek-parca",
      },
  ],
  productSlugs: [
    "bant-konveyor-parcalari",
    "dmk-parcalari",
    "titresimli-elek-parcalari",
    "tersiyer-kirici-parcalari",
    "ceneli-kirici-parcalari",
    "dik-milli-parcalari",
    "sekonder-darbeli-parcalari",
    "cekicli-kirici-parcalari",
    "helezon-yikayici-parcalari",
  ],
};

export function getCategory(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export const areaExtras: { href: string; title: L<string> }[] = [
  { href: "/iletisim", title: tr("Fason İmalat", "Contract Manufacturing", "التصنيع للغير") },
];

export const slides = [
  categories[1],
  categories[2],
  categories[3],
  categories[0],
];

export const news = [
  {
    slug: "mc-120-tanitimi",
    date: "12 Mart 2026",
    image: "/images/products/mobil-kirma-eleme-hero.jpg",
    title: tr(
      "MC-120 mobil kırıcı serisi sahaya indi",
      "The MC-120 mobile crusher series reaches the field",
      "سلسلة الكسارة المتنقلة MC-120 تصل إلى الميدان",
    ),
    excerpt: tr(
      "Paletli kombine kırma-eleme hattımız, 150-250 ton/saat kapasiteyle agrega ve geri dönüşüm sahalarında devreye alındı.",
      "Our tracked combined crushing and screening line is now in service at 150-250 tph on aggregate and recycling sites.",
      "دخل خط الكسر والغربلة المجنزر الخدمة بسعة 150-250 طنًا في الساعة.",
    ),
    body: tr(
      "REDASY mühendislik ekibi, MC-120’yi ocak içi kurulum süresini kısaltacak şekilde tek şasi üzerinde tasarladı. Kablosuz kumanda, toz indirgeme ve 42 tonluk paletli yürüyüş sistemi, makinenin şantiyeler arasında hızla yer değiştirmesini sağlıyor. İlk teslimatlar Ankara’daki fabrika kabul testlerinin ardından yurt içi ve ihracat müşterilerine yapıldı.",
      "The REDASY engineering team designed the MC-120 on a single chassis to shorten in-pit setup. Wireless control, dust suppression and a 42-ton tracked undercarriage let the machine move quickly between sites. First deliveries followed factory acceptance tests in Ankara.",
      "صمّم فريق REDASY الماكينة MC-120 على هيكل واحد لتقصير التركيب داخل المقلع. يتيح التحكم اللاسلكي وتقليل الغبار والمجنزر نقلها بسرعة بين المواقع. تمت أولى التسليمات بعد اختبارات القبول في مصنع أنقرة.",
    ),
  },
  {
    slug: "ihracat-agi",
    date: "2 Şubat 2026",
    image: "/images/hero/atasman.jpg",
    title: tr(
      "İhracat ağı 25 ülkeye ulaştı",
      "The export network now reaches 25 countries",
      "شبكة التصدير تصل إلى 25 دولة",
    ),
    excerpt: tr(
      "Ataşman, araç üstü ekipman ve mobil sağlık üniteleri Ankara’daki merkezden dört kıtaya sevk ediliyor.",
      "Attachments, truck bodies and mobile health units now ship from Ankara to four continents.",
      "تُشحن الملحقات وهياكل الشاحنات ووحدات الصحة المتنقلة من أنقرة إلى أربع قارات.",
    ),
    body: tr(
      "Merkez ve fabrika operasyonu Ankara’da toplanan REDASY, yedek parça lojistiğini de aynı kampüsten yönetiyor. İhracat kalemlerinin başında ağır hizmet kovaları, frigo kasalar ve mobil klinik treylerleri geliyor. Her sevkiyat, ürün ailesine uygun TS EN ISO kontrol planıyla belgeleniyor.",
      "With headquarters and manufacturing in Ankara, REDASY also runs spare-parts logistics from the same campus. Heavy-duty buckets, refrigerated bodies and mobile clinic trailers lead exports. Every shipment is documented against the TS EN ISO plan for its product family.",
      "تدير REDASY التصنيع ولوجستيات قطع الغيار من أنقرة. تتصدر الجرافات والصناديق المبردة وعيادات المقطورات قائمة التصدير، ويُوثَّق كل شحن وفق خطة TS EN ISO الخاصة بعائلته.",
    ),
  },
  {
    slug: "mobil-kan-bagisi-teslimati",
    date: "18 Ocak 2026",
    image: "/images/products/mobil-kan-bagisi-hero.jpg",
    title: tr(
      "Mobil kan bağışı aracı teslim edildi",
      "Mobile blood donation vehicle delivered",
      "تسليم مركبة تبرع الدم المتنقلة",
    ),
    excerpt: tr(
      "RED-BD-500, dört ila altı donörlük ünite, laboratuvar ve yedekli enerji altyapısıyla hizmete hazır.",
      "RED-BD-500 is ready for service with a four-to-six donor unit, laboratory and redundant power.",
      "RED-BD-500 جاهزة للخدمة بوحدة متبرعين ومختبر وطاقة احتياطية.",
    ),
    body: tr(
      "Araç; HEPA filtreli iklimlendirme, +4°C / -20°C kan saklama dolapları ve engelli biniş asansörü ile saha kampanyalarına uygun hale getirildi. Kabul, kullanıcı kurumun sağlık ekibiyle birlikte Ankara’da tamamlandı.",
      "The vehicle was prepared for field campaigns with HEPA climate control, +4°C / -20°C blood storage and an accessible boarding lift. Acceptance was completed in Ankara together with the operator’s medical team.",
      "جُهزت المركبة بحملات ميدانية بتكييف HEPA وحفظ دم عند +4° و-20° ورافعة صعود. اكتمل القبول في أنقرة مع الفريق الطبي للجهة المشغّلة.",
    ),
  },
];

export const approach = [
  {
    title: tr("Tasarım", "Design", "التصميم"),
    text: tr(
      "Dört ürün ailesi yerli mühendislik ve Ar-Ge ile aynı ekipte kurgulanır.",
      "All four product families are laid out by one in-house engineering and R&D team.",
      "تُخطط عائلات المنتجات الأربع ضمن فريق هندسة وبحث وتطوير واحد.",
    ),
  },
  {
    title: tr("İmalat", "Manufacturing", "التصنيع"),
    text: tr(
      "Kırma parçaları, ataşmanlar, araç üstü ekipman ve mobil üniteler Ankara’daki fabrikada üretilir.",
      "Crusher parts, attachments, truck bodies and mobile units are built at the Ankara plant.",
      "تُصنع قطع الكسر والملحقات وهياكل المركبات والوحدات المتنقلة في مصنع أنقرة.",
    ),
  },
  {
    title: tr("Kabul", "Acceptance", "القبول"),
    text: tr(
      "Fabrika kabulü aynı kampüste yapılır. Her aile kendi TS EN ISO kontrol planıyla belgelenir.",
      "Factory acceptance stays on the same campus. Each family is documented to its TS EN ISO plan.",
      "يُجرى قبول المصنع في الحرم نفسه، وتُوثَّق كل عائلة وفق خطة TS EN ISO الخاصة بها.",
    ),
  },
  {
    title: tr("Saha ve servis", "Site and service", "الموقع والخدمة"),
    text: tr(
      "Anahtar teslim devreye alma, yedek parça ve kurulum desteği sevkiyattan sonra da sürer.",
      "Turnkey commissioning, spare parts and installation support continue after shipment.",
      "يستمر التشغيل الجاهز وقطع الغيار ودعم التركيب بعد الشحن.",
    ),
  },
];

export const projects = [
  {
    slug: "ocak-kirma-hatti",
    image: "/images/hero/kirma.jpg",
    href: "/faaliyet-alanlari/kirma-eleme-yikama",
    sector: tr("Kırma ve eleme", "Crushing and screening", "الكسر والغربلة"),
    title: tr("Ocak İçi Mobil Kırma Hattı", "In-pit mobile crushing line", "خط كسر متنقل داخل المقلع"),
    text: tr(
      "Hat, paletli MC-120 kombine kırıcıyı eleme, yıkama ve taşımayla aynı akışta toplar. Kapasite 150-250 ton/saat, yürüyüş sistemi 42 tonluk ağır hizmet palettir. Besleme 800 mm’ye kadar çıkar; kontrol kablosuz kumanda ve PLC ile yapılır.",
      "The line joins the tracked MC-120 combined crusher with screening, washing and handling. Output is 150-250 tph on a 42-ton heavy-duty undercarriage. Feed reaches 800 mm, with wireless remote and PLC control.",
      "يجمع الخط الكسارة المدمجة المجنزرة MC-120 مع الغربلة والغسل والنقل. السعة 150-250 طنًا في الساعة على مجنزر خدمة شاقة بوزن 42 طنًا. تصل التغذية إلى 800 مم، والتحكم لاسلكي مع PLC.",
    ),
    points: bullets(
      ["Çeneli ve darbeli kombine kırıcı, MC-120", "Eleme, yıkama ve susuzlandırma", "Konveyör, bunker ve yedek parça desteği"],
      ["Combined jaw and impact crusher, MC-120", "Screening, washing and dewatering", "Conveyors, hoppers and spare-parts support"],
      ["كسارة فكية وصدمة مدمجة، MC-120", "غربلة وغسل ونزح مياه", "سيور ومخابئ ودعم قطع الغيار"],
    ),
  },
  {
    slug: "hafriyat-filosu",
    image: "/images/hero/atasman.jpg",
    href: "/faaliyet-alanlari/is-makinesi-atasmanlari",
    sector: tr("İş makinesi ataşmanları", "Machine attachments", "ملحقات الآليات"),
    title: tr("Hafriyat Filosu Ataşmanları", "Earthmoving fleet attachments", "ملحقات أسطول الحفر"),
    text: tr(
      "Set, 12-70 ton sınıfındaki makineler için kova, elek kova, grapple, makas, riper ve quick coupler’ı birlikte tanımlar. Özel ölçü talepleri aynı ataşman ailesinin içinde karşılanır.",
      "The set specifies buckets, screening buckets, grapples, shears, rippers and quick couplers together for the 12-70 ton class. Custom sizes stay inside the same attachment family.",
      "تحدد المجموعة الجرافات وغرابيل الجرافة والكلابات والمقصات والريبر والقارنات السريعة معًا لفئة 12-70 طنًا. تبقى المقاسات الخاصة داخل عائلة الملحقات نفسها.",
    ),
    points: bullets(
      ["Ağır hizmet, elek ve loader kovaları", "Grapple, makas ve riper", "Quick coupler ile hızlı değişim"],
      ["Heavy-duty, screening and loader buckets", "Grapples, shears and rippers", "Fast changeover with a quick coupler"],
      ["جرافات ثقيلة وغربلة ولودر", "كلابات ومقصات وريبر", "تبديل سريع بقارنة"],
    ),
  },
  {
    slug: "soguk-zincir",
    image: "/images/products/frigo-kasa-hero.jpg",
    href: "/faaliyet-alanlari/arac-ustu-ekipmanlar",
    sector: tr("Araç üstü ekipman", "Truck-mounted equipment", "معدات المركبات"),
    title: tr("Soğuk Zincir Filosu", "Cold-chain fleet", "أسطول سلسلة التبريد"),
    text: tr(
      "Frigo kasa, ilaç ve gıda için -20°C ile +4°C arasında iklimlendirilir. Gövde 40-42 kg/m³ poliüretan sandviç paneldir; duvar yalıtımı 50-100 mm’dir. Uygun araç aralığı 3,5 tondan 26 tona kadardır.",
      "The refrigerated body holds -20°C to +4°C for pharmaceuticals and food. The shell is a 40-42 kg/m³ polyurethane sandwich panel with 50-100 mm of insulation, for vehicles from 3.5 to 26 tons.",
      "يحافظ الصندوق المبرد على -20° إلى +4° للدواء والغذاء. الهيكل ألواح بولي يوريثان 40-42 كغ/م³ بعزل 50-100 مم، للمركبات من 3.5 إلى 26 طنًا.",
    ),
    points: bullets(
      ["-20°C / +4°C hassas iklimlendirme", "Gıda tüzüğüne uygun FRP iç kaplama", "3,5-26 ton kamyon ve kamyonet"],
      ["Precise control from -20°C to +4°C", "Food-grade FRP interior", "Trucks and vans from 3.5 to 26 tons"],
      ["تحكم دقيق من -20° إلى +4°", "تكسية FRP مناسبة للغذاء", "شاحنات وفانات من 3.5 إلى 26 طنًا"],
    ),
  },
  {
    slug: "mobil-saglik",
    image: "/images/products/mobil-kan-bagisi-hero.jpg",
    href: "/faaliyet-alanlari/mobil-cozumler",
    sector: tr("Mobil çözümler", "Mobile solutions", "حلول متنقلة"),
    title: tr("Mobil Sağlık Kampüsü", "Mobile health campus", "حرم الصحة المتنقلة"),
    text: tr(
      "Kampüs; kan bağışı, diş kliniği ve tarama treylerlerini aynı saha düzeninde yan yana koyar. RED-BD-500 dört ila altı donör, laboratuvar, HEPA iklimlendirme ve +4°C / -20°C saklama ile teslim edilir.",
      "The campus places blood donation, dental and screening trailers side by side for one field layout. RED-BD-500 is delivered with four to six donor stations, a laboratory, HEPA climate control and +4°C / -20°C storage.",
      "يضع الحرم مقطورات التبرع والأسنان والمسح جنبًا إلى جنب في ترتيب ميداني واحد. تُسلَّم RED-BD-500 بأربع إلى ست محطات ومختبر وتكييف HEPA وحفظ عند +4° و-20°.",
    ),
    points: bullets(
      ["Kan bağışı, diş ve tarama treylerleri", "Dört ila altı donörlük ünite ve laboratuvar", "HEPA iklimlendirme ve yedekli enerji"],
      ["Blood, dental and screening trailers", "Four to six donor stations and a laboratory", "HEPA climate control and redundant power"],
      ["مقطورات تبرع وأسنان ومسح", "أربع إلى ست محطات ومختبر", "تكييف HEPA وطاقة احتياطية"],
    ),
  },
];
