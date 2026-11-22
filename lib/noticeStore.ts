import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { defaultNotice, normalizeNotice, type Notice } from "@/lib/notice";

export async function readNotice(): Promise<Notice> {
  const data = await readSiteDoc("notice");
  return data ? normalizeNotice(data) : defaultNotice;
}

export async function writeNotice(value: unknown) {
  const notice = normalizeNotice(value);
  const firebase = await saveSiteDoc("notice", notice);
  return { notice, firebase };
}
