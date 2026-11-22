"use client";

import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/messages";
import { FormEvent, useState } from "react";

const field = "field mt-1.5 h-12 w-full rounded-xl px-4 text-sm";

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = ui(locale);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setError(copy.formRequired);
      setSent(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.formEmail);
      setSent(false);
      return;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setError(body?.error || copy.formFail);
        return;
      }
      setSent(true);
    } catch {
      setError(copy.formFail);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-72 flex-col justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">{copy.sentKicker}</p>
        <p className="mt-3 font-display text-2xl font-bold leading-tight text-ink">{copy.sentTitle}</p>
        <p className="mt-3 max-w-[36ch] text-sm leading-6 text-muted">{copy.sentBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex h-full flex-col">
      <p data-theme="soft" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">{copy.write}</p>
      <h3 data-theme="ink" className="mt-2 font-display text-2xl font-bold leading-tight text-ink">{copy.tell}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-[12px] font-semibold text-ink">
          {copy.name}
          <input name="name" data-theme="field" aria-label={copy.name} placeholder={copy.nameHint} autoComplete="name" className={field} />
        </label>
        <label className="block text-[12px] font-semibold text-ink">
          {copy.email}
          <input name="email" data-theme="field" type="email" aria-label={copy.email} placeholder={copy.emailHint} autoComplete="email" dir="ltr" className={field} />
        </label>
      </div>
      <label className="mt-4 block text-[12px] font-semibold text-ink">
        {copy.message}
        <textarea
          name="message"
          data-theme="field"
          aria-label={copy.message}
          placeholder={copy.messageHint}
          rows={5}
          className={`${field} h-auto resize-y py-3 leading-6`}
        />
      </label>
      {error ? <p className="mt-3 text-sm text-brand">{error}</p> : null}
      <button type="submit" data-theme="brand" disabled={sending} className="mt-5 h-12 w-full rounded-full bg-brand px-8 text-sm font-semibold text-on-brand transition hover:bg-brand-bar disabled:opacity-60 sm:w-fit">
        {sending ? copy.sending : copy.send}
      </button>
    </form>
  );
}
