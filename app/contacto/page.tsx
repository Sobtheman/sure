import type { Metadata } from "next";
import Prose from "@/components/Prose";
import SocialLinks from "@/components/SocialLinks";
import { store, whatsappLink } from "@/lib/config";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = { title: "Contacto" };

export default function Contacto() {
  return (
    <Prose eyebrow="Contacto" title="Hablemos.">
      <p>Pedidos, tallas, cambios o colaboraciones. Escríbenos por WhatsApp o Instagram y te respondemos directo.</p>
      <div className="flex flex-col items-start gap-4">
        <a href={whatsappLink("Hola SURE")} target="_blank" rel="noopener noreferrer" className="btn-dark">
          Escribir por WhatsApp <Arrow />
        </a>
        <p className="text-[14px] text-muted">
          WhatsApp <span className="select-all text-ink">{store.whatsappLabel}</span>
        </p>
        <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="link-line text-[14px]">
          Instagram {store.instagramHandle} <Arrow className="text-burgundy" />
        </a>
      </div>
      <SocialLinks className="-ml-3" />
    </Prose>
  );
}
