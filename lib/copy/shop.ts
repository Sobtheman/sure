// Textos de la portada, la tienda y la página de producto. Mismas claves en los dos idiomas.
import type { ProductImage } from "@/lib/catalog";

type View = ProductImage["view"];

const es = {
  // Portada: film de la colección
  hero: {
    kicker: "Nueva colección",
    tagline: "Camiseta y hoodie · Envíos a toda Colombia",
    cta: "Comprar colección",
    filmLabel: (collection: string) => `Film de la colección ${collection}`,
    pause: "Pausar film",
    play: "Reproducir film",
  },
  // Portada
  home: {
    available: "Disponible ahora",
  },
  // Página de la tienda
  shopPage: {
    metaTitle: "Tienda",
    metaDescription: "Colección Disidencia de SURE: camiseta blanca y hoodie negro. Envío gratis desde $100.000 y pago contra entrega.",
    kicker: "Colección",
    intro: "Camiseta y hoodie. Envíos a toda Colombia, gratis desde $100.000.",
    piecesLabel: "Prendas",
    lookbook: "Lookbook",
    tapToZoom: "Toca una foto para ampliar",
  },
  // Página de producto
  productPage: {
    alsoIn: (collection: string) => `También en ${collection}`,
  },
  // Tarjeta de producto
  card: {
    soldOut: "Agotado",
    view: "Ver prenda",
  },
  // Galería de fotos del producto
  gallery: {
    carousel: "carrusel",
    zoomPhoto: (view: string) => `Ampliar foto: ${view}`,
    zoomChip: "Ampliar",
    viewPhoto: (n: number, view: string) => `Ver foto ${n}: ${view}`,
    fullscreen: "Clic para ver en pantalla completa",
  },
  // Etiqueta visible para cada vista de foto (ProductImage.view)
  viewLabel: {
    Frente: "Frente",
    Espalda: "Espalda",
    Detalle: "Detalle",
    "En modelo": "En modelo",
  } as Record<View, string>,
  // Panel de compra
  purchase: {
    pickSize: "Elige una talla.",
    addFailed: "No se pudo agregar.",
    sizeSoldOut: "Talla agotada",
    allInBag: (size: string) => `Ya tienes en la bolsa todas las unidades disponibles en talla ${size}.`,
    size: "Talla",
    sizeGuide: "Guía de medidas",
    sizeOption: (size: string) => `Talla ${size}`,
    sizeOptionSoldOut: (size: string) => `Talla ${size}, agotada`,
    soldOutAll: "Agotado en todas las tallas.",
    lowStock: (left: number, size: string) => `Últimas ${left} ${left === 1 ? "unidad" : "unidades"} en talla ${size}.`,
    inStock: (size: string) => `Disponible en talla ${size}.`,
    soldOut: "Agotado",
    addToBag: "Agregar a la bolsa",
    addToBagPrice: (price: string) => `Agregar a la bolsa · ${price}`,
    description: "Descripción",
    detailsCare: "Detalles y cuidado",
    shippingTitle: "Envíos y cambios",
    shippingText: (free: string, fee: string, days: number) =>
      `Envío gratis en compras desde ${free}; en compras menores, ${fee} a cualquier ciudad de Colombia. Pagas contra entrega o te confirmamos el pago por WhatsApp. Te llega en ${days} días hábiles o menos.`,
    exchangeText: (days: number) =>
      `¿No te quedó? Cambias la talla dentro de los ${days} días siguientes a la entrega, con la prenda sin uso y con sus etiquetas.`,
    shippingLink: "Ver envíos y cambios",
  },
  // Guía de medidas
  sizeGuide: {
    title: "Guía de medidas",
    close: "Cerrar guía",
    intro: "Medidas de la prenda en centímetros, tomadas en plano.",
    measure: "Medida",
    steps: [
      { term: "A. Ancho de pecho:", text: "de costura a costura, 2 cm debajo de la sisa." },
      { term: "B. Largo total:", text: "desde el punto más alto del hombro hasta el ruedo." },
      { term: "C. Largo de manga:", text: "desde la costura del hombro hasta el final de la manga." },
    ],
    compare: "Compara con una prenda tuya que te quede bien, medida igual sobre una superficie plana.",
  },
  // Lo que hace fácil comprar
  selling: {
    freeShipping: (amount: string) => `Envío gratis desde ${amount}`,
    freeShippingNote: "A toda Colombia",
    cashOnDelivery: "Pago contra entrega",
    cashOnDeliveryNote: "Pagas cuando te llega",
    delivery: (days: number) => `Llega en ${days} días hábiles o menos`,
    deliveryNote: "Te mandamos la guía",
    exchanges: "Cambios de talla sin enredos",
    exchangesNote: (days: number) => `Hasta ${days} días`,
  },
  // Selector de cantidad
  qty: {
    less: "Quitar una",
    more: "Agregar una",
  },
};

