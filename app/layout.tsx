import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SURE — Dissidencia", template: "%s — SURE" },
  description: "SURE, streetwear colombiano. Colección Dissidencia: camiseta y hoodie, envíos a todo Colombia.",
  openGraph: {
    title: "SURE — Dissidencia",
    description: "Streetwear colombiano. Colección Dissidencia disponible ahora.",
    images: [{ url: "/img/hero/dissidencia.jpg", width: 1638, height: 1048 }],
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={archivo.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">
        <CartProvider>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
