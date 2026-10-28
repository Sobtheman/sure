"use client";

import { useEffect, useState } from "react";
import { shipping } from "@/lib/config";
import { useLang } from "@/components/LangProvider";
import { nav } from "@/lib/copy/nav";

// Franja superior con la promesa de compra, en movimiento continuo (se detiene al pasar el cursor).
export const ANNOUNCEMENT_HEIGHT = 32;

export default function AnnouncementBar() {
  const lang = useLang();
  const t = nav[lang];
  const items = [
    t.freeShipping,
    ...(shipping.cashOnDelivery ? [t.cashOnDelivery] : []),
    t.nationwide,
    t.delivery(shipping.deliveryDays),
  ];
  // En el HTML del servidor va una sola tira (los buscadores leen el texto una vez).
  // Al cargar se agregan las copias: cada mitad repite los mensajes para cubrir pantallas anchas
  // y la animación corre media pista y vuelve a empezar sin salto.
  const [moving, setMoving] = useState(false);
  useEffect(() => setMoving(true), []);
  const strip = moving ? [...items, ...items] : items;
  return (
    <div className="announce-bar relative h-8 overflow-hidden bg-ink text-paper" role="region" aria-label={t.announceLabel}>
      <p className="sr-only">{items.join(". ")}</p>
      <div className={`flex h-8 w-max items-center ${moving ? "marquee" : ""}`} aria-hidden>
        {(moving ? [0, 1] : [0]).map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {strip.map((text, i) => (
              <span key={i} className="flex items-center">
                <span className="label whitespace-nowrap px-6 text-[10.5px]">{text}</span>
                <span className="text-burgundy-bright">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
