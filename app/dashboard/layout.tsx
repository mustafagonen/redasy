import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: { absolute: "Yönetim | REDASY" },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f3f3] lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="flex flex-col bg-brand text-white lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 lg:block">
          <Logo tone="light" />
          <p className="mt-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 lg:mt-4">Yönetim</p>
        </div>
        <DashboardNav />
        <div className="mt-auto hidden px-6 py-5 lg:block">
          <a href="/" className="text-sm text-white/75 hover:text-white">
            Siteyi görüntüle
          </a>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
