import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultTheme, normalizeTheme, type Theme } from "@/lib/theme";

const filePath = path.join(process.cwd(), "data", "theme.json");

async function readFileTheme() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeTheme(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeCloud(theme: Theme) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "theme"), {
    ...theme,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readTheme(): Promise<Theme> {
  return (await readFileTheme()) ?? defaultTheme;
}

export async function writeTheme(value: unknown) {
  const theme = normalizeTheme(value);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(theme, null, 2)}\n`, "utf8");

  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(theme);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }

  return { theme, firebase };
}
