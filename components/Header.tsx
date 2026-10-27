"use client";

import Link from "@/components/Link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { useCart } from "@/components/cart";
import AnnouncementBar from "@/components/AnnouncementBar";
import { localePath, splitPath } from "@/lib/i18n";
import { nav } from "@/lib/copy/nav";

// Sobre el hero de inicio la barra es transparente y el logo blanco;
// al pasar el hero se vuelve sólida. En el archivo es negra, en el resto blanca.
export default function Header() {
  const { lang, path } = splitPath(usePathname());
  const t = nav[lang];
  const cart = useCart();
  const overlayPage = path === "/";
  const darkPage = path.startsWith("/archivo");
  const [pastHero, setPastHero] = useState(false);
  // Al cambiar de idioma se conserva la consulta y el ancla (?ref= del pedido, #disponible)
  const [extra, setExtra] = useState("");
  useEffect(() => setExtra(window.location.search + window.location.hash), [path]);

  useEffect(() => {
    if (!overlayPage) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlayPage]);

  const transparent = overlayPage && !pastHero;

  const bar = transparent
    ? "bg-transparent text-paper"
    : darkPage
      ? "bg-ink/95 text-paper backdrop-blur border-b border-white/10"
      : "bg-paper/95 text-ink backdrop-blur border-b border-line";

  // En celular angosto, letras un poco más juntas para que el logo respire
  const item = "label py-3 text-[10.5px] tracking-[0.04em] min-[360px]:tracking-[0.08em] transition-opacity hover:opacity-60 min-[400px]:text-[11px] min-[400px]:tracking-label";

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-paper focus:p-3 focus:text-ink">
        {t.skip}
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${bar}`}>
        {transparent && (
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-black/55 to-transparent" />
        )}
        <AnnouncementBar />
        <nav className="wrap grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-[72px]" aria-label={t.mainNav}>
          <div className="flex items-center gap-2 min-[360px]:gap-3 min-[400px]:gap-4 sm:gap-10">
            <Link href="/tienda" className={item} aria-current={path.startsWith("/tienda") ? "page" : undefined}>
              {t.shop}
            </Link>
            <Link href="/archivo" className={item} aria-current={darkPage ? "page" : undefined}>
              {t.archive}
            </Link>
          </div>
          <Link href="/" aria-label={t.home} className="block">
            <Logo
              className={`w-[66px] transition-all duration-500 min-[400px]:w-[78px] sm:w-[108px] ${
                transparent ? "sm:w-[150px] sm:translate-y-3 lg:w-[200px] lg:translate-y-6" : ""
              }`}
            />
          </Link>
          <div className="flex items-center justify-end gap-3 sm:gap-8">
            <NextLink
              href={localePath(lang === "es" ? "en" : "es", path) + extra}
              className={`${item} opacity-70`}
              hrefLang={lang === "es" ? "en" : "es"}
              lang={lang === "en" ? "es" : undefined}
              aria-label={t.switchLabel}
            >
              {t.switchTo}
            </NextLink>
            <button onClick={() => cart.setOpen(true)} className={item} aria-label={t.bagLabel(cart.count)}>
              {t.bag}{" "}
              <span className={`tabular-nums ${cart.count > 0 ? (transparent || darkPage ? "text-burgundy-bright" : "text-burgundy") : ""}`}>
                ({cart.ready ? cart.count : 0})
              </span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
