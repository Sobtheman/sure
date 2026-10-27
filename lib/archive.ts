/* Archivo: colecciones anteriores, ya agotadas. Orden cronológico.
   Fotos originales de las sesiones de SURE (máximo 8 por colección). */

import type { Lang } from "@/lib/i18n";

export type ArchiveImage = { src: string; alt: string; width: number; height: number };

export type ArchiveCollection = {
  slug: string;
  year: number;
  name: string;
  note: string;
  story: string[];
  pieces: { name: string; detail: string }[];
  cover: ArchiveImage;
  images: ArchiveImage[];
};

const v = (src: string, alt: string): ArchiveImage => ({ src: `/img/archivo/${src}.jpg`, alt, width: 1500, height: 2000 });
const h = (src: string, alt: string): ArchiveImage => ({ src: `/img/archivo/${src}.jpg`, alt, width: 2000, height: 1500 });

export const archive: ArchiveCollection[] = [
  {
    slug: "intrinsic",
    year: 2025,
    name: "Intrinsic",
    note: "Blanco, negro y el logo al pecho.",
    story: [
      "La primera colección de SURE. Dos camisetas, blanco y negro, con el logo al pecho.",
      "Se fotografió en la calle, contra grafiti, en puertas viejas del centro y de noche. Así empezó todo.",
    ],
    pieces: [
      { name: "Camiseta Intrinsic blanca", detail: "Logo S negro al pecho, “Sure” a la espalda" },
      { name: "Camiseta Intrinsic negra", detail: "Logo S blanco al pecho" },
    ],
    cover: v("intrinsic-grafiti", "Pareja frente a un muro de grafiti con las camisetas Intrinsic blanca y negra"),
    images: [
      v("intrinsic-puerta", "Dos personas en la escalera de una casa antigua con las camisetas Intrinsic"),
      v("intrinsic-calle", "Modelo con la camiseta Intrinsic blanca y pantalón café en una calle con grafiti"),
      v("intrinsic-sofa", "Pareja en un sofá verde de cuero con la camiseta Intrinsic negra"),
      v("intrinsic-pared", "Modelo con la camiseta Intrinsic blanca frente a una pared negra"),
      v("intrinsic-logo", "Detalle del logo S negro al pecho de la camiseta Intrinsic blanca"),
      v("intrinsic-espalda", "Espalda de la camiseta Intrinsic blanca con “Sure” bajo el cuello"),
      v("intrinsic-grupo", "Cuatro personas frente a una pared negra con las camisetas Intrinsic"),
    ],
  },
  {
    slug: "niebla",
    year: 2026,
    name: "Niebla",
    note: "Lavado ácido y las letras SURE infladas.",
    story: [
      "Camisetas con lavado ácido, cada una distinta a la otra. Atrás, SURE en letras infladas a todo lo ancho de la espalda.",
      "Salió en gris y negro, y después en crop rosa y negro.",
    ],
    pieces: [
      { name: "Camiseta Niebla", detail: "Gris o negra, lavado ácido, SURE inflado a la espalda" },
      { name: "Crop Niebla", detail: "Rosa o negro, corte a la cintura, corazón SURE al pecho" },
    ],
    cover: v("niebla-espaldas", "Tres personas de espaldas con las camisetas Niebla y las letras SURE infladas"),
    images: [
      v("niebla-plano", "Camiseta Niebla gris sobre el piso, vista de espalda con las letras SURE"),
      v("niebla-caminando", "Modelo caminando de espaldas con la camiseta Niebla gris"),
      v("niebla-grafiti", "Tres personas con camisetas Niebla frente a una puerta con grafiti"),
      v("niebla-espalda", "Modelo de espaldas contra una pared de concreto con la camiseta Niebla"),
      v("niebla-fit", "Modelo de cuerpo entero con la camiseta Niebla gris como vestido"),
      h("niebla-pink-escalera", "Tres modelos en una escalera con los crops Niebla rosa y negro"),
      h("niebla-pink-noche", "Cuatro modelos frente a un mural con los crops Niebla"),
    ],
  },
  {
    slug: "niebla-x-ivy",
    year: 2026,
    name: "Niebla x Ivy",
    note: "Lavado ácido en gris carbón y vino tinto, con SURE en morado.",
    story: [
      "Niebla x Ivy toma el lavado ácido de Niebla y lo lleva a otro tono: gris carbón, SURE en morado al pecho, los cuernos en el ruedo y SURE con cuernos a lo largo de la espalda.",
      "En crop salió en gris carbón y en vino tinto; el vino tinto lleva el corazón SURE adelante y el logo con cuernos atrás, en el ruedo.",
    ],
    pieces: [
      { name: "Camiseta Niebla x Ivy", detail: "Gris carbón, lavado ácido, SURE morado al pecho y con cuernos a la espalda" },
      { name: "Crop Niebla x Ivy gris carbón", detail: "SURE morado al pecho, cuernos en el ruedo" },
      { name: "Crop Niebla x Ivy vino tinto", detail: "Corazón SURE al pecho, logo con cuernos atrás" },
    ],
    cover: v("niebla-ivy-trio", "Dos modelos con el crop vino tinto y un modelo con la camiseta gris carbón Niebla x Ivy"),
    images: [
      v("niebla-ivy-noche", "Pareja de noche junto a un carro rojo con la camiseta gris carbón y el crop vino tinto"),
      v("niebla-ivy-bar", "Pareja en un bar con la camiseta y el crop gris carbón; atrás, SURE con cuernos en morado"),
      { src: "/img/archivo/niebla-ivy-crops.jpg", alt: "Dos modelos con el crop vino tinto: una de espaldas con el logo en el ruedo y otra con el corazón SURE al pecho", width: 2000, height: 1508 },
      v("niebla-ivy-cafe", "Modelo con abrigo de peluche y modelo con la camiseta gris carbón en un café"),
      v("niebla-ivy-escalinata", "Dos modelos sentadas en una escalinata con los crops gris carbón y SURE en morado"),
      h("niebla-ivy-selfie", "Tres amigas tomándose una selfie con los crops gris carbón Niebla x Ivy"),
      v("niebla-ivy-cuernos", "Modelo con la camiseta gris carbón y los cuernos en el ruedo, entre dos crops vino tinto"),
    ],
  },
  {
    slug: "sure26",
    year: 2026,
    name: "Sure26",
    note: "La camiseta de fútbol de SURE.",
    story: ["Camiseta de fútbol negra a rayas finas, con cuello de polo, SURE al pecho y el 10 en la espalda."],
    pieces: [{ name: "Camiseta Sure26", detail: "Negra a rayas, cuello de polo, número 10 a la espalda" }],
    cover: {
      src: "/img/archivo/sure26-mural.jpg",
      alt: "Modelo con la camiseta Sure26 frente a un mural con el logo SURE",
      width: 993,
      height: 1251,
    },
    images: [
      { src: "/img/archivo/sure26-museo.jpg", alt: "Modelo de espaldas en un museo con la camiseta Sure26 y el número 10", width: 1041, height: 1221 },
      { src: "/img/archivo/sure26-camisetas.jpg", alt: "Dos personas con la camiseta Sure26, una de espaldas con el número 10", width: 1179, height: 1348 },
      { src: "/img/archivo/sure26-pareja.jpg", alt: "Pareja en la calle con la camiseta Sure26", width: 1018, height: 1269 },
      { src: "/img/archivo/sure26-terraza.jpg", alt: "Modelo de cuerpo entero con la camiseta Sure26 en una terraza", width: 978, height: 1239 },
      { src: "/img/archivo/sure26-balon.jpg", alt: "Modelo celebrando con un balón y la camiseta Sure26", width: 1036, height: 1236 },
    ],
  },
];

