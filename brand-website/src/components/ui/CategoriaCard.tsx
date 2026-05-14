import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

type CategoriaCardProps = {
  slug: string
  nombre: string
  imagen: string
  priority?: boolean
}

export default function CategoriaCard({ slug, nombre, imagen, priority = false }: CategoriaCardProps) {
  return (
    <Link href={`/categorias/${slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 mb-3 border border-gray-200">
        <Image
          src={imagen}
          alt={nombre}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold uppercase text-black text-sm">{nombre}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1 uppercase tracking-wide group-hover:text-black transition-colors">
          <span>Ver todo</span>
          <ArrowRight size={12} className="ml-1 transform transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
