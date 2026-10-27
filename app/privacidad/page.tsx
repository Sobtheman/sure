import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { store } from "@/lib/config";
import { activeProvider } from "@/lib/payments";

export const metadata: Metadata = { title: "Tratamiento de datos" };

export default function Privacidad() {
  const online = activeProvider() !== null;
  return (
    <Prose eyebrow="Legal" title="Tratamiento de datos">
      <p>
        Cuando haces un pedido nos das tu nombre, cédula, correo, celular y dirección. El pedido nos llega por WhatsApp
        con esos datos, y los usamos solo para confirmarlo, despacharlo y contactarte sobre él. No los vendemos ni los
        compartimos con nadie distinto de la transportadora que lleva tu pedido
        {online ? " y la pasarela de pago" : ""}.
      </p>
      <p>
        De acuerdo con la Ley 1581 de 2012, puedes conocer, actualizar, rectificar o pedir que eliminemos tus datos en
        cualquier momento escribiéndonos por WhatsApp ({store.whatsappLabel}) o Instagram ({store.instagramHandle}).
      </p>
      {online && (
        <p>
          Si pagas en línea, los datos de tu tarjeta o cuenta bancaria nunca pasan por este sitio: los recibe
          directamente la pasarela de pago.
        </p>
      )}
    </Prose>
  );
}
