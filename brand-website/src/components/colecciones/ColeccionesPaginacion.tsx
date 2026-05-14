"use client"
import { ArrowRight } from "@phosphor-icons/react"

export default function ColeccionesPaginacion({
  total,
  visibles = 6,
  filtroActivo,
  onVerTodas,
}: {
  total: number
  visibles?: number
  filtroActivo: string
  onVerTodas: () => void
}) {
  return (
    <div className="flex justify-between items-center px-8 py-6 border-t border-b border-neutral-200 bg-white">
      <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
        MOSTRANDO 1 – {Math.min(visibles, total)} DE {total} COLECCIONES
      </span>
      {filtroActivo !== "TODAS" && (
        <button
          onClick={onVerTodas}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
        >
          VER TODAS <ArrowRight size={14} />
        </button>
      )}
    </div>
  )
}
