"use client";

export default function QtyStepper({
  qty,
  max,
  onChange,
  tabIndex,
}: {
  qty: number;
  max: number;
  onChange: (qty: number) => void;
  tabIndex?: number;
}) {
  return (
    <div className="flex h-9 items-center border border-line">
      <button
        className="grid h-full w-9 place-items-center text-lg leading-none disabled:opacity-30"
        onClick={() => onChange(qty - 1)}
        aria-label="Quitar una"
        tabIndex={tabIndex}
      >
        −
      </button>
      <span className="w-7 text-center text-[13px] tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        className="grid h-full w-9 place-items-center text-lg leading-none disabled:opacity-30"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= max}
        aria-label="Agregar una"
        tabIndex={tabIndex}
      >
        +
      </button>
    </div>
  );
}
