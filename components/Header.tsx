"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { languages, useI18n } from "@/lib/i18n";

const links = [
  { href: "/", key: "home" },
  { href: "/hakkimizda", key: "about" },
  { href: "/faaliyet-alanlari", key: "areas" },
  { href: "/haberler", key: "news" },
  { href: "/iletisim", key: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const active = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#191e24] print:hidden">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const on = active(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-6 text-[15px] font-medium ${on ? "text-[#d75a23]" : "text-white/90 hover:text-white"}`}
              >
                {t(link.key)}
                {on ? <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d75a23]" /> : null}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            {languages.map((item, index) => (
              <span key={item.id} className="flex items-center gap-2">
                {index > 0 ? <span className="text-white/30">|</span> : null}
                <button
                  type="button"
                  onClick={() => setLang(item.id)}
                  className={lang === item.id ? "text-[#d75a23]" : "text-white/85 hover:text-white"}
                >
                  {item.label}
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            aria-label={t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#191e24] px-4 py-3 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-3 py-3 text-sm font-medium ${active(link.href) ? "text-[#d75a23]" : "text-white"}`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
