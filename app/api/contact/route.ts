import { NextResponse } from "next/server";
import { readContact, writeContact } from "@/lib/contactStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const contact = await readContact();
  return NextResponse.json({ contact });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const result = await writeContact(body?.contact ?? body);
  return NextResponse.json(result);
}
