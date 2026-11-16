import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { defaultStageSteps, normalizeStageSteps, type StageStep } from "@/lib/stageSteps";

const filePath = path.join(process.cwd(), "data", "stage-steps.json");

async function readFileSteps() {
  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeStageSteps(JSON.parse(raw).steps);
  } catch {
    return null;
  }
}

async function writeCloud(steps: StageStep[]) {
  const db = getDb();
  if (!db) throw new Error("firebase-unconfigured");
  const write = setDoc(doc(db, "siteContent", "stageSteps"), {
    steps,
    updatedAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), 4000);
  });
  await Promise.race([write, timeout]);
}

export async function readStageSteps(): Promise<StageStep[]> {
  return (await readFileSteps()) ?? defaultStageSteps;
}

export async function writeStageSteps(value: unknown) {
  const steps = normalizeStageSteps(value);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify({ steps }, null, 2)}\n`, "utf8");
  let firebase: "ok" | "denied" | "error" = "ok";
  try {
    await writeCloud(steps);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    firebase = code === "permission-denied" ? "denied" : "error";
  }
  return { steps, firebase };
}
