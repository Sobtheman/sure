/* SURE — datos del negocio. Se cambian aquí y se actualizan en todo el sitio. */

export const store = {
  name: "SURE",
  instagram: "https://www.instagram.com/surewearco/",
  instagramHandle: "@surewearco",
  // Mensaje directo de Instagram (abre el chat con la marca)
  instagramDM: "https://ig.me/m/surewearco",
  tiktok: "https://www.tiktok.com/@surewearco",
  // WhatsApp de pedidos, con indicativo y sin espacios
  whatsapp: "573204262765",
  whatsappLabel: "320 426 2765",
};

// Todo chat de WhatsApp abre con un mensaje listo para enviar
export const whatsappHello = "Hola SURE, vengo de la página y quiero más información.";

export function whatsappLink(text: string = whatsappHello) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const hero = {
  collection: "Disidencia",
  // Film "disidencia 02" (Drive), sin audio y recortado antes del cierre. Celular 720p, escritorio 1080p.
  film: { mobile: "/media/disidencia-720.mp4", desktop: "/media/disidencia-1080.mp4" },
  poster: "/img/hero/film-poster.jpg",
  posterAlt: "Modelo con la camiseta Disidencia blanca y una pañoleta roja en una librería",
};

export const shipping = {
  fee: 15000, // COP, tarifa nacional
  freeFrom: 100000, // envío gratis desde este subtotal
  deliveryDays: 4, // "Llega en 4 días hábiles o menos"
  exchangeDays: 15, // días para cambio de talla después de la entrega
  cashOnDelivery: true, // pago contra entrega
};

// Costo de envío para un subtotal. Lo usan la bolsa y el servidor.
export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= shipping.freeFrom ? 0 : shipping.fee;
}
