export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <a href="/#anasayfa" aria-label="REDASY" className="flex items-center gap-2.5">
      <img
        src={light ? "/brand/symbol-white.png" : "/brand/symbol.png"}
        alt=""
        className="h-10 w-10 object-contain"
      />
      <img
        src={light ? "/brand/wordmark-white.png" : "/brand/wordmark.png"}
        alt=""
        className="h-[1.35rem] w-auto"
      />
    </a>
  );
}
