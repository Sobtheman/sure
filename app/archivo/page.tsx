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
      <section className="wrap pb-12 pt-12 sm:pb-20 sm:pt-20">
        <p className="label text-white/50">Colecciones anteriores</p>
        <h1 className="display mt-3 text-[clamp(64px,15vw,184px)] uppercase">Archivo</h1>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-[15px] leading-relaxed text-white/60">
            Lo que ya pasó por la calle. Estas colecciones están agotadas y no vuelven; quedan aquí como registro.
          </p>
          <nav aria-label="Colecciones" className="flex gap-6">
            {archive.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="label hover:text-burgundy-bright">
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {archive.map((c, n) => (
        <section key={c.slug} id={c.slug} className="scroll-mt-20 border-t border-white/10 py-12 sm:py-20" aria-labelledby={`${c.slug}-t`}>
          <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="label text-white/40">{String(n + 1).padStart(2, "0")} · Agotada</p>
                <h2 id={`${c.slug}-t`} className="display mt-3 text-[clamp(48px,9vw,96px)]">
                  {c.name}
                </h2>
                <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/60">{c.note}</p>
              </div>
            </div>
            <div className={`grid gap-3 sm:gap-4 lg:col-span-8 ${c.images.length ? "sm:grid-cols-2" : ""}`}>
              <Reveal className={c.images.length ? "sm:col-span-2" : ""}>
                <figure className="relative aspect-[4/5] overflow-hidden bg-white/5 sm:aspect-[16/11]">
                  <Image
                    src={c.cover.src}
                    alt={c.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className="object-cover object-[50%_30%]"
                  />
                </figure>
              </Reveal>
              {c.images.map((img, i) => {
                const small = img.width < 700;
                return (
                  <Reveal key={img.src} delay={i * 100}>
                    <figure
                      className={`relative overflow-hidden bg-white/5 ${small ? "aspect-[16/9] sm:aspect-[4/5]" : "aspect-[4/5]"}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={small ? "(min-width: 640px) 31vw, 100vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"}
                        className="object-cover object-[50%_25%]"
                      />
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

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
