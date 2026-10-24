# SURE — tienda en línea

Next.js 14 (App Router) + Tailwind. Sitio en español, precios en COP, pensado primero para móvil.

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Páginas

| Ruta | Qué tiene |
|---|---|
| `/` | Hero de campaña (foto, o film si se configura), Disponible ahora, Archivo, pie |
| `/tienda` | La colección Dissidencia |
| `/producto/[slug]` | Galería, tallas con stock, guía de medidas, envíos, agregar a la bolsa |
| `/archivo` | Niebla, Intrinsic y Sure26 como archivo editorial (agotadas) |
| `/checkout` | Datos de envío, resumen y pago |
| `/pedido` | Regreso de la pasarela: consulta el estado real del pago con el proveedor |
| `/envios`, `/contacto`, `/privacidad` | Políticas y contacto |

## Dónde se cambia cada cosa

- `lib/catalog.ts`: productos, precios, stock por talla, medidas, composición y fotos
- `lib/config.ts`: Instagram, correo, WhatsApp, tarifa y tiempos de envío, días de cambio, foto o film del hero
- `lib/archive.ts`: colecciones del archivo y sus fotos
- `public/img/`: fotos (Next las sirve en AVIF/WebP al tamaño de cada pantalla)
- `public/brand/sure-logo.svg`, `components/Logo.tsx`: logo vectorizado

Todo lo marcado `POR CONFIRMAR` en esos archivos es un valor de demo.

## Film del hero

Pon el video en `public/media/` y su ruta en `hero.video` (`lib/config.ts`). La foto queda como póster y respaldo, y aparecen los controles de pausa, progreso y sonido.

## Pagos

Sin variables de entorno, el checkout dice que los pagos en línea no están activos y deja el pedido listo para enviarlo por Instagram. **Nada se cobra en ese modo.**

Para activar una pasarela (en Vercel → Settings → Environment Variables):

| Pasarela | Variables |
|---|---|
| Wompi | `PAYMENT_PROVIDER=wompi`, `WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET` |
| Mercado Pago | `PAYMENT_PROVIDER=mercadopago`, `MP_ACCESS_TOKEN` |

Y `NEXT_PUBLIC_SITE_URL` con el dominio final (para la URL de regreso).

Las llaves de prueba (`pub_test_…` en Wompi, `TEST-…` en Mercado Pago) muestran "Modo de prueba" en el checkout. Antes de cobrar de verdad: hacer una compra de prueba completa (aprobada, rechazada y pendiente) y revisar que `/pedido` muestre cada estado.

Pendiente para producción: el stock vive en `lib/catalog.ts` y no se descuenta solo. Falta un webhook de la pasarela que confirme el pago, guarde el pedido y descuente el stock.
