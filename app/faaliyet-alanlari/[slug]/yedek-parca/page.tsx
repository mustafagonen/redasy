"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CategoryView } from "@/components/CategoryView";
import { categories, spareCategory } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function SparePage() {
  const params = useParams<{ slug: string }>();
  const { t } = useI18n();
  if (params.slug !== "kirma-eleme-yikama") {
    return (
      <div className="bg-paper px-4 py-24 text-center text-ink">
        <p>{t("notFound")}</p>
        <Link href="/faaliyet-alanlari" className="mt-4 inline-block text-burgundy">
          {t("areas")}
        </Link>
      </div>
    );
  }
  return <CategoryView category={spareCategory} parent={categories[0]} />;
}
