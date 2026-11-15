"use client";

import { FormEvent, useState } from "react";

const field = "field mt-1.5 h-12 w-full rounded-xl px-4 text-sm";

export function ContactForm() {
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
      setError("Ad soyad, e-posta ve mesaj gerekli.");
      setSent(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      setSent(false);
      return;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setError(body?.error || "Mesaj gönderilemedi. Tekrar deneyin.");
        return;
      }
      setSent(true);
    } catch {
      setError("Mesaj gönderilemedi. Tekrar deneyin.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-72 flex-col justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Mesaj</p>
        <p className="mt-3 font-display text-2xl font-bold leading-tight text-ink">Mesajınız alındı.</p>
        <p className="mt-3 max-w-[36ch] text-sm leading-6 text-muted">En kısa sürede sizinle iletişime geçeceğiz.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex h-full flex-col">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Bize yazın</p>
      <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink">Projenizi anlatın</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-[12px] font-semibold text-ink">
          Ad Soyad
          <input name="name" aria-label="Ad Soyad" placeholder="Adınız" autoComplete="name" className={field} />
        </label>
        <label className="block text-[12px] font-semibold text-ink">
          E-posta
          <input name="email" type="email" aria-label="E-posta" placeholder="ornek@sirket.com" autoComplete="email" className={field} />
        </label>
      </div>
      <label className="mt-4 block text-[12px] font-semibold text-ink">
        Mesajınız
        <textarea
          name="message"
          aria-label="Mesajınız"
          placeholder="Kısaca projenizden bahsedin"
          rows={5}
          className={`${field} h-auto resize-y py-3 leading-6`}
        />
      </label>
      {error ? <p className="mt-3 text-sm text-brand">{error}</p> : null}
      <button type="submit" disabled={sending} className="mt-5 h-12 rounded-full bg-brand text-sm font-semibold text-white transition hover:bg-brand-bar disabled:opacity-60">
        {sending ? "Gönderiliyor" : "Gönder"}
      </button>
    </form>
  );
}
