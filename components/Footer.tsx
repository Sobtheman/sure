import Link from "@/components/Link";
import Logo from "@/components/Logo";
import SocialLinks from "@/components/SocialLinks";
import type { Lang } from "@/lib/i18n";
import { nav } from "@/lib/copy/nav";

export default function Footer({ lang }: { lang: Lang }) {
  const t = nav[lang];
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="wrap flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-14">
        <Link href="/" aria-label={t.home}>
          <Logo className="w-[104px]" />
        </Link>
        <nav aria-label={t.footerNav} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-12">
          <Link href="/tienda" className="label hover:opacity-60">
            {t.shop}
          </Link>
          <Link href="/contacto" className="label hover:opacity-60">
            {t.contact}
          </Link>
          <Link href="/envios" className="label hover:opacity-60">
            {t.shipping}
          </Link>
          <SocialLinks lang={lang} className="-ml-3 sm:ml-0" />
        </nav>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-white/10 py-6 text-[11px] text-white/45 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} SURE. {t.madeIn}</p>
        <Link href="/privacidad" className="hover:text-white/80">
          {t.privacy}
        </Link>
      </div>
    </footer>
  );
}
