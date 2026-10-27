// Textos de la bolsa (panel lateral, bolsa vacía, barra de envío gratis) y de los avisos al agregar. Mismas claves en los dos idiomas.
const es = {
  bag: "Bolsa",
  close: "Cerrar bolsa",
  // "Blanco · Talla M"
  sizeLine: (size: string) => `Talla ${size}`,
  remove: "Quitar",
  subtotal: "Subtotal",
  shipping: "Envío",
  free: "Gratis",
  total: "Total",
  checkout: "Finalizar compra",
  // Bolsa vacía
  emptyTitle: "Tu bolsa está vacía.",
  emptyLead: "Empieza por una de estas dos.",
  viewCollection: "Ver la colección",
  // Sugerencias de la bolsa vacía
  addProduct: (name: string) => `Agregar ${name} a la bolsa`,
  closeSizes: (name: string) => `Cerrar tallas de ${name}`,
  pickSize: "Elige tu talla",
  sizeOption: (size: string) => `Talla ${size}`,
  addFailed: "No se pudo agregar.",
  // Barra de envío gratis: "Te faltan $10.000 para el envío gratis."
  missingBefore: "Te faltan ",
  missingAfter: " para el envío gratis.",
  freeDone: "Tu envío es gratis.",
  // Motivos de cart.add() cuando no se puede agregar
  sizeSoldOut: "Talla agotada",
  allInBag: (size: string) => `Ya tienes en la bolsa todas las unidades disponibles en talla ${size}.`,
};

const en: typeof es = {
  bag: "Bag",
  close: "Close bag",
  sizeLine: (size: string) => `Size ${size}`,
  remove: "Remove",
  subtotal: "Subtotal",
  shipping: "Shipping",
  free: "Free",
  total: "Total",
  checkout: "Checkout",
  emptyTitle: "Your bag is empty.",
  emptyLead: "Start with one of these two.",
  viewCollection: "Shop the collection",
  addProduct: (name: string) => `Add ${name} to bag`,
  closeSizes: (name: string) => `Close sizes for ${name}`,
  pickSize: "Pick your size",
  sizeOption: (size: string) => `Size ${size}`,
  addFailed: "Couldn't add it.",
  missingBefore: "You're ",
  missingAfter: " away from free shipping.",
  freeDone: "Free shipping unlocked.",
  sizeSoldOut: "Size sold out",
  allInBag: (size: string) => `Every available size ${size} is already in your bag.`,
};

export const cartCopy = { es, en };
