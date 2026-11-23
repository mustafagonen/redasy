import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ThemeBridge } from "@/components/ThemeBridge";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { readContact } from "@/lib/contactStore";
import { readNav } from "@/lib/navStore";
import { readSocial } from "@/lib/socialStore";
import { themeVars } from "@/lib/theme";
import { readTheme } from "@/lib/themeStore";
import { getLocale } from "@/lib/getLocale";
import { readNotice } from "@/lib/noticeStore";
import { siteGraph } from "@/lib/seo";
import type { CSSProperties } from "react";

export async function SiteFrame({ children }: { children: React.ReactNode }) {
  const [contact, social, nav, theme, notice, locale] = await Promise.all([readContact(), readSocial(), readNav(), readTheme(), readNotice(), getLocale()]);
  return (
    <div data-site style={themeVars(theme) as CSSProperties} className="min-h-screen bg-surface text-ink">
      <JsonLd data={siteGraph(locale, contact, social)} />
      <ThemeBridge />
      <Header contact={contact} social={social} nav={nav} notice={notice} locale={locale} />
      <main>{children}</main>
      <Footer contact={contact} social={social} nav={nav} locale={locale} />
      <WhatsAppChat contact={contact} locale={locale} />
    </div>
  );
}
