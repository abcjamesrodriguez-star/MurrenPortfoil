"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { X, Globe, Sparkle, PaintBrush } from "@phosphor-icons/react"
import { aboutData } from "@/lib/about"

export default function AboutValores() {
  const { valores } = aboutData

  const renderIcon = (icono: string) => {
    switch (icono) {
      case "X": return <X size={24} weight="light" />
      case "Globe": return <Globe size={24} weight="light" />
      case "Sparkle": return <Sparkle size={24} weight="light" />
      case "Graffiti": return <PaintBrush size={24} weight="light" />
      default: return <X size={24} weight="light" />
    }
  }

  return (
    <div className="relative w-full border-r border-neutral-200">
      {/* Tab Lateral Izquierdo */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.2em] text-neutral-500 whitespace-nowrap select-none pointer-events-none -translate-x-1/2 z-10">
        VALORES + IMÁGENES
      </div>

      <div className="flex flex-col md:grid md:grid-cols-[200px_200px_1fr] h-full">
        
        {/* Imagen 1 */}
        <div className="relative h-[200px] md:h-full border-b md:border-b-0 md:border-r border-neutral-200">
          <Image 
            src={valores.imagenes[0].src} 
            alt="Valores 1" 
            fill 
            className="object-cover grayscale"
          />
        </div>

        {/* Imagen 2 con fecha */}
        <div className="relative h-[200px] md:h-full border-b md:border-b-0 md:border-r border-neutral-200">
          <Image 
            src={valores.imagenes[1].src} 
            alt="Valores 2" 
            fill 
            className="object-cover grayscale"
          />
          {valores.imagenes[0].fecha && (
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white tracking-widest text-right leading-tight mix-blend-difference">
              {valores.imagenes[0].fecha.split("\n").map((l, i) => <span key={i} className="block">{l}</span>)}
            </div>
          )}
        </div>

        {/* Lista de Valores */}
        <div className="p-6 lg:p-8 flex flex-col justify-center bg-white">
          <span className="text-xs font-bold tracking-widest uppercase text-neutral-700 mb-6 block">
            // NUESTROS VALORES
          </span>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col"
          >
            {valores.lista.map((valor, idx) => (
              <motion.div 
                key={idx}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="flex gap-4 py-4 border-b border-neutral-200 last:border-0"
              >
                <div className="text-black flex-shrink-0 mt-0.5">
                  {renderIcon(valor.icono)}
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-2">
                    {valor.titulo}
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    {valor.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}

