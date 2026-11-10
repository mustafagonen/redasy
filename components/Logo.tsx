"use client";

import { useSite } from "./site";

export function Logo() {
  const { go } = useSite();
  return (
    <button type="button" onClick={() => go("home")} className="inline-flex shrink-0 flex-col text-start" aria-label="REDASY Engineering & Industrial Group">
      <img src="/brand/redasy-logo.png" alt="" className="h-11 w-auto" />
      <span className="text-[10.5px] font-medium tracking-tight text-gray-500">Engineering & Industrial Group</span>
    </button>
  );
}
