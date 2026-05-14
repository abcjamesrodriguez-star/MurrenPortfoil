import Image from "next/image"
import { Category } from "@/types"

export default function CategoriaHeader({ categoria }: { categoria: Category }) {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 mb-8 rounded-lg overflow-hidden">
      <div className="w-full md:w-1/3 aspect-[4/3] relative">
        <Image
          src={categoria.imagen}
          alt={categoria.nombre}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="w-full md:w-2/3 p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
          // CATEGORÍA
        </p>
        <h1 className="text-3xl md:text-5xl font-bold uppercase text-black tracking-tight mb-4">
          {categoria.nombre}
        </h1>
        <p className="text-gray-600">
          Explora nuestra selección completa de {categoria.nombre.toLowerCase()}. 
          {categoria.totalProductos ? ` Encuentra entre ${categoria.totalProductos} estilos únicos.` : ''}
        </p>
      </div>
    </div>
  )
}
