"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/catalog";
import Lightbox from "@/components/Lightbox";
import { useLang } from "@/components/LangProvider";
import { shop } from "@/lib/copy/shop";

const HOVER_ZOOM = 1.75;

// Móvil: carrusel a todo el ancho; tocar abre el visor con pellizco y doble toque.
// Escritorio: fotos apiladas; al pasar el cursor la foto se acerca en su marco y sigue al mouse,
// clic abre el visor a pantalla completa.
// Si el producto tiene clip, va de primero (sin audio, en bucle); las fotos siguen después y son las que abren el visor.
export default function ProductGallery({ images, video }: { images: ProductImage[]; video?: string }) {
  const lang = useLang();
  const t = shop[lang].gallery;
  const viewLabel = shop[lang].viewLabel;
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const offset = video ? 1 : 0;
  const slides = images.length + offset;
  const slideLabel = (i: number) => (video && i === 0 ? t.video : viewLabel[images[i - offset]?.view]);

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
        <div ref={track} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" aria-roledescription={t.carousel}>
          {video && (
            <div className="relative aspect-[4/5] w-full shrink-0 snap-center bg-frame">
              <Clip src={video} poster={images[0]?.src} />
            </div>
          )}
          {images.map((img, i) => (
            <button
              key={img.src}
              className="relative aspect-[4/5] w-full shrink-0 snap-center bg-frame"
              onClick={() => setViewer(i)}
              aria-label={t.zoomPhoto(viewLabel[img.view])}
            >
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" className={fit(img)} />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-between gap-3 px-4">
          <span className="label whitespace-nowrap bg-paper/90 px-2 py-1 text-[10px]">
            {slideLabel(index)}
            {!(video && index === 0) && ` · ${t.zoomChip}`}
          </span>
          {/* Con muchas fotos los puntos no caben en un celular angosto: se muestra el contador */}
          {slides > 5 && (
            <span className="label whitespace-nowrap bg-paper/90 px-2 py-1 text-[10px] tabular-nums" aria-live="polite">
              {index + 1} / {slides}
            </span>
          )}
          {slides > 1 && slides <= 5 && (
            <div className="pointer-events-auto flex bg-paper/90 px-1">
              {Array.from({ length: slides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={t.viewPhoto(i + 1, slideLabel(i))}
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
        {video && (
          <figure className="relative aspect-[4/5] w-full overflow-hidden bg-frame">
            <Clip src={video} poster={images[0]?.src} />
            <figcaption className="label pointer-events-none absolute left-4 top-4 text-[10px] text-paper/80">{t.video}</figcaption>
          </figure>
        )}
        {images.map((img, i) => (
          <HoverZoom key={img.src} img={img} priority={i === 0} onOpen={() => setViewer(i)} />
        ))}
      </div>

      {viewer !== null && (
        <Lightbox
          images={images.map((i) => ({ src: i.src, alt: i.alt, width: i.width, height: i.height, label: viewLabel[i.view] }))}
          start={viewer}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}

function HoverZoom({ img, priority, onOpen }: { img: ProductImage; priority: boolean; onOpen: () => void }) {
  const lang = useLang();
  const t = shop[lang].gallery;
  const view = shop[lang].viewLabel[img.view];
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
        aria-label={t.zoomPhoto(view)}
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
        {view}
      </figcaption>
      <p
        className={`label pointer-events-none absolute bottom-4 left-4 bg-paper/85 px-2 py-1 text-[10px] transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {t.fullscreen}
      </p>
    </figure>
  );
}

// Clip del producto: sin audio, en bucle y sin controles. Arranca solo; si el navegador no deja, queda la primera foto.
function Clip({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-hidden />;
}
