import type { Metadata } from "next";
import Prose from "@/components/Prose";
import SocialLinks from "@/components/SocialLinks";
import { store, whatsappHello, whatsappLink } from "@/lib/config";
import { Arrow } from "@/components/icons";
import { langOf } from "@/lib/i18n";
import { pagesCopy } from "@/lib/copy/pages";

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return { title: pagesCopy[langOf(params)].contact.metaTitle };
}

export default function Contacto({ params }: Props) {
  const lang = langOf(params);
  const t = pagesCopy[lang].contact;
  return (
    <Prose eyebrow={t.eyebrow} title={t.title}>
      <p>{t.intro}</p>
      <div className="flex flex-col items-start gap-4">
        <a href={whatsappLink(whatsappHello[lang])} target="_blank" rel="noopener noreferrer" className="btn-dark">
          {t.whatsappCta} <Arrow />
        </a>
        <p className="text-[14px] text-muted">
          WhatsApp <span className="select-all text-ink">{store.whatsappLabel}</span>
        </p>
        <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="link-line label">
          Instagram {store.instagramHandle} <Arrow className="text-burgundy" />
        </a>
      </div>
      <SocialLinks lang={lang} className="-ml-3" />
    </Prose>
  );
}
