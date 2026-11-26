/* SURE — catálogo de la colección actual.
   Precios confirmados. Stock y tabla de medidas son provisionales: se reemplazan
   aquí cuando llegue la información real. */

import type { Lang } from "@/lib/i18n";

export type Size = "S" | "M" | "L" | "XL";

export type ProductImage = {
  src: string;
  alt: string;
  view: "Frente" | "Espalda" | "Detalle" | "En modelo";
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  color: string;
  price: number; // COP
  collection: string;
  description: string;
  details: string[];
  care: string[];
  // Solo fotos originales de la sesión. La primera es la principal; la segunda aparece al pasar el cursor en la tienda (la espalda).
  images: ProductImage[];
  stock: Record<Size, number>;
  measurements: { label: string; values: Record<Size, number> }[]; // cm
  fitNote: string;
  video?: string; // clip corto que abre la galería del producto (sin audio)
  cardImage?: ProductImage; // foto de la tarjeta de la tienda con su proporción real (sin recortar); si no hay, la primera de images
  featured?: boolean; // prenda destacada: va primero en la tienda
  hidden?: boolean; // listo en el catálogo pero fuera de la tienda (p. ej. mientras llegan las fotos)
};

export const SIZES: Size[] = ["S", "M", "L", "XL"];
// Mostrar "Últimas unidades" cuando una talla tenga esta cantidad o menos.
// En 0 no se muestra nunca (mientras el stock sea provisional).
export const LOW_STOCK = 0;

const care = [
  "Lavar al revés, en agua fría y ciclo delicado.",
  "No usar blanqueador ni secadora.",
  "No planchar sobre el estampado.",
];

const photo = (src: string, alt: string, view: ProductImage["view"], width = 1333, height = 2000): ProductImage => ({
  src: `/img/producto/${src}.jpg`,
  alt,
  view,
  width,
  height,
});

