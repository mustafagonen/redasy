import { NextResponse } from "next/server";
import { normalizeTheme } from "@/lib/theme";
import { readTheme, writeTheme } from "@/lib/themeStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const theme = await readTheme();
  return NextResponse.json({ theme });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const theme = normalizeTheme(body && typeof body === "object" ? (body as { theme?: unknown }).theme : null);
  const result = await writeTheme(theme);
  return NextResponse.json(result);
}
