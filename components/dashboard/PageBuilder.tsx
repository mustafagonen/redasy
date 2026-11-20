"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { blockCatalog, blockInfo, blocksEqual, defaultHomeBlocks, type BlockKind, type HomeBlock } from "@/lib/homeBlocks";
import { defaultTheme, themeToken, type ThemeId } from "@/lib/theme";

const source = "redasy-page";
const desktopWidth = 1280;

export function PageBuilder({ initial }: { initial: HomeBlock[] }) {
  const [blocks, setBlocks] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const [scale, setScale] = useState(1);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef(blocks);
  blocksRef.current = blocks;
  const dirty = !blocksEqual(blocks, saved);
  const atDefault = blocksEqual(blocks, defaultHomeBlocks()) && blocksEqual(saved, defaultHomeBlocks());
  const current = blocks.find((block) => block.id === editing) ?? null;

  function publish(next: HomeBlock[], highlight: string | null = null, reveal: string | null = null) {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage({ source, type: "apply", blocks: next }, window.location.origin);
    frame.postMessage({ source, type: "highlight", id: highlight }, window.location.origin);
    if (reveal) frame.postMessage({ source, type: "reveal", id: reveal }, window.location.origin);
  }

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

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.source !== source) return;
      if (data.type === "ready") {
        publish(blocksRef.current, editing);
        return;
      }
      if (data.type === "select" && typeof data.id === "string") {
        setEditing(data.id);
        publish(blocksRef.current, data.id);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [editing]);

  function update(next: HomeBlock[], highlight: string | null = editing, reveal: string | null = null) {
    setBlocks(next);
    publish(next, highlight, reveal);
    setStatus("");
  }

  function add(kind: BlockKind) {
    const block: HomeBlock = { id: crypto.randomUUID(), kind, colors: {} };
    update([...blocks, block], block.id, block.id);
    setEditing(block.id);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row);
    update(next, row.id, row.id);
  }

  function remove(id: string) {
    const next = blocks.filter((block) => block.id !== id);
    if (editing === id) setEditing(null);
    update(next, null);
  }

  function paint(id: string, token: ThemeId, value: string) {
    const next = blocks.map((block) => (block.id === id ? { ...block, colors: { ...block.colors, [token]: value.toLowerCase() } } : block));
    update(next, id);
  }

  function clearColors(id: string) {
    const next = blocks.map((block) => (block.id === id ? { ...block, colors: {} } : block));
    update(next, id);
  }

  async function persist(next: HomeBlock[], done: string) {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks: next }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus("Düzen kaydedilemedi.");
        return;
      }
      const stored = Array.isArray(body?.blocks) ? body.blocks : next;
      setBlocks(stored);
      setSaved(stored);
      publish(stored, editing);
      setStatus(done);
    } catch {
      setStatus("Düzen kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    const next = defaultHomeBlocks();
    setEditing(null);
    update(next);
    void persist(next, "Anasayfa varsayılan düzene döndü.");
  }

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-[#ececee] text-ink">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#e4e4e6] bg-white px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Anasayfa</p>
          <h1 className="font-display text-lg font-bold leading-tight">Anasayfa düzeni</h1>
          <p className="text-[12px] text-[#5f5f5f]">Bileşen ekle, sırasını değiştir, kaydetmeden önizle.</p>
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
          <button type="button" onClick={reset} disabled={saving || atDefault} className="h-10 rounded-full border border-[#d5d5d8] bg-white px-4 text-sm font-semibold disabled:opacity-40">
            Varsayılana dön
          </button>
          <button
            type="button"
            onClick={() => persist(blocks, "Anasayfa Firebase’e yazıldı.")}
            disabled={saving || !dirty}
            className="h-10 rounded-full bg-brand px-4 text-sm font-semibold text-white disabled:opacity-40"
          >
            {saving ? "Kaydediliyor" : "Kaydet"}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-[#e4e4e6] bg-white md:flex">
          <div className="border-b border-[#e4e4e6] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Bileşenler</p>
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
            {blockCatalog.map((item) => (
              <div key={item.kind} className="rounded-xl border border-[#e4e4e6] p-3">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-[12px] leading-5 text-[#5f5f5f]">{item.hint}</p>
                <button type="button" onClick={() => add(item.kind)} className="mt-3 h-8 rounded-full bg-[#f3f3f3] px-3 text-[12px] font-semibold text-ink hover:bg-[#e7e7ea]">
                  Ekle
                </button>
              </div>
            ))}
          </div>
        </aside>

        <div ref={paneRef} className="relative min-w-0 flex-1 bg-[#d9d9de]">
          <div className={`relative h-full overflow-hidden ${device === "phone" ? "flex justify-center px-4 py-4" : ""}`}>
            <iframe
              ref={iframeRef}
              title="Anasayfa önizleme"
              src="/?onizleme=duzen"
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
              onLoad={() => publish(blocks, editing)}
            />
          </div>
          {current ? <BlockDialog block={current} onClose={() => setEditing(null)} onColor={paint} onReset={() => clearColors(current.id)} /> : null}
        </div>

        <aside className="hidden w-[300px] shrink-0 flex-col border-l border-[#e4e4e6] bg-white lg:flex">
          <div className="border-b border-[#e4e4e6] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Sayfa</p>
            <p className="mt-1 text-[13px] leading-5 text-[#5f5f5f]">{dirty ? "Önizleme güncel. Siteye yazmak için kaydedin." : status || "Kayıtlı düzen yayında."}</p>
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
            {blocks.length ? (
              blocks.map((block, index) => {
                const info = blockInfo(block.kind);
                const active = block.id === editing;
                return (
                  <div key={block.id} className={`rounded-xl border px-3 py-3 ${active ? "border-brand bg-[#f6f3f3]" : "border-[#e4e4e6]"}`}>
                    <button type="button" onClick={() => { setEditing(block.id); publish(blocks, block.id, block.id); }} className="w-full text-left">
                      <span className="block text-sm font-semibold">{info.label}</span>
                      <span className="mt-0.5 block text-[12px] text-[#5f5f5f]">{Object.keys(block.colors).length ? "Özel renk var" : "Varsayılan renkler"}</span>
                    </button>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="h-8 rounded-full border border-[#e4e4e6] px-2.5 text-[11px] font-semibold disabled:opacity-40">Yukarı</button>
                      <button type="button" onClick={() => move(index, 1)} disabled={index === blocks.length - 1} className="h-8 rounded-full border border-[#e4e4e6] px-2.5 text-[11px] font-semibold disabled:opacity-40">Aşağı</button>
                      <button type="button" onClick={() => { setEditing(block.id); publish(blocks, block.id); }} className="h-8 rounded-full border border-[#e4e4e6] px-2.5 text-[11px] font-semibold">Ayarlar</button>
                      <button type="button" onClick={() => remove(block.id)} className="h-8 rounded-full border border-[#e4e4e6] px-2.5 text-[11px] font-semibold text-brand">Çıkar</button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="px-1 text-sm leading-6 text-[#5f5f5f]">Sayfa boş. Soldan bir bileşen ekleyince önizlemede görünür.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function BlockDialog({
  block,
  onClose,
  onColor,
  onReset,
}: {
  block: HomeBlock;
  onClose: () => void;
  onColor: (id: string, token: ThemeId, value: string) => void;
  onReset: () => void;
}) {
  const info = blockInfo(block.kind);
  return (
    <div className="absolute top-4 right-4 z-20 flex max-h-[calc(100%-2rem)] w-[300px] flex-col rounded-2xl border border-[#e4e4e6] bg-white shadow-[0_18px_50px_rgba(26,26,26,0.16)]">
      <div className="flex items-start justify-between gap-3 border-b border-[#e4e4e6] px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">Bileşen ayarı</p>
          <h2 className="font-display text-base font-bold">{info.label}</h2>
        </div>
        <button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full text-[#5f5f5f] hover:bg-[#f3f3f3]" aria-label="Kapat">
          ×
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {info.colors.map((token) => {
          const id = token as ThemeId;
          return (
            <label key={id} className="block">
              <span className="text-[12px] font-semibold">{themeToken(id).label}</span>
              <span className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  aria-label={themeToken(id).label}
                  value={block.colors[id] ?? defaultTheme[id]}
                  onInput={(event) => onColor(block.id, id, event.currentTarget.value)}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-[#e4e4e6] bg-white p-1"
                />
                <span className="font-mono text-[12px] uppercase text-[#5f5f5f]">{block.colors[id] ?? defaultTheme[id]}</span>
              </span>
            </label>
          );
        })}
      </div>
      <div className="border-t border-[#e4e4e6] p-3">
        <button type="button" onClick={onReset} disabled={!Object.keys(block.colors).length} className="h-9 w-full rounded-full border border-[#d5d5d8] text-[12px] font-semibold disabled:opacity-40">
          Bu bileşenin renklerini sıfırla
        </button>
      </div>
    </div>
  );
}
