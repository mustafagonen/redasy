import { readPages } from "@/lib/pagesStore";

export const dynamic = "force-dynamic";

export default async function PagesDashboardPage() {
  const pages = await readPages();
  return (
    <div className="min-h-screen">
      <header className="border-b border-black/5 bg-white">
        <div className="px-5 py-4 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d8d8d]">Site</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Sayfalar</h1>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <p className="text-sm leading-6 text-muted">Kurumsal alt sayfaların metinleri buradan değişir. Sayfa düzeni aynı kalır.</p>
        <div className="mt-6 space-y-3">
          {pages.map((page) => (
            <a key={page.slug} href={`/dashboard/sayfalar/${page.slug}`} className="block rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.04)] hover:bg-[#fafafa]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d8d8d]">/{page.slug}</p>
              <h2 className="mt-1 font-display text-xl font-bold text-ink">{page.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{page.lead}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
