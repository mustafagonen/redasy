import { CatalogStudio } from "@/components/dashboard/CatalogStudio";
import { readCatalog } from "@/lib/catalogStore";

export const dynamic = "force-dynamic";

export default async function CatalogDashboardPage() {
  const catalog = await readCatalog();
  return <CatalogStudio initial={catalog} />;
}
