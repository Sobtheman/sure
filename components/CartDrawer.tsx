"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart";
import { getProduct, productsFor, SIZES, type Size } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { shipping } from "@/lib/config";
import { Arrow, Close, Plus } from "@/components/icons";
import QtyStepper from "@/components/QtyStepper";
import { track } from "@/lib/track";
import { useLang } from "@/components/LangProvider";
import { cartCopy } from "@/lib/copy/cart";

export default function CartDrawer() {
  const lang = useLang();
  const t = cartCopy[lang];
  const cart = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const { open, setOpen } = cart;
  const empty = cart.lines.length === 0;
  // Al ir a la colección desde la bolsa vacía, la foto de fondo se aclara antes de salir
  const [clear, setClear] = useState(false);
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setClear(false), 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Al abrir: foco en cerrar, Tab no sale del panel, Esc cierra. Al cerrar: el foco vuelve a donde estaba.
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      if (before && document.contains(before)) before.focus();
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.bag}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col overflow-hidden transition-transform duration-500 ease-out ${
          empty ? "bg-ink text-paper" : "bg-paper text-ink"
        } ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {empty && <EmptyBackground clear={clear} />}
        <div className={`relative flex h-16 items-center justify-between border-b px-5 ${empty ? "border-white/15" : "border-line"}`}>
          <p className="label">
            {t.bag} <span className={empty ? "text-burgundy-bright" : "text-burgundy"}>({cart.count})</span>
          </p>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            className="-mr-2 grid h-11 w-11 place-items-center"
            aria-label={t.close}
            tabIndex={open ? 0 : -1}
          >
            <Close />
          </button>
        </div>

        {empty ? (
          <EmptyBag open={open} clear={clear} onClear={() => setClear(true)} onClose={() => setOpen(false)} />
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {cart.lines.map((l) => {
                const p = getProduct(l.slug, lang)!;
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
                            {p.color} · {t.sizeLine(l.size)}
                          </p>
                        </div>
                        <p className="text-[13px] font-medium">{formatCOP(p.price * l.qty, lang)}</p>
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
                          {t.remove}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-line px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
              <FreeShipping subtotal={cart.subtotal} />
              <dl className="mt-4 space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <dt className="text-muted">{t.subtotal}</dt>
                  <dd>{formatCOP(cart.subtotal, lang)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">{t.shipping}</dt>
                  <dd>{cart.shippingFee === 0 ? t.free : formatCOP(cart.shippingFee, lang)}</dd>
                </div>
                <div className="flex justify-between pt-2 text-[16px] font-bold">
                  <dt>{t.total}</dt>
                  <dd>{formatCOP(cart.total, lang)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="btn-dark mt-5 w-full"
                tabIndex={open ? 0 : -1}
              >
                {t.checkout} <Arrow />
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

// Bolsa vacía: foto de la sesión desenfocada detrás, texto claro encima
function EmptyBackground({ clear }: { clear: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Image
        src="/img/bolsa/fondo.jpg"
        alt=""
        fill
        sizes="440px"
        className={`object-cover object-[50%_35%] transition-[filter,transform] duration-700 ease-out will-change-[filter] ${
          clear ? "scale-100 blur-0" : "scale-110 blur-[14px]"
        }`}
      />
      <div className={`absolute inset-0 bg-ink transition-opacity duration-700 ${clear ? "opacity-0" : "opacity-60"}`} />
    </div>
  );
}

function EmptyBag({ open, clear, onClear, onClose }: { open: boolean; clear: boolean; onClear: () => void; onClose: () => void }) {
  const lang = useLang();
  const t = cartCopy[lang];
  const link = useRef<HTMLAnchorElement>(null);
  const leaving = useRef(false);
  const tab = open ? 0 : -1;

  // Primer clic: se va el desenfoque; después sí navega a la colección
  const toCollection = (e: React.MouseEvent) => {
    if (leaving.current) {
      leaving.current = false;
      onClose();
      return;
    }
    e.preventDefault();
    onClear();
    setTimeout(() => {
      leaving.current = true;
      link.current?.click();
    }, 650);
  };

  return (
    <div className={`relative flex flex-1 flex-col overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10 transition-opacity duration-500 ${clear ? "opacity-0" : "opacity-100"}`}>
      <p className="label text-white/70">Disidencia</p>
      <p className="display mt-3 text-[44px]">{t.emptyTitle}</p>
      <p className="mt-3 text-[15px] text-white/80">{t.emptyLead}</p>

      <ul className="mt-8 space-y-3">
        {productsFor(lang).map((p) => (
          <Suggestion key={p.slug} slug={p.slug} tabIndex={tab} onNavigate={onClose} />
        ))}
      </ul>

      <Link ref={link} href="/tienda" onClick={toCollection} className="link-line label mt-auto self-start pt-10 text-paper" tabIndex={tab}>
        {t.viewCollection} <Arrow className="text-burgundy-bright" />
      </Link>
    </div>
  );
}

// Producto sugerido: el + muestra las tallas; tocar una talla lo agrega a la bolsa
function Suggestion({ slug, tabIndex, onNavigate }: { slug: string; tabIndex: number; onNavigate: () => void }) {
  const lang = useLang();
  const t = cartCopy[lang];
  const cart = useCart();
  const p = getProduct(slug, lang)!;
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState("");

  const add = (size: Size) => {
    const res = cart.add(p.slug, size);
    if (!res.ok) {
      setError(res.reason || t.addFailed);
      return;
    }
    track("Agregado a la bolsa", { producto: p.slug, talla: size, desde: "bolsa vacía" });
  };

  return (
    <li className="border border-white/15 bg-white/[0.06] backdrop-blur-sm">
      <div className="flex items-center gap-4 p-3">
        <Link href={`/producto/${p.slug}`} onClick={onNavigate} className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-white/10" tabIndex={tabIndex}>
          <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="64px" className="object-cover" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold uppercase">{p.name}</p>
          <p className="mt-1 text-[13px] text-white/75">{formatCOP(p.price, lang)}</p>
        </div>
        <button
          onClick={() => {
            setPicking((v) => !v);
            setError("");
          }}
          aria-expanded={picking}
          aria-label={picking ? t.closeSizes(p.name) : t.addProduct(p.name)}
          className="grid h-10 w-10 shrink-0 place-items-center border border-white/50 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          tabIndex={tabIndex}
        >
          <Plus className={`transition-transform duration-300 ${picking ? "rotate-45" : ""}`} />
        </button>
      </div>
      {picking && (
        <div className="px-3 pb-3">
          <p className="label text-[10px] text-white/60">{t.pickSize}</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => add(s)}
                disabled={p.stock[s] === 0}
                className="h-10 border border-white/40 text-[13px] font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink disabled:opacity-30"
                aria-label={t.sizeOption(s)}
                tabIndex={tabIndex}
              >
                {s}
              </button>
            ))}
          </div>
          {error && <p className="mt-2 text-[12px] text-burgundy-bright">{error}</p>}
        </div>
      )}
    </li>
  );
}

// Barra de envío gratis: cuánto falta o confirmación
export function FreeShipping({ subtotal }: { subtotal: number }) {
  const lang = useLang();
  const t = cartCopy[lang];
  const missing = shipping.freeFrom - subtotal;
  const pct = Math.min(100, Math.round((subtotal / shipping.freeFrom) * 100));
  return (
    <div>
      <p className="text-[13px]">
        {missing > 0 ? (
          <>
            {t.missingBefore}
            <b>{formatCOP(missing, lang)}</b>
            {t.missingAfter}
          </>
        ) : (
          <b className="text-burgundy">{t.freeDone}</b>
        )}
      </p>
      <div className="mt-2 h-[3px] w-full bg-line" aria-hidden>
        <div className="h-full bg-burgundy transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
