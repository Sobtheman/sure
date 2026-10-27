import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products, productsFor } from "@/lib/catalog";
import ProductGallery from "@/components/ProductGallery";
import PurchasePanel from "@/components/PurchasePanel";
import ProductCard from "@/components/ProductCard";
import { formatCOP } from "@/lib/format";
import { langOf } from "@/lib/i18n";
import { shop } from "@/lib/copy/shop";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = langOf(params);
  const p = getProduct(params.slug, lang);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name}, ${p.color.toLowerCase()}. ${formatCOP(p.price, lang)}. ${p.description}`,
    openGraph: { images: [{ url: p.images[0].src }] },
  };
}

export default function ProductPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = langOf(params);
  const t = shop[lang].productPage;
  const product = getProduct(params.slug, lang);
  if (!product) notFound();
  const others = productsFor(lang).filter((p) => p.slug !== product.slug);

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
      <div className="pt-header">
        <div className="lg:wrap lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-8">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>
          <div className="wrap pt-7 lg:col-span-5 lg:px-0 lg:pt-0">
            <div className="no-scrollbar lg:sticky lg:top-[136px] lg:max-h-[calc(100svh-136px)] lg:overflow-y-auto lg:overscroll-contain lg:pb-8">
              <PurchasePanel product={product} />
            </div>
          </div>
        </div>
      </div>

      <section className="wrap mt-20 border-t border-line pb-20 pt-10 sm:mt-28" aria-labelledby="tambien">
        <h2 id="tambien" className="label text-muted">
          {t.alsoIn(product.collection)}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} lang={lang} />
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
