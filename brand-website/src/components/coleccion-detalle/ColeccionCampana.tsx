import { Collection, Product } from "@/types"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr"

interface ColeccionCampanaProps {
  coleccion: Collection
  productos: Product[]
}

export default function ColeccionCampana({ coleccion, productos }: ColeccionCampanaProps) {
  // Solo activar si la colección tiene una descripción/campaña de Shopify
  if (!coleccion.descripcion || coleccion.descripcion.trim() === "") {
    return null
  }

  // Tomar hasta 3 imágenes de productos para la campaña
  const imagenesCampana = productos.slice(0, 3).map((p) => p.imagen)

  return (
    <div className="w-full border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* Textos Izquierda */}
          <div className="w-full lg:w-[25%] flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">
              CAMPAÑA
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight text-black mb-6 leading-none">
              {coleccion.nombre}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              {coleccion.descripcion}
            </p>
          </div>

          {/* Grid de Imágenes Derecha */}
          <div className="w-full lg:w-[75%] relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {imagenesCampana.map((img, idx) => (
                <div key={idx} className="relative aspect-[3/4] bg-gray-200 border border-gray-300 overflow-hidden">
                  <Image
                    src={img}
                    alt={`${coleccion.nombre} - Imagen de campaña ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 text-xs font-mono backdrop-blur-sm z-10">
                    0{idx + 1}
                  </div>
                </div>
              ))}
              
              {/* Completar con placeholders si hay menos de 3 imágenes */}
              {imagenesCampana.length < 3 && 
                Array.from({ length: 3 - imagenesCampana.length }).map((_, idx) => {
                  const displayIdx = imagenesCampana.length + idx + 1
                  return (
                    <div key={`placeholder-${idx}`} className="relative aspect-[3/4] bg-gray-200 border border-gray-300">
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <span className="text-4xl font-bold">0{displayIdx}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            {/* Flechas superpuestas en el centro (mockup) */}
            {imagenesCampana.length > 3 && (
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 z-10 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:bg-white transition-colors">
                  <ArrowLeft size={20} />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:bg-white transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
