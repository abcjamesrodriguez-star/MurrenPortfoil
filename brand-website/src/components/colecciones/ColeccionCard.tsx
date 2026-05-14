"use client"
import { motion } from "framer-motion"
import { Plus } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { Collection } from "@/types"

export default function ColeccionCard({
  coleccion,
  altaFila,
}: {
  coleccion: Collection
  altaFila: boolean
}) {
  return (
    <Link
      href={`/colecciones/${coleccion.slug}`}
      className={`group relative flex flex-col overflow-hidden transition-colors
        ${altaFila ? "h-[420px]" : "h-[320px]"}`}
      style={{ backgroundColor: 'var(--color-surface-subtle)' }}
    >
      {/* Top bar: número + ícono + */}
      <div className="flex justify-between items-start p-4 z-10">
        <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {String(coleccion.numero).padStart(2, "0")}
        </span>
        <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
          <Plus size={16} className="text-neutral-400" />
        </motion.div>
      </div>

      {/* Imagen */}
      <div className="relative flex-1 overflow-hidden mx-4 mb-4">
        <Image
          src={coleccion.imagen}
          alt={coleccion.nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={altaFila}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] grayscale"
        />
        {/* Decorative corner cut logic could go here if needed, implemented via clip-path */}
        {/* For now, replicating the clean image box */}
      </div>

      {/* Footer: temporada + nombre + línea */}
      <div className="px-4 pb-4 bg-transparent z-10">
        <div className="bg-white p-3 shadow-sm inline-block border border-gray-100 min-w-[200px]">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
            {coleccion.temporada}
          </p>
          <p className="font-black text-lg uppercase leading-tight text-black">
            {coleccion.nombre}
          </p>
          <div className="w-8 h-px mt-3 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: 'var(--color-border-strong)' }} />
        </div>
      </div>
    </Link>
  )
}
