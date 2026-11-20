import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { defaultContact, normalizeContact, type ContactInfo } from "@/lib/contact";

export async function readContact(): Promise<ContactInfo> {
  const data = await readSiteDoc("contact");
  return data ? normalizeContact(data) : defaultContact;
}

export async function writeContact(value: unknown) {
  const contact = normalizeContact(value);
  const firebase = await saveSiteDoc("contact", contact);
  return { contact, firebase };
}
