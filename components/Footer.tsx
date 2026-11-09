"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { email, phones, whatsappNumber } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, lang } = useI18n();

  const quick = [
    { href: "/", key: "home" },
    { href: "/hakkimizda", key: "about" },
    { href: "/faaliyet-alanlari", key: "areas" },
    { href: "/faaliyet-alanlari/kirma-eleme-yikama", key: "products" },
    { href: "/projeler", key: "projects" },
    { href: "/iletisim", key: "contact" },
  ];

  return (
    <footer className="bg-deep text-white print:hidden">
      <div className="h-[3px] bg-burgundy" />
      <div className="border-b border-white/10">
        <ul className="mx-auto grid max-w-[1240px] sm:grid-cols-3">
          {phones.map((item) => (
            <li key={item.tel} className="border-b border-white/10 last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0">
              <a
                href={item.whatsapp ? `https://wa.me/${whatsappNumber}` : `tel:${item.tel}`}
                className="group flex flex-col gap-1.5 px-5 py-7 hover:bg-white/[0.03] lg:px-8"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#e7c5c6] uppercase">{item.role[lang]}</span>
                <span className="text-[22px] font-semibold tracking-tight text-white group-hover:text-[#e7c5c6] sm:text-[24px]">
                  {item.display}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <span className="inline-flex bg-white px-3 py-2">
            <Logo />
          </span>
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/65">{t("footerBlurb")}</p>
          <div className="mt-6 flex gap-2 text-white/75">
            {[
              { label: "LinkedIn", path: "M6 9h3v9H6zM7.5 4.5A1.5 1.5 0 1 1 7.5 7.5 1.5 1.5 0 0 1 7.5 4.5zM11 9h3v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.6V18h-3v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V18h-3z" },
              { label: "Instagram", path: "M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm8.2 2.2h-1.6l-.3 1.6a3.4 3.4 0 1 0 1.7 1.6l.2-1.6zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z" },
              { label: "Facebook", path: "M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.2l.8-3H13V9c0-.6.4-1 1-1z" },
              { label: "YouTube", path: "M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM10 15.5v-6.6l5.2 3.3z" },
            ].map((icon) => (
              <a
                key={icon.label}
                href="#sosyal"
                aria-label={icon.label}
                className="grid h-9 w-9 place-items-center border border-white/15 hover:border-[#e7c5c6] hover:text-[#e7c5c6]"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">{t("contactTitle")}</h3>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-white/75">
            <li>
              <span className="text-white/45">{t("addressLabel")}</span>
              <br />
              {t("address")}
            </li>
            <li>
              <span className="text-white/45">{t("mailLabel")}</span>
              <br />
              <a href={`mailto:${email}`} className="hover:text-[#e7c5c6]">
                {email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">{t("quick")}</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-white/75">
            {quick.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>{t("rights")}</p>
          <p className="flex gap-5">
            <Link href="/gizlilik" className="hover:text-white">
              {t("privacy")}
            </Link>
            <Link href="/kullanim-kosullari" className="hover:text-white">
              {t("terms")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
