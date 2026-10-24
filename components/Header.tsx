"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { useCart } from "@/components/cart";

// Sobre el hero de inicio la barra es transparente y el logo blanco;
// al pasar el hero se vuelve sólida. En el archivo es negra, en el resto blanca.
export default function Header() {
  const pathname = usePathname();
  const cart = useCart();
  const overlayPage = pathname === "/";
  const darkPage = pathname.startsWith("/archivo");
  const [pastHero, setPastHero] = useState(false);

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

  const item = "label py-3 tracking-[0.12em] transition-opacity hover:opacity-60 sm:tracking-label";

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-paper focus:p-3 focus:text-ink">
        Saltar al contenido
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${bar}`}>
        {transparent && (
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/55 to-transparent" />
        )}
        <nav className="wrap grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-[72px]" aria-label="Principal">
          <div className="flex items-center gap-4 sm:gap-10">
            <Link href="/tienda" className={item} aria-current={pathname.startsWith("/tienda") ? "page" : undefined}>
              Tienda
            </Link>
            <Link href="/archivo" className={item} aria-current={darkPage ? "page" : undefined}>
              Archivo
            </Link>
          </div>
          <Link href="/" aria-label="SURE, inicio" className="block">
            <Logo
              className={`w-[78px] transition-all duration-500 sm:w-[108px] ${
                transparent ? "sm:w-[150px] sm:translate-y-3 lg:w-[200px] lg:translate-y-6" : ""
              }`}
            />
          </Link>
          <div className="flex justify-end">
            <button onClick={() => cart.setOpen(true)} className={item} aria-label={`Bolsa, ${cart.count} artículos`}>
              Bolsa <span className="tabular-nums">({cart.ready ? cart.count : 0})</span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
