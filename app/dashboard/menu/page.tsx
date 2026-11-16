import { NavEditor } from "@/components/dashboard/NavEditor";
import { readNav } from "@/lib/navStore";

export const dynamic = "force-dynamic";

export default async function NavDashboardPage() {
  const nav = await readNav();
  return <NavEditor initial={nav} />;
}
