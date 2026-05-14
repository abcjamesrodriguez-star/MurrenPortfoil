"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react"
import { Collection } from "@/types"

type CategoriaNav = {
  id: string
  nombre: string
}

type ColeccionHeroV2Props = {
  coleccion: Collection
  categorias: CategoriaNav[]
  categoriaActiva: string
  onCategoriaSelect: (id: string) => void
  imagenesGaleria: string[]
}

export default function ColeccionHeroV2({
  coleccion,
  categorias,
  categoriaActiva,
  onCategoriaSelect,
  imagenesGaleria,
}: ColeccionHeroV2Props) {
  const [imgIdx, setImgIdx] = useState(0)

  const nextImg = () => setImgIdx((prev) => (prev + 1) % imagenesGaleria.length)
  const prevImg = () => setImgIdx((prev) => (prev - 1 + imagenesGaleria.length) % imagenesGaleria.length)

  return (
    <div className="flex flex-col lg:flex-row min-h-[90vh]">
      {/* Panel Izquierdo Negro */}
      <div className="w-full lg:w-[40%] bg-black text-white p-8 lg:p-16 flex flex-col justify-between">
        <div>
          <Link
            href="/colecciones"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors mb-16"
          >
            <ArrowLeft size={16} />
            TODAS LAS COLECCIONES
          </Link>

          <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-4">
            {coleccion.temporada}
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-8 leading-none">
            {coleccion.nombre.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
          <p className="text-gray-400 text-sm max-w-sm mb-12 leading-relaxed">
            Inspirada en el movimiento urbano y la libertad de expresión. Texturas, reflejos y siluetas que rompen lo
            ordinario.
          </p>

          <div className="flex items-center gap-8 mb-16 lg:mb-0">
            <button className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2">
              VER LOOKBOOK <ArrowRight size={16} />
            </button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              COMPARTIR <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Navegación Vertical de Categorías */}
        <div className="mt-12 flex flex-col relative pl-10">
          {/* Línea vertical de guía */}
          <div className="absolute left-[3px] top-4 bottom-4 w-[1px] bg-gray-800" />

          {categorias.map((cat, idx) => {
            const isActive = categoriaActiva === cat.id
            const numStr = String(idx + 1).padStart(2, "0")

            return (
              <button
                key={cat.id}
                onClick={() => onCategoriaSelect(cat.id)}
                className={`flex items-center gap-8 text-sm lg:text-base font-bold uppercase tracking-widest text-left transition-all duration-300 py-3 group hover:pl-2 ${
                  isActive ? "text-white" : "text-gray-600 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute left-[0px] w-2 h-2 rounded-full bg-white z-10"
                  />
                )}
                
                {/* Indicador sutil al hover si no está activo */}
                {!isActive && (
                  <div className="absolute left-[0px] w-2 h-2 rounded-full bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                )}

                <span className={isActive ? "text-white" : "text-gray-600 group-hover:text-gray-400 transition-colors"}>{numStr}</span>
                <span>{cat.nombre}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Panel Derecho Gris (Galería) */}
      <div className="w-full lg:w-[60%] bg-gray-200 relative min-h-[50vh] lg:min-h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={imagenesGaleria[imgIdx]}
              alt={`Lookbook ${imgIdx + 1}`}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Controles del Carrusel */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
          <div className="text-xs font-bold tracking-widest text-black bg-white/80 backdrop-blur-sm px-4 py-2">
            {String(imgIdx + 1).padStart(2, "0")} / {String(imagenesGaleria.length).padStart(2, "0")}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevImg}
              className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black hover:bg-white/50 backdrop-blur-sm transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={nextImg}
              className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black hover:bg-white/50 backdrop-blur-sm transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
