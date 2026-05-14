"use client"

import { useState, useMemo } from "react"
import { Category, Product, FiltroCategoriaState } from "@/types"
import CategoriaHeader from "./CategoriaHeader"
import { FiltroBar, OrdenarPor, CargarMasBtn } from "@/components/ui"
import ProductosGrid from "@/components/coleccion-detalle/ProductosGrid" // Reutilizamos el grid de productos

type CategoriaDetalleViewProps = {
  categoria: Category
  initialProducts: Product[]
}

const ITEMS_PER_PAGE = 8

export default function CategoriaDetalleView({ categoria, initialProducts }: CategoriaDetalleViewProps) {
  const [filtros, setFiltros] = useState<FiltroCategoriaState>({
    talla: null,
    color: null,
    precioMin: null,
    precioMax: null,
    orden: "relevancia"
  })
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  // Extraer tallas únicas para esta categoría
  const tallasUnicas = useMemo(() => {
    const tallas = new Set<string>()
    initialProducts.forEach(p => p.tallas.forEach(t => tallas.add(t)))
    return Array.from(tallas).sort()
  }, [initialProducts])

  const filterOptions = [
    { key: "talla", label: "TALLA", opciones: tallasUnicas },
    { key: "color", label: "COLOR", opciones: ["Negro", "Azul", "Blanco"] },
    // El filtro de precio complejo se omitirá visualmente aquí para simplicidad, o se puede agregar rangos.
  ]

  const handleFiltroChange = (key: string, valor: string | null) => {
    setFiltros(prev => ({ ...prev, [key]: valor }))
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleOrdenChange = (valor: string) => {
    setFiltros(prev => ({ ...prev, orden: valor as FiltroCategoriaState["orden"] }))
    setVisibleCount(ITEMS_PER_PAGE)
  }

  // Filtrar y ordenar
  const processedProducts = useMemo(() => {
    let result = [...initialProducts]

    // Filtrar
    if (filtros.talla) result = result.filter(p => p.tallas.includes(filtros.talla!))
    // Filtro de color omitido

    // Ordenar
    if (filtros.orden === "precio-asc") {
      result.sort((a, b) => a.precio - b.precio)
    } else if (filtros.orden === "precio-desc") {
      result.sort((a, b) => b.precio - a.precio)
    } else if (filtros.orden === "nuevo") {
      result.sort((a, b) => b.id.localeCompare(a.id))
    }

    return result
  }, [initialProducts, filtros])

  const visibleProducts = processedProducts.slice(0, visibleCount)
  const hasMore = visibleCount < processedProducts.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoriaHeader categoria={categoria} />
      
      {/* Barra de Acciones */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 border-y border-gray-200 py-4">
        <FiltroBar 
          filtros={filterOptions} 
          valores={{ talla: filtros.talla, color: filtros.color }} 
          onChange={handleFiltroChange} 
        />
        <div className="flex justify-end">
          <OrdenarPor valor={filtros.orden} onChange={handleOrdenChange} />
        </div>
      </div>

      {/* Grid de Productos */}
      <ProductosGrid productos={visibleProducts} />
      
      {/* Paginación */}
      <CargarMasBtn onClick={handleLoadMore} visible={hasMore} />
    </div>
  )
}
