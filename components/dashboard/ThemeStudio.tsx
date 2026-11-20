"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { defaultTheme, themeToken, themeTokens, themesEqual, type Theme, type ThemeId } from "@/lib/theme";

const source = "redasy-theme";
const desktopWidth = 1280;

type Anchor = { left: number; top: number; tokens: ThemeId[] };

export function ThemeStudio({ initial }: { initial: Theme }) {
  const [theme, setTheme] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [active, setActive] = useState<ThemeId | null>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const [scale, setScale] = useState(1);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);
  const activeRef = useRef(active);
  themeRef.current = theme;
  activeRef.current = active;

  useLayoutEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const node: HTMLDivElement = pane;
    function measure() {
      if (device !== "desktop") {
        setScale(1);
        return;
      }
      setScale(Math.min(1, node.clientWidth / desktopWidth));
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [device]);

  const dirty = !themesEqual(theme, saved);
  const atDefault = themesEqual(theme, defaultTheme) && themesEqual(saved, defaultTheme);

  function publish(next: Theme, id: ThemeId | null) {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage({ source, type: "apply", theme: next }, window.location.origin);
    frame.postMessage({ source, type: "highlight", id }, window.location.origin);
  }

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.source !== source) return;
      if (data.type === "ready") {
        publish(themeRef.current, activeRef.current);
        return;
      }
      if (data.type !== "pick" || !Array.isArray(data.tokens)) return;
      const tokens = data.tokens.filter((id: unknown): id is ThemeId => typeof id === "string" && themeTokens.some((token) => token.id === id));
      if (!tokens.length) return;
      const pane = paneRef.current?.getBoundingClientRect();
      const node = iframeRef.current;
      const frame = node?.getBoundingClientRect();
      const x = typeof data.x === "number" ? data.x : 24;
      const y = typeof data.y === "number" ? data.y : 24;
      let left = 24;
      let top = 24;
      if (pane && frame && node) {
        const scaleX = node.clientWidth ? frame.width / node.clientWidth : 1;
        const scaleY = node.clientHeight ? frame.height / node.clientHeight : 1;
        left = frame.left - pane.left + x * scaleX + 18;
        top = frame.top - pane.top + y * scaleY + 18;
        if (left > pane.width - 320) left = Math.max(12, frame.left - pane.left + x * scaleX - 312);
        if (top > pane.height - 240) top = Math.max(12, pane.height - 248);
      }
      setActive(tokens[0]);
      setAnchor({ left, top, tokens });
      setStatus("");
      publish(themeRef.current, tokens[0]);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setAnchor(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function choose(id: ThemeId) {
    setActive(id);
    setAnchor((current) => (current ? { ...current, tokens: current.tokens.includes(id) ? current.tokens : [id, ...current.tokens] } : current));
    publish(theme, id);
  }

  function paint(id: ThemeId, value: string) {
    const next = { ...theme, [id]: value.toLowerCase() };
    setTheme(next);
    setActive(id);
    publish(next, id);
    setStatus("");
  }

  async function persist(next: Theme, done: string) {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: next }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus("Renkler kaydedilemedi.");
        return;
      }
      const stored = body?.theme ? { ...defaultTheme, ...body.theme } : next;
      setTheme(stored);
      setSaved(stored);
      publish(stored, active);
      setStatus(done);
    } catch {
      setStatus("Renkler kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    setTheme(defaultTheme);
    setAnchor(null);
    publish(defaultTheme, active);
    void persist(defaultTheme, "Site varsayılan renklere döndü.");
  }

  const current = active ? themeToken(active) : null;

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-[#ececee] text-ink">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#e4e4e6] bg-white px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Tema</p>
          <h1 className="font-display text-lg font-bold leading-tight">Renk stüdyosu</h1>
          <p className="text-[12px] text-[#5f5f5f]">Önizlemede bir yere dokunun, o yerin rengi değişsin.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full bg-[#f3f3f3] p-1">
            {(["desktop", "phone"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDevice(item)}
                className={`h-8 rounded-full px-3 text-[12px] font-semibold ${device === item ? "bg-white text-ink shadow-[0_1px_2px_rgba(26,26,26,0.08)]" : "text-[#5f5f5f]"}`}
              >
                {item === "desktop" ? "Masaüstü" : "Telefon"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={reset}
            disabled={saving || atDefault}
            className="h-10 rounded-full border border-[#d5d5d8] bg-white px-4 text-sm font-semibold disabled:opacity-40"
          >
            Varsayılana dön
          </button>
          <button
            type="button"
            onClick={() => persist(theme, "Renkler Firebase’e yazıldı.")}
            disabled={saving || !dirty}
            className="h-10 rounded-full bg-brand px-4 text-sm font-semibold text-white disabled:opacity-40"
          >
            {saving ? "Kaydediliyor" : "Kaydet"}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div ref={paneRef} className="relative min-w-0 flex-1 bg-[#d9d9de]">
          <div className={`relative h-full overflow-hidden ${device === "phone" ? "flex justify-center px-4 py-4" : ""}`}>
            <iframe
              ref={iframeRef}
              title="Site önizleme"
              src="/?onizleme=tema"
              className={
                device === "phone"
                  ? "h-full w-[390px] max-w-full rounded-[1.6rem] bg-white shadow-[0_18px_50px_rgba(26,26,26,0.18)]"
                  : "absolute top-0 left-0 max-w-none border-0 bg-white"
              }
              style={
                device === "desktop"
                  ? {
                      width: scale < 1 ? desktopWidth : "100%",
                      height: scale < 1 ? `${100 / scale}%` : "100%",
                      transform: scale < 1 ? `scale(${scale})` : undefined,
                      transformOrigin: "top left",
                    }
                  : undefined
              }
              onLoad={() => publish(theme, active)}
            />
          </div>
          {anchor && current ? (
            <div
              className="absolute z-20 w-[292px] rounded-2xl border border-[#e4e4e6] bg-white p-3 shadow-[0_18px_50px_rgba(26,26,26,0.16)]"
              style={{ left: anchor.left, top: anchor.top }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">Seçilen yer</p>
                  <p className="mt-0.5 font-display text-base font-bold">{current.label}</p>
                </div>
                <button type="button" onClick={() => setAnchor(null)} className="grid h-7 w-7 place-items-center rounded-full text-[#5f5f5f] hover:bg-[#f3f3f3]" aria-label="Kapat">
                  ×
                </button>
              </div>
              {anchor.tokens.length > 1 ? (
                <div className="mt-2 flex flex-wrap gap-1">
                  {anchor.tokens.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => choose(id)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${id === active ? "bg-ink text-white" : "bg-[#f3f3f3] text-ink"}`}
                    >
                      {themeToken(id).label}
                    </button>
                  ))}
                </div>
              ) : null}
              <ColorControl id={current.id} value={theme[current.id]} onChange={paint} />
              <p className="mt-2 text-[12px] leading-5 text-[#5f5f5f]">{current.hint}</p>
            </div>
          ) : null}
        </div>

        <aside className="hidden w-[320px] shrink-0 flex-col border-l border-[#e4e4e6] bg-white lg:flex">
          <div className="border-b border-[#e4e4e6] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Palet</p>
            <p className="mt-1 text-[13px] leading-5 text-[#5f5f5f]">
              {dirty ? "Önizleme güncel. Siteye yazmak için kaydedin." : status || "Kayıtlı renkler yayında."}
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {themeTokens.map((token) => {
              const changed = theme[token.id] !== defaultTheme[token.id];
              const selected = token.id === active;
              return (
                <button
                  key={token.id}
                  type="button"
                  onClick={() => choose(token.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left ${selected ? "bg-white shadow-[inset_0_0_0_1px_#d9d9de]" : "hover:bg-[#f6f6f7]"}`}
                >
                  <span className="h-9 w-9 shrink-0 rounded-lg border border-black/10" style={{ background: theme[token.id] }} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold">{token.label}</span>
                      {changed ? <span className="h-1.5 w-1.5 rounded-full bg-brand" /> : null}
                    </span>
                    <span className="block font-mono text-[11px] uppercase text-[#8d8d8d]">{theme[token.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>
          {current ? (
            <div className="border-t border-[#e4e4e6] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">{current.label}</p>
              <ColorControl id={current.id} value={theme[current.id]} onChange={paint} />
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function ColorControl({ id, value, onChange }: { id: ThemeId; value: string; onChange: (id: ThemeId, value: string) => void }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <div className="mt-2 flex items-center gap-2">
      <input
        type="color"
        aria-label="Renk"
        value={value}
        onInput={(event) => onChange(id, event.currentTarget.value)}
        className="h-11 w-14 cursor-pointer rounded-lg border border-[#e4e4e6] bg-white p-1"
      />
      <input
        value={draft}
        spellCheck={false}
        aria-label="Hex"
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          if (/^#[0-9a-fA-F]{6}$/.test(next.trim())) onChange(id, next.trim());
        }}
        className="h-11 min-w-0 flex-1 rounded-lg border border-[#e4e4e6] px-3 font-mono text-sm uppercase"
      />
    </div>
  );
}
