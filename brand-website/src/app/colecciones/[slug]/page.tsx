import { notFound } from "next/navigation"
import { getCollectionBySlug, getProducts, getCollections } from "@/lib/api"
import ColeccionDetalleView from "@/components/coleccion-detalle/ColeccionDetalleView"

export const dynamic = "force-dynamic"


type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const coleccion = await getCollectionBySlug(slug)
  
  if (!coleccion) {
    return { title: "Colección no encontrada" }
  }

  const title = `${coleccion.nombre} | Colecciones`;
  const description = `Explora la colección ${coleccion.nombre} (${coleccion.temporada}) en MURREN. Streetwear premium exclusivo de edición limitada, diseñado en Bogotá, Colombia.`;
  const url = `https://murren.com.co/colecciones/${slug}`;

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
          url: coleccion.imagen || "/og-image.png",
          width: 1200,
          height: 630,
          alt: coleccion.nombre,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coleccion.imagen || "/og-image.png"],
    },
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
