"use client"

import { useState, useMemo } from "react"
import { Collection } from "@/types"
import ColeccionesHero from "./ColeccionesHero"
import ColeccionesGrid from "./ColeccionesGrid"
import { CargarMasBtn } from "@/components/ui"
import { getColeccionActual } from "@/lib/api"

type Tab = "TODAS" | "NUEVAS" | "DESTACADAS" | "SS24" | "FW23" | "BASIC"

type ColeccionesViewProps = {
  initialCollections: Collection[]
}

const ITEMS_PER_PAGE = 3

// LEGACY: Este componente es v1, la página actual usa ColeccionesLayout directamente.
export default function ColeccionesView({ initialCollections }: ColeccionesViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("TODAS")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const actual = getColeccionActual(initialCollections)

  // Filtrado
  const filteredCollections = useMemo(() => {
    if (activeTab === "TODAS") return initialCollections
    return initialCollections.filter((c) => c.tags.includes(activeTab as any) || c.temporada === activeTab)
  }, [initialCollections, activeTab])

  const visibleCollections = filteredCollections.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCollections.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <ColeccionesHero actual={actual} />
      <ColeccionesGrid colecciones={visibleCollections} />
      <CargarMasBtn onClick={handleLoadMore} visible={hasMore} />
    </div>
  )
}
