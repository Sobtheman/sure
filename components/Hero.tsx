import Image from "next/image";
import { hero } from "@/lib/config";
import { Arrow } from "@/components/icons";

// Foto de campaña a pantalla completa
export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink text-paper sm:max-h-[1000px]">
      <div className="hero-media absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-[76%_30%] sm:object-[60%_35%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <div className="wrap absolute inset-x-0 bottom-0 pb-[max(2.25rem,env(safe-area-inset-bottom))] sm:pb-12">
        <p className="label rise text-white/85" style={{ animationDelay: "250ms" }}>
          Nueva colección
        </p>
        <h1 className="display rise mt-3 text-[clamp(64px,17vw,148px)] sm:mt-4" style={{ animationDelay: "380ms" }}>
          {hero.collection}
        </h1>
        <a
          href="#disponible"
          className="btn-ghost rise mt-6 h-[52px] border-white/80 px-6 text-paper hover:bg-paper hover:text-ink sm:mt-8"
          style={{ animationDelay: "520ms" }}
        >
          Comprar colección <Arrow className="text-burgundy-bright" />
        </a>
      </div>
    </section>
  );
}
