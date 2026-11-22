"use client";

import { localeCookie, locales, type Locale } from "@/lib/locale";
import { ui } from "@/lib/messages";
import { useRouter } from "next/navigation";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const copy = ui(locale);
  const active = "text-on-brand";
  const idle = "text-on-brand/50 hover:text-on-brand";

  function choose(next: Locale) {
    if (next === locale) return;
    document.cookie = `${localeCookie}=${next};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    router.refresh();
  }

  return (
    <div className="flex shrink-0 items-center gap-2.5" role="group" aria-label={copy.language}>
      {locales.map((item) => {
        const current = item === locale;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={current}
            onClick={() => choose(item)}
            className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${current ? active : idle}`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
