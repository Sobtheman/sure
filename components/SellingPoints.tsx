import { shipping } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { shop } from "@/lib/copy/shop";

// Lo que hace fácil comprar: envío, pago, tiempo y cambios
export default function SellingPoints({ lang, className = "" }: { lang: Lang; className?: string }) {
  const t = shop[lang].selling;
  const points = [
    { title: t.freeShipping(formatCOP(shipping.freeFrom, lang)), note: t.freeShippingNote },
    ...(shipping.cashOnDelivery ? [{ title: t.cashOnDelivery, note: t.cashOnDeliveryNote }] : []),
    { title: t.delivery(shipping.deliveryDays), note: t.deliveryNote },
    { title: t.exchanges, note: t.exchangesNote(shipping.exchangeDays) },
  ];
  return (
    <ul className={`grid grid-cols-2 gap-px border border-line bg-line ${className}`}>
      {points.map((p) => (
        <li key={p.title} className="bg-paper px-3 py-3">
          <p className="text-[12.5px] font-semibold leading-snug">{p.title}</p>
          <p className="mt-0.5 text-[12px] text-muted">{p.note}</p>
        </li>
      ))}
    </ul>
  );
}
