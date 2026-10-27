import type { Metadata } from "next";
import { langOf } from "@/lib/i18n";
import ShippingPage from "@/components/ShippingPage";

// Vista temporal para elegir el diseño de Envíos y cambios. Se borra al elegir.
export const metadata: Metadata = { robots: { index: false } };

export default function Opcion({ params }: { params: { lang: string } }) {
  return <ShippingPage lang={langOf(params)} variant="fondo" />;
}
