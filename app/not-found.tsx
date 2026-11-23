import type { Metadata } from "next";
import { SiteFrame } from "@/components/SiteFrame";
import { getLocale } from "@/lib/getLocale";
import { ui } from "@/lib/messages";

export const metadata: Metadata = {
  title: { absolute: "Sayfa bulunamadı | REDASY" },
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const copy = ui(await getLocale());
  return (
    <SiteFrame>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 data-theme="ink" className="font-display text-3xl font-extrabold uppercase">
          {copy.notFound}
        </h1>
        <p data-theme="muted" className="mt-3 text-sm text-muted">
          {copy.notFoundBody}
        </p>
        <a data-theme="brand" href="/" className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand">
          {copy.home}
        </a>
      </div>
    </SiteFrame>
  );
}
