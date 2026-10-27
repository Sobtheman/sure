/* SURE — catálogo de la colección actual.
   Precios confirmados. Stock y tabla de medidas son provisionales: se reemplazan
   aquí cuando llegue la información real. */

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
  // La primera foto es la principal; la segunda aparece al pasar el cursor en la tienda (la espalda).
  images: ProductImage[];
  stock: Record<Size, number>;
  measurements: { label: string; values: Record<Size, number> }[]; // cm
  fitNote: string;
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

export const products: Product[] = [
  {
    slug: "camiseta-disidencia",
    name: "Camiseta Disidencia",
    short: "Camiseta",
    color: "Blanco",
    price: 90000,
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
      photo("camiseta-frente", "Camiseta Disidencia blanca de frente, con el ojo rojo al pecho y Watch Your Demons en el ruedo", "Frente", 792, 990),
      photo("camiseta-espalda", "Espalda de la camiseta Disidencia: ojo rojo en semitono y Watch Your Demons", "Espalda"),
      photo("camiseta-frente-modelo", "Modelo de frente con la camiseta Disidencia blanca", "En modelo"),
      photo("camiseta-pareja", "Pareja con la camiseta Disidencia; se ve Watch Your Demons en el ruedo", "En modelo"),
      photo("camiseta-duo", "Dos modelos con la camiseta Disidencia blanca", "En modelo"),
      photo("camiseta-modelo", "Dos modelos con la camiseta Disidencia blanca en un sofá de cuero", "En modelo", 960, 720),
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
    price: 130000,
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
      photo("hoodie-frente", "Hoodie Disidencia negro de frente, con el monograma S al pecho y la manga estampada", "Frente", 808, 1010),
      photo("hoodie-espalda", "Espalda del hoodie Disidencia: rostro en blanco con Sure y Demons en rojo", "Espalda"),
      photo("hoodie-frente-modelo", "Modelo de frente con el hoodie Disidencia negro", "En modelo"),
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
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function totalStock(p: Product) {
  return SIZES.reduce((n, s) => n + p.stock[s], 0);
}
