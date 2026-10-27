"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/config";
import { asset } from "@/lib/asset";
import { Arrow } from "@/components/icons";

// Film de la colección a pantalla completa, sin audio, con pausa y progreso.
// Con movimiento reducido o ahorro de datos se queda en el póster con botón de reproducir.
export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as any).connection?.saveData === true;
    setSrc(asset(window.innerWidth >= 900 ? hero.film.desktop : hero.film.mobile));
    if (reduce || saveData) return;
    setPlaying(true);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v || !src) return;
    if (playing) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing, src]);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink text-paper sm:max-h-[1000px]">
      <div className="hero-media absolute inset-0">
        <Image src={hero.poster} alt={hero.posterAlt} fill priority sizes="100vw" quality={80} className="object-cover object-[60%_40%]" />
        {src && (
          <video
            ref={video}
            src={src}
            muted
            loop
            playsInline
            preload={playing ? "auto" : "none"}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              setProgress(v.duration ? v.currentTime / v.duration : 0);
            }}
            className="absolute inset-0 h-full w-full object-cover object-[60%_40%]"
            aria-label={`Film de la colección ${hero.collection}`}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <div className="wrap absolute inset-x-0 bottom-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-10">
        <p className="label rise text-white/85" style={{ animationDelay: "250ms" }}>
          Nueva colección
        </p>
        <h1 className="display rise mt-3 text-[clamp(64px,17vw,148px)] sm:mt-4" style={{ animationDelay: "380ms" }}>
          {hero.collection}
        </h1>
        <p className="rise mt-3 text-[15px] text-white/85 sm:mt-4 sm:text-[17px]" style={{ animationDelay: "450ms" }}>
          Camiseta y hoodie · Envíos a toda Colombia
        </p>
        <a
          href="#disponible"
          className="btn-ghost rise mt-6 h-[52px] border-white/80 px-6 text-paper hover:bg-paper hover:text-ink sm:mt-7"
          style={{ animationDelay: "520ms" }}
        >
          Comprar colección <Arrow className="text-burgundy-bright" />
        </a>

        <div className="mt-7 flex items-center gap-4 sm:mt-9">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pausar film" : "Reproducir film"}
            className="-ml-2 grid h-10 w-10 place-items-center"
          >
            {playing ? (
              <svg viewBox="0 0 10 12" className="h-3 w-3" fill="currentColor" aria-hidden>
                <rect width="3" height="12" />
                <rect x="7" width="3" height="12" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 12" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M0 0l10 6-10 6z" />
              </svg>
            )}
          </button>
          <div
            className="relative h-px flex-1 bg-white/30"
            role="progressbar"
            aria-label="Avance del film"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div className="absolute inset-y-0 left-0 bg-paper" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
