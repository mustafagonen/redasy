"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { email, phone } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const quick = [
    { href: "/", key: "home" },
    { href: "/hakkimizda", key: "about" },
    { href: "/faaliyet-alanlari", key: "areas" },
    { href: "/faaliyet-alanlari/kirma-eleme-yikama", key: "products" },
    { href: "/projeler", key: "projects" },
    { href: "/iletisim", key: "contact" },
  ];

  return (
    <footer className="bg-[#1b2024] text-white print:hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">{t("footerBlurb")}</p>
          <div className="mt-5 flex gap-3 text-white/80">
            {[
              { label: "in", path: "M6 9h3v9H6zM7.5 4.5A1.5 1.5 0 1 1 7.5 7.5 1.5 1.5 0 0 1 7.5 4.5zM11 9h3v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.6V18h-3v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V18h-3z" },
              { label: "ig", path: "M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm8.2 2.2h-1.6l-.3 1.6a3.4 3.4 0 1 0 1.7 1.6l.2-1.6zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z" },
              { label: "f", path: "M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.2l.8-3H13V9c0-.6.4-1 1-1z" },
              { label: "yt", path: "M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM10 15.5v-6.6l5.2 3.3z" },
            ].map((icon) => (
              <a key={icon.label} href="#sosyal" aria-label={icon.label} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 hover:border-[#d75a23] hover:text-[#d75a23]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("contactTitle")}</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/75">
            <li>
              <span className="text-white/90">{t("addressLabel")}</span>
              <br />
              {t("address")}
            </li>
            <li>
              {t("phoneLabel")}{" "}
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-[#d75a23]">
                {phone}
              </a>
            </li>
            <li>
              {t("mailLabel")}{" "}
              <a href={`mailto:${email}`} className="hover:text-[#d75a23]">
                {email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("quick")}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {quick.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("write")}</h3>
          {sent ? (
            <p className="mt-4 text-sm leading-6 text-white/75">{t("sent")}</p>
          ) : (
            <form
              className="mt-4 grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const value = String(data.get("identity") || "");
                if (!value.trim()) return;
                setSent(true);
              }}
            >
              <input name="identity" required placeholder={t("namePh")} className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm" />
              <textarea name="message" required rows={3} placeholder={t("msgPh")} className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm" />
              <button type="submit" className="justify-self-end rounded-full bg-[#d75a23] px-5 py-2.5 text-sm font-semibold hover:bg-[#c24e1c]">
                {t("send")} →
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>{t("rights")}</p>
          <p className="flex gap-4">
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
