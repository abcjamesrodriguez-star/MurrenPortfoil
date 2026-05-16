import { ArrowRight, Plus } from "@phosphor-icons/react"
import Link from "next/link"
import { Collection } from "@/types"

export default function ColeccionesPanelDer({
  colecciones,
}: {
  colecciones: Collection[]
}) {
  const actual = colecciones.find((c) => c.estaActual)
  const destacada = colecciones.find((c) => c.tags.includes("DESTACADA") && !c.estaActual)

  return (
    <div className="border-l border-neutral-200 flex flex-col divide-y divide-neutral-200 bg-white">

      {/* Bloque 1 — Colección actual */}
      {actual && (
        <div className="p-6">
          <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-2">
            ACTUAL
          </p>
          <Link
            href={`/colecciones/${actual.slug}`}
            className="flex items-start justify-between group"
          >
            <div>
              <p className="font-black text-lg uppercase leading-none mb-1">
                {actual.nombre}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">{actual.temporada}</p>
            </div>
            <ArrowRight
              size={16}
              className="mt-1 group-hover:translate-x-1 transition-transform text-neutral-400"
            />
          </Link>
        </div>
      )}

      {/* Bloque 2 — Colección destacada */}
      {destacada && (
        <div className="p-6">
          <p className="text-[10px] text-neutral-400 uppercase mb-1">
            {destacada.temporada}
          </p>
          <div className="flex items-start justify-between">
            <Link
              href={`/colecciones/${destacada.slug}`}
              className="font-black text-lg uppercase leading-none hover:opacity-60 transition-opacity"
            >
              {destacada.nombre}
            </Link>
            <Plus size={14} className="text-neutral-400 mt-1" />
          </div>
          <div className="w-6 h-px bg-neutral-300 mt-2" />
        </div>
      )}

      {/* Bloque 3 — Próximamente */}
      <div className="p-6 flex-1 flex flex-col justify-center bg-neutral-50">
        <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-2">
          PRÓXIMAMENTE
        </p>
        <p className="font-black text-3xl uppercase leading-none mb-4">
          SUMMER 2025
        </p>
        <p className="text-xs text-neutral-500 leading-relaxed mb-4">
          Mantente al tanto de lo que viene.<br />
          Algo diferente está por llegar.
        </p>
        <Link
          href="#notificar"
          className="inline-flex items-center gap-2 border border-neutral-900 text-black text-xs px-4 py-2 hover:bg-neutral-900 hover:text-white transition-colors self-start"
        >
          NOTIFICARME <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  )
}
