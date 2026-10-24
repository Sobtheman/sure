/* Archivo editorial: colecciones anteriores, ya no disponibles.
   Las fotos marcadas "POR CONFIRMAR" se asignaron a la colección por su estilo. */

export type ArchiveImage = { src: string; alt: string; width: number; height: number };

export type ArchiveCollection = {
  slug: string;
  name: string;
  note: string;
  cover: ArchiveImage;
  images: ArchiveImage[];
};

export const archive: ArchiveCollection[] = [
  {
    slug: "niebla",
    name: "Niebla",
    note: "Lavado ácido, letras infladas y cielo gris.",
    cover: {
      src: "/img/archivo/niebla-afiche.jpg",
      alt: "Afiche de Niebla: camiseta gris con lavado ácido y letras SURE infladas entre nubes",
      width: 1179,
      height: 1252,
    },
    images: [
      {
        // POR CONFIRMAR: colección
        src: "/img/archivo/niebla-crop.jpg",
        alt: "Modelo con crop top vino tinto de lavado ácido y jean cargo",
        width: 940,
        height: 1395,
      },
    ],
  },
  {
    slug: "intrinsic",
    name: "Intrinsic",
    note: "Blanco y negro, contra la pared.",
    cover: {
      src: "/img/archivo/intrinsic-calle.jpg",
      alt: "Pareja frente a un muro de grafiti con camisetas Intrinsic blanca y negra",
      width: 1164,
      height: 1196,
    },
    images: [
      {
        // POR CONFIRMAR: colección
        src: "/img/archivo/intrinsic-bogota.jpg",
        alt: "Modelo sonriendo en una calle de Bogotá con camiseta blanca y el monograma S",
        width: 1067,
        height: 1348,
      },
    ],
  },
  {
    slug: "sure26",
    name: "Sure26",
    note: "Camiseta de fútbol. Made in Sure Land.",
    cover: {
      src: "/img/archivo/sure26-camisetas.jpg",
      alt: "Dos personas con la camiseta de fútbol Sure26 negra, una de espaldas con el número 10",
      width: 1179,
      height: 1348,
    },
    images: [],
  },
];
