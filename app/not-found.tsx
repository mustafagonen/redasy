import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { readContact } from "@/lib/contactStore";
import { readSocial } from "@/lib/socialStore";

export default async function NotFound() {
  const [contact, social] = await Promise.all([readContact(), readSocial()]);
  return (
    <>
      <Header contact={contact} social={social} />
      <main>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="font-display text-3xl font-extrabold uppercase">Sayfa bulunamadı</h1>
          <p className="mt-3 text-sm text-muted">Aradığınız sayfa bu sitede yok.</p>
          <a href="/" className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">
            Anasayfa
          </a>
        </div>
      </main>
      <Footer />
      <WhatsAppChat contact={contact} />
    </>
  );
}
