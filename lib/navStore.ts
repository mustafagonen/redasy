import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultNav, normalizeNav, type NavConfig } from "@/lib/nav";

const filePath = path.join(process.cwd(), "data", "nav.json");

async function readFileNav() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeNav(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeCloud(nav: NavConfig) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "nav"), {
    ...nav,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readNav(): Promise<NavConfig> {
  return (await readFileNav()) ?? defaultNav;
}

export async function writeNav(value: unknown) {
  const nav = normalizeNav(value);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(nav, null, 2)}\n`, "utf8");

  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(nav);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }

  return { nav, firebase };
}
