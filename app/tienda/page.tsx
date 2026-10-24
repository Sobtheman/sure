import type { Metadata } from "next";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products } from "@/lib/catalog";
import { hero } from "@/lib/config";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Colección Dissidencia de SURE: camiseta blanca y hoodie negro. Envíos a todo Colombia.",
};

export default function Tienda() {
  return (
    <div className="pt-16 sm:pt-[72px]">
      <section className="wrap pb-10 pt-10 sm:pb-14 sm:pt-16">
        <p className="label text-muted">Colección</p>
        <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="display text-[clamp(56px,12vw,128px)]">{hero.collection}</h1>
          <p className="max-w-sm pb-2 text-[15px] leading-relaxed text-muted">
            Dos prendas. El ojo rojo y el monograma S. Mirar de frente lo que otros prefieren no ver.
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

      <section className="relative h-[70svh] min-h-[420px] overflow-hidden bg-ink" aria-label="Campaña">
        <Image
          src="/img/producto/camiseta-campana.jpg"
          alt="Campaña Watch Your Demons: la camiseta Dissidencia de espaldas y de frente bajo luz naranja"
          fill
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <p className="wrap label absolute inset-x-0 bottom-8 text-paper">Watch Your Demons · {hero.collection}</p>
      </section>
    </div>
  );
}
