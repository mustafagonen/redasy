import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export async function readSiteDoc(id: string): Promise<Record<string, unknown> | null> {
  try {
    const db = getDb();
    if (!db) return null;
    const snap = await getDoc(doc(db, "siteContent", id));
    if (!snap.exists()) return null;
    const data = snap.data();
    delete data.updatedAt;
    return data;
  } catch {
    return null;
  }
}

export async function saveSiteDoc(id: string, data: Record<string, unknown>): Promise<"ok" | "denied" | "error"> {
  try {
    const db = getDb();
    if (!db) return "error";
    const write = setDoc(doc(db, "siteContent", id), { ...data, updatedAt: serverTimestamp() });
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("timeout")), 12000);
    });
    await Promise.race([write, timeout]);
    return "ok";
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    return code === "permission-denied" ? "denied" : "error";
  }
}
