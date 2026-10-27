"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/config";
import { asset } from "@/lib/asset";
import { Arrow } from "@/components/icons";
import { useLang } from "@/components/LangProvider";
import { shop } from "@/lib/copy/shop";

// Film de la colección a pantalla completa, sin audio ni controles a la vista. Arranca solo al cargar la página.
// Sin el atributo autoplay a propósito: con él, el iPhone en bajo consumo dibuja su propio botón de play.
// Si el navegador bloquea la reproducción, el film arranca con el primer toque, tecla o scroll.
// La pausa solo aparece al llegar con el teclado (accesibilidad).
const WAKE = ["touchend", "pointerdown", "click", "keydown", "scroll"] as const;

export default function Hero() {
  const lang = useLang();
  const t = shop[lang].hero;
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(true);

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
        <Image src={hero.poster} alt={hero.posterAlt[lang]} fill priority sizes="100vw" quality={80} className="object-cover object-[60%_40%]" />
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="auto"
          // Póster transparente: algunos navegadores de apps (Android) ponen un play gris si no hay póster
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          className="absolute inset-0 h-full w-full object-cover object-[60%_40%]"
          aria-label={t.filmLabel(hero.collection)}
        >
          <source src={asset(hero.film.mobile)} type="video/mp4" media="(max-width: 899px)" />
          <source src={asset(hero.film.desktop)} type="video/mp4" />
        </video>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <div className="wrap absolute inset-x-0 bottom-0 pb-[max(2.25rem,env(safe-area-inset-bottom))] sm:pb-14">
        <p className="label rise text-white/85" style={{ animationDelay: "250ms" }}>
          {t.kicker}
        </p>
        <h1 className="display rise mt-3 text-[clamp(44px,14vw,148px)] sm:mt-4" style={{ animationDelay: "380ms" }}>
          {hero.collection}
        </h1>
        <p className="rise mt-3 text-[15px] text-white/85 sm:mt-4 sm:text-[17px]" style={{ animationDelay: "450ms" }}>
          {t.tagline}
        </p>
        <a
          href="#disponible"
          className="btn-ghost rise mt-6 h-[52px] border-white/80 px-6 text-paper hover:bg-paper hover:text-ink sm:mt-7"
          style={{ animationDelay: "520ms" }}
        >
          {t.cta} <Arrow className="text-burgundy-bright" />
        </a>
      </div>
      <button
        onClick={toggle}
        aria-label={playing ? t.pause : t.play}
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:right-4 focus-visible:top-[calc(var(--bar-h)+var(--nav-h)+12px)] focus-visible:grid focus-visible:h-11 focus-visible:w-11 focus-visible:place-items-center focus-visible:bg-ink/70"
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
    </section>
  );
}
