"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";
import { publicPhones, telHref, type ContactInfo } from "@/lib/contact";
import { socialIcon, type SocialConfig } from "@/lib/social";

const links = [
  { href: "/#anasayfa", label: "Anasayfa" },
  { href: "/#kurumsal", label: "Kurumsal" },
  { href: "/#faaliyet", label: "Faaliyet Alanları" },
  { href: "/#kariyer", label: "Kariyer" },
  { href: "/#iletisim", label: "İletişim" },
];

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
            <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor" aria-hidden>
              <path d={icon.path} />
            </svg>
          </a>
        );
      })}
    </div>
  );
}

export function Header({ contact, social }: { contact: ContactInfo; social: SocialConfig }) {
  const [open, setOpen] = useState(false);
  const call = publicPhones(contact)[0];

  return (
    <header id="anasayfa" className="bg-white">
      <div className="bg-brand-bar text-white">
        <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-end px-5 sm:px-8">
          <Social social={social} />
        </div>
      </div>
      <div className="border-b border-line">
        <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#2a2a2a] hover:text-brand"
              >
                {link.label}
              </a>
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
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-semibold uppercase tracking-[0.12em]"
            >
              {link.label}
            </a>
          ))}
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7.5 3.8h2.2l1.2 3-1.6 1a12 12 0 0 0 5.9 5.9l1-1.6 3 1.2v2.2a2 2 0 0 1-2.2 2A16.2 16.2 0 0 1 5.5 6a2 2 0 0 1 2-2.2Z" strokeLinejoin="round" />
    </svg>
  );
}
