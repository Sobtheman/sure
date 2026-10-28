import "server-only";
import { getProduct } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import type { Order } from "@/lib/payments";
import type { Lang } from "@/lib/i18n";

/* Copia de cada pedido por WhatsApp al correo de SURE, con Resend.
   Variables: RESEND_API_KEY (sin ella no se envía nada), ORDER_EMAIL_TO, ORDER_EMAIL_FROM. */
const TO = process.env.ORDER_EMAIL_TO || "sureweareco@gmail.com";
const FROM = process.env.ORDER_EMAIL_FROM || "SURE Pedidos <pedidos@surewear.co>";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const LABEL = `font:700 11px/1.4 ${FONT};letter-spacing:.14em;text-transform:uppercase;color:#6e6e6c;margin:0`;

// lang: idioma en el que compró el cliente (el correo a SURE siempre va en español)
export function orderEmail(order: Order, payment: string, origin: string, lang: Lang = "es") {
  const { buyer } = order;
  const when = new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeStyle: "short", timeZone: "America/Bogota" }).format(new Date());
  const first = buyer.name.split(" ")[0];
  const reply = lang === "en" ? `Hi ${first}, this is SURE about your order ${order.reference}.` : `Hola ${first}, te escribimos de SURE por tu pedido ${order.reference}.`;
  const chat = `https://wa.me/57${buyer.phone}?text=${encodeURIComponent(reply)}`;
  const units = order.lines.reduce((n, l) => n + l.qty, 0);
  const transfer = payment.startsWith("Transferencia");

  const rows = order.lines
    .map((l) => {
      const p = getProduct(l.slug);
      const img = p ? `${origin}${p.images[0].src}` : "";
      return `<tr>
  <td width="64" style="padding:14px 14px 14px 0;border-bottom:1px solid #e4e4e1;vertical-align:top">
    ${img ? `<img src="${img}" width="64" height="96" alt="" style="display:block;width:64px;height:96px;border:0;background:#dcdcdb">` : ""}
  </td>
  <td style="padding:14px 0;border-bottom:1px solid #e4e4e1;vertical-align:top;font:14px/1.45 ${FONT};color:#0d0e10">
    <b style="text-transform:uppercase">${esc(l.name)}</b><br>
    <span style="color:#6e6e6c">${esc(p?.color || "")} · Talla ${esc(l.size)} · ${l.qty} ${l.qty === 1 ? "unidad" : "unidades"}</span>
  </td>
  <td align="right" style="padding:14px 0;border-bottom:1px solid #e4e4e1;vertical-align:top;font:14px/1.45 ${FONT};color:#0d0e10;white-space:nowrap">${formatCOP(l.unitPrice * l.qty)}</td>
</tr>`;
    })
    .join("");

  const total = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:4px 0;font:${strong ? "700 17px" : "14px"}/1.5 ${FONT};color:${strong ? "#0d0e10" : "#6e6e6c"}">${label}</td>
