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
            className="text-white/95 hover:text-white"
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

export function Header({ contact, social, nav }: { contact: ContactInfo; social: SocialConfig; nav: NavConfig }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const call = publicPhones(contact)[0];
  const items = nav.items.filter((item) => item.visible && item.label);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header id="anasayfa" className="relative z-30 bg-white">
      <div className="bg-brand-bar text-white">
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
            <a href={telHref(call.number)} className="hidden items-center gap-2 text-sm font-semibold text-[#222] lg:flex">
              <PhoneIcon />
              {call.number}
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-4 flex-col gap-1">
              <span className="h-px bg-ink" />
              <span className="h-px bg-ink" />
              <span className="h-px bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-b border-line bg-white px-5 py-4 lg:hidden" aria-label="Mobil menü">
          {items.map((item) => {
            const children = visibleChildren(item);
            const expanded = mobileMenu === item.id && children.length > 0;
            return (
              <div key={item.id} className="border-b border-line/80 last:border-b-0">
                <div className="flex items-center">
                  {item.href ? (
                    <a href={item.href} onClick={() => setOpen(false)} className="block flex-1 py-3 text-sm font-semibold uppercase tracking-[0.12em]">
                      {item.label}
                    </a>
                  ) : (
                    <button type="button" className="block flex-1 py-3 text-left text-sm font-semibold uppercase tracking-[0.12em]" onClick={() => setMobileMenu(expanded ? null : item.id)}>
                      {item.label}
                    </button>
                  )}
                  {children.length ? (
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center text-brand"
                      aria-expanded={expanded}
                      aria-label={expanded ? `${item.label} alt menüsünü kapat` : `${item.label} alt menüsünü aç`}
                      onClick={() => setMobileMenu(expanded ? null : item.id)}
                    >
                      <Chevron className={expanded ? "rotate-180" : ""} />
                    </button>
                  ) : null}
                </div>
                {expanded ? (
                  <div className="mb-3 ml-1 border-l border-brand/25 pl-3">
                    {children.map((child) => (
                      <a key={child.id} href={child.href} onClick={() => setOpen(false)} className="block py-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#3a3a3a]">
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          {call ? (
            <a href={telHref(call.number)} className="mt-2 flex items-center gap-2 py-2 text-sm font-semibold">
              <PhoneIcon />
              {call.number}
            </a>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}

function DesktopItem({ item, open, onOpen, onClose }: { item: NavItem; open: boolean; onOpen: () => void; onClose: () => void }) {
  const children = visibleChildren(item);
  const linkClass = `text-[12.5px] font-semibold uppercase tracking-[0.14em] ${open ? "text-brand" : "text-[#2a2a2a] hover:text-brand"}`;

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
          <a href={item.href} className={linkClass} onFocus={children.length ? onOpen : undefined}>
            {item.label}
          </a>
        ) : (
          <button type="button" className={linkClass} aria-expanded={open} onClick={() => (open ? onClose() : onOpen())}>
            {item.label}
          </button>
        )}
        {children.length ? (
          <button
            type="button"
            className={`grid h-6 w-6 place-items-center ${open ? "text-brand" : "text-[#2a2a2a]"}`}
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7.5 3.8h2.2l1.2 3-1.6 1a12 12 0 0 0 5.9 5.9l1-1.6 3 1.2v2.2a2 2 0 0 1-2.2 2A16.2 16.2 0 0 1 5.5 6a2 2 0 0 1 2-2.2Z" strokeLinejoin="round" />
    </svg>
  );
}
