import "server-only";
import { createHash, randomBytes } from "crypto";

/* Pasarelas de pago. Se activan solo con variables de entorno:

   PAYMENT_PROVIDER=wompi        WOMPI_PUBLIC_KEY, WOMPI_INTEGRITY_SECRET
   PAYMENT_PROVIDER=mercadopago  MP_ACCESS_TOKEN

   Sin ellas el checkout muestra que los pagos en línea no están activos y
   ofrece enviar el pedido por Instagram. Nada se cobra en ese modo. */

export type Provider = "wompi" | "mercadopago";

export type Buyer = {
  name: string;
  legalId: string;
  email: string;
  phone: string;
  region: string;
  city: string;
  address: string;
  notes: string;
};

export type OrderLine = { slug: string; name: string; size: string; qty: number; unitPrice: number };

export type Order = {
  reference: string;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  buyer: Buyer;
};

export function activeProvider(): Provider | null {
  const p = process.env.PAYMENT_PROVIDER;
  if (p === "wompi" && process.env.WOMPI_PUBLIC_KEY && process.env.WOMPI_INTEGRITY_SECRET) return "wompi";
  if (p === "mercadopago" && process.env.MP_ACCESS_TOKEN) return "mercadopago";
  return null;
}

export function isTestMode() {
  const p = activeProvider();
  if (p === "wompi") return process.env.WOMPI_PUBLIC_KEY!.startsWith("pub_test_");
  if (p === "mercadopago") return process.env.MP_ACCESS_TOKEN!.startsWith("TEST-");
  return false;
}

export function newReference() {
  const t = Date.now().toString(36).toUpperCase();
  return `SURE-${t}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

/* Wompi Web Checkout: redirección con firma de integridad
   SHA256(referencia + monto en centavos + moneda + secreto de integridad). */
function wompiUrl(order: Order, returnUrl: string) {
  const amount = String(order.total * 100);
  const currency = "COP";
  const signature = createHash("sha256")
    .update(`${order.reference}${amount}${currency}${process.env.WOMPI_INTEGRITY_SECRET}`)
    .digest("hex");
  const b = order.buyer;
  const q = new URLSearchParams({
    "public-key": process.env.WOMPI_PUBLIC_KEY!,
    currency,
    "amount-in-cents": amount,
    reference: order.reference,
    "signature:integrity": signature,
    "redirect-url": returnUrl,
    "customer-data:email": b.email,
    "customer-data:full-name": b.name,
    "customer-data:phone-number": b.phone,
    "customer-data:phone-number-prefix": "+57",
    "customer-data:legal-id": b.legalId,
    "customer-data:legal-id-type": "CC",
    "shipping-address:address-line-1": b.address,
    "shipping-address:country": "CO",
    "shipping-address:city": b.city,
    "shipping-address:region": b.region,
    "shipping-address:phone-number": b.phone,
    "shipping-address:name": b.name,
  });
  return `https://checkout.wompi.co/p/?${q.toString()}`;
}

/* Mercado Pago Checkout Pro: crea una preferencia y devuelve su init_point. */
async function mercadoPagoUrl(order: Order, returnUrl: string) {
  const b = order.buyer;
  const [first, ...rest] = b.name.split(" ");
  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": order.reference,
    },
    body: JSON.stringify({
      items: order.lines.map((l) => ({
        id: `${l.slug}-${l.size}`,
        title: `${l.name} · Talla ${l.size}`,
        quantity: l.qty,
        unit_price: l.unitPrice,
        currency_id: "COP",
      })),
      payer: {
        name: first,
        surname: rest.join(" "),
        email: b.email,
        phone: { area_code: "57", number: b.phone },
        identification: { type: "CC", number: b.legalId },
        address: { street_name: b.address },
      },
      shipments: { cost: order.shipping, mode: "not_specified" },
      back_urls: { success: returnUrl, pending: returnUrl, failure: returnUrl },
      auto_return: "approved",
      external_reference: order.reference,
      statement_descriptor: "SURE",
    }),
  });
  if (!res.ok) throw new Error(`Mercado Pago respondió ${res.status}`);
  const data = await res.json();
  return (isTestMode() ? data.sandbox_init_point : data.init_point) as string;
}

export async function paymentUrl(order: Order, returnUrl: string) {
  const p = activeProvider();
  if (p === "wompi") return wompiUrl(order, returnUrl);
  if (p === "mercadopago") return mercadoPagoUrl(order, returnUrl);
  throw new Error("Sin pasarela activa");
}

export type PaymentStatus = "approved" | "pending" | "declined" | "unknown";

/* Consulta el estado real de la transacción con la pasarela (no confía en la URL). */
export async function verifyPayment(params: Record<string, string | undefined>): Promise<{
  status: PaymentStatus;
  reference?: string;
}> {
  const p = activeProvider();
  try {
    if (p === "wompi" && params.id) {
      const host = isTestMode() ? "https://sandbox.wompi.co" : "https://production.wompi.co";
      const res = await fetch(`${host}/v1/transactions/${encodeURIComponent(params.id)}`, { cache: "no-store" });
      if (!res.ok) return { status: "unknown" };
      const { data } = await res.json();
      const map: Record<string, PaymentStatus> = { APPROVED: "approved", PENDING: "pending", DECLINED: "declined", VOIDED: "declined", ERROR: "declined" };
      return { status: map[data.status] ?? "unknown", reference: data.reference };
    }
    if (p === "mercadopago" && params.payment_id) {
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(params.payment_id)}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
        cache: "no-store",
      });
      if (!res.ok) return { status: "unknown" };
      const data = await res.json();
      const map: Record<string, PaymentStatus> = {
        approved: "approved",
        pending: "pending",
        in_process: "pending",
        authorized: "pending",
        rejected: "declined",
        cancelled: "declined",
        refunded: "declined",
      };
      return { status: map[data.status] ?? "unknown", reference: data.external_reference };
    }
  } catch {}
  return { status: "unknown" };
}

export const providerLabel: Record<Provider, { name: string; methods: string }> = {
  wompi: { name: "Wompi", methods: "PSE, Nequi, tarjetas, Bancolombia" },
  mercadopago: { name: "Mercado Pago", methods: "PSE, tarjetas, Efecty" },
};
