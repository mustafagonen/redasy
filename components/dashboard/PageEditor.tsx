"use client";

import { useState, type ReactNode } from "react";
import type { PageSection, SitePage } from "@/lib/pages";

export function PageEditor({ initial }: { initial: SitePage }) {
  const [page, setPage] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);

  function patch(next: Partial<SitePage>) {
    setPage((current) => ({ ...current, ...next }));
    setMessage(null);
  }

  function patchSection(id: string, next: Partial<PageSection>) {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section) => (section.id === id ? { ...section, ...next } : section)),
    }));
    setMessage(null);
  }

  function move(index: number, direction: -1 | 1) {
    setPage((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.sections.length) return current;
      const sections = [...current.sections];
      const [row] = sections.splice(index, 1);
      sections.splice(target, 0, row);
      return { ...current, sections };
    });
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage({ tone: "error", text: "Kayıt tamamlanamadı." });
        return;
      }
      if (body?.page) setPage(body.page);
      if (body?.firebase === "ok") {
        setMessage({ tone: "ok", text: "Kaydedildi. Sayfa metni sitede ve Firebase’de güncellendi." });
      } else if (body?.firebase === "denied") {
        setMessage({ tone: "warn", text: "Metin siteye kaydedildi. Firebase yazmayı reddetti." });
      } else {
        setMessage({ tone: "warn", text: "Metin siteye kaydedildi. Firebase yazısı bu sefer tamamlanamadı." });
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
            <a href="/dashboard/sayfalar" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">
              Sayfalar
            </a>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">{page.title || "Sayfa"}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/${page.slug}`} className="text-sm font-semibold text-ink hover:text-brand">
              Sayfayı gör
            </a>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-bar disabled:opacity-60"
            >
              {saving ? "Kaydediliyor" : "Kaydet"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <p className="text-sm leading-6 text-muted">
          Düzen sabit. Buradan yalnızca başlık, giriş metni ve bölümler değişir. Boş başlıklı bölümler kayda girmez.
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

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
          <label className="block text-[12px] font-semibold text-ink">
            Sayfa başlığı
            <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={page.title} onChange={(event) => patch({ title: event.target.value })} />
          </label>
          <label className="mt-4 block text-[12px] font-semibold text-ink">
            Giriş metni
            <textarea className="field mt-1.5 min-h-28 w-full rounded-xl px-4 py-3 text-sm leading-6" value={page.lead} onChange={(event) => patch({ lead: event.target.value })} />
          </label>
        </section>

        <div className="mt-5 space-y-3">
          {page.sections.map((section, index) => (
            <section key={section.id} className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-ink">{section.title.trim() || "Yeni bölüm"}</h2>
                <div className="flex flex-wrap gap-2">
                  <Mini onClick={() => move(index, -1)} disabled={index === 0}>
                    Yukarı
                  </Mini>
                  <Mini onClick={() => move(index, 1)} disabled={index === page.sections.length - 1}>
                    Aşağı
                  </Mini>
                  <Mini onClick={() => patch({ sections: page.sections.filter((item) => item.id !== section.id) })}>Kaldır</Mini>
                </div>
              </div>
              <label className="mt-4 block text-[12px] font-semibold text-ink">
                Bölüm başlığı
                <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={section.title} onChange={(event) => patchSection(section.id, { title: event.target.value })} />
              </label>
              <label className="mt-4 block text-[12px] font-semibold text-ink">
                Metin
                <textarea className="field mt-1.5 min-h-32 w-full rounded-xl px-4 py-3 text-sm leading-6" value={section.text} onChange={(event) => patchSection(section.id, { text: event.target.value })} />
              </label>
            </section>
          ))}
        </div>

        <button
          type="button"
          disabled={page.sections.length >= 8}
          onClick={() => patch({ sections: [...page.sections, { id: crypto.randomUUID(), title: "", text: "" }] })}
          className="mt-4 h-11 rounded-full border border-[#d5d5d8] bg-white px-5 text-sm font-semibold text-ink hover:border-brand/45 disabled:opacity-50"
        >
          Bölüm ekle
        </button>
      </div>
    </div>
  );
}

function Mini({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-8 rounded-full border border-[#d5d5d8] bg-white px-3 text-[12px] font-semibold text-ink hover:border-brand/45 disabled:opacity-40"
    >
      {children}
    </button>
  );
}
