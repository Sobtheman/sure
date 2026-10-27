import { shipping } from "@/lib/config";
import { formatCOP } from "@/lib/format";

// Lo que hace fácil comprar: envío, pago, tiempo y cambios
export default function SellingPoints({ className = "" }: { className?: string }) {
  const points = [
    { title: `Envío gratis desde ${formatCOP(shipping.freeFrom)}`, note: "A toda Colombia" },
    ...(shipping.cashOnDelivery ? [{ title: "Pago contra entrega", note: "Pagas cuando te llega" }] : []),
    { title: `Llega en ${shipping.deliveryDays} días hábiles o menos`, note: "Te mandamos la guía" },
    { title: "Cambios de talla sin enredos", note: `Hasta ${shipping.exchangeDays} días` },
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
