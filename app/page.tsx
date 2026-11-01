import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const metadata: Metadata = { title: "REDASY Engineering & Industrial Group" };

export default function Page() {
  return <HomeView />;
}
