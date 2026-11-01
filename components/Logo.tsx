import Link from "next/link";

export function Logo({ light = true }: { light?: boolean }) {
  const title = light ? "text-white" : "text-[#191e24]";
  const sub = light ? "text-white/70" : "text-[#191e24]/70";
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
        <path
          fill={light ? "#ffffff" : "#191e24"}
          d="M10 6h16.2C35.4 6 41 10.8 41 17.4c0 5-3.1 8.8-7.6 10.4L40.6 42h-8.4l-6.6-12.2H18.6V42H10V6zm8.6 6.4v8.8h6.8c3.4 0 5.5-1.7 5.5-4.4s-2.1-4.4-5.5-4.4h-6.8z"
        />
        <path fill="#d75a23" d="M26.2 28.2 37.8 42h-7.4l-8.8-10.6 4.6-3.2z" />
      </svg>
      <span className="leading-none">
        <span className={`block text-[20px] font-extrabold tracking-[0.16em] ${title}`}>REDASY</span>
        <span className={`mt-1 block text-[8.5px] font-medium tracking-[0.04em] ${sub}`}>
          Engineering & Industrial Group
        </span>
      </span>
    </Link>
  );
}
