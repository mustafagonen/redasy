export type LangText = { tr: string; en: string; ar: string };
const tx = (tr: string, en: string, ar: string): LangText => ({ tr, en, ar });

export type ActivityCard = {
  cat?: string;
  badge: LangText;
  title: LangText;
  text: LangText;
  specs: LangText[];
  quote: string;
};

export type Activity = {
  slug: string;
  href: string;
  tab: LangText;
  crumb: LangText;
  title: LangText;
  desc: LangText;
  filters?: { id: string; label: LangText }[];
  cards?: ActivityCard[];
  kind: "cards" | "chassis" | "fason";
};

export const activities: Activity[] = [
  {
    slug: "kirma-eleme-yikama",
    href: "/faaliyet-alanlari/kirma-eleme-yikama",
    kind: "cards",
    tab: tx("1. Mobil Kırma, Yıkama & Konveyör", "1. Mobile crushing, washing & conveyors", "1. الكسر والغسل والسيور"),
    crumb: tx(
      "Faaliyet Alanlarımız / Mobil Kırma, Eleme & Yıkama Sistemleri",
      "Business areas / Mobile crushing, screening & washing",
      "مجالات النشاط / الكسر والغربلة والغسل",
    ),
    title: tx(
      "Mobil Kırma, Eleme, Yıkama & Konveyör Sistemleri",
      "Mobile crushing, screening, washing & conveyor systems",
      "أنظمة الكسر والغربلة والغسل والسيور المتنقلة",
    ),
    desc: tx(
      "Maden, taş ocağı ve kum ocakları için yüksek kapasiteli kırma-eleme üniteleri, susuzlandırma/yıkama çözümleri ve ağır hizmet konveyör bant/tambur ekipmanları.",
      "High-capacity crushing and screening units, dewatering and washing, and heavy-duty conveyor belts and drums for mines, quarries and sand pits.",
      "وحدات كسر وغربلة عالية السعة وحلول غسل ونزح ومعدات سيور ودرامات للمناجم والمقالع ومقالع الرمل.",
    ),
    filters: [
      { id: "all", label: tx("Tüm Sistemler", "All systems", "كل الأنظمة") },
      { id: "kirma", label: tx("Mobil Kırma & Eleme Tesisleri", "Mobile crushing & screening", "محطات الكسر والغربلة") },
      { id: "yikama", label: tx("Yıkama & Susuzlandırma (Kum Ocağı)", "Washing & dewatering", "الغسل ونزح المياه") },
      { id: "konveyor", label: tx("Konveyör Bant & Tambur Sistemleri", "Conveyor belts & drums", "السيور والدرامات") },
    ],
    cards: [
      {
        cat: "kirma",
        badge: tx("250 - 450 Ton/Saat", "250 - 450 tph", "250 - 450 طن/ساعة"),
        title: tx(
          "Primer Mobil Çeneli & Darbeli Kırma Tesisi",
          "Primary mobile jaw & impact crushing plant",
          "محطة كسر أولية فكية وصدمة متنقلة",
        ),
        text: tx(
          "Sert bazalt, granit ve kalker ocakları için titreşimli besleyici, by-pass konveyörü ve manyetik separatör dahil tam mobil kırma ünitesi.",
          "A complete mobile crushing unit for hard basalt, granite and limestone, including a vibrating feeder, bypass conveyor and magnetic separator.",
          "وحدة كسر متنقلة كاملة للبازلت والغرانيت والكلس، مع مغذٍ هزاز وسير تحويل وفاصل مغناطيسي.",
        ),
        specs: [
          tx("Besleme Ağzı: 1100 x 850 mm ağır hizmet", "Feed opening: 1100 x 850 mm heavy duty", "فتحة التغذية: 1100 × 850 مم"),
          tx("Şasi: 3 dingilli ağır hizmet I-450 çelik şasi", "Chassis: 3-axle heavy-duty I-450 steel", "الهيكل: 3 محاور فولاذ I-450"),
          tx("Otomasyon: PLC uzaktan kumandalı kontrol", "Automation: PLC with remote control", "الأتمتة: PLC بتحكم عن بعد"),
        ],
        quote: "Primer Mobil Çeneli & Darbeli Kırma Tesisi",
      },
      {
        cat: "yikama",
        badge: tx("Kum & Agrega Yıkama", "Sand & aggregate washing", "غسل الرمل والركام"),
        title: tx(
          "Helezon Yıkayıcı, Kovalı Yıkayıcı & Hidrosiklon",
          "Screw washer, bucket washer & hydrocyclone",
          "غسّال حلزوني ودلوي وهيدروسيكلون",
        ),
        text: tx(
          "0-5 mm ince malzeme kaybını sıfıra indiren hidrosiklonlu susuzlandırma elekleri, çift milli helezon yıkayıcılar ve çamur arıtma (thickener) üniteleri.",
          "Hydrocyclone dewatering screens, twin-shaft screw washers and thickeners that cut 0-5 mm fines loss.",
          "غرابيل نزح بهيدروسيكلون وغسالات حلزونية مزدوجة ووحدات تثخين تقلل فقد النواعم 0-5 مم.",
        ),
        specs: [
          tx("Yıkama kapasitesi: 100 - 300 ton/saat", "Washing capacity: 100 - 300 tph", "سعة الغسل: 100 - 300 طن/ساعة"),
          tx("Elek yüzeyi: poliüretan modüler susuzlandırma", "Screen media: modular polyurethane dewatering", "سطح الغربال: بولي يوريثان معياري"),
          tx("Su geri kazanımı: %85'e varan thickener", "Water recovery: thickener up to 85%", "استرجاع الماء: حتى 85%"),
        ],
        quote: "Helezon Yıkayıcı & Hidrosiklon Susuzlandırma Tesisi",
      },
      {
        cat: "konveyor",
        badge: tx("DIN 22102 Standart", "DIN 22102", "معيار DIN 22102"),
        title: tx(
          "Ağır Hizmet Konveyör Bant, Rulo & Tambur Sistemleri",
          "Heavy-duty conveyor belts, rollers & drums",
          "سيور وبكرات ودرامات للخدمة الشاقة",
        ),
        text: tx(
          "EP400/EP500 çok katlı kauçuk ve çelik kordlu konveyör bantlar, kauçuk kaplamalı tahrik tamburları, darbe ruloları ve poliüretan bant sıyırıcılar.",
          "EP400/EP500 multi-ply and steel-cord belts, rubber-lagged drive drums, impact rollers and polyurethane scrapers.",
          "سيور EP400/EP500 متعددة الطبقات وحبل فولاذي ودرامات قيادة مغطاة بالمطاط وبكرات صدم وكاشطات بولي يوريثان.",
        ),
        specs: [
          tx("Bant genişlikleri: 600 / 800 / 1000 / 1200 / 1400 mm", "Belt widths: 600 / 800 / 1000 / 1200 / 1400 mm", "عرض السير: 600 / 800 / 1000 / 1200 / 1400 مم"),
          tx("Tambur: baklava desen kauçuk kaplamalı tahrik", "Drum: diamond-lagged rubber drive", "الدرام: قيادة مغطاة بمطاط معيني"),
          tx("Yedek parça: istasyon, rulo ve sıyırıcı setleri", "Spares: idler, roller and scraper sets", "الغيار: محطات وبكرات وكاشطات"),
        ],
        quote: "Konveyör Bant, Rulo ve Tambur Sistemleri",
      },
    ],
  },
  {
    slug: "is-makinesi-atasmanlari",
    href: "/faaliyet-alanlari/is-makinesi-atasmanlari",
    kind: "cards",
    tab: tx("2. İş Makinesi Ataşmanları", "2. Machine attachments", "2. ملحقات الآليات"),
    crumb: tx("Faaliyet Alanlarımız / İş Makinesi Ataşmanları", "Business areas / Machine attachments", "مجالات النشاط / ملحقات الآليات"),
    title: tx("Ağır Hizmet İş Makinesi Ataşmanları", "Heavy-duty machine attachments", "ملحقات آليات للخدمة الشاقة"),
    desc: tx(
      "Maden ve hafriyat sahalarında çalışan 15 tondan 90 tona kadar tüm ekskavatör ve yükleyiciler için Hardox 450/500 zırh çeliğinden üretilen ekstrem ataşmanlar.",
      "Extreme attachments in Hardox 450/500 wear plate for excavators and loaders from 15 to 90 tons.",
      "ملحقات قصوى من فولاذ Hardox 450/500 للحفارات واللوادر من 15 إلى 90 طنًا.",
    ),
    cards: [
      {
        badge: tx("HARDOX 450 / 500", "HARDOX 450 / 500", "HARDOX 450 / 500"),
        title: tx("Ekstrem Kaya Kovaları", "Extreme rock buckets", "جرافات صخور قصوى"),
        text: tx(
          "Yüksek aşınma dirençli yan bıçaklar, topuk koruyucular ve ağır hizmet tırnak adaptörleriyle donatılmış kaya ve maden kovaları.",
          "Rock and mine buckets with wear-resistant side cutters, heel shrouds and heavy-duty tooth adapters.",
          "جرافات صخور ومناجم بسكاكين جانبية وواقيات كعب ومحولات أسنان للخدمة الشاقة.",
        ),
        specs: [
          tx("Kapasite: 1,2 m³ – 5,5 m³ özel üretim", "Capacity: 1.2–5.5 m³ custom build", "السعة: 1.2 – 5.5 م³"),
          tx("Uyumlu tonaj: 20 – 85 ton ekskavatör", "Fit: 20–85 ton excavators", "التوافق: حفارات 20 – 85 طنًا"),
        ],
        quote: "Ağır Hizmet Ekskavatör Kaya Kovası",
      },
      {
        badge: tx("YÜKSEK DARBE GÜCÜ", "HIGH IMPACT", "قوة صدم عالية"),
        title: tx("Hidrolik Kırıcılar & Kaya Riperleri", "Hydraulic breakers & rock rippers", "كسارات هيدروليكية وريبر صخور"),
        text: tx(
          "Sert kayaç sökümü için tek parça dövme çelik gövdeli riperler ve sessiz tip kutulu hidrolik kaya kırıcı ataşmanları.",
          "One-piece forged rippers and silenced boxed hydraulic breakers for hard rock.",
          "ريبر فولاذي مطروق وكسارات هيدروليكية صندوقية هادئة للصخور الصلبة.",
        ),
        specs: [
          tx("Gövde: tam kapalı ses izolasyonlu kutu", "Body: fully enclosed silenced box", "الهيكل: صندوق مغلق عازل للصوت"),
          tx("Uygulama: taş ocağı, tünel ve yıkım", "Use: quarry, tunnel and demolition", "الاستخدام: مقلع ونفق وهدم"),
        ],
        quote: "Hidrolik Kırıcı ve Kaya Riperi Ataşmanı",
      },
      {
        badge: tx("HIZLI DEĞİŞİM & POLİP", "QUICK CHANGE & GRAPPLE", "تبديل سريع وكلاب"),
        title: tx("Hidrolik Quick Coupler & Polip", "Hydraulic quick coupler & grapple", "قارنة هيدروليكية وكلاب"),
        text: tx(
          "Kabininden çıkmadan ataşman değişimi sağlayan çift emniyet kilitli quick coupler ve hurda/kaya polipleri.",
          "A dual-lock quick coupler for in-cab changes, plus scrap and rock grapples.",
          "قارنة بقفل مزدوج للتبديل من الكابينة وكلابات خردة وصخور.",
        ),
        specs: [
          tx("Emniyet: hidrolik + mekanik çift kilit", "Safety: hydraulic and mechanical dual lock", "الأمان: قفل هيدروليكي وميكانيكي"),
          tx("Standart: CE ve ISO iş güvenliği uyumlu", "Standard: CE and ISO", "المعيار: CE وISO"),
        ],
        quote: "Quick Coupler ve Polip Ataşmanı",
      },
    ],
  },
  {
    slug: "arac-ustu-ekipmanlar",
    href: "/faaliyet-alanlari/arac-ustu-ekipmanlar",
    kind: "cards",
    tab: tx("3. Araç Üstü Ekipmanlar", "3. Truck-mounted equipment", "3. معدات المركبات"),
    crumb: tx("Faaliyet Alanlarımız / Araç Üstü Ekipmanlar", "Business areas / Truck-mounted equipment", "مجالات النشاط / معدات المركبات"),
    title: tx("Araç Üstü Ekipmanlar & Ağır Hizmet Üstyapıları", "Truck-mounted equipment & heavy bodies", "معدات المركبات والهياكل الثقيلة"),
    desc: tx(
      "Belediyeler, kamu kurumları ve maden işletmeleri için kaya damperleri, lowbed yarı römorklar, mobil bakım kamyonları ve özel araç üstü ekipman çözümleri.",
      "Rock dump bodies, lowbed semi-trailers, mobile service trucks and custom bodies for municipalities, public agencies and mines.",
      "قلابات صخور ومقطورات لوبد وشاحنات صيانة وهياكل خاصة للبلديات والجهات العامة والمناجم.",
    ),
    cards: [
      {
        badge: tx("MADEN & BELEDİYE", "MINE & MUNICIPAL", "منجم وبلدية"),
        title: tx("Ağır Hizmet Kaya Damperleri", "Heavy-duty rock dump bodies", "قلابات صخور للخدمة الشاقة"),
        text: tx(
          "Kamyon ve kırkayak şasileri üzerine yüksek mukavemetli çelikten imal edilen, ağır kaya ve hafriyat taşımacılığına uygun half-pipe ve köşeli damper üstyapıları.",
          "Half-pipe and square dump bodies in high-strength steel for rock and earthmoving on truck and multi-axle chassis.",
          "هياكل قلاب نصف أنبوب وزاوية من فولاذ عالي المقاومة لنقل الصخور على الشاحنات ومتعددة المحاور.",
        ),
        specs: [],
        quote: "Ağır Hizmet Kaya Damperi Üstyapısı",
      },
      {
        badge: tx("AĞIR NAKLİYE (2 - 6 DİNGİL)", "HEAVY HAUL (2–6 AXLES)", "نقل ثقيل (2–6 محاور)"),
        title: tx("Lowbed Yarı Römork & İş Makinesi Taşıyıcılar", "Lowbed semi-trailers & machine carriers", "مقطورات لوبد وناقلات آليات"),
        text: tx(
          "Ekskavatör, mobil kırıcı ve ağır tonajlı iş makinelerinin nakliyesi için hidrolik rampalı, sabit veya uzayabilir şasili lowbed dorseler.",
          "Fixed or extendable lowbeds with hydraulic ramps for excavators, mobile crushers and heavy machines.",
          "لوبد ثابت أو قابل للتمديد بمنحدر هيدروليكي لنقل الحفارات والكسارات المتنقلة.",
        ),
        specs: [],
        quote: "Lowbed Yarı Römork ve Taşıyıcı Dorse",
      },
      {
        badge: tx("SAHA LOJİSTİĞİ", "SITE LOGISTICS", "لوجستيات الموقع"),
        title: tx("Mobil Yağlama, Servis & Su Tankeri", "Mobile lube, service & water tankers", "تزييت وخدمة وصهريج ماء متنقل"),
        text: tx(
          "Şantiye ve maden sahalarında yerinde bakım için kompresör, jeneratör, yağ-mazot pompaları ve alet dolaplarıyla donatılmış servis araçları.",
          "Service trucks with compressor, generator, oil and diesel pumps and tool lockers for on-site maintenance.",
          "مركبات خدمة بضاغط ومولد ومضخات زيت ومازوت وخزائن عدد للصيانة في الموقع.",
        ),
        specs: [],
        quote: "Mobil Saha Servis ve Yağlama Aracı",
      },
    ],
  },
  {
    slug: "mobil-cozumler",
    href: "/faaliyet-alanlari/mobil-cozumler",
    kind: "chassis",
    tab: tx("4. Mobil Çözümler (17.5 m Şasi)", "4. Mobile solutions (17.5 m chassis)", "4. حلول متنقلة (هيكل 17.5 م)"),
    crumb: tx("Faaliyet Alanlarımız / Mobil Çözümler", "Business areas / Mobile solutions", "مجالات النشاط / حلول متنقلة"),
    title: tx(
      "Özel Mühendislik Mobil Çözümler & Ağır Şasi Sistemleri",
      "Engineered mobile solutions & heavy chassis",
      "حلول متنقلة وهياكل ثقيلة بهندسة خاصة",
    ),
    desc: tx(
      "REDASY mühendislik ekibi tarafından statik ve dinamik yük analizleriyle tasarlanan 17,5 metreye varan ağır hizmet mobil tesis şasileri ve özel saha üniteleri.",
      "Heavy-duty mobile plant chassis up to 17.5 m, designed with static and dynamic load analysis, plus custom field units.",
      "هياكل محطات متنقلة حتى 17.5 م مصممة بتحليل أحمال ثابت وديناميكي ووحدات ميدانية خاصة.",
    ),
  },
  {
    slug: "fason-imalat",
    href: "/faaliyet-alanlari/fason-imalat",
    kind: "fason",
    tab: tx("Fason İmalat & Lazer Kesim", "Contract work & laser cutting", "تصنيع للغير وقص ليزر"),
    crumb: tx(
      "Faaliyet Alanlarımız / Fason İmalat & Lazer Kesim İşlemi",
      "Business areas / Contract manufacturing & laser cutting",
      "مجالات النشاط / التصنيع للغير وقص الليزر",
    ),
    title: tx(
      "Fason İmalat, Ağır Kaynaklı İmalat & CNC Lazer Kesim",
      "Contract manufacturing, heavy fabrication & CNC laser",
      "تصنيع للغير ولحام ثقيل وقص ليزر CNC",
    ),
    desc: tx(
      "Ankara Sincan OSB fabrikamızda yüksek tonajlı çelik konstrüksiyon, CNC lazer kesim, abkant büküm, talaşlı imalat ve sertifikalı kaynaklı imalat çözümleri.",
      "Heavy steelwork, CNC laser cutting, press braking, machining and certified welded fabrication at the Sincan OSB plant in Ankara.",
      "إنشاءات فولاذية ثقيلة وقص ليزر وثني ومخرطة وتصنيع ملحوم معتمد في مصنع سنجان بأنقرة.",
    ),
  },
  {
    slug: "lazer-kesim",
    href: "/faaliyet-alanlari/lazer-kesim",
    kind: "fason",
    tab: tx("Lazer Kesim İşlemi", "Laser cutting", "قص الليزر"),
    crumb: tx("Faaliyet Alanlarımız / Lazer Kesim İşlemi", "Business areas / Laser cutting", "مجالات النشاط / قص الليزر"),
    title: tx(
      "Endüstriyel CNC Lazer Kesim ve Sac İşleme Merkezi",
      "Industrial CNC laser cutting and plate processing",
      "مركز قص ليزر CNC ومعالجة الصاج",
    ),
    desc: tx(
      "Yüksek hassasiyetli fiber lazer kesim, plazma kesim ve ağır hizmet büküm operasyonları.",
      "High-precision fiber laser, plasma cutting and heavy press-brake work.",
      "قص ليزر ليفي وبلازما وثني للخدمة الشاقة بدقة عالية.",
    ),
  },
];

