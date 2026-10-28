import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { seoCopy } from "@/lib/copy/seo";
import Prose from "@/components/Prose";
import { store } from "@/lib/config";
import { activeProvider } from "@/lib/payments";
import { langOf } from "@/lib/i18n";
import { pagesCopy } from "@/lib/copy/pages";

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = langOf(params);
  return pageMeta(lang, "/privacidad", { title: pagesCopy[lang].privacy.metaTitle, description: seoCopy[lang].privacyDescription });
}

export default function Privacidad({ params }: Props) {
  const t = pagesCopy[langOf(params)].privacy;
  const online = activeProvider() !== null;
  return (
    <Prose eyebrow={t.eyebrow} title={t.title}>
      <p>{t.use(online)}</p>
      <p>{t.rights(store.whatsappLabel, store.instagramHandle)}</p>
      {online && <p>{t.gateway}</p>}
    </Prose>
  );
}
