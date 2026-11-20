"use client";

import { useState, type ReactNode } from "react";
import { SubmenuPanel } from "@/components/SubmenuPanel";
import { visibleChildren, type NavChild, type NavConfig, type NavItem } from "@/lib/nav";

export function NavEditor({ initial }: { initial: NavConfig }) {
  const [nav, setNav] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(null);

  function patchItem(id: string, patch: Partial<NavItem>) {
    setNav((current) => ({
      items: current.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
    setMessage(null);
  }

  function patchChild(itemId: string, childId: string, patch: Partial<NavChild>) {
    setNav((current) => ({
      items: current.items.map((item) =>
        item.id === itemId
          ? { ...item, children: item.children.map((child) => (child.id === childId ? { ...child, ...patch } : child)) }
          : item,
      ),
    }));
    setMessage(null);
  }

  function move(index: number, direction: -1 | 1) {
    setNav((current) => {
      const next = index + direction;
      if (next < 0 || next >= current.items.length) return current;
      const items = [...current.items];
      const [row] = items.splice(index, 1);
      items.splice(next, 0, row);
      return { items };
    });
  }

  function moveChild(itemId: string, index: number, direction: -1 | 1) {
    setNav((current) => ({
      items: current.items.map((item) => {
        if (item.id !== itemId) return item;
        const next = index + direction;
        if (next < 0 || next >= item.children.length) return item;
        const children = [...item.children];
        const [row] = children.splice(index, 1);
        children.splice(next, 0, row);
        return { ...item, children };
      }),
    }));
  }

  function addItem() {
    if (nav.items.length >= 8) return;
    const id = crypto.randomUUID();
    setNav((current) => ({
      items: [...current.items, { id, label: "", href: "/", visible: true, submenu: false, children: [] }],
    }));
  }

  function addChild(itemId: string) {
    setNav((current) => ({
      items: current.items.map((item) =>
        item.id === itemId && item.children.length < 8
          ? { ...item, children: [...item.children, { id: crypto.randomUUID(), label: "", href: "/" }] }
          : item,
      ),
    }));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/nav", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nav }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage({ tone: "error", text: "Kayıt tamamlanamadı." });
        return;
      }
      if (body?.nav) setNav(body.nav);
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

  const shown = nav.items.filter((item) => item.visible && item.label.trim());
  const open = shown.find((item) => item.id === preview && visibleChildren(item).length) ?? shown.find((item) => visibleChildren(item).length);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Site</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Menü</h1>
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
          Üst menüdeki başlıklar, linkleri ve görünürlük buradan yönetilir. Alt menü seçilirse o başlığın altında ayrı bir panel açılır.
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

        <div className="mt-6 rounded-2xl bg-white px-5 py-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">Menü önizleme</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {shown.length ? (
              shown.map((item) => {
                const kids = visibleChildren(item);
                const active = open?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`text-[12.5px] font-semibold uppercase tracking-[0.14em] ${active ? "text-brand" : "text-[#2a2a2a]"}`}
                    onMouseEnter={() => kids.length && setPreview(item.id)}
                    onFocus={() => kids.length && setPreview(item.id)}
                    onClick={() => kids.length && setPreview(item.id)}
                  >
                    {item.label}
                    {kids.length ? <span className="ml-1 text-[10px]">▾</span> : null}
                  </button>
                );
              })
            ) : (
              <span className="text-sm text-muted">Görünecek başlık yok.</span>
            )}
          </div>
          {open ? (
            <div className="mt-4">
              <SubmenuPanel label={open.label} items={visibleChildren(open)} />
            </div>
          ) : null}
        </div>

        <div className="mt-5 space-y-3">
          {nav.items.map((item, index) => (
            <section key={item.id} className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-ink">{item.label.trim() || "Yeni başlık"}</h2>
                <div className="flex flex-wrap gap-2">
                  <Mini onClick={() => move(index, -1)} disabled={index === 0}>
                    Yukarı
                  </Mini>
                  <Mini onClick={() => move(index, 1)} disabled={index === nav.items.length - 1}>
                    Aşağı
                  </Mini>
                  <Mini
                    onClick={() => setNav((current) => ({ items: current.items.filter((row) => row.id !== item.id) }))}
                  >
                    Kaldır
                  </Mini>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block text-[12px] font-semibold text-ink">
                  Başlık
                  <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={item.label} onChange={(event) => patchItem(item.id, { label: event.target.value })} />
                </label>
                <label className="block text-[12px] font-semibold text-ink">
                  Link
                  <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={item.href} placeholder="/#kurumsal" onChange={(event) => patchItem(item.id, { href: event.target.value })} />
                </label>
              </div>

              <div className="mt-4">
                <p className="text-[12px] font-semibold text-ink">Görünürlük</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <Choice pressed={item.visible} onClick={() => patchItem(item.id, { visible: true })}>
                    Sitede görünür
                  </Choice>
                  <Choice pressed={!item.visible} onClick={() => patchItem(item.id, { visible: false })}>
                    Gizli
                  </Choice>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[12px] font-semibold text-ink">Alt menü</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <Choice pressed={!item.submenu} onClick={() => patchItem(item.id, { submenu: false })}>
                    Düz link
                  </Choice>
                  <Choice pressed={item.submenu} onClick={() => patchItem(item.id, { submenu: true })}>
                    Alt menülü
                  </Choice>
                </div>
              </div>

              {item.submenu ? (
                <div className="mt-4 rounded-2xl bg-[#f6f3f3] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px] font-semibold text-ink">Alt başlıklar</p>
                    <Mini onClick={() => addChild(item.id)} disabled={item.children.length >= 8}>
                      Alt başlık ekle
                    </Mini>
                  </div>
                  <p className="mt-1 text-[12px] leading-5 text-muted">Etiket ve link dolu satırlar panelde görünür. Üst link doluysa başlığın kendisi de sayfaya gider.</p>
                  <div className="mt-3 space-y-3">
                    {item.children.map((child, childIndex) => (
                      <div key={child.id} className="rounded-xl bg-white p-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="block text-[12px] font-semibold text-ink">
                            Alt başlık
                            <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={child.label} onChange={(event) => patchChild(item.id, child.id, { label: event.target.value })} />
                          </label>
                          <label className="block text-[12px] font-semibold text-ink">
                            Link
                            <input className="field mt-1.5 h-12 w-full rounded-xl px-4 text-sm" value={child.href} onChange={(event) => patchChild(item.id, child.id, { href: event.target.value })} />
                          </label>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Mini onClick={() => moveChild(item.id, childIndex, -1)} disabled={childIndex === 0}>
                            Yukarı
                          </Mini>
                          <Mini onClick={() => moveChild(item.id, childIndex, 1)} disabled={childIndex === item.children.length - 1}>
                            Aşağı
                          </Mini>
                          <Mini
                            onClick={() =>
                              patchItem(item.id, { children: item.children.filter((row) => row.id !== child.id) })
                            }
                          >
                            Kaldır
                          </Mini>
                        </div>
                      </div>
                    ))}
                    {item.children.length === 0 ? <p className="text-[12px] text-muted">Henüz alt başlık yok.</p> : null}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          disabled={nav.items.length >= 8}
          className="mt-4 h-11 rounded-full border border-[#d5d5d8] bg-white px-5 text-sm font-semibold text-ink hover:border-brand/45 disabled:opacity-50"
        >
          Başlık ekle
        </button>
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
