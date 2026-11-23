import type { Metadata } from "next";
import { readContact } from "@/lib/contactStore";
import { getLocale } from "@/lib/getLocale";
import { ui } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = ui(locale);
  return pageMeta(locale, { title: copy.terms, description: copy.termsLead, path: "/kullanim-kosullari" });
}

export default async function TermsPage() {
  const [contact, locale] = await Promise.all([readContact(), getLocale()]);
  const copy = ui(locale);
  return (
    <article data-theme="surface" className="mx-auto max-w-3xl bg-surface px-5 py-16 sm:px-8">
      <p data-theme="soft" className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">REDASY</p>
      <h1 data-theme="ink" className="mt-2 font-display text-3xl font-extrabold uppercase text-ink">{copy.terms}</h1>
      <div data-theme="body" className="mt-6 space-y-4 text-[15px] leading-7 text-body">
        <p>{copy.termsLead}</p>
        <p>
          {copy.termsForm} {copy.termsWrite} {contact.email}
          {copy.termsWriteTail}
        </p>
      </div>
    </article>
  );
}
