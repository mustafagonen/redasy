import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-paper px-4 py-28 text-center text-ink">
      <p className="kicker">REDASY</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">404</h1>
      <p className="mt-3 text-muted">Aradığınız sayfa bulunamadı.</p>
      <Link href="/" className="btn btn-fill mt-8">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
