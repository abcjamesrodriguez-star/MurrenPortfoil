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
    <div className="border-l flex flex-col divide-y" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-base)' }}>

      {/* Bloque 1 — Colección actual */}
      {actual && (
        <div className="p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono mb-4" style={{ color: 'var(--color-text-muted)' }}>
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
              <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{actual.temporada}</p>
            </div>
            <ArrowRight
              size={16}
              className="mt-1 group-hover:translate-x-1 transition-transform text-black"
            />
          </Link>
        </div>
      )}

      {/* Bloque 2 — Colección destacada */}
      {destacada && (
        <div className="p-6">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--color-text-muted)' }}>
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
          <div className="w-8 h-px mt-4" style={{ backgroundColor: 'var(--color-border-strong)' }} />
        </div>
      )}

      {/* Bloque 3 — Próximamente */}
      <div className="p-6 flex-1 flex flex-col justify-center" style={{ backgroundColor: 'var(--color-surface-subtle)' }}>
        <p className="text-[10px] tracking-[0.2em] font-mono uppercase mb-4" style={{ color: 'var(--color-text-muted)' }}>
          PRÓXIMAMENTE
        </p>
        <p className="font-black text-3xl uppercase leading-none mb-4">
          SUMMER 2025
        </p>
        <p className="text-xs font-medium leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Mantente al tanto de lo que viene.<br />
          Algo diferente está por llegar.
        </p>
        <Link
          href="#notificar"
          className="inline-flex items-center gap-2 border text-[10px] font-bold uppercase tracking-widest px-4 py-3 transition-colors self-start hover:text-white"
          style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-primary)' }}
        >
          NOTIFICARME <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  )
}
