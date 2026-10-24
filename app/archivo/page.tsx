import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { archive } from "@/lib/archive";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Archivo",
  description: "Colecciones anteriores de SURE: Niebla, Intrinsic y Sure26.",
};

export default function Archivo() {
  return (
    <div className="min-h-screen bg-ink pt-16 text-paper sm:pt-[72px]">
      <section className="wrap pb-12 pt-12 sm:pb-16 sm:pt-20">
        <p className="label text-white/50">Colecciones anteriores</p>
        <h1 className="display mt-3 text-[clamp(64px,15vw,184px)] uppercase">Archivo</h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
          Lo que ya pasó por la calle. Estas colecciones están agotadas y no vuelven; quedan aquí con su historia.
        </p>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-10">
                <div>
                  <p className="label text-white/60">
                    {c.number} · Agotada · {c.images.length + 1} fotos
                  </p>
                  <h2 className="display mt-2 text-[clamp(52px,10vw,128px)]">{c.name}</h2>
                  <p className="mt-2 max-w-sm text-[14px] text-white/70">{c.note}</p>
                </div>
                <span className="link-line mb-2 shrink-0 text-[13px]">
                  Ver colección <Arrow className="text-burgundy-bright transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <section className="border-t border-white/10">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
          <p className="display text-[32px] sm:text-[40px]">Lo que sí está disponible.</p>
          <Link href="/tienda" className="btn-ghost border-white/70 hover:bg-paper hover:text-ink">
            Ver Dissidencia <Arrow className="text-burgundy-bright" />
          </Link>
        </div>
      </section>
    </div>
  );
}
