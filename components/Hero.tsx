"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/config";
import { asset } from "@/lib/asset";
import { Arrow } from "@/components/icons";

// Film de la colección a pantalla completa, sin audio. Arranca solo desde el HTML, sin botón de play.
// Si el navegador bloquea el autoplay (iPhone en bajo consumo), arranca con el primer toque, tecla o scroll.
const WAKE = ["touchend", "pointerdown", "click", "keydown", "scroll"] as const;

export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    const wake = () => {
      if (v.paused && !userPaused.current) v.play().catch(() => {});
    };
    const stopWaking = () => WAKE.forEach((e) => window.removeEventListener(e, wake));
    const onPlaying = () => {
      setStarted(true);
      setPlaying(true);
      stopWaking();
    };
    const onPause = () => setPlaying(false);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    if (!v.paused && v.currentTime > 0) onPlaying();
    else {
      WAKE.forEach((e) => window.addEventListener(e, wake, { passive: true }));
      v.play().catch(() => {});
    }
    return () => {
      stopWaking();
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink text-paper sm:max-h-[1000px]">
      <div className="hero-media absolute inset-0">
        <Image src={hero.poster} alt={hero.posterAlt} fill priority sizes="100vw" quality={80} className="object-cover object-[60%_40%]" />
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            setProgress(v.duration ? v.currentTime / v.duration : 0);
          }}
          className="absolute inset-0 h-full w-full object-cover object-[60%_40%]"
          aria-label={`Film de la colección ${hero.collection}`}
        >
          <source src={asset(hero.film.desktop)} type="video/mp4" media="(min-width: 900px)" />
          <source src={asset(hero.film.mobile)} type="video/mp4" />
        </video>
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

        <div className={`mt-7 flex items-center gap-4 transition-opacity duration-500 sm:mt-9 ${started ? "opacity-100" : "invisible opacity-0"}`}>
          <button
            onClick={toggle}
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
