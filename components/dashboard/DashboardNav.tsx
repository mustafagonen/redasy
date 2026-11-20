"use client";

import { usePathname } from "next/navigation";

const items = [
  {
    href: "/dashboard/sosyal",
    label: "Sosyal medya",
    icon: "M8.2 10.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm7.6-.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM8.2 17.4a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm.4-5.6 5.6-2.6M8.6 12.4l5.6 2.6",
  },
  {
    href: "/dashboard/menu",
    label: "Menü",
    icon: "M4 7h16M4 12h16M7 17h10",
  },
  {
    href: "/dashboard/sayfalar",
    label: "Sayfalar",
    icon: "M6 4.5h8.2L18 8.2V19.5H6zM14 4.8V8.4h3.4",
  },
  {
    href: "/dashboard/urunler",
    label: "Ürünler",
    icon: "M5 7h6v6H5zM13 7h6v6h-6zM5 15h6v4H5zM13 15h6v4h-6z",
  },
  {
    href: "/dashboard",
    label: "Gri bant",
    icon: "M4 5h7v6H4zM13 5h7v6h-7zM4 13h7v6H4zM13 13h7v6h-7z",
  },
  {
    href: "/dashboard/asamalar",
    label: "Aşamalar",
    icon: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  },
  {
    href: "/dashboard/anasayfa",
    label: "Anasayfa",
    icon: "M4 5h16v4H4zM4 11h16v3H4zM4 16h16v3H4z",
  },
  {
    href: "/dashboard/iletisim",
    label: "İletişim",
    icon: "M7 4.5h2.2l1.1 2.8-1.5.9a8.5 8.5 0 0 0 4.5 4.5l.9-1.5 2.8 1.1V15a1.6 1.6 0 0 1-1.8 1.6A12 12 0 0 1 5.4 6.3 1.6 1.6 0 0 1 7 4.5Z",
  },
  {
    href: "/dashboard/talepler",
    label: "Talepler",
    icon: "M5 6.5h14v11H5zM5 6.5l7 5.5 7-5.5",
  },
];

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
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d={item.icon} />
              </svg>
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
