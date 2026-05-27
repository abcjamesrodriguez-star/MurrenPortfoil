import { getCategories } from "@/lib/api"
import CategoriasHero from "@/components/categorias/CategoriasHero"
import CategoriasGrid from "@/components/categorias/CategoriasGrid"

export const dynamic = "force-dynamic"


export const metadata = {
  title: "Categorías | Murren",
  description: "Explora nuestras categorías de productos.",
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
