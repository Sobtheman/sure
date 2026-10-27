import Image from "next/image";
import Link from "@/components/Link";
import type { Product } from "@/lib/catalog";
import { totalStock } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { Arrow } from "@/components/icons";
import type { Lang } from "@/lib/i18n";
import { shop } from "@/lib/copy/shop";

// product llega ya traducido (productsFor / getProduct con el idioma)
export default function ProductCard({ product, lang, priority = false }: { product: Product; lang: Lang; priority?: boolean }) {
  const t = shop[lang].card;
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
        {soldOut && <span className="label absolute left-4 top-4 bg-paper px-2 py-1 text-[10px]">{t.soldOut}</span>}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[14px] font-extrabold uppercase sm:text-[15px]">{product.name}</h3>
          <p className="mt-1 text-[13px] text-muted">
            {product.color} <span className="mx-1.5 text-line">|</span>
            <span className="text-ink">{formatCOP(product.price, lang)}</span>
          </p>
        </div>
        <span className="link-line label shrink-0">
          {t.view} <Arrow className="text-burgundy transition-transform duration-500 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
