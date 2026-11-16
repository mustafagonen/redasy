import { notFound } from "next/navigation";
import { PageEditor } from "@/components/dashboard/PageEditor";
import { pageSlugs, type PageSlug } from "@/lib/pages";
import { readPages } from "@/lib/pagesStore";

export const dynamic = "force-dynamic";

export default async function PageEditorRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(pageSlugs as readonly string[]).includes(slug)) notFound();
  const pages = await readPages();
  const page = pages.find((item) => item.slug === (slug as PageSlug));
  if (!page) notFound();
  return <PageEditor initial={page} />;
}
