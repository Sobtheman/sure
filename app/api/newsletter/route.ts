import { NextResponse } from "next/server";
import { cleanEmail, subscribe } from "@/lib/newsletter";
import { isLang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

// Lista de lanzamientos: guarda el correo como contacto en Resend (lib/newsletter.ts).
// Body: { email, lang, website }. "website" es una trampa para bots: si llega con algo, se responde ok y no se hace nada.
export async function POST(req: Request) {
  let body: { email?: unknown; lang?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  if (body.website != null && String(body.website).trim() !== "") return NextResponse.json({ ok: true });

  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: "Revisa el correo." }, { status: 400 });
  const lang = typeof body.lang === "string" && isLang(body.lang) ? body.lang : "es";

  try {
    const result = await subscribe(email);
    if (result.saved) return NextResponse.json({ ok: true, saved: true });
    console.error(`Newsletter: correo no guardado (${lang}):`, result.reason);
    // Sin variables configuradas no es un error para quien se suscribe
    if (!result.configured) return NextResponse.json({ ok: true, saved: false });
    return NextResponse.json({ error: "No pudimos guardar el correo." }, { status: 502 });
  } catch (err) {
    console.error(`Newsletter: correo no guardado (${lang}):`, err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "No pudimos guardar el correo." }, { status: 502 });
  }
}
