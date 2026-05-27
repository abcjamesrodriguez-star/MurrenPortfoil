"use client"
import { motion } from "framer-motion"
import { Plus } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { Collection } from "@/types"
import { useState } from "react"

export default function ColeccionCard({
  coleccion,
  altaFila,
}: {
  coleccion: Collection
  altaFila: boolean
}) {
  const [imgSrc, setImgSrc] = useState(coleccion.imagen || '/images/placeholder.png')

  return (
    <Link
      href={`/colecciones/${coleccion.slug}`}
      className={`group relative flex flex-col border-b border-neutral-200 overflow-hidden bg-white
        ${altaFila ? "h-[420px]" : "h-[320px]"}`}
    >
      {/* Top bar: número + ícono + */}
      <div className="flex justify-between items-start p-3 z-10">
        <span className="text-xs text-neutral-400 font-mono">
          {String(coleccion.numero).padStart(2, "0")}
        </span>
        <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
          <Plus size={16} className="text-neutral-400" />
        </motion.div>
      </div>

      {/* Imagen */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={imgSrc}
          alt={coleccion.nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={altaFila}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] grayscale"
          onError={() => setImgSrc('/images/placeholder.png')}
        />
      </div>

      {/* Footer: temporada + nombre + línea */}
      <div className="p-3 bg-white">
        <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
          {coleccion.temporada}
        </p>
        <p className="font-bold text-lg uppercase leading-tight text-black">
          {coleccion.nombre}
        </p>
        <div className="w-8 h-px bg-neutral-900 mt-2" />
      </div>
    </Link>
  )
}
