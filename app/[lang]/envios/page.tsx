import type { Metadata } from "next";
import ShippingPage from "@/components/ShippingPage";
import { langOf } from "@/lib/i18n";
import { pagesCopy } from "@/lib/copy/pages";

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return { title: pagesCopy[langOf(params)].shipping.metaTitle };
}

export default function Envios({ params }: Props) {
  return <ShippingPage lang={langOf(params)} />;
}
