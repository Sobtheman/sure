"use client";

import { useEffect, useRef } from "react";
import type { Product } from "@/lib/catalog";
import { SIZES } from "@/lib/catalog";
import { Close } from "@/components/icons";

export default function SizeGuide({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const hoodie = product.slug.includes("hoodie");

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-0 ml-auto h-full max-h-none w-full max-w-[520px] bg-paper p-0 text-ink backdrop:bg-ink/50"
      aria-label="Guía de medidas"
    >
      <div className="flex h-16 items-center justify-between border-b border-line px-5">
        <p className="label">Guía de medidas</p>
        <button onClick={onClose} className="-mr-2 grid h-11 w-11 place-items-center" aria-label="Cerrar guía">
          <Close />
        </button>
      </div>
      <div className="px-5 py-7">
        <h2 className="display text-3xl uppercase">{product.name}</h2>
        <p className="mt-2 text-[14px] text-muted">Medidas de la prenda en centímetros, tomadas en plano.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-[13px] sm:text-[14px]">
            <thead>
              <tr className="border-b border-ink">
                <th className="label py-3 text-left font-medium">Medida</th>
                {SIZES.map((s) => (
                  <th key={s} className="w-10 py-3 text-right font-bold sm:w-12">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product.measurements.map((m, i) => (
                <tr key={m.label} className="border-b border-line">
                  <td className="py-3 pr-2">
                    <span className="mr-2 inline-grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-paper">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {m.label}
                  </td>
                  {SIZES.map((s) => (
                    <td key={s} className="py-3 text-right tabular-nums">
                      {m.values[s]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Diagram hoodie={hoodie} />

        <ol className="mt-6 space-y-2 text-[14px] leading-relaxed">
          <li>
            <b>A. Ancho de pecho:</b> de costura a costura, 2 cm debajo de la sisa.
          </li>
          <li>
            <b>B. Largo total:</b> desde el punto más alto del hombro hasta el ruedo.
          </li>
          <li>
            <b>C. Largo de manga:</b> desde la costura del hombro hasta el final de la manga.
          </li>
        </ol>
        <p className="mt-6 bg-mist p-4 text-[14px]">
          {product.fitNote} Compara con una prenda tuya que te quede bien, medida igual sobre una superficie plana.
        </p>
      </div>
    </dialog>
  );
}

function Diagram({ hoodie }: { hoodie: boolean }) {
  return (
    <svg viewBox="0 0 320 240" className="mx-auto mt-8 w-full max-w-[320px] text-ink" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        {hoodie ? (
          <path d="M120 30c10-18 70-18 80 0l45 14 55 120-30 12-36-68v122H86V108l-36 68-30-12 55-120z M130 30c5 24 55 24 60 0" />
        ) : (
          <path d="M122 28c8 14 68 14 76 0l58 22 40 70-38 18-24-36v128H84V102l-24 36-38-18 40-70z M122 28c8 22 68 22 76 0" />
        )}
      </g>
      <g stroke="#7a1424" strokeWidth="1.3" fill="#7a1424" fontSize="11" fontWeight="700" fontFamily="inherit">
        <line x1="88" y1="112" x2="232" y2="112" />
        <circle cx="160" cy="112" r="9" stroke="none" />
        <text x="160" y="116" textAnchor="middle" fill="#fff" stroke="none">A</text>
        <line x1="104" y1={hoodie ? 40 : 34} x2="104" y2="230" />
        <circle cx="104" cy="170" r="9" stroke="none" />
        <text x="104" y="174" textAnchor="middle" fill="#fff" stroke="none">B</text>
        {hoodie ? (
          <line x1="212" y1="48" x2="285" y2="170" />
        ) : (
          <line x1="204" y1="34" x2="264" y2="128" />
        )}
        <circle cx={hoodie ? 255 : 240} cy={hoodie ? 120 : 92} r="9" stroke="none" />
        <text x={hoodie ? 255 : 240} y={hoodie ? 124 : 96} textAnchor="middle" fill="#fff" stroke="none">C</text>
      </g>
    </svg>
  );
}
