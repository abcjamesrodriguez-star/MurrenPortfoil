import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

type ColeccionCardProps = {
  slug: string
  nombre: string
  temporada: string
  imagen: string
  priority?: boolean
}

export default function ColeccionCard({ slug, nombre, temporada, imagen, priority = false }: ColeccionCardProps) {
  return (
    <Link href={`/colecciones/${slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 mb-4">
        <Image
          src={imagen}
          alt={nombre}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold uppercase text-black tracking-tight">{nombre}</h3>
          <p className="text-gray-500 text-sm mt-1 uppercase">{temporada}</p>
        </div>
        <ArrowRight size={20} className="text-black transform transition-transform group-hover:translate-x-1 mt-1" />
      </div>
    </Link>
  )
}
