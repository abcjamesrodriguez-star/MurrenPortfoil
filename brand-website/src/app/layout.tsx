import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const oswald = Oswald({
  weight: ["300", "400", "500", "700"],
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MURREN — Brand Website",
  description: "MURREN no es ropa. Es una forma de existir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="industrial"
      suppressHydrationWarning
      className={`${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Anti-FOUC: carga el tema guardado antes del primer paint */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('murren-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`}
        </Script>
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
