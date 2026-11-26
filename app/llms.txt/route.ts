import { productsFor, SIZES } from "@/lib/catalog";
import { archive } from "@/lib/archive";
import { shipping, store } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import { absolute } from "@/lib/seo";
import { storyCopy } from "@/lib/copy/story";

// /llms.txt: resumen de SURE para asistentes de IA (ChatGPT, Claude, Perplexity).
// Se arma con los datos del catálogo, así los precios y las colecciones nunca quedan viejos.
export const dynamic = "force-static";

export function GET() {
  const es = productsFor("es");
  const en = productsFor("en");
  const lines = [
    "# SURE",
    "",
    `> Streetwear colombiano. Colección actual: Disidencia (camisetas y hoodies). Envío gratis siempre a toda Colombia, pago contra entrega y entrega en ${shipping.deliveryDays} días hábiles o menos. Tienda en español (${absolute("/")}) y en inglés (${absolute("/en")}).`,
    "",
    `## La historia: ${storyCopy.es.introTitle}`,
    ...storyCopy.es.intro,
    "",
    "## Productos (Disidencia)",
    ...es.map(
      (p) =>
        `- [${p.name}](${absolute(`/producto/${p.slug}`)}): ${p.color.toLowerCase()}, ${formatCOP(p.price)} COP, tallas ${SIZES.join(", ")}. ${p.description}`
    ),
    "",
    `- Historia de Disidencia (capítulo V): “${storyCopy.es.current.tagline}” ${storyCopy.es.current.story.join(" ")}`,
    "",
    "## Comprar",
    `- [Tienda](${absolute("/tienda")}): toda la colección y el lookbook.`,
    `- Envío gratis siempre a cualquier ciudad de Colombia. Llega en ${shipping.deliveryDays} días hábiles o menos.`,
    "- Pago contra entrega, por transferencia (Nequi o llave Bre-B) o confirmando el pago por WhatsApp.",
    `- Cambios de talla dentro de los ${shipping.exchangeDays} días siguientes a la entrega. [Envíos y cambios](${absolute("/envios")})`,
    "",
    "## Archivo (capítulos I a IV, colecciones anteriores, agotadas)",
    ...archive.map((c) => `- [${c.name} (${c.year})](${absolute(`/archivo/${c.slug}`)}): ${c.seoDescription}`),
    "",
    "## Contacto",
    `- WhatsApp: +57 ${store.whatsappLabel} (https://wa.me/${store.whatsapp})`,
    `- Instagram: ${store.instagramHandle} (${store.instagram})`,
    `- TikTok: ${store.tiktok}`,
    `- [Contacto](${absolute("/contacto")})`,
    "",
    "## English",
    `- SURE is a Colombian streetwear brand. Current collection: Disidencia. Free shipping, always, anywhere in Colombia; cash on delivery or Nequi / Bre-B transfer. English store: ${absolute("/en")}`,
    ...en.map((p) => `- [${p.name}](${absolute(`/en/producto/${p.slug}`)}): ${p.color.toLowerCase()}, ${formatCOP(p.price, "en")}, sizes ${SIZES.join(", ")}.`),
    `- [Shipping & exchanges](${absolute("/en/envios")}) · [Archive](${absolute("/en/archivo")}) · [Contact](${absolute("/en/contacto")})`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
