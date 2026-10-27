import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ScrollTop from "@/components/ScrollTop";
import { Analytics } from "@vercel/analytics/react";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SURE — Disidencia", template: "%s — SURE" },
  description: "SURE, streetwear colombiano. Colección Disidencia: camiseta y hoodie. Envío gratis desde $100.000 y pago contra entrega en toda Colombia.",
  openGraph: {
    title: "SURE — Disidencia",
    description: "Streetwear colombiano. Colección Disidencia: camiseta y hoodie, envíos a toda Colombia.",
    images: [{ url: "/img/hero/film-poster.jpg", width: 1920, height: 1080 }],
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
          <ScrollTop />
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <CartDrawer />
          {process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
        </CartProvider>
      </body>
    </html>
  );
}
