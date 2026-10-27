"use client";

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
  // Cada mitad repite los mensajes para cubrir pantallas anchas; la animación corre media pista y vuelve a empezar sin salto.
  const half = [...items, ...items];
  return (
    <div className="announce-bar relative h-8 overflow-hidden bg-ink text-paper" role="region" aria-label={t.announceLabel}>
      <p className="sr-only">{items.join(". ")}</p>
      <div className="marquee flex h-8 w-max items-center" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {half.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="label whitespace-nowrap px-6 text-[10.5px]">{t}</span>
                <span className="text-burgundy-bright">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
