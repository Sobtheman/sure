import Link from "next/link";
import { Arrow } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[80svh] flex-col items-start justify-center gap-8 pt-32">
      <p className="label text-muted">404</p>
      <h1 className="display text-[clamp(48px,10vw,112px)]">Aquí no hay nada.</h1>
      <Link href="/tienda" className="link-line text-[14px]">
        Volver a la tienda <Arrow className="text-burgundy" />
      </Link>
    </div>
  );
}
