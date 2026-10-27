// Las cuatro promesas de envío que acompañan la foto en Envíos y cambios
import { shipping } from "@/lib/config";

const es = {
  photoAlt: "Modelo con la camiseta Disidencia blanca y una bolsa de SURE en las manos, sentada en un sofá de cuero",
  promises: [
    { big: "Gratis", small: "El envío, siempre y a toda Colombia" },
    { big: "Contra entrega", small: "Pagas cuando te llega" },
    { big: `${shipping.deliveryDays} días`, small: "Hábiles o menos para que te llegue" },
    { big: `${shipping.exchangeDays} días`, small: "Para cambiar la talla" },
  ],
};

const en: typeof es = {
  photoAlt: "Model in the white Disidencia tee holding a SURE bag, sitting on a leather sofa",
  promises: [
    { big: "Free", small: "Shipping, always, anywhere in Colombia" },
    { big: "Cash on delivery", small: "Pay when it arrives" },
    { big: `${shipping.deliveryDays} days`, small: "Or less to your door (business days)" },
    { big: `${shipping.exchangeDays} days`, small: "To exchange your size" },
  ],
};

export const shippingCopy = { es, en };
