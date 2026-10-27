import Image from "next/image";

// Envíos y cambios: la foto de la bolsa SURE con las cuatro promesas al lado y los detalles debajo.
type Props = {
  eyebrow: string;
  title: string;
  alt: string;
  promises: { big: string; small: string }[];
  children: React.ReactNode;
};

const PHOTO = "/img/envios/bolsa-sure.jpg";
const text = "space-y-8 text-[15px] leading-relaxed [&_h2]:label [&_h2]:mb-3 [&_h2]:text-ink [&_p+p]:mt-3";

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
