// Las cuatro promesas de envío que acompañan la foto en Envíos y cambios
import { shipping } from "@/lib/config";
import { formatCOP } from "@/lib/format";

const es = {
  photoAlt: "Modelo con la camiseta Disidencia blanca y una bolsa de SURE en las manos, sentada en un sofá de cuero",
  promises: [
    { big: formatCOP(shipping.freeFrom), small: "Envío gratis desde este valor" },
    { big: "Contra entrega", small: "Pagas cuando te llega" },
    { big: `${shipping.deliveryDays} días`, small: "Hábiles o menos para que te llegue" },
    { big: `${shipping.exchangeDays} días`, small: "Para cambiar la talla" },
  ],
};

const en: typeof es = {
  photoAlt: "Model in the white Disidencia tee holding a SURE bag, sitting on a leather sofa",
  promises: [
    { big: formatCOP(shipping.freeFrom, "en"), small: "Free shipping from this amount" },
    { big: "Cash on delivery", small: "Pay when it arrives" },
    { big: `${shipping.deliveryDays} days`, small: "Business days or less to your door" },
    { big: `${shipping.exchangeDays} days`, small: "To exchange your size" },
  ],
};

export const shippingCopy = { es, en };
