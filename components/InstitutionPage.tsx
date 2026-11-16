import type { ContactInfo } from "@/lib/contact";
import type { HeroPanelContent, HeroPanelId } from "@/lib/heroBand";
import type { PageSlug, SitePage } from "@/lib/pages";

type ShotId = HeroPanelId | "atolye";

const frames: Record<PageSlug, ShotId> = {
  hakkimizda: "atolye",
  vizyonumuz: "kirma",
  sertifikalarimiz: "arac",
  "kalite-politikamiz": "atasman",
};

const studies: Record<PageSlug, ShotId[]> = {
  hakkimizda: ["kirma", "mobil", "arac"],
  vizyonumuz: ["atolye", "atasman", "mobil"],
  sertifikalarimiz: ["kirma", "atolye", "atasman"],
  "kalite-politikamiz": ["atolye", "kirma", "mobil"],
};

function focusOf(id: ShotId) {
  if (id === "mobil") return "40% center";
  return "center center";
}

function shotOf(panels: HeroPanelContent[], id: ShotId) {
  if (id === "atolye") return { src: "/images/home/atolye.jpg", alt: "Atölyede kaynak yapan çalışanlar", gray: false, focus: focusOf(id) };
  const panel = panels.find((item) => item.id === id);
  return { src: panel?.image ?? "", alt: panel?.tr.title ?? "", gray: true, focus: focusOf(id) };
}

const figures = [
  { value: "25+", label: "Yıllık Deneyim" },
  { value: "150+", label: "Tamamlanan Proje" },
  { value: "45+", label: "İhracat Yapılan Ülke" },
  { value: "500+", label: "Uzman Personel" },
];

