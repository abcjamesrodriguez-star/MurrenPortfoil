import Image from "next/image"
import { aboutData } from "@/lib/about"

export default function AboutImagenGrupal() {
  const { imagenGrupal } = aboutData

  return (
    <div className="relative w-full h-[200px] lg:h-full border-b md:border-b-0 md:border-r border-gray-200 overflow-hidden">
      {/* Tab Lateral Inferior (opcional si queremos llenar el hueco del tab) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] text-white/50 whitespace-nowrap select-none pointer-events-none z-10 mix-blend-difference">
        IMAGEN GRUPAL
      </div>

      <Image 
        src={imagenGrupal} 
        alt="Equipo Murren" 
        fill 
        className="object-cover grayscale"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
    </div>
  )
}
