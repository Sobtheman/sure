import ProductCard, { productGrid } from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/lib/catalog";
import type { Lang } from "@/lib/i18n";

// Prendas de la tienda: la destacada arriba a todo el ancho, con su foto entera; las demás debajo, en filas parejas.
export default function ProductGrid({ products, lang, priorityAll = false }: { products: Product[]; lang: Lang; priorityAll?: boolean }) {
  const featured = products.filter((p) => p.featured);
  const rest = products.filter((p) => !p.featured);
  return (
    <div className="space-y-12">
      {featured.map((p) => (
        <Reveal key={p.slug}>
          <ProductCard product={p} lang={lang} priority wide />
        </Reveal>
      ))}
      <div className={`grid gap-x-5 gap-y-12 ${productGrid(rest.length)}`}>
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 120}>
            <ProductCard product={p} lang={lang} priority={priorityAll || (!featured.length && i === 0)} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
