import { NextResponse, type NextRequest } from "next/server";

// Español sin prefijo: /tienda se sirve desde /es/tienda. Inglés con prefijo /en.
// /es/... se redirige a la ruta sin prefijo para no duplicar páginas.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();
  const url = req.nextUrl.clone();
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

// Fuera del middleware: API, archivos de Next y de Vercel, y las carpetas de /public.
// Si se agrega un archivo suelto en la raíz de /public, hay que sumarlo aquí.
export const config = {
  matcher: ["/((?!api|_next|_vercel|img|media|brand|email|icon\\.svg|favicon\\.ico|apple-icon\\.png|robots\\.txt|sitemap\\.xml|llms\\.txt).*)"],
};
