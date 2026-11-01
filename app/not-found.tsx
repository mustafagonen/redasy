import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#12161b] px-4 py-24 text-center text-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-white/70">Aradığınız sayfa bulunamadı.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-[#d75a23] px-5 py-2.5 text-sm font-semibold">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
