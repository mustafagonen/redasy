import { NextResponse } from "next/server";
import { readPages, writePage } from "@/lib/pagesStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = await readPages();
  return NextResponse.json({ pages });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const result = await writePage(body?.page ?? body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Geçersiz sayfa." }, { status: 400 });
  }
}
