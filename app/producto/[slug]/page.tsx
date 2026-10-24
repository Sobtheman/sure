import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/catalog";
import ProductGallery from "@/components/ProductGallery";
import PurchasePanel from "@/components/PurchasePanel";
import ProductCard from "@/components/ProductCard";
import { formatCOP } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name}, ${p.color.toLowerCase()}. ${formatCOP(p.price)}. ${p.description}`,
    openGraph: { images: [{ url: p.images[0].src }] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const others = products.filter((p) => p.slug !== product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    color: product.color,
    brand: { "@type": "Brand", name: "SURE" },
    image: product.images.map((i) => i.src),
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: product.price,
      availability: Object.values(product.stock).some((n) => n > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <div className="pt-16 sm:pt-[72px]">
        <div className="lg:wrap lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-8">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>
          <div className="wrap pt-7 lg:col-span-5 lg:px-0 lg:pt-0">
            <div className="lg:sticky lg:top-[104px]">
              <PurchasePanel product={product} />
            </div>
          </div>
        </div>
      </div>

      <section className="wrap mt-20 border-t border-line pb-20 pt-10 sm:mt-28" aria-labelledby="tambien">
        <h2 id="tambien" className="label text-muted">
          También en {product.collection}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
