"use client";

import { useRef, useState } from "react";
import { type HeroCopy, type HeroPanelContent, type HeroPanelId } from "@/lib/heroBand";

const languages: { id: keyof Pick<HeroPanelContent, "tr" | "en" | "ar">; code: string; label: string }[] = [
  { id: "tr", code: "TR", label: "Türkçe" },
  { id: "en", code: "EN", label: "English" },
  { id: "ar", code: "AR", label: "العربية" },
];

export function HeroBandEditor({ initialPanels }: { initialPanels: HeroPanelContent[] }) {
  const [panels, setPanels] = useState(initialPanels);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<HeroPanelId | null>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);
  const files = useRef<Record<string, HTMLInputElement | null>>({});

  function update(id: HeroPanelContent["id"], lang: "tr" | "en" | "ar", field: keyof HeroCopy, value: string) {
    setPanels((current) =>
      current.map((panel) => (panel.id === id ? { ...panel, [lang]: { ...panel[lang], [field]: value } } : panel)),
    );
    setMessage(null);
  }

  async function replaceImage(id: HeroPanelId, file: File | undefined) {
    if (!file) return;
    setUploading(id);
    setMessage(null);
    try {
      const body = new FormData();
      body.set("id", id);
      body.set("file", file);
      const response = await fetch("/api/hero-band/image", { method: "POST", body });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.image) {
        setMessage({ tone: "error", text: payload?.error || "Görsel değiştirilemedi." });
        return;
      }
      setPanels((current) => current.map((panel) => (panel.id === id ? { ...panel, image: payload.image } : panel)));
      setMessage({
        tone: payload.firebase === "ok" ? "ok" : "warn",
        text: "Görsel değişti. Önceki dosya sistemden silindi. Sitede renksiz hali CSS filtresiyle oluşur.",
      });
    } catch {
      setMessage({ tone: "error", text: "Görsel yüklenemedi." });
    } finally {
      setUploading(null);
    }
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/hero-band", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ panels }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage({ tone: "error", text: body?.error || "Kayıt tamamlanamadı." });
        return;
      }
      if (body?.firebase === "ok") {
        setMessage({ tone: "ok", text: "Kaydedildi. Gri bant Firebase’e yazıldı. Sitede Türkçe metinler güncellendi." });
      } else if (body?.firebase === "denied") {
        setMessage({
          tone: "warn",
          text: "Metinler siteye kaydedildi. Firebase yazmayı reddetti; kural açılınca aynı kayıt buluta da gider.",
        });
      } else {
        setMessage({ tone: "warn", text: "Metinler siteye kaydedildi. Firebase yazısı bu sefer tamamlanamadı." });
      }
    } catch {
      setMessage({ tone: "error", text: "Bağlantı kurulamadı. Kayıt gönderilemedi." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">İçerik</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Gri bant</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm font-semibold text-muted lg:hidden">
              Site
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

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <p className="max-w-3xl text-sm leading-6 text-muted">
          Dört görsel ve altlarındaki gri şerit buradan yönetilir. Yeni görsel yüklendiğinde eskisi silinir.
          Sitede görsel dururken CSS filtresiyle renksizdir, üzerine gelince kendi rengine döner. Türkçe metin sitede görünür.
        </p>

        {message ? (
          <p
            role="status"
            className={`mt-4 rounded-xl px-4 py-3 text-sm leading-6 ${
              message.tone === "ok"
                ? "bg-[#eef6ef] text-[#1d5a32]"
                : message.tone === "warn"
                  ? "bg-[#fbf4e8] text-[#7a5414]"
                  : "bg-[#fdecec] text-brand"
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#e4e4e6] bg-[#ececee]" aria-label="Türkçe önizleme">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {panels.map((panel, index) => (
              <div
                key={panel.id}
                className={`relative min-w-0 px-4 py-4 ${index > 0 ? "lg:pl-5" : ""} ${index % 2 === 1 ? "border-l border-[#c4c4c6]/80 lg:border-l" : ""} ${index > 1 ? "border-t border-[#c4c4c6]/80 lg:border-t-0" : ""} ${index > 0 ? "lg:before:absolute lg:before:inset-y-3 lg:before:left-0 lg:before:w-px lg:before:bg-[#c4c4c6]" : ""}`}
              >
                <p className="truncate text-[13px] font-bold uppercase tracking-[0.01em] text-ink">{panel.tr.title || "Başlık"}</p>
                <p className="mt-1 truncate text-[12px] text-muted">{panel.tr.text || "Açıklama"}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 space-y-5">
          {panels.map((panel, index) => {
            const titleLong = panel.tr.title.trim().length > 34;
            const textLong = panel.tr.text.trim().length > 52;
            return (
              <article key={panel.id} className="rounded-2xl border border-[#ececec] bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)] sm:p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <img src={panel.image} alt="" className="h-16 w-24 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold tracking-[0.08em] text-brand">0{index + 1}</p>
                    <h2 className="truncate font-display text-lg font-bold text-ink">{panel.tr.title || "Başlıksız görsel"}</h2>
                  </div>
                  <input
                    ref={(node) => {
                      files.current[panel.id] = node;
                    }}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      void replaceImage(panel.id, file);
                    }}
                  />
                  <button
                    type="button"
                    disabled={uploading === panel.id}
                    onClick={() => files.current[panel.id]?.click()}
                    className="rounded-full border border-[#e4e4e6] px-4 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand disabled:opacity-60"
                  >
                    {uploading === panel.id ? "Yükleniyor" : "Görseli değiştir"}
                  </button>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  {languages.map((language) => {
                    const value = panel[language.id];
                    const rtl = language.id === "ar";
                    const empty = !value.title.trim() || !value.text.trim();
                    return (
                      <div key={language.id} className="rounded-xl bg-[#f6f6f7] p-4" dir={rtl ? "rtl" : "ltr"}>
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink">{language.label}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${empty ? "bg-[#fbf4e8] text-[#7a5414]" : "bg-white text-brand"}`}>
                            {empty ? "Eksik" : language.code}
                          </span>
                        </div>
                        <label className="block text-[12px] font-semibold text-muted" htmlFor={`${panel.id}-${language.id}-title`}>
                          Başlık
                          <input
                            id={`${panel.id}-${language.id}-title`}
                            value={value.title}
                            onChange={(event) => update(panel.id, language.id, "title", event.target.value)}
                            className="field mt-1 w-full rounded-xl px-3 py-2.5 text-sm font-medium"
                            style={rtl ? { fontFamily: "var(--font-arabic), sans-serif" } : undefined}
                          />
                        </label>
                        <label className="mt-3 block text-[12px] font-semibold text-muted" htmlFor={`${panel.id}-${language.id}-text`}>
                          Açıklama
                          <textarea
                            id={`${panel.id}-${language.id}-text`}
                            value={value.text}
                            rows={3}
                            onChange={(event) => update(panel.id, language.id, "text", event.target.value)}
                            className="field mt-1 w-full resize-y rounded-xl px-3 py-2.5 text-sm leading-6"
                            style={rtl ? { fontFamily: "var(--font-arabic), sans-serif" } : undefined}
                          />
                        </label>
                        {language.id === "tr" && (titleLong || textLong) ? (
                          <p className="mt-2 text-[12px] leading-5 text-[#7a5414]">Masaüstünde tek satıra sığmayabilir.</p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
