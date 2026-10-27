import { ShippingPromises } from "@/components/ShippingLayout";
import { shipping, store, whatsappLink } from "@/lib/config";
import type { Lang } from "@/lib/i18n";
import { pagesCopy } from "@/lib/copy/pages";
import { shippingCopy } from "@/lib/copy/shipping";

// Envíos y cambios: foto de la bolsa SURE, las cuatro promesas y los detalles
export default function ShippingPage({ lang }: { lang: Lang }) {
  const t = pagesCopy[lang].shipping;
  const s = shippingCopy[lang];
  return (
    <ShippingPromises eyebrow={t.eyebrow} title={t.title} alt={s.photoAlt} promises={s.promises}>
      <section>
        <h2>{t.shippingHeading}</h2>
        <p>
          {t.nationwide} <b>{t.free}</b>
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
    </ShippingPromises>
  );
}
