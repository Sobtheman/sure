import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products, productsFor } from "@/lib/catalog";
import ProductGallery from "@/components/ProductGallery";
import PurchasePanel from "@/components/PurchasePanel";
import ProductCard from "@/components/ProductCard";
import { formatCOP } from "@/lib/format";
import { langOf, localePath } from "@/lib/i18n";
import { absolute, pageMeta } from "@/lib/seo";
import { shipping } from "@/lib/config";
import { shop } from "@/lib/copy/shop";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = langOf(params);
  const p = getProduct(params.slug, lang);
  if (!p) return {};
  return pageMeta(lang, `/producto/${p.slug}`, {
    title: p.name,
    description: `${p.name}, ${p.color.toLowerCase()}. ${formatCOP(p.price, lang)}. ${p.description}`,
    image: p.images[0],
  });
}

export default function ProductPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = langOf(params);
  const t = shop[lang].productPage;
  const product = getProduct(params.slug, lang);
  if (!product) notFound();
  const others = productsFor(lang).filter((p) => p.slug !== product.slug);

  // Datos del producto para Google y asistentes: precio, disponibilidad, envío gratis y cambios
  const url = absolute(localePath(lang, `/producto/${product.slug}`));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#producto`,
    url,
    sku: product.slug,
    name: product.name,
    color: product.color,
    material: lang === "en" ? "100% cotton" : "100 % algodón",
    inLanguage: lang === "en" ? "en" : "es-CO",
    brand: { "@type": "Brand", name: "SURE" },
    image: product.images.map((i) => absolute(i.src)),
    description: product.description,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "COP",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: Object.values(product.stock).some((n) => n > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": `${absolute("/")}#marca` },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "COP" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "CO" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: shipping.deliveryDays - 1, unitCode: "DAY" },
        },
      },
      // Devolución con reembolso = derecho de retracto (5 días hábiles, envío de vuelta por cuenta del cliente).
      // Los cambios de talla en 15 días no son devoluciones, por eso no van aquí.
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "CO",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 5,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
        refundType: "https://schema.org/FullRefund",
      },
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
