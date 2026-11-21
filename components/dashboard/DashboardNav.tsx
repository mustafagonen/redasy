"use client";

import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard/sosyal", label: "Sosyal medya", icon: "share" },
  { href: "/dashboard/menu", label: "Navbar Üst Menü", icon: "menu" },
  { href: "/dashboard/sayfalar", label: "Statik Alt Sayfalar", icon: "pages" },
  { href: "/dashboard/urunler", label: "Kategoriler ve Ürünler", icon: "products" },
  { href: "/dashboard", label: "Slayt Alanı", icon: "band" },
  { href: "/dashboard/asamalar", label: "Aşamalar", icon: "steps" },
  { href: "/dashboard/anasayfa", label: "Anasayfa", icon: "home" },
  { href: "/dashboard/iletisim", label: "İletişim", icon: "phone" },
  { href: "/dashboard/talepler", label: "Talepler", icon: "mail" },
] as const;

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto px-4 py-3 lg:flex lg:flex-col lg:gap-2.5 lg:px-3 lg:py-4" aria-label="Yönetim menüsü">
      {items.map((item) => {
        const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex min-w-max items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold lg:w-full ${active ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center" aria-hidden>
              <NavIcon name={item.icon} />
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function NavIcon({ name }: { name: (typeof items)[number]["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {name === "share" ? (
        <>
          <circle cx="6.5" cy="12" r="2.3" />
          <circle cx="17" cy="6.5" r="2.3" />
          <circle cx="17" cy="17.5" r="2.3" />
          <path d="M8.6 11.1 14.8 7.6M8.6 12.9l6.2 3.5" />
        </>
      ) : null}
      {name === "menu" ? <path d="M4.5 7h15M4.5 12h15M7.5 17h9" /> : null}
      {name === "pages" ? (
        <>
          <path d="M7 4.5h6.1L17.5 8.6V19.5H7z" />
          <path d="M13 4.7V8.7h4.2" />
        </>
      ) : null}
      {name === "products" ? (
        <>
          <rect x="4.2" y="4.2" width="6.6" height="6.6" rx="1.5" />
          <rect x="13.2" y="4.2" width="6.6" height="6.6" rx="1.5" />
          <rect x="4.2" y="13.2" width="6.6" height="6.6" rx="1.5" />
          <rect x="13.2" y="13.2" width="6.6" height="6.6" rx="1.5" />
        </>
      ) : null}
      {name === "band" ? (
        <>
          <rect x="3.6" y="6.2" width="16.8" height="11.6" rx="1.8" />
          <path d="M8 6.2v11.6M12 6.2v11.6M16 6.2v11.6" />
        </>
      ) : null}
      {name === "steps" ? (
        <>
          <circle cx="5.2" cy="6.5" r="1.15" />
          <circle cx="5.2" cy="12" r="1.15" />
          <circle cx="5.2" cy="17.5" r="1.15" />
          <path d="M9 6.5h10.2M9 12h10.2M9 17.5h10.2" />
        </>
      ) : null}
      {name === "home" ? (
        <>
          <rect x="4" y="4.4" width="16" height="4.4" rx="1.2" />
          <rect x="4" y="10.6" width="16" height="3.2" rx="1.1" />
          <rect x="4" y="15.8" width="16" height="3.2" rx="1.1" />
        </>
      ) : null}
      {name === "phone" ? <path d="M8 4.4h2.1l1.1 2.8-1.6 1a8.2 8.2 0 0 0 4.4 4.4l1-1.6 2.8 1.1v2.1a1.6 1.6 0 0 1-1.7 1.6A12.2 12.2 0 0 1 6.4 6.1 1.6 1.6 0 0 1 8 4.4Z" /> : null}
      {name === "mail" ? (
        <>
          <rect x="4" y="6" width="16" height="12" rx="1.8" />
          <path d="m4.5 7.2 7.5 5.6 7.5-5.6" />
        </>
      ) : null}
    </svg>
  );
}
