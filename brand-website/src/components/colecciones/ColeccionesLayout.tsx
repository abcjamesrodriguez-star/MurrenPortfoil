"use client"
import { useState } from "react"
import ColeccionesSidebar from "./ColeccionesSidebar"
import ColeccionesGrid from "./ColeccionesGrid"
import ColeccionesPanelDer from "./ColeccionesPanelDer"
import ColeccionesPaginacion from "./ColeccionesPaginacion"
import { Collection, FiltroColecciones } from "@/types"

export default function ColeccionesLayout({ colecciones }: { colecciones: Collection[] }) {
  const [filtroActivo, setFiltroActivo] = useState<FiltroColecciones>("TODAS")

  const coleccionesFiltradas = colecciones.filter(c => {
    if (filtroActivo === "TODAS") return true
    if (filtroActivo === "NUEVAS") return c.tags.includes("NUEVA")
    if (filtroActivo === "DESTACADAS") return c.tags.includes("DESTACADA")
    return c.tags.includes(filtroActivo)
  })

  const conteos = {
    TODAS: colecciones.length,
    NUEVAS: colecciones.filter(c => c.tags.includes("NUEVA")).length,
    DESTACADAS: colecciones.filter(c => c.tags.includes("DESTACADA")).length,
    SS24: colecciones.filter(c => c.tags.includes("SS24")).length,
    FW23: colecciones.filter(c => c.tags.includes("FW23")).length,
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:grid lg:grid-cols-[200px_1fr_280px] border-t border-neutral-200 min-h-screen text-black">
        <ColeccionesSidebar
          filtroActivo={filtroActivo}
          conteos={conteos}
          onFiltroChange={setFiltroActivo}
        />
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1">
            <ColeccionesGrid colecciones={coleccionesFiltradas} />
          </div>
          <ColeccionesPaginacion 
            total={colecciones.length} 
            visibles={coleccionesFiltradas.length} 
            filtroActivo={filtroActivo} 
            onVerTodas={() => setFiltroActivo("TODAS")} 
          />
        </div>
        <ColeccionesPanelDer colecciones={colecciones} />
      </div>
    </div>
  )
}
