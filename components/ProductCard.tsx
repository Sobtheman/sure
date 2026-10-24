import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { totalStock } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { Arrow } from "@/components/icons";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [front, second] = product.images;
  const soldOut = totalStock(product) === 0;
  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-frame">
        <Image
          src={front.src}
          alt={front.alt}
          fill
          priority={priority}
          sizes="(min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-[transform,opacity] duration-[1200ms] ease-out group-hover:scale-[1.03] ${
            second ? "group-hover:opacity-0" : ""
          }`}
        />
        {second && (
          <Image
            src={second.src}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        )}
        {soldOut && <span className="label absolute left-4 top-4 bg-paper px-2 py-1 text-[10px]">Agotado</span>}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[14px] font-extrabold uppercase tracking-[0.01em] sm:text-[15px]">{product.name}</h3>
          <p className="mt-1 text-[13px] text-muted">
            {product.color} <span className="mx-1.5 text-line">|</span>
            <span className="text-ink">{formatCOP(product.price)}</span>
          </p>
        </div>
        <span className="link-line shrink-0 text-[13px]">
          Ver prenda <Arrow className="text-burgundy transition-transform duration-500 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
