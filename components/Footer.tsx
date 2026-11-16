import { Logo } from "@/components/Logo";
import { telHref, whatsappHref, type ContactInfo } from "@/lib/contact";
import { visibleChildren, type NavConfig } from "@/lib/nav";
import { socialIcon, type SocialConfig } from "@/lib/social";

export function Footer({ contact, social, nav }: { contact: ContactInfo; social: SocialConfig; nav: NavConfig }) {
  const items = nav.items.filter((item) => item.visible && item.label);
  const groups = items
    .map((item) => ({ item, children: visibleChildren(item) }))
    .filter((group) => group.children.length);
  const links = items.filter((item) => visibleChildren(item).length === 0);
  const socials = social.links.filter((item) => item.visible && item.href);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand bg-[#141618] text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(240px,1.15fr)_minmax(0,1.7fr)] lg:py-16">
        <div>
          <Logo tone="light" />
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Engineering & Industrial Group</p>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-7 text-white/72">
            Mobil kırma ve eleme sistemleri, iş makinesi ataşmanları, araç üstü ekipmanlar ve mobil çözümler.
          </p>
          {socials.length ? (
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {socials.map((item) => {
                const icon = socialIcon(item.id);
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-label={icon.label}
                      target={item.newTab ? "_blank" : undefined}
                      rel={item.newTab ? "noreferrer" : undefined}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white"
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

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ item, children }) => (
            <nav key={item.id} aria-label={item.label}>
              <a href={item.href} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 transition hover:text-white">
                {item.label}
              </a>
              <ul className="mt-4 space-y-2.5">
                {children.map((child) => (
                  <li key={child.id}>
                    <a href={child.href} className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/78 transition hover:text-white">
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {links.length ? (
            <nav aria-label="Ana menü">
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/82 transition hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">İletişim</p>
            <ul className="mt-4 space-y-4">
              <li>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">Adres</p>
                <p className="mt-1 text-[14px] leading-6 text-white/78">{contact.address}</p>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone.id}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">{phone.whatsapp ? "WhatsApp" : phone.label}</p>
                  <a
                    href={phone.whatsapp ? whatsappHref(phone.number) : telHref(phone.number)}
                    className="mt-1 block text-[14px] text-white/78 transition hover:text-white"
                  >
                    {phone.number}
                  </a>
                </li>
              ))}
              <li>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">E-posta</p>
                <a href={`mailto:${contact.email}`} className="mt-1 block text-[14px] text-white/78 transition hover:text-white">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-5 text-[12px] text-white/50 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
          <p>© {year} REDASY. Tüm Hakları Saklıdır.</p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/gizlilik" className="transition hover:text-white">
              Gizlilik Politikası
            </a>
            <a href="/kullanim-kosullari" className="transition hover:text-white">
              Kullanım Koşulları
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
