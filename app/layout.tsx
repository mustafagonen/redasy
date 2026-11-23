import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { getLocale } from "@/lib/getLocale";
import { ui } from "@/lib/messages";
import { siteUrl } from "@/lib/seo";

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
  const copy = ui(locale);
  const title = copy.metaTitle;
  const description = copy.metaDescription;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s | REDASY" },
    description,
    keywords: copy.metaKeywords,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "REDASY",
      type: "website",
      locale: locale === "ar" ? "ar_AR" : locale === "en" ? "en_US" : "tr_TR",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
    robots: { index: true, follow: true },
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
