"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "@phosphor-icons/react"
import Link from "next/link"
import { Collection } from "@/types"

// Las líneas son coordenadas SVG — ajustar visualmente según gusto
const lineas = [
  { d: "M 400 0 L 1340 180" },
  { d: "M 500 0 L 1340 320" },
  { d: "M 700 0 L 1340 80" },
  { d: "M 900 0 L 800 340" },
  { d: "M 1100 0 L 600 340" },
  { d: "M 1340 100 L 400 340" },
  { d: "M 1200 0 L 1340 260" },
]

export default function ColeccionesHero({ actual }: { actual: Collection }) {
  return (
    <section className="relative px-8 pt-10 pb-0 overflow-hidden min-h-[340px]" style={{ backgroundColor: 'var(--color-surface-subtle)' }}>

      {/* SVG líneas decorativas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1340 340"
        preserveAspectRatio="xMidYMid slice"
      >
        {lineas.map((linea, i) => (
          <motion.path
            key={i}
            d={linea.d}
            stroke="#d4d4d4"
            strokeWidth="0.8"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Contenido izquierdo */}
      <div className="relative z-10 max-w-[320px]">
        <p className="text-[10px] tracking-[0.2em] font-mono mb-3" style={{ color: 'var(--color-text-muted)' }}>
          // COLECCIONES
        </p>
        <h1 className="text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight mb-4">
          COLECCIONES
        </h1>
        <p className="text-xs leading-relaxed mb-6 font-medium" style={{ color: 'var(--color-text-muted)' }}>
          Cada colección es una historia.<br />
          Descubre los drops que definen<br />
          nuestra visión.
        </p>
        <Link
          href="/manifiesto"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          VER MANIFIESTO <ArrowRight size={14} />
        </Link>
      </div>

      {/* Colección actual — esquina inferior derecha */}
      <div className="absolute bottom-0 right-6 pb-4 text-right min-w-[200px]">
        <div className="border-t border-neutral-300 pt-3">
          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--color-text-muted)' }}>
            ACTUAL
          </p>
          <Link
            href={`/colecciones/${actual.slug}`}
            className="flex items-center justify-end gap-2 group"
          >
            <div>
              <p className="font-bold text-base uppercase leading-none mb-1">{actual.nombre}</p>
              <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{actual.temporada}</p>
            </div>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

    </section>
  )
}
