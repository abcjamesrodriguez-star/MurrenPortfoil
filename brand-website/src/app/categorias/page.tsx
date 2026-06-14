import { Metadata } from "next"
import { getCategories } from "@/lib/api"
import CategoriasHero from "@/components/categorias/CategoriasHero"
import CategoriasGrid from "@/components/categorias/CategoriasGrid"

export const dynamic = "force-dynamic"


export const metadata: Metadata = {
  title: "Categorías",
  description: "Descubre nuestra variedad de productos clasificados por categorías: hoodies, camisetas oversized, chaquetas y accesorios de streetwear en Bogotá, Colombia.",
  alternates: {
    canonical: "https://murren.com.co/categorias"
  },
  openGraph: {
    type: "website",
    url: "https://murren.com.co/categorias",
    title: "Categorías — MURREN",
    description: "Descubre nuestra variedad de productos clasificados por categorías: hoodies, camisetas oversized, chaquetas y accesorios de streetwear.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Categorías de Ropa MURREN",
      }
    ]
  }
}

export default async function CategoriasPage() {
  const categorias = await getCategories()

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <CategoriasHero />
        <CategoriasGrid categorias={categorias} />
      </div>
    </main>
  )
}
