import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

type ColeccionBannerProps = {
  slug: string
  nombre: string
  temporada: string
}

export default function ColeccionBanner({ slug, nombre, temporada }: ColeccionBannerProps) {
  return (
    <div className="bg-gray-100 h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-gray-200 relative group overflow-hidden">
      {/* Fondo sutil animado al hover */}
      <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-black mb-2">
          {nombre}
        </h2>
        <p className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-12">
          {temporada}
        </p>
        
        <Link 
          href={`/colecciones/${slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 transition-colors"
        >
          VER COLECCIÓN
          <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
