import type { Lang } from "@/lib/i18n";

const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

// $ 90.000 → $90.000. En inglés se aclara la moneda: $90.000 COP
export function formatCOP(value: number, lang: Lang = "es") {
  const v = cop.format(value).replace(/\s/g, "");
  return lang === "en" ? `${v} COP` : v;
}
