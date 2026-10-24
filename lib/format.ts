const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

// $ 90.000 → $90.000
export function formatCOP(value: number) {
  return cop.format(value).replace(/\s/g, "");
}
