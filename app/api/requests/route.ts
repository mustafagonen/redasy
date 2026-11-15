import { NextResponse } from "next/server";
import { createRequest, readRequests } from "@/lib/requestsStore";

export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  const requests = await readRequests();
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = body && typeof body.name === "string" ? body.name.trim() : "";
  const email = body && typeof body.email === "string" ? body.email.trim() : "";
  const message = body && typeof body.message === "string" ? body.message.trim() : "";
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Ad soyad, e-posta ve mesaj gerekli." }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
  }
  const result = await createRequest({ name, email, message });
  return NextResponse.json(result);
}
