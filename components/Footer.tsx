export function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 text-[11px] text-white/85 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 REDASY. Tüm Hakları Saklıdır. Engineering & Industrial Group. Tüm Hakları Saklıdır.</p>
        <p className="flex gap-2">
          <a href="/gizlilik" className="hover:text-white">
            Gizlilik Politikası
          </a>
          <span aria-hidden>|</span>
          <a href="/kullanim-kosullari" className="hover:text-white">
            Kullanım Koşulları
          </a>
        </p>
      </div>
    </footer>
  );
}
