"use client";

import { useState } from "react";
import type { StageCopy, StageStep } from "@/lib/stageSteps";

const languages: { id: "tr" | "en" | "ar"; code: string; label: string }[] = [
  { id: "tr", code: "TR", label: "Türkçe" },
  { id: "en", code: "EN", label: "English" },
  { id: "ar", code: "AR", label: "العربية" },
];

export function StageStepsEditor({ initialSteps }: { initialSteps: StageStep[] }) {
  const [steps, setSteps] = useState(initialSteps);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);

  function update(id: string, lang: "tr" | "en" | "ar", field: keyof StageCopy, value: string) {
    setSteps((current) => current.map((step) => (step.id === id ? { ...step, [lang]: { ...step[lang], [field]: value } } : step)));
    setMessage(null);
  }

  function move(index: number, direction: -1 | 1) {
    setSteps((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [row] = next.splice(index, 1);
      next.splice(target, 0, row);
      return next;
    });
    setMessage(null);
  }

  function add() {
    if (steps.length >= 6) return;
    setSteps((current) => [
      ...current,
      { id: crypto.randomUUID(), tr: { title: "", text: "" }, en: { title: "", text: "" }, ar: { title: "", text: "" } },
    ]);
    setMessage(null);
  }

  function remove(id: string) {
    setSteps((current) => (current.length === 1 ? current : current.filter((step) => step.id !== id)));
    setMessage(null);
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/stage-steps", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steps }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage({ tone: "error", text: body?.error || "Kayıt tamamlanamadı." });
        return;
      }
      if (body?.steps) setSteps(body.steps);
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

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">İçerik</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Aşamalar</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={add}
              disabled={steps.length >= 6}
              className="rounded-full border border-[#e4e4e6] px-4 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand disabled:opacity-50"
            >
              Aşama ekle
            </button>
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
          Gri şeridin altındaki açık bant. Aşamalar buradaki sırayla görünür. Türkçe metin sitede kullanılır; İngilizce ve Arapça bu ekranda tutulur.
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

        <div className="mt-6 space-y-5">
          {steps.map((step, index) => (
            <article key={step.id} className="rounded-2xl border border-[#ececec] bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] font-bold tracking-[0.08em] text-brand">{String(index + 1).padStart(2, "0")}</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="rounded-full border border-[#e4e4e6] px-3 py-1.5 text-xs font-semibold disabled:opacity-40">
                    Yukarı
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === steps.length - 1} className="rounded-full border border-[#e4e4e6] px-3 py-1.5 text-xs font-semibold disabled:opacity-40">
                    Aşağı
                  </button>
                  <button type="button" onClick={() => remove(step.id)} disabled={steps.length === 1} className="rounded-full border border-[#e4e4e6] px-3 py-1.5 text-xs font-semibold text-brand disabled:opacity-40">
                    Sil
                  </button>
                </div>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {languages.map((language) => {
                  const value = step[language.id];
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
                      <label className="block text-[12px] font-semibold text-muted" htmlFor={`${step.id}-${language.id}-title`}>
                        Başlık
                        <input
                          id={`${step.id}-${language.id}-title`}
                          value={value.title}
                          onChange={(event) => update(step.id, language.id, "title", event.target.value)}
                          className="field mt-1 w-full rounded-xl px-3 py-2.5 text-sm font-medium"
                          style={rtl ? { fontFamily: "var(--font-arabic), sans-serif" } : undefined}
                        />
                      </label>
                      <label className="mt-3 block text-[12px] font-semibold text-muted" htmlFor={`${step.id}-${language.id}-text`}>
                        Metin
                        <textarea
                          id={`${step.id}-${language.id}-text`}
                          value={value.text}
                          rows={3}
                          onChange={(event) => update(step.id, language.id, "text", event.target.value)}
                          className="field mt-1 w-full resize-y rounded-xl px-3 py-2.5 text-sm leading-6"
                          style={rtl ? { fontFamily: "var(--font-arabic), sans-serif" } : undefined}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
