// Textos del checkout (formulario, pago, resumen, pedido por WhatsApp) y de la página de retorno de la pasarela (/pedido).
// Mismas claves en los dos idiomas. Los textos compartidos con la bolsa (subtotal, envío, total, bolsa vacía) están en lib/copy/cart.ts.
import type { PaymentStatus, Provider } from "@/lib/payments";

type Method = "contraentrega" | "transferencia" | "confirmar";

const onlineErrorEs = "No pudimos conectar con el pago en línea. Elige pago contra entrega o inténtalo de nuevo.";
const onlineErrorEn = "We couldn't reach online payment. Choose cash on delivery or try again.";

const es = {
  metaTitle: "Finalizar compra",
  title: "Finalizar compra",
  // Forma de pago tal como aparece en el pedido de WhatsApp
  methodText: {
    contraentrega: "Contra entrega",
    transferencia: "Transferencia por Nequi o llave Bre-B",
    confirmar: "Que me confirmen el pago por WhatsApp",
  } as Record<Method, string>,
  // Medios de cada pasarela. Vacío: se usa el texto de lib/payments.ts tal cual.
  providerMethods: {} as Partial<Record<Provider, string>>,
  errors: {
    name: "Escribe tu nombre completo.",
    legalId: "Cédula de 5 a 11 dígitos.",
    email: "Revisa el correo.",
    phone: "Celular de 10 dígitos que empiece por 3.",
    region: "Elige el departamento.",
    city: "Escribe la ciudad o municipio.",
    address: "Escribe la dirección completa.",
    accept: "Acepta el tratamiento de datos para continuar.",
    online: onlineErrorEs,
    // Error de /api/checkout: en español se muestra el mensaje del servidor
    api: (message: string | undefined, _status: number) => message || onlineErrorEs,
    network: "No pudimos conectar con el pago en línea. Revisa tu conexión o elige pago contra entrega.",
  },
  // Pedido de WhatsApp
  order: {
    greeting: (ref: string) => `Hola SURE, vengo de la página y quiero hacer este pedido (${ref}):`,
    item: (name: string, size: string, qty: number, price: string) => `• ${name} · Talla ${size} × ${qty} — ${price}`,
    shipping: (value: string) => `Envío: ${value}`,
    total: (value: string) => `Total: ${value}`,
    payment: (value: string) => `Pago: ${value}`,
    buyer: (name: string, legalId: string) => `${name} · CC ${legalId}`,
    notes: (notes: string) => `Notas: ${notes}`,
    // Última línea del pedido por transferencia, para que no se olvide el comprobante
    receipt: "Ya pagué. Te mando el comprobante de la transferencia en el siguiente mensaje.",
  },
  // Pantalla de pedido listo (WhatsApp)
  done: {
    reference: (ref: string) => `Pedido ${ref}`,
    title: "Pedido listo.",
    body: "Te abrimos WhatsApp con tu pedido. Envíalo y te confirmamos disponibilidad, envío y pago.",
    copiedNote: " También lo copiamos, por si lo quieres pegar.",
    openWhatsApp: "Abrir WhatsApp",
    copied: "Copiado",
    copy: "Copiar pedido",
    instagramAsk: "¿Prefieres Instagram?",
    instagramLink: (handle: string) => `Escríbenos a ${handle}`,
    instagramAfter: "y pega el pedido.",
  },
  // Pantalla de pago por transferencia (Nequi o llave Bre-B)
  transferDone: {
    title: "Casi es tuyo.",
    body: "Transfiere el total por Nequi o a la llave Bre-B y mándanos el comprobante por WhatsApp. Apenas lo vemos, confirmamos tu pedido.",
    amount: "Total a transferir",
    nequi: "Nequi",
    llave: "Llave Bre-B",
    holder: "Titular",
    reference: "Referencia",
    referenceNote: "Escríbela en el mensaje de la transferencia.",
    copy: "Copiar",
    copied: "Copiado",
    copyLabel: (what: string) => `Copiar ${what}`,
    sendReceipt: "Ya pagué: enviar comprobante por WhatsApp",
  },
  // Resumen
  showSummary: "Ver resumen",
  hideSummary: "Ocultar resumen",
  summary: "Resumen",
  // Formulario
  contact: "Contacto",
  email: "Correo",
  phone: "Celular",
  phonePlaceholder: "300 000 0000",
  legalId: "Cédula",
  shippingLegend: "Envío",
  name: "Nombre completo",
  region: "Departamento",
  regionPlaceholder: "Elige…",
  city: "Ciudad o municipio",
  address: "Dirección",
  addressPlaceholder: "Calle 00 # 00-00",
  notes: "Indicaciones",
  optional: "(opcional)",
  notesPlaceholder: "Apartamento, barrio, torre…",
  // Pago
  paymentLegend: "Pago",
  payOnline: (provider: string) => `Pagar en línea con ${provider}`,
  cod: "Pago contra entrega",
  codNote: "Pagas cuando el pedido llega a tu puerta.",
  transfer: "Nequi o llave Bre-B",
  transferNote: "Transfiere sin comisión y nos mandas el comprobante.",
  confirm: "Te confirmamos el pago",
  confirmNote: "Te escribimos por WhatsApp con las opciones.",
  testMode: "Modo de prueba: no se realizan cobros reales.",
  // "Acepto el [tratamiento de mis datos] y las [políticas de envíos y cambios]."
  consent: {
    before: "Acepto el",
    data: "tratamiento de mis datos",
    middle: "y las",
    policies: "políticas de envíos y cambios",
    after: ".",
  },
  newsletterOptIn: "Quiero recibir por correo los lanzamientos de SURE.",
  processing: "Procesando…",
  payButton: (amount: string, provider: string) => `Pagar ${amount} con ${provider}`,
  sendWhatsApp: "Enviar pedido por WhatsApp",
  transferButton: "Ver datos para transferir",
  // Página de retorno de la pasarela (/pedido)
  result: {
    metaTitle: "Tu pedido",
    status: {
      approved: {
        title: "Pago aprobado.",
        body: "Gracias. Recibimos tu pago y vamos a preparar tu pedido. Te contactamos con el número de guía cuando salga.",
      },
      pending: {
        title: "Pago en proceso.",
        body: "Tu banco aún no confirma el pago. Te avisamos por correo apenas se apruebe; no hace falta pagar de nuevo.",
      },
      declined: {
        title: "El pago no se completó.",
        body: "No se hizo ningún cobro. Puedes intentarlo de nuevo con otro medio de pago.",
      },
      unknown: {
        title: "No pudimos confirmar el pago.",
        body: "Si se descontó el dinero, escríbenos por WhatsApp con tu número de pedido y lo revisamos.",
      },
    } as Record<PaymentStatus, { title: string; body: string }>,
    retry: "Intentar de nuevo",
    backToShop: "Volver a la tienda",
    whatsapp: "Escribir por WhatsApp",
    whatsappText: (ref?: string) => `Hola SURE, vengo de la página y tengo una pregunta sobre mi pedido${ref ? ` ${ref}` : ""}.`,
  },
};

