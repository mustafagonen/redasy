"use client";

import Link from "next/link";
import { useState } from "react";
import { email, phone } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="bg-[#12161b] text-white">
      <section className="bg-[#191e24]">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <p className="text-sm text-white/55">
            <Link href="/">{t("home")}</Link> / {t("contact")}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{t("contact")}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2 lg:px-6">
        <div className="space-y-4 text-sm leading-7 text-white/75">
          <p>
            <span className="text-white">{t("addressLabel")}</span> {t("address")}
          </p>
          <p>
            {t("phoneLabel")} <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
          </p>
          <p>
            {t("mailLabel")} <a href={`mailto:${email}`}>{email}</a>
          </p>
          <img src="/images/map.jpg" alt="" className="mt-4 w-full rounded-[24px] object-cover" />
        </div>
        {sent ? (
          <p className="rounded-2xl border border-white/10 p-6">{t("sent")}</p>
        ) : (
          <form
            className="grid gap-3 rounded-2xl border border-white/10 p-6"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const name = String(data.get("name") || "").trim();
              const mail = String(data.get("email") || "").trim();
              if (!name || !mail.includes("@")) {
                setError(t("required"));
                return;
              }
              setError("");
              setSent(true);
            }}
          >
            <input name="name" placeholder={t("yourName")} className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm" />
            <input name="email" placeholder={t("email")} className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm" />
            <input name="phone" placeholder={t("phone")} className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm" />
            <textarea name="message" rows={5} placeholder={t("message")} className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm" />
            {error ? <p className="text-sm text-[#ffb089]">{error}</p> : null}
            <button type="submit" className="justify-self-start rounded-full bg-[#d75a23] px-5 py-3 text-sm font-semibold">
              {t("send")} →
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
