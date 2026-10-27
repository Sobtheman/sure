import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { shipping, store, whatsappLink } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import { langOf } from "@/lib/i18n";
import { pagesCopy } from "@/lib/copy/pages";

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return { title: pagesCopy[langOf(params)].shipping.metaTitle };
}

export default function Envios({ params }: Props) {
  const lang = langOf(params);
  const t = pagesCopy[lang].shipping;
  return (
    <Prose eyebrow={t.eyebrow} title={t.title}>
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
    </Prose>
  );
}
