import "server-only";

/* Lista de lanzamientos (newsletter) en Resend: cada correo queda como contacto dentro del
   segmento "Newsletter SURE" (Resend reemplazó las Audiences por Segments).
   Variables: RESEND_API_KEY y RESEND_NEWSLETTER_SEGMENT_ID. Sin alguna de las dos no se guarda
   nada y el sitio sigue normal. Para enviar: Resend → Broadcasts → segmento "Newsletter SURE",
   con el enlace de baja {{{RESEND_UNSUBSCRIBE_URL}}} en el pie. */

const API = "https://api.resend.com";

// Correo limpio (sin espacios, en minúsculas) o null si no es válido. Mismo criterio que lib/order.ts.
export function cleanEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export type SubscribeResult = { saved: true } | { saved: false; configured: boolean; reason: string };

export async function subscribe(email: string): Promise<SubscribeResult> {
  const key = process.env.RESEND_API_KEY;
  const segment = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!key || !segment) return { saved: false, configured: false, reason: "sin RESEND_API_KEY o RESEND_NEWSLETTER_SEGMENT_ID" };
  const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

  // Si el contacto ya existe, Resend responde igual (201), lo vuelve a suscribir y lo agrega al segmento.
  const res = await fetch(`${API}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, unsubscribed: false, segments: [{ id: segment }] }),
    signal: AbortSignal.timeout(8000),
  });
  if (res.ok) return { saved: true };

  // Por si Resend llega a responder "ya existe": se agrega el contacto al segmento directamente
  if (res.status === 409) {
    const add = await fetch(`${API}/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segment)}`, {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (add.ok || add.status === 409) return { saved: true };
    return { saved: false, configured: true, reason: `Resend ${add.status}: ${(await add.text()).slice(0, 200)}` };
  }
  return { saved: false, configured: true, reason: `Resend ${res.status}: ${(await res.text()).slice(0, 200)}` };
}
