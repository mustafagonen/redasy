"use client";

import { whatsappHref, type ContactInfo } from "@/lib/contact";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function WhatsAppChat({ contact }: { contact: ContactInfo }) {
  const [ready, setReady] = useState(false);
  const phone = contact.phones.find((item) => item.whatsapp);

  useEffect(() => setReady(true), []);

  if (!phone) return null;

  return (
    <motion.a
      href={whatsappHref(phone.number)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Bize ulaşın, Telefon ${phone.number}`}
      data-theme="brand"
      className="shadow-brand fixed bottom-5 right-5 z-40 flex max-w-[calc(100vw-2.5rem)] items-center gap-3.5 rounded-full bg-brand py-2.5 pl-3.5 pr-4 text-on-brand transition hover:bg-brand-hot"
      initial={{ opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden>
        <path d="M12.04 3.2A8.7 8.7 0 0 0 4.5 16.3L3.4 20.2l4-1.05A8.7 8.7 0 1 0 12.04 3.2Zm5.02 12.28c-.21.6-1.23 1.14-1.7 1.18-.44.04-.99.06-1.6-.1-.37-.1-.84-.27-1.45-.53-2.55-1.1-4.2-3.67-4.33-3.84-.12-.17-1.04-1.38-1.04-2.63 0-1.25.66-1.86.9-2.11.23-.25.51-.32.68-.32h.49c.16 0 .37-.06.58.44.21.52.72 1.8.78 1.93.06.13.1.28.02.45-.08.17-.12.28-.24.43-.12.15-.25.33-.36.44-.12.12-.24.25-.1.49.13.23.6.99 1.29 1.6.88.79 1.63 1.03 1.86 1.15.23.12.37.1.5-.06.14-.17.58-.67.73-.9.16-.23.31-.19.52-.11.21.08 1.34.63 1.57.75.23.11.38.17.44.27.06.1.06.56-.15 1.16Z" />
      </svg>
      <span className="text-[12px] font-bold uppercase tracking-[0.16em]">Bize ulaşın</span>
      <span className="h-8 w-px shrink-0 bg-on-brand/25" aria-hidden />
      <span className="min-w-0">
        <span data-theme="on-brand" className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-on-brand/60">Telefon</span>
        <span className="block text-sm font-semibold leading-tight">{phone.number}</span>
      </span>
    </motion.a>
  );
}
