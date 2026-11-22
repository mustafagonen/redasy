"use client";

import { useState } from "react";
import { AtaturkMark } from "@/components/AtaturkMark";
import { NoticeTicker } from "@/components/NoticeTicker";
import type { Notice, NoticeCopy } from "@/lib/notice";

const languages: { id: keyof NoticeCopy; code: string; label: string }[] = [
  { id: "tr", code: "TR", label: "Türkçe" },
  { id: "en", code: "EN", label: "English" },
  { id: "ar", code: "AR", label: "العربية" },
];

export function NoticeEditor({ initial }: { initial: Notice }) {
  const [notice, setNotice] = useState(initial);
  const [lang, setLang] = useState<keyof NoticeCopy>("tr");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);

  function patch(next: Partial<Notice>) {
    setNotice((current) => ({ ...current, ...next }));
    setMessage(null);
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/notice", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notice }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage({ tone: "error", text: "Kayıt tamamlanamadı." });
        return;
      }
      if (body?.notice) setNotice(body.notice);
      if (body?.firebase === "ok") setMessage({ tone: "ok", text: "Kaydedildi." });
      else if (body?.firebase === "denied") setMessage({ tone: "warn", text: "Firebase yazmayı reddetti. Kayıt gitmedi." });
      else setMessage({ tone: "warn", text: "Firebase yazısı tamamlanamadı. Kayıt gitmedi." });
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
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Özel uyarı</h1>
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
          Kırmızı üst şeridin ortasında beyaz yazı olarak kayar. Sosyal ikonlar solda, dil seçimi sağda kalır.
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

        <div className="mt-6 overflow-hidden rounded-2xl bg-brand-bar px-5 py-4 text-on-brand shadow-[0_10px_30px_rgba(85,5,6,0.16)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Üst şerit önizleme</p>
          <div className="mt-3 flex h-9 items-center gap-4">
            <NoticeTicker notice={notice} locale={lang} />
          </div>
        </div>

        <section className="mt-5 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
          <label className="flex items-center justify-between gap-4">
            <span>
              <span className="block text-sm font-bold text-ink">Şeritte göster</span>
              <span className="mt-1 block text-sm text-muted">Kapalıyken yalnızca sosyal ikonlar ve dil seçimi kalır.</span>
            </span>
            <input type="checkbox" className="h-5 w-5 accent-brand" checked={notice.visible} onChange={(event) => patch({ visible: event.target.checked })} />
          </label>
          <label className="mt-5 flex items-center justify-between gap-4 border-t border-[#ececee] pt-5">
            <span className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
                <AtaturkMark className="h-7 w-7" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">Atatürk silüeti</span>
                <span className="mt-1 block text-sm text-muted">Yazının başında beyaz silüet olarak durur.</span>
              </span>
            </span>
            <input type="checkbox" className="h-5 w-5 accent-brand" checked={notice.mark} onChange={(event) => patch({ mark: event.target.checked })} />
          </label>
        </section>

        <section className="mt-5 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
          <div className="flex gap-2">
            {languages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLang(item.id)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${lang === item.id ? "bg-brand text-white" : "bg-[#ececee] text-ink"}`}
              >
                {item.code}
              </button>
            ))}
          </div>
          <label className="mt-4 block">
            <span className="text-[12px] font-semibold text-ink">{languages.find((item) => item.id === lang)?.label} yazı</span>
            <textarea
              dir={lang === "ar" ? "rtl" : "ltr"}
              value={notice.text[lang]}
              maxLength={180}
              rows={3}
              onChange={(event) => patch({ text: { ...notice.text, [lang]: event.target.value } })}
              className="field mt-2 w-full rounded-xl px-3 py-3 text-sm leading-6"
              placeholder="Şeritte kayacak cümle"
            />
          </label>
          <p className="mt-2 text-[12px] text-muted">Seçili dilin metni sitede o dilde kayar. Boşsa Türkçe metin kullanılır.</p>
        </section>
      </div>
    </div>
  );
}
