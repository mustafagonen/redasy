"use client";

import { ContactForm } from "@/components/ContactForm";
import { Logo } from "@/components/Logo";
import { publicPhones, telHref, type ContactInfo } from "@/lib/contact";
import { blockColorStyle, type HomeBlock } from "@/lib/homeBlocks";
import { type HeroPanelContent } from "@/lib/heroBand";
import { type StageStep } from "@/lib/stageSteps";
import type { CSSProperties } from "react";
import { MotionConfig, animate, motion, useInView, useMotionValue, useTransform, type Transition } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type MotionMode = "wait" | "run";
type Shift = { opacity?: number; x?: number; y?: number; scale?: number; scaleY?: number; pathLength?: number };

const MotionModeContext = createContext<MotionMode>("wait");

function useMotionMode() {
  const [mode, setMode] = useState<MotionMode>("wait");
  useEffect(() => setMode("run"), []);
  return mode;
}

function settled(from: Shift): Shift {
  const to: Shift = {};
  if (from.opacity !== undefined) to.opacity = 1;
  if (from.x !== undefined) to.x = 0;
  if (from.y !== undefined) to.y = 0;
  if (from.scale !== undefined) to.scale = 1;
  if (from.scaleY !== undefined) to.scaleY = 1;
  if (from.pathLength !== undefined) to.pathLength = 1;
  return to;
}

function enter(mode: MotionMode, from: Shift, delay = 0, duration = 0.72) {
  const to = settled(from);
  return {
    initial: from,
    whileInView: mode === "run" ? to : undefined,
    viewport: seen,
    transition: rise(delay, duration),
  };
}

const stats = [
  { value: "25+", label: "Yıllık Deneyim" },
  { value: "150+", label: "Tamamlanan Proje" },
  { value: "45+", label: "İhracat Yapılan Ülke" },
  { value: "500+", label: "Uzman Personel" },
];

const reasons = [
  {
    title: "Üstün Mühendislik",
    text: "Güçlü Ar-Ge ve mühendislik kadromuzla her türlü ihtiyaca çözüm sunarız...",
    icon: "compass",
  },
  {
    title: "Yüksek Kalite & Güven",
    text: "Uluslararası standartlarda üretilen kaliteli ürünlerimizle dünya çapında...",
    icon: "medal",
  },
  {
    title: "Global Erişim",
    text: "Dünya çapındaki imalat ağımız ve uluslararası konnektörlerimiz...",
    icon: "globe",
  },
] as const;

const seen = { once: true, margin: "0px 0px -8% 0px" } as const;

const cut = "min(14cqw, 24cqh)";

function clip(index: number, count: number) {
  const topLeft = index === 0 ? "0 0" : `${cut} 0`;
  const bottomRight = index === count - 1 ? "100% 100%" : `calc(100% - ${cut}) 100%`;
  return `polygon(${topLeft}, 100% 0, ${bottomRight}, 0 100%)`;
}

function rise(delay = 0, duration = 0.72): Transition {
  return { duration, delay, ease: EASE };
}

export function HomePage({
  heroPanels,
  contact,
  steps,
  blocks,
  selectedId = null,
}: {
  heroPanels: HeroPanelContent[];
  contact: ContactInfo;
  steps: StageStep[];
  blocks: HomeBlock[];
  selectedId?: string | null;
}) {
  const mode = useMotionMode();
  const panels = heroPanels.map((panel) => ({
    ...panel,
    title: panel.tr.title,
    text: panel.tr.text,
    alt: panel.tr.title,
  }));
  const phones = publicPhones(contact);

  return (
    <MotionConfig reducedMotion="never">
    <MotionModeContext.Provider value={mode}>
      {blocks.map((block, index) => (
        <BlockSection
          key={block.id}
          block={block}
          primary={blocks.findIndex((item) => item.kind === block.kind) === index}
          selected={selectedId === block.id}
          panels={panels}
          phones={phones}
          contact={contact}
          steps={steps}
        />
      ))}
    </MotionModeContext.Provider>
    </MotionConfig>
  );
}

