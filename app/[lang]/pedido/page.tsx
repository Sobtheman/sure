import type { Metadata } from "next";
import Link from "@/components/Link";
import { verifyPayment } from "@/lib/payments";
import { whatsappLink } from "@/lib/config";
import { Arrow } from "@/components/icons";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = { title: "Tu pedido", robots: { index: false } };
export const dynamic = "force-dynamic";

const copy = {
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
};

export default async function Pedido({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const { status, reference } = await verifyPayment(searchParams);
  const ref = reference || searchParams.ref || searchParams.external_reference;
  const c = copy[status];
  return (
    <div className="wrap flex min-h-[80svh] max-w-2xl flex-col justify-center pb-24 pt-36">
      {status === "approved" && <ClearCart />}
      {ref && <p className="label text-muted">Pedido {ref}</p>}
      <h1 className="display mt-3 text-[clamp(40px,8vw,72px)]">{c.title}</h1>
      <p className="mt-6 text-[15px] leading-relaxed">{c.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {status === "declined" ? (
          <Link href="/checkout" className="btn-dark">
            Intentar de nuevo <Arrow />
          </Link>
        ) : (
          <Link href="/tienda" className="btn-dark">
            Volver a la tienda <Arrow />
          </Link>
        )}
        <a
          href={whatsappLink(`Hola SURE, vengo de la página y tengo una pregunta sobre mi pedido${ref ? ` ${ref}` : ""}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  );
}
