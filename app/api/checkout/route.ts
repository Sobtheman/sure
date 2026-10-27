import { NextResponse } from "next/server";
import { getProduct, SIZES, type Size } from "@/lib/catalog";
import { shippingFor } from "@/lib/config";
import { activeProvider, newReference, paymentUrl, type Buyer, type Order } from "@/lib/payments";

export const dynamic = "force-dynamic";

const clean = (v: unknown, max = 160) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Recalcula el pedido en el servidor: precios y stock salen del catálogo, nunca del navegador.
export async function POST(req: Request) {
  let body: { lines?: unknown; buyer?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const raw = Array.isArray(body.lines) ? body.lines.slice(0, 20) : [];
  const lines: Order["lines"] = [];
  for (const l of raw as { slug?: string; size?: string; qty?: number }[]) {
    const p = getProduct(String(l.slug));
    const size = String(l.size) as Size;
    const qty = Number(l.qty);
    if (!p || !SIZES.includes(size) || !Number.isInteger(qty) || qty < 1) {
      return NextResponse.json({ error: "Hay un producto inválido en la bolsa." }, { status: 400 });
    }
    const already = lines.filter((x) => x.slug === p.slug && x.size === size).reduce((n, x) => n + x.qty, 0);
    if (already + qty > p.stock[size]) {
      return NextResponse.json(
        { error: `${p.name} talla ${size}: ${p.stock[size] === 0 ? "agotada" : "no hay suficientes unidades"}.` },
        { status: 409 }
      );
    }
    lines.push({ slug: p.slug, name: p.name, size, qty, unitPrice: p.price });
  }
  if (lines.length === 0) return NextResponse.json({ error: "La bolsa está vacía." }, { status: 400 });

  const b = body.buyer || {};
  const buyer: Buyer = {
    name: clean(b.name, 80),
    legalId: clean(b.legalId, 40).replace(/\D/g, "").slice(0, 11),
    email: clean(b.email, 120).toLowerCase(),
    phone: clean(b.phone, 40).replace(/\D/g, "").replace(/^57(?=3\d{9}$)/, ""),
    region: clean(b.region, 60),
    city: clean(b.city, 60),
    address: clean(b.address, 160),
    notes: clean(b.notes, 200),
  };
  const valid =
    buyer.name.length >= 3 &&
    /^\d{5,11}$/.test(buyer.legalId) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email) &&
    /^3\d{9}$/.test(buyer.phone) &&
    buyer.region &&
    buyer.city &&
    buyer.address.length >= 5;
  if (!valid) return NextResponse.json({ error: "Revisa los datos de envío." }, { status: 400 });

  const subtotal = lines.reduce((n, l) => n + l.unitPrice * l.qty, 0);
  const order: Order = {
    reference: newReference(),
    lines,
    subtotal,
    shipping: shippingFor(subtotal),
    total: subtotal + shippingFor(subtotal),
    buyer,
  };

  if (!activeProvider()) {
    return NextResponse.json({ mode: "manual", reference: order.reference, total: order.total });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  try {
    const url = await paymentUrl(order, `${origin}/pedido?ref=${encodeURIComponent(order.reference)}`);
    return NextResponse.json({ mode: "redirect", url, reference: order.reference });
  } catch {
    return NextResponse.json({ error: "No pudimos conectar con la pasarela de pago. Intenta de nuevo." }, { status: 502 });
  }
}