function BlockSection({
  block,
  primary,
  selected,
  panels,
  phones,
  contact,
  steps,
}: {
  block: HomeBlock;
  primary: boolean;
  selected: boolean;
  panels: { id: string; image: string; alt: string; title: string; text: string }[];
  phones: ReturnType<typeof publicPhones>;
  contact: ContactInfo;
  steps: StageStep[];
}) {
  const mode = useContext(MotionModeContext);
  const style = blockColorStyle(block.colors) as CSSProperties;
  const mark = selected ? "outline outline-2 outline-[#2563eb] outline-offset-[-2px]" : "";
  if (block.kind === "film") {
    return (
      <section id={primary ? "faaliyet" : undefined} data-block={block.id} data-theme="surface" style={style} className={`motion-root bg-surface lg:flex lg:h-[calc(100dvh-6.5rem-1px+8rem-15.75rem)] lg:flex-col lg:overflow-hidden ${mark}`}>
        <FilmTouch panels={panels} columns={1} />
        <FilmTouch panels={panels} columns={2} />
        <div className="hidden min-h-0 flex-1 [container-type:size] lg:flex">
          {panels.map((panel, index) => (
            <div
              key={panel.id}
              className="group relative min-w-0 flex-[1_1_0%] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] hover:z-10 hover:grow-[1.72]"
              style={index < panels.length - 1 ? { marginRight: `calc(0.65vw - ${cut})` } : undefined}
            >
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip(index, panels.length) }}>
                <div
                  className={`pointer-events-none absolute top-0 left-1/2 h-full -translate-x-1/2 ${panel.id === "mobil" ? "w-[58cqw]" : ""}`}
                  style={panel.id === "mobil" ? undefined : { width: "calc(35.73cqw + min(15.3cqw, 26.24cqh) + 10px)" }}
                >
                  <img
                    src={panel.image}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                  <img
                    src={panel.image}
                    alt={panel.alt}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div data-theme="caption" className="hidden h-[5.25rem] shrink-0 bg-caption lg:block">
          <div className="grid h-full grid-cols-4">
            {panels.map((panel, index) => (
              <div
                key={panel.id}
                className={`relative flex min-w-0 items-center ${index === 0 ? "pl-3 pr-1 sm:pl-5 sm:pr-2" : index === panels.length - 1 ? "pl-3 pr-2 sm:pl-6 sm:pr-5" : "pl-3 pr-1 sm:pl-6 sm:pr-2"}`}
              >
                {index > 0 ? (
                  <motion.span
                    data-theme="caption-line"
                    className="absolute inset-y-3.5 left-0 w-px origin-top bg-caption-line"
                    aria-hidden
                    {...enter(mode, { scaleY: 0 }, 0.42 + index * 0.08, 0.55)}
                  />
                ) : null}
                <Caption title={panel.title} text={panel.text} singleLine delay={0.5 + index * 0.08} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (block.kind === "stages") {
    return (
      <section data-block={block.id} style={style} className={`motion-root ${mark}`}>
        <StageIntro steps={steps} />
      </section>
    );
  }
  if (block.kind === "about") {
    return (
      <section id={primary ? "kurumsal" : undefined} data-block={block.id} data-theme="surface" style={style} className={`motion-root bg-surface ${mark}`}>
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:gap-8 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <motion.p
              data-theme="soft"
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-soft"
              {...enter(mode, { opacity: 0, y: 12 })}
            >
              Hakkımızda Bölümü
            </motion.p>
            <motion.h1
              data-theme="ink"
              className="mt-3 max-w-[24ch] font-display text-[1.55rem] font-bold uppercase leading-[1.2] tracking-tight text-ink sm:text-[1.85rem]"
              {...enter(mode, { opacity: 0, y: 18 }, 0.08, 0.8)}
            >
              Geleceğin mühendislik çözümlerini bugünden inşa ediyoruz.
            </motion.h1>
            <motion.h2
              data-theme="brand"
              className="mt-8 font-display text-lg font-bold text-brand"
              {...enter(mode, { opacity: 0, y: 12 }, 0.16)}
            >
              Biz Kimiz?
            </motion.h2>
            <div data-theme="body" className="mt-3 max-w-[62ch] space-y-4 text-[15px] leading-7 text-body">
              <motion.p {...enter(mode, { opacity: 0, y: 14 }, 0.22)}>
                REDASY olarak, mobil kırma eleme sistemlerinden özel araç üstü ekipmanlara kadar, imalat ve mühendislik gücünü geniş sanayi fabrikamız sayesinde ortaya koyuyoruz.
              </motion.p>
              <motion.p {...enter(mode, { opacity: 0, y: 14 }, 0.3)}>
                REDASY&apos;nin mobil kırma eleme sistemlerindeki gücünü, araç üstü ekipmanlara taşıyan mühendislik anlayışıyla sağlam zemine oturtuyoruz.
              </motion.p>
            </div>
            <motion.a
              href="#neden-biz"
              data-theme="brand"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand hover:bg-brand-hover"
              {...enter(mode, { opacity: 0, y: 12 }, 0.38)}
              whileHover={mode === "run" ? { y: -2 } : undefined}
              whileTap={mode === "run" ? { scale: 0.98 } : undefined}
            >
              Daha Fazlası <span aria-hidden>→</span>
            </motion.a>
          </div>
          <motion.div
            className="max-md:order-first overflow-hidden rounded-[1.4rem] shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
            {...enter(mode, { opacity: 0, y: 20 }, 0.12, 0.9)}
          >
            <motion.img
              src="/images/home/atolye.jpg"
              alt="Atölyede kaynak yapan iki çalışan"
              className="aspect-[16/11] w-full object-cover"
              {...enter(mode, { scale: 1.06 }, 0.12, 1.25)}
            />
          </motion.div>
        </div>
      </section>
    );
  }
  if (block.kind === "stats") {
    return (
      <section data-block={block.id} data-theme="brand" style={style} className={`motion-root bg-brand text-on-brand ${mark}`} aria-label="Rakamlar">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <motion.div {...enter(mode, { opacity: 0, x: -12 })}>
            <Logo tone="light" />
          </motion.div>
          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4 lg:max-w-[820px]">
            {stats.map((item, index) => (
              <div key={item.label}>
                <p data-theme="on-brand" className="font-display text-[2rem] font-bold leading-none text-on-brand" aria-label={item.value}>
                  <CountUp value={item.value} delay={index * 0.1} />
                </p>
                <motion.p data-theme="on-brand" className="mt-1 text-balance text-xs leading-snug text-on-brand/80" {...enter(mode, { opacity: 0, y: 8 }, 0.15 + index * 0.1, 0.55)}>
                  {item.label}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (block.kind === "reasons") {
    return (
      <section id={primary ? "neden-biz" : undefined} data-block={block.id} data-theme="paper" style={style} className={`motion-root bg-paper ${mark}`}>
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <motion.h2
            className="text-center font-display text-[1.7rem] font-extrabold uppercase tracking-[0.08em] text-ink"
            data-theme="ink"
            {...enter(mode, { opacity: 0, y: 16 })}
          >
            Neden Biz?
          </motion.h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reasons.map((item, index) => (
              <motion.article
                key={item.title}
                className="rounded-2xl border border-line bg-surface px-6 py-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
                data-theme="surface"
                {...enter(mode, { opacity: 0, y: 24 }, index * 0.12, 0.75)}
                whileHover={mode === "run" ? { y: -6, transition: { duration: 0.35, delay: 0, ease: EASE } } : undefined}
                whileTap={mode === "run" ? { scale: 0.98 } : undefined}
              >
                <ReasonIcon name={item.icon} />
                <h3 data-theme="ink" className="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
                <p data-theme="muted" className="mx-auto mt-2 max-w-[28ch] text-sm leading-6 text-muted">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
      <section id={primary ? "iletisim" : undefined} data-block={block.id} data-theme="surface" style={style} className={`motion-root bg-surface ${mark}`}>
        <div id="kariyer" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
          <motion.div
            className="overflow-hidden rounded-[1.6rem] border border-line bg-surface shadow-[0_20px_50px_rgba(26,26,26,0.06)] lg:grid lg:grid-cols-[0.9fr_1.1fr]"
            {...enter(mode, { opacity: 0, y: 28 }, 0, 0.8)}
          >
            <div data-theme="brand" className="bg-brand px-5 py-9 text-on-brand sm:px-9 sm:py-11">
              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-on-brand/55"
                {...enter(mode, { opacity: 0, y: 10 }, 0.08)}
              >
                İletişim
              </motion.p>
              <motion.h2
                className="mt-3 max-w-[12ch] font-display text-[1.7rem] font-bold uppercase leading-[1.15] tracking-tight sm:text-[1.9rem]"
                {...enter(mode, { opacity: 0, y: 14 }, 0.14, 0.75)}
              >
                Bizimle iletişime geçin
              </motion.h2>
              <motion.p
                className="mt-4 max-w-[34ch] text-sm leading-6 text-on-brand/75"
                {...enter(mode, { opacity: 0, y: 12 }, 0.2)}
              >
                Projeleriniz için profesyonel çözümler sunmaya hazırız.
              </motion.p>
              <ul className="mt-9 space-y-3">
                <motion.li {...enter(mode, { opacity: 0, x: -14 }, 0.24, 0.55)}>
                  <div className="flex items-center gap-4 rounded-2xl bg-on-brand/10 px-4 py-3.5 ring-1 ring-on-brand/15">
                    <ContactGlyph name="pin" />
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-on-brand/50">Adres</span>
                      <span className="mt-0.5 block text-sm font-semibold">{contact.address}</span>
                    </span>
                  </div>
                </motion.li>
                {phones.map((phone, index) => (
                  <motion.li
                    key={phone.id}
                    {...enter(mode, { opacity: 0, x: -14 }, 0.3 + index * 0.08, 0.55)}
                  >
                    <a href={telHref(phone.number)} className="flex items-center gap-4 rounded-2xl bg-on-brand/10 px-4 py-3.5 ring-1 ring-on-brand/15 transition hover:bg-on-brand/15">
                      <ContactGlyph name="phone" />
                      <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-on-brand/50">Telefon {index + 1}</span>
                        <span className="mt-0.5 block text-sm font-semibold">{phone.number}</span>
                      </span>
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  {...enter(mode, { opacity: 0, x: -14 }, 0.3 + phones.length * 0.08, 0.55)}
                >
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-4 rounded-2xl bg-on-brand/10 px-4 py-3.5 ring-1 ring-on-brand/15 transition hover:bg-on-brand/15">
                    <ContactGlyph name="mail" />
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-on-brand/50">E-posta</span>
                      <span className="mt-0.5 block break-all text-sm font-semibold">{contact.email}</span>
                    </span>
                  </a>
                </motion.li>
              </ul>
            </div>
            <motion.div
              className="bg-form px-6 py-8 sm:px-8 sm:py-10 lg:px-10"
              data-theme="form"
              {...enter(mode, { opacity: 0, x: 18 }, 0.16, 0.75)}
            >
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
}

type FilmPanel = { id: string; image: string; alt: string; title: string; text: string };

function FilmTouch({ panels, columns }: { panels: FilmPanel[]; columns: 1 | 2 }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [hint, setHint] = useState(true);
  const pages: FilmPanel[][] = [];
  for (let index = 0; index < panels.length; index += columns) pages.push(panels.slice(index, index + columns));

  function sync() {
    const node = scroller.current;
    if (!node || !node.clientWidth) return;
    const next = Math.round(node.scrollLeft / node.clientWidth);
    setPage(Math.max(0, Math.min(pages.length - 1, next)));
    if (node.scrollLeft > 12) setHint(false);
  }

  function go(next: number) {
    const node = scroller.current;
    if (!node) return;
    const target = Math.max(0, Math.min(pages.length - 1, next));
    node.scrollTo({ left: target * node.clientWidth, behavior: "smooth" });
    setPage(target);
    setHint(false);
  }

  return (
    <div className={columns === 1 ? "relative md:hidden" : "hidden md:block lg:hidden"}>
      <div
        ref={scroller}
        onScroll={sync}
        className="snap-row flex"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Faaliyet görselleri"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(page + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(page - 1);
          }
        }}
      >
        {pages.map((group, pageIndex) => (
          <article key={group.map((item) => item.id).join("-")} className="snap-page w-full min-w-full shrink-0" aria-hidden={pageIndex !== page}>
            <div className={`relative overflow-hidden ${columns === 1 ? "h-[62vh] max-h-[520px] min-h-[300px]" : "h-[46vh] max-h-[460px] min-h-[340px]"}`}>
              {columns === 1 ? (
                <FilmFrame panel={group[0]} active={pageIndex === page} clip="polygon(0 0, 100% 0, 100% 100%, 0 100%)" />
              ) : (
                <div className="absolute inset-0 flex">
                  <div className="relative z-10 h-full w-[58%]">
                    <FilmFrame panel={group[0]} active={pageIndex === page} clip="polygon(0 0, 100% 0, 74% 100%, 0 100%)" />
                  </div>
                  {group[1] ? (
                    <div className="relative -ml-[10%] h-full w-[52%]">
                      <FilmFrame panel={group[1]} active={pageIndex === page} clip="polygon(22% 0, 100% 0, 100% 100%, 0 100%)" />
                    </div>
                  ) : null}
                </div>
              )}
              {columns === 1 ? <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-caption" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} /> : null}
              {columns === 1 && hint && pageIndex === 0 ? (
                <div className="pointer-events-none absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-on-brand">
                  Kaydır <span className="nudge">→</span>
                </div>
              ) : null}
            </div>
            <div data-theme="caption" className={`grid bg-caption ${columns === 2 ? "grid-cols-2" : ""}`}>
              {group.map((panel, index) => {
                const order = panels.findIndex((item) => item.id === panel.id) + 1;
                return (
                  <div key={panel.id} className={columns === 2 ? (index === 0 ? "py-5 pr-6 pl-8" : "py-5 pr-8 pl-8") : "px-5 pt-4 pb-5"}>
                    <p data-theme="brand" className="text-[11px] font-semibold tracking-[0.2em] text-brand">
                      {String(order).padStart(2, "0")}
                      <span data-theme="soft" className="text-soft"> / {String(panels.length).padStart(2, "0")}</span>
                    </p>
                    <h2 data-theme="ink" className="mt-1.5 font-display text-[1.05rem] font-bold uppercase leading-tight text-ink md:text-lg">{panel.title}</h2>
                    <p data-theme="muted" className="mt-1.5 text-[13px] leading-5 text-muted md:text-sm md:leading-6">{panel.text}</p>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
      {columns === 1 ? (
        <div className="absolute left-4 z-20 flex items-center gap-1 rounded-full bg-ink/75 py-1 pr-2 pl-1 text-on-brand" style={{ top: "calc(max(300px, min(62vh, 520px)) - 5.75rem)" }}>
          <button type="button" aria-label="Önceki görsel" disabled={page === 0} onClick={() => go(page - 1)} className="grid h-10 w-10 place-items-center rounded-full text-lg leading-none disabled:opacity-30">
            <span aria-hidden>←</span>
          </button>
          <button type="button" aria-label="Sonraki görsel" disabled={page === pages.length - 1} onClick={() => go(page + 1)} className="grid h-10 w-10 place-items-center rounded-full text-lg leading-none disabled:opacity-30">
            <span aria-hidden>→</span>
          </button>
          <div className="flex items-center pl-1" role="tablist" aria-label="Görsel sayfaları">
            {pages.map((group, index) => (
              <button key={group[0].id} type="button" role="tab" aria-selected={index === page} aria-label={`${index + 1}. görsel`} onClick={() => go(index)} className="grid h-10 w-6 place-items-center">
                <span className={`block h-2 rounded-full transition-all duration-300 ${index === page ? "w-5 bg-on-brand" : "w-2 bg-on-brand/40"}`} />
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <div data-theme="caption" className={`items-center justify-between gap-4 bg-caption px-8 pt-3 pb-5 ${columns === 1 ? "hidden" : "flex"}`}>
        <div className="flex items-center gap-2" role="tablist" aria-label="Görsel sayfaları">
          {pages.map((group, index) => (
            <button
              key={group[0].id}
              type="button"
              role="tab"
              aria-selected={index === page}
              aria-label={`${index + 1}. görsel`}
              onClick={() => go(index)}
              className="grid h-11 w-11 place-items-center"
            >
              <span className={`block h-2.5 rounded-full transition-all duration-300 ${index === page ? "w-7 bg-brand" : "w-2.5 bg-caption-line"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Önceki görsel" disabled={page === 0} onClick={() => go(page - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-lg leading-none text-ink disabled:opacity-30">
            <span aria-hidden>←</span>
          </button>
          <button type="button" aria-label="Sonraki görsel" disabled={page === pages.length - 1} onClick={() => go(page + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-lg leading-none text-ink disabled:opacity-30">
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FilmFrame({ panel, active, clip }: { panel: FilmPanel; active: boolean; clip: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
      <img src={panel.image} alt="" aria-hidden draggable={false} className="absolute inset-0 h-full w-full object-cover grayscale" />
      <img
        src={panel.image}
        alt={panel.alt}
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] ${active ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function StageIntro({ steps }: { steps: StageStep[] }) {
  const mode = useContext(MotionModeContext);
  if (!steps.length) return null;
  return (
    <div data-theme="stage" className="border-t border-line bg-stage lg:flex lg:h-[15.75rem] lg:items-center">
      <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-2 md:hidden">
        {steps.map((step, index) => (
          <motion.article
            key={step.id}
            className="border-b border-line py-5 last:border-b-0"
            {...enter(mode, { opacity: 0, y: 16 }, 0.08 + index * 0.08, 0.6)}
          >
            <p data-theme="brand" className="text-[11px] font-semibold tracking-[0.2em] text-brand">{String(index + 1).padStart(2, "0")}</p>
            <h2 data-theme="ink" className="mt-2 font-display text-lg font-bold leading-tight text-ink">{step.tr.title}</h2>
            <p data-theme="muted" className="mt-2 text-sm leading-6 text-muted">{step.tr.text}</p>
          </motion.article>
        ))}
      </div>
      <div className="snap-row hidden gap-4 px-8 py-8 md:flex lg:hidden">
        {steps.map((step, index) => (
          <motion.article
            key={step.id}
            className="w-[46%] shrink-0 snap-start rounded-2xl border border-line bg-surface px-6 py-7"
            data-theme="surface"
            {...enter(mode, { opacity: 0, y: 16 }, 0.08 + index * 0.08, 0.6)}
          >
            <p data-theme="brand" className="text-[11px] font-semibold tracking-[0.2em] text-brand">{String(index + 1).padStart(2, "0")}</p>
            <h2 data-theme="ink" className="mt-2 font-display text-xl font-bold leading-tight text-ink">{step.tr.title}</h2>
            <p data-theme="muted" className="mt-2 text-sm leading-6 text-muted">{step.tr.text}</p>
          </motion.article>
        ))}
      </div>
      <div className="mx-auto hidden w-full lg:block">
        <div className="mx-auto grid w-full max-w-[1200px] px-8" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`min-w-0 ${index > 0 ? "border-l border-line pl-8" : "pr-8"}`}
              {...enter(mode, { opacity: 0, y: 12 }, 0.12 + index * 0.08, 0.6)}
            >
              <p data-theme="brand" className="text-[11px] font-semibold tracking-[0.2em] text-brand">{String(index + 1).padStart(2, "0")}</p>
              <h2 data-theme="ink" className="mt-2 font-display text-[1.2rem] font-bold leading-tight text-ink">{step.tr.title}</h2>
              <p data-theme="muted" className="mt-2 line-clamp-2 text-[14px] leading-6 text-muted">{step.tr.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CountUp({ value, delay }: { value: string; delay: number }) {
  const mode = useContext(MotionModeContext);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const target = Number(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/\d/g, "");
  const count = useMotionValue(0);
  const text = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (mode !== "run" || !inView) return;
    const controls = animate(count, target, {
      duration: 1.75,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [mode, inView, count, target, delay]);

  return (
    <motion.span ref={ref} className="inline-block min-w-[4.2ch] tabular-nums">
      {text}
    </motion.span>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 16" data-theme="brand" className={`h-3.5 w-5 shrink-0 text-brand ${className}`} fill="none" aria-hidden>
      <path d="M2 8h20M16 2.5 23.5 8 16 13.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Caption({ title, text, singleLine = false, delay = 0 }: { title: string; text: string; singleLine?: boolean; delay?: number }) {
  const mode = useContext(MotionModeContext);
  return (
    <motion.div className="group flex items-center justify-between gap-2" {...enter(mode, { opacity: 0, y: 12 }, delay, 0.6)}>
      <div className="min-w-0">
        <h2 data-theme="ink" className={singleLine ? "truncate text-[12px] font-bold uppercase leading-4 tracking-[0.01em] text-ink sm:text-[14px] sm:leading-5" : "text-[13px] font-bold uppercase leading-5 tracking-[0.04em] text-ink"}>
          {title}
        </h2>
        <p data-theme="muted" className={singleLine ? "mt-0.5 truncate text-[11px] leading-4 tracking-[-0.032em] text-muted sm:mt-1 sm:text-[12px] sm:leading-5" : "mt-1 max-w-[28ch] text-[13px] leading-5 text-muted"}>
          {text}
        </p>
      </div>
      <Arrow className="transition duration-300 group-hover:translate-x-1" />
    </motion.div>
  );
}

function ReasonIcon({ name }: { name: "compass" | "medal" | "globe" }) {
  return (
    <svg viewBox="0 0 48 48" className="mx-auto h-14 w-14 text-brand" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {name === "compass" ? (
        <>
          <Ring cx="24" cy="5.2" r="2.6" delay={0} />
          <Stroke d="M24 7.8v2.2" delay={0.08} />
          <Ring cx="24" cy="12.2" r="2.15" delay={0.12} />
          <Stroke d="M22.2 14 12.4 37.4" delay={0.2} />
          <Stroke d="M25.8 14 35.8 40.8" delay={0.28} />
          <Stroke d="M16.6 23.2h14.8" delay={0.36} />
          <Ring cx="13.2" cy="35" r="2.65" delay={0.42} />
          <Stroke d="M12.6 37.2 13.2 41.4" delay={0.5} />
        </>
      ) : null}
      {name === "medal" ? (
        <>
          <Stroke d="M17.6 27.4 12.8 41.6 19.4 36.2 21.2 28.6" delay={0} />
          <Stroke d="M30.4 27.4 35.2 41.6 28.6 36.2 26.8 28.6" delay={0.1} />
          <Ring cx="24" cy="19.2" r="10.6" delay={0.16} fill="var(--theme-surface)" />
          <Ring cx="24" cy="19.2" r="7.2" delay={0.3} />
          <Stroke d="m19.3 19.4 3 3.1 6-6.3" delay={0.48} duration={0.45} />
        </>
      ) : null}
      {name === "globe" ? (
        <>
          <Ring cx="24" cy="24" r="15" delay={0} duration={0.9} />
          <Stroke d="M9 24h30" delay={0.22} />
          <Stroke d="M24 9v30" delay={0.3} />
          <Stroke d="M24 9c-5.6 4.2-8.6 9.4-8.6 15s3 10.8 8.6 15c5.6-4.2 8.6-9.4 8.6-15S29.6 13.2 24 9Z" delay={0.38} duration={0.85} />
          <Stroke d="M13.2 16.4c3.2 1.7 6.8 2.6 10.8 2.6s7.6-.9 10.8-2.6" delay={0.5} />
          <Stroke d="M13.2 31.6c3.2-1.7 6.8-2.6 10.8-2.6s7.6.9 10.8 2.6" delay={0.58} />
        </>
      ) : null}
    </svg>
  );
}

function Stroke({ d, delay, duration = 0.75 }: { d: string; delay: number; duration?: number }) {
  const mode = useContext(MotionModeContext);
  const motionProps = enter(mode, { pathLength: 0, opacity: 0 }, delay, duration);
  return (
    <motion.path
      d={d}
      {...motionProps}
      transition={mode === "run" ? { pathLength: { duration, delay, ease: EASE }, opacity: { duration: 0.15, delay } } : motionProps.transition}
    />
  );
}

function Ring({
  delay,
  duration = 0.7,
  fill,
  ...props
}: {
  cx: number | string;
  cy: number | string;
  r: number | string;
  delay: number;
  duration?: number;
  fill?: string;
}) {
  const mode = useContext(MotionModeContext);
  const motionProps = enter(mode, { pathLength: 0, opacity: 0 }, delay, duration);
  return (
    <motion.circle
      {...props}
      fill={fill}
      {...motionProps}
      transition={mode === "run" ? { pathLength: { duration, delay, ease: EASE }, opacity: { duration: 0.15, delay } } : motionProps.transition}
    />
  );
}

function ContactGlyph({ name }: { name: "pin" | "phone" | "mail" }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-on-brand/10" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {name === "pin" ? (
          <>
            <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
            <circle cx="12" cy="11" r="2.1" />
          </>
        ) : null}
        {name === "phone" ? <path d="M8 4.2h2.2l1.2 3-1.6 1a9.5 9.5 0 0 0 4.9 4.9l1-1.6 3 1.2V15a1.8 1.8 0 0 1-2 1.8A13.2 13.2 0 0 1 6.2 6.2 1.8 1.8 0 0 1 8 4.2Z" /> : null}
        {name === "mail" ? (
          <>
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="m4.5 7 7.5 6L19.5 7" />
          </>
        ) : null}
      </svg>
    </span>
  );
}
