"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Size } from "@/lib/catalog";
import { shippingFor } from "@/lib/config";
import { useLang } from "@/components/LangProvider";
import { cartCopy } from "@/lib/copy/cart";

export type CartLine = { slug: string; size: Size; qty: number };

type CartState = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, size: Size, qty?: number) => { ok: boolean; reason?: string };
  setQty: (slug: string, size: Size, qty: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
};

const KEY = "sure-bolsa-v1";
const CartContext = createContext<CartState | null>(null);

function stockOf(slug: string, size: Size) {
  return getProduct(slug)?.stock[size] ?? 0;
}

// Slugs de versiones anteriores del sitio
const LEGACY: Record<string, string> = {
  "camiseta-dissidencia": "camiseta-disidencia",
  "hoodie-dissidencia": "hoodie-disidencia",
};

// Quita líneas de productos que ya no existen y ajusta cantidades al stock
function sanitize(lines: CartLine[]): CartLine[] {
  return lines
    .map((l) => (LEGACY[l.slug] ? { ...l, slug: LEGACY[l.slug] } : l))
    .filter((l) => getProduct(l.slug) && Number.isInteger(l.qty) && l.qty > 0)
    .map((l) => ({ ...l, qty: Math.min(l.qty, stockOf(l.slug, l.size)) }))
    .filter((l) => l.qty > 0);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  // Los motivos de add() salen en el idioma de la página
  const lang = useLang();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(sanitize(JSON.parse(raw)));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback(
    (slug: string, size: Size, qty = 1) => {
      const max = stockOf(slug, size);
      const current = lines.find((l) => l.slug === slug && l.size === size)?.qty ?? 0;
      const t = cartCopy[lang];
      if (max <= 0) return { ok: false, reason: t.sizeSoldOut };
      if (current + qty > max) return { ok: false, reason: t.allInBag(size) };
      setLines((prev) => {
        const found = prev.find((l) => l.slug === slug && l.size === size);
        if (found) return prev.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { slug, size, qty }];
      });
      return { ok: true };
    },
    [lines, lang]
  );

  const setQty = useCallback((slug: string, size: Size, qty: number) => {
    const max = stockOf(slug, size);
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(0, Math.min(qty, max)) } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const remove = useCallback((slug: string, size: Size) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    const shippingFee = shippingFor(subtotal);
    return {
      lines,
      ready,
      count,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, ready, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart fuera de CartProvider");
  return ctx;
}
