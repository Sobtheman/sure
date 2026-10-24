"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/catalog";
import { Close } from "@/components/icons";

// Móvil: carrusel a todo el ancho con deslizamiento. Escritorio: fotos apiladas.
// Tocar una foto la abre a pantalla completa.
export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (zoom === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom]);

  const go = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <>
      {/* Móvil y tablet */}
      <div className="relative lg:hidden">
        <div ref={track} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" aria-roledescription="carrusel">
          {images.map((img, i) => (
            <button
              key={img.src}
              className="relative aspect-[4/5] w-full shrink-0 snap-center bg-frame"
              onClick={() => setZoom(i)}
              aria-label={`Ampliar foto: ${img.view}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-between px-4">
            <span className="label rounded-sm bg-paper/85 px-2 py-1 text-[10px]">{images[index]?.view}</span>
            <div className="pointer-events-auto flex gap-1.5">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => go(i)}
                  aria-label={`Ver foto ${i + 1}: ${img.view}`}
                  className={`h-[3px] w-6 transition-colors ${i === index ? "bg-ink" : "bg-ink/25"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Escritorio */}
      <div className="hidden gap-3 lg:grid">
        {images.map((img, i) => (
          <figure key={img.src} className="relative">
            <button
              className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-frame"
              onClick={() => setZoom(i)}
              aria-label={`Ampliar foto: ${img.view}`}
            >
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="58vw" className="object-cover" />
            </button>
            <figcaption className="label absolute left-4 top-4 text-[10px] text-ink/60">{img.view}</figcaption>
          </figure>
        ))}
      </div>

      {zoom !== null && (
        <div role="dialog" aria-modal="true" aria-label="Foto ampliada" className="fixed inset-0 z-[70] bg-frame">
          <Image src={images[zoom].src} alt={images[zoom].alt} fill sizes="100vw" className="object-contain" />
          <button
            autoFocus
            onClick={() => setZoom(null)}
            className="absolute right-3 top-3 grid h-12 w-12 place-items-center bg-paper"
            aria-label="Cerrar foto"
          >
            <Close />
          </button>
          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setZoom(i)}
                  className={`label bg-paper px-3 py-2 text-[10px] ${i === zoom ? "" : "opacity-50"}`}
                >
                  {img.view}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
