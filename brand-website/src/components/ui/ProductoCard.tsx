"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, HeartStraight } from "@phosphor-icons/react"
import { useState } from "react"

type ProductoCardProps = {
  id: string
  slug: string
  nombre: string
  precio: number
  imagen: string
  defaultFavorito?: boolean
  priority?: boolean
}

export default function ProductoCard({ slug, nombre, precio, imagen, defaultFavorito = false, priority = false }: ProductoCardProps) {
  const [isFavorito, setIsFavorito] = useState(defaultFavorito)

  const toggleFavorito = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to product page
    setIsFavorito(!isFavorito)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Link href={`/productos/${slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-3 border border-gray-200">
        <Image
          src={imagen}
          alt={nombre}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <button
          onClick={toggleFavorito}
          className="absolute top-3 right-3 text-black z-10 transition-transform hover:scale-110 md:opacity-0 group-hover:opacity-100 md:duration-300"
          aria-label="Toggle Favorito"
        >
          {isFavorito ? (
            <HeartStraight size={24} weight="fill" className="text-black" />
          ) : (
            <Heart size={24} weight="regular" />
          )}
        </button>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold uppercase text-black text-sm truncate">{nombre}</h3>
        <p className="text-gray-600 text-sm mt-1">{formatPrice(precio)}</p>
      </div>
    </Link>
  )
}
