import { NextResponse } from "next/server";
import { activeProvider, newReference, paymentUrl } from "@/lib/payments";
import { parseOrder } from "@/lib/order";

export const dynamic = "force-dynamic";

// Pago en línea: el pedido se recalcula en el servidor y se manda a la pasarela.
export async function POST(req: Request) {
  let body: { lines?: unknown; buyer?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = parseOrder(body, newReference());
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  const { order } = parsed;

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
