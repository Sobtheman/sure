import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { archive, getCollection } from "@/lib/archive";
import ArchiveGallery from "@/components/ArchiveGallery";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/icons";

export function generateStaticParams() {
  return archive.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCollection(params.slug);
  if (!c) return {};
  return {
    title: `${c.name} · Archivo`,
    description: `${c.name}, colección anterior de SURE. ${c.note}`,
    openGraph: { images: [{ url: c.cover.src }] },
  };
}

export default function Coleccion({ params }: { params: { slug: string } }) {
  const c = getCollection(params.slug);
  if (!c) notFound();
  const i = archive.indexOf(c);
  const next = archive[(i + 1) % archive.length];
  // La portada ya está arriba; la galería muestra el resto (o la portada si no hay más).
  const gallery = c.images.length ? c.images : [c.cover];

  return (
    <div className="bg-ink text-paper">
      {/* Portada */}
      <section className="relative h-[92svh] min-h-[560px] overflow-hidden sm:max-h-[980px]">
        <div className="hero-media absolute inset-0">
          <Image src={c.cover.src} alt={c.cover.alt} fill priority sizes="100vw" className="object-cover object-[50%_30%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-black/40" />
        <div className="wrap absolute inset-x-0 bottom-0 pb-10 sm:pb-14">
          <Link href="/archivo" className="label rise inline-flex items-center gap-2 text-white/70 hover:text-paper">
            <Arrow className="rotate-180" /> Archivo
          </Link>
          <p className="label rise mt-6 text-white/60" style={{ animationDelay: "150ms" }}>
            {c.year} · Agotada
          </p>
          <h1 className="display rise mt-3 text-[clamp(72px,18vw,200px)]" style={{ animationDelay: "280ms" }}>
            {c.name}
          </h1>
          <p className="rise mt-4 max-w-md text-[15px] text-white/70" style={{ animationDelay: "400ms" }}>
            {c.note}
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="wrap grid gap-8 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12" aria-labelledby="historia">
        <h2 id="historia" className="label text-white/50 lg:col-span-3">
          La historia
        </h2>
        <div className="space-y-6 text-[18px] leading-[1.6] text-white/85 sm:text-[21px] lg:col-span-8">
          {c.story.map((p, k) => (
            <Reveal key={k} delay={k * 100}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Galería */}
      <section className="wrap pb-16 sm:pb-24" aria-label={`Fotos de ${c.name}`}>
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="label text-white/50">Fotos · {gallery.length}</h2>
          <p className="label text-[10px] text-white/40">Toca una foto para ampliar</p>
        </div>
        <ArchiveGallery images={gallery} name={c.name} />
      </section>

      {/* Piezas */}
      <section className="wrap border-t border-white/10 py-14 sm:py-20" aria-labelledby="piezas">
        <h2 id="piezas" className="label text-white/50">
          Las piezas
        </h2>
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {c.pieces.map((p) => (
            <li key={p.name} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <p className="text-[17px] font-extrabold">{p.name}</p>
                <p className="mt-1 text-[14px] text-white/55">{p.detail}</p>
              </div>
              <span className="label shrink-0 text-[10px] text-burgundy-bright">Agotado</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-white/50">
          Esta colección no vuelve.{" "}
          <Link href="/tienda" className="text-paper underline underline-offset-4">
            Ver lo disponible ahora
          </Link>
          .
        </p>
      </section>

      {/* Siguiente */}
      <Link href={`/archivo/${next.slug}`} className="group relative block h-[46svh] min-h-[320px] overflow-hidden border-t border-white/10">
        <Image
          src={next.cover.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%] opacity-50 grayscale transition duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:opacity-70 group-hover:grayscale-0"
        />
        <div className="wrap absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 pb-10">
          <div>
            <p className="label text-white/60">Siguiente · {next.year}</p>
            <p className="display mt-2 text-[clamp(48px,10vw,120px)]">{next.name}</p>
          </div>
          <Arrow className="mb-6 h-4 w-10 text-burgundy-bright transition-transform duration-500 group-hover:translate-x-2" />
        </div>
      </Link>
    </div>
  );
}
