import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultHeroPanels, normalizeHeroPanels, type HeroPanelContent } from "@/lib/heroBand";

const filePath = path.join(process.cwd(), "data", "hero-band.json");

async function readFilePanels() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeHeroPanels(JSON.parse(raw).panels);
  } catch {
    return null;
  }
}

async function readCloudPanels() {
  const db = getDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, "siteContent", "heroBand"));
  if (!snap.exists()) return null;
  return normalizeHeroPanels(snap.data().panels);
}

export async function readHeroBand(): Promise<HeroPanelContent[]> {
  const local = await readFilePanels();
  if (local) return local;
  try {
    const cloud = await readCloudPanels();
    if (cloud) return cloud;
  } catch {
    // Firestore rules can reject the client key. The site file remains the source.
  }
  return defaultHeroPanels;
}

export async function writeHeroBand(panels: HeroPanelContent[]) {
  const normalized = normalizeHeroPanels(panels);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify({ panels: normalized }, null, 2)}\n`, "utf8");

  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    const db = getDb();
    if (!db) throw new Error("firebase-unconfigured");
    await setDoc(doc(db, "siteContent", "heroBand"), {
      panels: normalized,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }

  return { panels: normalized, firebase };
}
