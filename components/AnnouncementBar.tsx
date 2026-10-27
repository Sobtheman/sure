import { shipping } from "@/lib/config";
import { formatCOP } from "@/lib/format";

// Franja superior con la promesa de compra. En celular rota entre mensajes.
export const ANNOUNCEMENT_HEIGHT = 32;

export default function AnnouncementBar() {
  const items = [
    `Envío gratis desde ${formatCOP(shipping.freeFrom)}`,
    ...(shipping.cashOnDelivery ? ["Pago contra entrega"] : []),
    "Envíos a toda Colombia",
  ];
  return (
    <div className="relative h-8 overflow-hidden bg-ink text-paper" role="region" aria-label="Envíos y pagos">
      {/* Escritorio: todo en una línea */}
      <p className="label hidden h-8 items-center justify-center gap-6 whitespace-nowrap text-[10.5px] md:flex">
        {items.map((t, i) => (
          <span key={t} className="flex items-center gap-6">
            {i > 0 && <span className="text-burgundy-bright" aria-hidden>·</span>}
            {t}
          </span>
        ))}
      </p>
      {/* Celular: un mensaje a la vez */}
      <ul className="announce md:hidden" aria-live="off">
        {items.map((t) => (
          <li key={t} className="label flex h-8 items-center justify-center text-[10px]">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
