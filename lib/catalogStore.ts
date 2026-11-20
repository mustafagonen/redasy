import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { emptyCatalog, normalizeCatalog, type Catalog } from "@/lib/catalog";
import { getDb } from "@/lib/firebase";

const filePath = path.join(process.cwd(), "data", "catalog.json");

async function readFileCatalog() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeCatalog(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeCloud(catalog: Catalog) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "catalog"), {
    ...catalog,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readCatalog(): Promise<Catalog> {
  return (await readFileCatalog()) ?? emptyCatalog;
}

export async function writeCatalog(value: unknown) {
  const catalog = normalizeCatalog(value);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(catalog);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }
  return { catalog, firebase };
}
