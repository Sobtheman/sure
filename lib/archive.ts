/* Archivo: colecciones anteriores, ya agotadas. Orden cronológico.
   Fotos originales de las sesiones de SURE (máximo 8 por colección). */

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
      "Salió en gris y negro, y después en crop: rosa, vino tinto y negro.",
    ],
    pieces: [
      { name: "Camiseta Niebla", detail: "Gris o negra, lavado ácido, SURE inflado a la espalda" },
      { name: "Crop Niebla", detail: "Rosa, vino tinto o negro, corte a la cintura, corazón SURE al pecho" },
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

export function getCollection(slug: string) {
  return archive.find((c) => c.slug === slug);
}
