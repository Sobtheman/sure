"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart";
import { getProduct } from "@/lib/catalog";
import { readableKey, store, whatsappLink } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import { Arrow, WhatsApp } from "@/components/icons";
import { FreeShipping } from "@/components/CartDrawer";
import { track } from "@/lib/track";
import { useLang } from "@/components/LangProvider";
import { checkoutCopy } from "@/lib/copy/checkout";
import { cartCopy } from "@/lib/copy/cart";
import type { Lang } from "@/lib/i18n";

const REGIONS = [
  "Bogotá D.C.", "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá",
  "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira",
  "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda",
  "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
];

type Payment = { name: string; methods: string; test: boolean } | null;
type Method = "online" | "contraentrega" | "transferencia" | "confirmar";

type Buyer = { name: string; legalId: string; email: string; phone: string; region: string; city: string; address: string; notes: string };

const empty: Buyer = { name: "", legalId: "", email: "", phone: "", region: "", city: "", address: "", notes: "" };

function validate(b: Buyer, lang: Lang) {
  const m = checkoutCopy[lang].errors;
  const e: Partial<Record<keyof Buyer, string>> = {};
  if (b.name.trim().length < 3) e.name = m.name;
  if (!/^\d{5,11}$/.test(b.legalId.replace(/\D/g, ""))) e.legalId = m.legalId;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) e.email = m.email;
  if (!/^3\d{9}$/.test(b.phone.replace(/\D/g, ""))) e.phone = m.phone;
  if (!b.region) e.region = m.region;
  if (b.city.trim().length < 2) e.city = m.city;
  if (b.address.trim().length < 5) e.address = m.address;
  return e;
}

