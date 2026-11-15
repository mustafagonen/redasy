import type { Metadata } from "next";
import { readContact } from "@/lib/contactStore";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = { title: "Gizlilik Politikası | REDASY" };

export default async function GizlilikPage() {
  const contact = await readContact();
  const phone = contact.phones.find((item) => !item.whatsapp) ?? contact.phones[0];
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">REDASY</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase">Gizlilik Politikası</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#444]">
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
