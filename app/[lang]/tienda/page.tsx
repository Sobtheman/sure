import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { productsFor } from "@/lib/catalog";
import { hero } from "@/lib/config";
import { lookbookFor } from "@/lib/lookbook";
import ArchiveGallery from "@/components/ArchiveGallery";
import { langOf } from "@/lib/i18n";
import { shop } from "@/lib/copy/shop";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = langOf(params);
  const t = shop[lang].shopPage;
  return pageMeta(lang, "/tienda", { title: t.metaTitle, description: t.metaDescription, image: productsFor(lang)[0].images[0] });
}

export default function Tienda({ params }: { params: { lang: string } }) {
  const lang = langOf(params);
  const t = shop[lang].shopPage;
  return (
    <div className="pt-header">
      <section className="wrap pb-10 pt-10 sm:pb-14 sm:pt-16">
        <p className="label text-muted">{t.kicker}</p>
        <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="display text-[clamp(44px,12vw,128px)]">{hero.collection}</h1>
          <p className="max-w-sm pb-2 text-[15px] leading-relaxed text-muted">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="wrap pb-16 sm:pb-24" aria-label={t.piecesLabel}>
        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2">
          {productsFor(lang).map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <ProductCard product={p} lang={lang} priority />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap grid gap-6 border-t border-line py-14 sm:py-20 lg:grid-cols-12 lg:gap-12" aria-labelledby="historia">
        <h2 id="historia" className="label text-muted lg:col-span-3">
          {t.storyLabel}
        </h2>
        <div className="lg:col-span-8">
          <p className="display text-[clamp(32px,6vw,64px)]">{t.storyTagline}</p>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.6] sm:text-[19px]">
            {t.story.map((p, k) => (
              <Reveal key={k} delay={k * 100}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap border-t border-line pb-20 pt-12 sm:pb-28 sm:pt-16" aria-labelledby="lookbook">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="lookbook" className="display text-[34px] uppercase sm:text-[44px]">
            {t.lookbook}
          </h2>
          <p className="label text-[10px] text-muted">{t.tapToZoom}</p>
        </div>
        <ArchiveGallery images={lookbookFor(lang)} name="Disidencia" dark={false} />
      </section>
    </div>
  );
}
