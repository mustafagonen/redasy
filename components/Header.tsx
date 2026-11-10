"use client";

import { useState, type ReactNode } from "react";
import { activities } from "@/lib/activities";
import { languages, useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";
import { useSite, type SiteView } from "./site";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { view, go, openContact } = useSite();
  const [open, setOpen] = useState(false);
  const areas = activities.filter((item) => item.slug !== "lazer-kesim");

  const jump = (next: SiteView) => {
    setOpen(false);
    go(next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-md print:hidden">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden h-full items-center lg:flex">
          <NavButton active={view === "home"} onClick={() => jump("home")}>
            {t("home")}
          </NavButton>
          <NavButton active={view === "hakkimizda"} onClick={() => jump("hakkimizda")}>
            {t("about")}
          </NavButton>
          <div className="group relative flex h-full items-center">
            <button
              type="button"
              onClick={() => jump("kirma-eleme-yikama")}
              className="flex h-14 items-center gap-2 rounded-t-md border-b-4 border-[#b3192b] bg-[#8b1220] px-5 text-[15px] font-semibold text-white shadow-sm hover:bg-[#b3192b]"
            >
              {t("areas")}
              <span aria-hidden className="text-xs">▾</span>
            </button>
            <div className="invisible absolute start-0 top-[74px] z-50 w-72 translate-y-2 rounded-b-lg border border-white/10 bg-[#23282e]/95 py-3 text-white opacity-0 shadow-2xl backdrop-blur-md transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {areas.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => jump(item.slug as SiteView)}
                  className={`block w-full px-5 py-2.5 text-start text-[14.5px] hover:bg-white/5 ${index === 0 ? "font-semibold text-[#e04f5f]" : "text-gray-200 hover:bg-[#8b1220]/40 hover:text-white"}`}
                >
                  {index === 0 ? "● " : ""}
                  {item.tab[lang].replace(/^\d+\.\s/, "")}
                </button>
              ))}
              <button
                type="button"
                onClick={() => jump("lazer-kesim")}
                className="block w-full px-5 py-2.5 text-start text-[14.5px] text-gray-200 hover:bg-[#8b1220]/40 hover:text-white"
              >
                Lazer Kesim İşlemi
              </button>
            </div>
          </div>
          <NavButton active={view === "haberler"} onClick={() => jump("haberler")}>
            {t("news")}
          </NavButton>
          <NavButton active={false} onClick={openContact}>
            {t("contact")}
          </NavButton>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm font-semibold text-gray-600">
            {languages.map((item, index) => (
              <span key={item.id} className="flex items-center">
                {index > 0 ? <span className="mx-1 text-gray-300">|</span> : null}
                <button type="button" onClick={() => setLang(item.id)} className={lang === item.id ? "px-1 font-bold text-[#8b1220]" : "px-1 hover:text-[#8b1220]"}>
                  {item.label}
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            aria-label={t("menu")}
            onClick={() => setOpen((value) => !value)}
            className="rounded-lg bg-gray-100 p-2.5 text-[#1c2024] hover:bg-[#8b1220] hover:text-white lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1.5 block h-0.5 w-5 bg-current" />
            <span className="mt-1.5 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="space-y-1 border-t border-white/10 bg-[#1c2024] px-4 py-4 text-white lg:hidden">
          <button type="button" onClick={() => jump("home")} className="block w-full rounded px-3 py-2 text-start font-medium hover:bg-white/10">
            {t("home")}
          </button>
          <button type="button" onClick={() => jump("hakkimizda")} className="block w-full rounded px-3 py-2 text-start font-medium hover:bg-white/10">
            {t("about")}
          </button>
          <div className="my-2 space-y-1 border-s-2 border-[#8b1220] ps-3">
            <p className="px-2 py-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">{t("areas")}</p>
            {activities.map((item) => (
              <button key={item.slug} type="button" onClick={() => jump(item.slug as SiteView)} className="block w-full px-2 py-1.5 text-start text-sm text-gray-200">
                {item.tab[lang]}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => jump("haberler")} className="block w-full rounded px-3 py-2 text-start font-medium hover:bg-white/10">
            {t("news")}
          </button>
          <button type="button" onClick={() => { setOpen(false); openContact(); }} className="mt-2 block w-full rounded bg-[#8b1220] px-3 py-2 text-center font-medium">
            Bize Ulaşın
          </button>
        </div>
      ) : null}
    </header>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-full items-center border-b-4 px-4 text-[15px] font-medium transition-colors ${active ? "border-[#8b1220] text-[#8b1220]" : "border-transparent text-[#1c2024] hover:text-[#8b1220]"}`}
    >
      {children}
    </button>
  );
}
