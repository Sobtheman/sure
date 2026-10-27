import { store, whatsappLink } from "@/lib/config";
import { Instagram, TikTok, WhatsApp } from "@/components/icons";

// Instagram, TikTok y WhatsApp de SURE
export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: store.instagram, label: "Instagram de SURE", Icon: Instagram },
    { href: store.tiktok, label: "TikTok de SURE", Icon: TikTok },
    { href: whatsappLink(), label: `WhatsApp de SURE, ${store.whatsappLabel}`, Icon: WhatsApp },
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
