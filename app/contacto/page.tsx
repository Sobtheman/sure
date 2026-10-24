import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { store } from "@/lib/config";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = { title: "Contacto" };

export default function Contacto() {
  return (
    <Prose eyebrow="Contacto" title="Hablemos.">
      <p>
        Pedidos, tallas, cambios o colaboraciones: escríbenos por mensaje directo en Instagram. Respondemos personalmente.
      </p>
      <div className="flex flex-col items-start gap-4">
        <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="btn-dark">
          Escribir en Instagram <Arrow />
        </a>
        <a href={store.instagram} target="_blank" rel="noopener noreferrer" className="link-line text-[14px]">
          {store.instagramHandle} <Arrow className="text-burgundy" />
        </a>
        {store.whatsapp && (
          <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="link-line text-[14px]">
            WhatsApp <Arrow className="text-burgundy" />
          </a>
        )}
        {store.email && (
          <a href={`mailto:${store.email}`} className="link-line text-[14px]">
            {store.email} <Arrow className="text-burgundy" />
          </a>
        )}
      </div>
    </Prose>
  );
}
