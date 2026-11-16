import { NextResponse } from "next/server";
import { normalizeStageSteps, stageTurkishMissing } from "@/lib/stageSteps";
import { readStageSteps, writeStageSteps } from "@/lib/stageStepsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const steps = await readStageSteps();
  return NextResponse.json({ steps });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const steps = normalizeStageSteps(body && typeof body === "object" ? (body as { steps?: unknown }).steps : null);
  if (stageTurkishMissing(steps)) {
    return NextResponse.json({ error: "Her aşamanın Türkçe başlığı ve metni dolu olmalı." }, { status: 400 });
  }
  const result = await writeStageSteps(steps);
  return NextResponse.json(result);
}
