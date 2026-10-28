import type { Metadata } from "next";
import { localePath, ogLocale, type Lang } from "@/lib/i18n";

/* Metadatos para buscadores y asistentes de IA: dominio, canonical, versiones por idioma y Open Graph. */

// Dominio para enlaces absolutos. En Vercel, sin variable, usa el dominio de producción del proyecto.
export const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE}${path}`);

// Imagen para compartir; con ancho y alto, Facebook/Instagram la muestran desde el primer enlace
export type OgImage = { src: string; width: number; height: number };
export const DEFAULT_IMAGE: OgImage = { src: "/img/hero/film-poster.jpg", width: 1920, height: 1080 };

// La misma página en los dos idiomas; el español es la versión por defecto
export function languages(path: string) {
  return { "es-CO": localePath("es", path), en: localePath("en", path), "x-default": localePath("es", path) };
}

type PageMeta = {
  title?: string; // título de la página; "— SURE" lo agrega la plantilla del layout
  fullTitle?: string; // título completo, sin plantilla (portada)
  description?: string;
  image?: OgImage;
};

export function pageMeta(lang: Lang, path: string, { title, fullTitle, description, image }: PageMeta): Metadata {
  const url = localePath(lang, path);
  const ogTitle = fullTitle || (title ? `${title} — SURE` : "SURE");
  const img = image || DEFAULT_IMAGE;
  return {
    ...(fullTitle ? { title: { absolute: fullTitle } } : title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: url, languages: languages(path) },
    openGraph: {
      type: "website",
      siteName: "SURE",
      url,
      locale: ogLocale[lang],
      title: ogTitle,
      ...(description ? { description } : {}),
      images: [{ url: img.src, width: img.width, height: img.height }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, ...(description ? { description } : {}), images: [img.src] },
  };
}
