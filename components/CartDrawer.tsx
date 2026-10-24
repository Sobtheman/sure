"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart";
import { getProduct } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { Arrow, Close } from "@/components/icons";
import QtyStepper from "@/components/QtyStepper";

export default function CartDrawer() {
  const cart = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { open, setOpen } = cart;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Bolsa"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-paper text-ink transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <p className="label">Bolsa ({cart.count})</p>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            className="-mr-2 grid h-11 w-11 place-items-center"
            aria-label="Cerrar bolsa"
            tabIndex={open ? 0 : -1}
          >
            <Close />
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-5">
            <p className="display text-4xl">Tu bolsa está vacía.</p>
            <Link href="/tienda" onClick={() => setOpen(false)} className="link-line text-sm" tabIndex={open ? 0 : -1}>
              Ver la colección <Arrow className="text-burgundy" />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {cart.lines.map((l) => {
                const p = getProduct(l.slug)!;
                return (
                  <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-5">
                    <Link
                      href={`/producto/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="relative aspect-[4/5] w-24 shrink-0 bg-frame"
                      tabIndex={open ? 0 : -1}
                    >
                      <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="96px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[13px] font-bold uppercase">{p.name}</p>
                          <p className="mt-1 text-[13px] text-muted">
                            {p.color} · Talla {l.size}
                          </p>
                        </div>
                        <p className="text-[13px] font-medium">{formatCOP(p.price * l.qty)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <QtyStepper
                          qty={l.qty}
                          max={p.stock[l.size]}
                          onChange={(q) => cart.setQty(l.slug, l.size, q)}
                          tabIndex={open ? 0 : -1}
                        />
                        <button
                          onClick={() => cart.remove(l.slug, l.size)}
                          className="text-[12px] text-muted underline underline-offset-4 hover:text-ink"
                          tabIndex={open ? 0 : -1}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-line px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
              <dl className="space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd>{formatCOP(cart.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Envío nacional</dt>
                  <dd>{formatCOP(cart.shippingFee)}</dd>
                </div>
                <div className="flex justify-between pt-2 text-[16px] font-bold">
                  <dt>Total</dt>
                  <dd>{formatCOP(cart.total)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="btn-dark mt-5 w-full"
                tabIndex={open ? 0 : -1}
              >
                Finalizar compra <Arrow />
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
