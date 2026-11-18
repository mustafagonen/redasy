import { NextResponse } from "next/server";
import { normalizeHomeBlocks } from "@/lib/homeBlocks";
import { readHomeBlocks, writeHomeBlocks } from "@/lib/homeBlocksStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const blocks = await readHomeBlocks();
  return NextResponse.json({ blocks });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !Array.isArray((body as { blocks?: unknown }).blocks)) {
    return NextResponse.json({ error: "Bileşen listesi gerekli." }, { status: 400 });
  }
  const blocks = normalizeHomeBlocks((body as { blocks: unknown }).blocks);
  const result = await writeHomeBlocks(blocks);
  return NextResponse.json(result);
}
