import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultPages, normalizePage, normalizePages, type SitePage } from "@/lib/pages";

const filePath = path.join(process.cwd(), "data", "pages.json");

async function readFilePages() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizePages(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeCloud(pages: SitePage[]) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "pages"), {
    pages,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

async function persist(pages: SitePage[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify({ pages }, null, 2)}\n`, "utf8");
  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(pages);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }
  return firebase;
}

export async function readPages(): Promise<SitePage[]> {
  return (await readFilePages()) ?? defaultPages;
}

export async function writePage(value: unknown) {
  const page = normalizePage(value);
  if (!page) throw new Error("invalid-page");
  const pages = (await readFilePages()) ?? defaultPages;
  const next = pages.map((item) => (item.slug === page.slug ? page : item));
  const firebase = await persist(next);
  return { page, firebase };
}
