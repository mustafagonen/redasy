import { NextResponse } from "next/server";
import { setRequestStatus } from "@/lib/requestsStore";
import type { RequestStatus } from "@/lib/requests";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const status = body && body.status === "incelendi" ? "incelendi" : body && body.status === "yeni" ? "yeni" : null;
  if (!status) {
    return NextResponse.json({ error: "Durum geçersiz." }, { status: 400 });
  }
  const updated = await setRequestStatus(id, status as RequestStatus);
  if (!updated) return NextResponse.json({ error: "Talep bulunamadı." }, { status: 404 });
  return NextResponse.json({ request: updated });
}
