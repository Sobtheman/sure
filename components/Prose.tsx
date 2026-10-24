// Página de texto simple (envíos, contacto, datos)
export default function Prose({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="wrap pb-24 pt-28 sm:pt-36">
      <p className="label text-muted">{eyebrow}</p>
      <h1 className="display mt-3 text-[clamp(44px,9vw,88px)]">{title}</h1>
      <div className="mt-10 max-w-2xl space-y-8 text-[15px] leading-relaxed [&_h2]:label [&_h2]:mb-3 [&_h2]:text-ink [&_p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}
