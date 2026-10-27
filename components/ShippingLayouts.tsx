import Image from "next/image";

// Tres formas de presentar Envíos y cambios con la foto de la bolsa SURE (para elegir una).
type Props = {
  eyebrow: string;
  title: string;
  alt: string;
  promises: { big: string; small: string }[];
  children: React.ReactNode;
};

const PHOTO = "/img/envios/bolsa-sure.jpg";
const text = "space-y-8 text-[15px] leading-relaxed [&_h2]:label [&_h2]:mb-3 [&_h2]:text-ink [&_p+p]:mt-3";

// A · Foto al lado: el texto a la izquierda y la foto fija a la derecha mientras se lee
export function ShippingSide({ eyebrow, title, alt, children }: Props) {
  return (
    <div className="wrap pb-24 pt-36 sm:pt-44">
      <p className="label text-muted">{eyebrow}</p>
      <h1 className="display mt-3 text-[clamp(34px,9vw,88px)]">{title}</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-frame lg:order-2 lg:col-span-5 lg:sticky lg:top-[136px] lg:self-start">
          <Image src={PHOTO} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[46%_50%]" />
        </div>
        <div className={`max-w-2xl lg:col-span-7 ${text}`}>{children}</div>
      </div>
    </div>
  );
}

// B · Foto de fondo: la foto ocupa el encabezado y el título va encima
export function ShippingBackdrop({ eyebrow, title, alt, children }: Props) {
  return (
    <div className="pt-header">
      <section className="relative h-[72svh] min-h-[480px] overflow-hidden bg-ink text-paper sm:max-h-[760px]">
        <Image src={PHOTO} alt={alt} fill priority sizes="100vw" className="object-cover object-[46%_45%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
        <div className="wrap absolute inset-x-0 bottom-0 pb-10 sm:pb-14">
          <p className="label text-white/75">{eyebrow}</p>
          <h1 className="display mt-3 text-[clamp(34px,9vw,96px)]">{title}</h1>
        </div>
      </section>
      <div className={`wrap max-w-[calc(42rem+2rem)] pb-24 pt-12 sm:max-w-[calc(42rem+4rem)] sm:pt-16 lg:max-w-[calc(42rem+6rem)] ${text}`}>{children}</div>
    </div>
  );
}

// C · Promesas: la foto grande con las cuatro promesas al lado y los detalles debajo
export function ShippingPromises({ eyebrow, title, alt, promises, children }: Props) {
  return (
    <div className="pb-24 pt-header">
      <section className="wrap grid gap-8 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-12">
          <p className="label text-muted">{eyebrow}</p>
          <h1 className="display mt-3 text-[clamp(34px,9vw,88px)]">{title}</h1>
        </div>
        <div className="relative aspect-[5/4] overflow-hidden bg-frame lg:col-span-7 lg:aspect-auto lg:min-h-[520px]">
          <Image src={PHOTO} alt={alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover object-[46%_50%]" />
        </div>
        <ul className="grid grid-cols-2 gap-px self-stretch border border-line bg-line lg:col-span-5">
          {promises.map((p) => (
            <li key={p.small} className="flex flex-col justify-end bg-paper p-5 sm:p-7">
              <span className="display text-[clamp(22px,4.4vw,40px)] leading-[0.95]">{p.big}</span>
              <span className="mt-3 text-[13px] leading-snug text-muted">{p.small}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className={`wrap mt-16 max-w-[calc(42rem+2rem)] sm:max-w-[calc(42rem+4rem)] lg:max-w-[calc(42rem+6rem)] ${text}`}>{children}</div>
    </div>
  );
}
