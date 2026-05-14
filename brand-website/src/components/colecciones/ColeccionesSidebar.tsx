"use client"
import { useState } from "react"
import { Plus } from "@phosphor-icons/react"
import { FiltroColecciones } from "@/types"

const FILTROS: FiltroColecciones[] = ["TODAS", "NUEVAS", "DESTACADAS", "SS24", "FW23"]

export default function ColeccionesSidebar({
  filtroActivo,
  conteos,
  onFiltroChange,
}: {
  filtroActivo: FiltroColecciones
  conteos: Record<FiltroColecciones, number>
  onFiltroChange: (f: FiltroColecciones) => void
}) {
  const [ordenAbierto, setOrdenAbierto] = useState(false)

  return (
    <div className="border-r border-neutral-200 p-8 flex flex-col gap-1 bg-white">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 font-mono mb-6">
        // FILTRAR
      </p>

      <div className="flex flex-col gap-3">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => onFiltroChange(f)}
            className="flex justify-between items-center w-full text-left group"
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${filtroActivo === f
                  ? "text-black"
                  : "text-neutral-400 group-hover:text-neutral-600"
                }`}
            >
              {f}
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              ({String(conteos[f]).padStart(2, "0")})
            </span>
          </button>
        ))}
      </div>

      {/* Ordenar por */}
      <div className="border-t border-neutral-200 mt-8 pt-6">
        <button
          onClick={() => setOrdenAbierto(!ordenAbierto)}
          className="flex justify-between items-center w-full group"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-hover:text-black transition-colors">
            ORDENAR POR
          </span>
          <Plus size={12} className={`text-neutral-400 transition-transform ${ordenAbierto ? "rotate-45" : ""}`} />
        </button>
        {ordenAbierto && (
          <div className="mt-4 flex flex-col gap-3">
            {["MÁS NUEVA", "MÁS ANTIGUA", "A–Z"].map((o) => (
              <button
                key={o}
                className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black text-left transition-colors"
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