export default function CheckoutForm({ payment }: { payment: Payment }) {
  const lang = useLang();
  const t = checkoutCopy[lang];
  const c = cartCopy[lang];
  const cart = useCart();
  const [buyer, setBuyer] = useState<Buyer>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Buyer, string>>>({});
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const [method, setMethod] = useState<Method>(payment ? "online" : "contraentrega");
  const [manual, setManual] = useState<{ reference: string; text: string; copied: boolean; transfer?: { total: number } } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // Al confirmar el pedido, el foco va al título para que se anuncie
  // (depende de la referencia, no del objeto: copiar el pedido no debe devolver la página arriba)
  const doneKey = manual?.reference;
  useEffect(() => {
    if (doneKey) doneRef.current?.focus();
  }, [doneKey]);

  const set = (k: keyof Buyer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBuyer((b) => ({ ...b, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  // Lista de lanzamientos: solo si marcó la casilla. Va aparte (keepalive) y nunca frena ni rompe el pedido.
  const joinNewsletter = () => {
    if (!newsletter) return;
    try {
      fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: buyer.email.trim(), lang, website: "" }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  };

  const copyValue = (id: string, value: string) => {
    navigator.clipboard?.writeText(value).then(
      () => setCopiedKey(id),
      () => {}
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(buyer, lang);
    setErrors(v);
    const firstInvalid = (["email", "phone", "legalId", "name", "region", "city", "address"] as const).find((k) => v[k]);
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`)?.focus();
      return;
    }
    if (!accepted) {
      setServerError(t.errors.accept);
      return;
    }
    setServerError("");
    // Transferencia: no se abre WhatsApp todavía; primero se muestran los datos para pagar
    // y el chat se abre desde ahí, con el pedido y el aviso del comprobante.
    if (method === "transferencia") {
      const reference = `SURE-${Date.now().toString(36).toUpperCase()}`;
      const text = `${orderText(reference, t.methodText.transferencia).trimEnd()}\n\n${t.order.receipt}`;
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart.lines, buyer, reference, method, lang }),
        keepalive: true,
      }).catch(() => {});
      track("Pedido enviado por WhatsApp", { total: cart.total, pago: checkoutCopy.es.methodText.transferencia });
      joinNewsletter();
      setCopiedKey(null);
      setManual({ reference, text, copied: false, transfer: { total: cart.total } });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Pedido por WhatsApp: se arma aquí y se abre el chat con todo el detalle.
    if (method !== "online") {
      const reference = `SURE-${Date.now().toString(36).toUpperCase()}`;
      const text = orderText(reference, t.methodText[method]);
      window.open(whatsappLink(text), "_blank", "noopener");
      // Copia al correo de SURE; si falla, el pedido sigue en WhatsApp
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart.lines, buyer, reference, method, lang }),
        keepalive: true,
      }).catch(() => {});
      // Analítica: la forma de pago se registra siempre con el texto en español
      track("Pedido enviado por WhatsApp", { total: cart.total, pago: checkoutCopy.es.methodText[method] });
      joinNewsletter();
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
        body: JSON.stringify({ lines: cart.lines, buyer, lang }),
      });
      let data: { error?: string; mode?: string; url?: string } = {};
      try {
        data = await res.json();
      } catch {}
      if (!res.ok) throw new Error(t.errors.api(data.error, res.status));
      if (data.mode !== "redirect") throw new Error(t.errors.online);
      joinNewsletter();
      window.location.href = data.url!;
    } catch (err) {
      // Los errores propios ya vienen en el idioma de la página; los de red (TypeError) no.
      setServerError(
        err instanceof Error && !(err instanceof TypeError)
          ? err.message
          : t.errors.network
      );
    } finally {
      setBusy(false);
    }
  };

  const orderText = (ref: string, paymentText: string) =>
    [
      t.order.greeting(ref),
      ...cart.lines.map((l) => {
        const p = getProduct(l.slug, lang)!;
        return t.order.item(p.name, l.size, l.qty, formatCOP(p.price * l.qty, lang));
      }),
      t.order.shipping(cart.shippingFee === 0 ? c.free : formatCOP(cart.shippingFee, lang)),
      t.order.total(formatCOP(cart.total, lang)),
      t.order.payment(paymentText),
      "",
      t.order.buyer(buyer.name, buyer.legalId),
      `${buyer.email} · ${buyer.phone}`,
      `${buyer.address}, ${buyer.city}, ${buyer.region}`,
      buyer.notes ? t.order.notes(buyer.notes) : "",
    ]
      .filter((x, i, a) => x !== "" || a[i - 1] !== "")
      .join("\n");

  if (!cart.ready) return <div className="min-h-[70svh]" />;

  // Pago por transferencia: total, Nequi, llave Bre-B y referencia para copiar; después, el comprobante por WhatsApp
  if (manual?.transfer) {
    const p = t.transferDone;
    const { nequi, llave, holder } = store.transfer;
    const rows = [
      { id: "nequi", label: p.nequi, value: nequi, shown: readableKey(nequi) },
      { id: "llave", label: p.llave, value: llave, shown: readableKey(llave) },
    ];
    const copyButton = (id: string, label: string, value: string) => (
      <button
        type="button"
        onClick={() => copyValue(id, value)}
        aria-label={copiedKey === id ? undefined : p.copyLabel(label)}
        className="label -my-3 -mr-3 inline-flex h-11 shrink-0 items-center px-3 underline underline-offset-4 hover:text-burgundy"
      >
        {copiedKey === id ? p.copied : p.copy}
      </button>
    );
    return (
      <div className="wrap max-w-2xl pb-24 pt-12 sm:pt-20">
        <p className="label text-muted">{t.done.reference(manual.reference)}</p>
        <h1 ref={doneRef} tabIndex={-1} className="display mt-3 text-[clamp(40px,8vw,72px)] outline-none">
          {p.title}
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed">{p.body}</p>
        <dl className="mt-6 divide-y divide-line border border-line bg-paper">
          <div className="flex items-baseline justify-between gap-4 p-5">
            <dt className="text-[13px] text-muted">{p.amount}</dt>
            <dd className="text-[22px] font-bold">{formatCOP(manual.transfer.total, lang)}</dd>
          </div>
          {rows.map((r) => (
            <div key={r.id} className="p-5">
              <dt className="text-[13px] text-muted">{r.label}</dt>
              <dd className="mt-0.5 flex items-center justify-between gap-4">
                <span className="text-[17px] font-semibold">{r.shown}</span>
                {copyButton(r.id, r.label, r.value)}
              </dd>
            </div>
          ))}
          {holder && (
            <div className="p-5">
              <dt className="text-[13px] text-muted">{p.holder}</dt>
              <dd className="mt-0.5 text-[15px] font-semibold">{holder}</dd>
            </div>
          )}
          <div className="p-5">
            <dt className="text-[13px] text-muted">{p.reference}</dt>
            <dd className="mt-0.5 flex items-center justify-between gap-4">
              <span className="text-[17px] font-semibold">{manual.reference}</span>
              {copyButton("ref", p.reference, manual.reference)}
            </dd>
            <dd className="mt-1 text-[13px] text-burgundy">{p.referenceNote}</dd>
          </div>
        </dl>
        <p className="sr-only" aria-live="polite">
          {copiedKey ? p.copied : ""}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={whatsappLink(manual.text)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark h-auto min-h-[56px] py-3 text-center"
          >
            <WhatsApp className="h-4 w-4 shrink-0" /> {p.sendReceipt}
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
            {manual.copied ? t.done.copied : t.done.copy}
          </button>
        </div>
        <p className="mt-6 text-[13px] text-muted">
          {t.done.instagramAsk}{" "}
          <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
            {t.done.instagramLink(store.instagramHandle)}
          </a>{" "}
          {t.done.instagramAfter}
        </p>
      </div>
    );
  }

  if (manual) {
    return (
      <div className="wrap max-w-2xl pb-24 pt-12 sm:pt-20">
        <p className="label text-muted">{t.done.reference(manual.reference)}</p>
        <h1 ref={doneRef} tabIndex={-1} className="display mt-3 text-[clamp(40px,8vw,72px)] outline-none">
          {t.done.title}
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed">
          {t.done.body}
          {manual.copied ? t.done.copiedNote : ""}
        </p>
        <pre className="mt-6 whitespace-pre-wrap border border-line bg-paper p-5 font-sans text-[14px] leading-relaxed">
          {manual.text}
        </pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappLink(manual.text)} target="_blank" rel="noopener noreferrer" className="btn-dark">
            <WhatsApp className="h-4 w-4" /> {t.done.openWhatsApp}
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
            {manual.copied ? t.done.copied : t.done.copy}
          </button>
        </div>
        <p className="mt-6 text-[13px] text-muted">
          {t.done.instagramAsk}{" "}
          <a href={store.instagramDM} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
            {t.done.instagramLink(store.instagramHandle)}
          </a>{" "}
          {t.done.instagramAfter}
        </p>
      </div>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <div className="wrap flex min-h-[70svh] flex-col items-start justify-center gap-6">
        <h1 className="display text-[clamp(40px,8vw,72px)]">{c.emptyTitle}</h1>
        <Link href="/tienda" className="link-line label">
          {c.viewCollection} <Arrow className="text-burgundy" />
        </Link>
      </div>
    );
  }

  const summary = (
    <div>
      <FreeShipping subtotal={cart.subtotal} />
      <ul className="mt-2 divide-y divide-line">
        {cart.lines.map((l) => {
          const p = getProduct(l.slug, lang)!;
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
                    {p.color} · {c.sizeLine(l.size)}
                  </p>
                </div>
                <p>{formatCOP(p.price * l.qty, lang)}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <dl className="space-y-2 border-t border-line pt-4 text-[14px]">
        <div className="flex justify-between">
          <dt className="text-muted">{c.subtotal}</dt>
          <dd>{formatCOP(cart.subtotal, lang)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">{c.shipping}</dt>
          <dd>{cart.shippingFee === 0 ? c.free : formatCOP(cart.shippingFee, lang)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-[17px] font-bold">
          <dt>{c.total}</dt>
          <dd>{formatCOP(cart.total, lang)}</dd>
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
      <h1 className="display text-[clamp(36px,6vw,56px)]">{t.title}</h1>

      {/* Resumen plegable en móvil */}
      <div className="mt-6 border-y border-line bg-paper lg:hidden">
        <button
          className="flex h-14 w-full items-center justify-between px-4 text-[14px]"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
        >
          <span className="underline underline-offset-4">{summaryOpen ? t.hideSummary : t.showSummary} ({cart.count})</span>
          <span className="font-bold">{formatCOP(cart.total, lang)}</span>
        </button>
        {summaryOpen && <div className="px-4 pb-4">{summary}</div>}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={submit} noValidate className="space-y-10 lg:col-span-7">
          <fieldset className="space-y-4">
            <legend className="label mb-4">{t.contact}</legend>
            {field("email", t.email, { type: "email", autoComplete: "email", inputMode: "email" })}
            <div className="grid gap-4 sm:grid-cols-2">
              {field("phone", t.phone, { type: "tel", autoComplete: "tel-national", inputMode: "numeric", placeholder: t.phonePlaceholder })}
              {field("legalId", t.legalId, { inputMode: "numeric", autoComplete: "off" })}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="label mb-4">{t.shippingLegend}</legend>
            {field("name", t.name, { autoComplete: "name" })}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium">{t.region}</span>
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
                  <option value="">{t.regionPlaceholder}</option>
                  {REGIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                {errors.region && <span className="mt-1 block text-[12px] text-burgundy">{errors.region}</span>}
              </label>
              {field("city", t.city, { autoComplete: "address-level2" })}
            </div>
            {field("address", t.address, { autoComplete: "street-address", placeholder: t.addressPlaceholder })}
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium">
                {t.notes} <span className="font-normal text-muted">{t.optional}</span>
              </span>
              <input
                id="f-notes"
                value={buyer.notes}
                onChange={set("notes")}
                placeholder={t.notesPlaceholder}
                className="field"
              />
            </label>
          </fieldset>

          <fieldset>
            <legend className="label mb-4">{t.paymentLegend}</legend>
            <div className="grid gap-2">
              {(
                [
                  ...(payment
                    ? [{ id: "online", title: t.payOnline(payment.name), note: payment.methods }]
                    : []),
                  { id: "contraentrega", title: t.cod, note: t.codNote },
                  { id: "transferencia", title: t.transfer, note: t.transferNote },
                  { id: "confirmar", title: t.confirm, note: t.confirmNote },
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
              <p className="mt-3 text-[13px] text-burgundy">{t.testMode}</p>
            )}
          </fieldset>

          <div className="space-y-3">
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
                {t.consent.before}{" "}
                <Link href="/privacidad" target="_blank" className="underline underline-offset-4">
                  {t.consent.data}
                </Link>{" "}
                {t.consent.middle}{" "}
                <Link href="/envios" target="_blank" className="underline underline-offset-4">
                  {t.consent.policies}
                </Link>
                {t.consent.after}
              </span>
            </label>

            <label className="flex items-start gap-3 text-[13px] leading-relaxed">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
              />
              <span>{t.newsletterOptIn}</span>
            </label>
          </div>

          <div>
            <button type="submit" disabled={busy} className="btn-dark w-full">
              {busy ? (
                t.processing
              ) : method === "online" && payment ? (
                <>
                  {t.payButton(formatCOP(cart.total, lang), payment.name)} <Arrow />
                </>
              ) : method === "transferencia" ? (
                <>
                  {t.transferButton} <Arrow />
                </>
              ) : (
                <>
                  <WhatsApp className="h-4 w-4" /> {t.sendWhatsApp}
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
            <p className="label mb-2">{t.summary}</p>
            {summary}
          </div>
        </aside>
      </div>
    </div>
  );
}
