import { ContactEditor } from "@/components/dashboard/ContactEditor";
import { readContact } from "@/lib/contactStore";

export const dynamic = "force-dynamic";

export default async function ContactDashboardPage() {
  const contact = await readContact();
  return <ContactEditor initial={contact} />;
}
