"use client";

import NextLink from "next/link";
import { forwardRef } from "react";
import { useLang } from "@/components/LangProvider";
import { localePath } from "@/lib/i18n";

// Enlace interno que conserva el idioma: en inglés "/tienda" lleva a "/en/tienda"
const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof NextLink>>(function Link({ href, ...rest }, ref) {
  const lang = useLang();
  const to = typeof href === "string" ? localePath(lang, href) : href;
  return <NextLink ref={ref} href={to} {...rest} />;
});
export default Link;
