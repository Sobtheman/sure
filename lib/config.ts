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

// Todo chat de WhatsApp abre con un mensaje listo para enviar (según el idioma de la página)
export const whatsappHello = {
  es: "Hola SURE, vengo de la página y quiero más información.",
  en: "Hi SURE, I'm writing from your website and I'd like more info.",
};

export function whatsappLink(text: string = whatsappHello.es) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const hero = {
  collection: "Disidencia",
  // Film "disidencia 02" (Drive), sin audio y recortado antes del cierre. Celular 720p, escritorio 1080p.
  film: { mobile: "/media/disidencia-720.mp4", desktop: "/media/disidencia-1080.mp4" },
  poster: "/img/hero/film-poster.jpg",
  posterAlt: {
    es: "Modelo con la camiseta Disidencia blanca y una pañoleta roja en una librería",
    en: "Model wearing the white Disidencia tee and a red bandana in a bookstore",
  },
};

export const shipping = {
  free: true, // envío gratis siempre, a toda Colombia (todas las prendas pasan de $100.000)
  deliveryDays: 4, // "Llega en 4 días hábiles o menos"
  exchangeDays: 15, // días para cambio de talla después de la entrega
  cashOnDelivery: true, // pago contra entrega
};

// Costo de envío para un subtotal. Lo usan la bolsa y el servidor. Hoy siempre es gratis.
export function shippingFor(_subtotal: number) {
  return 0;
}
