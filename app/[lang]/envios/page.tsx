import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { seoCopy } from "@/lib/copy/seo";
import ShippingPage from "@/components/ShippingPage";
import { langOf } from "@/lib/i18n";
import { pagesCopy } from "@/lib/copy/pages";

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = langOf(params);
  return pageMeta(lang, "/envios", { title: pagesCopy[lang].shipping.metaTitle, description: seoCopy[lang].shippingDescription, image: { src: "/img/envios/bolsa-sure.jpg", width: 1078, height: 877 } });
}

export default function Envios({ params }: Props) {
  return <ShippingPage lang={langOf(params)} />;
}