const en: typeof es = {
  hero: {
    kicker: "New collection",
    tagline: "Tee and hoodie · Shipping across Colombia",
    cta: "Shop the collection",
    filmLabel: (collection: string) => `${collection} collection film`,
    pause: "Pause film",
    play: "Play film",
  },
  home: {
    available: "Available now",
  },
  shopPage: {
    metaTitle: "Shop",
    metaDescription:
      "The SURE Disidencia collection: white tee and black hoodie. Free shipping over $100.000 COP and cash on delivery.",
    kicker: "Collection",
    intro: "Tee and hoodie. Shipping across Colombia, free over $100.000 COP.",
    piecesLabel: "Pieces",
    lookbook: "Lookbook",
    tapToZoom: "Tap a photo to zoom in",
  },
  productPage: {
    alsoIn: (collection: string) => `More from ${collection}`,
  },
  card: {
    soldOut: "Sold out",
    view: "Shop now",
  },
  gallery: {
    carousel: "carousel",
    zoomPhoto: (view: string) => `Zoom photo: ${view}`,
    zoomChip: "Zoom",
    viewPhoto: (n: number, view: string) => `View photo ${n}: ${view}`,
    fullscreen: "Click to view full screen",
  },
  viewLabel: {
    Frente: "Front",
    Espalda: "Back",
    Detalle: "Detail",
    "En modelo": "On model",
  },
  purchase: {
    pickSize: "Pick a size.",
    addFailed: "Couldn't add it to your bag.",
    sizeSoldOut: "Size sold out",
    allInBag: (size: string) => `You already have every available unit in size ${size} in your bag.`,
    size: "Size",
    sizeGuide: "Size guide",
    sizeOption: (size: string) => `Size ${size}`,
    sizeOptionSoldOut: (size: string) => `Size ${size}, sold out`,
    soldOutAll: "Sold out in every size.",
    lowStock: (left: number, size: string) => `Only ${left} ${left === 1 ? "unit" : "units"} left in size ${size}.`,
    inStock: (size: string) => `In stock in size ${size}.`,
    soldOut: "Sold out",
    addToBag: "Add to bag",
    addToBagPrice: (price: string) => `Add to bag · ${price}`,
    description: "Description",
    detailsCare: "Details & care",
    shippingTitle: "Shipping & exchanges",
    shippingText: (free: string, fee: string, days: number) =>
      `Free shipping on orders over ${free}; below that, ${fee} to any city in Colombia. Pay cash on delivery or confirm your payment with us on WhatsApp. Delivered in ${days} business days or less.`,
    exchangeText: (days: number) =>
      `Didn't fit? Exchange your size within ${days} days of delivery, unworn and with the tags on.`,
    shippingLink: "See shipping & exchanges",
  },
  sizeGuide: {
    title: "Size guide",
    close: "Close guide",
    intro: "Garment measurements in centimeters, taken flat.",
    measure: "Measurement",
    steps: [
      { term: "A. Chest width:", text: "seam to seam, 2 cm below the armhole." },
      { term: "B. Total length:", text: "from the highest point of the shoulder to the hem." },
      { term: "C. Sleeve length:", text: "from the shoulder seam to the end of the sleeve." },
    ],
    compare: "Compare it with a piece of yours that fits well, measured the same way on a flat surface.",
  },
  selling: {
    freeShipping: (amount: string) => `Free shipping over ${amount}`,
    freeShippingNote: "Across Colombia",
    cashOnDelivery: "Cash on delivery",
    cashOnDeliveryNote: "Pay when it arrives",
    delivery: (days: number) => `Delivered in ${days} business days or less`,
    deliveryNote: "Tracking number included",
    exchanges: "Easy size exchanges",
    exchangesNote: (days: number) => `Up to ${days} days`,
  },
  qty: {
    less: "Remove one",
    more: "Add one",
  },
};

export const shop = { es, en };
