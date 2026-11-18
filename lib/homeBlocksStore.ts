import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultHomeBlocks, normalizeHomeBlocks, type HomeBlock } from "@/lib/homeBlocks";

const filePath = path.join(process.cwd(), "data", "homepage.json");

async function readFileBlocks() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeHomeBlocks(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeCloud(blocks: HomeBlock[]) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "homepage"), {
    blocks,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readHomeBlocks(): Promise<HomeBlock[]> {
  return (await readFileBlocks()) ?? defaultHomeBlocks();
}

export async function writeHomeBlocks(value: unknown) {
  const blocks = normalizeHomeBlocks(value);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(blocks, null, 2)}\n`, "utf8");

  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(blocks);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }

  return { blocks, firebase };
}
