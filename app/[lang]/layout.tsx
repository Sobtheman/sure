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
import { SITE, absolute } from "@/lib/seo";
import { seoCopy } from "@/lib/copy/seo";
import { store } from "@/lib/config";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const meta = {
  es: { ogDescription: "Streetwear colombiano. Colección Disidencia: camiseta y hoodie, envíos a toda Colombia." },
  en: { ogDescription: "Streetwear from Colombia. The Disidencia collection: tee and hoodie, shipped across Colombia." },
};

// Datos de la marca para Google y asistentes de IA (una sola vez en cada página)
function brandJsonLd(lang: Lang) {
  const site = absolute("/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}#marca`,
        name: "SURE",
        alternateName: "Sure Wear Co",
        url: site,
        logo: absolute("/brand/sure-logo.svg"),
        description: seoCopy[lang].homeDescription,
        sameAs: [store.instagram, store.tiktok],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+57-320-426-2765",
          areaServed: "CO",
          availableLanguage: ["Spanish", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site}#sitio`,
        url: absolute(lang === "en" ? "/en" : "/"),
        name: "SURE",
        inLanguage: htmlLang[lang],
        publisher: { "@id": `${site}#marca` },
      },
    ],
  };
}

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Lang = isLang(params.lang) ? params.lang : "es";
  const m = pick(lang, meta);
  const s = seoCopy[lang];
  return {
    metadataBase: new URL(SITE),
    title: { default: s.homeTitle, template: "%s — SURE" },
    description: s.homeDescription,
    openGraph: {
      siteName: "SURE",
      title: s.homeTitle,
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
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandJsonLd(lang)) }} />
          <CartDrawer />
          {process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
        </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
