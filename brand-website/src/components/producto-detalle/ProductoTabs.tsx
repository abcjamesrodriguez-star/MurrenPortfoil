"use client"

import { ArrowRight } from "@phosphor-icons/react"

export default function ProductoTabs() {
  const tabs = [
    { id: "detalles", label: "DETALLES" },
    { id: "envios", label: "ENVÍOS" },
    { id: "devoluciones", label: "DEVOLUCIONES" },
  ]

  const scrollTo = (id: string) => {
    // Implementar scroll suave a la sección
    console.log("Scrolling to", id)
  }

  return (
    <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-16 py-8 px-4 border-l border-gray-200 bg-white z-40">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => scrollTo(tab.id)}
          className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-colors"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {tab.label}
        </button>
      ))}
      <div className="text-gray-400 mt-4">+</div>
    </div>
  )
}
