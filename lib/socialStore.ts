import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultSocial, normalizeSocial, type SocialConfig } from "@/lib/social";

const filePath = path.join(process.cwd(), "data", "social.json");

async function readFileSocial() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeSocial(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeCloud(social: SocialConfig) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "social"), {
    ...social,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readSocial(): Promise<SocialConfig> {
  return (await readFileSocial()) ?? defaultSocial;
}

export async function writeSocial(value: unknown) {
  const social = normalizeSocial(value);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(social, null, 2)}\n`, "utf8");

  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(social);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }

  return { social, firebase };
}
