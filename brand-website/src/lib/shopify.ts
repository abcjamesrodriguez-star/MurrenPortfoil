import { Product, ProductoDetalle, Collection } from '@/types'

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const API_VERSION = '2024-07'

// Helper para color hexadecimal básico para la UI
function getHexColor(colorName: string): string {
  const colors: Record<string, string> = {
    negro: '#000000',
    black: '#000000',
    blanco: '#FFFFFF',
    white: '#FFFFFF',
    rojo: '#E11D48',
    red: '#E11D48',
    azul: '#2563EB',
    blue: '#2563EB',
    gris: '#4B5563',
    gray: '#4B5563',
    silver: '#C0C0C0',
    plata: '#C0C0C0',
    rosa: '#EC4899',
    pink: '#EC4899',
    beige: '#F5F5DC',
    denim: '#4F46E5',
  }
  return colors[colorName.trim().toLowerCase()] || '#71717A'
}

// Cliente GraphQL genérico para Shopify
async function shopifyFetch<T>(query: string, variables = {}): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error('500: Credenciales de Shopify no configuradas en las variables de entorno. Por favor, agregue NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN y NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN a su archivo .env.local')
  }

  const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`
  const isMutation = query.trim().startsWith('mutation')

  try {
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }

    if (isMutation) {
      fetchOptions.cache = 'no-store'
    } else {
      (fetchOptions as any).next = { revalidate: 60 }
    }

    const res = await fetch(endpoint, fetchOptions)

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        throw new Error(`403: El Storefront Access Token es inválido o no tiene permisos. HTTP Status: ${res.status}`)
      }
      const errorText = await res.text()
      throw new Error(`${res.status}: Error de la API de Shopify: ${errorText}`)
    }

    const json = await res.json()

    if (json.errors) {
      const isAuthError = json.errors.some((err: any) => 
        err.message?.toLowerCase().includes('access denied') || 
        err.message?.toLowerCase().includes('unauthorized') ||
        err.message?.toLowerCase().includes('forbidden')
      )
      if (isAuthError) {
        throw new Error('403: Acceso denegado por Shopify. El Token de Acceso de Storefront no tiene permisos suficientes o es incorrecto.')
      }
      throw new Error(`500: Errores en la consulta GraphQL: ${json.errors.map((e: any) => e.message).join(', ')}`)
    }

    return json.data as T
  } catch (error: any) {
    console.error('Error fetching from Shopify:', error)
    if (error.message && /^\d{3}:/.test(error.message)) {
      throw error
    }
    throw new Error(`500: Error de conexión con Shopify: ${error.message || error}`)
  }
}

// Asignador dinámico de tags de colección para la UI
function getCollectionTags(handle: string): Array<"NUEVA" | "DESTACADA" | "SS24" | "FW23" | "BASIC"> {
  const mapping: Record<string, Array<"NUEVA" | "DESTACADA" | "SS24" | "FW23" | "BASIC">> = {
    'chaquetas': ['SS24'],
    'bolsos': ['BASIC'],
    'faldas-largas': ['SS24'],
    'falda-corta': ['FW23'],
    'vestidos': ['SS24', 'NUEVA'],
    'chaquetas-largas': ['FW23'],
    'cinturones': ['BASIC'],
    'tops-bodys': ['SS24', 'DESTACADA'],
    'chaquetas-cuerina': ['FW23', 'DESTACADA'],
    'chalecos-denim': ['SS24', 'NUEVA'],
    'murren': ['SS24', 'DESTACADA'],
    'nebula-drop': ['SS24', 'NUEVA'],
    'chrome-series': ['FW23', 'DESTACADA'],
    'denim-core': ['SS24'],
    'midnight-club': ['FW23', 'NUEVA'],
    'essentials': ['BASIC']
  }

  if (mapping[handle]) {
    return mapping[handle]
  }

  const tags: Array<"NUEVA" | "DESTACADA" | "SS24" | "FW23" | "BASIC"> = []
  const lower = handle.toLowerCase()
  if (lower.includes('nueva') || lower.includes('new') || lower.includes('drop')) {
    tags.push('NUEVA')
  }
  if (lower.includes('destacada') || lower.includes('featured') || lower.includes('best') || lower.includes('murren')) {
    tags.push('DESTACADA')
  }
  if (lower.includes('ss24') || lower.includes('spring') || lower.includes('summer')) {
    tags.push('SS24')
  }
  if (lower.includes('fw23') || lower.includes('winter') || lower.includes('fall') || lower.includes('chrome')) {
    tags.push('FW23')
  }

  if (tags.length === 0) {
    tags.push('BASIC')
  }

  return tags
}

// Mapeadores de Shopify a tipos locales
function mapShopifyProduct(node: any): Product {
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0')
  const imagen = node.images?.edges?.[0]?.node?.url || '/images/placeholder.png'

  const tallas: string[] = []
  const colores: string[] = []

  node.options?.forEach((opt: any) => {
    const name = opt.name.toLowerCase()
    if (name.includes('talla') || name.includes('size')) {
      tallas.push(...opt.values)
    } else if (name.includes('color') || name.includes('colour')) {
      colores.push(...opt.values)
    }
  })

  // 1. Obtener la colección real de Shopify, IGNORANDO 'ver-todo', 'all' y 'frontpage'
  // La colección 'ver-todo' es una colección comodín y no debe usarse para clasificar
  const EXCLUDED_COLLECTIONS = ['all', 'frontpage', 'ver-todo', 'ver todo']
  const collectionEdges = node.collections?.edges || []
  let coleccion = ''

  if (collectionEdges.length > 0) {
    // Buscar la primera colección que NO sea una colección de sistema/comodín
    const validCollection = collectionEdges.find((e: any) =>
      !EXCLUDED_COLLECTIONS.includes(e.node.handle.toLowerCase())
    )
    if (validCollection) {
      // Usar el handle real de Shopify directamente
      coleccion = validCollection.node.handle
    }
  }

  // 2. Solo si no hay ninguna colección real asignada, clasificar por palabras clave del productType/title
  if (!coleccion) {
    const type = (node.productType || '').toLowerCase()
    const title = (node.title || '').toLowerCase()
    const handle = (node.handle || '').toLowerCase()

    const isChaleco = type.includes('chaleco')
    const isCuerina = type.includes('cuerina') || title.includes('cuerina') || handle.includes('cuerina')
    const isFaldaLarga = type.includes('falda') && (type.includes('larga') || title.includes('larga') || handle.includes('larga'))
    const isFaldaCorta = type.includes('falda')
    const isBolso = type.includes('bolso') || title.includes('bolso') || handle.includes('bolso')
    const isVestido = type.includes('vestido') || title.includes('vestido') || handle.includes('vestido')
    const isChaquetaLarga = type.includes('chaqueta') && (type.includes('hombre') || type.includes('estampada'))
    const isChaqueta = type.includes('chaqueta') || type.includes('denim')

    if (isChaleco) {
      coleccion = 'chalecos-denim'
    } else if (isCuerina) {
      coleccion = 'chaquetas'
    } else if (isFaldaLarga) {
      coleccion = 'faldas-largas'
    } else if (isFaldaCorta) {
      coleccion = 'falda-corta'
    } else if (isBolso) {
      coleccion = 'bolsos'
    } else if (isVestido) {
      coleccion = 'vestidos'
    } else if (isChaquetaLarga) {
      coleccion = 'chaquetas-largas'
    } else if (isChaqueta) {
      coleccion = 'chaquetas'
    } else {
      coleccion = 'chaquetas'
    }
  }

  return {
    id: node.id,
    slug: node.handle,
    nombre: node.title,
    precio: price,
    imagen: imagen,
    coleccion: coleccion,
    categoria: node.productType || 'General',
    tallas: tallas.length > 0 ? tallas : ['Única'],
    colores: colores,
  }
}

function mapShopifyProductDetail(node: any): ProductoDetalle {
  const baseProduct = mapShopifyProduct(node)
  const imagenesGaleria = node.images?.edges?.map((e: any) => e.node.url) || [baseProduct.imagen]

  // Extraer tallas con stock real
  const tallasDetalle = node.variants?.edges?.map((e: any) => {
    const variant = e.node
    const tallaOpt = variant.selectedOptions.find((opt: any) =>
      opt.name.toLowerCase().includes('talla') || opt.name.toLowerCase().includes('size')
    )
    return {
      valor: tallaOpt ? tallaOpt.value : 'Única',
      disponible: variant.availableForSale ?? true,
    }
  }).filter((v: any, index: number, self: any[]) =>
    self.findIndex((t) => t.valor === v.valor) === index
  ) || [{ valor: 'Única', disponible: true }]

  // Extraer colores
  const coloresDetalle = node.variants?.edges?.map((e: any) => {
    const variant = e.node
    const colorOpt = variant.selectedOptions.find((opt: any) =>
      opt.name.toLowerCase().includes('color')
    )
    return colorOpt ? { nombre: colorOpt.value, hex: getHexColor(colorOpt.value) } : null
  }).filter(Boolean).filter((v: any, index: number, self: any[]) =>
    self.findIndex((t) => t.nombre === v.nombre) === index
  ) || []

  // Extraer variantes físicas para el carrito
  const variantes = node.variants?.edges?.map((e: any) => {
    const variant = e.node
    const tallaOpt = variant.selectedOptions.find((opt: any) =>
      opt.name.toLowerCase().includes('talla') || opt.name.toLowerCase().includes('size')
    )
    const colorOpt = variant.selectedOptions.find((opt: any) =>
      opt.name.toLowerCase().includes('color')
    )
    return {
      id: variant.id,
      talla: tallaOpt ? tallaOpt.value : 'Única',
      color: colorOpt ? colorOpt.value : 'Chrome Black',
      disponible: variant.availableForSale ?? true,
    }
  }) || []

  // Mapeo dinámico a partir de tags o por defecto
  const materiales = node.tags?.find((t: string) => t.startsWith('material:'))?.replace('material:', '') ||
    '100% Algodón Premium. Detalles en herrajes metálicos inoxidables.'
  const cuidados = node.tags?.find((t: string) => t.startsWith('cuidados:'))?.replace('cuidados:', '') ||
    'Lavar a máquina en ciclo delicado con agua fría. No usar blanqueador. Secar a la sombra.'
  const composicion = node.tags?.find((t: string) => t.startsWith('composicion:'))?.replace('composicion:', '') ||
    'Exterior: 100% Algodón. Forro: 100% Poliéster.'

  const coleccionInfo = node.collections?.edges?.find((e: any) =>
    e.node.handle !== 'all' && e.node.handle !== 'frontpage'
  )?.node || node.collections?.edges?.[0]?.node || { handle: 'essentials', title: 'Essentials' }

  return {
    ...baseProduct,
    descripcion: node.descriptionHtml || node.description || 'Pieza exclusiva de Murren.',
    coleccionDetalle: {
      slug: coleccionInfo.handle,
      nombre: coleccionInfo.title,
      temporada: coleccionInfo.handle.includes('fw') ? 'FW23' : 'SS24',
    },
    imagenesGaleria,
    coloresDetalle: coloresDetalle.length > 0 ? coloresDetalle : [{ nombre: 'Chrome Black', hex: '#000000' }],
    tallasDetalle: tallasDetalle.length > 0 ? tallasDetalle : [{ valor: 'Única', disponible: true }],
    materiales,
    cuidados,
    composicion,
    imagenesDetalle: imagenesGaleria.slice(0, 5),
    imagenesVisto: imagenesGaleria.slice(0, 3),
    variantes,
  }
}

// 1. Obtener todos los productos (con límites opcionales)
export async function getShopifyProducts(limit = 50): Promise<Product[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            options {
              name
              values
            }
            collections(first: 5) {
              edges {
                node {
                  handle
                  title
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(query, { first: limit })
  return data.products.edges.map((edge) => mapShopifyProduct(edge.node))
}

// 2. Obtener productos de una colección específica
export async function getShopifyProductsByCollection(collectionSlug: string, limit = 50): Promise<Product[]> {
  const query = `
    query GetCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              productType
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                  }
                }
              }
              options {
                name
                values
              }
              collections(first: 5) {
                edges {
                  node {
                    handle
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch<{ collection: { products: { edges: { node: any }[] } } } | null>(query, {
    handle: collectionSlug,
    first: limit,
  })

  if (!data?.collection) return []
  return data.collection.products.edges.map((edge) => mapShopifyProduct(edge.node))
}

// 3. Obtener detalle de un producto por handle (slug)
export async function getShopifyProductBySlug(slug: string): Promise<ProductoDetalle | null> {
  const query = `
    query GetProductDetail($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        descriptionHtml
        description
        productType
        tags
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10) {
          edges {
            node {
              url
            }
          }
        }
        options {
          name
          values
        }
        collections(first: 5) {
          edges {
            node {
              handle
              title
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch<{ product: any } | null>(query, { handle: slug })
  if (!data?.product) return null
  return mapShopifyProductDetail(data.product)
}

// 4. Obtener colecciones activas en Shopify
export async function getShopifyCollections(limit = 30): Promise<Collection[]> {
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch<{ collections: { edges: { node: any }[] } }>(query, { first: limit })
  
  // Filtrar colecciones automáticas como 'all' o 'frontpage' y colecciones de sistema como 'ver-todo'
  const filteredEdges = data.collections.edges.filter(edge => 
    edge.node.handle !== 'all' && 
    edge.node.handle !== 'frontpage' && 
    edge.node.handle !== 'ver-todo' && 
    edge.node.title.toLowerCase() !== 'ver todo'
  )


  return filteredEdges.map((edge, index) => {
    const node = edge.node
    return {
      id: node.id,
      slug: node.handle,
      nombre: node.title,
      temporada: node.handle.includes('fw') ? 'FW23' : 'SS24',
      numero: index + 1,
      tags: getCollectionTags(node.handle),
      imagen: node.image?.url || '/images/placeholder.png',
    }
  })
}

// 5. Crear checkout mediante la API de Carrito de Shopify (cartCreate)
export async function createShopifyCart(
  lines: { variantId: string; quantity: number }[]
): Promise<{ id: string; checkoutUrl: string } | null> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      lines: lines.map((line) => ({
        merchandiseId: line.variantId,
        quantity: line.quantity,
      })),
    },
  }

  const data = await shopifyFetch<{ cartCreate: { cart: any; userErrors: any[] } } | null>(query, variables)
  
  if (!data?.cartCreate) return null

  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    const errors = data.cartCreate.userErrors.map(e => e.message).join(', ')
    throw new Error(`Shopify Cart Error: ${errors}`)
  }

  return {
    id: data.cartCreate.cart.id,
    checkoutUrl: data.cartCreate.cart.checkoutUrl,
  }
}

