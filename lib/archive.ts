/* Archivo editorial: colecciones anteriores, ya no disponibles.
   Las historias son un borrador de marca: POR CONFIRMAR con SURE.
   La única cita literal es la de Pink × Niebla, tomada de su afiche. */

export type ArchiveImage = { src: string; alt: string; width: number; height: number };

export type ArchiveCollection = {
  slug: string;
  number: string;
  name: string;
  note: string;
  story: string[];
  quote?: { text: string; source: string };
  pieces: { name: string; detail: string }[];
  cover: ArchiveImage;
  images: ArchiveImage[];
};

export const archive: ArchiveCollection[] = [
  {
    slug: "niebla",
    number: "01",
    name: "Niebla",
    note: "Lavado ácido, letras infladas y cielo gris.",
    story: [
      "Niebla salió del gris: ese cielo que no se decide y se queda encima de la ciudad toda la tarde. Cada camiseta pasó por lavado ácido, así que ninguna quedó igual a la otra. Atrás, las letras de SURE infladas como nubes; adelante, apenas el nombre.",
      "Después vino el Vol. 02, Pink × Niebla. La misma niebla en rosa y vino tinto, cortada a la cintura, con un corazón al pecho y una frase escrita en el afiche.",
    ],
    quote: { text: "No tienes que ser perfecta. Solo tienes que ser tú.", source: "Pink × Niebla, Vol. 02" },
    pieces: [
      { name: "Camiseta Niebla", detail: "Gris, lavado ácido, SURE en letras infladas a la espalda" },
      { name: "Crop top Pink × Niebla", detail: "Rosa y vino tinto, lavado ácido, corazón SURE al pecho" },
    ],
    cover: {
      src: "/img/archivo/niebla-espaldas.jpg",
      alt: "Tres personas de espaldas con las camisetas grises de Niebla y las letras SURE infladas",
      width: 1156,
      height: 1395,
    },
    images: [
      {
        src: "/img/archivo/niebla-afiche.jpg",
        alt: "Afiche de Niebla: camiseta gris con lavado ácido y letras SURE infladas entre nubes",
        width: 1179,
        height: 1252,
      },
      {
        src: "/img/archivo/niebla-muro.jpg",
        alt: "Tres personas con camisetas grises de Niebla frente a una puerta con grafiti en blanco y negro",
        width: 1156,
        height: 1395,
      },
      {
        src: "/img/archivo/niebla-pink-afiche.jpg",
        alt: "Afiche Pink × Niebla Vol. 02: modelo con crop top rosa y la frase No tienes que ser perfecta, solo tienes que ser tú",
        width: 1156,
        height: 1468,
      },
      {
        src: "/img/archivo/niebla-pink-duo.jpg",
        alt: "Dos modelos con crop tops vino tinto de Pink × Niebla y el corazón SURE al pecho",
        width: 1179,
        height: 1431,
      },
      {
        src: "/img/archivo/niebla-crop.jpg",
        alt: "Modelo con crop top vino tinto de lavado ácido y jean cargo",
        width: 940,
        height: 1395,
      },
    ],
  },
  {
    slug: "intrinsic",
    number: "02",
    name: "Intrinsic",
    note: "Blanco y negro, contra la pared.",
    story: [
      "Intrinsic es lo que llevas por dentro y no se negocia. Blanco y negro, sin nada que sobre: el nombre pequeño a la espalda, la S al pecho.",
      "Se fotografió donde se usa: contra muros pintados, en la calle, sin estudio. Ropa que no tiene que gritar para que se note.",
    ],
    pieces: [
      { name: "Camiseta Intrinsic blanca", detail: "Logo SURE pequeño a la espalda" },
      { name: "Camiseta Intrinsic negra", detail: "Monograma S al pecho" },
    ],
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
        alt: "Modelo sonriendo en una calle con camiseta blanca y el monograma S",
        width: 1067,
        height: 1348,
      },
    ],
  },
  {
    slug: "sure26",
    number: "03",
    name: "Sure26",
    note: "Camiseta de fútbol. Made in Sure Land.",
    story: [
      "Sure26 es la camiseta de un equipo que no juega en ninguna liga. Negra, a rayas finas, con cuello de polo y el 10 grande a la espalda.",
      "Arriba, en letra corrida, la firma: Made in Sure Land. Hecha para la calle, no para la cancha.",
    ],
    pieces: [{ name: "Camiseta Sure26", detail: "Negra a rayas, cuello de polo, número 10 a la espalda" }],
    cover: {
      src: "/img/archivo/sure26-camisetas.jpg",
      alt: "Dos personas con la camiseta de fútbol Sure26 negra, una de espaldas con el número 10",
      width: 1179,
      height: 1348,
    },
    images: [],
  },
];

export function getCollection(slug: string) {
  return archive.find((c) => c.slug === slug);
}
