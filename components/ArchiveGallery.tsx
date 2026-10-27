"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ArchiveImage } from "@/lib/archive";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";

type Tile = { img: ArchiveImage; shape: "wide" | "half" | "single" };

// Arma la galería según la forma de cada foto: las horizontales van a todo el ancho con su
// proporción real; las verticales van de a dos (4:5). Una vertical sin pareja queda centrada.
function layout(images: ArchiveImage[]): Tile[] {
  const portraits = images.filter((i) => i.height >= i.width);
  const landscapes = images.filter((i) => i.width > i.height);
  const tiles: Tile[] = [];
  let p = 0;
  while (p + 1 < portraits.length || landscapes.length) {
    for (let k = 0; k < 2 && p + 1 < portraits.length; k++) {
      tiles.push({ img: portraits[p], shape: "half" }, { img: portraits[p + 1], shape: "half" });
      p += 2;
    }
    const l = landscapes.shift();
    if (l) tiles.push({ img: l, shape: "wide" });
  }
  if (p < portraits.length) tiles.push({ img: portraits[p], shape: "single" });
  return tiles;
}

export default function ArchiveGallery({
  images,
  name,
  dark = true,
}: {
  images: ArchiveImage[];
  name: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const tiles = useMemo(() => layout(images), [images]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {tiles.map(({ img, shape }, i) => (
          <Reveal
            key={img.src}
            delay={(i % 2) * 90}
            className={shape === "wide" ? "sm:col-span-2" : shape === "single" ? "sm:col-span-2 sm:mx-auto sm:w-1/2" : ""}
          >
            <button
              onClick={() => setOpen(i)}
              className={`group relative block w-full cursor-zoom-in overflow-hidden ${dark ? "bg-white/5" : "bg-frame"} ${
                shape === "wide" ? "" : "aspect-[4/5]"
              }`}
              style={shape === "wide" ? { aspectRatio: `${img.width} / ${img.height}` } : undefined}
              aria-label={`Ampliar foto ${i + 1} de ${name}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={shape === "half" ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1440px) 1340px, 100vw"}
                className="object-cover object-[50%_15%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
              />
            </button>
          </Reveal>
        ))}
      </div>
      {open !== null && (
        <Lightbox
          dark={dark}
          images={tiles.map(({ img }) => ({ src: img.src, alt: img.alt, label: name }))}
          start={open}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
