import { notFound } from "next/navigation"
import { getCategoryBySlug, getProducts, getCategories } from "@/lib/api"
import CategoriaDetalleView from "@/components/categoria-detalle/CategoriaDetalleView"

export const dynamic = "force-dynamic"


type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const categoria = await getCategoryBySlug(slug)
  
  if (!categoria) {
    return { title: "Categoría no encontrada" }
  }

  const title = `${categoria.nombre} | Categorías`;
  const description = `Explora nuestra selección completa de ${categoria.nombre.toLowerCase()} en MURREN. Streetwear de diseño independiente en Bogotá, Colombia.`;
  const url = `https://murren.com.co/categorias/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      images: [
        {
          url: categoria.imagen || "/og-image.png",
          width: 800,
          height: 1000,
          alt: categoria.nombre,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [categoria.imagen || "/og-image.png"],
    },
  }
}

// Opcional: Static Params
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((c) => ({
    slug: c.slug,
  }))
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params
  
  const categoria = await getCategoryBySlug(slug)
  if (!categoria) {
    notFound()
  }

  const productos = await getProducts({ categoriaSlug: slug })

  return (
    <main className="min-h-screen bg-white">
      <CategoriaDetalleView categoria={categoria} initialProducts={productos} />
    </main>
  )
}
