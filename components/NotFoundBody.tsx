"use client";

import Link from "@/components/Link";
import { Arrow } from "@/components/icons";
import { useLang } from "@/components/LangProvider";
import { pagesCopy } from "@/lib/copy/pages";

// Textos de la página 404. not-found.tsx no recibe params, así que el idioma sale del contexto.
export default function NotFoundBody() {
  const t = pagesCopy[useLang()].notFound;
  return (
    <>
      <h1 className="display text-[clamp(48px,10vw,112px)]">{t.title}</h1>
      <Link href="/tienda" className="link-line label">
        {t.back} <Arrow className="text-burgundy" />
      </Link>
    </>
  );
}
