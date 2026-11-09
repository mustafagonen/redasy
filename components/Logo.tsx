import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="REDASY">
      <img src="/brand/redasy-logo.png" alt="" className="h-12 w-auto sm:h-[58px]" />
    </Link>
  );
}
