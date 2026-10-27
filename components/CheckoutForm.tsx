"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart";
import { getProduct } from "@/lib/catalog";
import { store, whatsappLink } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import { Arrow, WhatsApp } from "@/components/icons";
import { FreeShipping } from "@/components/CartDrawer";
import { track } from "@/lib/track";

const REGIONS = [
  "Bogotá D.C.", "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá",
  "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira",
  "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda",
  "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
];

type Payment = { name: string; methods: string; test: boolean } | null;
type Method = "online" | "contraentrega" | "confirmar";

const METHOD_TEXT: Record<Exclude<Method, "online">, string> = {
  contraentrega: "Contra entrega",
  confirmar: "Que me confirmen el pago por WhatsApp",
};
type Buyer = { name: string; legalId: string; email: string; phone: string; region: string; city: string; address: string; notes: string };

const empty: Buyer = { name: "", legalId: "", email: "", phone: "", region: "", city: "", address: "", notes: "" };

function validate(b: Buyer) {
  const e: Partial<Record<keyof Buyer, string>> = {};
  if (b.name.trim().length < 3) e.name = "Escribe tu nombre completo.";
  if (!/^\d{5,11}$/.test(b.legalId.replace(/\D/g, ""))) e.legalId = "Cédula de 5 a 11 dígitos.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) e.email = "Revisa el correo.";
  if (!/^3\d{9}$/.test(b.phone.replace(/\D/g, ""))) e.phone = "Celular de 10 dígitos que empiece por 3.";
  if (!b.region) e.region = "Elige el departamento.";
  if (b.city.trim().length < 2) e.city = "Escribe la ciudad o municipio.";
  if (b.address.trim().length < 5) e.address = "Escribe la dirección completa.";
  return e;
}

