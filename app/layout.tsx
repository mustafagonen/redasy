import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "REDASY | Engineering & Industrial Group",
  description:
    "Mobil kırma ve eleme sistemleri, iş makinesi ataşmanları, araç üstü ekipmanlar ve mobil çözümler.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
