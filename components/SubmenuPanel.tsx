import type { NavChild } from "@/lib/nav";

export function SubmenuPanel({ label, items, onNavigate }: { label: string; items: NavChild[]; onNavigate?: () => void }) {
  return (
    <div className="w-[292px] overflow-hidden rounded-2xl border border-[#ece6e6] bg-white shadow-[0_24px_50px_rgba(26,26,26,0.14)]">
      <div className="px-3 pb-3 pt-4">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8d8d8d]">{label}</p>
        <ul className="mt-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={onNavigate}
                className="group/item flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-[#f7f2f2]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f3ecec] text-brand transition group-hover/item:bg-brand group-hover/item:text-white">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M3.5 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0 text-[13px] font-semibold uppercase leading-5 tracking-[0.08em] text-ink transition group-hover/item:text-brand">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
