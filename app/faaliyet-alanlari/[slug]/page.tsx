"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ActivityView } from "@/components/ActivityView";
import { getActivity } from "@/lib/activities";
import { useI18n } from "@/lib/i18n";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const activity = getActivity(params.slug);
  const { t } = useI18n();
  if (!activity) {
    return (
      <div className="bg-white px-4 py-24 text-center text-[#1c2024]">
        <p>{t("notFound")}</p>
        <Link href="/" className="mt-4 inline-block text-[#8b1220]">
          {t("home")}
        </Link>
      </div>
    );
  }
  return <ActivityView activity={activity} />;
}
