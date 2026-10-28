import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { archive } from "@/lib/archive";
import { LANGS, localePath } from "@/lib/i18n";
import { absolute, languages } from "@/lib/seo";

// Todas las páginas públicas en español y en inglés, ligadas entre sí
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/tienda", priority: 0.9 },
    ...products.map((p) => ({ path: `/producto/${p.slug}`, priority: 0.9 })),
    { path: "/archivo", priority: 0.6 },
    ...archive.map((c) => ({ path: `/archivo/${c.slug}`, priority: 0.5 })),
    { path: "/envios", priority: 0.5 },
    { path: "/contacto", priority: 0.4 },
    { path: "/privacidad", priority: 0.2 },
  ];
  const lastModified = new Date();
  const alternates = (path: string) =>
    Object.fromEntries(Object.entries(languages(path)).filter(([k]) => k !== "x-default").map(([k, v]) => [k, absolute(v)]));
  return paths.flatMap(({ path, priority }) =>
    LANGS.map((lang) => ({
      url: absolute(localePath(lang, path)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: lang === "es" ? priority : Math.round(priority * 8) / 10,
      alternates: { languages: alternates(path) },
    }))
  );
}
