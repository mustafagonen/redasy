import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { defaultSocial, normalizeSocial, type SocialConfig } from "@/lib/social";

export async function readSocial(): Promise<SocialConfig> {
  const data = await readSiteDoc("social");
  return data ? normalizeSocial(data) : defaultSocial;
}

export async function writeSocial(value: unknown) {
  const social = normalizeSocial(value);
  const firebase = await saveSiteDoc("social", social);
  return { social, firebase };
}
