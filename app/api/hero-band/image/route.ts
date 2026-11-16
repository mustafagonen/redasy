import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isHeroPanelId } from "@/lib/heroBand";
import { deleteUnusedHomeImage } from "@/lib/homeImage";
import { readHeroBand, writeHeroBand } from "@/lib/heroBandStore";

export const dynamic = "force-dynamic";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const id = String(form?.get("id") ?? "");
  const file = form?.get("file");
  if (!isHeroPanelId(id) || !(file instanceof File)) {
    return NextResponse.json({ error: "Görsel seçilemedi." }, { status: 400 });
  }
  const ext = types[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Yalnızca JPG, PNG veya WebP yüklenebilir." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Görsel 8 MB sınırını aşıyor." }, { status: 400 });
  }

  const name = `${id}-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "images", "home", "panels");
  const target = path.join(dir, name);
  const src = `/images/home/panels/${name}`;
  await mkdir(dir, { recursive: true });
  await writeFile(target, Buffer.from(await file.arrayBuffer()));

  try {
    const panels = await readHeroBand();
    const previous = panels.find((panel) => panel.id === id)?.image;
    const next = panels.map((panel) => (panel.id === id ? { ...panel, image: src } : panel));
    const result = await writeHeroBand(next);
    await deleteUnusedHomeImage(previous, result.panels.map((panel) => panel.image));
    return NextResponse.json({ image: src, firebase: result.firebase });
  } catch {
    await unlink(target).catch(() => undefined);
    return NextResponse.json({ error: "Görsel kaydedilemedi." }, { status: 500 });
  }
}
