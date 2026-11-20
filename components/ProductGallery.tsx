"use client";

import { useState } from "react";

export function ProductGallery({ images, alt, framed = false }: { images: string[]; alt: string; framed?: boolean }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  const many = images.length > 1;

  function step(direction: -1 | 1) {
    setIndex((value) => (value + direction + images.length) % images.length);
  }

  if (!current) {
    return <div className="min-h-[320px] bg-stage lg:min-h-full" />;
  }

  return (
    <div className={`flex min-h-[420px] flex-col bg-stage sm:min-h-[520px] lg:min-h-full ${framed ? "border border-line lg:min-h-[560px]" : ""}`}>
      <div className="relative min-h-[300px] flex-1">
        <img
          key={`${current}-m`}
          src={current}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover lg:hidden"
          style={framed ? undefined : { clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <img
          key={`${current}-d`}
          src={current}
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover lg:block"
          style={framed ? undefined : { clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
        {many ? (
          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-between px-4 sm:px-6">
            <button type="button" aria-label="Önceki görsel" onClick={() => step(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-ink/75 text-lg text-on-brand">
              ‹
            </button>
            <button type="button" aria-label="Sonraki görsel" onClick={() => step(1)} className="grid h-11 w-11 place-items-center rounded-full bg-ink/75 text-lg text-on-brand">
              ›
            </button>
          </div>
        ) : null}
      </div>
      {many ? (
        <div className="flex gap-2 overflow-x-auto bg-caption px-4 py-3 [scrollbar-width:none]">
          {images.map((src, imageIndex) => (
            <button
              key={`${src}-${imageIndex}`}
              type="button"
              aria-label={`${imageIndex + 1}. görsel`}
              aria-current={imageIndex === index}
              onClick={() => setIndex(imageIndex)}
              className={`h-16 w-[4.75rem] shrink-0 overflow-hidden border-2 bg-surface ${imageIndex === index ? "border-brand" : "border-transparent"}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
