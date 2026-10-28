import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

// Abierto a buscadores y asistentes de IA. Fuera: la API, el checkout y la página de resultado del pago.
const PRIVATE = ["/api/", "/checkout", "/en/checkout", "/pedido", "/en/pedido"];
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_BOTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
