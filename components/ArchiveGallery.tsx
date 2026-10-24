"use client";

import Image from "next/image";
import { useState } from "react";
import type { ArchiveImage } from "@/lib/archive";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";

// Galería editorial de una colección: ritmo de una foto ancha y dos lado a lado.
// Cada foto abre el visor con zoom.
export default function ArchiveGallery({ images, name }: { images: ArchiveImage[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {images.map((img, i) => {
          const wide = i % 3 === 0 && i !== images.length - 1;
          return (
            <Reveal key={img.src} delay={(i % 2) * 90} className={wide ? "sm:col-span-2" : ""}>
              <button
                onClick={() => setOpen(i)}
                className={`group relative block w-full cursor-zoom-in overflow-hidden bg-white/5 ${
                  wide ? "aspect-[4/5] sm:aspect-[16/10]" : "aspect-[4/5]"
                }`}
                aria-label={`Ampliar foto ${i + 1} de ${name}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={wide ? "(min-width: 1440px) 1340px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                  className="object-cover object-[50%_15%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </button>
            </Reveal>
          );
        })}
      </div>
      {open !== null && (
        <Lightbox
          dark
          images={images.map((i, k) => ({ src: i.src, alt: i.alt, label: `${name} ${k + 1}` }))}
          start={open}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
