"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import AboutPage from "@/app/hakkimizda/page";
import NewsPage from "@/app/haberler/page";
import { getActivity } from "@/lib/activities";
import { ActivityView } from "./ActivityView";
import { HomeView } from "./HomeView";
import { useSite } from "./site";

export function SiteCanvas({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const corporate =
    pathname === "/" ||
    pathname.startsWith("/hakkimizda") ||
    pathname.startsWith("/haberler") ||
    pathname.startsWith("/iletisim") ||
    pathname.startsWith("/faaliyet-alanlari") ||
    pathname.startsWith("/projeler");
  if (!corporate) return children;
  return <SiteBody />;
}

function SiteBody() {
  const { view } = useSite();
  if (view === "hakkimizda") return <AboutPage />;
  if (view === "haberler") return <NewsPage />;
  const activity = getActivity(view);
  if (activity) return <ActivityView activity={activity} />;
  return <HomeView />;
}
