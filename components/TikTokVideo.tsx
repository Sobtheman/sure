"use client";

import { useEffect, useRef, useState } from "react";
import { store } from "@/lib/config";
import { asset } from "@/lib/asset";
import { TikTok } from "@/components/icons";
import { useLang } from "@/components/LangProvider";
import { storyCopy } from "@/lib/copy/story";

const SRC = "/media/historia/sure-primer-ano.mp4";
const POSTER = "/media/historia/sure-primer-ano.jpg";

// Video de TikTok de la marca, servido desde el sitio. Corre solo y sin sonido mientras está en pantalla;
// tocarlo abre el video en TikTok. El botón de la esquina activa el sonido sin salir de la página.
// Con preload="none" el archivo no se descarga hasta que el video entra en pantalla; con "reducir movimiento" no arranca solo.
export default function TikTokVideo({ className = "" }: { className?: string }) {
  const lang = useLang();
  const t = storyCopy[lang].video;
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = box.current;
    const v = video.current;
    if (!el || !v) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (still) return;
        if (e.intersectionRatio >= 0.4) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  return (
    <div ref={box} className={`relative aspect-[9/16] w-full overflow-hidden bg-white/5 ${className}`}>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster={asset(POSTER)}
        src={asset(SRC)}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <a
        href={store.tiktokVideo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.label}
        className="group absolute inset-0 flex items-end p-4 text-paper"
      >
        <span className="label inline-flex items-center gap-2 text-[10.5px]">
          <TikTok className="h-4 w-4" />
          <span className="link-line">{t.watch} · @surewearco</span>
        </span>
      </a>
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? t.soundOn : t.soundOff}
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-paper backdrop-blur-sm transition-colors hover:bg-black/70"
      >
        <Speaker muted={muted} />
      </button>
    </div>
  );
}

function Speaker({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
      {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />}
    </svg>
  );
}
