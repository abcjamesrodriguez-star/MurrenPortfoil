import { Collection, Category, Product, ProductRaw } from '@/types'
import productosJson from './productos.json'
import {
  getShopifyProducts,
  getShopifyProductsByCollection,
  getShopifyProductBySlug,
  getShopifyCollections,
} from './shopify'

const rawData = productosJson as ProductRaw[]

// Helper para saber si Shopify está configurado con las variables de entorno
const isShopifyConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  )
}

// Helper para retraso simulado
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Convertir de ProductRaw a Product (usado en el fallback local)
function mapProduct(p: ProductRaw): Product {
  const isJacket = p.tipo.toLowerCase().includes('chaqueta') || p.tipo.toLowerCase().includes('denim')
  let categoryName = p.tipo
  if (p.tipo.toLowerCase().includes('chaqueta jean')) categoryName = 'chaquetas jean'
  else if (p.tipo.toLowerCase().includes('chaqueta cuerina')) categoryName = 'cuerinas'
  else if (p.tipo.toLowerCase().includes('chaqueta hombre')) categoryName = 'chaquetas hombre'
  else if (p.tipo.toLowerCase().includes('chaleco')) categoryName = 'chalecos'
  else if (p.tipo.toLowerCase().includes('falda')) categoryName = 'faldas'
  else if (p.tipo.toLowerCase().includes('bolso')) categoryName = 'bolsos'
  else if (p.tipo.toLowerCase().includes('body')) categoryName = 'bodies'

  const firstImage = p.imagenes_local[0] ? p.imagenes_local[0].replace('imagenes/', '/images/products/') : '/images/placeholder.jpg'

  // Asignar colecciones mock (solo para simular)
  const isDestacada = ['espora', 'medusa', 'susie', 'kill-bill', 'static'].includes(p.handle)
  const isFW23 = p.tipo.toLowerCase().includes('cuerina')
  let coleccionSlug = 'essentials'
  if (isDestacada) coleccionSlug = 'murren'
  else if (isFW23) coleccionSlug = 'chrome-series'
  else if (isJacket) coleccionSlug = 'denim-core'
  else if (p.handle.includes('falda')) coleccionSlug = 'nebula-drop'
  else if (p.handle.includes('bolso')) coleccionSlug = 'midnight-club'

  return {
    id: p.id.toString(),
    slug: p.handle,
    nombre: p.nombre,
    precio: parseFloat(p.precio_base),
    imagen: firstImage,
    coleccion: coleccionSlug,
    categoria: p.tipo,
    tallas: Array.from(new Set(p.variantes.filter(v => v.talla).map(v => v.talla))),
    colores: [],
  }
}

// 1. Colecciones
import { ColeccionProxima } from '@/types'

