"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Cada página nueva arranca arriba. Atrás y adelante conservan la posición donde estabas.
export default function ScrollTop() {
  const pathname = usePathname();
  const back = useRef(false);
  const prev = useRef(pathname);

  useEffect(() => {
    const onPop = () => (back.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    // Primera carga: se respeta la posición que restaura el navegador (recargar, volver, #ancla)
    if (prev.current === pathname) return;
    prev.current = pathname;
    if (back.current) {
      back.current = false;
      return;
    }
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
