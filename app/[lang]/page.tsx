import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ArchiveStrip from "@/components/ArchiveStrip";
import Reveal from "@/components/Reveal";
import { productsFor } from "@/lib/catalog";
import { langOf } from "@/lib/i18n";
import { shop } from "@/lib/copy/shop";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { seoCopy } from "@/lib/copy/seo";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = langOf(params);
  return pageMeta(lang, "/", { fullTitle: seoCopy[lang].homeTitle, description: seoCopy[lang].homeDescription });
}

export default function Home({ params }: { params: { lang: string } }) {
  const lang = langOf(params);
  const t = shop[lang].home;
  return (
    <>
      <Hero />

      <section id="disponible" className="bg-paper py-12 sm:py-16" aria-labelledby="disponible-titulo">
        <div className="wrap">
          <h2 id="disponible-titulo" className="label text-muted">
            {t.available}
          </h2>
          <div className="mt-6 grid gap-x-5 gap-y-12 sm:mt-8 sm:grid-cols-2">
            {productsFor(lang).map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProductCard product={p} lang={lang} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ArchiveStrip lang={lang} />
    </>
  );
}
