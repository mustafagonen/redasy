import { NextResponse } from "next/server";
import { isLocale } from "@/lib/locale";
import { ui } from "@/lib/messages";
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
  const rawLocale = body && typeof body === "object" && "locale" in body && typeof body.locale === "string" ? body.locale : "";
  const locale = isLocale(rawLocale) ? rawLocale : "tr";
  const copy = ui(locale);
  if (!name || !email || !message) {
    return NextResponse.json({ error: copy.formRequired }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: copy.formEmail }, { status: 400 });
  }
  const result = await createRequest({ name, email, message });
  return NextResponse.json(result);
}