export function InstitutionPage({ page, pages, contact, heroPanels }: { page: SitePage; pages: SitePage[]; contact: ContactInfo; heroPanels: HeroPanelContent[] }) {
  const frame = shotOf(heroPanels, frames[page.slug]);

  return (
    <article>
      <header className="bg-brand text-white">
        <div className="grid lg:min-h-[640px] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className="flex flex-col justify-between px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-white/55">Kurumsal</p>
            <div className="mt-10 lg:mt-0">
              <h1 className="max-w-[16ch] font-display text-[2.7rem] font-extrabold uppercase leading-[0.92] tracking-tight sm:text-[3.4rem] lg:text-[3.7rem]">
                {page.title}
              </h1>
              {page.lead ? <p className="mt-6 max-w-[32rem] text-balance text-[17px] leading-8 text-white/78">{page.lead}</p> : null}
            </div>
            <p className="mt-12 text-[13px] tracking-wide text-white/70">
              {contact.address}
              <span className="px-2 text-white/35">/</span>
              <a className="underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </div>
          <div className="relative min-h-[340px] bg-brand sm:min-h-[440px] lg:min-h-full">
            <img
              src={frame.src}
              alt={frame.alt}
              className={`absolute inset-0 h-full w-full object-cover lg:hidden ${frame.gray ? "grayscale" : ""}`}
              style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)", objectPosition: frame.focus }}
            />
            <img
              src={frame.src}
              alt=""
              className={`absolute inset-0 hidden h-full w-full object-cover lg:block ${frame.gray ? "grayscale" : ""}`}
              style={{ clipPath: "polygon(13% 0, 100% 0, 100% 100%, 0 100%)", objectPosition: frame.focus }}
            />
          </div>
        </div>
      </header>

      {page.slug === "hakkimizda" ? (
        <section className="bg-[#f3f3f3]" aria-label="Rakamlar">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
            {figures.map((item) => (
              <div key={item.label} className="border-b border-[#e4e4e4] px-6 py-8 sm:px-10 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <p className="font-display text-[2.4rem] font-bold leading-none text-brand">{item.value}</p>
                <p className="mt-2 text-[13px] text-[#5f5f5f]">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {page.sections.map((section, index) => (
        <section key={section.id} id={section.id} className={`scroll-mt-6 border-t border-[#e7e7e7] ${index % 2 ? "bg-white" : "bg-[#f7f6f6]"}`}>
          <div className="grid lg:grid-cols-2">
            <div className={`relative min-h-[340px] sm:min-h-[460px] ${index % 2 ? "lg:order-2" : ""}`}>
              <Study kind={(index % 3) as 0 | 1 | 2} shot={shotOf(heroPanels, studies[page.slug][index % 3])} mark={String(index + 1).padStart(2, "0")} />
            </div>
            <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
              <p className="font-display text-[4.5rem] font-bold leading-none text-brand/15">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="relative -mt-7 max-w-[16ch] font-display text-[1.8rem] font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-[2.35rem]">
                {section.title}
              </h2>
              {section.text ? <p className="mt-6 max-w-[46ch] whitespace-pre-line text-[16px] leading-8 text-[#4d4d4d]">{section.text}</p> : null}
            </div>
          </div>
        </section>
      ))}

      <nav className="bg-[#161616] text-white" aria-label="Kurumsal sayfalar">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((item, index) => {
            const current = item.slug === page.slug;
            return (
              <a
                key={item.slug}
                href={`/${item.slug}`}
                aria-current={current ? "page" : undefined}
                className={`border-t border-white/10 px-6 py-8 sm:px-8 lg:border-l lg:first:border-l-0 ${current ? "bg-brand" : "hover:bg-white/[0.04]"}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.22em] text-white/50">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-4 block font-display text-[1.35rem] font-bold uppercase leading-tight tracking-tight">{item.title}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </article>
  );
}

function Study({ kind, shot, mark }: { kind: 0 | 1 | 2; shot: { src: string; gray: boolean; focus: string }; mark: string }) {
  const tone = shot.gray ? "grayscale" : "";

  if (kind === 1) {
    return (
      <div className="absolute inset-0 grid grid-cols-[minmax(148px,0.72fr)_1.28fr] bg-brand" aria-hidden>
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 w-[74%] max-w-[228px] -translate-x-1/2 -translate-y-1/2">
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-full border-[15px] border-[#38444e]" />
              <div className="absolute inset-[24%] rounded-full border border-white/60" />
              <div className="absolute inset-[40%] rounded-full border border-white/45" />
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-white" />
            </div>
          </div>
          <span className="absolute bottom-6 left-6 text-[11px] font-semibold tracking-[0.28em] text-white/50">{mark}</span>
        </div>
        <div className="relative min-h-[280px]">
          <img src={shot.src} alt="" className={`absolute inset-0 h-full w-full object-cover ${tone}`} style={{ objectPosition: shot.focus, clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }} />
        </div>
      </div>
    );
  }

  if (kind === 2) {
    return (
      <div className="absolute inset-0 bg-[#38444e]" aria-hidden>
        <img
          src={shot.src}
          alt=""
          className={`absolute inset-0 h-[78%] w-full object-cover ${tone}`}
          style={{ objectPosition: shot.focus, clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 flex h-[26%] items-end justify-between bg-brand px-7 pb-6 sm:px-9">
          <span className="font-display text-[2.4rem] font-bold leading-none text-white">{mark}</span>
          <span className="mb-2 hidden h-px w-28 bg-white/45 sm:block" />
          <span className="mb-1 text-[11px] font-semibold tracking-[0.28em] text-white/70">REDASY</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 bg-[#ececee]"
      aria-hidden
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(56,68,78,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,68,78,0.14) 1px, transparent 1px)",
        backgroundSize: "46px 46px",
      }}
    >
      <img
        src={shot.src}
        alt=""
        className={`absolute bottom-10 left-7 top-10 w-[58%] object-cover sm:left-10 sm:w-[62%] ${tone}`}
        style={{ objectPosition: shot.focus, clipPath: "polygon(0 0, 100% 0, 84% 100%, 0 100%)" }}
      />
      <div className="absolute right-7 top-10 grid h-[4.5rem] w-[4.5rem] place-items-center bg-brand sm:right-10">
        <span className="text-[1.7rem] font-light leading-none text-white">+</span>
      </div>
      <div className="absolute bottom-8 right-7 flex items-center gap-3 sm:right-10">
        <span className="h-px w-16 bg-[#38444e]/50" />
        <span className="text-[11px] font-semibold tracking-[0.26em] text-[#38444e]">REDASY {mark}</span>
      </div>
    </div>
  );
}
