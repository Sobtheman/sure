"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/catalog";
import Lightbox from "@/components/Lightbox";

const HOVER_ZOOM = 2.2;

// Móvil: carrusel a todo el ancho; tocar abre el visor con pellizco y doble toque.
// Escritorio: fotos apiladas; al pasar el cursor la foto se acerca en su marco y sigue al mouse,
// clic abre el visor a pantalla completa.
export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const fit = (img: ProductImage) => (img.view === "Frente" || img.view === "Espalda" ? "object-cover" : "object-cover");

  return (
    <>
      {/* Móvil y tablet */}
      <div className="relative lg:hidden">
        <div ref={track} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" aria-roledescription="carrusel">
          {images.map((img, i) => (
            <button
              key={img.src}
              className="relative aspect-[4/5] w-full shrink-0 snap-center bg-frame"
              onClick={() => setViewer(i)}
              aria-label={`Ampliar foto: ${img.view}`}
            >
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" className={fit(img)} />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-between gap-3 px-4">
          <span className="label whitespace-nowrap bg-paper/90 px-2 py-1 text-[10px]">
            {images[index]?.view} · Ampliar
          </span>
          {images.length > 1 && (
            <div className="pointer-events-auto flex bg-paper/90 px-1">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => go(i)}
                  aria-label={`Ver foto ${i + 1}: ${img.view}`}
                  aria-current={i === index ? "true" : undefined}
                  className="grid h-8 w-7 place-items-center"
                >
                  <span className={`block h-[3px] w-5 transition-colors ${i === index ? "bg-ink" : "bg-ink/25"}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Escritorio */}
      <div className="hidden gap-3 lg:grid">
        {images.map((img, i) => (
          <HoverZoom key={img.src} img={img} priority={i === 0} onOpen={() => setViewer(i)} />
        ))}
      </div>

      {viewer !== null && (
        <Lightbox
          images={images.map((i) => ({ src: i.src, alt: i.alt, width: i.width, height: i.height, label: i.view }))}
          start={viewer}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}

function HoverZoom({ img, priority, onOpen }: { img: ProductImage; priority: boolean; onOpen: () => void }) {
  const frame = useRef<HTMLButtonElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // El punto bajo el cursor queda fijo mientras la foto crece: se recorre moviendo el mouse
  const move = (e: React.MouseEvent) => {
    const b = frame.current!.getBoundingClientRect();
    const x = ((e.clientX - b.left) / b.width) * 100;
    const y = ((e.clientY - b.top) / b.height) * 100;
    if (layer.current) layer.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <figure className="relative">
      <button
        ref={frame}
        onMouseEnter={(e) => {
          move(e);
          setActive(true);
        }}
        onMouseMove={move}
        onMouseLeave={() => setActive(false)}
        onClick={onOpen}
        className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-frame"
        aria-label={`Ampliar foto: ${img.view}`}
      >
        <div
          ref={layer}
          className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: active ? `scale(${HOVER_ZOOM})` : "scale(1)" }}
        >
          <Image src={img.src} alt={img.alt} fill priority={priority} sizes="100vw" quality={90} className="object-cover" />
        </div>
      </button>
      <figcaption
        className={`label pointer-events-none absolute left-4 top-4 text-[10px] text-ink/60 transition-opacity duration-300 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        {img.view}
      </figcaption>
      <p
        className={`label pointer-events-none absolute bottom-4 left-4 bg-paper/85 px-2 py-1 text-[10px] transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        Clic para ver en pantalla completa
      </p>
    </figure>
  );
}