<td align="right" style="padding:4px 0;font:${strong ? "700 17px" : "14px"}/1.5 ${FONT};color:#0d0e10">${value}</td></tr>`;

  const bg = `${origin}/email/fondo.jpg`;
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="light only"><title>Nuevo pedido ${esc(order.reference)}</title></head>
<body style="margin:0;padding:0;background:#0d0e10">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0d0e10" background="${bg}" style="background-color:#0d0e10;background-image:url('${bg}');background-size:cover;background-position:center">
<tr><td align="center" style="padding:40px 16px 48px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
    <tr><td align="center" style="padding:0 0 28px">
      <img src="${origin}/email/sure-logo-blanco.png" width="132" alt="SURE" style="display:block;width:132px;height:auto;border:0">
    </td></tr>
    <tr><td style="background:#ffffff;padding:32px 28px">
      <p style="${LABEL}">Nuevo pedido · ${esc(order.reference)}</p>
      <h1 style="margin:10px 0 6px;font:800 30px/1.1 ${FONT};color:#0d0e10;letter-spacing:-.01em">${esc(buyer.name)}</h1>
      <p style="margin:0;font:14px/1.5 ${FONT};color:#6e6e6c">${esc(when)} · ${units} ${units === 1 ? "prenda" : "prendas"} · ${formatCOP(order.total)}${lang === "en" ? " · Compró en inglés" : ""}</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;border-top:1px solid #e4e4e1">${rows}</table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px">
        ${total("Subtotal", formatCOP(order.subtotal))}
        ${total("Envío", order.shipping === 0 ? "Gratis" : formatCOP(order.shipping))}
        ${total("Total", formatCOP(order.total), true)}
      </table>

      <p style="margin:22px 0 0;padding:12px 14px;background:#f6f6f4;border-left:3px solid #7a1424;font:700 14px/1.4 ${FONT};color:#0d0e10">Pago: ${esc(payment)}</p>

      <p style="${LABEL};margin-top:28px">Enviar a</p>
      <p style="margin:6px 0 0;font:15px/1.55 ${FONT};color:#0d0e10">${esc(buyer.address)}<br>${esc(buyer.city)}, ${esc(buyer.region)}</p>

      <p style="${LABEL};margin-top:22px">Cliente</p>
      <p style="margin:6px 0 0;font:15px/1.55 ${FONT};color:#0d0e10">
        ${esc(buyer.name)} · CC ${esc(buyer.legalId)}<br>
        <a href="tel:+57${buyer.phone}" style="color:#0d0e10">${buyer.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}</a> ·
        <a href="mailto:${esc(buyer.email)}" style="color:#0d0e10">${esc(buyer.email)}</a>
      </p>
      ${buyer.notes ? `<p style="${LABEL};margin-top:22px">Notas</p><p style="margin:6px 0 0;font:15px/1.55 ${FONT};color:#0d0e10">${esc(buyer.notes)}</p>` : ""}

      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:30px"><tr>
        <td bgcolor="#0d0e10" style="background:#0d0e10"><a href="${chat}" style="display:inline-block;padding:15px 22px;font:700 13px/1 ${FONT};letter-spacing:.1em;text-transform:uppercase;color:#ffffff;text-decoration:none">Escribirle por WhatsApp</a></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:22px 4px 0;font:13px/1.55 ${FONT};color:#d8d8d6">
      ${transfer
        ? `El cliente va a pagar por Nequi o llave Bre-B y mandar el comprobante por WhatsApp con la referencia ${esc(order.reference)}. Revisa que el pago entró en Nequi antes de despachar.`
        : "El cliente abrió WhatsApp con este pedido para enviarlo. Si en un rato no te llega el mensaje, escríbele tú con el botón de arriba."}
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;

  const text = [
    `Nuevo pedido ${order.reference} · ${when}${lang === "en" ? " · Compró en inglés" : ""}`,
    "",
    ...order.lines.map((l) => `• ${l.name} · Talla ${l.size} × ${l.qty} — ${formatCOP(l.unitPrice * l.qty)}`),
    `Envío: ${order.shipping === 0 ? "Gratis" : formatCOP(order.shipping)}`,
    `Total: ${formatCOP(order.total)}`,
    `Pago: ${payment}`,
    "",
    `${buyer.name} · CC ${buyer.legalId}`,
    `${buyer.phone} · ${buyer.email}`,
    `${buyer.address}, ${buyer.city}, ${buyer.region}`,
    buyer.notes ? `Notas: ${buyer.notes}` : "",
    "",
    `WhatsApp del cliente: ${chat}`,
  ].join("\n");

  return { subject: `Nuevo pedido ${order.reference} · ${formatCOP(order.total)} · ${buyer.name}`, html, text };
}

export async function sendOrderEmail(order: Order, payment: string, origin: string, lang: Lang = "es") {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: "sin RESEND_API_KEY" };
  const { subject, html, text } = orderEmail(order, payment, origin, lang);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": order.reference },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: order.buyer.email, subject, html, text }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return { sent: false, reason: `Resend ${res.status}: ${(await res.text()).slice(0, 200)}` };
  return { sent: true };
}
