# SURE — tienda en línea

Next.js 14 (App Router) + Tailwind. Sitio en español (raíz) e inglés (`/en`), precios en COP, pensado primero para celular. En vivo en https://surewear.co (Vercel, proyecto `sure`).

- Textos en los dos idiomas: `lib/copy/*.ts` (mismas claves en `es` y `en`); prendas y archivo en inglés dentro de `lib/catalog.ts`, `lib/archive.ts` y `lib/lookbook.ts`.
- Las páginas viven en `app/[lang]/`; `middleware.ts` sirve el español sin prefijo y el inglés en `/en`.
- Publicar: `vercel deploy --prod` desde esta carpeta (variables `RESEND_API_KEY`, `ORDER_EMAIL_FROM` y `NEXT_PUBLIC_SITE_URL` ya están en Vercel).

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Páginas

| Ruta | Qué tiene |
|---|---|
| `/` | Film de Disidencia, Disponible ahora, Archivo, pie |
| `/tienda` | La colección Disidencia y su lookbook |
| `/producto/[slug]` | Galería con zoom, tallas, guía de medidas, envíos, agregar a la bolsa |
| `/archivo` | Colecciones anteriores por año (agotadas) |
| `/archivo/[slug]` | Una colección: portada, texto, fotos con zoom, piezas y la siguiente |
| `/checkout` | Datos de envío, forma de pago y pedido por WhatsApp |
| `/pedido` | Regreso de la pasarela de pago (cuando se active) |
| `/envios`, `/contacto`, `/privacidad` | Políticas y contacto |

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Precios, stock por talla, tabla de medidas, textos y fotos de cada prenda | `lib/catalog.ts` |
| Envío (gratis siempre, días), pago contra entrega, Nequi / llave Bre-B, WhatsApp, Instagram, TikTok, film | `lib/config.ts` |
| Colecciones del archivo (año, texto, piezas, fotos) | `lib/archive.ts` |
| Fotos del lookbook | `lib/lookbook.ts` |
| Fotos | `public/img/` (el sitio las sirve en AVIF/WebP al tamaño de cada pantalla) |
| Film del inicio | `public/media/` |

- **Stock:** cada talla tiene 20 unidades provisionales. Con stock real, poner `LOW_STOCK` (en `lib/catalog.ts`) en 3 para mostrar "Últimas unidades". Una talla en 0 se muestra agotada.
- **Envío gratis siempre:** `shipping.free` y `shippingFor` en `lib/config.ts` (hoy siempre $0). Lo usan la bolsa, el checkout y el servidor.

## Film del inicio

`disidencia-720.mp4` (celular) y `disidencia-1080.mp4` (escritorio), sacados de "disidencia 02.mp4" del Drive, sin audio y cortados antes del cierre. Arrancan solos en bucle desde el HTML, sin botón de play. Si el navegador bloquea el autoplay (iPhone en bajo consumo), el film arranca con el primer toque o scroll. Hay un botón discreto de pausa.

## Zoom

- Escritorio: al pasar el cursor por una foto de producto se acerca 1,75× y sigue al mouse. Clic abre el visor con la foto al 80 % del ancho: la rueda la recorre, clic acerca 1,6× en ese punto, otro clic aleja, flechas cambian de foto.
- Celular: tocar abre el visor; pellizcar o doble toque acerca, arrastrar recorre, deslizar cambia de foto.

## Pedidos y pagos

Hoy el checkout termina en **WhatsApp** (320 426 2765) con el pedido completo: prendas, tallas, total, datos de envío y forma de pago (contra entrega, transferencia por Nequi o llave Bre-B, o confirmar el pago). Nada se cobra en el sitio. Todos los enlaces de WhatsApp abren con un mensaje listo ("Hola SURE, vengo de la página…").

Además, cada pedido llega como copia al correo **sureweareco@gmail.com** (logo, foto de fondo, prendas, total, datos del cliente y botón para escribirle por WhatsApp). Se envía con [Resend](https://resend.com):

1. Crear la cuenta de Resend con sureweareco@gmail.com y agregar el dominio `surewear.co` (Resend da 3 registros DNS para GoDaddy).
2. Crear una API key y ponerla en Vercel como `RESEND_API_KEY`.
3. Opcional: `ORDER_EMAIL_TO` (otro destino) y `ORDER_EMAIL_FROM` (por defecto `SURE Pedidos <pedidos@surewear.co>`).

Sin `RESEND_API_KEY` no se envía correo y el pedido sigue normal por WhatsApp.

Para activar pago en línea (Vercel → Settings → Environment Variables):

| Pasarela | Variables |
|---|---|
| Wompi | `PAYMENT_PROVIDER=wompi`, `WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET` |
| Mercado Pago | `PAYMENT_PROVIDER=mercadopago`, `MP_ACCESS_TOKEN` |

Más `NEXT_PUBLIC_SITE_URL` con el dominio final. Con llaves activas aparece la opción "Pagar en línea" junto a contra entrega. Antes de cobrar de verdad: compra de prueba aprobada, rechazada y pendiente.

### Transferencia (Nequi o llave Bre-B)

Gratis y con confirmación manual. Al elegirla, el checkout no abre WhatsApp de una vez: muestra el total, el Nequi y la llave Bre-B (cada uno con botón de copiar), el titular si está puesto y la referencia SURE-XXXX para escribir en el mensaje de la transferencia. El botón "Ya pagué: enviar comprobante por WhatsApp" abre el chat con el pedido y una línea que avisa del comprobante. El correo a SURE llega con "Pago: Transferencia Nequi / Bre-B (pendiente de comprobante)": se despacha solo cuando el comprobante llegue y el dinero esté en la cuenta.

- Número, llave y titular: `store.transfer` en `lib/config.ts` (`holder` vacío = no se muestra).

## Lista de lanzamientos (newsletter)

El pie de página tiene un formulario de correo y el checkout una casilla (sin marcar) "Quiero recibir por correo los lanzamientos de SURE". Los dos llaman a `/api/newsletter`, que guarda el correo como contacto de Resend dentro del segmento **Newsletter SURE** (Resend cambió las Audiences por Segments). Si el correo ya existe, igual queda en el segmento. Un campo oculto frena bots.

- Variables en Vercel: `RESEND_API_KEY` (la misma de los pedidos) y `RESEND_NEWSLETTER_SEGMENT_ID=04b9d162-9e36-4b7f-9748-1f8fe9429b7f` (id del segmento "Newsletter SURE"). Sin alguna de las dos el formulario responde normal pero no guarda nada.
- Para escribirles: Resend → Broadcasts → enviar al segmento "Newsletter SURE", con el enlace de baja de Resend (`{{{RESEND_UNSUBSCRIBE_URL}}}`) en el pie del correo.
- Código: `lib/newsletter.ts`, `app/api/newsletter/route.ts`, `components/NewsletterForm.tsx`; textos en `lib/copy/newsletter.ts`.

## Estadísticas

Vercel Web Analytics (activar en el proyecto de Vercel → Analytics). Eventos: "Producto visto", "Agregado a la bolsa", "Pedido enviado por WhatsApp". En local no cuenta nada.
