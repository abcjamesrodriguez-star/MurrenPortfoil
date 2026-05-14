"use client"

import { useState, useMemo } from "react"
import { Collection, Product, FiltroState, FiltroCategoriaState } from "@/types"
import ColeccionHeroV2 from "./ColeccionHeroV2"
import ColeccionCampana from "./ColeccionCampana"
import ColeccionFeatures from "./ColeccionFeatures"
import ProductosGrid from "./ProductosGrid"
import { FiltroBar, OrdenarPor, CargarMasBtn } from "@/components/ui"

type ColeccionDetalleViewProps = {
  coleccion: Collection
  initialProducts: Product[]
}

const ITEMS_PER_PAGE = 8

export default function ColeccionDetalleView({ coleccion, initialProducts }: ColeccionDetalleViewProps) {
  // Extraer categorías únicas
  const categoriasUnicas = useMemo(() => {
    const cats = Array.from(new Set(initialProducts.map((p) => p.categoria)))
    return cats.map((cat, idx) => ({
      id: cat || "otros",
      nombre: cat || "OTROS",
    }))
  }, [initialProducts])

  // Estado para la categoría activa del Hero ("" significa VER TODO)
  const [categoriaActiva, setCategoriaActiva] = useState<string>("")

  const [filtros, setFiltros] = useState<FiltroCategoriaState>({
    talla: null,
    color: null,
    precioMin: null,
    precioMax: null,
    orden: "relevancia" as const,
  })
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const tallasUnicas = useMemo(() => {
    const tallas = new Set<string>()
    initialProducts.forEach((p) => p.tallas.forEach((t) => tallas.add(t)))
    return Array.from(tallas).sort()
  }, [initialProducts])

  // Añadimos "CATEGORÍA" de vuelta a las opciones del FiltroBar
  const filterOptions = [
    { key: "categoria", label: "CATEGORÍA", opciones: categoriasUnicas.map(c => c.nombre) },
    { key: "talla", label: "TALLA", opciones: tallasUnicas },
    { key: "color", label: "COLOR", opciones: ["Negro", "Gris", "Blanco"] },
  ]

  const handleFiltroChange = (key: string, valor: string | null) => {
    if (key === "categoria") {
      const found = categoriasUnicas.find(c => c.nombre === valor)
      setCategoriaActiva(found ? found.id : "")
    } else {
      setFiltros((prev) => ({ ...prev, [key]: valor }))
    }
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleOrdenChange = (valor: string) => {
    setFiltros((prev) => ({ ...prev, orden: valor as FiltroState["orden"] }))
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleCategoriaHeroChange = (id: string) => {
    setCategoriaActiva(id)
    setVisibleCount(ITEMS_PER_PAGE)
    // Opcionalmente: hacer scroll suave hacia la sección de productos
    const gridSection = document.getElementById("grid-section")
    if (gridSection) {
      gridSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Filtrar y ordenar
  const processedProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Siempre filtramos por la categoría seleccionada en el Hero
    if (categoriaActiva !== "") {
      result = result.filter((p) => p.categoria === categoriaActiva || (categoriaActiva === "otros" && !p.categoria))
    }

    // 2. Filtros secundarios (Talla, Color)
    if (filtros.talla) result = result.filter((p) => p.tallas.includes(filtros.talla!))

    // 3. Ordenar
    if (filtros.orden === "precio-asc") {
      result.sort((a, b) => a.precio - b.precio)
    } else if (filtros.orden === "precio-desc") {
      result.sort((a, b) => b.precio - a.precio)
    } else if (filtros.orden === "nuevo") {
      result.sort((a, b) => b.id.localeCompare(a.id))
    }

    return result
  }, [initialProducts, filtros, categoriaActiva])

  const visibleProducts = processedProducts.slice(0, visibleCount)
  const hasMore = visibleCount < processedProducts.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  // Preparar categorías para el Hero (Añadiendo VER TODO)
  const categoriasHero = [
    { id: "", nombre: "VER TODO" },
    ...categoriasUnicas
  ]

  // Generar número de categoría (00, 01, etc.)
  const activeCatIndex = categoriasHero.findIndex((c) => c.id === categoriaActiva)
  const numCategoria = String(activeCatIndex >= 0 ? activeCatIndex : 0).padStart(2, "0")
  
  // Nombre para el FiltroBar
  const categoriaFiltroNombre = categoriasUnicas.find(c => c.id === categoriaActiva)?.nombre || null

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Hero Interactivo */}
      <ColeccionHeroV2
        coleccion={coleccion}
        categorias={categoriasHero}
        categoriaActiva={categoriaActiva}
        onCategoriaSelect={handleCategoriaHeroChange}
        imagenesGaleria={initialProducts.map((p) => p.imagen).slice(0, 5)} // Mockeando con imágenes de productos
      />

      <div id="grid-section" className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-16">
        {/* Cabecera del Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 border-b border-gray-200 pb-8">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
            <span className="text-gray-400">{numCategoria} / </span>
            {categoriaActiva === "" ? "TODAS LAS PRENDAS" : categoriasUnicas.find(c => c.id === categoriaActiva)?.nombre}
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-black hidden lg:inline-block mr-4">
              FILTRAR
            </span>
            <FiltroBar
              filtros={filterOptions}
              valores={{ categoria: categoriaFiltroNombre, talla: filtros.talla, color: filtros.color }}
              onChange={handleFiltroChange}
            />
            <div className="hidden md:block w-px h-8 bg-gray-200 mx-2"></div>
            <OrdenarPor valor={filtros.orden} onChange={handleOrdenChange} />
          </div>
        </div>

        {/* Grid de Productos */}
        {visibleProducts.length > 0 ? (
          <ProductosGrid productos={visibleProducts} />
        ) : (
          <div className="py-24 text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm">
              No hay productos en esta categoría con los filtros seleccionados.
            </p>
          </div>
        )}

        {/* Paginación (Botón Full Width como en el mockup) */}
        {hasMore && (
          <div className="mt-12">
            <button
              onClick={handleLoadMore}
              className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-gray-200"
            >
              CARGAR MÁS PRODUCTOS <span>+</span>
            </button>
          </div>
        )}
      </div>

      {/* Secciones Inferiores V2 */}
      <ColeccionCampana />
      <ColeccionFeatures />
    </div>
  )
}
