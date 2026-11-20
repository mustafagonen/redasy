"use client";

import { useState, type ReactNode } from "react";
import { socialCatalog, type SocialConfig, type SocialId } from "@/lib/social";

export function SocialEditor({ initial }: { initial: SocialConfig }) {
  const [social, setSocial] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);

  function update(id: SocialId, patch: Partial<SocialConfig["links"][number]>) {
    setSocial((current) => ({
      links: current.links.map((link) => (link.id === id ? { ...link, ...patch } : link)),
    }));
    setMessage(null);
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ social }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage({ tone: "error", text: "Kayıt tamamlanamadı." });
        return;
      }
      if (body?.social) setSocial(body.social);
      if (body?.firebase === "ok") {
        setMessage({ tone: "ok", text: "Kaydedildi." });
      } else if (body?.firebase === "denied") {
        setMessage({ tone: "warn", text: "Firebase yazmayı reddetti. Kayıt gitmedi." });
      } else {
        setMessage({ tone: "warn", text: "Firebase yazısı tamamlanamadı. Kayıt gitmedi." });
      }
    } catch {
      setMessage({ tone: "error", text: "Bağlantı kurulamadı." });
    } finally {
      setSaving(false);
    }
  }

  const preview = social.links.filter((link) => link.visible && link.href);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Site</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Sosyal medya</h1>
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
          Üst banttaki ikonlardan hangileri görünsün, hangi adrese gitsin ve link mevcut sayfada mı yoksa yeni sayfada mı açılsın buradan belirlenir.
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

        <div className="mt-6 overflow-hidden rounded-2xl bg-brand px-5 py-4 text-white shadow-[0_10px_30px_rgba(85,5,6,0.16)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Üst bant önizleme</p>
          <div className="mt-3 flex min-h-6 items-center justify-end gap-3.5">
            {preview.length ? (
              preview.map((link) => {
                const icon = socialCatalog.find((item) => item.id === link.id);
                if (!icon) return null;
                return (
                  <span key={link.id} className="text-white" title={icon.label}>
                    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor" aria-hidden>
                      <path d={icon.path} />
                    </svg>
                  </span>
                );
              })
            ) : (
              <span className="text-sm text-white/70">Görünecek ikon yok.</span>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {social.links.map((link) => {
            const icon = socialCatalog.find((item) => item.id === link.id);
            if (!icon) return null;
            return (
              <section key={link.id} className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d={icon.path} />
                    </svg>
                  </span>
                  <h2 className="text-sm font-bold text-ink">{icon.label}</h2>
                </div>

                <div className="mt-4">
                  <p className="text-[12px] font-semibold text-ink">Görünürlük</p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <Choice pressed={link.visible} onClick={() => update(link.id, { visible: true })}>
                      Sitede görünür
                    </Choice>
                    <Choice pressed={!link.visible} onClick={() => update(link.id, { visible: false })}>
                      Gizli
                    </Choice>
                  </div>
                </div>

                <label className="mt-4 block text-[12px] font-semibold text-ink">
                  Link
                  <input
                    className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm"
                    value={link.href}
                    placeholder="https://"
                    onChange={(event) => update(link.id, { href: event.target.value })}
                  />
                </label>
                {link.visible && !link.href.trim() ? (
                  <p className="mt-2 text-[12px] leading-5 text-muted">Link girilmezse bu ikon sitede yer almaz.</p>
                ) : null}

                <div className="mt-4">
                  <p className="text-[12px] font-semibold text-ink">Açılış</p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <Choice pressed={!link.newTab} onClick={() => update(link.id, { newTab: false })}>
                      Mevcut sayfada
                    </Choice>
                    <Choice pressed={link.newTab} onClick={() => update(link.id, { newTab: true })}>
                      Yeni sayfada
                    </Choice>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Choice({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`h-10 cursor-pointer rounded-full border px-4 text-sm font-semibold transition ${
        pressed
          ? "border-brand bg-brand text-white shadow-[0_6px_16px_rgba(85,5,6,0.22)]"
          : "border-[#d5d5d8] bg-white text-ink shadow-[0_1px_2px_rgba(26,26,26,0.06)] hover:border-brand/45 hover:bg-[#fafafa]"
      }`}
    >
      {children}
    </button>
  );
}
