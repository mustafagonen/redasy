import type { Metadata } from "next";
import { Outfit, Noto_Sans_Arabic } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { WhatsApp } from "@/components/WhatsApp";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
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
    <html lang="tr" className={`${outfit.variable} ${arabic.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsApp />
        </Providers>
      </body>
    </html>
  );
}
