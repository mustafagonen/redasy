export const socialCatalog = [
  { id: "facebook", label: "Facebook", path: "M15 8h-2a1 1 0 0 0-1 1v2h3l-.4 3H12v7H9v-7H7v-3h2V8.6A3.6 3.6 0 0 1 12.7 5H15v3Z" },
  {
    id: "instagram",
    label: "Instagram",
    path: "M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm8.2 1.8h-1.3l-.2 1.2a3.4 3.4 0 0 0-1.2-.2 3.5 3.5 0 1 0 3.5 3.5 3.4 3.4 0 0 0-.2-1.1l1.2-.2V6.2a.4.4 0 0 0-.4-.4h-.4ZM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2Zm4.4-2.5a.7.7 0 1 1-.7.7.7.7 0 0 1 .7-.7Z",
  },
  { id: "x", label: "X", path: "M6 5.5h2.4l3.1 4.2 3.5-4.2H19l-5.1 6.1L19.2 18.5h-2.4l-3.4-4.6-3.8 4.6H6.2l5.4-6.5L6 5.5Z" },
  {
    id: "youtube",
    label: "YouTube",
    path: "M21 8.2a3 3 0 0 0-2.1-2.1C17.2 5.7 12 5.7 12 5.7s-5.2 0-6.9.4A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.8a3 3 0 0 0 2.1 2.1c1.7.4 6.9.4 6.9.4s5.2 0 6.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10.4 14.8V9.2L15.2 12l-4.8 2.8Z",
  },
] as const;

export type SocialId = (typeof socialCatalog)[number]["id"];

export type SocialLink = {
  id: SocialId;
  visible: boolean;
  href: string;
  newTab: boolean;
};

export type SocialConfig = {
  links: SocialLink[];
};

export const defaultSocial: SocialConfig = {
  links: socialCatalog.map((item) => ({
    id: item.id,
    visible: true,
    href: "",
    newTab: false,
  })),
};

export function socialIcon(id: SocialId) {
  const icon = socialCatalog.find((item) => item.id === id);
  if (!icon) throw new Error(`Bilinmeyen sosyal ikon: ${id}`);
  return icon;
}

function cleanHref(value: string) {
  const href = value.trim();
  if (!href) return "";
  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (/^https?:\/\//i.test(href)) return href;
  return `https://${href}`;
}

export function normalizeSocial(value: unknown): SocialConfig {
  const record = value && typeof value === "object" ? (value as { links?: unknown }) : {};
  const incoming = Array.isArray(record.links) ? record.links : [];
  if (!incoming.length) return defaultSocial;

  return {
    links: socialCatalog.map((item) => {
      const found = incoming.find((entry) => entry && typeof entry === "object" && (entry as { id?: unknown }).id === item.id) as
        | Partial<SocialLink>
        | undefined;
      const fallback = defaultSocial.links.find((link) => link.id === item.id);
      return {
        id: item.id,
        visible: typeof found?.visible === "boolean" ? found.visible : (fallback?.visible ?? true),
        href: cleanHref(typeof found?.href === "string" ? found.href : (fallback?.href ?? "")),
        newTab: typeof found?.newTab === "boolean" ? found.newTab : (fallback?.newTab ?? false),
      };
    }),
  };
}
