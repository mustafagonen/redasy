"use client";

import { useState } from "react";
import type { ContactInfo, ContactPhone } from "@/lib/contact";

export function ContactEditor({ initial }: { initial: ContactInfo }) {
  const [contact, setContact] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);

  function updatePhone(id: string, patch: Partial<ContactPhone>) {
    setContact((current) => ({
      ...current,
      phones: current.phones.map((phone) => {
        if (patch.whatsapp) return { ...phone, whatsapp: phone.id === id };
        if (phone.id !== id) return phone;
        return { ...phone, ...patch };
      }),
    }));
    setMessage(null);
  }

  function addPhone() {
    setContact((current) => ({
      ...current,
      phones: [...current.phones, { id: crypto.randomUUID(), label: `Telefon ${current.phones.length + 1}`, number: "", whatsapp: false }],
    }));
  }

  function removePhone(id: string) {
    setContact((current) => ({
      ...current,
      phones: current.phones.filter((phone) => phone.id !== id),
    }));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage({ tone: "error", text: "Kayıt tamamlanamadı." });
        return;
      }
      if (body?.contact) setContact(body.contact);
      if (body?.firebase === "ok") {
        setMessage({ tone: "ok", text: "Kaydedildi. İletişim bilgileri sitede ve Firebase’de güncellendi." });
      } else if (body?.firebase === "denied") {
        setMessage({ tone: "warn", text: "Bilgiler siteye kaydedildi. Firebase yazmayı reddetti." });
      } else {
        setMessage({ tone: "warn", text: "Bilgiler siteye kaydedildi. Firebase yazısı bu sefer tamamlanamadı." });
      }
    } catch {
      setMessage({ tone: "error", text: "Bağlantı kurulamadı." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Site</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">İletişim bilgileri</h1>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-bar disabled:opacity-60"
          >
            {saving ? "Kaydediliyor" : "Kaydet"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <p className="text-sm leading-6 text-muted">
          İşaretsiz numaralar sitede Telefon 1, Telefon 2 diye sıralanır. WhatsApp işareti olan numara iletişimde görünmez; sağ altta Bize ulaşın düğmesinde Telefon olarak durur.
        </p>
        {message ? (
          <p
            role="status"
            className={`mt-4 rounded-xl px-4 py-3 text-sm leading-6 ${
              message.tone === "ok" ? "bg-[#eef6ef] text-[#1d5a32]" : message.tone === "warn" ? "bg-[#fbf4e8] text-[#7a5414]" : "bg-[#fdecec] text-brand"
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <div className="mt-6 space-y-4 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)] sm:p-6">
          <label className="block text-[12px] font-semibold text-ink">
            Adres
            <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={contact.address} onChange={(event) => setContact({ ...contact, address: event.target.value })} />
          </label>
          <label className="block text-[12px] font-semibold text-ink">
            E-posta
            <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} />
          </label>
        </div>

        <div className="mt-5 space-y-3">
          {contact.phones.map((phone, index) => (
            <div key={phone.id} className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-ink">Telefon {index + 1}</p>
                {contact.phones.length > 1 ? (
                  <button type="button" onClick={() => removePhone(phone.id)} className="text-[12px] font-semibold text-muted hover:text-brand">
                    Kaldır
                  </button>
                ) : null}
              </div>
              <label className="mt-3 block text-[12px] font-semibold text-ink">
                Numara
                <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={phone.number} onChange={(event) => updatePhone(phone.id, { number: event.target.value })} />
              </label>
              <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
                <input type="checkbox" checked={phone.whatsapp} onChange={(event) => updatePhone(phone.id, { whatsapp: event.target.checked })} className="h-4 w-4 accent-brand" />
                WhatsApp bu numaraya bağlı
              </label>
            </div>
          ))}
        </div>

        <button type="button" onClick={addPhone} className="mt-4 h-11 rounded-full bg-[#ececee] px-5 text-sm font-semibold text-ink hover:bg-[#e4e4e6]">
          Numara ekle
        </button>
      </div>
    </div>
  );
}
