import { NextResponse } from "next/server";
import { readSocial, writeSocial } from "@/lib/socialStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const social = await readSocial();
  return NextResponse.json({ social });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const result = await writeSocial(body?.social ?? body);
  return NextResponse.json(result);
}
