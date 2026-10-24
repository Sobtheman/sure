"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/config";
import { Arrow } from "@/components/icons";

// Foto de campaña a pantalla completa. Si hay film (hero.video), se reproduce
// encima de la foto con los controles del mockup: pausa, progreso y sonido.
export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const hasVideo = Boolean(hero.video);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setPlaying(false);
    }
    const onTime = () => setProgress(v.duration ? v.currentTime / v.duration : 0);
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink text-paper sm:max-h-[1000px]">
      <div className="hero-media absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-[76%_30%] sm:object-[60%_35%]"
        />
        {hasVideo && (
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover object-[76%_30%] sm:object-[60%_35%]"
            src={hero.video}
            poster={hero.image}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            aria-label={`Film de la colección ${hero.collection}`}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <div className="wrap absolute inset-x-0 bottom-0 pb-[max(2.25rem,env(safe-area-inset-bottom))] sm:pb-12">
        <p className="label rise text-white/85" style={{ animationDelay: "250ms" }}>
          {hasVideo ? "Film de colección" : "Nueva colección"}
        </p>
        <h1
          className="display rise mt-3 text-[clamp(64px,17vw,148px)] sm:mt-4"
          style={{ animationDelay: "380ms" }}
        >
          {hero.collection}
        </h1>
        <a
          href="#disponible"
          className="btn-ghost rise mt-6 h-[52px] border-white/80 px-6 text-paper hover:bg-paper hover:text-ink sm:mt-8"
          style={{ animationDelay: "520ms" }}
        >
          Comprar colección <Arrow className="text-burgundy-bright" />
        </a>

        {hasVideo && (
          <div className="mt-8 flex items-center gap-5 sm:mt-10">
            <button onClick={toggle} aria-label={playing ? "Pausar film" : "Reproducir film"} className="grid h-8 w-8 place-items-center">
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
            <div className="relative h-px flex-1 bg-white/30">
              <div className="absolute inset-y-0 left-0 bg-paper" style={{ width: `${progress * 100}%` }} />
            </div>
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Activar sonido" : "Silenciar"}
              className="grid h-8 w-8 place-items-center"
            >
              <svg viewBox="0 0 18 14" className="h-3.5 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                <path d="M1 5h3l4-3.5v11L4 9H1z" fill="currentColor" />
                {muted ? <path d="M12 4.5l5 5M17 4.5l-5 5" /> : <path d="M12 4a4.5 4.5 0 010 6M14.5 2a7.5 7.5 0 010 10" />}
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
