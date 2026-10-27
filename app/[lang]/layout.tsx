import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/components/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ScrollTop from "@/components/ScrollTop";
import { LangProvider } from "@/components/LangProvider";
import { htmlLang, isLang, LANGS, ogLocale, pick, type Lang } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/react";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Dominio para enlaces absolutos (Open Graph). En Vercel, sin variable, usa el dominio de producción del proyecto.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const meta = {
  es: {
    title: "SURE — Disidencia",
    description: "SURE, streetwear colombiano. Colección Disidencia: camiseta y hoodie. Envío gratis siempre y pago contra entrega en toda Colombia.",
    ogDescription: "Streetwear colombiano. Colección Disidencia: camiseta y hoodie, envíos a toda Colombia.",
  },
  en: {
    title: "SURE — Disidencia",
    description: "SURE, streetwear from Colombia. The Disidencia collection: tee and hoodie. Free shipping, always, and cash on delivery across Colombia.",
    ogDescription: "Streetwear from Colombia. The Disidencia collection: tee and hoodie, shipped across Colombia.",
  },
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Lang = isLang(params.lang) ? params.lang : "es";
  const m = pick(lang, meta);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: m.title, template: "%s — SURE" },
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      images: [{ url: "/img/hero/film-poster.jpg", width: 1920, height: 1080 }],
      locale: ogLocale[lang],
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d0e10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  const lang: Lang = isLang(params.lang) ? params.lang : "es";
  return (
    <html lang={htmlLang[lang]} className={archivo.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">
        <LangProvider lang={lang}>
        <CartProvider>
          <ScrollTop />
          <Header />
          <main id="contenido">{children}</main>
          <Footer lang={lang} />
          <CartDrawer />
          {process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
        </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
