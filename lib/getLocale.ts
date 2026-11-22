import { cookies } from "next/headers";
import { isLocale, localeCookie, type Locale } from "@/lib/locale";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(localeCookie)?.value;
  return isLocale(value) ? value : "tr";
}
