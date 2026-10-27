import { ShippingBackdrop, ShippingPromises, ShippingSide } from "@/components/ShippingLayouts";
import { shipping, store, whatsappLink } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { pagesCopy } from "@/lib/copy/pages";
import { shippingCopy } from "@/lib/copy/shipping";

// Envíos y cambios con la foto de la bolsa SURE. Tres diseños para elegir: al lado, de fondo o con las promesas.
export type ShippingVariant = "lado" | "fondo" | "promesas";
const LAYOUTS = { lado: ShippingSide, fondo: ShippingBackdrop, promesas: ShippingPromises };

export default function ShippingPage({ lang, variant }: { lang: Lang; variant: ShippingVariant }) {
  const t = pagesCopy[lang].shipping;
  const s = shippingCopy[lang];
  const Layout = LAYOUTS[variant];
  return (
    <Layout eyebrow={t.eyebrow} title={t.title} alt={s.photoAlt} promises={s.promises}>
      <section>
        <h2>{t.shippingHeading}</h2>
        <p>
          {t.nationwide} <b>{t.freeFrom(formatCOP(shipping.freeFrom, lang))}</b>
          {t.fee(formatCOP(shipping.fee, lang))}
        </p>
        <p>{t.delivery(shipping.deliveryDays)}</p>
      </section>
      <section>
        <h2>{t.paymentHeading}</h2>
        <p>{t.payment}</p>
      </section>
      <section>
        <h2>{t.exchangeHeading}</h2>
        <p>{t.exchange(shipping.exchangeDays)}</p>
        <p>
          {t.exchangeContactBefore}{" "}
          <a href={whatsappLink(t.exchangeWhatsapp)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            WhatsApp
          </a>{" "}
          {t.exchangeContactOr}{" "}
          <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Instagram
          </a>{" "}
          {t.exchangeContactAfter}
        </p>
      </section>
      <section>
        <h2>{t.withdrawalHeading}</h2>
        <p>{t.withdrawal}</p>
      </section>
      <section>
        <h2>{t.warrantyHeading}</h2>
        <p>{t.warranty}</p>
      </section>
    </Layout>
  );
}
