"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { Product } from "@/types"
import { ProductoCard } from "@/components/ui"

type ProductosRelacionadosProps = {
  productos: Product[]
}

export default function ProductosRelacionados({ productos }: ProductosRelacionadosProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  if (!productos || productos.length === 0) return null

  return (
    <section className="py-16 md:py-24 border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-sm font-bold tracking-widest uppercase text-black">
          TAMBIÉN TE PUEDE GUSTAR
        </h2>
      </div>

      <div className="container mx-auto px-4 relative group">
        {/* Flecha Izquierda */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 -translate-x-1/2 shadow-lg"
          aria-label="Anterior"
        >
          <ArrowLeft size={24} />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] flex-shrink-0 snap-start"
            >
              <ProductoCard
                id={producto.id}
                slug={producto.slug}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
              />
            </div>
          ))}
        </div>

        {/* Flecha Derecha */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 translate-x-1/2 shadow-lg"
          aria-label="Siguiente"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  )
}
