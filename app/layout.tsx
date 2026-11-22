import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { getLocale } from "@/lib/getLocale";
import { ui } from "@/lib/messages";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "REDASY | Engineering & Industrial Group",
    description: ui(locale).metaDescription,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
