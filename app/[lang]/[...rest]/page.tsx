import { notFound } from "next/navigation";

// Cualquier ruta que no existe muestra la página 404 del idioma
export default function CatchAll() {
  notFound();
}
