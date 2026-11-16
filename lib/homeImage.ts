import { unlink } from "fs/promises";
import path from "path";

const homeRoot = path.resolve(process.cwd(), "public", "images", "home");

export function homeImageFile(src: string | undefined) {
  if (!src) return null;
  const clean = src.split("?")[0];
  if (!clean.startsWith("/images/home/") || clean.includes("..")) return null;
  const full = path.resolve(process.cwd(), "public", clean.slice(1));
  const relative = path.relative(homeRoot, full);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return full;
}

export async function deleteUnusedHomeImage(src: string | undefined, keep: string[]) {
  if (!src) return;
  const clean = src.split("?")[0];
  if (keep.some((item) => item.split("?")[0] === clean)) return;
  const file = homeImageFile(clean);
  if (!file) return;
  await unlink(file).catch(() => undefined);
  if (clean.endsWith("-color.jpg")) {
    await deleteUnusedHomeImage(clean.replace("-color.jpg", ".jpg"), keep);
  }
}
