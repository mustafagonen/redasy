import type { Metadata } from "next";
import { readContact } from "@/lib/contactStore";

export const metadata: Metadata = { title: "Kullanım Koşulları | REDASY" };

export default async function TermsPage() {
  const contact = await readContact();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">REDASY</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase">Kullanım Koşulları</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#444]">
        <p>
          Bu site REDASY Engineering & Industrial Group kurumsal tanıtım sayfasıdır. Sayfadaki metin ve görseller
          bilgilendirme amaçlıdır.
        </p>
        <p>
          İletişim formunu göndererek verdiğiniz bilgilerin size dönüş için kullanılmasını kabul etmiş olursunuz.
          Sorularınız için {contact.email} adresine yazabilirsiniz.
        </p>
      </div>
    </article>
  );
}
