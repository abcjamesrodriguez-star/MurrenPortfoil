import { Collection, Category, Product, ColeccionProxima, ProductoDetalle } from '@/types'
import {
  getShopifyProducts,
  getShopifyProductsByCollection,
  getShopifyProductBySlug,
  getShopifyCollections,
} from './shopify'

// 1. Colecciones
export async function getCollections(): Promise<Collection[]> {
  const shopifyCols = await getShopifyCollections()
  if (shopifyCols.length > 0) {
    shopifyCols[0].estaActual = true
  }
  return shopifyCols
}

export function getColeccionActual(colecciones: Collection[]): Collection {
  return colecciones.find(c => c.estaActual) ?? colecciones[0];
}

export async function getColeccionProxima(): Promise<ColeccionProxima> {
  return {
    nombre: "SUMMER 2025",
    descripcion: "Mantente al tanto de lo que viene. Algo diferente está por llegar.",
    linkNotificar: "#notificar",
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const collections = await getCollections()
  return collections.find(c => c.slug === slug) || null
}

// 2. Categorías
export async function getCategories(): Promise<Category[]> {
  const shopifyProducts = await getShopifyProducts(100)
  const typeMap = new Map<string, { count: number, firstImage: string }>()
  
  shopifyProducts.forEach(p => {
    const t = p.categoria ? p.categoria.trim().toUpperCase() : 'GENERAL'
    if (!typeMap.has(t)) {
      typeMap.set(t, {
        count: 1,
        firstImage: p.imagen || '/images/placeholder.png'
      })
    } else {
      const data = typeMap.get(t)!
      data.count++
      typeMap.set(t, data)
    }
  })

  const categories: Category[] = []
  let idCounter = 1
  for (const [name, data] of typeMap.entries()) {
    categories.push({
      id: (idCounter++).toString(),
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      nombre: name.charAt(0) + name.slice(1).toLowerCase(),
      imagen: data.firstImage,
      totalProductos: data.count
    })
  }
  
  return categories.sort((a, b) => (b.totalProductos || 0) - (a.totalProductos || 0))
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories()
  return cats.find(c => c.slug === slug) || null
}

// 3. Productos
export async function getProducts(filters?: {
  coleccionSlug?: string
  categoriaSlug?: string
  limit?: number
}): Promise<Product[]> {
  let result: Product[] = []
  if (filters?.coleccionSlug) {
    result = await getShopifyProductsByCollection(filters.coleccionSlug, filters.limit)
  } else {
    result = await getShopifyProducts(filters?.limit || 50)
  }

  if (filters?.categoriaSlug) {
    result = result.filter(p => p.categoria.toLowerCase().replace(/\s+/g, '-') === filters.categoriaSlug)
  }

  return result
}

// 4. Producto Detalle
export async function getProductoDetalleBySlug(slug: string): Promise<ProductoDetalle | null> {
  const shopifyProduct = await getShopifyProductBySlug(slug)
  if (!shopifyProduct) {
    return null
  }
  return shopifyProduct
}

export async function getProductosRelacionados(slug: string, limit: number = 5): Promise<Product[]> {
  const all = await getShopifyProducts(limit + 5)
  const filtered = all.filter(p => p.slug !== slug)
  return filtered.sort(() => 0.5 - Math.random()).slice(0, limit)
}
