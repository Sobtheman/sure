import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { store } from "@/lib/config";

export const metadata: Metadata = { title: "Tratamiento de datos" };

export default function Privacidad() {
  return (
    <Prose eyebrow="Legal" title="Tratamiento de datos">
      <p>
        Cuando haces un pedido nos das tu nombre, cédula, correo, celular y dirección. Los usamos solo para procesar el
        pago, despachar el pedido y contactarte sobre él. No los vendemos ni los compartimos con terceros distintos de la
        pasarela de pago y la transportadora.
      </p>
      <p>
        De acuerdo con la Ley 1581 de 2012, puedes conocer, actualizar, rectificar o pedir que eliminemos tus datos en
        cualquier momento escribiéndonos por Instagram ({store.instagramHandle}).
      </p>
      <p>
        Los datos de tu tarjeta o cuenta bancaria nunca pasan por este sitio: los recibe directamente la pasarela de
        pago.
      </p>
    </Prose>
  );
}