export function getActivity(slug: string) {
  return activities.find((item) => item.slug === slug);
}

export const references = [
  { name: "T.C. ANKARA BÜYÜKŞEHİR BELEDİYESİ", type: "Büyükşehir Belediyesi", mark: "ANK" },
  { name: "T.C. İSTANBUL BÜYÜKŞEHİR BELEDİYESİ", type: "Büyükşehir Belediyesi", mark: "İST" },
  { name: "T.C. KONYA BÜYÜKŞEHİR BELEDİYESİ", type: "Büyükşehir Belediyesi", mark: "KON" },
  { name: "T.C. GAZİANTEP BÜYÜKŞEHİR BELEDİYESİ", type: "Büyükşehir Belediyesi", mark: "GZT" },
  { name: "T.C. BURSA BÜYÜKŞEHİR BELEDİYESİ", type: "Büyükşehir Belediyesi", mark: "BRS" },
  { name: "YÜCELEN MADENCİLİK & AGREGA", type: "Maden & Taş Ocağı", mark: "YCL" },
  { name: "BOZDOĞAN KUM & ÇAKIL OCAKLARI", type: "Kum Ocağı & Eleme Tesisi", mark: "BZD" },
  { name: "ANADOLU BAZALT & TAŞ OCAKLARI A.Ş.", type: "Bazalt & Kalker Ocağı", mark: "ABZ" },
  { name: "KIZILIRMAK KUM & AGREGA TESİSLERİ", type: "Nehir Kumu & Yıkama Ocağı", mark: "KIZ" },
  { name: "TOROSLAR KALKER & MADEN SANAYİ", type: "Maden & Kırma Eleme", mark: "TRS" },
];

