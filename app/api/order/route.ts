import { NextResponse } from "next/server";
import { parseOrder } from "@/lib/order";
import { sendOrderEmail } from "@/lib/orderEmail";

export const dynamic = "force-dynamic";

const METHODS: Record<string, string> = {
  contraentrega: "Contra entrega",
  confirmar: "Confirmar el pago por WhatsApp",
};

// Pedido por WhatsApp: el navegador abre el chat y aquí se manda la copia al correo de SURE.
export async function POST(req: Request) {
  let body: { lines?: unknown; buyer?: Record<string, unknown>; reference?: unknown; method?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const reference = typeof body.reference === "string" && /^SURE-[A-Z0-9]{4,16}$/.test(body.reference) ? body.reference : null;
  const payment = METHODS[String(body.method)];
  if (!reference || !payment) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });

  const parsed = parseOrder(body, reference);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: parsed.status });

  try {
    const result = await sendOrderEmail(parsed.order, payment, new URL(req.url).origin);
    if (!result.sent) console.error("Correo de pedido no enviado:", result.reason);
    return NextResponse.json({ ok: true, emailed: result.sent });
  } catch (err) {
    console.error("Correo de pedido no enviado:", err);
    return NextResponse.json({ ok: true, emailed: false });
  }
}
