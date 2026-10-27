import { track as vercelTrack } from "@vercel/analytics";

// Eventos básicos (vista de producto, bolsa, pedido por WhatsApp).
// Solo cuentan cuando el sitio está publicado en Vercel; en local no hacen nada.
export function track(event: string, data?: Record<string, string | number | null>) {
  try {
    vercelTrack(event, data ?? undefined);
  } catch {}
}
