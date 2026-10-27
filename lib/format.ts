import type { Lang } from "@/lib/i18n";

const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

// En inglés, separador de miles con coma: $110,000 COP
const copEn = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "COP",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

// $ 110.000 → $110.000. En inglés: $110,000 COP
export function formatCOP(value: number, lang: Lang = "es") {
  if (lang === "en") return `${copEn.format(value)} COP`;
  return cop.format(value).replace(/\s/g, "");
}
