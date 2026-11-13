/* Archivo: colecciones anteriores, ya agotadas. Orden cronológico.
   Fotos originales de las sesiones de SURE, en número par por colección (con la portada). */

import type { Lang } from "@/lib/i18n";

export type ArchiveImage = { src: string; alt: string; width: number; height: number };

export type ArchiveCollection = {
  slug: string;
  year: number;
  name: string;
  note: string; // línea de hechos: qué salió, colores
  tagline?: string; // título de la historia, en palabras de SURE
  story: string[]; // la historia contada por SURE
  seoTitle: string; // título completo para Google
  seoDescription: string;
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
    note: "Dos camisetas básicas, blanca y negra, con el logo S al pecho.",
    story: [
      "Antes de las colecciones y de todo lo que hoy representa SURE, hubo una primera intención: crear algo propio. Intrinsic fue nuestro punto de partida, el primer paso de un sueño que comenzaba a hacerse realidad.",
      "Nuestra primera colección estuvo compuesta por dos camisetas básicas, una negra y una blanca. En ellas plasmamos los primeros símbolos de nuestra identidad y una idea sencilla: la seguridad no debería depender de lo que otros piensen de nosotros.",
      "Hoy, Intrinsic es mucho más que nuestra primera colección. Es el recuerdo de dónde empezó todo y la primera pieza de una historia que seguimos construyendo.",
    ],
    seoTitle: "Intrinsic — Primera colección de SURE",
    seoDescription:
      "Intrinsic, la primera colección de SURE (2025): dos camisetas básicas, blanca y negra, y una idea: la seguridad no depende de lo que otros piensen.",
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
    note: "Camiseta gris con lavado ácido y las letras SURE dispersas en la espalda.",
    tagline: "Cuando todo se vuelve borroso",
    story: [
      "A veces la mente se llena de pensamientos, dudas y preguntas. Todo empieza a mezclarse y aquello que antes parecía claro comienza a sentirse distante.",
      "Esta colección nace de ese estado: la niebla mental. Nuestra segunda entrega llevó esa idea a una camiseta gris, con las letras de SURE dispersas en su estampado, como fragmentos de una identidad que parecen perderse entre la niebla.",
      "Porque no siempre tenemos todo claro. No siempre sabemos qué hacer o hacia dónde ir. Y eso también hace parte de nuestra experiencia.",
    ],
    seoTitle: "Niebla — Camiseta gris gráfica de SURE",
    seoDescription:
      "Niebla, la segunda colección de SURE: una camiseta gris con lavado ácido y las letras SURE dispersas en el estampado, inspirada en la niebla mental.",
    pieces: [{ name: "Camiseta Niebla", detail: "Gris, lavado ácido, letras SURE dispersas en la espalda" }],
    cover: v("niebla-espaldas", "Tres personas de espaldas con las camisetas Niebla y las letras SURE en la espalda"),
    images: [
      v("niebla-plano", "Camiseta Niebla gris sobre el piso, vista de espalda con las letras SURE"),
      v("niebla-caminando", "Modelo caminando de espaldas con la camiseta Niebla gris"),
      v("niebla-grafiti", "Tres personas con camisetas Niebla gris frente a una puerta con grafiti"),
      v("niebla-espalda", "Modelo de espaldas contra una pared de concreto con la camiseta Niebla"),
      v("niebla-fit", "Modelo de cuerpo entero con la camiseta Niebla gris como vestido"),
    ],
  },
  {
    slug: "niebla-x-ivy",
    year: 2026,
    name: "Niebla x Ivy",
    note: "Camiseta y crops con lavado ácido en negro, morado y rosado.",
    tagline: "La niebla tiene más de un color",
    story: [
      "No todos vivimos la niebla de la misma manera. A veces es oscura, otras veces toma nuevos matices y formas. Pero todos, en algún momento, podemos encontrarnos dentro de ella.",
      "Esta colección continúa explorando ese estado mental desde diferentes perspectivas. El negro, el morado y el rosado representan distintas formas de expresarnos, porque aunque compartamos experiencias, cada uno las vive a su manera.",
      "La niebla no distingue entre hombres y mujeres. Simplemente hace parte de lo que somos.",
    ],
    seoTitle: "Niebla x Ivy — Colección negro, morado y rosado de SURE",
    seoDescription:
      "Niebla x Ivy de SURE: camiseta y crops con lavado ácido en negro, morado y rosado. La niebla tiene más de un color y cada uno la vive a su manera.",
    pieces: [
      { name: "Camiseta Niebla x Ivy", detail: "Negra, lavado ácido, SURE morado al pecho y con cuernos a la espalda" },
      { name: "Crop Niebla x Ivy negro", detail: "SURE morado al pecho, cuernos en el ruedo" },
      { name: "Crop Niebla x Ivy morado", detail: "Corazón SURE al pecho, logo con cuernos atrás" },
      { name: "Crop Niebla x Ivy rosado", detail: "Corazón SURE al pecho" },
    ],
    cover: v("niebla-ivy-trio", "Dos modelos con el crop morado y un modelo con la camiseta negra Niebla x Ivy"),
    images: [
      v("niebla-ivy-noche", "Pareja de noche junto a un carro rojo con la camiseta negra y el crop morado"),
      v("niebla-ivy-bar", "Pareja en un bar con la camiseta y el crop negros; atrás, SURE con cuernos en morado"),
      { src: "/img/archivo/niebla-ivy-crops.jpg", alt: "Dos modelos con el crop morado: una de espaldas con el logo en el ruedo y otra con el corazón SURE al pecho", width: 2000, height: 1508 },
      v("niebla-ivy-cafe", "Modelo con abrigo de peluche y modelo con la camiseta negra en un café"),
      v("niebla-ivy-escalinata", "Dos modelos sentadas en una escalinata con los crops negros y SURE en morado"),
      h("niebla-ivy-selfie", "Tres amigas tomándose una selfie con los crops negros Niebla x Ivy"),
      v("niebla-ivy-cuernos", "Modelo con la camiseta negra y los cuernos en el ruedo, entre dos crops morados"),
      h("niebla-pink-escalera", "Tres modelos en una escalera con los crops Niebla x Ivy rosado y negro"),
      h("niebla-pink-noche", "Cuatro modelos frente a un mural con los crops Niebla x Ivy rosado y negro"),
    ],
  },
  {
    slug: "sure26",
    year: 2026,
    name: "SURE26",
    note: "Camiseta de fútbol retro negra a rayas, la primera hecha 100% por SURE.",
    tagline: "Made from zero. Made by SURE.",
    story: [
      "SURE26 marca un nuevo capítulo en nuestra historia: nuestra primera colección creada 100% por SURE.",
      "Desde el diseño inicial hasta la elección de la tela y todo el proceso de confección, cada detalle estuvo en nuestras manos. Una camiseta de inspiración futbolera retro, como homenaje a la Copa del Mundo 2026 y a la capacidad de superar nuestros límites, creer en nosotros y perseguir nuestros objetivos.",
      "Esta vez, la historia también nos llevó a México, donde compartimos nuestra propuesta, conectamos con nuevas personas y seguimos construyendo comunidad.",
    ],
    seoTitle: "SURE26 — Camiseta de fútbol retro de SURE",
    seoDescription:
      "SURE26: camiseta de fútbol retro negra a rayas, la primera prenda hecha 100% por SURE, del diseño a la confección, en homenaje al Mundial 2026.",
    pieces: [{ name: "Camiseta SURE26", detail: "Negra a rayas, cuello de polo, número 10 a la espalda" }],
    cover: {
      src: "/img/archivo/sure26-mural.jpg",
      alt: "Modelo con la camiseta SURE26 frente a un mural con el logo SURE",
      width: 993,
      height: 1251,
    },
    images: [
      { src: "/img/archivo/sure26-museo.jpg", alt: "Modelo de espaldas en un museo con la camiseta SURE26 y el número 10", width: 1041, height: 1221 },
      { src: "/img/archivo/sure26-camisetas.jpg", alt: "Dos personas con la camiseta SURE26, una de espaldas con el número 10", width: 1179, height: 1348 },
      { src: "/img/archivo/sure26-pareja.jpg", alt: "Pareja en la calle con la camiseta SURE26", width: 1018, height: 1269 },
      { src: "/img/archivo/sure26-terraza.jpg", alt: "Modelo de cuerpo entero con la camiseta SURE26 en una terraza", width: 978, height: 1239 },
      { src: "/img/archivo/sure26-balon.jpg", alt: "Modelo celebrando con un balón y la camiseta SURE26", width: 1036, height: 1236 },
    ],
  },
];

