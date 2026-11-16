export const pageSlugs = ["hakkimizda", "vizyonumuz", "sertifikalarimiz", "kalite-politikamiz"] as const;

export type PageSlug = (typeof pageSlugs)[number];

export type PageSection = {
  id: string;
  title: string;
  text: string;
};

export type SitePage = {
  slug: PageSlug;
  title: string;
  lead: string;
  sections: PageSection[];
};

const MAX_SECTIONS = 8;

export const defaultPages: SitePage[] = [
  {
    slug: "hakkimizda",
    title: "Hakkımızda",
    lead: "Geleceğin mühendislik çözümlerini bugünden inşa ediyoruz.",
    sections: [
      {
        id: "biz-kimiz",
        title: "Biz Kimiz",
        text: "REDASY olarak, mobil kırma eleme sistemlerinden özel araç üstü ekipmanlara kadar, imalat ve mühendislik gücünü geniş sanayi fabrikamız sayesinde ortaya koyuyoruz.",
      },
      {
        id: "muhendislik",
        title: "Mühendislik anlayışı",
        text: "REDASY'nin mobil kırma eleme sistemlerindeki gücünü, araç üstü ekipmanlara taşıyan mühendislik anlayışıyla sağlam zemine oturtuyoruz.",
      },
      {
        id: "alanlar",
        title: "Çalışma alanlarımız",
        text: "Mobil kırma ve eleme sistemleri, iş makinesi ataşmanları, araç üstü ekipmanlar ve mobil çözümler. Agrega ve madencilikten çevre temizlik araçlarına, mobil sağlık çözümlerine kadar uzanan bir imalat hattı.",
      },
    ],
  },
  {
    slug: "vizyonumuz",
    title: "Vizyonumuz",
    lead: "Geleceğin mühendislik çözümlerini bugünden inşa ediyoruz.",
    sections: [
      {
        id: "ufuk",
        title: "Baktığımız yer",
        text: "Geleceğin mühendislik çözümlerini bugünden inşa ediyoruz. Güçlü Ar-Ge ve mühendislik kadromuzla her türlü ihtiyaca çözüm sunarız.",
      },
      {
        id: "erisim",
        title: "Erişim",
        text: "Dünya çapındaki imalat ağımız ve uluslararası konnektörlerimizle ürettiğimiz sistemleri daha geniş bir coğrafyaya taşıyoruz.",
      },
    ],
  },
  {
    slug: "sertifikalarimiz",
    title: "Sertifikalarımız",
    lead: "Uluslararası standartlarda üretilen kaliteli ürünler.",
    sections: [
      {
        id: "standart",
        title: "Üretim standardı",
        text: "Uluslararası standartlarda üretilen kaliteli ürünlerimizle dünya çapında çalışıyoruz.",
      },
    ],
  },
  {
    slug: "kalite-politikamiz",
    title: "Kalite Politikamız",
    lead: "Uluslararası standartlarda üretilen kaliteli ürünler.",
    sections: [
      {
        id: "politika",
        title: "Politikamız",
        text: "Uluslararası standartlarda üretilen kaliteli ürünlerimiz, mühendislik kadromuzun her ihtiyaca çözüm üretme yaklaşımıyla bir arada yürür.",
      },
      {
        id: "guven",
        title: "Güven",
        text: "Yüksek kalite ve güven, ürünün sahada sorunsuz çalışması için üretimden teslimata kadar aynı özenle takip edilir.",
      },
    ],
  },
];

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isSlug(value: string): value is PageSlug {
  return (pageSlugs as readonly string[]).includes(value);
}

export function normalizePages(value: unknown): SitePage[] {
  const record = value && typeof value === "object" ? (value as { pages?: unknown }) : {};
  const incoming = Array.isArray(record.pages) ? record.pages : Array.isArray(value) ? value : [];

  return pageSlugs.map((slug) => {
    const fallback = defaultPages.find((page) => page.slug === slug)!;
    const found = incoming.find((entry) => entry && typeof entry === "object" && (entry as { slug?: unknown }).slug === slug) as
      | Partial<SitePage>
      | undefined;
    if (!found) return fallback;

    const seen = new Set<string>();
    const sections = (Array.isArray(found.sections) ? found.sections : []).slice(0, MAX_SECTIONS).flatMap((section, index) => {
      if (!section || typeof section !== "object") return [];
      const row = section as Partial<PageSection>;
      const title = text(row.title, 80);
      if (!title) return [];
      let id = text(row.id, 80) || `${slug}-${index + 1}`;
      while (seen.has(id)) id = `${id}-${index + 1}`;
      seen.add(id);
      return [{ id, title, text: text(row.text, 1600) }];
    });

    return {
      slug,
      title: text(found.title, 80) || fallback.title,
      lead: text(found.lead, 400),
      sections,
    };
  });
}

export function normalizePage(value: unknown): SitePage | null {
  if (!value || typeof value !== "object") return null;
  const slug = text((value as { slug?: unknown }).slug, 80);
  if (!isSlug(slug)) return null;
  const [page] = normalizePages({ pages: [value] });
  return page?.slug === slug ? page : null;
}
