"use client";

import { useId, useRef, useState } from "react";
import Link from "@/components/Link";
import { useLang } from "@/components/LangProvider";
import { newsletterCopy } from "@/lib/copy/newsletter";

type State = "idle" | "sending" | "done" | "error" | "invalid";

// Lista de lanzamientos: correo + botón, con un campo trampa oculto para bots. Pensado para el pie oscuro.
export default function NewsletterForm() {
  const lang = useLang();
  const t = newsletterCopy[lang];
  const id = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254) {
      setState("invalid");
      inputRef.current?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, lang, website }),
      });
      const data: { ok?: boolean } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      setEmail("");
      setState("done");
    } catch {
      setState("error");
    }
  };

  const message = state === "done" ? t.done : state === "invalid" ? t.invalid : state === "error" ? t.error : "";
  const bad = state === "invalid" || state === "error";

  return (
    <form onSubmit={submit} noValidate className="relative w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        {t.emailLabel}
      </label>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle" && state !== "sending") setState("idle");
          }}
          placeholder={t.placeholder}
          aria-invalid={state === "invalid"}
          aria-describedby={`${id}-status ${id}-consent`}
          className={`field min-w-0 flex-1 bg-transparent text-paper placeholder:text-white/40 focus:border-paper ${
            state === "invalid" ? "border-burgundy-bright" : "border-white/25"
          }`}
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-ghost h-12 shrink-0 border-white/70 px-6 hover:bg-paper hover:text-ink disabled:opacity-60"
        >
          {state === "sending" ? t.sending : t.submit}
        </button>
      </div>
      {/* Trampa para bots: las personas no lo ven ni llegan a él con el teclado */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label>
          {t.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>
      <p id={`${id}-status`} aria-live="polite" className={`mt-3 min-h-[20px] text-[13px] ${bad ? "text-burgundy-bright" : "text-paper"}`}>
        {message}
      </p>
      <p id={`${id}-consent`} className="mt-1 text-[12px] leading-relaxed text-white/45">
        {t.consent}{" "}
        <Link href="/privacidad" className="underline underline-offset-4 hover:text-white/80">
          {t.privacy}
        </Link>
      </p>
    </form>
  );
}
