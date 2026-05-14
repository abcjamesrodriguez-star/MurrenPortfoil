import Image from "next/image"
import { Collection } from "@/types"

export default function ColeccionHero({ coleccion }: { coleccion: Collection }) {
  return (
    <section className="relative w-full aspect-[2/1] md:aspect-[3/1] min-h-[400px] mb-8 overflow-hidden bg-gray-900 flex items-end">
      <Image
        src={coleccion.imagen}
        alt={coleccion.nombre}
        fill
        className="object-cover opacity-60"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 p-6 md:p-12 lg:p-24 w-full">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-2">
          {coleccion.temporada}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold uppercase text-white mb-4 tracking-tight">
          {coleccion.nombre}
        </h1>
        <p className="text-white/90 max-w-xl text-sm md:text-base">
          Explora la selección completa de la colección {coleccion.nombre}. 
          Piezas exclusivas diseñadas para destacar.
        </p>
      </div>
    </section>
  )
}
