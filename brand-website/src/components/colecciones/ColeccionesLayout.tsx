"use client"
import { useState, useEffect } from "react"
import ColeccionesSidebar from "./ColeccionesSidebar"
import ColeccionesGrid from "./ColeccionesGrid"
import ColeccionesPanelDer from "./ColeccionesPanelDer"
import ColeccionesPaginacion from "./ColeccionesPaginacion"
import ColeccionesHero from "./ColeccionesHero"
import Footer from "@/components/layout/Footer"
import { Collection, FiltroColecciones } from "@/types"

export default function ColeccionesLayout({ colecciones }: { colecciones: Collection[] }) {
  const [filtroActivo, setFiltroActivo] = useState<FiltroColecciones>("TODAS")

  // Ocultar el footer global en desktop y restaurarlo al salir
  useEffect(() => {
    const siteFooter = document.getElementById("site-footer")
    if (!siteFooter) return

    const hide = () => {
      if (window.innerWidth >= 1024) {
        siteFooter.style.display = "none"
      } else {
        siteFooter.style.display = ""
      }
    }
    const restore = () => {
      siteFooter.style.display = ""
    }

    hide()
    window.addEventListener("resize", hide)
    return () => {
      restore()
      window.removeEventListener("resize", hide)
    }
  }, [])

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

  const actual = colecciones.find((c) => c.estaActual) ?? colecciones[0]

  return (
    <div className="relative flex flex-col lg:flex-row bg-white text-black border-t border-neutral-200 lg:h-full lg:overflow-hidden">

      {/* Sidebar IZQUIERDA — fija en escritorio, scroll interno si rebasa */}
      <div className="hidden lg:block lg:h-full w-[200px] shrink-0 lg:overflow-y-auto border-r border-neutral-200 bg-white">
        <ColeccionesSidebar
          filtroActivo={filtroActivo}
          conteos={conteos}
          onFiltroChange={setFiltroActivo}
        />
      </div>

      {/* COLUMNA CENTRO — esta es la única que scrollea */}
      <div className="flex-1 flex flex-col lg:h-full lg:overflow-y-auto min-h-screen lg:min-h-0 bg-white text-black">
        <ColeccionesHero actual={actual} />
        <ColeccionesGrid colecciones={coleccionesFiltradas} />
        <ColeccionesPaginacion
          total={colecciones.length}
          visibles={coleccionesFiltradas.length}
          filtroActivo={filtroActivo}
          onVerTodas={() => setFiltroActivo("TODAS")}
        />
        {/* Footer local en desktop, visible para mobile en el layout normal */}
        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>

      {/* Panel DERECHA — fija en escritorio, scroll interno si rebasa */}
      <div className="hidden lg:block lg:h-full w-[280px] shrink-0 lg:overflow-y-auto border-l border-neutral-200 bg-white">
        <ColeccionesPanelDer colecciones={colecciones} />
      </div>

      {/* Mobile: sidebar encima del grid */}
      <div className="flex lg:hidden flex-col w-full">
        <ColeccionesSidebar
          filtroActivo={filtroActivo}
          conteos={conteos}
          onFiltroChange={setFiltroActivo}
        />
      </div>
    </div>
  )
}
