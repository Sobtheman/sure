import Link from "next/link";
import Logo from "@/components/Logo";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="wrap flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-14">
        <Link href="/" aria-label="SURE, inicio">
          <Logo className="w-[104px]" />
        </Link>
        <nav aria-label="Pie de página" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-12">
          <Link href="/tienda" className="label hover:opacity-60">
            Tienda
          </Link>
          <Link href="/contacto" className="label hover:opacity-60">
            Contacto
          </Link>
          <Link href="/envios" className="label hover:opacity-60">
            Envíos y cambios
          </Link>
          <SocialLinks className="-ml-3 sm:ml-0" />
        </nav>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-white/10 py-6 text-[11px] text-white/45 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} SURE. Hecho en Colombia.</p>
        <Link href="/privacidad" className="hover:text-white/80">
          Tratamiento de datos
        </Link>
      </div>
    </footer>
  );
}
