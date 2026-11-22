import type { Metadata } from "next";
import { readContact } from "@/lib/contactStore";
import { telHref } from "@/lib/contact";
import { getLocale } from "@/lib/getLocale";
import { ui } from "@/lib/messages";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: `${ui(locale).privacy} | REDASY` };
}

export default async function GizlilikPage() {
  const [contact, locale] = await Promise.all([readContact(), getLocale()]);
  const copy = ui(locale);
  const phone = contact.phones.find((item) => !item.whatsapp) ?? contact.phones[0];
  return (
    <article data-theme="surface" className="mx-auto max-w-3xl bg-surface px-5 py-16 sm:px-8">
      <p data-theme="soft" className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">REDASY</p>
      <h1 data-theme="ink" className="mt-2 font-display text-3xl font-extrabold uppercase text-ink">{copy.privacy}</h1>
      <div data-theme="body" className="mt-6 space-y-4 text-[15px] leading-7 text-body">
        <p>{copy.privacyLead}</p>
        <p>
          {copy.privacyUse} {copy.privacyReach}{" "}
          <a className="break-all font-semibold text-brand" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          {phone ? (
            <>
              {" "}
              {copy.privacyOrPhone}{" "}
              <a className="font-semibold text-brand" dir="ltr" href={telHref(phone.number)}>
                {phone.number}
              </a>
            </>
          ) : null}
          . {copy.privacyAddress}: {contact.address}.
        </p>
      </div>
    </article>
  );
}
