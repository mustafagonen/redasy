import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionPage } from "@/components/InstitutionPage";
import { readContact } from "@/lib/contactStore";
import { readHeroBand } from "@/lib/heroBandStore";
import { pageSlugs, type PageSlug } from "@/lib/pages";
import { getLocale } from "@/lib/getLocale";
import { localizedPage } from "@/lib/messages";
import { readPages } from "@/lib/pagesStore";

export const dynamic = "force-dynamic";

function asSlug(value: string): PageSlug | null {
  return (pageSlugs as readonly string[]).includes(value) ? (value as PageSlug) : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [pages, locale] = await Promise.all([readPages(), getLocale()]);
  const page = pages.find((item) => item.slug === slug);
  return { title: page ? `${localizedPage(page, locale).title} | REDASY` : "REDASY" };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!asSlug(slug)) notFound();
  const [pages, contact, heroPanels, locale] = await Promise.all([readPages(), readContact(), readHeroBand(), getLocale()]);
  const page = pages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <InstitutionPage page={localizedPage(page, locale)} pages={pages.map((item) => localizedPage(item, locale))} contact={contact} heroPanels={heroPanels} locale={locale} />;
}
