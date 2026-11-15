import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultContact, normalizeContact, type ContactInfo } from "@/lib/contact";

const filePath = path.join(process.cwd(), "data", "contact.json");

async function readFileContact() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeContact(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeCloud(contact: ContactInfo) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "contact"), {
    ...contact,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readContact(): Promise<ContactInfo> {
  return (await readFileContact()) ?? defaultContact;
}

export async function writeContact(value: unknown) {
  const contact = normalizeContact(value);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(contact, null, 2)}\n`, "utf8");

  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(contact);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }

  return { contact, firebase };
}
