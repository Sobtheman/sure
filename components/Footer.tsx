import Link from "next/link";
import Logo from "@/components/Logo";
import { store } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="wrap flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-14">
        <Link href="/" aria-label="SURE, inicio">
          <Logo className="w-[104px]" />
        </Link>
        <nav aria-label="Pie de página" className="flex flex-col gap-4 sm:flex-row sm:gap-12">
          <a href={store.instagram} target="_blank" rel="noopener noreferrer" className="label hover:opacity-60">
            Instagram
          </a>
          <Link href="/contacto" className="label hover:opacity-60">
            Contacto
          </Link>
          <Link href="/envios" className="label hover:opacity-60">
            Envíos y cambios
          </Link>
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
