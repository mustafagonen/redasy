import { NextResponse } from "next/server";
import { normalizeHeroPanels, turkishMissing } from "@/lib/heroBand";
import { readHeroBand, writeHeroBand } from "@/lib/heroBandStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const panels = await readHeroBand();
  return NextResponse.json({ panels });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const panels = normalizeHeroPanels(body && typeof body === "object" ? (body as { panels?: unknown }).panels : null);
  if (turkishMissing(panels)) {
    return NextResponse.json({ error: "Türkçe başlık ve açıklama boş bırakılamaz." }, { status: 400 });
  }
  const result = await writeHeroBand(panels);
  return NextResponse.json(result);
}
