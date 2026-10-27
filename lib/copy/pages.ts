// Textos de las páginas simples: Envíos y cambios, Contacto, Tratamiento de datos y 404. Mismas claves en los dos idiomas.
// Los números (tarifas, días) llegan como parámetros desde lib/config.ts para que no se desfasen.

const es = {
  shipping: {
    metaTitle: "Envíos y cambios",
    eyebrow: "Ayuda",
    title: "Envíos y cambios",
    shippingHeading: "Envíos",
    nationwide: "Enviamos a toda Colombia.",
    freeFrom: (amount: string) => `El envío es gratis en compras desde ${amount}`,
    fee: (amount: string) => `; en compras menores cuesta ${amount}, a cualquier ciudad.`,
    delivery: (days: number) =>
      `Tu pedido llega en ${days} días hábiles o menos. Apenas sale, te mandamos el número de guía por WhatsApp para que lo sigas.`,
    paymentHeading: "Pago",
    payment:
      "Puedes pagar contra entrega: pagas cuando el pedido llega a tu puerta. Si prefieres, te confirmamos el pago por WhatsApp antes del envío.",
    exchangeHeading: "Cambios de talla",
    exchange: (days: number) =>
      `¿No te quedó? Cambias la talla dentro de los ${days} días siguientes a la entrega. La prenda debe estar sin uso, sin lavar y con sus etiquetas, y el cambio depende de que haya la talla que necesitas.`,
    // "Escríbenos por [WhatsApp] o [Instagram] con tu número de pedido y lo coordinamos."
    exchangeContactBefore: "Escríbenos por",
    exchangeContactOr: "o",
    exchangeContactAfter: "con tu número de pedido y lo coordinamos.",
    exchangeWhatsapp: "Hola SURE, vengo de la página y quiero cambiar una talla.",
    withdrawalHeading: "Derecho de retracto",
    withdrawal:
      "Como compraste en línea, tienes derecho a retractarte de la compra dentro de los cinco (5) días hábiles siguientes a la entrega, según el artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor). La prenda debe devolverse en el mismo estado en que la recibiste; los costos de transporte de la devolución corren por tu cuenta. Te reintegramos el dinero dentro de los treinta (30) días calendario siguientes.",
    warrantyHeading: "Garantía",
    warranty:
      "Si tu prenda llega con un defecto de fabricación, escríbenos con fotos y la reponemos o te devolvemos el dinero.",
  },
  contact: {
    metaTitle: "Contacto",
    eyebrow: "Contacto",
    title: "Hablemos.",
    intro: "Pedidos, tallas, cambios o colaboraciones. Escríbenos por WhatsApp o Instagram y te respondemos directo.",
    whatsappCta: "Escribir por WhatsApp",
  },
  privacy: {
    metaTitle: "Tratamiento de datos",
    eyebrow: "Legal",
    title: "Tratamiento de datos",
    // online: hay pasarela de pago activa (activeProvider() !== null)
    use: (online: boolean) =>
      `Cuando haces un pedido nos das tu nombre, cédula, correo, celular y dirección. El pedido nos llega por WhatsApp con esos datos, y los usamos solo para confirmarlo, despacharlo y contactarte sobre él. No los vendemos ni los compartimos con nadie distinto de la transportadora que lleva tu pedido${online ? " y la pasarela de pago" : ""}.`,
    rights: (whatsapp: string, instagram: string) =>
      `De acuerdo con la Ley 1581 de 2012, puedes conocer, actualizar, rectificar o pedir que eliminemos tus datos en cualquier momento escribiéndonos por WhatsApp (${whatsapp}) o Instagram (${instagram}).`,
    gateway:
      "Si pagas en línea, los datos de tu tarjeta o cuenta bancaria nunca pasan por este sitio: los recibe directamente la pasarela de pago.",
  },
  notFound: {
    title: "Aquí no hay nada.",
    back: "Volver a la tienda",
  },
};

const en: typeof es = {
  shipping: {
    metaTitle: "Shipping & exchanges",
    eyebrow: "Help",
    title: "Shipping & exchanges",
    shippingHeading: "Shipping",
    nationwide: "We ship across Colombia.",
    freeFrom: (amount: string) => `Shipping is free on orders over ${amount}`,
    fee: (amount: string) => `; below that it's ${amount}, to any city.`,
    delivery: (days: number) =>
      `Your order is delivered in ${days} business days or less. As soon as it ships, we send you the tracking number on WhatsApp so you can follow it.`,
    paymentHeading: "Payment",
    payment:
      "Pay cash on delivery: you pay when your order reaches your door. If you prefer, we can confirm your payment on WhatsApp before it ships.",
    exchangeHeading: "Size exchanges",
    exchange: (days: number) =>
      `Didn't fit? Exchange your size within ${days} days of delivery. The piece has to be unworn, unwashed and with its tags on, and the exchange depends on your size being available.`,
    exchangeContactBefore: "Message us on",
    exchangeContactOr: "or",
    exchangeContactAfter: "with your order number and we'll sort it out.",
    exchangeWhatsapp: "Hi SURE, I'm coming from the website and I need to exchange a size.",
    withdrawalHeading: "Right of withdrawal",
    withdrawal:
      "Since you bought online, you have the right to withdraw from your purchase (derecho de retracto) within five (5) business days after delivery, under Article 47 of Ley 1480 de 2011, the Estatuto del Consumidor (Colombia's consumer protection law). The piece must be returned in the same condition you received it; return shipping is on you. We refund your money within thirty (30) calendar days.",
    warrantyHeading: "Warranty",
    warranty:
      "If your piece arrives with a manufacturing defect, message us with photos and we'll replace it or refund your money.",
  },
  contact: {
    metaTitle: "Contact",
    eyebrow: "Contact",
    title: "Let's talk.",
    intro: "Orders, sizing, exchanges or collabs. Hit us up on WhatsApp or Instagram and we'll get right back to you.",
    whatsappCta: "Message us on WhatsApp",
  },
  privacy: {
    metaTitle: "Privacy & data",
    eyebrow: "Legal",
    title: "Privacy & data",
    use: (online: boolean) =>
      `When you place an order, you give us your name, ID number (cédula), email, phone number and address. Your order reaches us on WhatsApp with those details, and we use them only to confirm it, ship it and contact you about it. We don't sell them or share them with anyone other than the carrier delivering your order${online ? " and the payment gateway" : ""}.`,
    rights: (whatsapp: string, instagram: string) =>
      `Under Ley 1581 de 2012, Colombia's personal data protection law, you can access, update, correct or ask us to delete your data at any time by messaging us on WhatsApp (${whatsapp}) or Instagram (${instagram}).`,
    gateway:
      "If you pay online, your card or bank account details never pass through this site: they go straight to the payment gateway.",
  },
  notFound: {
    title: "Nothing here.",
    back: "Back to the shop",
  },
};

export const pagesCopy = { es, en };
