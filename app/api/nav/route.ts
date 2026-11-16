import { NextResponse } from "next/server";
import { readNav, writeNav } from "@/lib/navStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const nav = await readNav();
  return NextResponse.json({ nav });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const result = await writeNav(body?.nav ?? body);
  return NextResponse.json(result);
}
