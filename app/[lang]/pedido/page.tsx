import type { Metadata } from "next";
import Link from "@/components/Link";
import { verifyPayment } from "@/lib/payments";
import { whatsappLink } from "@/lib/config";
import { Arrow } from "@/components/icons";
import ClearCart from "@/components/ClearCart";
import { langOf } from "@/lib/i18n";
import { checkoutCopy } from "@/lib/copy/checkout";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return { title: checkoutCopy[langOf(params)].result.metaTitle, robots: { index: false } };
}
export const dynamic = "force-dynamic";

export default async function Pedido({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: Record<string, string | undefined>;
}) {
  const t = checkoutCopy[langOf(params)];
  const { status, reference } = await verifyPayment(searchParams);
  const ref = reference || searchParams.ref || searchParams.external_reference;
  const c = t.result.status[status];
  return (
    <div className="wrap flex min-h-[80svh] max-w-2xl flex-col justify-center pb-24 pt-36">
      {status === "approved" && <ClearCart />}
      {ref && <p className="label text-muted">{t.done.reference(ref)}</p>}
      <h1 className="display mt-3 text-[clamp(40px,8vw,72px)]">{c.title}</h1>
      <p className="mt-6 text-[15px] leading-relaxed">{c.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {status === "declined" ? (
          <Link href="/checkout" className="btn-dark">
            {t.result.retry} <Arrow />
          </Link>
        ) : (
          <Link href="/tienda" className="btn-dark">
            {t.result.backToShop} <Arrow />
          </Link>
        )}
        <a
          href={whatsappLink(t.result.whatsappText(ref))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          {t.result.whatsapp}
        </a>
      </div>
    </div>
  );
}