export async function getCollections(): Promise<Collection[]> {
  if (isShopifyConfigured()) {
    try {
      const shopifyCols = await getShopifyCollections()
      if (shopifyCols.length > 0) {
        shopifyCols[0].estaActual = true
        return shopifyCols
      }
    } catch (e) {
      console.warn('Error cargando colecciones de Shopify, usando fallback local:', e)
    }
  }

  await delay(500)
  return [
    { id: '1', numero: 1, slug: 'murren', nombre: 'MURREN', temporada: 'SS24', tags: ['SS24', 'DESTACADA'], estaActual: true, imagen: '/images/products/espora/1.jpg' },
    { id: '2', numero: 2, slug: 'nebula-drop', nombre: 'NEBULA DROP', temporada: 'SS24', tags: ['SS24', 'NUEVA'], imagen: '/images/products/falda-larga-cargo-denim/1.jpg' },
    { id: '3', numero: 3, slug: 'chrome-series', nombre: 'CHROME SERIES', temporada: 'FW23', tags: ['FW23', 'DESTACADA'], imagen: '/images/products/cuerina-raya/1.jpg' },
    { id: '4', numero: 4, slug: 'denim-core', nombre: 'DENIM CORE', temporada: 'SS24', tags: ['SS24'], imagen: '/images/products/chaqueta-over/1.jpg' },
    { id: '5', numero: 5, slug: 'midnight-club', nombre: 'MIDNIGHT CLUB', temporada: 'FW23', tags: ['FW23', 'NUEVA'], imagen: '/images/products/bolso-calavera-grande/1.jpg' },
    { id: '6', numero: 6, slug: 'essentials', nombre: 'ESSENTIALS', temporada: 'BASIC', tags: [], imagen: '/images/products/classic-negra/1.jpg' }
  ]
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
  if (isShopifyConfigured()) {
    try {
      const shopifyProducts = await getShopifyProducts(100)
      const typeMap = new Map<string, { count: number, firstImage: string }>()
      
      shopifyProducts.forEach(p => {
        const t = p.categoria ? p.categoria.trim().toUpperCase() : 'GENERAL'
        if (!typeMap.has(t)) {
          typeMap.set(t, {
            count: 1,
            firstImage: p.imagen || '/images/placeholder.jpg'
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
          nombre: name.charAt(0) + name.slice(1).toLowerCase(), // Nombre con capitalización limpia (ej: Faldas)
          imagen: data.firstImage,
          totalProductos: data.count
        })
      }
      
      return categories.sort((a, b) => (b.totalProductos || 0) - (a.totalProductos || 0))
    } catch (e) {
      console.warn('Error cargando categorías de Shopify, usando fallback local:', e)
    }
  }

  await delay(500)
  
  const typeMap = new Map<string, { count: number, firstImage: string }>()
  
  rawData.forEach(p => {
    const t = p.tipo.toUpperCase()
    if (!typeMap.has(t)) {
      typeMap.set(t, {
        count: 1,
        firstImage: p.imagenes_local[0] ? p.imagenes_local[0].replace('imagenes/', '/images/products/') : '/images/placeholder.jpg'
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
      nombre: name,
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
  if (isShopifyConfigured()) {
    try {
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
    } catch (e) {
      console.warn('Error cargando productos de Shopify, usando fallback local:', e)
    }
  } else {
    // Solo loguear en el servidor para evitar spam
    if (typeof window === 'undefined') {
      console.info('Aviso: Shopify no está configurado. Usando base de datos local (productos.json).')
    }
  }

  await delay(500)
  
  let result = rawData.map(mapProduct)
  
  if (filters?.coleccionSlug) {
    result = result.filter(p => p.coleccion === filters.coleccionSlug)
  }
  if (filters?.categoriaSlug) {
    result = result.filter(p => p.categoria.toLowerCase().replace(/\s+/g, '-') === filters.categoriaSlug)
  }
  if (filters?.limit) {
    result = result.slice(0, filters.limit)
  }
  
  return result
}

// 4. Producto Detalle
import { ProductoDetalle } from '@/types'

export async function getProductoDetalleBySlug(slug: string): Promise<ProductoDetalle | null> {
  if (isShopifyConfigured()) {
    try {
      const shopifyProduct = await getShopifyProductBySlug(slug)
      if (shopifyProduct) {
        return shopifyProduct
      }
    } catch (e) {
      console.warn(`Error cargando detalle de producto '${slug}' de Shopify, usando fallback local:`, e)
    }
  }

  await delay(500)
  
  const raw = rawData.find(p => p.handle === slug)
  if (!raw) return null

  const baseProduct = mapProduct(raw)
  const colecciones = await getCollections()
  const coleccionInfo = colecciones.find(c => c.slug === baseProduct.coleccion) || colecciones[0]

  const numImagenes = Math.max(6, raw.imagenes_local.length)
  const imagenesGaleria = Array.from({ length: numImagenes }).map((_, i) => {
    return raw.imagenes_local[i % raw.imagenes_local.length]?.replace('imagenes/', '/images/products/') || baseProduct.imagen
  })

  const tallasDetalle = baseProduct.tallas.map(t => ({
    valor: t,
    disponible: Math.random() > 0.2
  }))
  if (tallasDetalle.length === 0) {
    tallasDetalle.push({ valor: 'Única', disponible: true })
  }

  const materiales = "100% Algodón Premium. Detalles en herrajes metálicos inoxidables."
  const cuidados = "Lavar a máquina en ciclo delicado con agua fría. No usar blanqueador. Secar a la sombra. No planchar sobre el estampado."
  const composicion = "Exterior: 100% Algodón. Forro: 100% Poliéster."

  return {
    ...baseProduct,
    descripcion: raw.descripcion_html || "Pieza exclusiva diseñada con los más altos estándares de calidad y diseño vanguardista.",
    coleccionDetalle: {
      slug: coleccionInfo.slug,
      nombre: coleccionInfo.nombre,
      temporada: coleccionInfo.temporada
    },
    imagenesGaleria,
    coloresDetalle: [{ nombre: 'Chrome Black', hex: '#000000' }, { nombre: 'Silver', hex: '#C0C0C0' }],
    tallasDetalle,
    materiales,
    cuidados,
    composicion,
    imagenesDetalle: [baseProduct.imagen, baseProduct.imagen, baseProduct.imagen, baseProduct.imagen, baseProduct.imagen],
    imagenesVisto: [baseProduct.imagen, baseProduct.imagen, baseProduct.imagen]
  }
}

export async function getProductosRelacionados(slug: string, limit: number = 5): Promise<Product[]> {
  if (isShopifyConfigured()) {
    try {
      const all = await getShopifyProducts(limit + 5)
      const filtered = all.filter(p => p.slug !== slug)
      return filtered.sort(() => 0.5 - Math.random()).slice(0, limit)
    } catch (e) {
      console.warn('Error cargando productos relacionados de Shopify, usando fallback local:', e)
    }
  }

  await delay(300)
  const all = await getProducts()
  const filtered = all.filter(p => p.slug !== slug)
  return filtered.sort(() => 0.5 - Math.random()).slice(0, limit)
}

