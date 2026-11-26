import ProductCard, { productGrid } from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/lib/catalog";
import type { Lang } from "@/lib/i18n";

// Prendas de la tienda, todas del mismo tamaño y en filas parejas (la destacada ya viene primero desde el catálogo).
export default function ProductGrid({ products, lang, priorityAll = false }: { products: Product[]; lang: Lang; priorityAll?: boolean }) {
  return (
    <div className={`grid gap-x-5 gap-y-12 ${productGrid(products.length)}`}>
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={i * 120}>
          <ProductCard product={p} lang={lang} priority={priorityAll || i === 0} />
        </Reveal>
      ))}
    </div>
  );
}
