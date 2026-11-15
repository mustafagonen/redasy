import { SocialEditor } from "@/components/dashboard/SocialEditor";
import { readSocial } from "@/lib/socialStore";

export const dynamic = "force-dynamic";

export default async function SocialDashboardPage() {
  const social = await readSocial();
  return <SocialEditor initial={social} />;
}