// Todo el catálogo, incluidas las prendas ocultas. La tienda usa `products` (solo las visibles).
const catalog: Product[] = [
  {
    slug: "camiseta-disidencia",
    name: "Camiseta Disidencia",
    short: "Camiseta",
    color: "Blanco",
    price: 110000,
    collection: "Disidencia",
    description:
      "Camiseta blanca oversize con el ojo rojo al pecho. En la espalda, el ojo en semitono y “Watch Your Demons” en caligrafía. Hombro caído y cuello grueso.",
    details: [
      "Corte oversize, hombro caído",
      "100 % algodón",
      "Ojo rojo al pecho y “Watch Your Demons” en el ruedo",
      "Espalda: ojo en semitono y “Watch Your Demons”",
      "Etiqueta SURE en el cuello",
    ],
    care,
    images: [
      photo("camiseta-frente-modelo", "Modelo de frente con la camiseta Disidencia blanca y el ojo rojo al pecho", "Frente"),
      photo("camiseta-espalda", "Espalda de la camiseta Disidencia: ojo rojo en semitono y Watch Your Demons", "Espalda"),
      photo("camiseta-pareja", "Pareja con la camiseta Disidencia; se ve Watch Your Demons en el ruedo", "En modelo"),
      photo("camiseta-duo", "Dos modelos con la camiseta Disidencia blanca", "En modelo"),
    ],
    stock: { S: 20, M: 20, L: 20, XL: 20 },
    measurements: [
      { label: "Ancho de pecho", values: { S: 56, M: 58, L: 61, XL: 64 } },
      { label: "Largo total", values: { S: 70, M: 72, L: 74, XL: 76 } },
      { label: "Largo de manga", values: { S: 22, M: 23, L: 24, XL: 25 } },
    ],
    fitNote: "Corte oversize. Si lo quieres más ajustado, pide una talla menos.",
  },
  {
    slug: "camiseta-disidencia-gris",
    name: "Camiseta Disidencia gris",
    short: "Camiseta gris",
    color: "Gris",
    price: 120000,
    collection: "Disidencia",
    description:
      "Camiseta gris oscuro con lavado, corte oversize y hombro caído. El logo Sure en cursiva al pecho, los cuernos SURE en la manga y costuras marcadas que recorren el frente y la espalda.",
    details: [
      "Corte oversize, hombro caído",
      "Gris oscuro con lavado",
      "Logo Sure en cursiva al pecho",
      "Cuernos SURE en la manga",
      "Costuras marcadas en frente y espalda",
    ],
    care,
    images: [
      photo("disidencia-gris-ella-frente", "Modelo de frente con la camiseta Disidencia gris y el logo Sure al pecho", "Frente", 1032, 1290),
      photo("disidencia-gris-ella-atras", "Espalda de la camiseta Disidencia gris con las costuras marcadas", "Espalda", 963, 1204),
      photo("disidencia-gris-el-calle", "Modelo en la calle con la camiseta Disidencia gris y el logo Sure al pecho", "En modelo", 1024, 1280),
      photo("disidencia-gris-pareja", "Detalle de los cuernos SURE en la manga y el logo al pecho; ella con el zip hoodie Conflict Unknown", "Detalle", 1025, 1281),
      photo("disidencia-gris-sofa", "Modelo sentado con la camiseta Disidencia gris: logo Sure al pecho y cuernos en la manga", "En modelo", 960, 1200),
    ],
    stock: { S: 20, M: 20, L: 20, XL: 20 },
    measurements: [
      { label: "Ancho de pecho", values: { S: 56, M: 58, L: 61, XL: 64 } },
      { label: "Largo total", values: { S: 70, M: 72, L: 74, XL: 76 } },
      { label: "Largo de manga", values: { S: 22, M: 23, L: 24, XL: 25 } },
    ],
    fitNote: "Corte oversize. Si lo quieres más ajustado, pide una talla menos.",
  },
  {
    slug: "hoodie-disidencia",
    name: "Hoodie Disidencia",
    short: "Hoodie",
    color: "Negro",
    price: 160000,
    collection: "Disidencia",
    description:
      "Hoodie negro de corte amplio. El monograma S al pecho, “Surewearco” en la manga y, en la espalda, un rostro en blanco entre “Sure” y “Demons” en rojo.",
    details: [
      "Corte amplio, hombro caído",
      "100 % algodón",
      "Monograma S al pecho",
      "“Surewearco” en caligrafía sobre la manga",
      "Espalda: rostro en blanco con “Sure” y “Demons” en rojo",
      "Capucha doble y bolsillo canguro",
    ],
    care,
    images: [
      photo("hoodie-frente-modelo", "Modelo de frente con el hoodie Disidencia negro y el monograma S al pecho", "Frente"),
      photo("hoodie-espalda", "Espalda del hoodie Disidencia: rostro en blanco con Sure y Demons en rojo", "Espalda"),
      photo("hoodie-manga", "Modelo sentada en una escalera con el hoodie Disidencia; se ve Surewearco en la manga", "En modelo"),
      photo("hoodie-modelo", "Modelo agachado con el hoodie Disidencia; se ve la manga estampada", "En modelo"),
      photo("hoodie-escalera", "Modelo en una escalera de ladrillo con el hoodie Disidencia negro", "En modelo"),
    ],
    stock: { S: 20, M: 20, L: 20, XL: 20 },
    measurements: [
      { label: "Ancho de pecho", values: { S: 60, M: 63, L: 66, XL: 69 } },
      { label: "Largo total", values: { S: 66, M: 68, L: 70, XL: 72 } },
      { label: "Largo de manga", values: { S: 57, M: 58, L: 59, XL: 60 } },
    ],
    fitNote: "Corte amplio. Para un fit regular, pide una talla menos.",
  },
  {
    slug: "zip-hoodie-conflict-unknown",
    name: "Zip hoodie Conflict Unknown",
    short: "Zip hoodie",
    color: "Negro",
    price: 180000,
    collection: "Disidencia",
    description:
      "Zip hoodie negro de corte amplio. En la espalda, un boxeador contra un esqueleto de pantaloneta y guantes rojos, con “Conflict unknown” en caligrafía roja. Adelante, los cuernos SURE bordados en rojo al pecho.",
    details: [
      "Corte amplio, hombro caído",
      "Cierre completo y capucha",
      "Cuernos SURE bordados en rojo al pecho",
      "Espalda: boxeador contra esqueleto y “Conflict unknown” en rojo",
      "Bolsillos delanteros",
      "Puños y ruedo en resorte",
    ],
    care,
    cardImage: photo("conflict-pareja-ancha", "Pareja con el zip hoodie Conflict Unknown: él de espaldas con el boxeador, ella de frente con los cuernos rojos", "En modelo", 1600, 1200),
    featured: true,
    images: [
      photo("conflict-espalda", "Espalda del zip hoodie Conflict Unknown: boxeador contra esqueleto y Conflict unknown en rojo", "Espalda", 1200, 1500),
      photo("conflict-frente", "Modelo con el zip hoodie Conflict Unknown abierto y los cuernos rojos al pecho", "Frente", 1333, 1666),
      photo("conflict-pareja", "Modelo de frente con los cuernos al pecho y modelo de espaldas con el estampado del boxeador", "En modelo", 1333, 1666),
      photo("conflict-espalda-ella", "Modelo de espaldas abriendo la capucha del zip hoodie Conflict Unknown", "Espalda", 1333, 1666),
      photo("conflict-abierto", "Modelo sonriendo con el zip hoodie Conflict Unknown abierto sobre la camiseta Disidencia gris", "En modelo", 1200, 1500),
      photo("conflict-sofa", "Pareja en un sofá: ella con el zip hoodie Conflict Unknown, él con la camiseta Disidencia gris", "En modelo", 960, 1200),
    ],
    stock: { S: 20, M: 20, L: 20, XL: 20 },
    measurements: [
      { label: "Ancho de pecho", values: { S: 60, M: 63, L: 66, XL: 69 } },
      { label: "Largo total", values: { S: 66, M: 68, L: 70, XL: 72 } },
      { label: "Largo de manga", values: { S: 57, M: 58, L: 59, XL: 60 } },
    ],
    fitNote: "Corte amplio. Para un fit regular, pide una talla menos.",
  },
];

