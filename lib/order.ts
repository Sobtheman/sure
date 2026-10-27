import "server-only";
import { getProduct, SIZES, type Size } from "@/lib/catalog";
import { shippingFor } from "@/lib/config";
import type { Buyer, Order } from "@/lib/payments";

const clean = (v: unknown, max = 160) => (typeof v === "string" ? v.trim().slice(0, max) : "");

type Parsed = { order: Order } | { error: string; status: number };

// Arma el pedido en el servidor: precios y stock salen del catálogo, nunca del navegador.
export function parseOrder(body: { lines?: unknown; buyer?: Record<string, unknown> }, reference: string): Parsed {
  const raw = Array.isArray(body.lines) ? body.lines.slice(0, 20) : [];
  const lines: Order["lines"] = [];
  for (const l of raw as { slug?: string; size?: string; qty?: number }[]) {
    const p = getProduct(String(l.slug));
    const size = String(l.size) as Size;
    const qty = Number(l.qty);
    if (!p || !SIZES.includes(size) || !Number.isInteger(qty) || qty < 1) {
      return { error: "Hay un producto inválido en la bolsa.", status: 400 };
    }
    const already = lines.filter((x) => x.slug === p.slug && x.size === size).reduce((n, x) => n + x.qty, 0);
    if (already + qty > p.stock[size]) {
      return { error: `${p.name} talla ${size}: ${p.stock[size] === 0 ? "agotada" : "no hay suficientes unidades"}.`, status: 409 };
    }
    lines.push({ slug: p.slug, name: p.name, size, qty, unitPrice: p.price });
  }
  if (lines.length === 0) return { error: "La bolsa está vacía.", status: 400 };

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
  if (!valid) return { error: "Revisa los datos de envío.", status: 400 };

  const subtotal = lines.reduce((n, l) => n + l.unitPrice * l.qty, 0);
  const shipping = shippingFor(subtotal);
  return { order: { reference, lines, subtotal, shipping, total: subtotal + shipping, buyer } };
}
