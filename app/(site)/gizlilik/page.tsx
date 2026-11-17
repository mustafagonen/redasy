import type { Metadata } from "next";
import { readContact } from "@/lib/contactStore";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = { title: "Gizlilik Politikası | REDASY" };

export default async function GizlilikPage() {
  const contact = await readContact();
  const phone = contact.phones.find((item) => !item.whatsapp) ?? contact.phones[0];
  return (
    <article data-theme="surface" className="mx-auto max-w-3xl bg-surface px-5 py-16 sm:px-8">
      <p data-theme="soft" className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">REDASY</p>
      <h1 data-theme="ink" className="mt-2 font-display text-3xl font-extrabold uppercase text-ink">Gizlilik Politikası</h1>
      <div data-theme="body" className="mt-6 space-y-4 text-[15px] leading-7 text-body">
        <p>
          Bu sayfa, REDASY web sitesindeki iletişim formunda paylaştığınız ad, e-posta ve mesaj bilgilerinin nasıl
          ele alındığını açıklar.
        </p>
        <p>
          Formdaki bilgiler size dönüş yapmak için kullanılır. Üçüncü kişilere satılmaz. Ulaşmak için{" "}
          <a className="font-semibold text-brand" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>{" "}
          adresini{phone ? <> veya <a className="font-semibold text-brand" href={telHref(phone.number)}>{phone.number}</a> numaralı telefonu</> : null} kullanabilirsiniz. Adres: {contact.address}.
        </p>
      </div>
    </article>
  );
}
