"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { areaExtras, categories } from "@/lib/content";
import { languages, useI18n } from "@/lib/i18n";

const links = [
  { href: "/", key: "home" },
  { href: "/hakkimizda", key: "about" },
  { href: "/haberler", key: "news" },
  { href: "/iletisim", key: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [areas, setAreas] = useState(false);

  const active = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const areaLinks = [
    ...categories.map((item) => ({ href: item.href, label: item.cardTitle[lang] })),
    ...areaExtras.map((item) => ({ href: item.href, label: item.title[lang] })),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white text-slate print:hidden">
      <div className="mx-auto flex h-[78px] max-w-[1240px] items-center justify-between gap-6 px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/" className={`relative py-7 text-[14px] font-medium ${active("/") && pathname === "/" ? "text-burgundy" : "text-slate hover:text-ink"}`}>
            {t("home")}
            {pathname === "/" ? <span className="absolute inset-x-0 bottom-0 h-px bg-burgundy" /> : null}
          </Link>
          <Link href="/hakkimizda" className={`relative py-7 text-[14px] font-medium ${active("/hakkimizda") ? "text-burgundy" : "text-slate hover:text-ink"}`}>
            {t("about")}
            {active("/hakkimizda") ? <span className="absolute inset-x-0 bottom-0 h-px bg-burgundy" /> : null}
          </Link>
          <div className="relative" onMouseEnter={() => setAreas(true)} onMouseLeave={() => setAreas(false)}>
            <button
              type="button"
              className={`flex items-center gap-1.5 py-7 text-[14px] font-medium ${pathname.startsWith("/faaliyet-alanlari") ? "text-burgundy" : "text-slate hover:text-ink"}`}
              aria-expanded={areas}
              onClick={() => setAreas((value) => !value)}
            >
              {t("areas")}
              <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 transition ${areas ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 7.5 10 12.5 15 7.5" />
              </svg>
            </button>
            {areas ? (
              <div className="absolute start-0 top-full z-50 w-[300px] border border-line bg-white py-2 shadow-[0_18px_40px_rgba(36,48,56,0.12)]">
                {areaLinks.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setAreas(false)}
                    className="block px-4 py-2.5 text-sm text-slate hover:bg-paper hover:text-burgundy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {links.slice(2).map((link) => (
            <Link key={link.href} href={link.href} className={`relative py-7 text-[14px] font-medium ${active(link.href) ? "text-burgundy" : "text-slate hover:text-ink"}`}>
              {t(link.key)}
              {active(link.href) ? <span className="absolute inset-x-0 bottom-0 h-px bg-burgundy" /> : null}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em]">
            {languages.map((item, index) => (
              <span key={item.id} className="flex items-center gap-2">
                {index > 0 ? <span className="text-line">/</span> : null}
                <button type="button" onClick={() => setLang(item.id)} className={lang === item.id ? "text-burgundy" : "text-muted hover:text-ink"}>
                  {item.label}
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-line text-slate lg:hidden"
            aria-label={t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-white px-5 py-3 text-ink lg:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium">
            {t("home")}
          </Link>
          <Link href="/hakkimizda" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium">
            {t("about")}
          </Link>
          <p className="pt-3 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{t("areas")}</p>
          {areaLinks.map((item) => (
            <Link key={item.href + item.label} href={item.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm text-slate">
              {item.label}
            </Link>
          ))}
          {links.slice(2).map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium">
              {t(link.key)}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
