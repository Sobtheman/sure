/* SURE — datos del negocio.
   Todo lo marcado "POR CONFIRMAR" es una suposición razonable para el demo:
   corrígelo aquí y se actualiza en todo el sitio. */

export const store = {
  name: "SURE",
  instagram: "https://www.instagram.com/surewearco/",
  instagramHandle: "@surewearco",
  // Mensaje directo de Instagram (abre el chat con la marca)
  instagramDM: "https://ig.me/m/surewearco",
  email: "", // vacío = no se muestra
  whatsapp: "", // dígitos con indicativo, p. ej. "573001234567". Vacío = no se muestra
};

export const hero = {
  collection: "Dissidencia",
  image: "/img/hero/dissidencia.jpg",
  imageAlt: "Dos modelos en un sofá de cuero dentro de una librería, con la camiseta blanca Dissidencia",
  // Cuando haya film de la colección: ruta del .mp4 (p. ej. "/media/dissidencia.mp4").
  // La foto queda como póster y respaldo.
  video: "",
};

export const shipping = {
  fee: 15000, // COP, tarifa nacional única
  dispatch: "1 a 2 días hábiles", // POR CONFIRMAR
  delivery: "2 a 6 días hábiles según la ciudad", // POR CONFIRMAR
  carrier: "", // POR CONFIRMAR, p. ej. "Servientrega". Vacío = no se nombra
  exchangeDays: 15, // POR CONFIRMAR: días para cambio de talla después de la entrega
};
