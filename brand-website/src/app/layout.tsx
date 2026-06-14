import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getCategories } from "@/lib/api";
import { CartProvider } from "@/components/cart/CartContext";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export const dynamic = "force-dynamic"

const oswald = Oswald({
  weight: ["300", "400", "500", "700"],
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://murren.com.co"),
  title: {
    default: "MURREN — Sitio Oficial | Streetwear Premium Bogotá",
    template: "%s | MURREN"
  },
  description: "MURREN no es ropa. Es una forma de existir. Descubre nuestra colección de streetwear de diseño independiente, chaquetas, camisetas y hoodies oversized en Bogotá, Colombia. Envíos nacionales.",
  keywords: ["streetwear colombia", "ropa urbana bogota", "diseño independiente colombia", "murren", "murren bogota", "moda urbana", "oversized hoodie colombia", "camisetas urbanas premium", "streetwear brand colombia"],
  authors: [{ name: "MURREN Team" }],
  creator: "MURREN",
  publisher: "MURREN",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://murren.com.co",
    title: "MURREN — Sitio Oficial | Streetwear Premium Bogotá",
    description: "MURREN no es ropa. Es una forma de existir. Descubre nuestra colección de streetwear de diseño independiente en Bogotá, Colombia.",
    siteName: "MURREN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MURREN — Streetwear Premium",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MURREN — Sitio Oficial | Streetwear Premium",
    description: "MURREN no es ropa. Es una forma de existir.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html
      lang="es"
      data-theme="noir"
      suppressHydrationWarning
      className={`${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Anti-FOUC: carga el tema guardado antes del primer paint */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('murren-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              "name": "MURREN",
              "image": "https://murren.com.co/og-image.png",
              "@id": "https://murren.com.co/#store",
              "url": "https://murren.com.co",
              "telephone": "+573017581950",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bogotá, Colombia",
                "addressLocality": "Bogotá",
                "addressRegion": "Cundinamarca",
                "postalCode": "110111",
                "addressCountry": "CO"
              },
              "sameAs": [
                "https://www.instagram.com/murren_co/",
                "https://www.tiktok.com/@murren_co",
                "https://co.pinterest.com/murren_co/"
              ]
            })
          }}
        />
        <CartProvider>
          <ConditionalLayout categories={categories}>
            {children}
          </ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}
