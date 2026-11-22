"use client";

import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/messages";
import { useEffect, useRef, useState, type PointerEvent } from "react";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function ProductGallery({ images, alt, framed = false, locale = "tr" }: { images: string[]; alt: string; framed?: boolean; locale?: Locale }) {
  const shots = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentIndex = shots.length ? ((index % shots.length) + shots.length) % shots.length : 0;
  const current = shots[currentIndex];
  const many = shots.length > 1;
  const copy = ui(locale);

  function step(direction: -1 | 1) {
    if (shots.length < 2) return;
    setIndex((value) => (value + direction + shots.length) % shots.length);
  }

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % shots.length);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + shots.length) % shots.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shots.length]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (many && Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
      step(dx > 0 ? -1 : 1);
      return;
    }
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) setOpen(true);
  }

  if (!current) {
    return <div className="min-h-[320px] bg-stage lg:min-h-full" />;
  }

  if (framed) {
    const columns = shots.length > 5 ? 4 : shots.length;
    return (
      <div>
        <div
          className="relative aspect-[4/3] cursor-zoom-in overflow-hidden border border-line bg-paper"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <img key={current} src={current} alt={`${alt}, ${copy.imageN(currentIndex + 1)}`} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
          {many ? (
            <>
              <button
                type="button"
                aria-label={copy.previousImage}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                className="absolute top-1/2 left-3 grid h-9 w-9 -translate-y-1/2 place-items-center bg-ink text-lg leading-none text-on-brand"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label={copy.nextImage}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                className="absolute top-1/2 right-3 grid h-9 w-9 -translate-y-1/2 place-items-center bg-ink text-lg leading-none text-on-brand"
              >
                ›
              </button>
            </>
          ) : null}
          <span className="pointer-events-none absolute right-3 bottom-3 bg-ink px-2 py-1 text-[11px] font-semibold tracking-[0.14em] text-on-brand">
            {pad(currentIndex + 1)}/{pad(shots.length)}
          </span>
        </div>

        <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {shots.map((src, imageIndex) => {
            const active = imageIndex === currentIndex;
            return (
              <button
                key={`${src}-${imageIndex}`}
                type="button"
                aria-label={copy.imageN(imageIndex + 1)}
                aria-current={active ? "true" : undefined}
                onClick={() => setIndex(imageIndex)}
                className="min-w-0 text-left"
              >
                <span className={`block aspect-[5/4] overflow-hidden border-2 bg-paper ${active ? "border-brand" : "border-line"}`}>
                  <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
                </span>
                <span className={`mt-1.5 block text-[11px] leading-none ${active ? "font-semibold text-ink" : "text-muted"}`}>{copy.imageN(imageIndex + 1)}</span>
              </button>
            );
          })}
        </div>

        <dialog
          ref={dialogRef}
          aria-label={copy.galleryOf(alt)}
          className="m-0 h-full max-h-none w-full max-w-none border-0 bg-[#141618]/95 p-0 text-on-brand backdrop:bg-[#141618]/95"
          onClose={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-4 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="min-w-0 truncate text-sm font-semibold">{alt}</p>
              <p className="shrink-0 text-[12px] font-semibold tracking-[0.14em]">
                {pad(currentIndex + 1)}/{pad(shots.length)}
              </p>
              <button type="button" autoFocus aria-label={copy.closeGallery} onClick={() => setOpen(false)} className="grid h-9 w-9 shrink-0 place-items-center bg-white/10 text-lg leading-none">
                ×
              </button>
            </div>
            <div className="relative mt-4 min-h-0 flex-1">
              <img src={current} alt={`${alt}, ${copy.imageN(currentIndex + 1)}`} className="h-full w-full object-contain" />
              {many ? (
                <>
                  <button type="button" aria-label={copy.previousImage} onClick={() => step(-1)} className="absolute top-1/2 left-0 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/10 text-xl leading-none">
                    ‹
                  </button>
                  <button type="button" aria-label={copy.nextImage} onClick={() => step(1)} className="absolute top-1/2 right-0 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/10 text-xl leading-none">
                    ›
                  </button>
                </>
              ) : null}
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {shots.map((src, imageIndex) => {
                const active = imageIndex === currentIndex;
                return (
                  <button key={`lightbox-${src}-${imageIndex}`} type="button" aria-label={copy.imageN(imageIndex + 1)} aria-current={active ? "true" : undefined} onClick={() => setIndex(imageIndex)} className="w-16 shrink-0">
                    <span className={`block h-12 overflow-hidden border-2 ${active ? "border-white" : "border-transparent opacity-60"}`}>
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </dialog>
      </div>
    );
  }

  return (
    <div className="flex min-h-[420px] flex-col bg-stage sm:min-h-[520px] lg:min-h-full">
      <div className="relative min-h-[300px] flex-1">
        <img
          key={`${current}-m`}
          src={current}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover lg:hidden"
          style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <img
          key={`${current}-d`}
          src={current}
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover lg:block"
          style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
        {many ? (
          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-between px-4 sm:px-6">
            <button type="button" aria-label={copy.previousImage} onClick={() => step(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-ink/75 text-lg text-on-brand">
              ‹
            </button>
            <button type="button" aria-label={copy.nextImage} onClick={() => step(1)} className="grid h-11 w-11 place-items-center rounded-full bg-ink/75 text-lg text-on-brand">
              ›
            </button>
          </div>
        ) : null}
      </div>
      {many ? (
        <div className="flex gap-2 overflow-x-auto bg-caption px-4 py-3 [scrollbar-width:none]">
          {shots.map((src, imageIndex) => (
            <button
              key={`${src}-${imageIndex}`}
              type="button"
              aria-label={copy.imageN(imageIndex + 1)}
              aria-current={imageIndex === currentIndex}
              onClick={() => setIndex(imageIndex)}
              className={`h-16 w-[4.75rem] shrink-0 overflow-hidden border-2 bg-surface ${imageIndex === currentIndex ? "border-brand" : "border-transparent"}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
