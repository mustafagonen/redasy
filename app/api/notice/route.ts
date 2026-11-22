import { NextResponse } from "next/server";
import { writeNotice } from "@/lib/noticeStore";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const result = await writeNotice(body?.notice ?? body);
  return NextResponse.json(result);
}
