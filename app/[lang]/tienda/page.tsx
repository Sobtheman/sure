import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products } from "@/lib/catalog";
import { hero } from "@/lib/config";
import { lookbook } from "@/lib/lookbook";
import ArchiveGallery from "@/components/ArchiveGallery";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Colección Disidencia de SURE: camiseta blanca y hoodie negro. Envío gratis desde $100.000 y pago contra entrega.",
};

export default function Tienda() {
  return (
    <div className="pt-header">
      <section className="wrap pb-10 pt-10 sm:pb-14 sm:pt-16">
        <p className="label text-muted">Colección</p>
        <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="display text-[clamp(44px,12vw,128px)]">{hero.collection}</h1>
          <p className="max-w-sm pb-2 text-[15px] leading-relaxed text-muted">
            Camiseta y hoodie. Envíos a toda Colombia, gratis desde $100.000.
          </p>
        </div>
      </section>

      <section className="wrap pb-16 sm:pb-24" aria-label="Prendas">
        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <ProductCard product={p} priority />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap border-t border-line pb-20 pt-12 sm:pb-28 sm:pt-16" aria-labelledby="lookbook">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="lookbook" className="display text-[34px] uppercase sm:text-[44px]">
            Lookbook
          </h2>
          <p className="label text-[10px] text-muted">Toca una foto para ampliar</p>
        </div>
        <ArchiveGallery images={lookbook} name="Disidencia" dark={false} />
      </section>
    </div>
  );
}
