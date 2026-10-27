// Textos del archivo: listado, página de colección, bloque del inicio, galería y visor de fotos. Mismas claves en los dos idiomas.
const es = {
  // Listado /archivo
  metaTitle: "Archivo",
  metaDescription: "Colecciones anteriores de SURE: Intrinsic, Niebla, Niebla x Ivy y Sure26.",
  eyebrow: "Colecciones anteriores",
  title: "Archivo",
  intro: "Lo que ya pasó por la calle. Estas colecciones están agotadas y no vuelven; quedan aquí con su historia.",
  cardMeta: (year: number, n: number) => `${year} · Agotada · ${n} fotos`,
  viewCollection: "Ver colección",
  available: "Lo que sí está disponible.",
  shopCta: "Ver Disidencia",

  // Colección /archivo/[slug]
  collectionMetaTitle: (name: string) => `${name} · Archivo`,
  collectionMetaDescription: (name: string, note: string) => `${name}, colección anterior de SURE. ${note}`,
  back: "Archivo",
  soldOut: (year: number) => `${year} · Agotada`,
  story: "La historia",
  photosLabel: (name: string) => `Fotos de ${name}`,
  photos: (n: number) => `Fotos · ${n}`,
  tapToZoom: "Toca una foto para ampliar",
  pieces: "Las piezas",
  pieceSoldOut: "Agotado",
  noReturn: "Esta colección no vuelve.",
  shopNow: "Ver lo disponible ahora",
  next: (year: number) => `Siguiente · ${year}`,

  // Bloque del inicio
  stripTitle: "Archivo",
  stripIntro: "Colecciones anteriores. Ya no están a la venta.",
  stripCta: "Ver colecciones",

  // Galería
  zoomPhoto: (n: number, name: string) => `Ampliar foto ${n} de ${name}`,

  // Visor
  viewer: "Foto ampliada",
  counter: (n: number, total: number) => `${n} / ${total}`,
  close: "Cerrar",
  prevPhoto: "Foto anterior",
  nextPhoto: "Foto siguiente",
  wideZoomOut: "Clic para alejar",
  wideHint: "Baja para ver toda la foto · clic para acercar",
  mouseZoomed: "Mueve el mouse para recorrer · clic para alejar",
  mouseHint: "Clic para acercar",
  touchZoomed: "Arrastra para recorrer · doble toque para alejar",
  touchHint: "Pellizca o toca dos veces para acercar",
};

const en: typeof es = {
  metaTitle: "Archive",
  metaDescription: "Past SURE collections: Intrinsic, Niebla, Niebla x Ivy and Sure26.",
  eyebrow: "Past collections",
  title: "Archive",
  intro: "What already hit the streets. These collections are sold out and they're not coming back. Their story stays here.",
  cardMeta: (year: number, n: number) => `${year} · Sold out · ${n} photos`,
  viewCollection: "View collection",
  available: "What's available now.",
  shopCta: "Shop Disidencia",

  collectionMetaTitle: (name: string) => `${name} · Archive`,
  collectionMetaDescription: (name: string, note: string) => `${name}, a past SURE collection. ${note}`,
  back: "Archive",
  soldOut: (year: number) => `${year} · Sold out`,
  story: "The story",
  photosLabel: (name: string) => `${name} photos`,
  photos: (n: number) => `Photos · ${n}`,
  tapToZoom: "Tap a photo to enlarge",
  pieces: "The pieces",
  pieceSoldOut: "Sold out",
  noReturn: "This collection isn't coming back.",
  shopNow: "Shop what's available now",
  next: (year: number) => `Next · ${year}`,

  stripTitle: "Archive",
  stripIntro: "Past collections. No longer for sale.",
  stripCta: "View collections",

  zoomPhoto: (n: number, name: string) => `Enlarge photo ${n} of ${name}`,

  viewer: "Enlarged photo",
  counter: (n: number, total: number) => `${n} / ${total}`,
  close: "Close",
  prevPhoto: "Previous photo",
  nextPhoto: "Next photo",
  wideZoomOut: "Click to zoom out",
  wideHint: "Scroll to see the full photo · click to zoom in",
  mouseZoomed: "Move the mouse to pan · click to zoom out",
  mouseHint: "Click to zoom in",
  touchZoomed: "Drag to pan · double-tap to zoom out",
  touchHint: "Pinch or double-tap to zoom in",
};

export const archiveCopy = { es, en };
