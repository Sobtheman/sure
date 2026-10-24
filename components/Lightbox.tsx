"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Close } from "@/components/icons";

export type ViewerImage = { src: string; alt: string; label?: string };

const MAX = 4;
const CLICK_ZOOM = 2.5;

/* Visor a pantalla completa.
   Escritorio: clic acerca en ese punto, mover el mouse recorre la prenda, otro clic aleja.
   Táctil: pellizcar o doble toque para acercar, arrastrar para recorrer, deslizar para cambiar de foto. */
export default function Lightbox({
  images,
  start,
  onClose,
  dark = false,
}: {
  images: ViewerImage[];
  start: number;
  onClose: () => void;
  dark?: boolean;
}) {
  const [index, setIndex] = useState(start);
  const [zoomed, setZoomed] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const t = useRef({ s: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ startDist: 0, startS: 1, startX: 0, startY: 0, midX: 0, midY: 0, downX: 0, downY: 0, downT: 0, moved: false, swipe: 0 });
  const lastTap = useRef(0);
  const animate = useRef(true);

  const apply = useCallback(() => {
    const el = layer.current;
    if (!el) return;
    el.style.transition = animate.current ? "transform 0.35s cubic-bezier(0.22,1,0.36,1)" : "none";
    el.style.transform = `translate3d(${t.current.x}px, ${t.current.y}px, 0) scale(${t.current.s})`;
    setZoomed(t.current.s > 1.01);
  }, []);

  const clamp = useCallback(() => {
    const b = box.current?.getBoundingClientRect();
    if (!b) return;
    const s = t.current.s;
    const mx = (b.width * (s - 1)) / 2;
    const my = (b.height * (s - 1)) / 2;
    t.current.x = Math.max(-mx, Math.min(mx, t.current.x));
    t.current.y = Math.max(-my, Math.min(my, t.current.y));
  }, []);

  const reset = useCallback(() => {
    t.current = { s: 1, x: 0, y: 0 };
    animate.current = true;
    apply();
  }, [apply]);

  // Acerca para que el punto (cx, cy) de la pantalla quede donde estaba
  const zoomAt = useCallback(
    (cx: number, cy: number, s: number) => {
      const b = box.current!.getBoundingClientRect();
      const ox = cx - (b.left + b.width / 2);
      const oy = cy - (b.top + b.height / 2);
      const k = s / t.current.s;
      t.current.x = ox - (ox - t.current.x) * k;
      t.current.y = oy - (oy - t.current.y) * k;
      t.current.s = s;
      clamp();
      apply();
    },
    [apply, clamp]
  );

  const go = useCallback(
    (d: number) => {
      reset();
      setIndex((i) => (i + d + images.length) % images.length);
    },
    [images.length, reset]
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) go(1);
      if (e.key === "ArrowLeft" && images.length > 1) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose, images.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (pointers.current.size === 1) {
      Object.assign(g, { downX: e.clientX, downY: e.clientY, downT: Date.now(), moved: false, startX: t.current.x, startY: t.current.y, swipe: 0 });
    }
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      Object.assign(g, {
        startDist: Math.hypot(a.x - b.x, a.y - b.y),
        startS: t.current.s,
        midX: (a.x + b.x) / 2,
        midY: (a.y + b.y) / 2,
        moved: true,
      });
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    // Mouse sin botón presionado y con zoom: el recorrido sigue al cursor
    if (e.pointerType === "mouse" && !pointers.current.has(e.pointerId)) {
      if (t.current.s > 1.01) {
        const b = box.current!.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width - 0.5;
        const py = (e.clientY - b.top) / b.height - 0.5;
        t.current.x = -px * b.width * (t.current.s - 1);
        t.current.y = -py * b.height * (t.current.s - 1);
        animate.current = false;
        apply();
      }
      return;
    }
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    animate.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const s = Math.max(1, Math.min(MAX, (g.startS * dist) / g.startDist));
      zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, s);
      return;
    }
    const dx = e.clientX - g.downX;
    const dy = e.clientY - g.downY;
    if (Math.abs(dx) + Math.abs(dy) > 6) g.moved = true;
    if (e.pointerType === "mouse") return;
    if (t.current.s > 1.01) {
      t.current.x = g.startX + dx;
      t.current.y = g.startY + dy;
      clamp();
      apply();
    } else if (images.length > 1) {
      g.swipe = dx;
      if (layer.current) {
        layer.current.style.transition = "none";
        layer.current.style.transform = `translate3d(${dx * 0.6}px,0,0)`;
      }
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    const wasPinch = pointers.current.size > 1;
    pointers.current.delete(e.pointerId);
    if (wasPinch) {
      if (pointers.current.size === 1) {
        const [p] = Array.from(pointers.current.values());
        Object.assign(g, { downX: p.x, downY: p.y, startX: t.current.x, startY: t.current.y });
      }
      return;
    }
    animate.current = true;
    if (Math.abs(g.swipe) > 60 && t.current.s <= 1.01) {
      go(g.swipe < 0 ? 1 : -1);
      return;
    }
    if (g.swipe) {
      g.swipe = 0;
      apply();
    }
    if (g.moved) return;
    // Toque o clic sin arrastre
    if (e.pointerType === "mouse") {
      if (t.current.s > 1.01) reset();
      else zoomAt(e.clientX, e.clientY, CLICK_ZOOM);
      return;
    }
    const now = Date.now();
    if (now - lastTap.current < 300) {
      lastTap.current = 0;
      if (t.current.s > 1.01) reset();
      else zoomAt(e.clientX, e.clientY, CLICK_ZOOM);
    } else {
      lastTap.current = now;
    }
  };

  const img = images[index];
  const tone = dark ? "bg-ink text-paper" : "bg-frame text-ink";
  const chip = dark ? "bg-white/10 text-paper" : "bg-paper text-ink";

  return (
    <div role="dialog" aria-modal="true" aria-label="Foto ampliada" className={`fixed inset-0 z-[70] ${tone}`}>
      <div
        ref={box}
        className={`absolute inset-0 touch-none select-none overflow-hidden ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={layer} className="absolute inset-0 will-change-transform">
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            quality={90}
            priority
            draggable={false}
            className="pointer-events-none object-contain"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3">
        <span className={`label pointer-events-auto px-3 py-2 text-[10px] ${chip}`}>
          {img.label ? `${img.label} · ` : ""}
          {index + 1} / {images.length}
        </span>
        <button
          autoFocus
          onClick={onClose}
          className={`pointer-events-auto grid h-12 w-12 place-items-center ${chip}`}
          aria-label="Cerrar"
        >
          <Close />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className={`absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center sm:grid ${chip}`}
          >
            <svg viewBox="0 0 10 16" className="h-4 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M8 1L2 8l6 7" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Foto siguiente"
            className={`absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center sm:grid ${chip}`}
          >
            <svg viewBox="0 0 10 16" className="h-4 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M2 1l6 7-6 7" />
            </svg>
          </button>
        </>
      )}

      <p className={`label pointer-events-none absolute inset-x-0 bottom-5 text-center text-[10px] ${dark ? "text-white/60" : "text-ink/55"}`}>
        <span className="hidden sm:inline">{zoomed ? "Mueve el mouse para recorrer · clic para alejar" : "Clic para acercar"}</span>
        <span className="sm:hidden">{zoomed ? "Arrastra para recorrer · doble toque para alejar" : "Pellizca o toca dos veces para acercar"}</span>
      </p>
    </div>
  );
}
