"use client";

import { useState } from "react";
import type { SiteRequest } from "@/lib/requests";

function formatWhen(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function RequestsPanel({ initialRequests }: { initialRequests: SiteRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [pendingId, setPendingId] = useState("");
  const fresh = requests.filter((item) => item.status === "yeni").length;

  async function setStatus(id: string, status: SiteRequest["status"]) {
    setPendingId(id);
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.request) return;
      setRequests((current) => current.map((item) => (item.id === id ? body.request : item)));
    } finally {
      setPendingId("");
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="px-5 py-4 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Gelen kutusu</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Talepler</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <p className="text-sm leading-6 text-muted">
          Projenizi anlatın formundan gelen mesajlar. {fresh > 0 ? `${fresh} yeni talep var.` : "Yeni talep yok."}
        </p>

        {requests.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white px-6 py-12 text-center shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
            <p className="font-display text-lg font-bold text-ink">Henüz talep yok</p>
            <p className="mt-2 text-sm text-muted">Form gönderildiğinde kayıt burada görünür.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {requests.map((item) => {
              const freshItem = item.status === "yeni";
              return (
                <li key={item.id} className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)] sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-bold text-ink">{item.name}</p>
                      <a href={`mailto:${item.email}`} className="mt-1 block text-sm text-brand">
                        {item.email}
                      </a>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${freshItem ? "bg-[#f6ecec] text-brand" : "bg-[#ececee] text-muted"}`}>
                        {freshItem ? "Yeni" : "İncelendi"}
                      </span>
                      <p className="mt-2 text-[12px] text-muted">{formatWhen(item.createdAt)}</p>
                    </div>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink">{item.message}</p>
                  <button
                    type="button"
                    disabled={pendingId === item.id}
                    onClick={() => setStatus(item.id, freshItem ? "incelendi" : "yeni")}
                    className="mt-4 h-10 rounded-full bg-[#ececee] px-4 text-sm font-semibold text-ink transition hover:bg-[#e4e4e6] disabled:opacity-60"
                  >
                    {freshItem ? "İncelendi işaretle" : "Yeniden aç"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
