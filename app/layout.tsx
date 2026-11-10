import type { Metadata } from "next";
import { Inter, Montserrat, Noto_Sans_Arabic } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { SiteCanvas } from "@/components/SiteCanvas";
import { WhatsApp } from "@/components/WhatsApp";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
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
    "Mobil kırma, eleme, yıkama, konveyör, iş makinesi ataşmanları, araç üstü ekipman ve fason imalat. REDASY Engineering & Industrial Group, Ankara.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable} ${arabic.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>
            <SiteCanvas>{children}</SiteCanvas>
          </main>
          <Footer />
          <WhatsApp />
        </Providers>
      </body>
    </html>
  );
}
