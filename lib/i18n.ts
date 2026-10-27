/* Idiomas del sitio. Español en la raíz (/tienda), inglés con prefijo (/en/tienda).
   El middleware reescribe las rutas sin prefijo a /es por dentro; los enlaces nunca llevan /es. */

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string | undefined): value is Lang {
  return value === "es" || value === "en";
}

// Textos en los dos idiomas con las mismas claves: { es: {...}, en: {...} }
export type Bilingual<T> = { es: T; en: T };

export function pick<T>(lang: Lang, texts: Bilingual<T>): T {
  return texts[lang];
}

// Ruta visible para un idioma: ("en", "/tienda") -> "/en/tienda"; ("es", "/tienda") -> "/tienda"
export function localePath(lang: Lang, path: string) {
  if (lang === "es" || !path.startsWith("/")) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

// Separa el idioma de una ruta: "/en/tienda" -> { lang: "en", path: "/tienda" }.
// En el servidor la ruta llega reescrita con /es ("/es/tienda"); en el navegador sin prefijo ("/tienda"). Las dos dan lo mismo.
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const m = /^\/(en|es)(\/.*)?$/.exec(pathname || "/");
  if (m) return { lang: m[1] as Lang, path: m[2] && m[2] !== "/" ? m[2] : "/" };
  return { lang: "es", path: pathname || "/" };
}

export const htmlLang: Record<Lang, string> = { es: "es-CO", en: "en" };
export const ogLocale: Record<Lang, string> = { es: "es_CO", en: "en_US" };

// Idioma desde los parámetros de una página o layout de app/[lang]
export function langOf(params: { lang?: string }): Lang {
  return isLang(params.lang) ? params.lang : "es";
}
