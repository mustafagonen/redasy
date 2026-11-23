import type { Metadata } from "next";
import { HomeComposer } from "@/components/HomeComposer";
import { readContact } from "@/lib/contactStore";
import { readHeroBand } from "@/lib/heroBandStore";
import { readHomeBlocks } from "@/lib/homeBlocksStore";
import { getLocale } from "@/lib/getLocale";
import { ui } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";
import { readStageSteps } from "@/lib/stageStepsStore";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = ui(locale);
  return pageMeta(locale, { title: copy.metaTitle, description: copy.metaDescription, path: "/", keywords: [...copy.metaKeywords] });
}

export default async function Page() {
  const [heroPanels, contact, steps, blocks, locale] = await Promise.all([readHeroBand(), readContact(), readStageSteps(), readHomeBlocks(), getLocale()]);
  return <HomeComposer heroPanels={heroPanels} contact={contact} steps={steps} blocks={blocks} locale={locale} />;
}
