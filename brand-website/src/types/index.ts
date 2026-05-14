export type ProductRaw = {
  id: number
  handle: string
  nombre: string
  marca: string
  tipo: string
  descripcion_html: string
  tags: string[]
  precio_base: string
  variantes: {
    id: number
    titulo: string
    talla: string
    color: string | null
    precio: string
    compare_at_price: string | null
    sku: string | null
    disponible: boolean
  }[]
  imagenes_url: string[]
  imagenes_local: string[]
}

export type Product = {
  id: string
  slug: string
  nombre: string
  precio: number
  imagen: string
  coleccion: string
  categoria: string
  tallas: string[]
  colores: string[]
  favorito?: boolean
}

export type ProductoDetalle = Product & {
  descripcion: string
  coleccionDetalle: { slug: string; nombre: string; temporada: string }
  imagenesGaleria: string[]
  coloresDetalle: { nombre: string; hex: string }[]
  tallasDetalle: { valor: string; disponible: boolean }[]
  materiales: string
  cuidados: string
  composicion: string
  imagenesDetalle: string[]
  imagenesVisto: string[]
}

export type Collection = {
  id: string
  slug: string
  nombre: string
  temporada: string
  numero: number
  tags: Array<"NUEVA" | "DESTACADA" | "SS24" | "FW23" | "BASIC">
  estaActual?: boolean
  imagen: string
}

export type FiltroColecciones = "TODAS" | "NUEVAS" | "DESTACADAS" | "SS24" | "FW23"

export type ColeccionProxima = {
  nombre: string
  descripcion: string
  linkNotificar: string
}

export type Category = {
  id: string
  slug: string
  nombre: string
  imagen: string
  totalProductos?: number
}

export type FiltroState = {
  categoria: string | null
  talla: string | null
  color: string | null
  orden: "precio-asc" | "precio-desc" | "nuevo" | null
}

export type FiltroCategoriaState = {
  talla: string | null
  color: string | null
  precioMin: number | null
  precioMax: number | null
  orden: "precio-asc" | "precio-desc" | "nuevo" | "relevancia" | null
}

export type NavItem = {
  label: string
  href: string
  dropdown?: { label: string; href: string }[]
}

export type NewsItem = {
  id: string | number
  tag: string
  title: string
  status: string
  image: string | { src: string } | any
}

export type ProductItem = {
  id: string | number
  name: string
  image: string | { src: string } | any
  season: string
  slug?: string
}

export type LocationItem = {
  id: string
  type: string
  addressLine1: string
  addressLine2?: string
  city: string
  hours?: string
}

export type FooterLinkGroup = {
  title: string
  links: { label: string; href: string }[]
}

export type SocialLink = {
  platform: string
  href: string
  icon?: string
}
