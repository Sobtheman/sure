import { store, whatsappHello, whatsappLink } from "@/lib/config";
import type { Lang } from "@/lib/i18n";
import { nav } from "@/lib/copy/nav";
import { Instagram, TikTok, WhatsApp } from "@/components/icons";

// Instagram, TikTok y WhatsApp de SURE
export default function SocialLinks({ lang, className = "" }: { lang: Lang; className?: string }) {
  const t = nav[lang];
  const links = [
    { href: store.instagram, label: t.instagram, Icon: Instagram },
    { href: store.tiktok, label: t.tiktok, Icon: TikTok },
    { href: whatsappLink(whatsappHello[lang]), label: t.whatsapp(store.whatsappLabel), Icon: WhatsApp },
  ];
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid h-11 w-11 place-items-center transition-opacity hover:opacity-60"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
