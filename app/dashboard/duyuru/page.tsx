import { NoticeEditor } from "@/components/dashboard/NoticeEditor";
import { readNotice } from "@/lib/noticeStore";

export const dynamic = "force-dynamic";

export default async function NoticeDashboardPage() {
  const notice = await readNotice();
  return <NoticeEditor initial={notice} />;
}