// Lo que se vende: todo lo que no está oculto
// La destacada va primero; las demás conservan su orden.
export const products = catalog.filter((p) => !p.hidden).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export function getProduct(slug: string, lang: Lang = "es") {
  const p = products.find((x) => x.slug === slug);
  return p && localizeProduct(p, lang);
}

export function totalStock(p: Product) {
  return SIZES.reduce((n, s) => n + p.stock[s], 0);
}

/* Inglés: mismos productos, textos traducidos. Las fotos y medidas van en el mismo orden que arriba. */
type ProductText = Pick<Product, "name" | "short" | "color" | "description" | "details" | "care" | "fitNote"> & {
  alts: string[];
  cardAlt?: string;
  measurementLabels: string[];
};

const careEn = ["Wash inside out, cold water, gentle cycle.", "No bleach, no tumble dry.", "Do not iron over the print."];
const measurementLabelsEn = ["Chest width", "Total length", "Sleeve length"];

const english: Record<string, ProductText> = {
  "camiseta-disidencia": {
    name: "Disidencia Tee",
    short: "Tee",
    color: "White",
    description:
      "Oversized white tee with the red eye on the chest. On the back, the halftone eye and “Watch Your Demons” in script. Dropped shoulder and a thick collar.",
    details: [
      "Oversized fit, dropped shoulder",
      "100% cotton",
      "Red eye on the chest and “Watch Your Demons” on the hem",
      "Back: halftone eye and “Watch Your Demons”",
      "SURE label at the neck",
    ],
    care: careEn,
    fitNote: "Oversized fit. For a closer fit, size down.",
    alts: [
      "Model wearing the white Disidencia tee, red eye on the chest",
      "Back of the Disidencia tee: halftone red eye and Watch Your Demons",
      "Couple wearing the Disidencia tee; Watch Your Demons on the hem",
      "Two models in the white Disidencia tee",
    ],
    measurementLabels: measurementLabelsEn,
  },
  "camiseta-disidencia-gris": {
    name: "Disidencia Tee, Grey",
    short: "Grey tee",
    color: "Grey",
    description:
      "Washed dark grey tee, oversized with a dropped shoulder. The Sure script logo on the chest, the SURE horns on the sleeve and bold seams running across the front and back.",
    details: [
      "Oversized fit, dropped shoulder",
      "Washed dark grey",
      "Sure script logo on the chest",
      "SURE horns on the sleeve",
      "Bold seams on the front and back",
    ],
    care: careEn,
    fitNote: "Oversized fit. For a closer fit, size down.",
    alts: [
      "Model facing the camera in the grey Disidencia tee, Sure logo on the chest",
      "Back of the grey Disidencia tee with its bold seams",
      "Model on the street in the grey Disidencia tee, Sure logo on the chest",
      "Close-up of the SURE horns on the sleeve and the logo on the chest; she wears the Conflict Unknown zip hoodie",
      "Model sitting in the grey Disidencia tee: Sure logo on the chest and horns on the sleeve",
    ],
    measurementLabels: measurementLabelsEn,
  },
  "zip-hoodie-conflict-unknown": {
    name: "Conflict Unknown Zip Hoodie",
    short: "Zip hoodie",
    color: "Black",
    description:
      "Relaxed black zip hoodie. On the back, a boxer squaring up to a skeleton in red shorts and gloves, with “Conflict unknown” in red script. On the front, the SURE horns embroidered in red on the chest.",
    details: [
      "Relaxed fit, dropped shoulder",
      "Full zip and hood",
      "SURE horns embroidered in red on the chest",
      "Back: boxer vs. skeleton and “Conflict unknown” in red",
      "Front pockets",
      "Ribbed cuffs and hem",
    ],
    care: careEn,
    fitNote: "Relaxed fit. For a regular fit, size down.",
    cardAlt: "Couple in the Conflict Unknown zip hoodie: him from behind with the boxer print, her from the front with the red horns",
    alts: [
      "Back of the Conflict Unknown zip hoodie: boxer vs. skeleton and Conflict unknown in red",
      "Model in the open Conflict Unknown zip hoodie with the red horns on the chest",
      "One model facing front with the horns on the chest, another from behind showing the boxer print",
      "Model from behind pulling up the hood of the Conflict Unknown zip hoodie",
      "Model smiling in the open Conflict Unknown zip hoodie over the grey Disidencia tee",
      "Couple on a sofa: her in the Conflict Unknown zip hoodie, him in the grey Disidencia tee",
    ],
    measurementLabels: measurementLabelsEn,
  },
  "hoodie-disidencia": {
    name: "Disidencia Hoodie",
    short: "Hoodie",
    color: "Black",
    description:
      "Relaxed black hoodie. The S monogram on the chest, “Surewearco” on the sleeve and, on the back, a white face between “Sure” and “Demons” in red.",
    details: [
      "Relaxed fit, dropped shoulder",
      "100% cotton",
      "S monogram on the chest",
      "“Surewearco” in script on the sleeve",
      "Back: white face with “Sure” and “Demons” in red",
      "Double-layer hood and kangaroo pocket",
    ],
    care: careEn,
    fitNote: "Relaxed fit. For a regular fit, size down.",
    alts: [
      "Model wearing the black Disidencia hoodie, S monogram on the chest",
      "Back of the Disidencia hoodie: white face with Sure and Demons in red",
      "Model sitting on a staircase in the Disidencia hoodie; Surewearco on the sleeve",
      "Model crouching in the Disidencia hoodie, printed sleeve in view",
      "Model on a brick staircase in the black Disidencia hoodie",
    ],
    measurementLabels: measurementLabelsEn,
  },
};

// Producto en el idioma pedido (el slug, precio, stock y fotos no cambian)
export function localizeProduct(p: Product, lang: Lang): Product {
  const t = lang === "en" ? english[p.slug] : undefined;
  if (!t) return p;
  const { alts, measurementLabels, cardAlt, ...text } = t;
  return {
    ...p,
    ...text,
    cardImage: p.cardImage && { ...p.cardImage, alt: cardAlt ?? p.cardImage.alt },
    images: p.images.map((img, i) => ({ ...img, alt: alts[i] ?? img.alt })),
    measurements: p.measurements.map((m, i) => ({ ...m, label: measurementLabels[i] ?? m.label })),
  };
}

export function productsFor(lang: Lang) {
  return products.map((p) => localizeProduct(p, lang));
}
