import Image from "next/image";
import Link from "@/components/Link";
import { archive } from "@/lib/archive";
import { Arrow } from "@/components/icons";
import Reveal from "@/components/Reveal";

// Bloque negro del inicio: las colecciones anteriores como archivo editorial.
export default function ArchiveStrip() {
  return (
    <section className="bg-ink pb-14 pt-12 text-paper sm:pb-20 sm:pt-16" aria-labelledby="archivo-titulo">
      <div className="wrap flex items-end justify-between gap-6">
        <div>
          <h2 id="archivo-titulo" className="display text-[34px] uppercase sm:text-[44px]">
            Archivo
          </h2>
          <p className="mt-2 text-[13px] text-white/55">Colecciones anteriores. Ya no están a la venta.</p>
        </div>
        <Link href="/archivo" className="link-line label shrink-0">
          Ver colecciones <Arrow />
        </Link>
      </div>

      <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 sm:overflow-visible sm:px-8 lg:mx-auto lg:max-w-[1440px] lg:px-12">
        {archive.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 90} className="w-[78vw] shrink-0 snap-start sm:w-auto">
            <Link href={`/archivo/${c.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5 sm:aspect-[5/4]">
                <Image
                  src={c.cover.src}
                  alt={c.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                  className="object-cover object-[50%_30%] grayscale-[35%] transition duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-[15px] font-extrabold uppercase">{c.name}</h3>
                <span className="label text-[10px] text-white/45">{c.year}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
