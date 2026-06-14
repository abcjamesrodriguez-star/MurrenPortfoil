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

  const title = `${producto.nombre} — ${producto.coleccionDetalle.nombre}`;
  const description = producto.descripcion || `Compra ${producto.nombre} de la colección ${producto.coleccionDetalle.nombre} en MURREN. Ropa streetwear premium de diseño independiente en Bogotá, Colombia.`;
  const url = `https://murren.com.co/productos/${slug}`;

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
      siteName: "MURREN",
      images: [
        {
          url: producto.imagen || "/og-image.png",
          width: 800,
          height: 1000,
          alt: producto.nombre,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [producto.imagen || "/og-image.png"],
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": producto.nombre,
    "image": producto.imagen,
    "description": producto.descripcion,
    "category": producto.categoria,
    "offers": {
      "@type": "Offer",
      "url": `https://murren.com.co/productos/${slug}`,
      "priceCurrency": "COP",
      "price": producto.precio,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "MURREN"
      }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductoDetalleView producto={producto} relacionados={relacionados} />
    </main>
  )
}
