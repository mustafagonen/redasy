"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { SubmenuPanel } from "@/components/SubmenuPanel";
import { publicPhones, telHref, type ContactInfo } from "@/lib/contact";
import { visibleChildren, type NavConfig, type NavItem } from "@/lib/nav";
import { socialIcon, type SocialConfig } from "@/lib/social";

function Social({ social }: { social: SocialConfig }) {
  const links = social.links.filter((item) => item.visible && item.href);
  if (!links.length) return null;

  return (
    <div className="flex items-center gap-3.5">
      {links.map((item) => {
        const icon = socialIcon(item.id);
        return (
          <a
            key={item.id}
            href={item.href}
            aria-label={icon.label}
            target={item.newTab ? "_blank" : undefined}
            rel={item.newTab ? "noreferrer" : undefined}
            className="text-on-brand/95 hover:text-on-brand"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d={icon.path} />
            </svg>
          </a>
        );
      })}
    </div>
  );
}

type MenuPhase = "closed" | "open" | "closing";

export function Header({ contact, social, nav }: { contact: ContactInfo; social: SocialConfig; nav: NavConfig }) {
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const call = publicPhones(contact)[0];
  const items = nav.items.filter((item) => item.visible && item.label);
  const menuOpen = phase !== "closed";

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenu(null);
      setPhase((current) => (current === "open" ? "closing" : current));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(() => setPhase("closed"), 340);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "closed") setMobileMenu(null);
  }, [phase]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  function toggleMenu() {
    setPhase((current) => (current === "open" ? "closing" : "open"));
  }

  return (
    <header id="anasayfa" data-theme="surface" className={`relative bg-surface ${menuOpen ? "z-50" : "z-30"}`}>
      <div data-theme="brand-bar" className="bg-brand-bar text-on-brand">
        <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-end px-5 sm:px-8">
          <Social social={social} />
        </div>
      </div>
      <div className="border-b border-line">
        <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
            {items.map((item) => (
              <DesktopItem key={item.id} item={item} open={menu === item.id} onOpen={() => setMenu(item.id)} onClose={() => setMenu((current) => (current === item.id ? null : current))} />
            ))}
          </nav>
          {call ? (
            <a href={telHref(call.number)} data-theme="header" className="hidden items-center gap-2 text-sm font-semibold text-header lg:flex">
              <PhoneIcon />
              {call.number}
            </a>
          ) : null}
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 lg:hidden ${phase === "open" ? "border-brand" : "border-line"}`}
            aria-expanded={phase === "open"}
            aria-controls="site-menu"
            aria-label={phase === "open" ? "Menüyü kapat" : "Menüyü aç"}
            onClick={toggleMenu}
          >
            <span className="relative block h-[13px] w-4">
              <span className={`absolute inset-x-0 top-0 h-px bg-ink transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${phase === "open" ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute inset-x-0 top-[6px] h-px bg-ink transition duration-300 ${phase === "open" ? "opacity-0" : ""}`} />
              <span className={`absolute inset-x-0 top-3 h-px bg-ink transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${phase === "open" ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className={`fixed inset-x-0 bottom-0 top-[105px] lg:hidden ${phase === "closing" ? "menu-closing" : ""}`}>
          <nav id="site-menu" data-theme="paper" className="menu-panel flex h-full flex-col border-t-2 border-brand bg-paper shadow-[0_28px_70px_rgba(26,26,26,0.16)]" aria-label="Mobil menü">
            <div className="flex items-center justify-between px-6 pt-6 pb-1 sm:px-10">
              <p data-theme="soft" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-soft">Menü</p>
              <p data-theme="brand" className="font-display text-[11px] font-bold tracking-[0.2em] text-brand">REDASY</p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-10">
              <div className="md:grid md:grid-cols-2 md:gap-x-14">
                {items.map((item, index) => {
                  const children = visibleChildren(item);
                  const expanded = mobileMenu === item.id && children.length > 0;
                  return (
                    <div key={item.id} className="menu-row border-b border-line" style={{ animationDelay: `${90 + index * 60}ms` }}>
                      <div className="flex items-center gap-3 py-3.5 md:py-5">
                        <span data-theme="brand" className="w-7 shrink-0 font-display text-[12px] font-semibold tracking-[0.16em] text-brand">{String(index + 1).padStart(2, "0")}</span>
                        {item.href ? (
                          <a href={item.href} data-theme="header" onClick={() => setPhase("closing")} className="block flex-1 font-display text-[1.35rem] font-bold uppercase leading-none tracking-tight text-header md:text-[1.55rem]">
                            {item.label}
                          </a>
                        ) : (
                          <button type="button" data-theme="header" className={`block flex-1 text-left font-display text-[1.35rem] font-bold uppercase leading-none tracking-tight md:text-[1.55rem] ${expanded ? "text-brand" : "text-header"}`} onClick={() => setMobileMenu(expanded ? null : item.id)}>
                            {item.label}
                          </button>
                        )}
                        {children.length ? (
                          <button
                            type="button"
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition ${expanded ? "border-brand text-brand" : "border-line text-header"}`}
                            aria-expanded={expanded}
                            aria-label={expanded ? `${item.label} alt menüsünü kapat` : `${item.label} alt menüsünü aç`}
                            onClick={() => setMobileMenu(expanded ? null : item.id)}
                          >
                            <Chevron className={expanded ? "rotate-180" : ""} />
                          </button>
                        ) : null}
                      </div>
                      {children.length ? (
                        <div inert={expanded ? undefined : true} aria-hidden={expanded ? undefined : true} className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="min-h-0 overflow-hidden">
                            <div className="pb-4 pl-10">
                              {children.map((child) => (
                                <a key={child.id} href={child.href} data-theme="header" onClick={() => setPhase("closing")} className="flex items-center gap-3 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-header">
                                  <span data-theme="brand" className="h-px w-4 shrink-0 bg-brand" />
                                  {child.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            {call ? (
              <div className="border-t border-line px-6 py-5 sm:px-10">
                <a href={telHref(call.number)} data-theme="brand" className="menu-row flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-on-brand" style={{ animationDelay: `${90 + items.length * 60}ms` }}>
                  <PhoneIcon className="text-on-brand" />
                  Ara · {call.number}
                </a>
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function DesktopItem({ item, open, onOpen, onClose }: { item: NavItem; open: boolean; onOpen: () => void; onClose: () => void }) {
  const children = visibleChildren(item);
  const linkClass = `text-[12.5px] font-semibold uppercase tracking-[0.14em] ${open ? "text-brand" : "text-header hover:text-brand"}`;

  return (
    <div
      className="relative"
      onMouseEnter={children.length ? onOpen : undefined}
      onMouseLeave={children.length ? onClose : undefined}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (children.length && !(next instanceof Node && event.currentTarget.contains(next))) onClose();
      }}
    >
      <div className="flex items-center gap-1">
        {item.href ? (
          <a href={item.href} data-theme="header" className={linkClass} onFocus={children.length ? onOpen : undefined}>
            {item.label}
          </a>
        ) : (
          <button type="button" data-theme="header" className={linkClass} aria-expanded={open} onClick={() => (open ? onClose() : onOpen())}>
            {item.label}
          </button>
        )}
        {children.length ? (
          <button
            type="button"
            className={`grid h-6 w-6 place-items-center ${open ? "text-brand" : "text-header"}`}
            aria-expanded={open}
            aria-label={open ? `${item.label} alt menüsünü kapat` : `${item.label} alt menüsünü aç`}
            onClick={() => (open ? onClose() : onOpen())}
            onFocus={onOpen}
          >
            <Chevron className={open ? "rotate-180" : ""} />
          </button>
        ) : null}
      </div>
      {children.length && open ? (
        <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-4">
          <SubmenuPanel label={item.label} items={children} />
        </div>
      ) : null}
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-3 w-3 transition duration-200 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M2.4 4.4 6 8l3.6-3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "text-brand" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" data-theme="brand" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7.5 3.8h2.2l1.2 3-1.6 1a12 12 0 0 0 5.9 5.9l1-1.6 3 1.2v2.2a2 2 0 0 1-2.2 2A16.2 16.2 0 0 1 5.5 6a2 2 0 0 1 2-2.2Z" strokeLinejoin="round" />
    </svg>
  );
}
