import { HomePage } from "@/components/HomePage";
import { readContact } from "@/lib/contactStore";
import { readHeroBand } from "@/lib/heroBandStore";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [heroPanels, contact] = await Promise.all([readHeroBand(), readContact()]);
  return <HomePage heroPanels={heroPanels} contact={contact} />;
}
