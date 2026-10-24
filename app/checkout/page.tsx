import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { activeProvider, isTestMode, providerLabel } from "@/lib/payments";

export const metadata: Metadata = { title: "Finalizar compra", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function Checkout() {
  const provider = activeProvider();
  return (
    <div className="bg-mist pt-16 sm:pt-[72px]">
      <CheckoutForm
        payment={provider ? { ...providerLabel[provider], test: isTestMode() } : null}
      />
    </div>
  );
}
