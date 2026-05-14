import { notFound } from "next/navigation"
import { getCollectionBySlug, getProducts, getCollections } from "@/lib/api"
import ColeccionDetalleView from "@/components/coleccion-detalle/ColeccionDetalleView"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const coleccion = await getCollectionBySlug(slug)
  
  if (!coleccion) {
    return { title: "Colección no encontrada" }
  }

  return {
    title: `${coleccion.nombre} | Colecciones Murren`,
    description: `Explora la colección ${coleccion.nombre} de la temporada ${coleccion.temporada}.`,
  }
}

// Opcional para Next.js App Router: Static Params (Phase 2.1)
export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((c) => ({
    slug: c.slug,
  }))
}

export default async function ColeccionPage({ params }: Props) {
  const { slug } = await params
  
  const coleccion = await getCollectionBySlug(slug)
  if (!coleccion) {
    notFound()
  }

  const productos = await getProducts({ coleccionSlug: slug })

  return (
    <main className="min-h-screen bg-white">
      <ColeccionDetalleView coleccion={coleccion} initialProducts={productos} />
    </main>
  )
}
