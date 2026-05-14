import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export default function ColeccionCampana() {
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
              ROMPE LO<br />ORDINARIO
            </h2>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed max-w-xs">
              Inspirada en el movimiento urbano y la libertad de expresión. Texturas, reflejos y siluetas que rompen lo ordinario.
            </p>
            <Link 
              href="#"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 transition-colors w-max pb-1 border-b border-black hover:border-gray-600"
            >
              VER CAMPAÑA <ArrowRight size={16} />
            </Link>
          </div>

          {/* Grid de Imágenes Derecha */}
          <div className="w-full lg:w-[75%] relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="relative aspect-[3/4] bg-gray-200 border border-gray-300">
                  {/* Aquí irían las imágenes de la campaña */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="text-4xl font-bold">0{idx}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Flechas superpuestas en el centro (mockup) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 z-10 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:bg-white transition-colors">
                <ArrowLeft size={20} />
              </div>
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:bg-white transition-colors">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
