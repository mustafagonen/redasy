export type ContactPhone = {
  id: string;
  label: string;
  number: string;
  whatsapp: boolean;
};

export type ContactInfo = {
  address: string;
  email: string;
  phones: ContactPhone[];
};

export const defaultContact: ContactInfo = {
  address: "İvedik OSB, Ankara",
  email: "info@redasy.com",
  phones: [
    { id: "hat-0850", label: "Telefon 1", number: "0850 303 02 06", whatsapp: false },
    { id: "hat-0531", label: "Telefon 2", number: "0531 529 02 06", whatsapp: true },
    { id: "hat-0312", label: "Telefon 3", number: "0312 870 06 02", whatsapp: false },
  ],
};

function digits(number: string) {
  const raw = number.replace(/\D/g, "");
  if (raw.startsWith("90")) return raw.slice(2);
  return raw.replace(/^0/, "");
}

export function telHref(number: string) {
  return `tel:+90${digits(number)}`;
}

export function whatsappHref(number: string) {
  return `https://wa.me/90${digits(number)}`;
}

export function publicPhones(contact: ContactInfo) {
  return contact.phones.filter((phone) => !phone.whatsapp);
}

export function normalizeContact(value: unknown): ContactInfo {
  const record = value && typeof value === "object" ? (value as Partial<ContactInfo>) : {};
  const phones = Array.isArray(record.phones) ? record.phones : [];
  const cleanPhones = phones
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const phone = item as Partial<ContactPhone>;
      const number = typeof phone.number === "string" ? phone.number.trim() : "";
      if (!number) return null;
      return {
        id: typeof phone.id === "string" && phone.id ? phone.id : `hat-${index + 1}`,
        label: `Telefon ${index + 1}`,
        number,
        whatsapp: phone.whatsapp === true,
      };
    })
    .filter((item): item is ContactPhone => item !== null);

  let whatsappSeen = false;
  const unique = cleanPhones.map((phone, index) => {
    const labeled = { ...phone, label: `Telefon ${index + 1}` };
    if (!labeled.whatsapp) return labeled;
    if (whatsappSeen) return { ...labeled, whatsapp: false };
    whatsappSeen = true;
    return labeled;
  });

  return {
    address: typeof record.address === "string" && record.address.trim() ? record.address.trim() : defaultContact.address,
    email: typeof record.email === "string" && record.email.trim() ? record.email.trim() : defaultContact.email,
    phones: unique.length ? unique : defaultContact.phones,
  };
}
