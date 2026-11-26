import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "@/components/Link";
import Reveal from "@/components/Reveal";
import TikTokVideo from "@/components/TikTokVideo";
import { archiveFor } from "@/lib/archive";
import { archiveCopy } from "@/lib/copy/archive";
import { storyCopy } from "@/lib/copy/story";
import { hero } from "@/lib/config";
import { langOf } from "@/lib/i18n";
import { Arrow } from "@/components/icons";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = langOf(params);
  const t = archiveCopy[lang];
  return pageMeta(lang, "/archivo", { title: t.metaTitle, description: t.metaDescription, image: archiveFor(lang)[0].cover });
}

// La historia de SURE: la intro y el video, y cada colección como un capítulo. El último es la colección actual.
export default function Archivo({ params }: { params: { lang: string } }) {
  const lang = langOf(params);
  const t = archiveCopy[lang];
  const s = storyCopy[lang];
  const archive = archiveFor(lang);

  return (
    <div className="min-h-screen bg-ink pt-header text-paper">
      <section className="wrap flex flex-col items-center gap-10 pb-14 pt-12 text-center sm:pb-20 sm:pt-20">
        <div className="max-w-4xl">
          <p className="label text-white/50">{t.title}</p>
          <h1 className="display mt-3 text-balance text-[clamp(40px,8vw,104px)]">{s.introTitle}</h1>
          <div className="mx-auto mt-8 max-w-xl space-y-5 text-[17px] leading-[1.6] text-white/75 sm:text-[19px]">
            {s.intro.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </div>
        </div>
        <TikTokVideo className="max-w-[340px] text-left" />
      </section>

      <ul className="wrap space-y-4 pb-4 sm:space-y-6 sm:pb-6">
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
                  <p className="label text-white/85">
                    {s.chapter(i + 1)} · {t.cardMeta(c.year, c.images.length + 1)}
                  </p>
                  <h2 className="display mt-2 text-[clamp(40px,9vw,128px)]">{c.name}</h2>
                  <p className="mt-2 max-w-sm text-[14px] text-white/85">{c.tagline || c.note}</p>
                </div>
                <span className="link-line label mb-2 shrink-0">
                  {t.viewCollection} <Arrow className="text-burgundy-bright transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* Capítulo V: la colección actual */}
        <Reveal as="li" delay={archive.length * 80}>
          <Link href="/tienda" className="group relative block aspect-[4/5] overflow-hidden bg-white/5 sm:aspect-[16/8]">
            <Image
              src={hero.poster}
              alt={hero.posterAlt[lang]}
              fill
              sizes="(min-width: 1440px) 1340px, 100vw"
              className="object-cover object-[60%_40%] transition duration-[1400ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-10">
              <div>
                <p className="label text-white/85">
                  {s.chapter(archive.length + 1)} · <span className="text-burgundy-bright">{s.current.meta}</span>
                </p>
                <h2 className="display mt-2 text-[clamp(40px,9vw,128px)]">{s.current.name}</h2>
                <p className="mt-2 max-w-sm text-[14px] text-white/85">{s.current.tagline}</p>
              </div>
              <span className="link-line label mb-2 shrink-0">
                {s.current.cta} <Arrow className="text-burgundy-bright transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </ul>
      <div className="pb-16 sm:pb-24" />
    </div>
  );
}
