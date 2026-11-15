import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { readContact } from "@/lib/contactStore";
import { readSocial } from "@/lib/socialStore";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [contact, social] = await Promise.all([readContact(), readSocial()]);
  return (
    <>
      <Header contact={contact} social={social} />
      <main>{children}</main>
      <Footer />
      <WhatsAppChat contact={contact} />
    </>
  );
}