const en: typeof es = {
  metaTitle: "Checkout",
  title: "Checkout",
  methodText: {
    contraentrega: "Cash on delivery",
    transferencia: "Transfer via Nequi or Bre-B key",
    confirmar: "Confirm payment with me on WhatsApp",
  },
  providerMethods: {
    wompi: "PSE, Nequi, cards, Bancolombia",
    mercadopago: "PSE, cards, Efecty",
  },
  errors: {
    name: "Enter your full name.",
    legalId: "ID number (cédula): 5 to 11 digits.",
    email: "Check your email address.",
    phone: "10-digit mobile number starting with 3.",
    region: "Choose your department.",
    city: "Enter your city or town.",
    address: "Enter your full address.",
    accept: "Accept the data policy to continue.",
    online: onlineErrorEn,
    // The server answers in Spanish, so English shows its own message by status
    api: (_message: string | undefined, status: number) =>
      status === 409
        ? "One of your sizes just sold out or doesn't have enough units. Check your bag and try again."
        : status === 400
          ? "Something in your order doesn't look right. Check your details and try again."
          : onlineErrorEn,
    network: "We couldn't reach online payment. Check your connection or choose cash on delivery.",
  },
  order: {
    greeting: (ref: string) => `Hi SURE, I'm writing from your website. I'd like to place this order (${ref}):`,
    item: (name: string, size: string, qty: number, price: string) => `• ${name} · Size ${size} × ${qty} — ${price}`,
    shipping: (value: string) => `Shipping: ${value}`,
    total: (value: string) => `Total: ${value}`,
    payment: (value: string) => `Payment: ${value}`,
    buyer: (name: string, legalId: string) => `${name} · ID ${legalId}`,
    notes: (notes: string) => `Notes: ${notes}`,
    receipt: "I've paid. Sending the transfer receipt in my next message.",
  },
  done: {
    reference: (ref: string) => `Order ${ref}`,
    title: "Order ready.",
    body: "We opened WhatsApp with your order. Send it and we'll confirm availability, shipping and payment.",
    copiedNote: " We also copied it, in case you'd rather paste it.",
    openWhatsApp: "Open WhatsApp",
    copied: "Copied",
    copy: "Copy order",
    instagramAsk: "Prefer Instagram?",
    instagramLink: (handle: string) => `DM us at ${handle}`,
    instagramAfter: "and paste your order.",
  },
  transferDone: {
    title: "Almost yours.",
    body: "Send the total via Nequi or to the Bre-B key, then send us the receipt on WhatsApp. As soon as we see it, we'll confirm your order.",
    amount: "Amount to send",
    nequi: "Nequi",
    llave: "Bre-B key",
    holder: "Account holder",
    reference: "Reference",
    referenceNote: "Add it to the transfer message.",
    copy: "Copy",
    copied: "Copied",
    copyLabel: (what: string) => `Copy ${what}`,
    sendReceipt: "I've paid: send receipt on WhatsApp",
  },
  showSummary: "Show summary",
  hideSummary: "Hide summary",
  summary: "Summary",
  contact: "Contact",
  email: "Email",
  phone: "Mobile",
  phonePlaceholder: "300 000 0000",
  legalId: "ID number (cédula)",
  shippingLegend: "Shipping",
  name: "Full name",
  region: "Department",
  regionPlaceholder: "Choose…",
  city: "City or town",
  address: "Address",
  addressPlaceholder: "Calle 00 # 00-00",
  notes: "Delivery notes",
  optional: "(optional)",
  notesPlaceholder: "Apartment, neighborhood, building…",
  paymentLegend: "Payment",
  payOnline: (provider: string) => `Pay online with ${provider}`,
  cod: "Cash on delivery",
  codNote: "Pay when your order shows up at your door.",
  transfer: "Nequi or Bre-B key",
  transferNote: "Transfer with no fees and send us the receipt.",
  confirm: "We'll confirm payment with you",
  confirmNote: "We'll message you on WhatsApp with the options.",
  testMode: "Test mode: no real charges are made.",
  consent: {
    before: "I accept the",
    data: "processing of my data",
    middle: "and the",
    policies: "shipping & exchange policies",
    after: ".",
  },
  newsletterOptIn: "Email me about new SURE drops.",
  processing: "Processing…",
  payButton: (amount: string, provider: string) => `Pay ${amount} with ${provider}`,
  sendWhatsApp: "Send order on WhatsApp",
  transferButton: "Get transfer details",
  result: {
    metaTitle: "Your order",
    status: {
      approved: {
        title: "Payment approved.",
        body: "Thank you. We got your payment and we're getting your order ready. We'll send you the tracking number once it ships.",
      },
      pending: {
        title: "Payment processing.",
        body: "Your bank hasn't confirmed the payment yet. We'll email you as soon as it's approved; no need to pay again.",
      },
      declined: {
        title: "Payment didn't go through.",
        body: "You weren't charged. Try again with another payment method.",
      },
      unknown: {
        title: "We couldn't confirm your payment.",
        body: "If the money left your account, message us on WhatsApp with your order number and we'll look into it.",
      },
    },
    retry: "Try again",
    backToShop: "Back to shop",
    whatsapp: "Message us on WhatsApp",
    whatsappText: (ref?: string) => `Hi SURE, I'm writing from your website with a question about my order${ref ? ` ${ref}` : ""}.`,
  },
};

export const checkoutCopy = { es, en };
