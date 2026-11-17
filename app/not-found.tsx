import { SiteFrame } from "@/components/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 data-theme="ink" className="font-display text-3xl font-extrabold uppercase">
          Sayfa bulunamadı
        </h1>
        <p data-theme="muted" className="mt-3 text-sm text-muted">
          Aradığınız sayfa bu sitede yok.
        </p>
        <a data-theme="brand" href="/" className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand">
          Anasayfa
        </a>
      </div>
    </SiteFrame>
  );
}
