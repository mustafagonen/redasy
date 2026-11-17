import type { Metadata } from "next";
import { readContact } from "@/lib/contactStore";

export const metadata: Metadata = { title: "Kullanım Koşulları | REDASY" };

export default async function TermsPage() {
  const contact = await readContact();
  return (
    <article data-theme="surface" className="mx-auto max-w-3xl bg-surface px-5 py-16 sm:px-8">
      <p data-theme="soft" className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">REDASY</p>
      <h1 data-theme="ink" className="mt-2 font-display text-3xl font-extrabold uppercase text-ink">Kullanım Koşulları</h1>
      <div data-theme="body" className="mt-6 space-y-4 text-[15px] leading-7 text-body">
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
