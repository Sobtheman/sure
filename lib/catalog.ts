/* SURE — catálogo.
   Precios confirmados. Stock, medidas y composición son POR CONFIRMAR
   (valores de demo para que el sitio se vea y funcione completo). */

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
  tagline: string;
  description: string;
  details: string[];
  care: string[];
  images: ProductImage[];
  stock: Record<Size, number>; // POR CONFIRMAR
  measurements: { label: string; values: Record<Size, number> }[]; // cm, POR CONFIRMAR
  fitNote: string;
};

export const SIZES: Size[] = ["S", "M", "L", "XL"];
export const LOW_STOCK = 3;

const care = [
  "Lavar al revés, en agua fría y ciclo delicado.",
  "No usar blanqueador ni secadora.",
  "No planchar sobre el estampado.",
];

export const products: Product[] = [
  {
    slug: "camiseta-dissidencia",
    name: "Camiseta Dissidencia",
    short: "Camiseta",
    color: "Blanco",
    price: 90000,
    collection: "Dissidencia",
    tagline: "Watch Your Demons",
    description:
      "Camiseta blanca de corte amplio con el ojo rojo de Dissidencia al pecho y “Watch Your Demons” en caligrafía sobre el ruedo. Hombro caído, cuello grueso y caída pesada.",
    details: [
      "Fit oversize, hombro caído",
      "100 % algodón, tejido de punto pesado", // POR CONFIRMAR
      "Estampado frontal en rojo y frase en el ruedo",
      "Etiqueta SURE en el cuello",
    ],
    care,
    images: [
      {
        src: "/img/producto/camiseta-frente.jpg",
        alt: "Camiseta Dissidencia blanca, vista de frente, con ojo rojo al pecho y la frase Watch Your Demons en el ruedo",
        view: "Frente",
        width: 792,
        height: 990,
      },
      {
        src: "/img/producto/camiseta-modelo.jpg",
        alt: "Dos modelos con la camiseta Dissidencia blanca sentadas en un sofá de cuero",
        view: "En modelo",
        width: 960,
        height: 720,
      },
    ],
    stock: { S: 8, M: 14, L: 10, XL: 3 },
    measurements: [
      { label: "Ancho de pecho", values: { S: 56, M: 58, L: 61, XL: 64 } },
      { label: "Largo total", values: { S: 70, M: 72, L: 74, XL: 76 } },
      { label: "Largo de manga", values: { S: 22, M: 23, L: 24, XL: 25 } },
    ],
    fitNote: "Corte amplio. Si buscas un fit más ajustado, pide una talla menos.",
  },
  {
    slug: "hoodie-dissidencia",
    name: "Hoodie Dissidencia",
    short: "Hoodie",
    color: "Negro",
    price: 130000,
    collection: "Dissidencia",
    tagline: "El monograma S",
    description:
      "Hoodie negro con el monograma S de SURE al pecho y repetido en la manga. Capucha doble, bolsillo canguro y puños en rib.",
    details: [
      "Fit amplio, hombro caído",
      "Algodón perchado por dentro", // POR CONFIRMAR
      "Monograma S estampado en el pecho y en la manga",
      "Capucha doble sin cordón, bolsillo canguro",
    ],
    care,
    images: [
      {
        src: "/img/producto/hoodie-frente.jpg",
        alt: "Hoodie Dissidencia negro, vista de frente, con el monograma S blanco al pecho y en la manga",
        view: "Frente",
        width: 808,
        height: 1010,
      },
    ],
    stock: { S: 5, M: 9, L: 6, XL: 0 },
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