/* Inglés: mismas colecciones y fotos, textos traducidos. Las descripciones de fotos van en el orden de images. */
type CollectionText = Pick<ArchiveCollection, "note" | "story" | "pieces"> & { coverAlt: string; alts: string[] };

const english: Record<string, CollectionText> = {
  intrinsic: {
    note: "Black, white and the logo on the chest.",
    story: [
      "SURE's first collection. Two tees, black and white, with the logo on the chest.",
      "Shot on the street, against graffiti, in old downtown doorways and at night. That's how it all started.",
    ],
    pieces: [
      { name: "Intrinsic tee, white", detail: "Black S logo on the chest, “Sure” on the back" },
      { name: "Intrinsic tee, black", detail: "White S logo on the chest" },
    ],
    coverAlt: "Couple in front of a graffiti wall wearing the white and black Intrinsic tees",
    alts: [
      "Two people on the steps of an old house wearing Intrinsic tees",
      "Model in the white Intrinsic tee and brown pants on a graffiti street",
      "Couple on a green leather sofa, one in the black Intrinsic tee",
      "Model in the white Intrinsic tee against a black wall",
      "Close-up of the black S logo on the chest of the white Intrinsic tee",
      "Back of the white Intrinsic tee with “Sure” under the collar",
      "Four people against a black wall wearing Intrinsic tees",
    ],
  },
  niebla: {
    note: "Acid wash and puffy SURE letters.",
    story: [
      "Acid-washed tees, no two alike. On the back, SURE in puffy letters across the whole width.",
      "It came in grey and black, and later as a crop in pink and black.",
    ],
    pieces: [
      { name: "Niebla tee", detail: "Grey or black, acid wash, puffy SURE on the back" },
      { name: "Niebla crop", detail: "Pink or black, cropped at the waist, SURE heart on the chest" },
    ],
    coverAlt: "Three people from behind wearing Niebla tees with the puffy SURE letters",
    alts: [
      "Grey Niebla tee laid flat on the pavement, back view with the SURE letters",
      "Model walking away in the grey Niebla tee",
      "Three people in Niebla tees in front of a graffiti door",
      "Model from behind against a concrete wall in the Niebla tee",
      "Full-length shot of a model wearing the grey Niebla tee as a dress",
      "Three models on a staircase in the pink and black Niebla crops",
      "Four models in front of a mural wearing Niebla crops",
    ],
  },
  "niebla-x-ivy": {
    note: "Acid wash in charcoal and wine, with SURE in purple.",
    story: [
      "Niebla x Ivy takes the Niebla acid wash to a new shade: charcoal, SURE in purple on the chest, horns on the hem and a horned SURE running down the back.",
      "The crop came in charcoal and in wine; the wine one has the SURE heart on the front and the horned logo on the back hem.",
    ],
    pieces: [
      { name: "Niebla x Ivy tee", detail: "Charcoal, acid wash, purple SURE on the chest and horned SURE on the back" },
      { name: "Niebla x Ivy crop, charcoal", detail: "Purple SURE on the chest, horns on the hem" },
      { name: "Niebla x Ivy crop, wine", detail: "SURE heart on the chest, horned logo on the back" },
    ],
    coverAlt: "Two models in the wine crop and one model in the charcoal Niebla x Ivy tee",
    alts: [
      "Couple at night next to a red car, in the charcoal tee and the wine crop",
      "Couple at a bar in the charcoal tee and crop; on the back, a horned SURE in purple",
      "Two models in the wine crop: one from behind with the logo on the hem, one with the SURE heart on the chest",
      "Model in a faux fur coat and model in the charcoal tee at a café",
      "Two models sitting on wide steps in the charcoal crops with SURE in purple",
      "Three friends taking a selfie in the charcoal Niebla x Ivy crops",
      "Model in the charcoal tee with horns on the hem, between two wine crops",
    ],
  },
  sure26: {
    note: "SURE's football jersey.",
    story: ["A black pinstriped football jersey with a polo collar, SURE on the chest and the number 10 on the back."],
    pieces: [{ name: "Sure26 jersey", detail: "Black pinstripes, polo collar, number 10 on the back" }],
    coverAlt: "Model in the Sure26 jersey in front of a mural with the SURE logo",
    alts: [
      "Model from behind in a museum wearing the Sure26 jersey with the number 10",
      "Two people in the Sure26 jersey, one from behind showing the number 10",
      "Couple on the street wearing the Sure26 jersey",
      "Full-length shot of a model in the Sure26 jersey on a rooftop terrace",
      "Model celebrating with a football in the Sure26 jersey",
    ],
  },
};

// Colección en el idioma pedido (slug, año, nombre y fotos no cambian)
export function localizeCollection(c: ArchiveCollection, lang: Lang): ArchiveCollection {
  const t = lang === "en" ? english[c.slug] : undefined;
  if (!t) return c;
  return {
    ...c,
    note: t.note,
    story: t.story,
    pieces: t.pieces,
    cover: { ...c.cover, alt: t.coverAlt },
    images: c.images.map((img, i) => ({ ...img, alt: t.alts[i] ?? img.alt })),
  };
}

export function archiveFor(lang: Lang) {
  return archive.map((c) => localizeCollection(c, lang));
}

export function getCollection(slug: string, lang: Lang = "es") {
  const c = archive.find((x) => x.slug === slug);
  return c && localizeCollection(c, lang);
}
