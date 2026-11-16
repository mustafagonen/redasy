export type NavChild = {
  id: string;
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  visible: boolean;
  submenu: boolean;
  children: NavChild[];
};

export type NavConfig = {
  items: NavItem[];
};

const MAX_ITEMS = 8;
const MAX_CHILDREN = 8;

export const defaultNav: NavConfig = {
  items: [
    { id: "anasayfa", label: "Anasayfa", href: "/#anasayfa", visible: true, submenu: false, children: [] },
    { id: "kurumsal", label: "Kurumsal", href: "/#kurumsal", visible: true, submenu: false, children: [] },
    { id: "faaliyet", label: "Faaliyet Alanları", href: "/#faaliyet", visible: true, submenu: false, children: [] },
    { id: "kariyer", label: "Kariyer", href: "/#kariyer", visible: true, submenu: false, children: [] },
    { id: "iletisim", label: "İletişim", href: "/#iletisim", visible: true, submenu: false, children: [] },
  ],
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function cleanHref(value: string) {
  const href = value.trim();
  if (!href) return "";
  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (/^https?:\/\//i.test(href)) return href;
  return `https://${href}`;
}

function childId(value: unknown, fallback: string) {
  const id = text(value, 80);
  return id || fallback;
}

export function visibleChildren(item: NavItem) {
  if (!item.submenu) return [];
  return item.children.filter((child) => child.label && child.href);
}

export function normalizeNav(value: unknown): NavConfig {
  const record = value && typeof value === "object" ? (value as { items?: unknown }) : {};
  const incoming = Array.isArray(record.items) ? record.items : [];
  if (!incoming.length) return defaultNav;

  const seen = new Set<string>();
  const items: NavItem[] = [];

  incoming.slice(0, MAX_ITEMS).forEach((entry, index) => {
    if (!entry || typeof entry !== "object") return;
    const raw = entry as Partial<NavItem>;
    const label = text(raw.label, 48);
    if (!label) return;

    let id = childId(raw.id, `menu-${index + 1}`);
    while (seen.has(id)) id = `${id}-${index + 1}`;
    seen.add(id);

    const childSeen = new Set<string>();
    const children = (Array.isArray(raw.children) ? raw.children : []).slice(0, MAX_CHILDREN).flatMap((child, childIndex) => {
      if (!child || typeof child !== "object") return [];
      const row = child as Partial<NavChild>;
      const childLabel = text(row.label, 48);
      if (!childLabel) return [];
      let childKey = childId(row.id, `${id}-${childIndex + 1}`);
      while (childSeen.has(childKey)) childKey = `${childKey}-${childIndex + 1}`;
      childSeen.add(childKey);
      return [{ id: childKey, label: childLabel, href: cleanHref(text(row.href, 300)) }];
    });

    items.push({
      id,
      label,
      href: cleanHref(text(raw.href, 300)),
      visible: raw.visible !== false,
      submenu: raw.submenu === true,
      children,
    });
  });

  return items.length ? { items } : defaultNav;
}
