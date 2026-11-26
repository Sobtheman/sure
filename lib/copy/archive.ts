// Textos del archivo: listado, página de colección, bloque del inicio, galería y visor de fotos. Mismas claves en los dos idiomas.
const es = {
  // Listado /archivo
  metaTitle: "Archivo: la historia de SURE",
  metaDescription:
    "La historia de SURE en capítulos: Intrinsec Line, Niebla, Niebla x Ivy, SURE26 y Disidencia. Colecciones anteriores, fotos y el video del primer año.",
  title: "Archivo",
  cardMeta: (year: number, n: number) => `${year} · Agotada · ${n} fotos`,
  viewCollection: "Ver colección",

  // Colección /archivo/[slug]
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
  metaTitle: "Archive: the SURE story",
  metaDescription:
    "The SURE story in chapters: Intrinsec Line, Niebla, Niebla x Ivy, SURE26 and Disidencia. Past collections, photos and the first-year video.",
  title: "Archive",
  cardMeta: (year: number, n: number) => `${year} · Sold out · ${n} photos`,
  viewCollection: "View collection",

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
