"use client";

import Link from "@/components/Link";
import { useEffect, useState } from "react";
import type { Product, Size } from "@/lib/catalog";
import { LOW_STOCK, SIZES, totalStock } from "@/lib/catalog";
import { shipping } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import { useCart } from "@/components/cart";
import SizeGuide from "@/components/SizeGuide";
import { Plus } from "@/components/icons";
import SellingPoints from "@/components/SellingPoints";
import { track } from "@/lib/track";

export default function PurchasePanel({ product }: { product: Product }) {
  const cart = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState("");
  const [guide, setGuide] = useState(false);
  const soldOut = totalStock(product) === 0;
  const left = size ? product.stock[size] : 0;

  useEffect(() => {
    track("Producto visto", { producto: product.name });
  }, [product.name]);

  const add = () => {
    if (!size) {
      setError("Elige una talla.");
      return;
    }
    const res = cart.add(product.slug, size);
    if (!res.ok) {
      setError(res.reason || "No se pudo agregar.");
      return;
    }
    setError("");
    track("Agregado a la bolsa", { producto: product.name, talla: size });
    cart.setOpen(true);
  };

  return (
    <div>
      <p className="label text-muted">{product.collection}</p>
      <h1 className="display mt-3 text-[40px] uppercase sm:text-[52px]">{product.short}</h1>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p className="text-[15px] text-muted">{product.color}</p>
        <p className="text-[18px] font-bold">{formatCOP(product.price)}</p>
      </div>

      <fieldset className="mt-8">
        <legend className="sr-only">Talla</legend>
        <div className="flex items-center justify-between">
          <span className="label" aria-hidden>
            Talla
          </span>
          <button onClick={() => setGuide(true)} className="text-[13px] underline underline-offset-4 hover:text-burgundy">
            Guía de medidas
          </button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {SIZES.map((s) => {
            const n = product.stock[s];
            const out = n === 0;
            const active = size === s;
            return (
              <button
                key={s}
                type="button"
                disabled={out}
                onClick={() => {
                  setSize(s);
                  setError("");
                }}
                aria-pressed={active}
                aria-label={out ? `Talla ${s}, agotada` : `Talla ${s}`}
                className={`relative h-12 border text-[14px] font-semibold transition-colors ${
                  active
                    ? "border-burgundy bg-burgundy text-paper"
                    : out
                      ? "cursor-not-allowed border-line text-[#b5b5b3]"
                      : "border-line hover:border-ink"
                }`}
              >
                {s}
                {out && (
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),#d6d6d4_50%,transparent_calc(50%+0.5px))]"
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-3 min-h-[20px] text-[13px]" aria-live="polite">
          {error ? (
            <span className="text-burgundy">{error}</span>
          ) : soldOut ? (
            <span className="text-muted">Agotado en todas las tallas.</span>
          ) : size && LOW_STOCK > 0 && left <= LOW_STOCK ? (
            <span className="text-burgundy">
              Últimas {left} {left === 1 ? "unidad" : "unidades"} en talla {size}.
            </span>
          ) : size ? (
            <span className="text-muted">Disponible en talla {size}.</span>
          ) : null}
        </p>
      </fieldset>

      <button onClick={add} disabled={soldOut} className="btn-dark mt-3 w-full">
        {soldOut ? "Agotado" : size ? `Agregar a la bolsa · ${formatCOP(product.price)}` : "Agregar a la bolsa"}
      </button>

      <SellingPoints className="mt-6" />

      <div className="mt-8 border-t border-line">
        <Section title="Descripción" open>
          <p>{product.description}</p>
          <p className="mt-3 text-muted">{product.fitNote}</p>
        </Section>
        <Section title="Detalles y cuidado">
          <ul className="list-disc space-y-1 pl-4">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <ul className="mt-4 space-y-1 text-muted">
            {product.care.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Section>
        <Section title="Envíos y cambios">
          <p>
            Envío gratis en compras desde {formatCOP(shipping.freeFrom)}; en compras menores, {formatCOP(shipping.fee)} a
            cualquier ciudad de Colombia. Pagas contra entrega o te confirmamos el pago por WhatsApp. Te llega en{" "}
            {shipping.deliveryDays} días hábiles o menos.
          </p>
          <p className="mt-3">
            ¿No te quedó? Cambias la talla dentro de los {shipping.exchangeDays} días siguientes a la entrega, con la
            prenda sin uso y con sus etiquetas.{" "}
            <Link href="/envios" className="underline underline-offset-4">
              Ver envíos y cambios
            </Link>
          </p>
        </Section>
      </div>

      <SizeGuide product={product} open={guide} onClose={() => setGuide(false)} />
    </div>
  );
}

function Section({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line" open={open}>
      <summary className="flex h-14 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
        <span className="label">{title}</span>
        <Plus className="transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div className="pb-6 text-[14px] leading-relaxed">{children}</div>
    </details>
  );
}