/* Inglés: mismas colecciones y fotos, textos traducidos. Las descripciones de fotos van en el orden de images. */
type CollectionText = Pick<ArchiveCollection, "note" | "tagline" | "story" | "seoTitle" | "seoDescription" | "pieces"> & {
  coverAlt: string;
  alts: string[];
};

const english: Record<string, CollectionText> = {
  intrinsic: {
    note: "Two basic tees, black and white, with the S logo on the chest.",
    story: [
      "Before the collections and everything SURE stands for today, there was a first intention: to create something of our own. Intrinsic was our starting point, the first step of a dream that was starting to come true.",
      "Our first collection was two basic tees, one black and one white. On them we put the first symbols of our identity and one simple idea: being sure of yourself shouldn't depend on what other people think of you.",
      "Today, Intrinsic is much more than our first collection. It's the memory of where it all began, and the first piece of a story we keep building.",
    ],
    seoTitle: "Intrinsic — SURE's first collection",
    seoDescription:
      "Intrinsic, SURE's first collection (2025): two basic tees, black and white, and one idea: being sure of yourself shouldn't depend on what others think.",
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
    note: "A grey acid-wash tee with the SURE letters scattered across the back.",
    tagline: "When everything gets blurry",
    story: [
      "Sometimes the mind fills up with thoughts, doubts and questions. Everything starts to blend together, and what once felt clear starts to feel distant.",
      "This collection comes from that state: mental fog. Our second drop turned that idea into a grey tee, with the SURE letters scattered across the print, like fragments of an identity getting lost in the fog.",
      "Because we don't always have it all figured out. We don't always know what to do or where to go. And that's part of our experience too.",
    ],
    seoTitle: "Niebla — SURE's grey graphic tee",
    seoDescription:
      "Niebla, SURE's second collection: a grey acid-wash tee with the SURE letters scattered across the print, inspired by mental fog.",
    pieces: [{ name: "Niebla tee", detail: "Grey, acid wash, SURE letters scattered across the back" }],
    coverAlt: "Three people from behind wearing Niebla tees with the SURE letters on the back",
    alts: [
      "Grey Niebla tee laid flat on the pavement, back view with the SURE letters",
      "Model walking away in the grey Niebla tee",
      "Three people in grey Niebla tees in front of a graffiti door",
      "Model from behind against a concrete wall in the Niebla tee",
      "Full-length shot of a model wearing the grey Niebla tee as a dress",
    ],
  },
  "niebla-x-ivy": {
    note: "An acid-wash tee and crops in black, purple and pink.",
    tagline: "Fog comes in more than one color",
    story: [
      "Not everyone lives the fog the same way. Sometimes it's dark; other times it takes on new shades and shapes. But all of us, at some point, can find ourselves inside it.",
      "This collection keeps exploring that state of mind from different perspectives. Black, purple and pink stand for different ways of expressing ourselves, because even when we share experiences, each of us lives them our own way.",
      "The fog doesn't tell men and women apart. It's simply part of who we are.",
    ],
    seoTitle: "Niebla x Ivy — SURE's black, purple and pink collection",
    seoDescription:
      "Niebla x Ivy by SURE: an acid-wash tee and crops in black, purple and pink. Fog comes in more than one color, and each of us lives it our own way.",
    pieces: [
      { name: "Niebla x Ivy tee", detail: "Black, acid wash, purple SURE on the chest and horned SURE on the back" },
      { name: "Niebla x Ivy crop, black", detail: "Purple SURE on the chest, horns on the hem" },
      { name: "Niebla x Ivy crop, purple", detail: "SURE heart on the chest, horned logo on the back" },
      { name: "Niebla x Ivy crop, pink", detail: "SURE heart on the chest" },
    ],
    coverAlt: "Two models in the purple crop and one model in the black Niebla x Ivy tee",
    alts: [
      "Couple at night next to a red car, in the black tee and the purple crop",
      "Couple at a bar in the black tee and crop; on the back, a horned SURE in purple",
      "Two models in the purple crop: one from behind with the logo on the hem, one with the SURE heart on the chest",
      "Model in a faux fur coat and model in the black tee at a coffee shop",
      "Two models sitting on wide steps in the black crops with SURE in purple",
      "Three friends taking a selfie in the black Niebla x Ivy crops",
      "Model in the black tee with horns on the hem, between two purple crops",
      "Three models on a staircase in the pink and black Niebla x Ivy crops",
      "Four models in front of a mural wearing the pink and black Niebla x Ivy crops",
    ],
  },
  sure26: {
    note: "A black pinstriped retro soccer jersey, the first piece made 100% by SURE.",
    tagline: "Made from zero. Made by SURE.",
    story: [
      "SURE26 marks a new chapter in our story: our first collection made 100% by SURE.",
      "From the first design to choosing the fabric and the whole making process, every detail was in our hands. A retro soccer-inspired jersey, as a tribute to the 2026 World Cup and to pushing past our limits, believing in ourselves and chasing our goals.",
      "This time, the story also took us to Mexico, where we shared what we do, connected with new people and kept building community.",
    ],
    seoTitle: "SURE26 — SURE's retro soccer jersey",
    seoDescription:
      "SURE26: a black pinstriped retro soccer jersey, the first piece made 100% by SURE, from design to sewing, as a tribute to the 2026 World Cup.",
    pieces: [{ name: "SURE26 jersey", detail: "Black pinstripes, polo collar, number 10 on the back" }],
    coverAlt: "Model in the SURE26 jersey in front of a mural with the SURE logo",
    alts: [
      "Model from behind in a museum wearing the SURE26 jersey with the number 10",
      "Two people in the SURE26 jersey, one from behind showing the number 10",
      "Couple on the street wearing the SURE26 jersey",
      "Full-length shot of a model in the SURE26 jersey on a rooftop terrace",
      "Model celebrating with a soccer ball in the SURE26 jersey",
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
    tagline: t.tagline,
    story: t.story,
    seoTitle: t.seoTitle,
    seoDescription: t.seoDescription,
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
