"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { SiteState } from "./site";

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
    <div className="fixed inset-0 z-[80] grid place-items-center bg-deep/70 p-4" onClick={closeQuote}>
      <div
        className="w-full max-w-lg border border-line bg-white p-6 text-ink shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="kicker">{t("quote")}</p>
            {product ? <p className="mt-2 text-sm text-muted">{product}</p> : null}
          </div>
          <button type="button" onClick={closeQuote} className="text-sm text-muted hover:text-ink">
            {t("close")}
          </button>
        </div>
        {sent ? (
          <p className="bg-paper px-4 py-6 text-sm leading-6 text-muted">{t("sent")}</p>
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
            <input name="name" placeholder={t("yourName")} className="field" />
            <input name="email" type="email" placeholder={t("email")} className="field" />
            <input name="phone" placeholder={t("phone")} className="field" />
            <textarea name="message" rows={4} placeholder={t("message")} className="field" />
            {error ? <p className="text-sm text-burgundy">{error}</p> : null}
            <button type="submit" className="btn btn-fill mt-1">
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
      <SiteState>
        <QuoteState>{children}</QuoteState>
      </SiteState>
    </I18nProvider>
  );
}
