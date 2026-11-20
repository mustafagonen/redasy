import { saveSiteDoc, readSiteDoc } from "@/lib/contentDoc";
import { defaultHomeBlocks, normalizeHomeBlocks, type HomeBlock } from "@/lib/homeBlocks";

export async function readHomeBlocks(): Promise<HomeBlock[]> {
  const data = await readSiteDoc("homepage");
  const blocks = normalizeHomeBlocks(data?.blocks);
  return blocks.length ? blocks : defaultHomeBlocks();
}

export async function writeHomeBlocks(value: unknown) {
  const blocks = normalizeHomeBlocks(value);
  const firebase = await saveSiteDoc("homepage", { blocks });
  return { blocks, firebase };
}
