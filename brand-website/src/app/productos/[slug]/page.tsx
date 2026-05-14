import { notFound } from "next/navigation"
import { getProductoDetalleBySlug, getProductosRelacionados, getProducts } from "@/lib/api"
import ProductoDetalleView from "@/components/producto-detalle/ProductoDetalleView"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const producto = await getProductoDetalleBySlug(slug)
  
  if (!producto) {
    return { title: "Producto no encontrado" }
  }

  return {
    title: `${producto.nombre} — ${producto.coleccionDetalle.nombre}`,
    description: producto.descripcion,
  }
}

// Opcional: Static Params
export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({
    slug: p.slug,
  }))
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params
  
  const producto = await getProductoDetalleBySlug(slug)
  if (!producto) {
    notFound()
  }

  const relacionados = await getProductosRelacionados(slug, 5)

  return (
    <main className="min-h-screen bg-white">
      <ProductoDetalleView producto={producto} relacionados={relacionados} />
    </main>
  )
}
