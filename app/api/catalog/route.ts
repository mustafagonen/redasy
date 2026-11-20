import { readdir, unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { readCatalog, writeCatalog } from "@/lib/catalogStore";

export const dynamic = "force-dynamic";

async function sweep(keep: Set<string>) {
  const dir = path.join(process.cwd(), "public", "images", "products");
  const files = await readdir(dir).catch(() => [] as string[]);
  await Promise.all(
    files.map(async (name) => {
      const src = `/images/products/${name}`;
      if (keep.has(src) || name.includes("..") || name.includes("/") || name.includes("\\")) return;
      await unlink(path.join(dir, name)).catch(() => undefined);
    }),
  );
}

export async function GET() {
  const catalog = await readCatalog();
  return NextResponse.json(catalog);
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !Array.isArray((body as { categories?: unknown }).categories) || !Array.isArray((body as { products?: unknown }).products)) {
    return NextResponse.json({ error: "Katalog okunamadı." }, { status: 400 });
  }
  const result = await writeCatalog(body);
  const keep = new Set(result.catalog.products.flatMap((item) => item.images));
  await sweep(keep);
  return NextResponse.json(result);
}