export default function CheckoutForm({ payment }: { payment: Payment }) {
  const cart = useCart();
  const [buyer, setBuyer] = useState<Buyer>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Buyer, string>>>({});
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const [method, setMethod] = useState<Method>(payment ? "online" : "contraentrega");
  const [manual, setManual] = useState<{ reference: string; text: string; copied: boolean } | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // Al confirmar el pedido, el foco va al título para que se anuncie
  useEffect(() => {
    if (manual) doneRef.current?.focus();
  }, [manual]);

  const set = (k: keyof Buyer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBuyer((b) => ({ ...b, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(buyer);
    setErrors(v);
    const firstInvalid = (["email", "phone", "legalId", "name", "region", "city", "address"] as const).find((k) => v[k]);
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`)?.focus();
      return;
    }
    if (!accepted) {
      setServerError("Acepta el tratamiento de datos para continuar.");
      return;
    }
    setServerError("");
    // Pedido por WhatsApp: se arma aquí y se abre el chat con todo el detalle.
    if (method !== "online") {
      const reference = `SURE-${Date.now().toString(36).toUpperCase()}`;
      const text = orderText(reference, METHOD_TEXT[method]);
      window.open(whatsappLink(text), "_blank", "noopener");
      // Copia al correo de SURE; si falla, el pedido sigue en WhatsApp
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart.lines, buyer, reference, method }),
        keepalive: true,
      }).catch(() => {});
      track("Pedido enviado por WhatsApp", { total: cart.total, pago: METHOD_TEXT[method] });
      setManual({ reference, text, copied: false });
      navigator.clipboard?.writeText(text).then(
        () => setManual((m) => (m ? { ...m, copied: true } : m)),
        () => {}
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart.lines, buyer }),
      });
      let data: { error?: string; mode?: string; url?: string } = {};
      try {
        data = await res.json();
      } catch {}
      if (!res.ok) throw new Error(data.error || "No pudimos conectar con el pago en línea. Elige pago contra entrega o inténtalo de nuevo.");
      if (data.mode !== "redirect") throw new Error("No pudimos conectar con el pago en línea. Elige pago contra entrega o inténtalo de nuevo.");
      window.location.href = data.url!;
    } catch (err) {
      // Los errores propios vienen en español; los de red (TypeError) no.
      setServerError(
        err instanceof Error && !(err instanceof TypeError)
          ? err.message
          : "No pudimos conectar con el pago en línea. Revisa tu conexión o elige pago contra entrega."
      );
    } finally {
      setBusy(false);
    }
  };

  const orderText = (ref: string, paymentText: string) =>
    [
      `Hola SURE, vengo de la página y quiero hacer este pedido (${ref}):`,
      ...cart.lines.map((l) => {
        const p = getProduct(l.slug)!;
        return `• ${p.name} · Talla ${l.size} × ${l.qty} — ${formatCOP(p.price * l.qty)}`;
      }),
      `Envío: ${cart.shippingFee === 0 ? "Gratis" : formatCOP(cart.shippingFee)}`,
      `Total: ${formatCOP(cart.total)}`,
      `Pago: ${paymentText}`,
      "",
      `${buyer.name} · CC ${buyer.legalId}`,
      `${buyer.email} · ${buyer.phone}`,
      `${buyer.address}, ${buyer.city}, ${buyer.region}`,
      buyer.notes ? `Notas: ${buyer.notes}` : "",
    ]
      .filter((x, i, a) => x !== "" || a[i - 1] !== "")
      .join("\n");

  if (!cart.ready) return <div className="min-h-[70svh]" />;

  if (manual) {
    return (
      <div className="wrap max-w-2xl pb-24 pt-12 sm:pt-20">
        <p className="label text-muted">Pedido {manual.reference}</p>
        <h1 ref={doneRef} tabIndex={-1} className="display mt-3 text-[clamp(40px,8vw,72px)] outline-none">
          Pedido listo.
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed">
          Te abrimos WhatsApp con tu pedido. Envíalo y te confirmamos disponibilidad, envío y pago.
          {manual.copied ? " También lo copiamos, por si lo quieres pegar." : ""}
        </p>
        <pre className="mt-6 whitespace-pre-wrap border border-line bg-paper p-5 font-sans text-[14px] leading-relaxed">
          {manual.text}
        </pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappLink(manual.text)} target="_blank" rel="noopener noreferrer" className="btn-dark">
            <WhatsApp className="h-4 w-4" /> Abrir WhatsApp
          </a>
          <button
            className="btn-ghost"
            onClick={() => {
              navigator.clipboard?.writeText(manual.text).then(
                () => setManual({ ...manual, copied: true }),
                () => {}
              );
            }}
          >
            {manual.copied ? "Copiado" : "Copiar pedido"}
          </button>
        </div>
        <p className="mt-6 text-[13px] text-muted">
          ¿Prefieres Instagram?{" "}
          <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
            Escríbenos a {store.instagramHandle}
          </a>{" "}
          y pega el pedido.
        </p>
      </div>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <div className="wrap flex min-h-[70svh] flex-col items-start justify-center gap-6">
        <h1 className="display text-[clamp(40px,8vw,72px)]">Tu bolsa está vacía.</h1>
        <Link href="/tienda" className="link-line label">
          Ver la colección <Arrow className="text-burgundy" />
        </Link>
      </div>
    );
  }

  const summary = (
    <div>
      <FreeShipping subtotal={cart.subtotal} />
      <ul className="mt-2 divide-y divide-line">
        {cart.lines.map((l) => {
          const p = getProduct(l.slug)!;
          return (
            <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-4">
              <div className="relative aspect-[4/5] w-16 shrink-0 bg-frame">
                <Image src={p.images[0].src} alt="" fill sizes="64px" className="object-cover" />
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-paper">
                  {l.qty}
                </span>
              </div>
              <div className="flex flex-1 justify-between gap-3 text-[13px]">
                <div>
                  <p className="font-bold uppercase">{p.name}</p>
                  <p className="mt-1 text-muted">
                    {p.color} · Talla {l.size}
                  </p>
                </div>
                <p>{formatCOP(p.price * l.qty)}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <dl className="space-y-2 border-t border-line pt-4 text-[14px]">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd>{formatCOP(cart.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Envío</dt>
          <dd>{cart.shippingFee === 0 ? "Gratis" : formatCOP(cart.shippingFee)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-[17px] font-bold">
          <dt>Total</dt>
          <dd>{formatCOP(cart.total)}</dd>
        </div>
      </dl>
    </div>
  );

  const field = (k: keyof Buyer, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium">{label}</span>
      <input
        id={`f-${k}`}
        value={buyer[k]}
        onChange={set(k)}
        aria-invalid={Boolean(errors[k])}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        className={`field ${errors[k] ? "border-burgundy" : ""}`}
        {...props}
      />
      {errors[k] && (
        <span id={`e-${k}`} className="mt-1 block text-[12px] text-burgundy">
          {errors[k]}
        </span>
      )}
    </label>
  );

  return (
    <div className="wrap max-w-[1180px] pb-24 pt-8 sm:pt-12">
      <h1 className="display text-[clamp(36px,6vw,56px)]">Finalizar compra</h1>

      {/* Resumen plegable en móvil */}
      <div className="mt-6 border-y border-line bg-paper lg:hidden">
        <button
          className="flex h-14 w-full items-center justify-between px-4 text-[14px]"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
        >
          <span className="underline underline-offset-4">{summaryOpen ? "Ocultar resumen" : "Ver resumen"} ({cart.count})</span>
          <span className="font-bold">{formatCOP(cart.total)}</span>
        </button>
        {summaryOpen && <div className="px-4 pb-4">{summary}</div>}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={submit} noValidate className="space-y-10 lg:col-span-7">
          <fieldset className="space-y-4">
            <legend className="label mb-4">Contacto</legend>
            {field("email", "Correo", { type: "email", autoComplete: "email", inputMode: "email" })}
            <div className="grid gap-4 sm:grid-cols-2">
              {field("phone", "Celular", { type: "tel", autoComplete: "tel-national", inputMode: "numeric", placeholder: "300 000 0000" })}
              {field("legalId", "Cédula", { inputMode: "numeric", autoComplete: "off" })}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="label mb-4">Envío</legend>
            {field("name", "Nombre completo", { autoComplete: "name" })}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium">Departamento</span>
                <select
                  id="f-region"
                  value={buyer.region}
                  onChange={set("region")}
                  aria-invalid={Boolean(errors.region)}
                  className={`field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 6%22><path d=%22M1 1l4 4 4-4%22 fill=%22none%22 stroke=%22%230d0e10%22/></svg>')] bg-[length:10px] bg-[right_14px_center] bg-no-repeat pr-9 ${
                    errors.region ? "border-burgundy" : ""
                  }`}
                  autoComplete="address-level1"
                >
                  <option value="">Elige…</option>
                  {REGIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                {errors.region && <span className="mt-1 block text-[12px] text-burgundy">{errors.region}</span>}
              </label>
              {field("city", "Ciudad o municipio", { autoComplete: "address-level2" })}
            </div>
            {field("address", "Dirección", { autoComplete: "street-address", placeholder: "Calle 00 # 00-00" })}
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium">
                Indicaciones <span className="font-normal text-muted">(opcional)</span>
              </span>
              <input
                id="f-notes"
                value={buyer.notes}
                onChange={set("notes")}
                placeholder="Apartamento, barrio, torre…"
                className="field"
              />
            </label>
          </fieldset>

          <fieldset>
            <legend className="label mb-4">Pago</legend>
            <div className="grid gap-2">
              {(
                [
                  ...(payment
                    ? [{ id: "online", title: `Pagar en línea con ${payment.name}`, note: payment.methods }]
                    : []),
                  { id: "contraentrega", title: "Pago contra entrega", note: "Pagas cuando el pedido llega a tu puerta." },
                  { id: "confirmar", title: "Te confirmamos el pago", note: "Te escribimos por WhatsApp con las opciones." },
                ] as { id: Method; title: string; note: string }[]
              ).map((o) => (
                <label
                  key={o.id}
                  className={`flex cursor-pointer items-start gap-3 border bg-paper p-4 transition-colors ${
                    method === o.id ? "border-burgundy" : "border-line hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="pago"
                    value={o.id}
                    checked={method === o.id}
                    onChange={() => setMethod(o.id)}
                    className="mt-1 h-4 w-4 shrink-0 accent-burgundy"
                  />
                  <span>
                    <span className="block text-[14px] font-semibold">{o.title}</span>
                    <span className="mt-0.5 block text-[13px] text-muted">{o.note}</span>
                  </span>
                </label>
              ))}
            </div>
            {method === "online" && payment?.test && (
              <p className="mt-3 text-[13px] text-burgundy">Modo de prueba: no se realizan cobros reales.</p>
            )}
          </fieldset>

          <label className="flex items-start gap-3 text-[13px] leading-relaxed">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => {
                setAccepted(e.target.checked);
                setServerError("");
              }}
              className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
            />
            <span>
              Acepto el{" "}
              <Link href="/privacidad" target="_blank" className="underline underline-offset-4">
                tratamiento de mis datos
              </Link>{" "}
              y las{" "}
              <Link href="/envios" target="_blank" className="underline underline-offset-4">
                políticas de envíos y cambios
              </Link>
              .
            </span>
          </label>

          <div>
            <button type="submit" disabled={busy} className="btn-dark w-full">
              {busy ? (
                "Procesando…"
              ) : method === "online" && payment ? (
                <>
                  Pagar {formatCOP(cart.total)} con {payment.name} <Arrow />
                </>
              ) : (
                <>
                  <WhatsApp className="h-4 w-4" /> Enviar pedido por WhatsApp
                </>
              )}
            </button>
            <p className="mt-3 min-h-[20px] text-[13px] text-burgundy" aria-live="polite">
              {serverError}
            </p>
          </div>
        </form>

        <aside className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[136px] bg-paper p-6">
            <p className="label mb-2">Resumen</p>
            {summary}
          </div>
        </aside>
      </div>
    </div>
  );
}
