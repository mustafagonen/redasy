import { randomUUID } from "crypto";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { normalizeRequest, type RequestStatus, type SiteRequest } from "@/lib/requests";

function failure(error: unknown): "denied" | "error" {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  return code === "permission-denied" ? "denied" : "error";
}

export async function readRequests() {
  const db = getDb();
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, "requests"));
    return snap.docs
      .map((item) => normalizeRequest({ id: item.id, ...item.data() }))
      .filter((item): item is SiteRequest => item !== null)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch {
    return [];
  }
}

export async function createRequest(input: { name: string; email: string; message: string }) {
  const request: SiteRequest = {
    id: randomUUID(),
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    status: "yeni",
    createdAt: new Date().toISOString(),
  };
  const db = getDb();
  if (!db) return { request, firebase: "error" as const };
  try {
    await setDoc(doc(db, "requests", request.id), { ...request, updatedAt: serverTimestamp() });
    return { request, firebase: "ok" as const };
  } catch (error) {
    return { request, firebase: failure(error) };
  }
}

export async function setRequestStatus(id: string, status: RequestStatus) {
  const current = (await readRequests()).find((item) => item.id === id);
  if (!current) return null;
  const next = { ...current, status };
  const db = getDb();
  if (!db) return null;
  await setDoc(doc(db, "requests", id), { ...next, updatedAt: serverTimestamp() });
  return next;
}
