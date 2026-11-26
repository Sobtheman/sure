// La historia de SURE contada por la marca: la intro y el capítulo V (Disidencia, la colección actual).
// Los capítulos I a IV viven en lib/archive.ts, cada uno con su colección.
const es = {
  label: "La historia",
  introTitle: "Una historia que todavía estamos escribiendo",
  intro: [
    "Antes de ser lo que somos hoy, SURE fue una idea. Una búsqueda por encontrar algo propio, una forma de expresar lo que llevamos dentro y de construir una identidad que no dependiera de lo que otros esperan de nosotros.",
    "Cada colección ha sido un capítulo de ese camino. Una historia que nos ha llevado a entender quiénes somos, qué queremos y hasta dónde podemos llegar.",
  ],
  chapter: (n: number) => `Capítulo ${roman(n)}`,
  // Capítulo V
  current: {
    name: "Disidencia",
    tagline: "Watch your demons.",
    story: [
      "La rebeldía de mirarnos a los ojos y reconocer quiénes somos, qué queremos y qué necesitamos cambiar.",
      "DISIDENCIA nace de aceptar aquello que muchas veces preferimos esconder. Nuestros miedos, errores y sombras también hacen parte de nuestra historia.",
      "No se trata de eliminarlos, sino de aprender a convivir con ellos sin permitir que definan nuestro camino.",
      "Porque la verdadera disidencia comienza cuando dejamos de vivir para encajar y decidimos construir nuestra propia verdad.",
    ],
    meta: "Disponible ahora",
    cta: "Ver Disidencia",
  },
  // Video de TikTok
  video: {
    label: "SURE, el primer año. Ver en TikTok",
    watch: "Ver en TikTok",
    soundOn: "Activar sonido",
    soundOff: "Silenciar",
  },
  // Bloque de la portada
  home: {
    cta: "Leer la historia",
  },
};

const en: typeof es = {
  label: "The story",
  introTitle: "A story we're still writing",
  intro: [
    "Before becoming what we are today, SURE was an idea. A search for something of our own, a way to express what we carry inside and to build an identity that didn't depend on what others expect of us.",
    "Each collection has been a chapter on that path. A story that has taught us who we are, what we want and how far we can go.",
  ],
  chapter: (n: number) => `Chapter ${roman(n)}`,
  current: {
    name: "Disidencia",
    tagline: "Watch your demons.",
    story: [
      "The rebellion of looking ourselves in the eye and recognizing who we are, what we want and what we need to change.",
      "DISIDENCIA comes from accepting what we'd often rather hide. Our fears, mistakes and shadows are part of our story too.",
      "It's not about getting rid of them, but learning to live with them without letting them define our path.",
      "Because true dissent begins when we stop living to fit in and decide to build our own truth.",
    ],
    meta: "Available now",
    cta: "Shop Disidencia",
  },
  video: {
    label: "SURE, the first year. Watch on TikTok",
    watch: "Watch on TikTok",
    soundOn: "Turn sound on",
    soundOff: "Mute",
  },
  home: {
    cta: "Read the story",
  },
};

function roman(n: number) {
  return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n] ?? String(n);
}

export const storyCopy = { es, en };
