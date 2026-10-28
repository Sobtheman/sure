import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "@/components/Link";
import Reveal from "@/components/Reveal";
import { archiveFor } from "@/lib/archive";
import { archiveCopy } from "@/lib/copy/archive";
import { langOf } from "@/lib/i18n";
import { Arrow } from "@/components/icons";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = langOf(params);
  const t = archiveCopy[lang];
  return pageMeta(lang, "/archivo", { title: t.metaTitle, description: t.metaDescription, image: archiveFor(lang)[0].cover });
}

export default function Archivo({ params }: { params: { lang: string } }) {
  const lang = langOf(params);
  const t = archiveCopy[lang];
  const archive = archiveFor(lang);

  return (
    <div className="min-h-screen bg-ink pt-header text-paper">
      <section className="wrap pb-12 pt-12 sm:pb-16 sm:pt-20">
        <p className="label text-white/50">{t.eyebrow}</p>
        <h1 className="display mt-3 text-[clamp(48px,15vw,184px)]">{t.title}</h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">{t.intro}</p>
      </section>

      <ul className="wrap space-y-4 pb-20 sm:space-y-6 sm:pb-28">
        {archive.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 80}>
            <Link href={`/archivo/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-white/5 sm:aspect-[16/8]">
              <Image
                src={c.cover.src}
                alt={c.cover.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1440px) 1340px, 100vw"
                className="object-cover object-[50%_30%] grayscale-[30%] transition duration-[1400ms] ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-10">
                <div>
                  <p className="label text-white/85">{t.cardMeta(c.year, c.images.length + 1)}</p>
                  <h2 className="display mt-2 text-[clamp(44px,10vw,128px)]">{c.name}</h2>
                  <p className="mt-2 max-w-sm text-[14px] text-white/85">{c.note}</p>
                </div>
                <span className="link-line label mb-2 shrink-0">
                  {t.viewCollection} <Arrow className="text-burgundy-bright transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <section className="border-t border-white/10">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
          <p className="display text-[32px] sm:text-[40px]">{t.available}</p>
          <Link href="/tienda" className="btn-ghost border-white/70 hover:bg-paper hover:text-ink">
            {t.shopCta} <Arrow className="text-burgundy-bright" />
          </Link>
        </div>
      </section>
    </div>
  );
}
