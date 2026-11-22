import { AtaturkMark } from "@/components/AtaturkMark";
import { pick, type Locale } from "@/lib/locale";
import type { Notice } from "@/lib/notice";

export function NoticeTicker({ notice, locale }: { notice: Notice; locale: Locale }) {
  const text = pick(notice.text, locale);
  if (!notice.visible || !text) return <span className="min-w-0 flex-1" />;

  const duration = Math.max(26, text.length * 0.35);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden" role="status" aria-label={text}>
      {notice.mark ? <AtaturkMark className="h-6 w-6 shrink-0 text-on-brand" /> : null}
      <div className="notice-window min-w-0 flex-1 overflow-hidden">
        <div className="notice-track" style={{ animationDuration: `${duration}s` }} aria-hidden>
          {[0, 1].map((copy) => (
            <span key={copy} className="text-[12px] font-light tracking-[0.22em] text-on-brand">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
