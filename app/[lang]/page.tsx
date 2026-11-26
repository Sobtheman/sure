import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ArchiveStrip from "@/components/ArchiveStrip";
import TikTokVideo from "@/components/TikTokVideo";
import Link from "@/components/Link";
import { Arrow } from "@/components/icons";
import { storyCopy } from "@/lib/copy/story";
import Reveal from "@/components/Reveal";
import { productsFor } from "@/lib/catalog";
import { productGrid } from "@/components/ProductCard";
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
  const s = storyCopy[lang];
  return (
    <>
      <Hero />

      <section id="disponible" className="bg-paper py-12 sm:py-16" aria-labelledby="disponible-titulo">
        <div className="wrap">
          <h2 id="disponible-titulo" className="label text-muted">
            {t.available}
          </h2>
          <div className={`mt-6 grid gap-x-5 gap-y-12 sm:mt-8 ${productGrid(productsFor(lang).length)}`}>
            {productsFor(lang).map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProductCard product={p} lang={lang} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* La historia: el video del primer año y la intro */}
      <section className="border-t border-line bg-paper py-14 sm:py-20" aria-labelledby="historia-titulo">
        <div className="wrap grid items-center gap-10 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-7">
            <p className="label text-muted">{s.label}</p>
            <h2 id="historia-titulo" className="display mt-3 text-[clamp(34px,6vw,72px)]">
              {s.introTitle}
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.6] sm:text-[18px]">{s.intro[0]}</p>
            <Link href="/archivo" className="link-line label mt-8">
              {s.home.cta} <Arrow className="text-burgundy" />
            </Link>
          </div>
          <div className="sm:col-span-5 lg:col-span-4 lg:col-start-9">
            <TikTokVideo className="mx-auto max-w-[300px] sm:max-w-none" />
          </div>
        </div>
      </section>

      <ArchiveStrip lang={lang} />
    </>
  );
}
