"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CategoryView } from "@/components/CategoryView";
import { getCategory } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = getCategory(params.slug);
  const { t } = useI18n();
  if (!category) {
    return (
      <div className="bg-paper px-4 py-24 text-center text-ink">
        <p>{t("notFound")}</p>
        <Link href="/faaliyet-alanlari" className="mt-4 inline-block text-burgundy">
          {t("areas")}
        </Link>
      </div>
    );
  }
  return <CategoryView category={category} />;
}
