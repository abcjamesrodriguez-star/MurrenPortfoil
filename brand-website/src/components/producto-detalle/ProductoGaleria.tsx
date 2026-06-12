"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowsOut, CaretUp, CaretDown, X } from "@phosphor-icons/react"
import { createPortal } from "react-dom"

type ProductoGaleriaProps = {
  imagenes: string[]
  nombre: string
}

export default function ProductoGaleria({ imagenes, nombre }: ProductoGaleriaProps) {
  const [activaIdx, setActivaIdx] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const nextImage = () => setActivaIdx((prev) => (prev + 1) % imagenes.length)
  const prevImage = () => setActivaIdx((prev) => (prev - 1 + imagenes.length) % imagenes.length)

  // Thumbnails scroll simulado
  const visibleThumbnails = imagenes.slice(0, 5) // Ajustar según diseño

  return (
    <div className="flex gap-4 lg:gap-6 w-full h-[600px] lg:h-[80vh]">
      {/* Columna de Thumbnails */}
      <div className="hidden md:flex flex-col gap-4 w-20 flex-shrink-0 relative py-2">
        <button className="flex justify-center hover:opacity-70 transition-opacity" onClick={prevImage}>
          <CaretUp size={24} />
        </button>
        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          {visibleThumbnails.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActivaIdx(idx)}
              className={`relative aspect-[3/4] w-full border transition-all ${
                idx === activaIdx ? "border-black opacity-100" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
        <button className="flex justify-center hover:opacity-70 transition-opacity" onClick={nextImage}>
          <CaretDown size={24} />
        </button>
      </div>

      {/* Imagen Principal */}
      <div className="flex-1 relative bg-gray-100 group overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activaIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={imagenes[activaIdx]}
              alt={nombre}
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <ArrowsOut size={24} />
        </button>

        {/* Indicador Mobile / Bottom */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-xs font-bold tracking-widest mb-2">
            {String(activaIdx + 1).padStart(2, "0")} / {String(imagenes.length).padStart(2, "0")}
          </div>
          <div className="h-[1px] bg-black/20 w-full relative">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${((activaIdx + 1) / imagenes.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Modal Fullscreen */}
      {mounted &&
        isFullscreen &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-white flex flex-col">
            <div className="p-6 flex justify-end">
              <button 
                onClick={() => setIsFullscreen(false)} 
                className="p-2 border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
                title="Cerrar vista completa"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activaIdx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x
                    if (swipe < -50) nextImage()
                    else if (swipe > 50) prevImage()
                  }}
                  className="relative w-full h-full max-w-5xl max-h-[80vh]"
                >
                  <Image src={imagenes[activaIdx]} alt={nombre} fill className="object-contain" sizes="100vw" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
