import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ArchiveStrip from "@/components/ArchiveStrip";
import Reveal from "@/components/Reveal";
import { products } from "@/lib/catalog";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="disponible" className="bg-paper py-12 sm:py-16" aria-labelledby="disponible-titulo">
        <div className="wrap">
          <h2 id="disponible-titulo" className="label text-muted">
            Disponible ahora
          </h2>
          <div className="mt-6 grid gap-x-5 gap-y-12 sm:mt-8 sm:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProductCard product={p} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ArchiveStrip />
    </>
  );
}
