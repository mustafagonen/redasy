import type { Metadata } from "next";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "REDASY Engineering & Industrial Group",
    template: "%s | REDASY",
  },
  description:
    "Mobil kırma, eleme, iş makinesi ataşmanları, araç üstü ekipman ve mobil sağlık çözümleri. REDASY Engineering & Industrial Group, Ankara.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${manrope.variable} ${arabic.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
