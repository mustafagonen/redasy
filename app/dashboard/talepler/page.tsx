import { RequestsPanel } from "@/components/dashboard/RequestsPanel";
import { readRequests } from "@/lib/requestsStore";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const requests = await readRequests();
  return <RequestsPanel initialRequests={requests} />;
}
