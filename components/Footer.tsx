import { Logo } from "@/components/Logo";
import { telHref, whatsappHref, type ContactInfo } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { phrase, ui } from "@/lib/messages";
import { visibleChildren, type NavConfig } from "@/lib/nav";
import { socialIcon, type SocialConfig } from "@/lib/social";

export function Footer({ contact, social, nav, locale }: { contact: ContactInfo; social: SocialConfig; nav: NavConfig; locale: Locale }) {
  const copy = ui(locale);
  const items = nav.items
    .filter((item) => item.visible && item.label)
    .map((item) => ({
      ...item,
      label: phrase(item.label, locale),
      children: item.children.map((child) => ({ ...child, label: phrase(child.label, locale) })),
    }));
  const groups = items
    .map((item) => ({ item, children: visibleChildren(item) }))
    .filter((group) => group.children.length);
  const links = items.filter((item) => visibleChildren(item).length === 0);
  const socials = social.links.filter((item) => item.visible && item.href);
  const year = new Date().getFullYear();

  return (
    <footer data-theme="footer" className="border-t border-brand bg-footer text-on-brand">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(220px,0.85fr)_minmax(0,1.7fr)] lg:items-start lg:gap-16 lg:py-14">
        <div>
          <Logo tone="light" />
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-brand/45">Engineering & Industrial Group</p>
          <p data-theme="on-brand" className="mt-4 max-w-[32ch] text-[14px] leading-6 text-on-brand/72">
            {copy.footerBlurb}
          </p>
          {socials.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((item) => {
                const icon = socialIcon(item.id);
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-label={icon.label}
                      target={item.newTab ? "_blank" : undefined}
                      rel={item.newTab ? "noreferrer" : undefined}
                      className="grid h-9 w-9 place-items-center rounded-full border border-on-brand/15 text-on-brand/80 transition hover:border-brand hover:bg-brand hover:text-on-brand"
                    >
                      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                        <path d={icon.path} />
                      </svg>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-3">
          {groups.map(({ item, children }) => (
            <nav key={item.id} aria-label={item.label}>
              <a href={item.href} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-brand/45 transition hover:text-on-brand">
                {item.label}
              </a>
              <ul className="mt-3.5 space-y-2">
                {children.map((child) => (
                  <li key={child.id}>
                    <a href={child.href} className="text-[13.5px] font-medium leading-5 text-on-brand/82 transition hover:text-on-brand">
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-brand/45">{copy.contact}</p>
            <p className="mt-3.5 text-[13.5px] leading-5 text-on-brand/82">{contact.address}</p>
            <ul className="mt-3 space-y-1.5">
              {contact.phones.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={phone.whatsapp ? whatsappHref(phone.number) : telHref(phone.number)}
                    dir="ltr"
                    className="inline-flex items-baseline gap-2 text-[13.5px] text-on-brand/82 transition hover:text-on-brand"
                  >
                    <span>{phone.number}</span>
                    {phone.whatsapp ? <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-brand/40">WhatsApp</span> : null}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${contact.email}`} className="mt-3 block text-[13.5px] text-on-brand/82 transition hover:text-on-brand">
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-on-brand/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 pt-4 pb-24 text-[12px] text-on-brand/50 sm:px-8 md:flex-row md:items-center md:justify-between md:py-4">
          <p>© {year} REDASY. {copy.rights}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((item) => (
              <a key={item.id} href={item.href} className="transition hover:text-on-brand">
                {item.label}
              </a>
            ))}
            <a href="/gizlilik" className="transition hover:text-on-brand">
              {copy.privacy}
            </a>
            <a href="/kullanim-kosullari" className="transition hover:text-on-brand">
              {copy.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
