import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { normalizeRequest, type RequestStatus, type SiteRequest } from "@/lib/requests";

const filePath = path.join(process.cwd(), "data", "requests.json");

async function readFileRequests() {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : parsed.requests;
    if (!Array.isArray(items)) return [];
    return items.map(normalizeRequest).filter((item): item is SiteRequest => item !== null);
  } catch {
    return [];
  }
}

async function writeFileRequests(requests: SiteRequest[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify({ requests }, null, 2)}\n`, "utf8");
}

async function writeCloud(request: SiteRequest) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "requests", request.id), {
    name: request.name,
    email: request.email,
    message: request.message,
    status: request.status,
    createdAt: request.createdAt,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readRequests() {
  const requests = await readFileRequests();
  return requests.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
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
  const requests = await readFileRequests();
  await writeFileRequests([request, ...requests]);

  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(request);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }

  return { request, firebase };
}

export async function setRequestStatus(id: string, status: RequestStatus) {
  const requests = await readFileRequests();
  const current = requests.find((item) => item.id === id);
  if (!current) return null;
  const next = { ...current, status };
  await writeFileRequests(requests.map((item) => (item.id === id ? next : item)));
  try {
    await writeCloud(next);
  } catch {
    // The dashboard still reads the site record when Firestore refuses the write.
  }
  return next;
}