export const heroSlides = [
  {
    image: "/images/hero/kirma.jpg",
    title: tx("Endüstrinin Geleceğini Mühendislikle Tasarlıyoruz.", "We engineer the future of industry.", "نصمّم مستقبل الصناعة بالهندسة."),
    text: tx(
      "Yüksek performanslı mobil kırma, eleme ve araç üstü ekipman çözümlerinde global mühendislik gücü.",
      "A global engineering force in high-performance mobile crushing, screening and truck-mounted equipment.",
      "قوة هندسية عالمية في الكسر والغربلة المتنقلة ومعدات المركبات.",
    ),
    cta: tx("Faaliyet Alanlarımızı Keşfedin", "Explore our business areas", "اكتشف مجالات نشاطنا"),
    href: "/faaliyet-alanlari/kirma-eleme-yikama",
  },
  {
    image: "/images/hero/kirma.jpg",
    title: tx("Mobil Kırma ve Eleme Sistemlerinde Yüksek Güç.", "High power in mobile crushing and screening.", "قوة عالية في الكسر والغربلة المتنقلة."),
    text: tx(
      "Ağır hizmet çeneli, darbeli ve konik kırıcılar ile maden ve taş ocaklarında kesintisiz üretim performansı.",
      "Heavy-duty jaw, impact and cone crushers for continuous output in mines and quarries.",
      "كسارات فكية وصدمة ومخروطية للإنتاج المستمر في المناجم والمقالع.",
    ),
    cta: tx("Mobil Kırma Sistemlerini İncele", "View mobile crushing", "عرض أنظمة الكسر"),
    href: "/faaliyet-alanlari/kirma-eleme-yikama",
  },
  {
    image: "/images/hero/atasman.jpg",
    title: tx("İş Makineleri İçin Ekstrem Kaya Kovası ve Ataşmanlar.", "Extreme rock buckets and attachments.", "جرافات صخور وملحقات قصوى."),
    text: tx(
      "Hardox 450/500 zırh çeliği ile güçlendirilmiş ekskavatör kaya kovaları, riperler ve hidrolik kırıcı ataşmanları.",
      "Excavator rock buckets, rippers and hydraulic breakers reinforced with Hardox 450/500.",
      "جرافات وريبر وكسارات هيدروليكية معززة بـ Hardox 450/500.",
    ),
    cta: tx("Ataşman Grubunu İncele", "View attachments", "عرض الملحقات"),
    href: "/faaliyet-alanlari/is-makinesi-atasmanlari",
  },
  {
    image: "/images/hero/mobil.jpg",
    title: tx("Araç Üstü Ekipmanlar ve 17,5 m Özel Mobil Şasiler.", "Truck bodies and 17.5 m mobile chassis.", "معدات مركبات وهياكل متنقلة 17.5 م."),
    text: tx(
      "Ağır hizmet tipi tridem boji şasiler, kaya damperleri, lowbed dorseler ve özel saha çözüm üniteleri.",
      "Heavy tridem chassis, rock dump bodies, lowbeds and custom field units.",
      "هياكل ثلاثية المحاور وقلابات صخور ولوبد ووحدات ميدانية خاصة.",
    ),
    cta: tx("Mobil Çözümleri Keşfedin", "Explore mobile solutions", "اكتشف الحلول المتنقلة"),
    href: "/faaliyet-alanlari/mobil-cozumler",
  },
];

export const pillars = [
  {
    n: "1",
    href: "/faaliyet-alanlari/kirma-eleme-yikama",
    image: "/images/hero/kirma.jpg",
    title: tx("Mobil Kırma & Eleme Sistemleri", "Mobile crushing & screening", "الكسر والغربلة المتنقلة"),
    note: null,
  },
  {
    n: "2",
    href: "/faaliyet-alanlari/is-makinesi-atasmanlari",
    image: "/images/hero/atasman.jpg",
    title: tx("İş Makinesi Ataşmanları", "Machine attachments", "ملحقات الآليات"),
    note: null,
  },
  {
    n: "3",
    href: "/faaliyet-alanlari/arac-ustu-ekipmanlar",
    image: "/images/hero/arac.jpg",
    title: tx("Araç Üstü Ekipmanlar", "Truck-mounted equipment", "معدات المركبات"),
    note: null,
  },
  {
    n: "4",
    href: "/faaliyet-alanlari/mobil-cozumler",
    image: "/images/hero/mobil.jpg",
    title: tx("Mobil Çözümler", "Mobile solutions", "حلول متنقلة"),
    note: tx("Özel Saha Üniteleri", "Custom field units", "وحدات ميدانية خاصة"),
  },
];
