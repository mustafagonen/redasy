"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";

type QuoteCtx = {
  open: boolean;
  product: string;
  openQuote: (product?: string) => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteCtx | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote outside provider");
  return ctx;
}

function QuoteDialog() {
  const { open, product, closeQuote } = useQuote();
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4" onClick={closeQuote}>
      <div
        className="w-full max-w-lg rounded-2xl bg-[#1b2024] p-6 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#d75a23]">{t("quote")}</p>
            {product ? <p className="mt-1 text-sm text-white/70">{product}</p> : null}
          </div>
          <button type="button" onClick={closeQuote} className="text-sm text-white/60 hover:text-white">
            {t("close")}
          </button>
        </div>
        {sent ? (
          <p className="rounded-xl bg-white/5 px-4 py-6 text-sm leading-6 text-white/80">{t("sent")}</p>
        ) : (
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const name = String(data.get("name") || "").trim();
              const mail = String(data.get("email") || "").trim();
              if (!name || !mail.includes("@")) {
                setError(t("required"));
                return;
              }
              setError("");
              setSent(true);
            }}
          >
            <input name="name" placeholder={t("yourName")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm" />
            <input name="email" type="email" placeholder={t("email")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm" />
            <input name="phone" placeholder={t("phone")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm" />
            <textarea name="message" rows={4} placeholder={t("message")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm" />
            {error ? <p className="text-sm text-[#ffb089]">{error}</p> : null}
            <button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#d75a23] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c24e1c]">
              {t("sendRequest")} <span aria-hidden>→</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function QuoteState({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState("");
  const value = useMemo<QuoteCtx>(
    () => ({
      open,
      product,
      openQuote: (name = "") => {
        setProduct(name);
        setOpen(true);
      },
      closeQuote: () => setOpen(false),
    }),
    [open, product],
  );
  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDialog />
    </QuoteContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <QuoteState>{children}</QuoteState>
    </I18nProvider>
  );
}
