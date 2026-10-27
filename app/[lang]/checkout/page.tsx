import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { activeProvider, isTestMode, providerLabel } from "@/lib/payments";
import { langOf } from "@/lib/i18n";
import { checkoutCopy } from "@/lib/copy/checkout";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return { title: checkoutCopy[langOf(params)].metaTitle, robots: { index: false } };
}
export const dynamic = "force-dynamic";

export default function Checkout({ params }: { params: { lang: string } }) {
  const t = checkoutCopy[langOf(params)];
  const provider = activeProvider();
  return (
    <div className="bg-mist pt-header">
      <CheckoutForm
        payment={
          provider
            ? {
                ...providerLabel[provider],
                methods: t.providerMethods[provider] ?? providerLabel[provider].methods,
                test: isTestMode(),
              }
            : null
        }
      />
    </div>
  );
}
