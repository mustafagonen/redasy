"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SiteView =
  | "home"
  | "hakkimizda"
  | "haberler"
  | "kirma-eleme-yikama"
  | "is-makinesi-atasmanlari"
  | "arac-ustu-ekipmanlar"
  | "mobil-cozumler"
  | "fason-imalat"
  | "lazer-kesim";

type SiteCtx = {
  view: SiteView;
  draft: string;
  toast: string;
  go: (view: SiteView, anchor?: string) => void;
  openContact: () => void;
  requestQuote: (product: string) => void;
  showToast: (message: string) => void;
};

const SiteContext = createContext<SiteCtx | null>(null);

function viewFromPath(path: string): SiteView {
  if (path.startsWith("/hakkimizda")) return "hakkimizda";
  if (path.startsWith("/haberler")) return "haberler";
  if (path.startsWith("/faaliyet-alanlari/")) {
    const slug = path.split("/")[2] as SiteView;
    const known: SiteView[] = [
      "kirma-eleme-yikama",
      "is-makinesi-atasmanlari",
      "arac-ustu-ekipmanlar",
      "mobil-cozumler",
      "fason-imalat",
      "lazer-kesim",
    ];
    if (known.includes(slug)) return slug;
  }
  return "home";
}

export function SiteState({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [view, setView] = useState<SiteView>("home");
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    setView(viewFromPath(pathname));
    if (pathname.startsWith("/iletisim")) {
      window.setTimeout(() => document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" }), 80);
    }
    // Yalnızca ilk açılışta adres okunur. Sonraki tıklamalar sayfayı değiştirmez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const value = useMemo<SiteCtx>(
    () => ({
      view,
      draft,
      toast,
      showToast: setToast,
      go: (next, anchor) => {
        setView(next);
        if (pathname !== "/") router.replace("/", { scroll: false });
        window.setTimeout(() => {
          if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }, 40);
      },
      openContact: () => {
        setView("home");
        if (pathname !== "/") router.replace("/", { scroll: false });
        window.setTimeout(() => document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" }), 60);
      },
      requestQuote: (product) => {
        setDraft(`Merhaba, "${product}" hakkında detaylı teknik föy ve fiyat teklifi talep ediyorum.`);
        setToast(`"${product}" teklif formuna eklendi.`);
        setView("home");
        if (pathname !== "/") router.replace("/", { scroll: false });
        window.setTimeout(() => document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" }), 60);
      },
    }),
    [view, draft, toast, pathname, router],
  );

  return (
    <SiteContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="fixed end-4 bottom-24 z-[80] max-w-sm border-s-4 border-[#8b1220] bg-[#1c2024] px-5 py-4 text-sm leading-snug text-white shadow-2xl">
          {toast}
        </div>
      ) : null}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite outside provider");
  return ctx;
}
