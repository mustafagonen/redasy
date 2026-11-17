import { ThemeStudio } from "@/components/dashboard/ThemeStudio";
import { readTheme } from "@/lib/themeStore";

export const dynamic = "force-dynamic";

export default async function ThemePage() {
  const theme = await readTheme();
  return <ThemeStudio initial={theme} />;
}
