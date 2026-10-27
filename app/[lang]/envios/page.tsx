import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { shipping, store, whatsappLink } from "@/lib/config";
import { formatCOP } from "@/lib/format";

export const metadata: Metadata = { title: "Envíos y cambios" };

export default function Envios() {
  return (
    <Prose eyebrow="Ayuda" title="Envíos y cambios">
      <section>
        <h2>Envíos</h2>
        <p>
          Enviamos a toda Colombia. <b>El envío es gratis en compras desde {formatCOP(shipping.freeFrom)}</b>; en compras
          menores cuesta {formatCOP(shipping.fee)}, a cualquier ciudad.
        </p>
        <p>
          Tu pedido llega en {shipping.deliveryDays} días hábiles o menos. Apenas sale, te mandamos el número de guía por
          WhatsApp para que lo sigas.
        </p>
      </section>
      <section>
        <h2>Pago</h2>
        <p>
          Puedes pagar contra entrega: pagas cuando el pedido llega a tu puerta. Si prefieres, te confirmamos el pago por
          WhatsApp antes del envío.
        </p>
      </section>
      <section>
        <h2>Cambios de talla</h2>
        <p>
          ¿No te quedó? Cambias la talla dentro de los {shipping.exchangeDays} días siguientes a la entrega. La prenda debe
          estar sin uso, sin lavar y con sus etiquetas, y el cambio depende de que haya la talla que necesitas.
        </p>
        <p>
          Escríbenos por{" "}
          <a href={whatsappLink("Hola SURE, vengo de la página y quiero cambiar una talla.")} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            WhatsApp
          </a>{" "}
          o{" "}
          <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Instagram
          </a>{" "}
          con tu número de pedido y lo coordinamos.
        </p>
      </section>
      <section>
        <h2>Derecho de retracto</h2>
        <p>
          Como compraste en línea, tienes derecho a retractarte de la compra dentro de los cinco (5) días hábiles
          siguientes a la entrega, según el artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor). La prenda
          debe devolverse en el mismo estado en que la recibiste; los costos de transporte de la devolución corren por tu
          cuenta. Te reintegramos el dinero dentro de los treinta (30) días calendario siguientes.
        </p>
      </section>
      <section>
        <h2>Garantía</h2>
        <p>
          Si tu prenda llega con un defecto de fabricación, escríbenos con fotos y la reponemos o te devolvemos el
          dinero.
        </p>
      </section>
    </Prose>
  );
}
