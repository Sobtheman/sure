// Textos de la lista de lanzamientos (bloque del pie de página). Mismas claves en los dos idiomas.
// La casilla del checkout está en lib/copy/checkout.ts (newsletterOptIn).

const es = {
  heading: "Lanzamientos primero",
  body: "Te avisamos antes que a nadie cuando sale algo nuevo. Pocos correos, nada de relleno.",
  emailLabel: "Tu correo",
  placeholder: "tu@correo.com",
  submit: "Unirme",
  sending: "Enviando…",
  done: "Listo, ya estás en la lista.",
  invalid: "Revisa el correo.",
  error: "No pudimos guardarte. Inténtalo de nuevo.",
  // "Acepto recibir correos de SURE. Me puedo dar de baja cuando quiera. [Tratamiento de datos]"
  consent: "Acepto recibir correos de SURE. Me puedo dar de baja cuando quiera.",
  privacy: "Tratamiento de datos",
  // Campo trampa para bots (oculto)
  honeypot: "Deja este campo vacío",
};

const en: typeof es = {
  heading: "Drops first",
  body: "We'll tell you before anyone else when something new drops. Few emails, no filler.",
  emailLabel: "Your email",
  placeholder: "you@email.com",
  submit: "Join",
  sending: "Sending…",
  done: "Done, you're on the list.",
  invalid: "Check your email address.",
  error: "We couldn't sign you up. Try again.",
  consent: "I agree to receive emails from SURE. I can unsubscribe anytime.",
  privacy: "Privacy & data",
  honeypot: "Leave this field empty",
};

export const newsletterCopy = { es, en };
